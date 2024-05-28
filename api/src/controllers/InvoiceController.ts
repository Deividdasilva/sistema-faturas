// import { Request, Response } from 'express';
// import Invoice from '../models/Invoice'; // Verifique se o modelo está corretamente definido
// import extractDataFromPDF from '../services/pdfExtractor';
// import { parseInvoiceData } from '../services/dataParser';
// import { adaptInvoiceData } from '../services/adaptInvoiceData';
// import { mapToOptional } from '../services/mapToOptional';
// import sequelize from '../config/database';
// import { Optional } from 'sequelize';


// export const extractAndSaveInvoices = async (req: Request, res: Response) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file provided' });
//     }

//     const transaction = await sequelize.transaction();
//     try {
//         const filePath = req.file.path;
//         const extractedData = await extractDataFromPDF(filePath);
//         const invoicesData = parseInvoiceData(extractedData.data);
//         console.log(invoicesData, 'invoicesDataaaaaaaaaaaaa');
//         const optionalInvoices = mapToOptional(invoicesData);

//         const invoices = await Invoice.bulkCreate(optionalInvoices, { transaction });
//         await transaction.commit();
//         res.status(201).json(invoices);
//     } catch (error: any) {
//         await transaction.rollback();
//         console.error('Error extracting or saving invoices:', error);
//         res.status(500).json({ message: 'Failed to extract or save invoices', error: error.message });
//     }
// };

// export const getAllInvoices = async (req: Request, res: Response) => {
//     try {
//         const clientNumber = req.query.clientNumber as string;
//         const condition = clientNumber ? { clientNumber } : undefined;
//         const invoices = await Invoice.findAll({ where: condition });
//         res.json(invoices);
//     } catch (error: any) {
//         console.error('Error getting invoices:', error);
//         res.status(500).json({ message: 'Failed to get invoices', error: error.message || 'Unknown error' });
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
//     } catch (error: any) { // Uso de 'any' temporariamente
//         console.error('Error getting the invoice:', error);
//         res.status(500).json({ message: 'Failed to get the invoice', error: error.message || 'Unknown error' });
//     }
// };

// // Criar uma nova fatura
// export const createInvoice = async (req: Request, res: Response) => {
//     try {
//         const invoice = await Invoice.create(req.body);
//         res.status(201).json(invoice);
//     } catch (error: any) { // Uso de 'any' temporariamente
//         console.error('Error creating invoice:', error);
//         res.status(500).json({ message: 'Failed to create invoice', error: error.message || 'Unknown error' });
//     }
// };

// // Extrair faturas de um arquivo PDF
// export const extractInvoices = async (req: Request, res: Response) => {
//     if (!req.file) {  // Verifica se o arquivo foi carregado
//         return res.status(400).json({ message: 'No file provided' });
//     }
//     try {
//         const invoicesData = await extractDataFromPDF(req.file.path);
//         const invoices = await Invoice.bulkCreate(invoicesData);
//         res.status(201).json(invoices);
//     } catch (error: any) { // Uso de 'any' temporariamente
//         console.error('Error extracting invoices:', error);
//         res.status(500).json({ message: 'Failed to extract invoices', error: error.message || 'Unknown error' });
//     }
// };


import { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { join } from 'path';
import fs from 'fs';
import extractDataFromPDF from '../services/pdfExtractor';
import { parseInvoiceData, InvoiceData } from '../services/dataParser';
import Invoice from '../models/Invoice';
import sequelize from '../config/database';

// Define a storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); // Define a pasta de uploads
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const originalNameParts = file.originalname.split('.');
        const fileExtension = originalNameParts.pop();
        const newFileName = `${timestamp}.${fileExtension}`;
        cb(null, newFileName);
    }
});

// Define a função de filtro de arquivo
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Cria uma instância do multer com configurações
const upload = multer({ storage: storage, fileFilter: fileFilter });

const extractAndSaveInvoices = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).json({ message: "Nenhum arquivo enviado!" });
        return;
    }

    try {
        const filePath = req.file.path;
        const extractedData = await extractDataFromPDF(filePath);
        const invoicesData = parseInvoiceData(extractedData.data);

        const transaction = await sequelize.transaction();

        try {
            const optionalInvoices = invoicesData.map(invoice => ({
                clientNumber: invoice.clientNumber,
                referenceMonth: invoice.referenceMonth,
                electricEnergyKWh: invoice.electricEnergyKWh,
                electricEnergyValue: invoice.electricEnergyValue,
                screeEnergyKWh: invoice.screeEnergyKWh,
                screeEnergyValue: invoice.screeEnergyValue,
                compensatedEnergyKWh: invoice.compensatedEnergyKWh,
                compensatedEnergyValue: invoice.compensatedEnergyValue,
                municipalPublicLightingContribution: invoice.municipalPublicLightingContribution
            }));

            await Invoice.bulkCreate(optionalInvoices, { transaction });
            await transaction.commit();

            // Renomeia o arquivo PDF com base nos dados extraídos
            const clientNumber = invoicesData[0].clientNumber;
            const referenceMonth = invoicesData[0].referenceMonth.replace('/', '-');
            const newFileName = `${clientNumber}-${referenceMonth}.pdf`;
            const newFilePath = join(__dirname, '../uploads', newFileName);

            fs.renameSync(filePath, newFilePath);

            res.status(201).json(invoicesData);
        } catch (error: any) {
            await transaction.rollback();
            throw error;
        }
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao extrair dados do PDF", error: error.message });
    }
};

const getAllInvoices = async (req: Request, res: Response): Promise<void> => {
    try {
        const invoices = await Invoice.findAll();
        res.status(200).json(invoices);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter faturas", error: error.message });
    }
};

// const downloadInvoice = (req: Request, res: Response) => {
//     const { clientNumber, referenceMonth } = req.query;

//     if (!clientNumber || !referenceMonth) {
//         return res.status(400).json({ message: "Client number or reference month missing" });
//     }

//     const fileName = `${clientNumber}-${referenceMonth}.pdf`;
//     const filePath = join(__dirname, '../uploads', fileName);

//     if (!fs.existsSync(filePath)) {
//         return res.status(404).json({ message: "File not found" });
//     }

//     res.download(filePath, fileName, (err) => {
//         if (err) {
//             return res.status(500).json({ message: "Error downloading file", error: err.message });
//         }
//     });
// };

const downloadInvoice = (req: Request, res: Response) => {
    const { clientNumber, referenceMonth } = req.query;

    if (!clientNumber || !referenceMonth) {
        return res.status(400).json({ message: "Client number or reference month missing" });
    }

    const formattedReferenceMonth = (referenceMonth as string).replace('/', '-');
    const fileName = `${clientNumber}-${formattedReferenceMonth}.pdf`;
    const filePath = join(__dirname, '../uploads', fileName);

    console.log(`Tentando acessar o arquivo: ${filePath}`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found" });
    }

    res.download(filePath, fileName, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error downloading file", error: err.message });
        }
    });
};

export { upload, extractAndSaveInvoices, getAllInvoices, downloadInvoice };





























































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

