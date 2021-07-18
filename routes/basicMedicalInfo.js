import express from 'express';
import { createAllergy,createVaccine} from '../controllers/BasicMedicalInfoController.js'
const router = express.Router();
import upload from '../middleware/upload.js';



// POST: /api/basic-info/createAllergy
router.post('/createAllergy', createAllergy);

// POST: /api/basic-info/createVaccine
router.post('/createVaccine', createVaccine)
// POST: /api/basic-info/id/disease/createDiseaseLabel
//router.post('/:id/:disease/createDiseaseLabel', createDiseaseLabel);
export default router;
