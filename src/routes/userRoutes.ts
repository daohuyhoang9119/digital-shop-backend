import express from 'express';
import { register } from '../controllers/user';

const router = express.Router();

router.route('/register').post(register);
export default router;

//CRUD post get put delete
