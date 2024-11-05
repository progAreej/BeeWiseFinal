const express = require('express');
const { uploadProfilePicture } = require('../controllers/fileController');

const router = express.Router();

router.post('/upload', uploadProfilePicture);

module.exports = router;
