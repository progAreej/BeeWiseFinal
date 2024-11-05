// controllers/contactController.js
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new message entry in the database
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save(); // Add 'await' here

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find(); // Fetch all messages from the database
    res.status(200).json(messages); // Return messages as JSON
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.sendReply = async (req, res) => {
    const { to, subject, text } = req.body;

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or 'Outlook', 'Yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER, // e.g., "your-email@gmail.com"
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reply sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send reply.' });
  }
};