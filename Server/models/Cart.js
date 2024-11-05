const mongoose = require('mongoose');

// Define a schema for cart items
const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 } // Quantity must be at least 1
});

// Define a schema for the cart
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User schema
  items: [cartItemSchema], // Array of cart items
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' } // Optional reference to Shop schema if needed
});

// Create a Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
