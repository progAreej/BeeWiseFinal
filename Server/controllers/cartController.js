const Cart = require('../models/Cart');
const Product = require('../models/Products');
const User = require('../models/Users');
const Shop = require('../models/Shop');

// Get Cart by User ID
const getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product').populate('shop');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

// Add Item to Cart
const addItemToCart = async (req, res) => {
  const { userId, productId, quantity, shopId } = req.body;
  
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      cart = new Cart({ user: userId, items: [], shop: shopId });
    }
    
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    if (cart.shop && cart.shop.toString() !== shopId) {
      return res.status(400).json({ message: 'Cart already contains items from a different shop' });
    }

    cart.shop = shopId;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

// Remove Item from Cart
const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

// Update Item Quantity in Cart
const updateItemQuantityInCart = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item quantity', error });
  }
};
const removeItemsFromShop = async (req, res) => {
  try {
    const { userId, shopId } = req.params;
    await Cart.deleteMany({ userId, shopId });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove items from shop', error });
  }
};
// cartController.js
const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    await Cart.findOneAndDelete({ user: userId });
    res.status(204).send(); // No content on success
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
};


module.exports = {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantityInCart,
  removeItemsFromShop,
  clearCart
};

