const Product = require('../models/Products');
const Shop = require('../models/Shop'); // Assuming you have a Shop model
const nodemailer = require('nodemailer'); // Ensure you have nodemailer for sending emails

const honeyCategories = [
  'Raw Honey', 'Flavored Honey', 'Beeswax Products', 'Honeycombs', 'Propolis', 'Royal Jelly', 'Bee Pollen' 
]; // Ensure this is imported or defined

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// Get all products for a specific shop
exports.getProductsByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const products = await Product.find({ shop: shopId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const beekeeperId = req.user.id; // Get the authenticated beekeeper's ID from the request
  const { name, description, price, stock, image, category } = req.body;

  try {
    // Find the shop associated with the beekeeper
    const shop = await Shop.findOne({ beekeeper: beekeeperId });
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found for the specified beekeeper.' });
    }

    // Check for existing product name in the shop
    const existingProduct = await Product.findOne({ name, shop: shop._id });
    if (existingProduct) {
      return res.status(400).json({ error: 'Product with this name already exists in the shop.' });
    }

    // Create a new product
    const newProduct = new Product({
      shop: shop._id, // Associate the product with the found shop
      name,
      description,
      price,
      stock,
      image,
      category
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ product: savedProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const beekeeperId = req.user.id; 
  const { productId, name, description, price, stock, image, category } = req.body; 

  try {
    const shop = await Shop.findOne({ beekeeper: beekeeperId });
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found for this beekeeper.' });
    }

    const product = await Product.findOne({ _id: productId, shop: shop._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Update the product with new data
    product.name = name || product.name; 
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.image = image || product.image;
    product.category = category || product.category;

    await product.save();
    return res.json({ product });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'An error occurred while updating the product.' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const beekeeperId = req.user.id; 
  const { id } = req.params;

  try {
    const shop = await Shop.findOne({ beekeeper: beekeeperId });
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found for this beekeeper.' });
    }

    const product = await Product.findOneAndDelete({ _id: id, shop: shop._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products filtered by category
exports.getCategoriesWithProducts = async (req, res) => {
  const { category } = req.params;

  if (!honeyCategories.includes(category)) {
    return res.status(400).json({ message: 'Invalid category.' });
  }

  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products for the authenticated beekeeper
exports.getProducts = async (req, res) => {
  const beekeeperId = req.user.id; 

  try {
    const shop = await Shop.findOne({ beekeeper: beekeeperId });
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found for this beekeeper.' });
    }

    const products = await Product.find({ shop: shop._id });
    return res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'An error occurred while fetching products.' });
  }
};


exports.getTopRatedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: true }) // Filter only approved products
      .sort({ averageRating: -1 }) // Sort by averageRating in descending order
      .limit(3); // Limit the result to 3 products

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching top rated products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// exports.getAllProducts = async (req, res) => {
//   try {
//     // Fetch all products and populate the beekeeper's email and shop details
//     const products = await Product.find()
//       .populate({
//         path: 'shop',
//         select: 'name',
//         populate: {
//           path: 'beekeeper',
//           select: 'email', // Populating the beekeeper's email for notification purposes
//         },
//       })
//       .exec();

//     res.status(200).json(products);
//   } catch (error) {
//     console.error('Error fetching all products:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products and populate all necessary details
    const products = await Product.find()
      .populate({
        path: 'shop',
        select: 'shopName description location latitude longitude logo ratings averageRating isApproved BeekeeperOwnershipCertificate BeehiveLicense HealthCertificate TaxRegistrationfortheBeehive',
        populate: {
          path: 'beekeeper',
          select: 'email username', // If you need more information, add it here
        },
      })
      .exec();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProductStatus = async (req, res) => {
  const { productId } = req.params;  // Extract productId from URL
  const { isApproved, rejectionNote } = req.body;  // isApproved status and optional rejectionNote

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Update the approval status of the product
    product.isApproved = isApproved;

    // If product is rejected, send email to the beekeeper
    if (!isApproved) {
      const shop = await Shop.findById(product.shop).populate('beekeeper', 'email username');
      if (shop && shop.beekeeper && shop.beekeeper.email) {
        try {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: shop.beekeeper.email,
            subject: 'Product Rejection Notification',
            text: `Dear ${shop.beekeeper.username},\n\n` +
                  `Your product "${product.name}" has been rejected.\n` +
                  `Reason: ${rejectionNote}\n\n` +
                  `If you have any questions, feel free to contact us.\n\n` +
                  `Best regards,\n` +
                  `The Bee Wise Team\n`,
          });
        } catch (emailError) {
          console.error(`Error sending email for product ID ${productId}:`, emailError);
        }
      } else {
        console.error(`Beekeeper email not found for shop associated with product ID ${productId}.`);
      }
    }

    await product.save();
    res.status(200).json({ message: 'Product status updated successfully', product });

  } catch (error) {
    console.error('Error updating product status:', error);
    res.status(500).json({ message: 'An error occurred while updating the product status.' });
  }
};