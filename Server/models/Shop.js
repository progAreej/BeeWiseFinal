
const mongoose = require('mongoose');

// Define the list of valid locations in Jordan
const jordanLocations = [
  'Amman', 'Irbid', 'Zarqa', 'Aqaba', 'Madaba', 'Karak', 'Jerash', 'Ma’an', 'Salt', 'Tafilah', 'Ajloun','Mafraq'
];

// Define the URL validation function

// Define the schema for the Shop model
const shopSchema = new mongoose.Schema({
  beekeeper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Ensure that each beekeeper has only one shop
  },
  shopName: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  location: { 
    type: String,
    enum: jordanLocations, // Validate that the location is within the specified list
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  logo: { 
    type: String, 
    default: "" // Optional: Default value if no logo is provided
  },
  ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number }],
  averageRating: { type: Number, default: 0 },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  isApproved:{type:Boolean, default:'false'},
  BeekeeperOwnershipCertificate: { type: String, default: "" }, // Single string for certificate URL
  BeehiveLicense: { type: String, default: "" }, // Single string for license URL
  HealthCertificate: { type: String, default: "" }, // Single string for health certificate URL
  TaxRegistrationfortheBeehive: { type: String, default: "" } // Single string for tax registration URL
});


// Automatically update the `updatedAt` field before saving
shopSchema.pre('save', function (next) {
  if (this.isModified() || this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;
