// const mongoose = require('mongoose');

// const communityPostSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Beekeeper or user posting
//   comments: [{
//     comment: String,
//     commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     createdAt: { type: Date, default: Date.now }
//   }],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date }
// });

// module.exports = mongoose.model('CommunityPost', communityPostSchema);


const mongoose = require('mongoose');

// Define the Reply Schema
const replySchema = new mongoose.Schema({
  content: { type: String, required: true },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked this reply
});

// Define the Comment Schema with nested replies
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked this comment
  replies: [replySchema] // Nested replies within a comment
});

// Community Post Schema
const communityPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [commentSchema], // Nested comments with replies
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the post
  tags: [{ type: String }],
  category: { type: String, enum: ['Tips', 'Equipment', 'Honey Production', 'General'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('CommunityPost', communityPostSchema);
