import express from 'express';
import { addCategory, deleteCategory, getAllCategory, updateCategory } from '../controllers/category';

const router = express.Router();
router.route('/').post(addCategory);
router.route('/').get(getAllCategory);
router.route('/:id').get(deleteCategory);
router.route('/:id').delete(updateCategory);
