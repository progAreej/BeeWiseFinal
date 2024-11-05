// const mongoose = require('mongoose');
// const connectDB = require('../config/db'); // Adjust path as needed
// const User = require('../models/Users'); // Adjust path as needed
// const bcrypt = require('bcryptjs'); // For hashing passwords

// const seedUsers = async () => {
//   try {
//     await connectDB(); // Connect to MongoDB
//     console.log('Database connection established');

//     // Example users
//     const users = [
//       {
//         username: 'ahmad_jordan',
//         email: 'ahmad.jordan@example.com',
//         passwordHash: await bcrypt.hash('password123', 10),
//         phoneNumber: '0791112233',
//         profilePicture: 'https://example.com/profile1.jpg',
//         role: 'customer',
//         isApproved: true
//       },
//       {
//         username: 'fatima_jordan',
//         email: 'fatima.jordan@example.com',
//         passwordHash: await bcrypt.hash('password123', 10),
//         phoneNumber: '0791234567',
//         profilePicture: 'https://example.com/profile2.jpg',
//         role: 'customer',
//         isApproved: true
//       },
//       {
//         username: 'mohammed_jordan',
//         email: 'mohammed.jordan@example.com',
//         passwordHash: await bcrypt.hash('password123', 10),
//         phoneNumber: '0792345678',
//         profilePicture: 'https://example.com/profile3.jpg',
//         role: 'beekeeper',
//         apiaryLocation: 'Amman',
//         experienceYears: 3,
//         isApproved: true
//       },
//       {
//         username: 'noura_jordan',
//         email: 'noura.jordan@example.com',
//         passwordHash: await bcrypt.hash('password123', 10),
//         phoneNumber: '0793456789',
//         profilePicture: 'https://example.com/profile4.jpg',
//         role: 'beekeeper',
//         apiaryLocation: 'Irbid',
//         experienceYears: 5,
//         isApproved: true
//       },
//       {
//         username: 'yousef_jordan',
//         email: 'yousef.jordan@example.com',
//         passwordHash: await bcrypt.hash('password123', 10),
//         phoneNumber: '0794567890',
//         profilePicture: 'https://example.com/profile5.jpg',
//         role: 'customer',
//         isApproved: true
//       },
//       {
//         username: 'rana_jordan',
//         email: 'rana.jordan@example.com',
//         passwordHash: await bcrypt.hash('password123', 10),
//         phoneNumber: '0795678901',
//         profilePicture: 'https://example.com/profile6.jpg',
//         role: 'beekeeper',
//         apiaryLocation: 'Zarqa',
//         experienceYears: 2,
//         isApproved: true
//       },
//       {
//         username: 'fadi_jordan',
//         email: 'fadi.jordan@example.com',
//         passwordHash: await bcrypt.hash('password123', 10),
//         phoneNumber: '0796789012',
//         profilePicture: 'https://example.com/profile7.jpg',
//         role: 'customer',
//         isApproved: true
//       },
//       {
//         username: 'layla_jordan',
//         email: 'layla.jordan@example.com',
//         passwordHash: await bcrypt.hash('password123', 10),
//         phoneNumber: '0797890123',
//         profilePicture: 'https://example.com/profile8.jpg',
//         role: 'beekeeper',
//         apiaryLocation: 'Madaba',
//         experienceYears: 4,
//         isApproved: true
//       },
//       {
//         username: 'samir_jordan',
//         email: 'samir.jordan@example.com',
//         passwordHash: await bcrypt.hash('password123', 10),
//         phoneNumber: '0798901234',
//         profilePicture: 'https://example.com/profile9.jpg',
//         role: 'customer',
//         isApproved: true
//       },
//       {
//         username: 'amira_jordan',
//         email: 'amira.jordan@example.com',
//         passwordHash: await bcrypt.hash('password123', 10),
//         phoneNumber: '0799012345',
//         profilePicture: 'https://example.com/profile10.jpg',
//         role: 'beekeeper',
//         apiaryLocation: 'Ajloun',
//         experienceYears: 6,
//         isApproved: true
//       }
//     ];

//     // Clear existing users
//     await User.deleteMany({});

//     // Insert new users
//     const docs = await User.insertMany(users);
//     console.log('Users inserted:', docs);

//     await mongoose.connection.close(); // Close connection after seeding
//     console.log('Database connection closed');
//   } catch (error) {
//     console.error('Error:', error);
//     await mongoose.connection.close(); // Close connection on error
//   }
// };

// seedUsers();


const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path as needed
const User = require('../models/Users'); // Adjust path as needed
const bcrypt = require('bcryptjs'); // For hashing passwords

const seedUsers = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log('Database connection established');

    // Example users
    const users = [
      // Existing customer users
      {
        username: 'ahmad_jordan',
        email: 'ahmad.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0791112233',
        profilePicture: 'https://example.com/profile1.jpg',
        role: 'customer',
        isApproved: true
      },
      {
        username: 'fatima_jordan',
        email: 'fatima.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0791234567',
        profilePicture: 'https://example.com/profile2.jpg',
        role: 'customer',
        isApproved: true
      },
      {
        username: 'yousef_jordan',
        email: 'yousef.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0794567890',
        profilePicture: 'https://example.com/profile5.jpg',
        role: 'customer',
        isApproved: true
      },
      {
        username: 'fadi_jordan',
        email: 'fadi.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0796789012',
        profilePicture: 'https://example.com/profile7.jpg',
        role: 'customer',
        isApproved: true
      },
      {
        username: 'samir_jordan',
        email: 'samir.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0798901234',
        profilePicture: 'https://example.com/profile9.jpg',
        role: 'customer',
        isApproved: true
      },

      // Existing beekeeper users
      {
        username: 'mohammed_jordan',
        email: 'mohammed.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0792345678',
        profilePicture: 'https://example.com/profile3.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Amman',
        experienceYears: 3,
        isApproved: true
      },
      {
        username: 'noura_jordan',
        email: 'noura.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0793456789',
        profilePicture: 'https://example.com/profile4.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Irbid',
        experienceYears: 5,
        isApproved: true
      },
      {
        username: 'rana_jordan',
        email: 'rana.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0795678901',
        profilePicture: 'https://example.com/profile6.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Zarqa',
        experienceYears: 2,
        isApproved: true
      },
      {
        username: 'layla_jordan',
        email: 'layla.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0797890123',
        profilePicture: 'https://example.com/profile8.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Madaba',
        experienceYears: 4,
        isApproved: true
      },
      {
        username: 'amira_jordan',
        email: 'amira.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0799012345',
        profilePicture: 'https://example.com/profile10.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Ajloun',
        experienceYears: 6,
        isApproved: true
      },
      
      // New beekeeper users (adding 20 beekeepers)
      {
        username: 'ali_jordan',
        email: 'ali.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0791112234',
        profilePicture: 'https://example.com/profile11.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Aqaba',
        experienceYears: 2,
        isApproved: true
      },
      {
        username: 'zainab_jordan',
        email: 'zainab.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0792223345',
        profilePicture: 'https://example.com/profile12.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Karak',
        experienceYears: 4,
        isApproved: true
      },
      {
        username: 'khaled_jordan',
        email: 'khaled.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0793334456',
        profilePicture: 'https://example.com/profile13.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Irbid',
        experienceYears: 1,
        isApproved: true
      },
      {
        username: 'salma_jordan',
        email: 'salma.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0794445567',
        profilePicture: 'https://example.com/profile14.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Zarqa',
        experienceYears: 3,
        isApproved: true
      },
      {
        username: 'karim_jordan',
        email: 'karim.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0795556678',
        profilePicture: 'https://example.com/profile15.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Amman',
        experienceYears: 5,
        isApproved: true
      },
      {
        username: 'sara_jordan',
        email: 'sara.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0796667789',
        profilePicture: 'https://example.com/profile16.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Madaba',
        experienceYears: 2,
        isApproved: true
      },
      {
        username: 'osman_jordan',
        email: 'osman.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0797778890',
        profilePicture: 'https://example.com/profile17.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Aqaba',
        experienceYears: 6,
        isApproved: true
      },
      {
        username: 'nour_jordan',
        email: 'nour.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0798889901',
        profilePicture: 'https://example.com/profile18.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Karak',
        experienceYears: 4,
        isApproved: true
      },
      {
        username: 'omar_jordan',
        email: 'omar.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0799990012',
        profilePicture: 'https://example.com/profile19.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Irbid',
        experienceYears: 3,
        isApproved: true
      },
      {
        username: 'leila_jordan',
        email: 'leila.jordan@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phoneNumber: '0788888900',
        profilePicture: 'https://example.com/profile20.jpg',
        role: 'beekeeper',
        apiaryLocation: 'Zarqa',
        experienceYears: 5,
        isApproved: true
      }
    ];

    // Clear existing users
    await User.deleteMany({});

    // Insert new users
    const docs = await User.insertMany(users);
    console.log('Users inserted:', docs);

    await mongoose.connection.close(); // Close connection after seeding
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close(); // Close connection on error
  }
};

seedUsers();
