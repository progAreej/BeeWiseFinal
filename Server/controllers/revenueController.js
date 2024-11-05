const Payment = require('../models/Payment'); // Adjust path as necessary

// Fetch all transactions
const getAllTransactions = async (req, res) => {
  try {
    const payments = await Payment.find().populate('order_id user_id'); // Populate as needed

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Data for bar chart (grouped by month)
const getMonthlyRevenueChart = async (req, res) => {
  try {
    const payments = await Payment.find({ payment_status: 'completed' });

    // Group by month
    const monthlyData = payments.reduce((acc, payment) => {
      const month = payment.created_at.getMonth(); // 0 = Jan, 11 = Dec
      const year = payment.created_at.getFullYear();
      const key = `${year}-${month + 1}`; // Format as "YYYY-M" for easier charting

      if (!acc[key]) {
        acc[key] = { totalRevenue: 0, totalTransactions: 0 };
      }

      acc[key].totalRevenue += payment.payment_amount;
      acc[key].totalTransactions += 1;
      return acc;
    }, {});

    // Convert to array format for charting (sorting by date for smooth display)
    const chartData = Object.keys(monthlyData)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((key) => ({
        date: key,
        totalRevenue: monthlyData[key].totalRevenue,
        totalTransactions: monthlyData[key].totalTransactions,
      }));

    res.status(200).json(chartData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const getDailyRevenueChart = async (req, res) => {
    try {
      console.log('Fetching daily revenue chart data...'); // Log statement to check the function is called
      const payments = await Payment.find({ payment_status: 'completed' });
  
  
      // Group by day
      const dailyData = payments.reduce((acc, payment) => {
        const date = payment.created_at.toISOString().split('T')[0];
  
        if (!acc[date]) {
          acc[date] = { totalRevenue: 0, totalTransactions: 0 };
        }
  
        acc[date].totalRevenue += payment.payment_amount;
        acc[date].totalTransactions += 1;
        return acc;
      }, {});
  
      // Convert to array format for charting
      const chartData = Object.keys(dailyData)
        .sort((a, b) => new Date(a) - new Date(b))
        .map((key) => ({
          date: key,
          totalRevenue: dailyData[key].totalRevenue,
          totalTransactions: dailyData[key].totalTransactions,
        }));
  
      res.status(200).json(chartData);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
module.exports = {
  getAllTransactions,
  getMonthlyRevenueChart,
  getDailyRevenueChart
};
