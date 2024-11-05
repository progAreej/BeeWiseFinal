const express = require('express');
const router = express.Router();
const auth =require('../config/auth')
const {
  getShops,
  getShopById,
  createShop,
  getShopByBeekeeperId,
  updateShopByBeekeeperId,
  getShopByID,
  getTopRatedShops
} = require('../controllers/shopController'); // Adjust path as needed

// Route to get all approved shops with filtering, pagination, and search
router.get('/shops', getShops);
// getShopById
// Route to get a shop by its ID
router.get('/shops/:id', getShopById);
router.get('/api/shops/:id', getShopByID);

// Route to create a new shop
router.post('/shop', createShop);
router.get('/shop/top-rated', getTopRatedShops);

// Route to get a shop by beekeeper's ID
router.get('/shop',auth, getShopByBeekeeperId);

// Route to update a shop by beekeeper's ID
router.put('/shop',auth, updateShopByBeekeeperId);

module.exports = router;


// http://localhost:3000/api/shop/66e8557a48d01dd560195aa6