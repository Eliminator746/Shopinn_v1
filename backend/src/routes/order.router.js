import express from 'express';
import { Router } from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controller/order.controller.js';
import { verifyJWT, admin } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').post(verifyJWT, addOrderItems).get(verifyJWT, admin, getOrders);
router.route('/myorders').get(verifyJWT, getMyOrders);
router.route('/:id').get(verifyJWT, getOrderById);
router.route('/:id/pay').put(verifyJWT, updateOrderToPaid);
router.route('/:id/deliver').put(verifyJWT, admin, updateOrderToDelivered);


export default router;