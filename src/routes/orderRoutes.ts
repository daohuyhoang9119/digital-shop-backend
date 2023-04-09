import express from 'express';
import { addOrder, deleteOrder, getAllOrder, updateOrder } from '../controllers/order';

const router = express.Router();
router.route('/').post(addOrder);
router.route('/:id').get(deleteOrder);
router.route('/:id').delete(updateOrder);

router.route('/').get(getAllOrder);
export default router;
