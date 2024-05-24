import { Request, Response } from 'express';
import Invoice from '../models/Invoice'; // Verifique se o modelo está corretamente definido
import extractDataFromPDF from '../services/pdfExtractor';
import { parseInvoiceData } from '../services/dataParser';
import { adaptInvoiceData } from '../services/adaptInvoiceData';
import { mapToOptional } from '../services/mapToOptional';
import sequelize from '../config/database';
import { Optional } from 'sequelize';

// Função para extrair faturas do arquivo PDF e inserir no banco
// export const extractAndSaveInvoices = async (req: Request, res: Response) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file provided' });
//     }

//     try {
//         // Extrair dados do arquivo PDF
//         const filePath = req.file.path;
//         const invoicesData = await extractDataFromPDF(filePath);

//         // Inserir dados no banco usando o modelo Invoice
//         const invoices = await Invoice.bulkCreate(invoicesData);
//         res.status(201).json(invoices);
//     } catch (error: any) {
//         console.error('Error extracting or saving invoices:', error);
//         res.status(500).json({ message: 'Failed to extract or save invoices', error: error.message });
//     }
// };


// export const extractAndSaveInvoices = async (req: Request, res: Response) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file provided' });
//     }

//     const transaction = await sequelize.transaction(); // Inicia uma transação

//     console.log('99999999999999999999999');

//     try {
//         const filePath = req.file.path;
//         const invoicesData = await extractDataFromPDF(filePath); // Supõe que esta função retorna os dados no formato correto
//         console.log(invoicesData, 'invoicesData');
//         const invoices = await Invoice.bulkCreate(invoicesData, { transaction }); // Insere dados dentro da transação
//         await transaction.commit(); // Commit da transação se tudo correr bem
//         res.status(201).json(invoices);
//         console.log('aquiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
//     } catch (error: any) {
//         await transaction.rollback(); // Rollback da transação em caso de erro
//         console.error('Error extracting or saving invoices:', error);
//         res.status(500).json({ message: 'Failed to extract or save invoices', error: error.message });
//     }
// };

// Funciona
export const extractAndSaveInvoices = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file provided' });
    }

    const transaction = await sequelize.transaction();
    try {
        const filePath = req.file.path;
        const extractedData = await extractDataFromPDF(filePath);
        const invoicesData = parseInvoiceData(extractedData.data);
        const optionalInvoices = mapToOptional(invoicesData);

        const invoices = await Invoice.bulkCreate(optionalInvoices, { transaction });
        await transaction.commit();
        res.status(201).json(invoices);
    } catch (error: any) {
        await transaction.rollback();
        console.error('Error extracting or saving invoices:', error);
        res.status(500).json({ message: 'Failed to extract or save invoices', error: error.message });
    }
};

// export const extractAndSaveInvoices = async (req: Request, res: Response) => {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file provided' });
//     }
  
//     const transaction = await sequelize.transaction();
//     try {
//       const filePath = req.file.path;
//       const extractedData = await extractDataFromPDF(filePath);
//       const invoicesData = parseInvoiceData(extractedData.data);
//       const adaptedInvoicesData = adaptInvoiceData(invoicesData);
  
//       // Use upsert para evitar duplicação
//       for (const invoice of adaptedInvoicesData) {
//         await Invoice.upsert(invoice, { transaction });
//       }
  
//       await transaction.commit();
//       res.status(201).json({ message: 'Invoices processed successfully' });
//     } catch (error: any) {
//       await transaction.rollback();
//       console.error('Error extracting or saving invoices:', error);
//       res.status(500).json({ message: 'Failed to extract or save invoices', error: error.message });
//     }
//   };
  

// Obter todas as faturas
export const getAllInvoices = async (req: Request, res: Response) => {
    try {
        const invoices = await Invoice.findAll();
        res.json(invoices);
    } catch (error: any) { // Uso de 'any' temporariamente
        console.error('Error getting all invoices:', error);
        res.status(500).json({ message: 'Failed to get invoices', error: error.message || 'Unknown error' });
    }
};

// Obter uma fatura específica
export const getInvoice = async (req: Request, res: Response) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (error: any) { // Uso de 'any' temporariamente
        console.error('Error getting the invoice:', error);
        res.status(500).json({ message: 'Failed to get the invoice', error: error.message || 'Unknown error' });
    }
};

// Criar uma nova fatura
export const createInvoice = async (req: Request, res: Response) => {
    try {
        const invoice = await Invoice.create(req.body);
        res.status(201).json(invoice);
    } catch (error: any) { // Uso de 'any' temporariamente
        console.error('Error creating invoice:', error);
        res.status(500).json({ message: 'Failed to create invoice', error: error.message || 'Unknown error' });
    }
};

// Extrair faturas de um arquivo PDF
export const extractInvoices = async (req: Request, res: Response) => {
    if (!req.file) {  // Verifica se o arquivo foi carregado
        return res.status(400).json({ message: 'No file provided' });
    }
    try {
        const invoicesData = await extractDataFromPDF(req.file.path);
        const invoices = await Invoice.bulkCreate(invoicesData);
        res.status(201).json(invoices);
    } catch (error: any) { // Uso de 'any' temporariamente
        console.error('Error extracting invoices:', error);
        res.status(500).json({ message: 'Failed to extract invoices', error: error.message || 'Unknown error' });
    }
};































// import { Request, Response } from 'express';
// import multer from 'multer';
// import Invoice from '../models/Invoice';  // Verifique se o modelo está corretamente definido
// import extractDataFromPDF from '../services/pdfExtractor';

// // Configuração do Multer para uploads de arquivos
// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './uploads');  // Diretório de upload dos arquivos
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + '-' + Date.now());
//     }
// });

// export const upload = multer({ storage: storage });

// // Obter todas as faturas
// export const getAllInvoices = async (req: Request, res: Response) => {
//     try {
//         const invoices = await Invoice.findAll();
//         res.json(invoices);
//     } catch (error: any) {
//         console.error('Error getting all invoices:', error);
//         res.status(500).json({ message: 'Failed to get invoices', error: error.message });
//     }
// };

// // Obter uma fatura específica
// export const getInvoice = async (req: Request, res: Response) => {
//     try {
//         const invoice = await Invoice.findByPk(req.params.id);
//         if (!invoice) {
//             return res.status(404).json({ message: 'Invoice not found' });
//         }
//         res.json(invoice);
//     } catch (error: any) {
//         console.error('Error getting the invoice:', error);
//         res.status(500).json({ message: 'Failed to get the invoice', error: error.message });
//     }
// };

// // Criar uma nova fatura
// export const createInvoice = async (req: Request, res: Response) => {
//     try {
//         const invoice = await Invoice.create(req.body);
//         res.status(201).json(invoice);
//     } catch (error: any) {
//         console.error('Error creating invoice:', error);
//         res.status(500).json({ message: 'Failed to create invoice', error: error.message });
//     }
// };

// // Extrair faturas de um arquivo PDF
// export const extractInvoices = async (req: Request, res: Response) => {
//     if (!req.file) {
//         res.status(400).json({ message: "No file uploaded." });
//         return;
//     }

//     try {
//         const invoicesData = await extractDataFromPDF(req.file.path);
//         const invoices = await Invoice.bulkCreate(invoicesData);
//         res.status(201).json(invoices);
//     } catch (error: any) {
//         console.error('Error extracting invoices:', error);
//         res.status(500).json({ message: 'Failed to extract invoices', error: error.message });
//     }
// };

