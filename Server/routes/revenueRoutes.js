const express = require('express');
const router = express.Router();
const { getAllTransactions, getMonthlyRevenueChart ,getDailyRevenueChart } = require('../controllers/revenueController');

// Route to get all transactions
router.get('/revenue/transactions', getAllTransactions);

// Route to get monthly revenue chart data
router.get('/transactions/chart/monthly-revenue', getMonthlyRevenueChart);
router.get('/chart/daily-revenue', getDailyRevenueChart); // Add this line for daily revenue

module.exports = router;
