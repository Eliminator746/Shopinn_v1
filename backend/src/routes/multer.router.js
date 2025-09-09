import path from 'path';
import express from 'express'
import { Router } from 'express'
import { admin } from '../middlewares/auth.middleware.js';
import { uploadImage } from '../controller/user.controller.js';
import upload from '../middlewares/multer.middleware.js';

const router= Router();

router.route('/').post(upload.single('image'), uploadImage);


export default router;