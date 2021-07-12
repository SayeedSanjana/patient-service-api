import express from 'express';
import { 
    createPrescriptionImage, getAllPrescripionImagesById, 
    getSpecificPrescripionImage, prescriptionImageList, 
    removePrescriptionImage, updatePrescriptionImage 
} from '../controllers/PrescriptionImageController.js'
import upload from '../middleware/upload.js';

const router = express.Router();

// POST: /api/prescriptions/create
router.post('/create',upload.array("images",12),createPrescriptionImage);

// GET: /api/prescriptions - all patient prescription patient list
router.get('/', prescriptionImageList);

// GET: /api/prescriptions/:id - brings in only specified id prescriptions list
router.get('/:id', getAllPrescripionImagesById);

// GET: /api/prescriptions/:id /:presId - brings in only specified id prescriptions list
router.get('/:id/:presId', getSpecificPrescripionImage);


// PUT: /api/prescriptions/:id/update
router.put('/:id/update', updatePrescriptionImage);

// DELETE: /api/prescriptions/:id/delete
router.delete('/:id/delete', removePrescriptionImage);

export default router;