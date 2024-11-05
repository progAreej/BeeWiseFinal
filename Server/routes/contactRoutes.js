// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { sendMessage ,getAllMessages,sendReply } = require('../controllers/contactController');

// POST /api/contact
router.post('/contact', sendMessage);
router.get('/messages', getAllMessages);
router.post('/send-reply', sendReply);


module.exports = router;
