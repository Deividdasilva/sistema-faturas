import express from 'express';
import invoiceRoutes from './invoiceRoutes';
import pdfRoutes from './pdfRoutes';
import { extractAndSaveInvoices, getAllInvoices } from '../controllers/InvoiceController';
import { upload, handlePDFExtraction } from '../controllers/extractController';

const router = express.Router();

// Assegure-se de que as rotas de faturas estão sendo usadas corretamente
router.use('/invoices', invoiceRoutes);
router.use('/list', getAllInvoices);
router.post('/extract-invoice', upload.single('file'), extractAndSaveInvoices);

export default router;
