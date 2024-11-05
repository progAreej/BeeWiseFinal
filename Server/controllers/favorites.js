const User = require('../models/Users');
const Product = require('../models/Products');

// POST: Add product to favorites
const addFavorite = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; // Get user ID from the middleware

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Add the product to the user's favorite list if not already added
    if (!user.favoriteProducts.includes(productId)) {
      user.favoriteProducts.push(productId);
      await user.save();
      return res.status(200).json({ message: 'Product added to favorites.' });
    }

    return res.status(400).json({ error: 'Product is already in favorites.' });
  } catch (error) {
    console.error('Error adding product to favorites:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// DELETE: Remove product from favorites
const removeFavorite = async (req, res) => {
    const { productId } = req.params; // Get productId from URL parameters
    const userId = req.user.id; // Get user ID from the middleware
  
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required.' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Remove the product from the user's favorite list
      user.favoriteProducts = user.favoriteProducts.filter(
        (id) => id.toString() !== productId
      );
      await user.save();
  
      return res.status(200).json({ message: 'Product removed from favorites.' });
    } catch (error) {
      console.error('Error removing product from favorites:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };
// GET: Fetch user's favorite products
const getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('favoriteProducts');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json(user.favoriteProducts);
  } catch (error) {
    console.error('Error fetching favorite products:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
};
