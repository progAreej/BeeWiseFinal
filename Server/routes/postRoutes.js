

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../config/auth'); // Import your middleware

// Routes for posts
router.get('/', postController.getAllPosts);
router.post('/', authMiddleware, postController.createPost); // Protect this route
router.patch('/:id', authMiddleware, postController.updatePost); // Protect this route
router.delete('/:id', authMiddleware, postController.deletePost); // Protect this route

// Routes for replies
router.post('/:id/replies', authMiddleware, postController.addReply); // Protect this route
router.patch('/:id/replies/:replyId', authMiddleware, postController.updateReply); // Protect this route
router.delete('/:id/replies/:replyId', authMiddleware, postController.deleteReply); // Protect this route

module.exports = router;
