
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const orderSchema = new Schema({
//   user_id: { 
//     type: Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
//   },
//   shop_id: { 
//     type: Schema.Types.ObjectId, 
//     ref: 'Shop', 
//     required: true 
//   },
//   products: [
//     {
//       product_id: { 
//         type: Schema.Types.ObjectId, 
//         ref: 'Product', 
//         required: true 
//       },
//       quantity: { 
//         type: Number, 
//         required: true 
//       },
//       price: { 
//         type: Number, 
//         required: true 
//       }
//     }
//   ],
//   subtotal: { 
//     type: Number, 
//     required: true 
//   },
//   shipping_cost: { 
//     type: Number, 
//     default: 0 
//   },
//   total_amount: { 
//     type: Number, 
//     required: true 
//   },
//   delivery_method: { 
//     type: String, 
//     enum: ['delivery', 'pickup'], 
//     default: 'delivery' 
//   },
//   delivery_address: {
//     address: { 
//       type: String, 
//       required: function () {
//         return this.delivery_method === 'delivery';
//       } 
//     },
//     latitude: { 
//       type: Number, 
//       required: function () {
//         return this.delivery_method === 'delivery';
//       } 
//     },
//     longitude: { 
//       type: Number, 
//       required: function () {
//         return this.delivery_method === 'delivery';
//       } 
//     }
//   },
//   order_status: { 
//     type: String, 
//     enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], 
//     default: 'pending' 
//   },
//   created_at: { 
//     type: Date, 
//     default: Date.now 
//   },
//   updated_at: { 
//     type: Date 
//   }
// });

// // Middleware to set 'updated_at' on updates
// orderSchema.pre('save', function (next) {
//   this.updated_at = Date.now();
//   next();
// });

// const Order = mongoose.model('Order', orderSchema);
// module.exports = Order;



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  shop_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Shop', 
    required: true 
  },
  products: [
    {
      product_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true 
      },
      price: { 
        type: Number, 
        required: true 
      }
    }
  ],
  subtotal: { 
    type: Number, 
    required: true 
  },
  shipping_cost: { 
    type: Number, 
    default: 0 
  },
  total_amount: { 
    type: Number, 
    required: true 
  },
  delivery_method: { 
    type: String, 
    enum: ['delivery', 'pickup'], 
    default: 'delivery' 
  },
  delivery_address: {
    address: { 
      type: String, 
      required: function () {
        return this.delivery_method === 'delivery';
      } 
    },
    latitude: { 
      type: Number, 
      required: function () {
        return this.delivery_method === 'delivery';
      } 
    },
    longitude: { 
      type: Number, 
      required: function () {
        return this.delivery_method === 'delivery';
      } 
    }
  },
  order_status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date 
  }
});

// Middleware to set 'updated_at' on save and update operations
orderSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

orderSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updated_at: Date.now() });
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
