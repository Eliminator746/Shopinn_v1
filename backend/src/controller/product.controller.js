import { Product } from '../models/product.models.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getProducts = asyncHandler(async (req, res) => {

  const products = await Product.find();
  if (!products) throw new ApiError(500, 'Failed to fetch products');

  return res.status(200).json({ products });
});

const getProductById = asyncHandler(async (req, res) => {
    
  const singleProduct = await Product.findById(req.params.productId);
  if (!singleProduct) {
    throw new ApiError(404, 'Product not found');
  }

  return res.status(200).json({ singleProduct });
});

export { getProducts, getProductById };
