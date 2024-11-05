const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Cart = require('../models/Cart');
const Product = require('../models/Products');
const User = require('../models/Users');

const seedCarts = async () => {
  try {
    await connectDB();
    console.log('Database connection established');

    // Fetch all users and products
    const users = await User.find({}).exec();
    const products = await Product.find({}).exec();

    if (users.length === 0 || products.length === 0) {
      console.error('No users or products found. Ensure that you have users and products in the database.');
      await mongoose.connection.close();
      return;
    }

    // Example carts
    const carts = [
      {
        user: users[0]._id,
        items: [
          { product: products[0]._id, quantity: 1 },
          { product: products[1]._id, quantity: 2 },
        ],
      },
      {
        user: users[1]._id,
        items: [
          { product: products[2]._id, quantity: 3 },
          { product: products[3]._id, quantity: 1 },
        ],
      },
    ];

    // Clear existing carts
    await Cart.deleteMany({});

    // Insert new carts
    const docs = await Cart.insertMany(carts);
    console.log('Carts inserted:', docs);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
  }
};

seedCarts();
