

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');  // Import Helmet for security
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");

// ----------------------- Security Middlewares -----------------------

// Use Helmet to secure HTTP headers
app.use(helmet({
    contentSecurityPolicy: false,  // Disable CSP if not configured (you can customize it later)
}));

// Enable CORS for handling cross-origin requests (customize if needed)
app.use(cors({
  origin: ['http://localhost:5173'], // Remove trailing slash
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allow necessary methods
  credentials: true // Allow credentials (cookies, authorization headers)
}));

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// --------------------------------------------------------------------

// Connect to MongoDB
connectDB();

// ----------------------- Body Parsing Middlewares -------------------

// Parse URL-encoded bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (e.g., API requests)
app.use(express.json());
// app.use(bodyParser.json()); // For parsing application/json

// Serve static files (like images) from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



app.get('/', (req, res) => {
  res.send('Welcome to the Bee Wise API!, You are using Helmet Now!! ');
});

// ----------------------- Route Imports ------------------------------
const verifyToken = require('./config/auth');
const userRoutes = require('./routes/UserRoutes');
const contactRoutes = require('./routes/contactRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const beekeepersRoutes = require('./routes/beekeepersRoutes');
const profileRoutes = require('./routes/profileRoutes');
const fileRoutes = require('./routes/fileRoutes');
const shopRoutes = require('./routes/shopRoutes');
const productRoutes = require('./routes/productRoutes');
// const paymentRoutes = require('./routes/OrangeRoutes');
const cartRoutes = require('./routes/cartRoutes');
const blogRoutes = require('./routes/blogRoutes');
const Role = require('./routes/roleRoutes'); // Adjust the path as necessary
const paymentRoutes = require('./routes/paymentRoutes');
const postRoutes = require('./routes/postRoutes');
const eventRoutes = require('./routes/eventRoutes'); // Import event routes
const orderRoutes = require('./routes/orderRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const recentlyViewedRoutes = require('./routes/RecentViewRoute');
const favoritesRoutes = require('./routes/favoritesRoute');
const ratingRoute = require('./routes/ratingRoute');
const community = require('./routes/CommunityRoutes')
const my =require ('./routes/MyRoutes')
const revenueRoutes = require('./routes/revenueRoutes'); // Import the revenue routes

// Use routes for handling various parts of your app
app.use('/api', my);
app.use('/api', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api', beekeepersRoutes);
app.use('/api', profileRoutes);
app.use('/api', fileRoutes);
app.use('/api', shopRoutes);
app.use('/api', productRoutes);
// app.use('/api', paymentRoutes);
app.use('/api', cartRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api', Role); // Mount userRoutes at the '/api' endpoint
app.use('/api', paymentRoutes); // All payment routes will be prefixed with /api
app.use('/api/posts', postRoutes);
app.use('/api', eventRoutes); // Prefix all event routes with `/api`
app.use('/api', orderRoutes);
app.use('/api/applications', jobApplicationRoutes);
app.use('/api/users/recently-viewed', recentlyViewedRoutes);
app.use('/api/users/', favoritesRoutes);
app.use('/api', ratingRoute);
app.use('/api', community);
app.use('/api', revenueRoutes);



// Example of a protected route using JWT or other token verification
app.get('/api/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route.' });
});

// ----------------------- Error Handling -----------------------------

// Handle 404 errors for routes that don't exist
app.use((req, res, next) => {
  res.status(404).json({ error: "Page Not Found" });
});

// General error handler for catching all other errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// ----------------------- Start Server -------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
