const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path as necessary
const Payment = require('../models/Payment'); // Adjust path as necessary
const Order = require('../models/Order'); // Adjust path as necessary
const User = require('../models/Users'); // Adjust path as necessary

const seedPayments = async () => {
  try {
    await connectDB();
    console.log('Database connection established');

    // Fetch sample data
    const users = await User.find().exec();
    const orders = await Order.find().exec();

    if (users.length === 0 || orders.length === 0) {
      console.error('Ensure that you have users and orders in your database.');
      await mongoose.connection.close();
      return;
    }

    // Sample payments data
    const payments = [];
    for (let i = 0; i < 20; i++) {
      payments.push({
        order_id: orders[i % orders.length]._id, // Loop through orders
        user_id: users[i % users.length]._id, // Loop through users
        payment_method: i % 2 === 0 ? 'stripe' : 'paypal', // Alternate payment methods
        payment_amount: Math.floor(Math.random() * 200) + 50, // Random amount between 50 and 250
        payment_status: i % 3 === 0 ? 'pending' : 'completed', // Alternate status
        transaction_id: `trans_${i + 1}`, // Unique transaction ID
        created_at: new Date(),
      });
    }

    // Clear existing payments
    await Payment.deleteMany({});
    console.log('Cleared existing payments');

    // Insert new payments
    const docs = await Payment.insertMany(payments);
    console.log('Payments inserted:', docs);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
  }
};

seedPayments();
