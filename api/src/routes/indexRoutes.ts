import express from 'express';
import invoiceRoutes from './invoiceRoutes';
import { extractAndSaveInvoices, getAllInvoices } from '../controllers/InvoiceController';
import { upload } from '../controllers/extractController';

const router = express.Router();

router.use('/invoices', invoiceRoutes);
router.use('/list', getAllInvoices);
router.post('/extract-invoice', upload.single('file'), extractAndSaveInvoices);

export default router;
