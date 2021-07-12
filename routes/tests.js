import express from 'express';
import { create} from '../controllers/TestsController.js';
import multer from "multer";


const uploads=multer({dest:'/uploads/'});
const router = express.Router();


// GET: /api/tests/create
router.post('/create',uploads.single('productImage') ,create);
//console.log(req.file)




export default router;