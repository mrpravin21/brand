const express = require('express');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../db');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

// Secret key for JWT
const JWT_SECRET = process.env.SESSION_SECRET;

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Unique file name
  }
});

const upload = multer({ storage: storage });

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or invalid." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.creatorId = decoded.id; // Attach the creator ID to the request object
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};




// Middleware to check if the email exists
async function checkEmailExists(email) {
  try {
    const result = await pool.query('SELECT * FROM creators WHERE email = $1', [email]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    throw new Error('Error checking email existence.');
  }
}

// POST route for registering a creator
router.post('/register', upload.fields([
  { name: 'analyticsPhoto1', maxCount: 1 },
  { name: 'analyticsPhoto2', maxCount: 1 }
]), async (req, res) => {
  const { creatorName, email, phone, category, socialLinks, password, contentType } = req.body;

  if (!creatorName || !email || !phone || !category || !socialLinks || !password || !contentType) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if email already exists
    const existingUser = await checkEmailExists(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // File paths
    const analyticsPhoto1Path = req.files['analyticsPhoto1'] ? req.files['analyticsPhoto1'][0].path : null;
    const analyticsPhoto2Path = req.files['analyticsPhoto2'] ? req.files['analyticsPhoto2'][0].path : null;

    // Insert creator into the database
    const result = await pool.query(
      'INSERT INTO creators (creator_name, email, phone, category, social_links, password, content_type, analytics_photo1, analytics_photo2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [creatorName, email, phone, category, socialLinks, hashedPassword, contentType, analyticsPhoto1Path, analyticsPhoto2Path]
    );

    res.status(201).json({
      message: "Creator registered successfully!",
      creator: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering creator." });
  }
});

// POST route for logging in a creator
// POST route for logging in a creator
router.post('/login/creator', async (req, res) => {
  const { email, password } = req.body;
  console.log('Request received:', { email, password }); // Debugging

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await checkEmailExists(email);
    if (!user) {
      console.log('User not found for email:', email); // Debugging
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email); // Debugging
      return res.status(401).json({ message: "Invalid password." });
    }

    req.session.user = { id: user.id, email: user.email, creatorName: user.creator_name };
    console.log(req.session.user);
    const user_id = req.session.user.id;
    console.log(user_id);
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful for user:', email); // Debugging
    res.status(200).json({
      message: "Login successful!",
      token,
      user: { id: user.id, email: user.email, creatorName: user.creator_name },
    });
  } catch (error) {
    console.error('Error logging in user:', error); // Debugging
    res.status(500).json({ message: "Error logging in." });
  }
});


// Middleware to check session
router.get('/session', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ isLoggedIn: true, user: req.session.user });
  } else {
    res.status(401).json({ isLoggedIn: false });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out." });
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully." });
  });
});

module.exports = router;


// GET route to fetch all creators
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM creators ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching creators." });
  }
});


// POST route to insert creator details
router.post('/creator-details', verifyToken, upload.fields([
  { name: 'analyticsPhoto1', maxCount: 1 },
  { name: 'analyticsPhoto2', maxCount: 1 },
  { name: 'analyticsPhoto3', maxCount: 1 }
]), async (req, res) => {
  const { creatorHandle, audienceAgeRange, audienceDemography, audienceGender, totalReach, contentType, location } = req.body;

  // Check if all required fields are provided
  if (!creatorHandle || !audienceAgeRange || !audienceDemography || !audienceGender || !totalReach || !contentType || !location || !req.files['analyticsPhoto1'] || !req.files['analyticsPhoto2'] || !req.files['analyticsPhoto3']) {
    return res.status(400).json({ message: "All fields are required, including uploading 3 photos." });
  }

  // Get creator_id from session (assuming you are storing it in the session after login)
  
 // Get creator_id from session

  // If creator_id is not found (user is not logged in), return erro

  try {
    // File paths
    const analyticsPhoto1Path = req.files['analyticsPhoto1'][0].path;
    const analyticsPhoto2Path = req.files['analyticsPhoto2'][0].path;
    const analyticsPhoto3Path = req.files['analyticsPhoto3'][0].path;

    // Insert creator details into the creator_detail table
    const result = await pool.query(
      'INSERT INTO creator_details (creator_id, creator_handle, audience_age_range, audience_demography, audience_gender, total_reach, content_type, location, analytics_photo1, analytics_photo2, analytics_photo3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [req.creatorId, creatorHandle, audienceAgeRange, audienceDemography, audienceGender, totalReach, contentType, location, analyticsPhoto1Path, analyticsPhoto2Path, analyticsPhoto3Path]
    );

    res.status(201).json({
      message: "Creator details submitted successfully!",
      creatorDetail: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting creator details." });
  }
});


module.exports = router;


module.exports = router;


