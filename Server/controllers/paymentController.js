
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const Order = require('../models/Order');

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { order_id, user_id, payment_method, payment_amount, transaction_id } = req.body;

    // Validate payment method
    const validMethods = ['stripe', 'paypal', 'cash_on_delivery'];
    if (!validMethods.includes(payment_method)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment method'
      });
    }

    // If the payment method is Stripe, create a payment intent
    let stripeTransactionId = transaction_id;
    let clientSecret = null; // To store the client secret for Stripe
    if (payment_method === 'stripe') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: payment_amount, // Amount in cents
        currency: 'usd',
      });

      stripeTransactionId = paymentIntent.id;
      clientSecret = paymentIntent.client_secret; // Correct client secret
    }

    // Create the payment in the database
    const payment = new Payment({
      order_id,
      user_id,
      payment_method,
      payment_amount,
      transaction_id: stripeTransactionId
    });

    await payment.save();

    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      data: {
        payment,
        clientSecret: clientSecret || null // Send the client secret if Stripe is used
      }
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment',
      error: error.message
    });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('order_id').populate('user_id');

    res.status(200).json({
      success: true,
      data: payments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve payments',
      error: error.message
    });
  }
};

// Get payments by shop ID
// const getPaymentsByShopId = async (req, res) => {
//   try {
//     const { shop_id } = req.params;

//     // Find orders associated with the shop
//     const orders = await Order.find({ shop_id });

//     // Get payment IDs from the orders
//     const orderIds = orders.map(order => order._id);

//     // Find payments associated with those orders
//     const payments = await Payment.find({ order_id: { $in: orderIds } }).populate('user_id');

//     res.status(200).json({
//       success: true,
//       data: payments
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve payments for this shop',
//       error: error.message
//     });
//   }
// };
const getPaymentsByShopId = async (req, res) => {
  try {
    const { shop_id } = req.params;

    // Find orders associated with the shop
    const orders = await Order.find({ shop_id });

    // Check if any orders were found for the shop
    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this shop',
      });
    }

    // Get payment IDs from the orders
    const orderIds = orders.map(order => order._id);

    // Find payments associated with those orders
    const payments = await Payment.find({ order_id: { $in: orderIds } }).populate('user_id');

    // Check if payments were found
    if (payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No payments found for the orders of this shop',
      });
    }

    res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve payments for this shop',
      error: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentsByShopId
};
