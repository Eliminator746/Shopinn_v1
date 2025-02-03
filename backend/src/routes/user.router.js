import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  getUserById,
  deleteUser,
  updateUser,
} from '../controller/user.controller.js';
import { verifyJWT, admin } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').post(registerUser).get(verifyJWT, admin, getUsers);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/profile').get(verifyJWT, getUserProfile).put(verifyJWT, updateUserProfile);
router.route('/:id').get(verifyJWT, admin, getUserById).delete(verifyJWT, admin, deleteUser).put(verifyJWT, admin, updateUser);

export default router;
