import express from 'express';
import { create,  getSpecificDisease, diseaseList, remove, update } from '../controllers/DiseaseLabelController.js'
const router = express.Router();
// GET: /api/disease
router.get('/', diseaseList);

// GET: /api/disease/:id
router.get('/:id', getSpecificDisease);

// GET: /api/disease/create
router.post('/create', create);

// PUT: /api/disease/:id/update
router.put('/:id/update', update);

// DELETE: /api/disease/:id/delete
router.delete('/:id/delete', remove);


export default router;