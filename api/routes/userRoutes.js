import express from 'express'
import {
  deleteUser
} from '../controllers/userController.js'

import { login, signup, logout } from '../controllers/authControllers.js';
const router = express.Router();
router.delete('/:id', deleteUser);

router.post('/signup', signup);
router.post ('/login', login);
router.get('/logout', logout);

export default router;
