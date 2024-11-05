const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Resource = require('../models/Resource');

const seedResources = async () => {
  try {
    await connectDB();
    console.log('Database connection established');

    // Example resources
    const resources = [
      {
        
        title: 'Beekeeping Starter Kit',
        description: 'A complete kit for new beekeepers, including hive, tools, and protective gear.',
        supplier: 'Beekeeping World',
        location: 'Amman',
        price: 200.0,
      },
      {
        title: 'Bee Feed Supplement',
        description: 'High-quality bee feed supplement to ensure healthy hives.',
        supplier: 'Bee Supplies Co.',
        location: 'Irbid',
        price: 50.0,
      },
    ];

    // Clear existing resources
    await Resource.deleteMany({});

    // Insert new resources
    const docs = await Resource.insertMany(resources);
    console.log('Resources inserted:', docs);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
  }
};

seedResources();
