// const express = require('express');
// const router = express.Router();
// const paymentController = require('../controllers/Orange');

// // Define route for processing payment
// router.post('/process-payment', paymentController.processPayment);

// module.exports = router;


// routes.js

const express = require('express');
const router = express.Router();
const paytabsController = require('../controllers/Orange');

// Route to create a payment request
router.post('/payment', paytabsController.createPayment);

// Route to handle PayTabs payment response
router.get('/payment/callback', paytabsController.handlePaymentResponse);

module.exports = router;
