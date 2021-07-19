import express from 'express';
import { createAllergy,createVaccine,createDiseaseLabel, createBadHabits} from '../controllers/BasicMedicalInfoController.js'
const router = express.Router();
import upload from '../middleware/upload.js';



// POST: /api/basic-info/createAllergy
router.post('/createAllergy', createAllergy);

// POST: /api/basic-info/createVaccine
router.post('/createVaccine', createVaccine)

// POST: /api/basic-info/createDiseaseLabel
router.post('/createDiseaseLabel', createDiseaseLabel);

// POST: /api/basic-info/createBadHabits
router.post('/createBadHabits', createBadHabits);
export default router;
