import express from 'express';
import { create, patient, patientList, remove, update ,updateAddress} from '../controllers/PatientsController.js'
const router = express.Router();
// GET: /api/patients
router.get('/', patientList);

// GET: /api/patients/:id
router.get('/:id', patient);

// GET: /api/patients/create
router.post('/create', create);

// PUT: /api/patients/:id/update
router.patch('/:id/update', update);

// DELETE: /api/patients/:id/delete
router.delete('/:id/delete', remove);

// PUT: /api/patients/:id/updateAddress
router.put('/:id/:addrId/update-address', updateAddress);


export default router;