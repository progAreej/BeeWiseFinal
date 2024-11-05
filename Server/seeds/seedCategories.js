const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust the path
const Category = require('../models/Category'); // Adjust the path

const seedCategories = async () => {
  try {
    await connectDB();
    console.log('Database connection established');

    // Define honey product categories
    const categories = [
      {
        name: 'Raw Honey',
        description: 'Unprocessed, pure honey extracted directly from the hive.',
      },
      {
        name: 'Flavored Honey',
        description: 'Honey infused with natural flavors like cinnamon, lavender, or lemon.',
      },
      {
        name: 'Beeswax Products',
        description: 'Products made from beeswax, such as candles, lip balms, and skincare items.',
      },
      {
        name: 'Honeycombs',
        description: 'Natural honeycomb containing raw honey, straight from the hive.',
      },
      {
        name: 'Propolis',
        description: 'Propolis, a resin-like substance collected by bees, known for its health benefits.',
      },
      {
        name: 'Royal Jelly',
        description: 'A nutrient-rich substance produced by bees, often used as a dietary supplement.',
      },
      {
        name: 'Bee Pollen',
        description: 'Collected pollen from flowers, known for its nutritional and medicinal properties.',
      },
      {
        name: 'Honey Gift Sets',
        description: 'Curated gift sets featuring various honey products, perfect for special occasions.',
      },
    ];

    // Clear existing categories
    await Category.deleteMany({});

    // Insert new categories
    const docs = await Category.insertMany(categories);
    console.log('Categories inserted:', docs);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
  }
};

seedCategories();
