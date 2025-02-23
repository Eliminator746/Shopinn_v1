import { Order } from '../models/order.models.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js' 

// ------------------------------------------------------------------------------------------------------------------------
//                                                       Create Order LOGIC
// ------------------------------------------------------------------------------------------------------------------------

    // 1. Check if orderItems exist and is not empty
    // 2. Create a new order document
// ------------------------------------------------------------------------------------------------------------------------
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Check if orderItems exist and is not empty
  if (!orderItems || orderItems.length === 0) {
    throw new ApiError(400,'No order items');
  } else {

    // Create a new order document
    const order = new Order({
      orderItems: orderItems.map((x) => ({ ...x, product: x._id, _id: undefined })),
      user: req.user._id, 
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Save the order to the database
    const createdOrder = await order.save();
    return res
  .status(201)
  .json(new ApiResponse(200, createdOrder, "Order fetched successfully"))

  }
});

// ------------------------------------------------------------------------------------------------------------------------

const getMyOrders = asyncHandler(async (req, res) => {
  const order= Order.find({user : req.user._id})

  if(!order)
    throw new ApiError(404, "Nothing you've ordered yet")

  return res
  .status(200)
  .json(new ApiResponse(200, order, "Order fetched successfully"))

});

// @route   GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {

  const orderId= req.params.id;
  const order = await Order.findById(req.params.id).populate(
    'user','username email'
  )

  if(!order)
    throw new ApiError(404, "Order not found")

  return res
  .status(200)
  .json(new ApiResponse(200, order, "Order fetched successfully"))

});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  console.log('Updating order status to paid');
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  console.log('Updating order status to delivered');
});

const getOrders = asyncHandler(async (req, res) => {
  console.log('Getting all orders - admin access');
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
