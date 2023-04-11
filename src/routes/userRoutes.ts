import express from 'express';
import {
  register,
  getAllUser,
  getUserById,
  deleteUser,
  login,
  updateUserById,
  refreshAccessToken,
  updateCart
} from '../controllers/user';
import { verifyAccessToken } from '../middlewares/auth';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/cart').post(verifyAccessToken, updateCart);
router.route('/').get(verifyAccessToken, getAllUser);
router.route('/:id').post(getUserById);
router.route('/:id').delete(deleteUser);
router.route('/:id').put(updateUserById);
export default router;

//CRUD post get put delete
