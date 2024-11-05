

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create a new payment
router.post('/payments', paymentController.createPayment);

// Get all payments
router.get('/payments', paymentController.getAllPayments);

// Get payments by shop ID
router.get('/payments/shop/:shop_id', paymentController.getPaymentsByShopId);

module.exports = router;
