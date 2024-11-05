// routes/stripeRoutes.js
const express = require('express');
const { createPayment } = require('../controllers/stripeController');

const router = express.Router();

// Define the payment route
router.post('/payment', createPayment);

module.exports = router;
