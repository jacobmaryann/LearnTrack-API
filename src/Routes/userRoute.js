import express from 'express';
import requireAuth from '../Middlewares/Authenticate.js';
import { validateSignUp, validateLogin } from '../Validators/validateUser.js';
import { getMyProfile, loginUser, registerUser } from '../Controllers/UserController.js';


const router = express.Router();

router.post('/auth/register', validateSignUp, registerUser);

router.post('/auth/login', validateLogin,  loginUser);

router.get('/myProfile', requireAuth, getMyProfile);


export default router;
