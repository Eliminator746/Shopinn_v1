import { Router } from 'express';
import products from '../../data/products.js';
import { ApiError } from '../utils/ApiError.js'

const router = Router();

// Get all products
router.get('/products', (req, res) => {
  return res.
  status(200).
  json({ products });
});

// Get a single product by ID
router.get('/products/:productId', (req, res) => {
  const { productId } = req.params;

  const singleProduct = products.find((p) => p._id === productId);

  if (!singleProduct) {
    throw new ApiError(404,'Product not found')
  }

  return res
  .status(200)
  .json({ singleProduct });
});

export default router;
