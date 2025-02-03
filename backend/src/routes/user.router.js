import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controller/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').get(registerUser);
router.route('/login').get(loginUser);
router.route('/logout').get(verifyJWT, logoutUser);

export default router;
