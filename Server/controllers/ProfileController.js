require('dotenv').config();
const User = require('../models/Users'); // Ensure the path is correct


exports.getProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const user = await User.findById(req.user.id).select('-passwordHash');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Role-specific logic (if beekeeper)
        if (user.role === 'beekeeper') {
            return res.status(200).json({
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profilePicture: user.profilePicture ,
                role: user.role,
                apiaryLocation: user.apiaryLocation,
                experienceYears: user.experienceYears,
                subscription: user.subscription,
                isApproved: user.isApproved,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });
        }

        // For non-beekeepers
        return res.status(200).json({
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profilePicture: user.profilePicture ,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

    } catch (error) {
        console.error('Error getting profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { username, phoneNumber, apiaryLocation, experienceYears } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update common fields
        user.username = username || user.username;
        user.phoneNumber = phoneNumber || user.phoneNumber;

        // Update profile picture if provided
        if (req.body.profilePicture) { // Check if the profilePicture is in the body
            user.profilePicture = req.body.profilePicture; // Use the URL from the body
        }

        // Save the updated user
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};
