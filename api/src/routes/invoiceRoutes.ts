import express from 'express';
import multer from 'multer';
import { extractAndSaveInvoices, getAllInvoices, downloadInvoice } from '../controllers/InvoiceController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.get('/list', getAllInvoices);
router.post('/extract-invoice', upload.single('file'), extractAndSaveInvoices);
router.get('/download', downloadInvoice);  // Adicione esta linha

export default router;


