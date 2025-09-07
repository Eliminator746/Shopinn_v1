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
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
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
      .json(new ApiResponse(200, createdOrder, 'Order fetched successfully'));
  }
});

// ------------------------------------------------------------------------------------------------------------------------
// Fixed: await + .length
const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });

  if (!order.length) throw new ApiError(404, "Nothing you've ordered yet");

  return res
    .status(200)
    .json(new ApiResponse(200, order, 'Order fetched successfully'));
});

// @route   GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }
  return res
    .status(200)
    .json(new ApiResponse(200, order, 'Order fetched successfully'));
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer?.email_address,
    };

    const updatedOrder = await order.save();
    return res
      .status(200)
      .json(new ApiResponse(200, order, 'Updating order status to paid'));
  } else {
    throw new ApiError(404, 'Order not found');
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  console.log('Updating order status to delivered');
  const updateOrder = await Order.findById( req.params.id );
  if (updateOrder) {
    updateOrder.isDelivered = true;
    updateOrder.deliveredAt = Date.now();

    const updatedOrder = await updateOrder.save();
    res
      .status(200)
      .json(new ApiResponse(200, { updatedOrder }, 'Updated Order'));
  } else {
    throw new ApiError(404, 'Order not found');
  }
  console.log(updateOrder);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', '_id name');
  if (!orders) {
    throw new ApiError(404, 'No orders found');
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { orders }, 'Orders fetched successfully'));
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
