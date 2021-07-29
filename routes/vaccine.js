import express from 'express';
import { create,  getSpecificVaccine, vaccineList, remove, update } from '../controllers/VaccineController.js'
const router = express.Router();
// GET: /api/vaccine
router.get('/', vaccineList);

// GET: /api/vaccine/:id
router.get('/:id', getSpecificVaccine);

// GET: /api/vaccine/create
router.post('/create', create);

// PUT: /api/vaccine/:id/update
router.put('/:id/update', update);

// DELETE: /api/vaccine/:id/delete
router.delete('/:id/delete', remove);


export default router;