import express from 'express';
import multer from 'multer';
import { handlePDFExtraction } from '../controllers/extractController';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), handlePDFExtraction);

console.log('pdfRoutes');

export default router;
