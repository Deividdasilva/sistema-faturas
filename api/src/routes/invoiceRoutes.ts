// import express from 'express';
// import { getAllInvoices, getInvoice, createInvoice, extractInvoices } from '../controllers/InvoiceController';
// import multer from 'multer';
// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });  // Assumindo uso do Multer para uploads

// // Rotas para operações básicas
// router.get('/invoices', getAllInvoices);
// router.get('/invoices/:id', getInvoice);
// router.post('/invoices', createInvoice);

// // Rota para extrair dados do arquivo PDF
// router.post('/extract-invoices', upload.single('file'), extractInvoices);

// export default router;

// Em algum lugar em seus routes (e.g., src/routes/invoiceRoutes.js)
// import express from 'express';
// import multer from 'multer';

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// router.post('/extract-invoice', upload.single('file'), async (req, res) => {
//     if (req.file) {
//         try {
//             // Processamento do arquivo...
//             res.json({ message: 'Arquivo recebido e processado com sucesso!' });
//         } catch (error) {
//             res.status(500).json({ error: 'Erro ao processar o arquivo' });
//         }
//     } else {
//         res.status(400).json({ error: 'Nenhum arquivo enviado' });
//     }
// });

// export default router;

import express from 'express';
// import invoiceRoutes from './invoiceRoutes';
import pdfRoutes from './pdfRoutes';
import multer from 'multer';
// import { handlePDFExtraction } from '../controllers/extractController';
import { extractAndSaveInvoices, getAllInvoices } from '../controllers/InvoiceController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.get('/list', getAllInvoices);
router.post('/extract-invoice', upload.single('file'), extractAndSaveInvoices);
// router.post('/extract-invoice', 
//     (req, res, next) => {
//         console.log('Middleware 1: Antes do upload');
//         next();
//     }, 
//     upload.single('file'), 
//     (req, res, next) => {
//         console.log('Middleware 2: Arquivo Recebido:', req.file);
//         if (!req.file) {
//             console.log('Nenhum arquivo recebido');
//             return res.status(400).json({ message: 'No file provided' });
//         }
//         next();
//     }, 
//     (req, res, next) => {
//         console.log('Middleware 3: Antes do extractAndSaveInvoices');
//         next();
//     }, 
//     extractAndSaveInvoices
// );

export default router;


