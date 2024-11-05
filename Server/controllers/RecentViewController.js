
const mongoose = require('mongoose');
const User = require('../models/Users'); 
const Product = require('../models/Products'); // Assuming you have a Product model

// POST: Update Recently Viewed Products
const updateRecentlyViewed = async (req, res) => {
  const { productId } = req.body;
  
  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required.' });
  }

  try {
    const userId = req.user.id; // Get user ID from the authenticated user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Remove the product if it exists to avoid duplication
    user.recentlyViewedProducts = user.recentlyViewedProducts.filter(
      (id) => id.toString() !== productId
    );

    // Add the product to the beginning of the list
    user.recentlyViewedProducts.unshift(productId);

    // Limit the list to 5 products (or any number you choose)
    if (user.recentlyViewedProducts.length > 3) {
      user.recentlyViewedProducts.pop();
    }

    // Save the updated user data
    await user.save();
    return res.status(200).json({ message: 'Product added to recently viewed.' });
  } catch (error) {
    console.error('Error updating recently viewed products:', error);
    return res.status(500).json({ error: 'Error updating recently viewed products.' });
  }
};

// GET: Fetch Recently Viewed Products
const getRecentlyViewed = async (req, res) => {
  const userId = req.user.id; // Get user ID from the authenticated user
  try {
    const user = await User.findById(userId).populate('recentlyViewedProducts'); // Populate product details
    
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json(user.recentlyViewedProducts); // Send back the recently viewed products
  } catch (error) {
    console.error('Error fetching recently viewed products:', error);
    return res.status(500).json({ error: 'Error fetching recently viewed products.' });
  }
};

module.exports = {
  updateRecentlyViewed,
  getRecentlyViewed,
};
