const express = require('express');
const router = express.Router();
const { User } = require('../models/Users'); // Assuming you have a User model

router.get('/user/:id', async (req, res) => {
    try {
        // Find user by ID
        const user = await User.findById(req.params.id).select('role'); // Adjust fields as necessary
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
