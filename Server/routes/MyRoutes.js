const express = require('express');
const router = express.Router();
const User = require('../models/Users'); // Adjust the path as necessary
const authMiddleware = require('../config/auth'); // Middleware to verify authentication

// Middleware to protect the route
router.get('/me', authMiddleware, async (req, res) => {
    try {
        // Assuming the user ID is stored in the session or token after authentication
        const userId = req.user.id; // Or req.session.userId, depending on your setup
        console.log("User ID: " + userId);

        // Instead of fetching the user, directly return the userId
        res.status(200).json({ _id: userId }); // Send only the user ID
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
