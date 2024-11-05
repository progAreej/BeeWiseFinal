const mongoose = require('mongoose');

const honeyCategories = [
  'Raw Honey', 'Flavored Honey', 'Beeswax Products', 'Honeycombs', 'Propolis', 'Royal Jelly', 'Bee Pollen' 
];

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  price: { 
    type: Number, 
    required: true 
  },
  stock: { 
    type: Number, 
    required: true 
  },
  image: { 
    type: String // URL or path to the product image
  },
  ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number }], // Store ratings with user IDs
  averageRating: { type: Number, default: 0 }, // Store the average rating
  isApproved: { 
    type: Boolean, 
    default: false // Initially set to false until the product is approved
  },
  category: {
    type: String, // Change this to String for predefined categories
    enum: honeyCategories, // Use enum to limit values to honeyCategories
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Automatically update the `updatedAt` field before saving
productSchema.pre('save', function (next) {
  if (this.isModified() || this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
