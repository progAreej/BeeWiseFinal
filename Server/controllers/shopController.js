const Shop = require('../models/Shop'); // Adjust path as needed

const jordanLocations = [
  'Amman', 'Irbid', 'Zarqa', 'Aqaba', 'Madaba', 'Karak', 'Jerash', 'Ma’an', 'Salt', 'Tafilah', 'Ajloun','Mafraq'
];


// Get a shop by its ID
const getShopByID = async (req, res) => {
  try {
    // Extracting the shop ID from request parameters
    const shopId = req.params.id; // Change this line to get the ID from params

    // Optional: You can log the user ID if needed
    const shop = await Shop.findById(shopId); // Make sure to use shopId

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Shop not found'
      });
    }

    res.status(200).json({
      success: true,
      shop
    });
  } catch (error) {
    console.error('Error fetching shop by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get a list of shops with optional location and search filters
const getShops = async (req, res) => {
  try {
    const { location, search, page = 1, limit = 10000 } = req.query;

    // Build query object
    const query = { isApproved: true };

    // Add location filter to the query if specified and valid
    if (location && location !== 'All') {
      if (!jordanLocations.includes(location)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid location'
        });
      }
      query.location = location;
    }

    // Add search filter to the query if specified
    if (search) {
      query.shopName = new RegExp(search, 'i'); // Case-insensitive search
    }

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Fetch total count of shops that match the query
    const totalCount = await Shop.countDocuments(query);

    // Fetch shops with pagination
    const shops = await Shop.find(query)
      .skip((pageNumber - 1) * pageSize) // Skip the number of documents based on the page
      .limit(pageSize) // Limit the number of documents per page
      .sort({ createdAt: -1 }); // Sort by most recent first

    res.status(200).json({
      success: true,
      count: totalCount,
      shops: shops
    });
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get a shop by its ID
const getShopById = async (req, res) => {
  try {
    const beekeeperId = req.user.id;
    console.log(beekeeperId);
      const shop = await Shop.findById(id);

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Shop not found'
      });
    }

    res.status(200).json({
      success: true,
      shop
    });
  } catch (error) {
    console.error('Error fetching shop by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create a new shop
const createShop = async (req, res) => {
  try {
    const { beekeeper, shopName, description, location, latitude, longitude, logo, documents } = req.body;
    
    // Validate required fields
    if (!beekeeper || !shopName || !location || !latitude || !longitude) {
      return res.status(400).json({ error: 'Missing required fields: beekeeper, shopName, location, latitude, and longitude are required.' });
    }
    
    // Optional: Validate latitude and longitude ranges
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ error: 'Invalid latitude or longitude values.' });
    }
    
    const newShop = new Shop({
      beekeeper,
      shopName,
      description,
      location,
      latitude,
      longitude,
      logo,
      BeekeeperOwnershipCertificate: documents?.beekeeperOwnershipCertificate,
      BeehiveLicense: documents?.beehiveLicense,
      HealthCertificate: documents?.healthCertificate,
      TaxRegistrationfortheBeehive: documents?.taxRegistration
    });
    
    const savedShop = await newShop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    console.error('Error creating shop:', error);
    res.status(500).json({ error: 'Failed to create shop', message: error.message });
  }
};

const getShopByBeekeeperId = async (req, res) => {
  try {
    const beekeeperId = req.user.id;
    console.log(beekeeperId);


    const shop = await Shop.findOne({ beekeeper: beekeeperId });

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.status(200).json({
      success: true,
      shop
    });
  } catch (error) {
    console.error('Error fetching shop by beekeeper ID:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a shop by beekeeper's ID
const updateShopByBeekeeperId = async (req, res) => {
  try {
    const beekeeperId = req.user.id;
    console.log(beekeeperId);
      const updates = req.body; // Expecting the updated fields to be sent in the body of the request

    const shop = await Shop.findOneAndUpdate(
      { beekeeper: beekeeperId },
      updates,
      { new: true, runValidators: true }
    );

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.status(200).json({
      success: true,
      shop
    });
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getTopRatedShops = async (req, res) => {
  try {
    // Fetch the top 3 shops sorted by averageRating in descending order
    const shops = await Shop.find({ isApproved: true }) // Ensure only approved shops are included
      .sort({ averageRating: -1 }) // Sort by average rating
      .limit(3); // Limit to top 3 shops

    res.status(200).json({
      success: true,
      shops,
    });
  } catch (error) {
    console.error('Error fetching top-rated shops:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Export all controllers
module.exports = {
  getShops,
  getShopById,
  getShopByBeekeeperId,
  createShop,
  updateShopByBeekeeperId,
  getShopByID,
  getTopRatedShops
};
