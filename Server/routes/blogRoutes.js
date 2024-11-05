// const express = require('express');
// const router = express.Router();
// const blogController = require('../controllers/blogController'); // Adjust path as necessary
// const auth =require('../config/auth')
// // Blog post routes
// router.post('/', blogController.createBlogPost);
// router.get('/', blogController.getAllBlogPosts);
// router.get('/:id', blogController.getBlogPostById);
// router.put('/:id', blogController.updateBlogPost);
// router.delete('/:id', blogController.deleteBlogPost);
// router.post('/posts', auth,blogController.createPost);

// module.exports = router;


const express = require('express');
const router = express.Router();
const auth = require('../config/auth'); // Assuming you have an authentication middleware
const blogController = require('../controllers/blogController');

// Create a new blog post
router.post('/posts', auth, blogController.createPost);

// Get all blog posts with optional search and filter by category
router.get('/posts', blogController.getAllBlogPosts);

// Get a single blog post by ID
router.get('/posts/:id', blogController.getBlogPostById);

// Update a blog post
router.put('/posts/:id', auth, blogController.updateBlogPost);

// Delete a blog post
router.delete('/posts/:id', auth, blogController.deleteBlogPost);

router.post('/save',auth, blogController.savePost); // No postId in params, we'll get it from req.body

// Get saved posts by user
router.get('/saved',auth, blogController.getSavedPostsByUser);

module.exports = router;
