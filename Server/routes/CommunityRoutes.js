const express = require('express');
const router = express.Router();
const communityPostController = require('../controllers/CommunityController');
const verifyToken = require('../config/auth'); // Optional based on your implementation

// Route to create a new community post
router.post('/community/posts', verifyToken, communityPostController.createPost);
router.get('/community/posts', communityPostController.getAllPostsAndReplies);

// Route to get a post by ID
router.get('/community/posts/:id', communityPostController.getPostById);

// Route to delete a post by ID
router.delete('/community/posts/:id', verifyToken, communityPostController.deletePost);

// Route to add a comment to a post
router.post('/community/posts/:id/comments', verifyToken, communityPostController.addComment);

// Route to react to a comment or reply
router.put('/community/posts/:postId/comments/:commentId/reactions/:replyId?', verifyToken, communityPostController.reactToCommentOrReply);

// Route to add a reply to a comment
router.post('/community/posts/:postId/comments/:commentId/replies', verifyToken, communityPostController.addReplyToComment);

module.exports = router;
