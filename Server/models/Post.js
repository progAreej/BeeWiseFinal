const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reply', default: null },
  createdAt: { type: Date, default: Date.now },
  isApproved: { 
    type: Boolean, 
    default: true // Initially set to false until the shop is approved
  },
});

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  category: Number,
  replies: [replySchema],
  views: { type: Number, default: 0 },
  isPinned: { type: Boolean, default: false },
  isApproved: { 
    type: Boolean, 
    default: true // Initially set to false until the shop is approved
  },
});

module.exports = mongoose.model('Post', postSchema);