
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth =require('../config/auth')

// Create a new order
router.post('/orders', orderController.createOrder);

// Get all orders
router.get('/orders', orderController.getAllOrders);
router.get('/orders/user',auth, orderController.getOrdersByUserId);
router.get('/orders/admin', orderController.getAllOrdersForAdmin);

// Get orders by shop ID
router.get('/orders/shop/:shop_id', orderController.getOrdersByShopId);
router.patch('/orders/:order_id/status', orderController.updateOrderStatus);

module.exports = router;
