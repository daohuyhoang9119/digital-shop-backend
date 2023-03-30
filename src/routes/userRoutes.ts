import express from 'express';
import { register, getAllUser, getUserById, deleteUser } from '../controllers/user';

const router = express.Router();

router.route('/register').post(register);
router.route('/:id').post(getUserById);
router.route('/:id').delete(deleteUser);
router.route('/').get(getAllUser);
export default router;

//CRUD post get put delete
