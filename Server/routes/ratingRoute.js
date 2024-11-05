// routes/ratingRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../config/auth'); // Adjust path as needed
const { rateProduct, rateShop } = require('../controllers/ratingController'); // Adjust path as needed

// Rate a product
router.post('/products/rate', authMiddleware, rateProduct);

// Rate a shop
router.post('/shops/rate', authMiddleware, rateShop);

module.exports = router;
