import { Product } from '../models/product.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// ------------------------------------------------------------------------------------------------------------------------
//                                                          GET PRODUCTS + PAGINATION included
// ------------------------------------------------------------------------------------------------------------------------
// 1. 
// 2. 
// 3. 
// 4. 
// 5. 
// 6. 
// 7. 
// NOTE -> 
// ------------------------------------------------------------------------------------------------------------------------
const getProducts = asyncHandler(async (req, res) => {
  const isAdmin = req.query.isAdmin === 'true';
  const pageSize = isAdmin ? 10 : 8; // 10 items per page for admin, 8 for home screen
  const page = Number(req.query.pageNumber) || 1
  const count = await Product.countDocuments()

  const products = await Product.find({}).limit(pageSize).skip(pageSize * (page-1));
  if (!products) throw new ApiError(500, 'Failed to fetch products');

  return res.status(200).json({ products, page, pages:Math.ceil(count/pageSize) });
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


// ------------------------------------------------------------------------------------------------------------------------
//                                                          CREATE REVIEWS
// ------------------------------------------------------------------------------------------------------------------------
// 1. Comment and rating will come from req.body
// 2. Product should be there
// 3. Check if user already reviewed
// 4. If not present, let them add you review
// 5. Add numReviews
// 6. Add rating (overall)
// 7. Save it to db and return it
// NOTE -> Added Number() conversion for rating + Added proper type comparison for user IDs using toString()
// ------------------------------------------------------------------------------------------------------------------------

const createReview = asyncHandler(async (req,res)=> {
  const {rating, comment}= req.body;
  const product= await Product.findById(req.params.id);

  if(!product)
    throw new ApiError(400, "Product doesn't exist")

   // Check if user already reviewed
  const alreadyReviewdone = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if(alreadyReviewdone){
    throw new ApiError(400, "Review already done")
  }
  const review={
    name: req.user.name,
    rating:  Number(rating),
    comment,
    user:req.user._id
  }

  product.reviews.push(review);
  
  product.numReviews = product.reviews.length;
  product.rating =
    Math.round(
      (product.reviews.reduce((acc, item) => acc + item.rating, 0) /
        product.reviews.length) * 100
    ) / 100; 

  await product.save();

  return res
  .status(201)
  .json(new ApiResponse(201, product, 'Review created successfully'));

})

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createReview };
