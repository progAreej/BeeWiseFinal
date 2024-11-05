
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String }, // Optional for Google users
  phoneNumber: { type: String },
  profilePicture: { type: String },
  role: { 
    type: String, 
    enum: ['customer', 'beekeeper','admin'], 
    required: true 
  },
  apiaryLocation: { type: String },
  experienceYears: { type: Number },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  recentlyViewedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to the Product model
    },
  ],
  favoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Favorite products

  isApproved: { type: Boolean, default: false },
  paymentDetails: {
    method: { 
      type: String, 
      enum: ['creditCard', 'paypal'],
      default: 'creditCard'
    },
    cardNumber: { type: String, select: false },
    expiryDate: { type: String, select: false },
    cvv: { type: String, select: false }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]

});

// Auto-update `updatedAt`

// Auto-update `updatedAt`
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();

  // Set default isApproved based on role
  if (this.isNew) { // Check if it's a new user
    if (this.role === 'customer') {
      this.isApproved = true; // Default to true for customers
    } else if (this.role === 'beekeeper' || this.role === 'admin') {
      this.isApproved = false; // Default to false for beekeepers and admins
    }
  }

  next();
});


// Custom methods
userSchema.methods.isCustomer = function() {
  return this.role === 'customer';
};

userSchema.methods.isBeekeeper = function() {
  return this.role === 'beekeeper';
};

const User = mongoose.model('User', userSchema);
module.exports = User;

