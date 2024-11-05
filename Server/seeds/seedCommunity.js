const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path as necessary
const CommunityPost = require('../models/Community'); // Adjust path as necessary
const User = require('../models/Users'); // Adjust path as necessary

const seedCommunityPosts = async () => {
  try {
    await connectDB();
    console.log('Database connection established');

    // Fetch sample users
    const users = await User.find().exec();

    if (users.length === 0) {
      console.error('Ensure that you have users in your database.');
      await mongoose.connection.close();
      return;
    }

    // Sample community posts data
    const posts = [
      {
        title: 'Getting Started with Beekeeping',
        content: 'Beekeeping is an enjoyable and rewarding hobby. In this post, we will discuss the basics of getting started...',
        author: users[0]._id,
        comments: [
          {
            content: 'Great tips! Thanks for sharing.',
            commenter: users[1]._id,
            replies: [
              {
                content: 'You are welcome! Happy beekeeping!',
                commenter: users[0]._id,
              },
            ],
          },
        ],
        likes: [],
        tags: ['beekeeping', 'hobby'],
        category: 'General',
      },
      {
        title: 'Top 5 Tips for Honey Production',
        content: 'Producing high-quality honey requires careful planning and attention. Here are the top five tips to ensure a great yield...',
        author: users[0]._id,
        comments: [],
        likes: [],
        tags: ['honey', 'production'],
        category: 'Honey Production',
      },
      {
        title: 'Choosing the Right Beekeeping Equipment',
        content: 'Investing in quality equipment is crucial for successful beekeeping. Here are some essential items to consider...',
        author: users[1]._id,
        comments: [
          {
            content: 'This is really helpful! Thanks for the advice.',
            commenter: users[0]._id,
            replies: [],
          },
        ],
        likes: [],
        tags: ['equipment', 'beekeeping'],
        category: 'Equipment',
      },
      {
        title: 'The Importance of Bees in Our Ecosystem',
        content: 'Bees play a vital role in pollination, which is essential for food production. Let’s explore their importance...',
        author: users[2]._id,
        comments: [],
        likes: [],
        tags: ['environment', 'pollination'],
        category: 'General',
      },
      {
        title: 'Beekeeping Myths Debunked',
        content: 'There are many misconceptions about beekeeping. Let’s debunk some common myths surrounding this practice...',
        author: users[1]._id,
        comments: [
          {
            content: 'I had no idea about some of these myths!',
            commenter: users[2]._id,
            replies: [],
          },
        ],
        likes: [],
        tags: ['myths', 'education'],
        category: 'General',
      },
      {
        title: 'Creating a Bee-Friendly Garden',
        content: 'Want to attract bees to your garden? Here are some plants and tips for creating a bee-friendly environment...',
        author: users[2]._id,
        comments: [],
        likes: [],
        tags: ['gardening', 'bees'],
        category: 'General',
      },
    ];

    // Clear existing community posts
    await CommunityPost.deleteMany({});
    console.log('Cleared existing community posts');

    // Insert new posts
    const docs = await CommunityPost.insertMany(posts);
    console.log('Community posts inserted:', docs);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
  }
};

seedCommunityPosts();
