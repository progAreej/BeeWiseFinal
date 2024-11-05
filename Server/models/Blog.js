
const mongoose = require('mongoose');

// Define the available categories specific to bees and honey in both English and Arabic
const categories = [
  { en: 'Beekeeping', ar: 'تربية النحل' },
  { en: 'Honey Production', ar: 'إنتاج العسل' },
  { en: 'Bee Health', ar: 'صحة النحل' },
  { en: 'Pollination', ar: 'التلقيح' },
  { en: 'Bee Species', ar: 'أنواع النحل' },
  { en: 'Wax Products', ar: 'منتجات الشمع' }
];

// Define the blog post schema
const blogPostSchema = new mongoose.Schema({
  title: { 
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  imageUrl: { type: String, required: true },
  content: { 
    en: { type: String, required: true},
    ar: { type: String, required: true }
  },
  category: { 
    en: { type: String, enum: categories.map(cat => cat.en), required: true },
    ar: { type: String, enum: categories.map(cat => cat.ar), required: true },
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  isApproved: { type: Boolean, default: false },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Add this field
});
// Middleware to update the updatedAt field
blogPostSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
}); 

// Create and export the BlogPost model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = { BlogPost, categories };
