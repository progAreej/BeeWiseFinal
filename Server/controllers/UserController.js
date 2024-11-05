const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/Users'); // Adjust the path based on your project structure
const { userSchema, loginSchema } = require('../validations/userValidation'); // Adjust path as necessary
const SECRET_KEY = process.env.SECRET_KEY|| 'your-secret-key'; // Ensure this is secure
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password (or App Password)
  },
});

exports.signup = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
const newUser = new User({
  username,
  email,
  passwordHash: hashedPassword,
  role,
});
await newUser.save();

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000 // 1 hour
    });

    // Respond with the user's ID and token
    return res.status(201).json({ user: newUser._id, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user.', error });
  }
};


exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body, { presence: 'required' });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // const isMatch = await bcrypt.compare(password, user.passwordHash);
    const isMatch = await bcrypt.compare(password, user.passwordHash);
console.log({ password, storedPassword: user.passwordHash, isMatch });

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }


    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '4h' }
    );

    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });

    // Respond with the user's ID and token
    return res.status(201).json({ id: user._id, token, role: user.role ,isApproved:user.isApproved});
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in.', error });
  }
};

// Google Sign-In
exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, name, email, picture: avatar } = payload;

    let user = await User.findOne({ email });
    if (user) {
      if (!user.googleId) {
        user.googleId = googleId; // Update googleId if not already set
        await user.save();
      }
    } else {
      user = new User({ googleId, username: name, email, profilePicture: avatar, role: 'user' });
      await user.save();
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error during Google login:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// admin---------------------------
exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
};

// Get all beekeepers


// Get all admins

// exports.getAdmins = async (req, res) => {
//   try {
//     const admins = await User.find({ role: 'admin' });
//     res.status(200).json(admins);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching admins', error });
//   }
// };

// exports.addAdmin = async (req, res) => {
//   const { email, password, name } = req.body; // Assuming you want to capture these fields

//   // Basic validation
//   if (!email || !password || !name) {
//     return res.status(400).json({ message: 'Email, password, and name are required' });
//   }

//   try {
//     // Create new admin user
//     const newAdmin = new User({
//       email,
//       password, // Remember to hash this before saving in a real application
//       username,
//       role: 'admin',
//       isApproved: false, // Default is not approved
//     });

//     const savedAdmin = await newAdmin.save();
//     res.status(201).json(savedAdmin);
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding new admin', error });
//   }
// };

// exports.updateAdminApproval = async (req, res) => {
//   const { id } = req.params; // Admin ID from URL parameters
//   const { isApproved } = req.body; // New approval status

//   try {
//     const updatedAdmin = await User.findByIdAndUpdate(
//       id,
//       { isApproved },
//       { new: true } // Return the updated document
//     );

//     if (!updatedAdmin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }

//     res.status(200).json(updatedAdmin);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating admin approval status', error });
//   }
// };

exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
};

exports.addAdmin = async (req, res) => {
  const { email, passwordHash, username } = req.body; // Adjusted to match schema

  // Basic validation
  if (!email || !passwordHash || !username) {
    return res.status(400).json({ message: 'Email, password, and username are required' });
  }

  try {
    // Check if the email already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    // Create new admin user
    const newAdmin = new User({
      email,
      passwordHash: hashedPassword, // Use passwordHash from schema
      username, // Use username from schema
      role: 'admin',
      isApproved: false, // Default is not approved
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error adding new admin', error: error.message });
  }
};

// exports.updateAdminApproval = async (req, res) => {
//   const { id } = req.params; // Admin ID from URL parameters
//   const { isApproved } = req.body; // New approval status

//   try {
//     const updatedAdmin = await User.findByIdAndUpdate(
//       id,
//       { isApproved },
//       { new: true, runValidators: true } // Return the updated document and run validators
//     );

//     if (!updatedAdmin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }

//     res.status(200).json(updatedAdmin);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating admin approval status', error: error.message });
//   }
// };

exports.updateAdminApproval = async (req, res) => {
  const { id } = req.params; // Admin ID from URL parameters
  const { isApproved } = req.body; // New approval status

  try {
    const updatedAdmin = await User.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // If the admin is being disapproved, send a rejection message
    if (isApproved === false) {
      // Send email to admin notifying them of disapproval
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: updatedAdmin.email,
        subject: 'Account Disapproval Notification from Bee Wise',
        text: `Dear ${updatedAdmin.username},\n\n` +
              `We regret to inform you that your account has been disapproved due to [reason if applicable]. ` +
              `If you believe this decision is in error or if you have any questions regarding your account status, please do not hesitate to reach out to us.\n\n` +
              `Thank you for your understanding.\n\n` +
              `Best regards,\n` +
              `The Bee Wise Team\n` +
              `Customer Support`,
      });
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error updating admin approval status', error: error.message });
  }
};


exports.changeApprovalStatus = async (req, res) => {
  console.log(req.body); // Log the incoming request body

  const { userId, isApproved } = req.body;

  if (typeof isApproved !== 'boolean') {
    return res.status(400).json({ message: 'isApproved must be a boolean value.' });
  }

  try {
    // Find the user first to determine their role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Logic to set approval status based on user role
    if (user.role === 'customer' && isApproved === false) {
      // Allow customers to be disapproved
      user.isApproved = false; // Set to false
      await user.save(); // Save the updated user

      // Send email to customer notifying them of disapproval
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Account Disapproval Notification from Bee Wise',
        text: `Dear ${user.username},\n\n` +
              `We regret to inform you that your account has been disapproved due to [reason if applicable, or simply state 'certain criteria']. ` +
              `If you believe this decision is in error or if you have any questions regarding your account status, please do not hesitate to reach out to us.\n\n` +
              `We are committed to ensuring a positive experience for all our users, and we are here to help you resolve this matter promptly.\n\n` +
              `Thank you for your understanding.\n\n` +
              `Best regards,\n` +
              `The Bee Wise Team\n` +
              `Customer Support\n` ,
      });

      return res.status(200).json({ message: 'Customer has been disapproved.', user });
    } else if (user.role === 'customer' && isApproved === true) {
      // Allow customers to be approved
      user.isApproved = true; // Set to true
      await user.save(); // Save the updated user
      return res.status(200).json({ message: 'Customer has been approved.', user });
    } else if (['admin', 'beekeeper'].includes(user.role) && isApproved === true) {
      // Allow admins and beekeepers to remain disapproved
      user.isApproved = false; // Keep them disapproved
      await user.save(); // Save the updated user
      return res.status(200).json({ message: 'Admin or beekeeper status updated to disapproved.', user });
    } else {
      // Default behavior for admins and beekeepers when trying to approve
      return res.status(400).json({ message: 'Admins and beekeepers cannot be approved.' });
    }
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({ message: 'Error updating approval status.', error });
  }
};

// exports.getBeekeepers = async (req, res) => {
//   try {
//     const beekeepers = await User.find({ role: 'beekeeper' })
//       .populate('subscription') // Populate the subscription field
//       .exec();

//     res.json(beekeepers);
//   } catch (error) {
//     console.error('Error fetching beekeepers:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.changeApprovalStatusBeekeepers = async (req, res) => {
//   const { userId, isApproved } = req.body;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(userId, { isApproved }, { new: true });
    
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'Approval status updated', user: updatedUser });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ message: 'Error updating approval status', error });
//   }
// };



exports.getBeekeepers = async (req, res) => {
  try {
    const beekeepers = await User.find({ role: 'beekeeper' })
      .populate('subscription') // Populate the subscription field
      .exec();

    res.status(200).json(beekeepers); // Return 200 status for a successful fetch
  } catch (error) {
    console.error('Error fetching beekeepers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.changeApprovalStatusBeekeepers = async (req, res) => {
  const { userId, isApproved } = req.body;

  // Validate input
  if (!userId || typeof isApproved !== 'boolean') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { isApproved }, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send email notification if disapproved
    if (!isApproved) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: updatedUser.email,
        subject: 'Account Disapproval Notification from Bee Wise',
        text: `Dear ${updatedUser.username},\n\n` +
              `We regret to inform you that your account has been disapproved due to certain criteria. ` +
              `If you believe this decision is in error or if you have any questions regarding your account status, please reach out to us.\n\n` +
              `Thank you for your understanding.\n\n` +
              `Best regards,\n` +
              `The Bee Wise Team\n` +
              `Customer Support\n`,
      });
    }

    res.status(200).json({ message: 'Approval status updated', user: updatedUser });
  } catch (error) {
    console.error('Error updating approval status:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating approval status', error });
  }
};