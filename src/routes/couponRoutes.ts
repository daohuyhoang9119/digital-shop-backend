import express from 'express';
import { addCoupon, deleteCoupon, getAllCoupon, updateCoupon } from '../controllers/coupon';

const router = express.Router();
router.route('/').post(addCoupon);
router.route('/:id').get(deleteCoupon);
router.route('/:id').delete(updateCoupon);

router.route('/').get(getAllCoupon);
export default router;
