const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  order_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  payment_method: { 
    type: String, 
    enum: ['stripe', 'paypal', 'cash_on_delivery'], 
 
  },
  payment_amount: { 
    type: Number, 
    required: true 
  },
  payment_status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'completed' 
  },
  transaction_id: { 
    type: String 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date 
  }
});

// Middleware to set 'updated_at' on updates
paymentSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
