const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path as necessary
const Order = require('../models/Order'); // Adjust path as necessary
const User = require('../models/Users');   // Adjust path as necessary
const Shop = require('../models/Shop');    // Adjust path as necessary
const Product = require('../models/Products'); // Adjust path as necessary

const seedOrders = async () => {
  try {
    await connectDB();
    console.log('Database connection established');

    // Fetch sample data
    const users = await User.find().exec();
    const shops = await Shop.find().exec();
    const products = await Product.find().exec();

    if (users.length === 0 || shops.length === 0 || products.length === 0) {
      console.error('Ensure that you have users, shops, and products in your database.');
      await mongoose.connection.close();
      return;
    }

    // Sample orders data
    const orders = [
      {
        buyer: users[0]._id,
        shop: shops[0]._id,
        products: [
          { product: products[0]._id, quantity: 2 },
          { product: products[1]._id, quantity: 1 }
        ],
        totalAmount: products[0].price * 2 + products[1].price,
        status: 'pending',
        paymentMethod: 'credit_card',
        deliveryOrPickup: 'delivery'
      },
      {
        buyer: users[1]._id,
        shop: shops[1]._id,
        products: [
          { product: products[2]._id, quantity: 3 }
        ],
        totalAmount: products[2].price * 3,
        status: 'accepted',
        paymentMethod: 'paypal',
        deliveryOrPickup: 'pickup'
      }
      // Add more sample orders as needed
    ];

    // Clear existing orders
    await Order.deleteMany({});
    console.log('Cleared existing orders');

    // Insert new orders
    const docs = await Order.insertMany(orders);
    console.log('Orders inserted:', docs);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
  }
};

seedOrders();
