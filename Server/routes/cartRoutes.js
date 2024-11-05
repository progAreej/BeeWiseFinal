// const express = require('express');
// const router = express.Router();
// const cartController = require('../controllers/cartController');

// // Get Cart by User ID
// router.get('/cart/:userId', cartController.getCartByUserId);

// // Add Item to Cart
// router.post('/cart/add', cartController.addItemToCart);

// // Remove Item from Cart
// router.delete('/cart/remove/:userId/:productId', cartController.removeItemFromCart);

// // Update Item Quantity in Cart
// router.put('/cart/update/:userId/:productId', cartController.updateItemQuantityInCart);

// module.exports = router;


const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get Cart by User ID
router.get('/cart/:userId', cartController.getCartByUserId);

// Add Item to Cart
router.post('/cart/add', cartController.addItemToCart);

// Remove Item from Cart
router.delete('/cart/remove/:userId/:productId', cartController.removeItemFromCart);

// Remove All Items from a Specific Shop
router.delete('/cart/shop/:userId/:shopId', cartController.removeItemsFromShop);

// Update Item Quantity in Cart
router.put('/cart/update/:userId/:productId', cartController.updateItemQuantityInCart);
router.delete('/cart/:userId/clear', cartController.clearCart); 

module.exports = router;
