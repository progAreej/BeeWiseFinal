const express = require('express');
const { updateRecentlyViewed, getRecentlyViewed } = require('../controllers/RecentViewController'); // Adjust path as necessary
const authMiddleware = require('../config/auth'); // Adjust path to your auth middleware

const router = express.Router();

// POST: Update Recently Viewed Products
router.post('/', authMiddleware, updateRecentlyViewed);

// GET: Fetch Recently Viewed Products
router.get('/', authMiddleware, getRecentlyViewed);

module.exports = router;
