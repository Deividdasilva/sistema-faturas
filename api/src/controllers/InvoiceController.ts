import { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { join } from 'path';
import fs from 'fs';
import extractDataFromPDF from '../services/pdfExtractor';
import { parseInvoiceData, InvoiceData } from '../services/dataParser';
import Invoice from '../models/Invoice';
import sequelize from '../config/database';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const originalNameParts = file.originalname.split('.');
        const fileExtension = originalNameParts.pop();
        const newFileName = `${timestamp}.${fileExtension}`;
        cb(null, newFileName);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

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