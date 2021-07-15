import express from 'express';
import { create,  getSpecificAllergy, allergyList, remove, update } from '../controllers/AllergyController.js'
const router = express.Router();
// GET: /api/allergies
router.get('/', allergyList);

// GET: /api/allergies/:id
router.get('/:id', getSpecificAllergy);

// GET: /api/allergies/create
router.post('/create', create);

// PUT: /api/allergies/:id/update
router.put('/:id/update', update);

// DELETE: /api/allergies/:id/delete
router.delete('/:id/delete', remove);


export default router;