import { Router } from 'express';
// import products from '../../data/products.js';
import { getProducts, getProductById } from '../controller/product.controller.js'

const router = Router();

// Get all products
router.route('/products').get(getProducts);

// Get a single product by ID
router.route('/products/:productId').get(getProductById);

export default router;
