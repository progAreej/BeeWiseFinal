const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');
const upload = require('../config/multerConfig'); // Ensure the path is correct
const auth = require('../config/auth'); // Middleware for authentication

// Protected route example (requires authentication)
router.get('/profile', auth, ProfileController.getProfile);
router.put('/updateProfile', upload, ProfileController.updateProfile);

// Update user profile (requires authentication)
// router.put('/profile', auth, ProfileController.updateProfile);
router.put('/profile', auth, upload, ProfileController.updateProfile);


module.exports = router;
