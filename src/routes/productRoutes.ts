import express from 'express';
import { addProduct, getAllProduct } from '../controllers/product';
import { verifyAccessToken } from '../middlewares/auth';

const router = express.Router();

router.route('/').post(addProduct);
router.route('/').get(getAllProduct);

export default router;
