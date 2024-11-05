const CommunityPost = require('../models/Community');
const User =require ('../models/Users')
// Controller to create a new community post
exports.createPost = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body; 
        const userId = req.user.id; 

        const newPost = new CommunityPost({
            title,
            content,
            category,
            tags,
            author: userId
        });

        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ message: 'Failed to create post' });
    }
};

// Controller to get a post by ID
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await CommunityPost.findById(postId)
            .populate('author', 'username')
            .populate('comments.commenter', 'username');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error.message);
        res.status(500).json({ message: 'Failed to retrieve post' });
    }
};

// Controller to delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id; // Retrieve userId from session

        const post = await CommunityPost.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is the author
        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You can only delete your own posts' });
        }

        await CommunityPost.findByIdAndDelete(postId);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ message: 'Failed to delete post' });
    }
};

// Controller to add a comment to a post
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id; // Retrieve userId from session
        const postId = req.params.id;

        const post = await CommunityPost.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = {
            content,
            commenter: userId,
            likes: [], // Initialize likes array
            replies: [] // Initialize replies array
        };

        post.comments.push(newComment);
        await post.save();

        res.status(201).json({ message: 'Comment added successfully', post });
    } catch (error) {
        console.error('Error adding comment:', error.message);
        res.status(500).json({ message: 'Failed to add comment' });
    }
};

exports.reactToCommentOrReply = async (req, res) => {
    try {
        const userId = req.user.id; // Retrieve userId from session
        const { postId, commentId, replyId } = req.params;

        console.log(`User ID: ${userId}, Post ID: ${postId}, Comment ID: ${commentId}, Reply ID: ${replyId}`);

        const post = await CommunityPost.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // If reacting to a reply
        if (replyId) {
            const reply = comment.replies.id(replyId);
            if (!reply) {
                return res.status(404).json({ message: 'Reply not found' });
            }

            const likeIndex = reply.likes.indexOf(userId);
            if (likeIndex > -1) {
                reply.likes.splice(likeIndex, 1); // Remove like if already liked
            } else {
                reply.likes.push(userId); // Add like if not yet liked
            }
        } else {
            // React to the comment
            const likeIndex = comment.likes.indexOf(userId);
            if (likeIndex > -1) {
                comment.likes.splice(likeIndex, 1);
            } else {
                comment.likes.push(userId);
            }
        }

        await post.save();
        res.status(200).json({ message: 'Reaction updated', post });
    } catch (error) {
        console.error('Error reacting:', error.message);
        res.status(500).json({ message: 'Failed to update reaction' });
    }
};


exports.addReplyToComment = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id; // Retrieve userId from session
        const { postId, commentId } = req.params;

        const post = await CommunityPost.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const user = await User.findById(userId); // Fetch user to get username
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create new reply using only the userId as commenter
        const newReply = {
            content,
            commenter: userId, // Use userId as ObjectId
            likes: [] // Initialize likes array
        };

        comment.replies.push(newReply); // Push new reply into comment's replies
        await post.save(); // Save updated post

        // Return the reply with username for the response
        res.status(201).json({
            message: 'Reply added successfully',
            reply: {
                content: newReply.content,
                commenter: {
                    id: userId,
                    username: user.username // Include username in the response
                },
                likes: newReply.likes,
                createdAt: newReply.createdAt // Optionally include createdAt if needed
            },
        });
    } catch (error) {
        console.error('Error adding reply:', error.message);
        res.status(500).json({ message: 'Failed to add reply' });
    }
};

// Controller to get all posts and replies
exports.getAllPostsAndReplies = async (req, res) => {
    try {
        const posts = await CommunityPost.find()
            .populate('author', 'username')
            .populate('comments.commenter', 'username')
            .populate('comments.replies.commenter', 'username'); // Ensure to populate replies' commenters if needed

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ message: 'Failed to retrieve posts' });
    }
};
