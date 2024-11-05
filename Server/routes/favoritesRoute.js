const express = require('express');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favorites');
const router = express.Router();
const authMiddleware = require('../config/auth'); // Assuming you have an auth middleware

router.post('/favorites', authMiddleware, addFavorite); // Add favorite product
router.delete('/favorites/:productId', authMiddleware, removeFavorite);
router.get('/favorites', authMiddleware, getFavorites); // Get user's favorite products

module.exports = router;
