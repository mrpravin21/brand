const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');


const app = express();
const port = process.env.PORT || 5001;

dotenv.config();

app.use(session({
  secret: process.env.SESSION_SECRET, // Use a secure secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Use `true` if using HTTPS
}));

app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Import routes for brands and creators
const brandsRoutes = require('./routes/brands');
const creatorsRoutes = require('./routes/creators');

// Use the routes
app.use('/api/brands', brandsRoutes);
app.use('/api/creators', creatorsRoutes); // Mounting creators route at /api/creators

// Generic error handler (optional but useful)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
