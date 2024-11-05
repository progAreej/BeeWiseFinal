// // const axios = require('axios');

// // // Replace with your actual API token
// // const API_TOKEN = 'YOUR_API_TOKEN';
// // const API_URL = 'https://api.orange.com/orange-money-webpay';

// // const processPayment = async (req, res) => {
// //   const { amount, phoneNumber } = req.body;

// //   try {
// //     const response = await axios.post(API_URL, {
// //       amount,
// //       phoneNumber,
// //     }, {
// //       headers: {
// //         'Authorization': `Bearer ${API_TOKEN}`,
// //         'Content-Type': 'application/json',
// //       },
// //     });

// //     if (response.data.success) {
// //       res.json({ success: true, message: 'Payment successful' });
// //     } else {
// //       res.json({ success: false, message: 'Payment failed' });
// //     }
// //   } catch (error) {
// //     console.error('Error processing payment:', error);
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // };

// // module.exports = {
// //   processPayment,
// // };



// // paytabsController.js

// const axios = require('axios');
// require('dotenv').config(); // Load environment variables from .env file

// const createPayment = async (req, res) => {
//   const { amount, currency, returnUrl, title } = req.body;

//   try {
//     const response = await axios.post('https://secure.paytabs.com/payment/request', {
//       amount,
//       currency,
//       return_url: returnUrl,
//       title
//     }, {
//       headers: {
//         'Authorization': `Bearer ${process.env.PAYTABS_API_KEY}`, // Use API key from environment variable
//         'Content-Type': 'application/json'
//       }
//     });

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Payment creation failed', error);
//     res.status(500).json({ message: 'Payment creation failed' });
//   }
// };

// const handlePaymentResponse = (req, res) => {
//   // Handle payment response from PayTabs
//   const { status, transaction_id } = req.query;

//   if (status === 'success') {
//     res.send(`Payment successful! Transaction ID: ${transaction_id}`);
//   } else {
//     res.send('Payment failed or canceled.');
//   }
// };

// module.exports = {
//   createPayment,
//   handlePaymentResponse
// };


// paytabsController.js

const axios = require('axios');
require('dotenv').config(); // Load environment variables

const createPayment = async (req, res) => {
  const { amount, currency, returnUrl, title } = req.body;

  try {
    const response = await axios.post('https://secure.paytabs.com/payment/request', {
      amount,
      currency,
      return_url: returnUrl,
      title
    }, {
      headers: {
        'Authorization': `Bearer S9J9WLW96L-JJWLN2RB9L-6TDDWGZTZH`, // Use Server Key from environment variable
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Payment creation failed', error);
    res.status(500).json({ message: 'Payment creation failed', error: error.response ? error.response.data : error.message });
  }
};

const handlePaymentResponse = (req, res) => {
  // Handle payment response from PayTabs
  const { status, transaction_id } = req.query;

  if (status === 'success') {
    res.send(`Payment successful! Transaction ID: ${transaction_id}`);
  } else {
    res.send('Payment failed or canceled.');
  }
};

module.exports = {
  createPayment,
  handlePaymentResponse
};
