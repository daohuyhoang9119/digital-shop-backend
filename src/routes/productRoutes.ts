import express from 'express';
import {
  addProduct,
  deleteProductById,
  getAllProduct,
  getProductById,
  updateProductById
} from '../controllers/product';
import { verifyAccessToken } from '../middlewares/auth';

const router = express.Router();

router.route('/').post(addProduct);
router.route('/:id').get(getProductById);
router.route('/:id').delete(deleteProductById);
router.route('/:id').put(updateProductById);

router.route('/').get(getAllProduct);
export default router;
