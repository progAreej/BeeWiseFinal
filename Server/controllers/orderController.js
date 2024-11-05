
const Order = require('../models/Order'); // Make sure you have the correct path to your order model
const Shop =require('../models/Shop')
// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      shop_id,
      products,
      subtotal,
      shipping_cost,
      total_amount,
      delivery_method,
      delivery_address
    } = req.body;

    // Create the new order
    const newOrder = new Order({
      user_id,
      shop_id,
      products,
      subtotal,
      shipping_cost,
      total_amount,
      delivery_method,
      delivery_address
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user_id').populate('shop_id').populate('products.product_id');
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders',
      error: error.message
    });
  }
};

// Get orders by shop ID
const getOrdersByShopId = async (req, res) => {
  try {
    const { shop_id } = req.params;

    const orders = await Order.find({ shop_id }).populate('user_id').populate('shop_id').populate('products.product_id');

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this shop'
      });
    }

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders',
      error: error.message
    });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { order_status } = req.body;

    // Validate the new status
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(order_status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status'
      });
    }

    // Find and update the order's status
    const updatedOrder = await Order.findByIdAndUpdate(
      order_id,
      { order_status, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
};

// const getOrdersByUserId = async (req, res) => {
//   try {
//     const userId = req.user.id; // Assume req.user is set by authentication middleware

//     const orders = await Order.find({ user_id: userId })
//     .populate('shop_id', 'shopName') // Populate only the 'name' field of the shop
//     .populate('products.product_id'); // Populate product details if needed
//     .populate({ path: 'products.product_id', model: 'Product', options: { strictPopulate: false } });

//     if (!orders.length) {
//       return res.status(404).json({
//         success: false,
//         message: 'No orders found for this user'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: orders
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve orders',
//       error: error.message
//     });
//   }
// };

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // Assume req.user is set by authentication middleware

    const orders = await Order.find({ user_id: userId })
      .populate('shop_id', 'shopName') // Populate only 'shopName' field of the shop
      .populate({
        path: 'products.product_id',
        model: 'Product',
      });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this user',
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders',
      error: error.message, // Optional: Customize for production
    });
  }
};

const getAllOrdersForAdmin = async (req, res) => {
  try {
    // Get the shop name from query parameters
    const { shopName } = req.query;

    // Initialize the query object
    const query = {};

    if (shopName) {
      // Find the shop by name (case-insensitive)
      const shop = await Shop.findOne({ shopName: { $regex: shopName, $options: 'i' } });

      if (shop) {
        // If the shop is found, filter orders by shop ID
        query.shop = shop._id; 
      } else {
        // If the shop is not found, return an empty array of orders
        return res.status(200).json({
          success: true,
          data: [],
        });
      }
    }

    // Find orders based on the query
    const orders = await Order.find(query)
      .populate('user_id', 'username email') // Populates the user's username and email
      .populate('shop_id', 'shopName') // Populates the shop's name
      // .populate('products._id', 'name description'); // Populates product name and description
      .populate({
        path: 'products.product_id', // Populate the product_id field in products
        select: 'name' // Only retrieve the name field from Product
      });

    // Return all orders or filtered orders
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving orders.',
    });
  }
};



module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByShopId,
  getOrdersByUserId,
  updateOrderStatus,
  getAllOrdersForAdmin
};

