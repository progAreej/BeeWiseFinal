
const { BlogPost } = require('../models/Blog');  // Ensure correct destructuring
const User =require("../models/Users")
// Create a new blog post
exports.createPost = async (req, res) => {
  try {
    const { title, imageUrl, content, category } = req.body;

    // Get the author's ID from the logged-in user session
    const authorId = req.user._id; // Assuming user is logged in and attached to req

    const newPost = new BlogPost({
      title,
      imageUrl,
      content,
      category,
      author: authorId, // Set the author's ID
    });

    await newPost.save();

    res.status(201).json({ message: 'Blog post created successfully!', newPost });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Failed to create blog post.' });
  }
};

// Get all blog posts with optional search and filter by category
exports.getAllBlogPosts = async (req, res) => {
  try {
    const { category, search } = req.query; // Get query parameters

    // Build the query object
    const query = { isApproved: true }; // Only get approved posts

    // Filter by category if provided
    if (category) {
      query.category = category; // Filter by category
    }
    
    // Handle search functionality
    if (search) {
      // Use regex for case-insensitive search in title and content
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch blog posts from the database
    const blogPosts = await BlogPost.find(query)
      .populate('author', 'name') // Populate the author field
      .sort({ createdAt: -1 }) // Optional: sort by creation date
      .exec(); // Explicitly execute the query

    // Send the retrieved blog posts as a response
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog post by ID
exports.getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate('author', 'name');
    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog post
exports.updateBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog post
exports.deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// const { BlogPost } = require('../models/BlogPost'); // Adjust the import path as necessary

// Save or unsave a blog post
exports.savePost = async (req, res) => {
  // Ensure the user is authenticated
  if (!req.user || !req.user._id) {
    return res.status(403).json({ message: 'User not authenticated' });
  }

  const userId = req.user.id;
  const { postId } = req.body;

  try {
    const user = await User.findById(userId);
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the post is already saved
    if (user.savedPosts.includes(postId)) {
      // Remove post from savedPosts
      user.savedPosts.pull(postId);
      await user.save();
      return res.status(200).json({ message: 'Post unsaved' });
    } else {
      // Add post to savedPosts
      user.savedPosts.push(postId);
      await user.save();
      return res.status(200).json({ message: 'Post saved' });
    }
  } catch (error) {
    console.error('Error saving/unsaving post:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



// Retrieve saved posts by user
exports.getSavedPostsByUser = async (req, res) => {
  const userId = req.user._id; // Assuming you have middleware that sets req.user

  try {
    const savedPosts = await BlogPost.find({ savedBy: userId });
    return res.status(200).json(savedPosts);
  } catch (error) {
    console.error('Error retrieving saved posts:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

