
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Shop = require('../models/Shop'); // Adjust the path to your Shop model

const User = require('../models/Users'); // Adjust the path as necessary

// Register beekeeper
exports.registerBeekeeper = async (req, res) => {
  try {
    const { username, email, password, fullName, phoneNumber, apiaryLocation, experienceYears } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user (beekeeper)
    const newUser = new User({
      username,
      email,
      passwordHash,
      phoneNumber,
      role: 'beekeeper',
      apiaryLocation,
      experienceYears
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'Beekeeper registered successfully!',
      token: token
    });
  } catch (error) {
    console.error('Error registering beekeeper:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided password with the stored password hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};

// Middleware to protect routes
exports.protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach the user info to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};


// const bcrypt = require('bcrypt'); // Make sure to import bcrypt
// const jwt = require('jsonwebtoken'); // Make sure to import jsonwebtoken

// exports.createBeekeeperWithShop = async (req, res) => {
//   try {
//     const {
//       username,
//       email,
//       password,
//       phoneNumber,
//       profilePicture,
//       apiaryLocation,
//       experienceYears,
//       shopName,
//       description,
//       location,
//       latitude,
//       longitude,
//       logo,
//       BeekeeperOwnershipCertificate,
//       BeehiveLicense,
//       HealthCertificate,
//       TaxRegistrationfortheBeehive,
//     } = req.body;

//     // Step 1: Check if user with the given email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists with this email' });
//     }

//     // Step 2: Hash the password
//     const saltRounds = 10;
//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     // Step 3: Create the User (Beekeeper)
//     const newUser = new User({
//       username,
//       email,
//       passwordHash, // Use the hashed password
//       phoneNumber,
//       profilePicture,
//       role: 'beekeeper',
//       apiaryLocation,
//       experienceYears,
//     });

//     // Save the user to the database
//     const savedUser = await newUser.save();

//     // Step 4: Create the Shop using the saved user's ID
//     const newShop = new Shop({
//       beekeeper: savedUser._id, // Reference the user ID
//       shopName,
//       description,
//       location,
//       latitude,
//       longitude,
//       logo,
//       BeekeeperOwnershipCertificate,
//       BeehiveLicense,
//       HealthCertificate,
//       TaxRegistrationfortheBeehive,
//     });

//     // Save the shop to the database
//     await newShop.save();

//     // Optionally, generate a JWT token
//     const token = jwt.sign({ id: savedUser._id, email: savedUser.email, role: savedUser.role }, process.env.SECRET_KEY, {
//       expiresIn: '1h',
//     });

//     // Respond with success
//     res.status(201).json({
//       message: 'Beekeeper and shop created successfully!',
//       token: token, // Include the token in the response
//       user: savedUser,
//       shop: newShop,
//     });
//   } catch (error) {
//     console.error('Error creating beekeeper and shop:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };


// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Adjust the path as necessary
// const Shop = require('../models/Shop'); // Adjust the path as necessary

exports.createBeekeeperWithShop = async (req, res) => {
  try {
    const {
      username,
      email,
      password, // Use 'password' instead of 'passwordHash' for clarity
      phoneNumber,
      profilePicture,
      apiaryLocation,
      experienceYears,
      shopName,
      description,
      location,
      latitude,
      longitude,
      logo,
      BeekeeperOwnershipCertificate,
      BeehiveLicense,
      HealthCertificate,
      TaxRegistrationfortheBeehive,
    } = req.body;

    // Step 1: Check if user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Step 2: Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds); // Use the password variable here

    // Step 3: Create the User (Beekeeper)
    const newUser = new User({
      username,
      email,
      passwordHash, // Use the hashed password
      phoneNumber,
      profilePicture,
      role: 'beekeeper',
      apiaryLocation,
      experienceYears,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Step 4: Create the Shop using the saved user's ID
    const newShop = new Shop({
      beekeeper: savedUser._id, // Reference the user ID
      shopName,
      description,
      location,
      latitude,
      longitude,
      logo,
      BeekeeperOwnershipCertificate,
      BeehiveLicense,
      HealthCertificate,
      TaxRegistrationfortheBeehive,
    });

    // Save the shop to the database
    await newShop.save();

    // Optionally, generate a JWT token
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email, role: savedUser.role },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Respond with success
    res.status(201).json({
      message: 'Beekeeper and shop created successfully!',
      token, // Include the token in the response
      user: savedUser,
      shop: newShop,
    });
  } catch (error) {
    console.error('Error creating beekeeper and shop:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
