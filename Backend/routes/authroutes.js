import express from 'express';
import { loginUser, registerUser } from '../controller/authcontroller.js'
const authRoutes = express.Router();

authRoutes.post('/signup', registerUser);
authRoutes.post('/login', loginUser);

export default authRoutes;