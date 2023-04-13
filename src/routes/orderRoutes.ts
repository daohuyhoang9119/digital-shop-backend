import express from 'express';
import { addOrder, deleteOrder, getAllOrder, updateOrderStatus } from '../controllers/order';
import { verifyAccessToken } from '../middlewares/auth';

const router = express.Router();
router.route('/').post(verifyAccessToken, addOrder);
router.route('/:id').get(deleteOrder);
router.route('/:id').put(verifyAccessToken, updateOrderStatus);

router.route('/').get(getAllOrder);
export default router;
