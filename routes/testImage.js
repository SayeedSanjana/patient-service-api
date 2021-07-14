import express from 'express';
import { 
    createTestImage, getAllTestImagesById, 
    getSpecificTestImage, 
    removeTestImage,updateTestImage,testImageList
} from '../controllers/TestImageController.js'
import upload from '../middleware/upload.js';

const router = express.Router();

// POST: /api/tests/create
router.post('/create',upload.array("images",12),createTestImage);

// GET: /api/tests - all patient test patient list
router.get('/:page', testImageList);

// GET: /api/tests/:id - brings in only specified id prescriptions list
router.get('/:id', getAllTestImagesById);

// GET: /api/tests/:id /:testId - brings in only specified id prescriptions list
router.get('/:id/:testId', getSpecificTestImage);


// PUT: /api/tests/:id/update
router.put('/:id/update', updateTestImage);

// DELETE: /api/tests/:id/delete
router.delete('/:id/:testId/delete', removeTestImage);




export default router;