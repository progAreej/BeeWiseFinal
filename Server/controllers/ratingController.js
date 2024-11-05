// controllers/ratingController.js
const Product = require('../models/Products'); // Adjust the path as necessary
const Shop = require('../models/Shop'); // Adjust the path as necessary
// Rate a product
const rateProduct = async (req, res) => {
    const { productId, rating } = req.body;
    const userId = req.user.id;
  
    if (!productId || rating == null) {
      return res.status(400).json({ error: 'Product ID and rating are required.' });
    }
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      // Check if user already rated this product
      const existingRating = product.ratings.find((r) => r.userId.toString() === userId);
      if (existingRating) {
        return res.status(200).json({ 
          message: 'You have already rated this product.', 
          userRating: existingRating.rating, 
          averageRating: product.averageRating 
        });
      }
  
      // Add new rating
      product.ratings.push({ userId, rating });
  
      // Calculate new average rating
      const totalRatings = product.ratings.reduce((sum, r) => sum + r.rating, 0);
      product.averageRating = totalRatings / product.ratings.length;
  
      await product.save();
  
      return res.status(200).json({ 
        message: 'Rating submitted successfully.', 
        averageRating: product.averageRating 
      });
    } catch (error) {
      console.error('Error rating product:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };
  
  const rateShop = async (req, res) => {
    const { shopId, rating } = req.body;
    const userId = req.user.id;
  
    if (!shopId || rating == null) {
      return res.status(400).json({ error: 'Shop ID and rating are required.' });
    }
  
    try {
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found.' });
      }
  
      // Check if user already rated this shop
      const existingRating = shop.ratings.find((r) => r.userId.toString() === userId);
      if (existingRating) {
        return res.status(200).json({ 
          message: 'You have already rated this shop.', 
          userRating: existingRating.rating, 
          averageRating: shop.averageRating 
        });
      }
  
      // Add new rating
      shop.ratings.push({ userId, rating });
  
      // Calculate new average rating
      const totalRatings = shop.ratings.reduce((sum, r) => sum + r.rating, 0);
      shop.averageRating = totalRatings / shop.ratings.length;
  
      await shop.save();
  
      return res.status(200).json({ 
        message: 'Rating submitted successfully.', 
        averageRating: shop.averageRating 
      });
    } catch (error) {
      console.error('Error rating shop:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };
  

// Export the functions
module.exports = {
  rateProduct,
  rateShop,
};
