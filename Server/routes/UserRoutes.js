const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../config/auth');

// Sign up route (no auth needed)
router.post('/signup', UserController.signup);

// Login route (no auth needed)
router.post('/login', UserController.login);

// Google Sign-In route (no auth needed)
router.post('/google', UserController.googleLogin);

// Protected route example (requires authentication)
router.get('/protected', auth, (req, res) => {
    res.status(200).json({ message: 'This is a protected route.', user: req.user });
});

// Optional: Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});


// admin - -------------
router.get('/beekeepers', UserController.getBeekeepers);
router.patch('/changeApproveBeekeepers', UserController.changeApprovalStatusBeekeepers);

router.get('/admins', UserController.getAdmins);
router.patch('/changeApprovalStatus', UserController.changeApprovalStatus); // Ensure this matches your request in the front end


router.get('/customers', UserController.getCustomers);
router.post('/admins', UserController.addAdmin);

// PUT to update admin approval status
router.patch('/admins/:id/approval', UserController.updateAdminApproval);

// router.get('/me', auth , getCurrentUser);

module.exports = router;
