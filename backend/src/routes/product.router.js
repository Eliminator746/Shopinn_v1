import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct } from '../controller/product.controller.js'
import { verifyJWT, admin } from '../middlewares/auth.middleware.js';

const router = Router();

// Get all products + Create a new product
router.route('/products').get(getProducts).post(verifyJWT, admin, createProduct);

// Get a single product by ID
router.route('/products/:productId').get(getProductById);

// Update product
router.route('/products/:id/product').put(verifyJWT, admin, updateProduct)

export default router;
