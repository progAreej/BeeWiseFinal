const mongoose = require('mongoose');

const Post = require('../models/Post');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
      const posts = await Post.find()
          .populate('author', 'username profilePicture') // Populate author field
          .populate('replies.author', 'username profilePicture'); // Populate replies author field
      res.json(posts);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
    const { title, description, category } = req.body;

    // Ensure the user has a role of beekeeper
    if (req.user.role !== 'beekeeper') {
        return res.status(403).json({ message: 'Access denied. Only beekeepers can create posts.' });
    }

    const post = new Post({
        title,
        description,
        author: req.user.id, // Use the user ID from the token
        category,
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a reply to a post
exports.addReply = async (req, res) => {
    const { content, parentId } = req.body;

    const reply = {
        author: req.user.id, // User ID from the token
        content,
        parentId,
    };

    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        post.replies.push(reply);
        const updatedPost = await post.save();
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a reply
exports.updateReply = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        const reply = post.replies.id(req.params.replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found.' });
        }

        // Only allow the original author to update the reply
        if (String(reply.author) !== req.user.id) {
            return res.status(403).json({ message: 'Access denied. You can only update your own replies.' });
        }

        reply.content = req.body.content; // Update the content
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteReply = async (req, res) => {
  try {
    // Validate the ID format
    const { id: postId, replyId } = req.params;
    if (!mongoose.isValidObjectId(postId) || !mongoose.isValidObjectId(replyId)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Find the reply by ID
    const reply = post.replies.id(replyId);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found.' });
    }

    // Check if the user is authorized to delete this reply
    if (String(reply.author) !== req.user.id) {
      return res.status(403).json({ message: 'Access denied. You can only delete your own replies.' });
    }

    // Remove the reply from the replies array
    post.replies = post.replies.filter(r => r.id !== replyId); // Use filter to remove the reply

    // Save the updated post
    const updatedPost = await post.save();
    
    // Return the updated post with replies
    res.status(200).json(updatedPost); 
  } catch (error) {
    console.error('Error deleting reply:', error); // Log the error for debugging
    res.status(500).json({ message: 'Internal Server Error' }); // Generic error message for security
  }
};