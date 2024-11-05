// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// const auth =require('../config/auth')
// // Routes for managing products within a shop
// router.post('/products',auth, productController.createProduct);
// router.get('/shops/:shopId/products', productController.getProductsByShop);
// router.get('/products/:id', productController.getProductById);
// router.put('/products/:id', productController.updateProduct);
// router.delete('/products/:id', productController.deleteProduct);
// router.get('/categories/products', productController.getCategoriesWithProducts);


// router.get('/products',auth, productController.getProducts);

// // Update a product for the authenticated beekeeper
// router.put('/products',auth, productController.updateProduct);

// module.exports = router;


const express = require('express');
const {
  getProductsByShop,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategoriesWithProducts,
  getProducts,
  getTopRatedProducts,
  getAllProducts,
  updateProductStatus,
  
} = require('../controllers/productController');

const router = express.Router();

// Middleware to protect routes (assuming you have a function for authentication)
const authenticate  = require("../config/auth")

// Get all products for a specific shop
router.get('/shop/:shopId/products', getProductsByShop);

// Get a single product by ID
router.get('/products/:id', getProductById);
router.get('/top-rated', getTopRatedProducts);

// Create a new product
router.post('/products', authenticate, createProduct);

// Update a product by ID
router.put('/products/:productId', authenticate, updateProduct);

// Delete a product by ID
router.delete('/products/:id', authenticate, deleteProduct);

// Get products by category
router.get('/products/category/:category', authenticate, getCategoriesWithProducts);

// Get all products for the authenticated beekeeper
router.get('/beekeeper/products', authenticate, getProducts);


router.get('/products',getAllProducts); 
router.patch('/products/:productId/status', updateProductStatus);


module.exports = router;
