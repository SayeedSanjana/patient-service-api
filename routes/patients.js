import express from 'express';
import { create, patient, patientList, remove, update } from '../controllers/PatientsController.js'
const router = express.Router();
// GET: /api/patients
router.get('/', patientList);

// GET: /api/patients/:id
router.get('/:id', patient);

// GET: /api/patients/create
router.post('/create', create);

// PATCH: /api/patients/:id/update
router.put('/:id/update', update);

// DELETE: /api/patients/:id/delete
router.delete('/:id/delete', remove);

export default router;