const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: String,
  price: String,
  features: [String],
  status: { type: String, enum: ['active', 'expired'], default: 'active' }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
