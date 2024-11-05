// const mongoose = require('mongoose');
// const connectDB = require('../config/db'); // Adjust path as needed
// const Product = require('../models/Products'); // Adjust path as needed
// const Shop = require('../models/Shop'); // Adjust path as needed

// const seedProducts = async () => {
//   try {
//     await connectDB(); // Connect to MongoDB
//     console.log('Database connection established');

//     // Fetch all shops
//     const shops = await Shop.find({});
//     console.log('Shops fetched:', shops);

//     if (shops.length === 0) {
//       console.error('No shops found. Ensure that you have shops in the database.');
//       await mongoose.connection.close(); // Close connection before exiting
//       return;
//     }

//     const products = [
//       {
//         shop: shops[1]._id,
//         name: 'Wildflower Honey',
//         description: 'Rich and floral honey harvested from wildflowers.',
//         price: 15.00,
//         stock: 100,
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRwvDB5MEoVZfVgdhhCk_VO0dJ1efS057xfw&s',
//         averageRating: 4.7,
//         isApproved: true,
//         isFavorite: false,
//         recentViews: 0,
//         category: 'Raw Honey'
//       },
//       {
//         shop: shops[1]._id,
//         name: 'Acacia Honey',
//         description: 'Light and mild honey made from acacia blossoms.',
//         price: 20.00,
//         stock: 50,
//         image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
//         averageRating: 4.9,
//         isApproved: true,
//         isFavorite: false,
//         recentViews: 0,
//         category: 'Raw Honey'
//       },
//       {
//         shop: shops[1]._id,
//         name: 'Clover Honey',
//         description: 'Light and sweet honey from clover flowers.',
//         price: 17.00,
//         stock: 90,
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EzQhxAf0V6dGZg9IMIuPtMGv9sWS2kjWdg&s',
//         averageRating: 4.7,
//         isApproved: true,
//         isFavorite: false,
//         recentViews: 0,
//         category: 'Flavored Honey'
//       },
//       {
//         shop: shops[1]._id,
//         name: 'Bee Pollen',
//         description: 'Nutrient-rich bee pollen harvested fresh.',
//         price: 25.00,
//         stock: 20,
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5HEk7t66TOyf-87RlZy7xMtp7wGT_uhb5eQ&s',
//         averageRating: 4.6,
//         isApproved: true,
//         isFavorite: false,
//         recentViews: 0,
//         category: 'Bee Pollen'
//       },
//       {
//         shop: shops[1]._id,
//         name: 'Raw Honey',
//         description: 'Unfiltered honey with all natural nutrients intact.',
//         price: 27.00,
//         stock: 35,
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-HRgwnpfg-XyIufXEkcm1tO2e9i2ph99CQ&s',
//         averageRating: 4.8,
//         isApproved: true,
//         isFavorite: false,
//         recentViews: 0,
//         category: 'Beeswax Products'
//       },
//       {
//         shop: shops[1]._id,
//         name: 'Orange Blossom Honey',
//         description: 'Delicate honey with a hint of orange flavor.',
//         price: 19.00,
//         stock: 60,
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7V2ROVc2UpIYX56nIthZz-F5FZPVk2b-VZw&s',
//         averageRating: 4.8,
//         isApproved: true,
//         isFavorite: false,
//         recentViews: 0,
//         category: 'Flavored Honey'
//       },
//       {
//         shop: shops[1]._id,
//         name: 'Honeycomb',
//         description: 'Fresh honeycomb with pure honey in each cell.',
//         price: 28.00,
//         stock: 15,
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Jv_AxrbL5S9r9_p0y4d8fWh6mOhYFYVwxQ&s',
//         averageRating: 4.9,
//         isApproved: true,
//         isFavorite: false,
//         recentViews: 0,
//         category: 'Honeycombs'
//       },
//       {
//         shop: shops[1]._id,
//         name: 'Propolis Extract',
//         description: 'Natural propolis extract with various health benefits.',
//         price: 30.00,
//         stock: 25,
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbhYYA3RAVXGSOyL9j6sDgj3vx2U-8hx8Eow&s',
//         averageRating: 4.8,
//         isApproved: true,
//         isFavorite: false,
//         recentViews: 0,
//         category: 'Propolis'
//       },
//       {
//         shop: shops[1]._id,
//         name: 'Royal Jelly',
//         description: 'Highly nutritious jelly secreted by nurse bees.',
//         price: 50.00,
//         stock: 10,
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhbs5cGpzyr60rSm3sV0AVT4FjtV-JaCm3kg&s',
//         averageRating: 4.9,
//         isApproved: true,
//         isFavorite: false,
//         recentViews: 0,
//         category: 'Royal Jelly'
//       },
//       {
//         shop: shops[1]._id,
//         name: 'Bee Smoker',
//         description: 'Tool used to calm bees during hive inspections.',
//         price: 55.00,
//         stock: 15,
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3LTFu7U5eI-cHqg5bi-LxXpF3Dbjp90Qp8w&s',
//         averageRating: 4.7,
//         isApproved: true,
//         isFavorite: false,
//         recentViews: 0,
//         category: 'Beeswax Products'
//       }
//   ];

//     // Clear existing products
//     await Product.deleteMany({});

//     // Insert new products
//     const docs = await Product.insertMany(products);
//     console.log('Products inserted:', docs);

//     await mongoose.connection.close(); // Close connection after seeding
//     console.log('Database connection closed');
//   } catch (error) {
//     console.error('Error:', error);
//     await mongoose.connection.close(); // Close connection on error
//   }
// };

// seedProducts();


const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path as needed
const Product = require('../models/Products'); // Adjust path as needed
const Shop = require('../models/Shop'); // Adjust path as needed

const honeyCategories = [
  'Raw Honey', 'Flavored Honey', 'Beeswax Products', 'Honeycombs', 'Propolis', 'Royal Jelly', 'Bee Pollen'
];

const seedProducts = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log('Database connection established');

    // Fetch all shops
    const shops = await Shop.find({});
    console.log('Shops fetched:', shops);

    if (shops.length === 0) {
      console.error('No shops found. Ensure that you have shops in the database.');
      await mongoose.connection.close(); // Close connection before exiting
      return;
    }

    const products = [
      {
        shop: shops[1]._id,
        name: 'Wildflower Honey',
        description: 'Rich and floral honey harvested from wildflowers.',
        price: 15.00,
        stock: 100,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Acacia Honey',
        description: 'Light and mild honey made from acacia blossoms.',
        price: 20.00,
        stock: 50,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Clover Honey',
        description: 'Light and sweet honey from clover flowers.',
        price: 17.00,
        stock: 90,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Bee Pollen',
        description: 'Nutrient-rich bee pollen harvested fresh.',
        price: 25.00,
        stock: 20,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Bee Pollen'
      },
      {
        shop: shops[1]._id,
        name: 'Raw Honey',
        description: 'Unfiltered honey with all natural nutrients intact.',
        price: 27.00,
        stock: 35,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      {
        shop: shops[1]._id,
        name: 'Orange Blossom Honey',
        description: 'Delicate honey with a hint of orange flavor.',
        price: 19.00,
        stock: 60,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Honeycomb',
        description: 'Fresh honeycomb with pure honey in each cell.',
        price: 28.00,
        stock: 15,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Jv_AxrbL5S9r9_p0y4d8fWh6mOhYFYVwxQ&s',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Honeycombs'
      },
      {
        shop: shops[1]._id,
        name: 'Propolis Extract',
        description: 'Natural propolis extract with various health benefits.',
        price: 30.00,
        stock: 25,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbhYYA3RAVXGSOyL9j6sDgj3vx2U-8hx8Eow&s',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Propolis'
      },
      {
        shop: shops[1]._id,
        name: 'Royal Jelly',
        description: 'Highly nutritious jelly secreted by nurse bees.',
        price: 50.00,
        stock: 10,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Royal Jelly'
      },
      {
        shop: shops[1]._id,
        name: 'Bee Smoker',
        description: 'Tool used to calm bees during hive inspections.',
        price: 55.00,
        stock: 15,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      // Additional products
      {
        shop: shops[1]._id,
        name: 'Thyme Honey',
        description: 'Honey with a distinct thyme flavor.',
        price: 22.00,
        stock: 40,
        image: 'https://example.com/thyme_honey.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Lavender Honey',
        description: 'Honey infused with lavender for a unique taste.',
        price: 23.00,
        stock: 45,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Manuka Honey',
        description: 'Premium honey known for its health benefits.',
        price: 40.00,
        stock: 30,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 5.0,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Buckwheat Honey',
        description: 'Dark and robust honey with rich flavors.',
        price: 18.00,
        stock: 60,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Cinnamon Honey',
        description: 'Honey blended with natural cinnamon.',
        price: 21.00,
        stock: 50,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Bee Wax Candles',
        description: 'Natural candles made from beeswax.',
        price: 15.00,
        stock: 20,
        image: 'https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      {
        shop: shops[1]._id,
        name: 'Royal Jelly Capsules',
        description: 'Convenient capsules filled with royal jelly.',
        price: 35.00,
        stock: 25,
        // image: 'https://example.com/royal_jelly_capsules.jpg',
        image:"https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg",
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Royal Jelly'
      },
      {
        shop: shops[1]._id,
        name: 'Flavored Honey Sticks',
        description: 'Honey sticks in various flavors.',
        price: 10.00,
        stock: 50,
        // image: 'https://example.com/honey_sticks.jpg',
        image:"https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg",
        averageRating: 4.5,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Honey Infused Olive Oil',
        description: 'Olive oil infused with honey for a unique flavor.',
        price: 30.00,
        stock: 10,
        // image: 'https://example.com/honey_olive_oil.jpg',
        image:"https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg",
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Bee Propolis Spray',
        description: 'Natural propolis spray for wellness.',
        price: 25.00,
        stock: 15,
        image: 'https://example.com/propolis_spray.jpg',
        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Propolis'
      },
      {
        shop: shops[1]._id,
        name: 'Honey Mustard',
        description: 'Delicious honey mustard for dipping.',
        price: 12.00,
        stock: 40,
        image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Organic Honey',
        description: 'Pure organic honey harvested without chemicals.',
        price: 22.00,
        stock: 30,
        // image: 'https://example.com/organic_honey.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Honey Infused Herbal Tea',
        description: 'Herbal tea blended with honey for a soothing experience.',
        price: 18.00,
        stock: 20,
        // image: 'https://example.com/honey_herbal_tea.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Raw Honey Gift Set',
        description: 'Beautifully packaged gift set of raw honey.',
        price: 45.00,
        stock: 10,
        // image: 'https://example.com/raw_honey_gift_set.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[1]._id,
        name: 'Beekeeping Starter Kit',
        description: 'Everything you need to start beekeeping.',
        price: 150.00,
        stock: 5,
        // image: 'https://example.com/beekeeping_kit.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      {
        shop: shops[1]._id,
        name: 'Honey Based Skincare Products',
        description: 'Natural skincare products made with honey.',
        price: 20.00,
        stock: 30,
        // image: 'https://example.com/honey_skincare.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      // ---------


      {
        shop: shops[2]._id,
        name: 'Wildflower Honey',
        description: 'Rich and floral honey harvested from wildflowers.',
        price: 15.00,
        stock: 100,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Acacia Honey',
        description: 'Light and mild honey made from acacia blossoms.',
        price: 20.00,
        stock: 50,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Clover Honey',
        description: 'Light and sweet honey from clover flowers.',
        price: 17.00,
        stock: 90,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Bee Pollen',
        description: 'Nutrient-rich bee pollen harvested fresh.',
        price: 25.00,
        stock: 20,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Bee Pollen'
      },
      {
        shop: shops[2]._id,
        name: 'Raw Honey',
        description: 'Unfiltered honey with all natural nutrients intact.',
        price: 27.00,
        stock: 35,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      {
        shop: shops[2]._id,
        name: 'Orange Blossom Honey',
        description: 'Delicate honey with a hint of orange flavor.',
        price: 19.00,
        stock: 60,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Honeycomb',
        description: 'Fresh honeycomb with pure honey in each cell.',
        price: 28.00,
        stock: 15,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Jv_AxrbL5S9r9_p0y4d8fWh6mOhYFYVwxQ&s',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Honeycombs'
      },
      {
        shop: shops[2]._id,
        name: 'Propolis Extract',
        description: 'Natural propolis extract with various health benefits.',
        price: 30.00,
        stock: 25,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbhYYA3RAVXGSOyL9j6sDgj3vx2U-8hx8Eow&s',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Propolis'
      },
      {
        shop: shops[2]._id,
        name: 'Royal Jelly',
        description: 'Highly nutritious jelly secreted by nurse bees.',
        price: 50.00,
        stock: 10,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Royal Jelly'
      },
      {
        shop: shops[2]._id,
        name: 'Bee Smoker',
        description: 'Tool used to calm bees during hive inspections.',
        price: 55.00,
        stock: 15,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      // Additional products
      {
        shop: shops[2]._id,
        name: 'Thyme Honey',
        description: 'Honey with a distinct thyme flavor.',
        price: 22.00,
        stock: 40,
        image: 'https://example.com/thyme_honey.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Lavender Honey',
        description: 'Honey infused with lavender for a unique taste.',
        price: 23.00,
        stock: 45,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Manuka Honey',
        description: 'Premium honey known for its health benefits.',
        price: 40.00,
        stock: 30,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 5.0,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Buckwheat Honey',
        description: 'Dark and robust honey with rich flavors.',
        price: 18.00,
        stock: 60,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Cinnamon Honey',
        description: 'Honey blended with natural cinnamon.',
        price: 21.00,
        stock: 50,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Bee Wax Candles',
        description: 'Natural candles made from beeswax.',
        price: 15.00,
        stock: 20,
        image: 'https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      {
        shop: shops[2]._id,
        name: 'Royal Jelly Capsules',
        description: 'Convenient capsules filled with royal jelly.',
        price: 35.00,
        stock: 25,
        // image: 'https://example.com/royal_jelly_capsules.jpg',
        image:"https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg",
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Royal Jelly'
      },
      {
        shop: shops[2]._id,
        name: 'Flavored Honey Sticks',
        description: 'Honey sticks in various flavors.',
        price: 10.00,
        stock: 50,
        // image: 'https://example.com/honey_sticks.jpg',
        image:"https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg",
        averageRating: 4.5,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Honey Infused Olive Oil',
        description: 'Olive oil infused with honey for a unique flavor.',
        price: 30.00,
        stock: 10,
        // image: 'https://example.com/honey_olive_oil.jpg',
        image:"https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg",
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Bee Propolis Spray',
        description: 'Natural propolis spray for wellness.',
        price: 25.00,
        stock: 15,
        image: 'https://example.com/propolis_spray.jpg',
        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Propolis'
      },
      {
        shop: shops[2]._id,
        name: 'Honey Mustard',
        description: 'Delicious honey mustard for dipping.',
        price: 12.00,
        stock: 40,
        image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Organic Honey',
        description: 'Pure organic honey harvested without chemicals.',
        price: 22.00,
        stock: 30,
        // image: 'https://example.com/organic_honey.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Honey Infused Herbal Tea',
        description: 'Herbal tea blended with honey for a soothing experience.',
        price: 18.00,
        stock: 20,
        // image: 'https://example.com/honey_herbal_tea.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Raw Honey Gift Set',
        description: 'Beautifully packaged gift set of raw honey.',
        price: 45.00,
        stock: 10,
        // image: 'https://example.com/raw_honey_gift_set.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[2]._id,
        name: 'Beekeeping Starter Kit',
        description: 'Everything you need to start beekeeping.',
        price: 150.00,
        stock: 5,
        // image: 'https://example.com/beekeeping_kit.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      {
        shop: shops[2]._id,
        name: 'Honey Based Skincare Products',
        description: 'Natural skincare products made with honey.',
        price: 20.00,
        stock: 30,
        // image: 'https://example.com/honey_skincare.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      // --------------------




      {
        shop: shops[3]._id,
        name: 'Wildflower Honey',
        description: 'Rich and floral honey harvested from wildflowers.',
        price: 15.00,
        stock: 100,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Acacia Honey',
        description: 'Light and mild honey made from acacia blossoms.',
        price: 20.00,
        stock: 50,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Clover Honey',
        description: 'Light and sweet honey from clover flowers.',
        price: 17.00,
        stock: 90,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Bee Pollen',
        description: 'Nutrient-rich bee pollen harvested fresh.',
        price: 25.00,
        stock: 20,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Bee Pollen'
      },
      {
        shop: shops[3]._id,
        name: 'Raw Honey',
        description: 'Unfiltered honey with all natural nutrients intact.',
        price: 27.00,
        stock: 35,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      {
        shop: shops[3]._id,
        name: 'Orange Blossom Honey',
        description: 'Delicate honey with a hint of orange flavor.',
        price: 19.00,
        stock: 60,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Honeycomb',
        description: 'Fresh honeycomb with pure honey in each cell.',
        price: 28.00,
        stock: 15,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Jv_AxrbL5S9r9_p0y4d8fWh6mOhYFYVwxQ&s',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Honeycombs'
      },
      {
        shop: shops[3]._id,
        name: 'Propolis Extract',
        description: 'Natural propolis extract with various health benefits.',
        price: 30.00,
        stock: 25,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbhYYA3RAVXGSOyL9j6sDgj3vx2U-8hx8Eow&s',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Propolis'
      },
      {
        shop: shops[3]._id,
        name: 'Royal Jelly',
        description: 'Highly nutritious jelly secreted by nurse bees.',
        price: 50.00,
        stock: 10,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Royal Jelly'
      },
      {
        shop: shops[3]._id,
        name: 'Bee Smoker',
        description: 'Tool used to calm bees during hive inspections.',
        price: 55.00,
        stock: 15,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      // Additional products
      {
        shop: shops[3]._id,
        name: 'Thyme Honey',
        description: 'Honey with a distinct thyme flavor.',
        price: 22.00,
        stock: 40,
        image: 'https://example.com/thyme_honey.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Lavender Honey',
        description: 'Honey infused with lavender for a unique taste.',
        price: 23.00,
        stock: 45,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Manuka Honey',
        description: 'Premium honey known for its health benefits.',
        price: 40.00,
        stock: 30,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 5.0,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Buckwheat Honey',
        description: 'Dark and robust honey with rich flavors.',
        price: 18.00,
        stock: 60,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Cinnamon Honey',
        description: 'Honey blended with natural cinnamon.',
        price: 21.00,
        stock: 50,
        image: 'https://img.freepik.com/premium-photo/honey-honeycombs-with-honey-ai-generated_406939-10107.jpg',
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Bee Wax Candles',
        description: 'Natural candles made from beeswax.',
        price: 15.00,
        stock: 20,
        image: 'https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      {
        shop: shops[3]._id,
        name: 'Royal Jelly Capsules',
        description: 'Convenient capsules filled with royal jelly.',
        price: 35.00,
        stock: 25,
        // image: 'https://example.com/royal_jelly_capsules.jpg',
        image:"https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg",
        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Royal Jelly'
      },
      {
        shop: shops[3]._id,
        name: 'Flavored Honey Sticks',
        description: 'Honey sticks in various flavors.',
        price: 10.00,
        stock: 50,
        // image: 'https://example.com/honey_sticks.jpg',
        image:"https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg",
        averageRating: 4.5,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Honey Infused Olive Oil',
        description: 'Olive oil infused with honey for a unique flavor.',
        price: 30.00,
        stock: 10,
        // image: 'https://example.com/honey_olive_oil.jpg',
        image:"https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8177.jpg",
        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Bee Propolis Spray',
        description: 'Natural propolis spray for wellness.',
        price: 25.00,
        stock: 15,
        image: 'https://example.com/propolis_spray.jpg',
        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Propolis'
      },
      {
        shop: shops[3]._id,
        name: 'Honey Mustard',
        description: 'Delicious honey mustard for dipping.',
        price: 12.00,
        stock: 40,
        image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',
        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Organic Honey',
        description: 'Pure organic honey harvested without chemicals.',
        price: 22.00,
        stock: 30,
        // image: 'https://example.com/organic_honey.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Honey Infused Herbal Tea',
        description: 'Herbal tea blended with honey for a soothing experience.',
        price: 18.00,
        stock: 20,
        // image: 'https://example.com/honey_herbal_tea.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.8,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Flavored Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Raw Honey Gift Set',
        description: 'Beautifully packaged gift set of raw honey.',
        price: 45.00,
        stock: 10,
        // image: 'https://example.com/raw_honey_gift_set.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.9,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Raw Honey'
      },
      {
        shop: shops[3]._id,
        name: 'Beekeeping Starter Kit',
        description: 'Everything you need to start beekeeping.',
        price: 150.00,
        stock: 5,
        // image: 'https://example.com/beekeeping_kit.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.6,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      },
      {
        shop: shops[3]._id,
        name: 'Honey Based Skincare Products',
        description: 'Natural skincare products made with honey.',
        price: 20.00,
        stock: 30,
        // image: 'https://example.com/honey_skincare.jpg',
                image: 'https://img.freepik.com/premium-photo/ai-generated-illustration-honeycomb-with-honey-drop-white-background_441362-7764.jpg',

        averageRating: 4.7,
        isApproved: true,
        isFavorite: false,
        recentViews: 0,
        category: 'Beeswax Products'
      }
    ];

    // Clear existing products
    await Product.deleteMany({});

    // Insert new products
    const docs = await Product.insertMany(products);
    console.log('Products inserted:', docs);

    await mongoose.connection.close(); // Close connection after seeding
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close(); // Close connection on error
  }
};

seedProducts();
