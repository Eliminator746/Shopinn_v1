import { Product } from '../models/product.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
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

const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product({
    name: 'Sample name',
    image: '/images/sample.jpg',
    description: 'Sample description',
    brand: 'Sample brand',
    category: 'Sample category',
    price: 0,
    reviews: [],
    countInStock: 0,
    user: req.user,
  });

  // Save the order to the database
  const createdProduct = await newProduct.save();
  return res
    .status(201)
    .json(
      new ApiResponse(200, createdProduct, 'New Product added successfully')
    );
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, brand, category, price, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.price = price || product.price;
  product.countInStock = countInStock || product.countInStock;

  const updatedProduct = await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, 'Product Updated Successfully'));
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  await Product.deleteOne({ _id: product._id });

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Product deleted successfully'));
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
