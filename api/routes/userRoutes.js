import express from 'express'
import {
  getAllUsers,
  getUserbyId,
  deleteUser
} from '../controllers/userController.js'

import { signup } from '../controllers/authControllers.js';
const router = express.Router();

router.get('/', getAllUsers); // get all users
router.get('/:id', getUserbyId);
router.delete('/:id', deleteUser);

router.post('/signup', signup);

export default router;
