import { Router } from 'express';
import { loginUser } from '../controller/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').get(verifyJWT, registerUser);
router.route('/login').get(loginUser);
router.route('/logout').get(logoutUser);

export default router;
