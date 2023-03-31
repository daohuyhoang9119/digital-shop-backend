import express from 'express';
import { register, getAllUser, getUserById, deleteUser, login, updateUserById } from '../controllers/user';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/:id').post(getUserById);
router.route('/:id').delete(deleteUser);
router.route('/:id').put(updateUserById);
router.route('/').get(getAllUser);
export default router;

//CRUD post get put delete
