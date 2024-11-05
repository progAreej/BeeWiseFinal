// const mongoose = require('mongoose');
// const connectDB = require('../config/db'); // Adjust path as needed
// const User = require('../models/Users'); // Adjust path as needed
// const Shop = require('../models/Shop'); // Adjust path as needed

// const seedShops = async () => {
//   try {
//     await connectDB(); // Connect to MongoDB
//     console.log('Database connection established');

//     // Fetch all beekeepers
//     const beekeepers = await User.find({ role: 'beekeeper' }).exec();
//     console.log('Beekeepers fetched:', beekeepers);

//     if (beekeepers.length === 0) {
//       console.error('No beekeepers found. Ensure that you have users with the "beekeeper" role.');
//       await mongoose.connection.close(); // Close connection before exiting
//       return;
//     }

//     // Example shops
//     const shops = [
//       {
//         beekeeper: beekeepers[0]._id, // Assigning a beekeeper
//         shopName: 'Sweet Honey Co.',
//         description: 'Natural and organic honey sourced from the best apiaries.',
//         location: 'Amman',
//         latitude: 31.9454,
//         longitude: 35.9284,
//         logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSuZ5WjRMIdkmusmYHPUFHTLIohRQfEDyeA&s',
//         averageRating: 4.5,
//         isApproved: true
//       },
//       {
//         beekeeper: beekeepers[1]._id, // Assigning a beekeeper
//         shopName: 'Pure Gold Honey',
//         description: 'High-quality honey with a focus on purity and flavor.',
//         location: 'Irbid',
//         latitude: 32.5556,
//         longitude: 35.8552,
//         logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-PUKpWA886uFADHyeg02DrcjHUCK97urKYg&s',
//         averageRating: 4.8,
//         isApproved: true
//       },
//       {
//         beekeeper: beekeepers[2]._id, // Assigning a beekeeper
//         shopName: 'Honey Haven',
//         description: 'Specializing in artisanal honey and bee-related products.',
//         location: 'Zarqa',
//         latitude: 32.0833,
//         longitude: 36.1000,
//         logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1WknQ0VPI9F3eExbk5Ww_oKUMwJd8Xrl7OA&s',
//         averageRating: 4.7,
//         isApproved: true
//       },
//       {
//         beekeeper: beekeepers[3]._id, // Assigning a beekeeper
//         shopName: 'Golden Nectar',
//         description: 'Premium honey and bee products with exceptional quality.',
//         location: 'Madaba',
//         latitude: 31.7167,
//         longitude: 35.7833,
//         logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5zWqs70DsVScblxt9IVgM8SNNgO6PlhK5Zw&s',
//         averageRating: 4.9,
//         isApproved: true
//       },
//       {
//         beekeeper: beekeepers[4]._id, // Assigning a beekeeper
//         shopName: 'Bee Delight',
//         description: 'Offering a wide range of honey and beeswax products.',
//         location: 'Ajloun',
//         latitude: 32.3667,
//         longitude: 35.7667,
//         logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWVXPU0YY8BHWpswQkV3qUsRYj7H4P0l3GKg&s',
//         averageRating: 4.6,
//         isApproved: true
//       }
//     ];

//     // Clear existing shops
//     await Shop.deleteMany({});

//     // Insert new shops
//     const docs = await Shop.insertMany(shops);
//     console.log('Shops inserted:', docs);

//     await mongoose.connection.close(); // Close connection after seeding
//     console.log('Database connection closed');
//   } catch (error) {
//     console.error('Error:', error);
//     await mongoose.connection.close(); // Close connection on error
//   }
// };

// seedShops();


const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path as needed
const User = require('../models/Users'); // Adjust path as needed
const Shop = require('../models/Shop'); // Adjust path as needed

const seedShops = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log('Database connection established');

    // Fetch all beekeepers
    const beekeepers = await User.find({ role: 'beekeeper' }).exec();
    console.log('Beekeepers fetched:', beekeepers);

    if (beekeepers.length === 0) {
      console.error('No beekeepers found. Ensure that you have users with the "beekeeper" role.');
      await mongoose.connection.close(); // Close connection before exiting
      return;
    }

    // Example shops
    const shops = [
      {
        beekeeper: beekeepers[0]._id, // Assigning a beekeeper
        shopName: 'Sweet Honey Co.',
        description: 'Natural and organic honey sourced from the best apiaries.',
        location: 'Amman',
        latitude: 31.9454,
        longitude: 35.9284,
        logo: 'https://img.freepik.com/premium-photo/honey-ai-image_697259-365.jpg',
        averageRating: 4.5,
        isApproved: true
      },
      {
        beekeeper: beekeepers[1]._id, // Assigning a beekeeper
        shopName: 'Pure Gold Honey',
        description: 'High-quality honey with a focus on purity and flavor.',
        location: 'Irbid',
        latitude: 32.5556,
        longitude: 35.8552,
        logo: 'https://img.freepik.com/premium-photo/honey-ai-image_697259-365.jpg',
        averageRating: 4.8,
        isApproved: true
      },
      {
        beekeeper: beekeepers[2]._id, // Assigning a beekeeper
        shopName: 'Honey Haven',
        description: 'Specializing in artisanal honey and bee-related products.',
        location: 'Zarqa',
        latitude: 32.0833,
        longitude: 36.1000,
        logo: 'https://img.freepik.com/premium-photo/honey-ai-image_697259-365.jpg',
        averageRating: 4.7,
        isApproved: true
      },
      {
        beekeeper: beekeepers[3]._id, // Assigning a beekeeper
        shopName: 'Golden Nectar',
        description: 'Premium honey and bee products with exceptional quality.',
        location: 'Madaba',
        latitude: 31.7167,
        longitude: 35.7833,
        logo: 'https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8589.jpg',
        averageRating: 4.9,
        isApproved: true
      },
      {
        beekeeper: beekeepers[4]._id, // Assigning a beekeeper
        shopName: 'Bee Delight',
        description: 'Offering a wide range of honey and beeswax products.',
        location: 'Ajloun',
        latitude: 32.3667,
        longitude: 35.7667,
        logo: 'https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8589.jpg',
        averageRating: 4.6,
        isApproved: true
      },
      {
        beekeeper: beekeepers[5]._id,
        shopName: 'Honeycomb Dreams',
        description: 'Fresh honeycomb and gourmet honey varieties.',
        location: 'Jerash',
        latitude: 32.2786,
        longitude: 35.8959,
        logo: 'https://img.freepik.com/premium-photo/honeycomb-with-bees-jar-honey-ai-generated_201606-8589.jpg',
        averageRating: 4.7,
        isApproved: true
      },
      {
        beekeeper: beekeepers[6]._id,
        shopName: 'Golden Harvest Honey',
        description: 'Pure honey harvested from local hives.',
        location: 'Salt',
        latitude: 32.0041,
        longitude: 35.7485,
        logo: 'https://aiartshop.com/cdn/shop/files/a-bee-trapped-in-amber-animal-ai-art-243.webp?v=1706831644',
        averageRating: 4.8,
        isApproved: true
      },
      {
        beekeeper: beekeepers[7]._id,
        shopName: 'Honeybee Essentials',
        description: 'Essential bee products including honey, pollen, and propolis.',
        location: 'Aqaba',
        latitude: 29.5374,
        longitude: 35.0169,
        logo: 'https://aiartshop.com/cdn/shop/files/honey-bees-animal-ai-art-151.webp?v=1704911433',
        averageRating: 4.5,
        isApproved: true
      },
      {
        beekeeper: beekeepers[8]._id,
        shopName: 'Bee Happy',
        description: 'Happy bees produce sweet honey.',
        location: 'Mafraq',
        latitude: 32.3350,
        longitude: 36.2192,
        logo: 'https://aiartshop.com/cdn/shop/files/honey-bees-animal-ai-art-151.webp?v=1704911433',
        averageRating: 4.6,
        isApproved: true
      },
      {
        beekeeper: beekeepers[9]._id,
        shopName: 'Honey Blossoms',
        description: 'Blossom-flavored honey from various flowers.',
        location: 'Karak',
        latitude: 31.1559,
        longitude: 35.7006,
        logo: 'https://img.freepik.com/premium-photo/honey-store-social-media-poster-design_1020200-8619.jpg',
        averageRating: 4.7,
        isApproved: true
      },
      {
        beekeeper: beekeepers[10]._id,
        shopName: 'Bee Sweet',
        description: 'A variety of sweet honey products.',
        location: 'Zarqa',
        latitude: 32.0833,
        longitude: 36.1000,
        logo: 'https://img.freepik.com/premium-photo/honey-store-social-media-poster-design_1020200-8619.jpg',
        averageRating: 4.8,
        isApproved: true
      },
      {
        beekeeper: beekeepers[11]._id,
        shopName: 'Royal Bee',
        description: 'Luxury honey for the discerning palate.',
        location: 'Tafilah',
        latitude: 30.4248,
        longitude: 35.6937,
        logo: 'https://img.freepik.com/premium-photo/honey-store-social-media-poster-design_1020200-8619.jpg',
        averageRating: 4.9,
        isApproved: true
      },
      {
        beekeeper: beekeepers[12]._id,
        shopName: 'Nature’s Nectar',
        description: 'Wildflower honey and organic products.',
        location: 'Ajloun',
        latitude: 32.3667,
        longitude: 35.7667,
        logo: 'https://img.freepik.com/premium-photo/honey-store-social-media-poster-design_1020200-8671.jpg',
        averageRating: 4.6,
        isApproved: true
      },
      {
        beekeeper: beekeepers[13]._id,
        shopName: 'Bees & Blooms',
        description: 'Specialty honey made from unique flower sources.',
        location: 'Amman',
        latitude: 31.9454,
        longitude: 35.9284,
        logo: 'https://img.freepik.com/premium-photo/honey-store-social-media-poster-design_1020200-8671.jpg',
        averageRating: 4.7,
        isApproved: true
      },
      {
        beekeeper: beekeepers[14]._id,
        shopName: 'Buzzing Honey',
        description: 'Honey products for health and wellness.',
        location: 'Irbid',
        latitude: 32.5556,
        longitude: 35.8552,
        logo: 'https://img.freepik.com/premium-photo/honey-store-social-media-poster-design_1020200-8671.jpg',
        averageRating: 4.8,
        isApproved: true
      },
      // {
      //   beekeeper: beekeepers[15]._id,
      //   shopName: 'Honey Kingdom',
      //   description: 'A kingdom of flavors in every jar.',
      //   location: 'Salt',
      //   latitude: 32.0041,
      //   longitude: 35.7485,
      //   logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb2RY73TWjhl7v1LMsFY28kpXgBTg3dRwyQg&s',
      //   averageRating: 4.9,
      //   isApproved: true
      // },
      // {
      //   beekeeper: beekeepers[16]._id,
      //   shopName: 'Bees Blessing',
      //   description: 'Harvesting the blessings of nature through honey.',
      //   location: 'Madaba',
      //   latitude: 31.7167,
      //   longitude: 35.7833,
      //   logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6ZYfTz5oT9mb4Wm9oFsb5yF9sUBD3-OTcQ&s',
      //   averageRating: 4.5,
      //   isApproved: true
      // },
      // {
      //   beekeeper: beekeepers[17]._id,
      //   shopName: 'Honey Fusion',
      //   description: 'Fusing flavors from different flowers into honey.',
      //   location: 'Aqaba',
      //   latitude: 29.5374,
      //   longitude: 35.0169,
      //   logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5zzVfQkBQG3Uml3DqORPzP-V1HHYXz4CkPw&s',
      //   averageRating: 4.7,
      //   isApproved: true
      // },
      // {
      //   beekeeper: beekeepers[18]._id,
      //   shopName: 'Bee Natural',
      //   description: 'All-natural honey products straight from the hive.',
      //   location: 'Karak',
      //   latitude: 31.1559,
      //   longitude: 35.7006,
      //   logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLFRCxxmcD5vbDAvP7CwP54xOdKcRcu8i-3g&s',
      //   averageRating: 4.6,
      //   isApproved: true
      // },
      // {
      //   beekeeper: beekeepers[19]._id,
      //   shopName: 'Eco Honey',
      //   description: 'Eco-friendly honey sourced from sustainable farms.',
      //   location: 'Zarqa',
      //   latitude: 32.0833,
      //   longitude: 36.1000,
      //   logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qL2vbp1U_Dce1ZL_LsMORsYAXD3zfnxAcw&s',
      //   averageRating: 4.5,
      //   isApproved: true
      // },
    ];

    // Clear existing shops
    await Shop.deleteMany({});

    // Insert new shops
    const docs = await Shop.insertMany(shops);
    console.log('Shops inserted:', docs);

    await mongoose.connection.close(); // Close connection after seeding
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close(); // Close connection on error
  }
};

seedShops();
