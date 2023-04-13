import express from 'express';
import { addWishList, deleteWishList, getAllWishList } from '../controllers/wishlist';

const router = express.Router();
router.route('/').post(addWishList);
router.route('/:id').get(deleteWishList);

router.route('/').get(getAllWishList);
export default router;
