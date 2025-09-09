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
  const { productId, name, description, brand, category, price, countInStock } = req.body;

  const product = await Product.findById(productId);

  if (product) {
    product.name = name;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.price = price;
    product.countInStock = countInStock;
  }

  const updatedProduct = await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, 'Product Data Updated'));
});

export { getProducts, getProductById, createProduct, updateProduct };
