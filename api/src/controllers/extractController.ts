import extractDataFromPDF from '../services/pdfExtractor';
import { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';  // Importando tipos do Multer

// Define a storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');  // Define a pasta de uploads
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);  // Nomeia o arquivo para evitar conflitos
    }
});

// Define a função de filtro de arquivo
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'application/pdf') {  // Aceita apenas arquivos PDF
        cb(null, true);
    } else {
        cb(null, false);  // Rejeita outros tipos de arquivo
    }
};

// Cria uma instância do multer com configurações
const upload = multer({ storage: storage, fileFilter: fileFilter });

const handlePDFExtraction = async (req: Request, res: Response): Promise<void> => {
    console.log('wwwwwww');
    if (!req.file) {  // Verifica se o arquivo foi enviado
        res.status(400).json({ message: "Nenhum arquivo enviado!" });
        return;
    }

    try {
        const filePath = req.file.path;  // Usa a propriedade 'path' com segurança
        const extractedData = await extractDataFromPDF(filePath);
        res.status(200).json({ message: "Dados extraídos com sucesso!", data: extractedData });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Erro ao extrair dados do PDF", error: error.message });
        } else {
            res.status(500).json({ message: "Erro ao extrair dados do PDF", error: "Erro desconhecido" });
        }
    }
};

export { upload, handlePDFExtraction };  // Exporta 'upload' para uso como middleware
