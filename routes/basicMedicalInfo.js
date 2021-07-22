import express from 'express';
import { createAllergy,createVaccine,createDiseaseLabel, createBadHabits,deleteAllergy,deleteVaccine,deleteDisease,deleteBadHabits} from '../controllers/BasicMedicalInfoController.js'
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


// DELETE: /api/basic-info/:id/deleteAllergy
router.put('/:id/deleteAllergy', deleteAllergy);

// DELETE: /api/basic-info/:id/deleteVaccine
router.put('/:id/deleteVaccine', deleteVaccine);


// DELETE: /api/basic-info/:id/deleteDisease
router.put('/:id/deleteDisease', deleteDisease);

// DELETE: /api/basic-info/:id/deleteBadHabits
router.put('/:id/deleteBadHabits', deleteBadHabits);

export default router;
