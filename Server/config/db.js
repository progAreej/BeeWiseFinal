// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL ;
    // || "mongodb+srv://areej:12345@cluster0.v1t71.mongodb.net/BeeWise?retryWrites=true&w=majority&appName=Cluster0";
    console.log('Loaded MONGO_URL:', uri); // Debugging line
    if (!uri) {
      throw new Error('MONGO_URI is not defined in .env file');
    }
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;


// // config/db.js
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables

// const connectDB = async () => {
//   try {
//     const uri = process.env.MONGO_URL;
//     console.log('Loaded MONGO_URL:', uri); // Debugging line
//     if (!uri) {
//       throw new Error('MONGO_URL is not defined in .env file');
//     }

//     await mongoose.connect(uri, {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//       connectTimeoutMS: 10000,  // 10 seconds
//       socketTimeoutMS: 45000,    // 45 seconds
//     });

//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message || error);
//     process.exit(1); // Exit process with failure
//   }
// };

// module.exports = connectDB;


