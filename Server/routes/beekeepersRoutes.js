const express = require('express');
const router = express.Router();
const authController = require('../controllers/SignUpbeekeeper'); // Adjust the path as necessary

// Route for beekeeper registration
router.post('/register', authController.registerBeekeeper);

// Route for login
router.post('/login', authController.login);
router.post('/beekeeper-with-shop', authController.createBeekeeperWithShop);


// Example of a protected route
router.get('/dashboard', authController.protect, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.role}, to the dashboard!` });
});

module.exports = router;
