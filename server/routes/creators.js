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


router.get("/hire-creator/:creatorId/hiring-requests", async (req, res) => {
  const { creatorId } = req.params;

  try {
    const result = await pool.query(
      "SELECT hr.id, hr.campaign_id, hr.brand_id, hr.status, c.campaign_name, b.brand_name, c.budget, c.category AS campaign_category, c.target_location AS campaign_location, c.target_age_group, c.target_gender FROM hiring_requests hr JOIN campaigns c ON hr.campaign_id = c.campaign_id JOIN brands b ON hr.brand_id = b.id WHERE hr.creator_id = $1 AND hr.status = 'pending'",
      [creatorId]
    );

    res.json({ hiringRequests: result.rows });
  } catch (error) {
    console.error("Error fetching hiring requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/hire-creator/:creatorId/hiring-requests/:requestId/accept", async (req, res) => {
  const { creatorId, requestId } = req.params;
  const { campaignId, brandId } = req.body;


  console.log("creatorId:", creatorId);
  console.log("requestId:", requestId);
  console.log("campaignId:", campaignId);
  console.log("brandId:", brandId);
  // Validate requestId, campaignId, brandId
  if (!requestId || !campaignId || !brandId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await pool.query("BEGIN"); // Start transaction

    // Insert into hired_creators table
    await pool.query(
      `INSERT INTO hired_creators (campaign_id, brand_id, creator_id) 
       VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
      [campaignId, brandId, creatorId]
    );

    // Update hiring request status to 'accepted'
    await pool.query(
      `UPDATE hiring_requests SET status = 'accepted' 
       WHERE id = $1 AND creator_id = $2`,
      [requestId, creatorId]
    );

    await pool.query("COMMIT"); // Commit transaction

    res.status(200).json({ message: "Creator successfully hired!" });
  } catch (error) {
    await pool.query("ROLLBACK"); // Rollback on error
    console.error("Error accepting hire:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




router.post("hire-creator/:creatorId/hiring-requests/:requestId/reject", async (req, res) => {
  const { creatorId, requestId } = req.params;

  try {
    await pool.query(
      `UPDATE hiring_requests SET status = 'rejected' 
       WHERE id = $1 AND creator_id = $2`,
      [requestId, creatorId]
    );

    res.status(200).json({ message: "Hiring request rejected" });
  } catch (error) {
    console.error("Error rejecting hire:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update/:creatorId", verifyToken, async (req, res) => {
  const { creatorName, phoneNumber, email, password } = req.body;
  const { creatorId } = req.params;
  // Get brand ID from token

  try {
      // Check if email is already in use
      const emailExists = await pool.query(
          "SELECT id FROM creators WHERE email = $1 AND id <> $2",
          [email, creatorId]
      );

      if (emailExists.rowCount > 0) {
          return res.status(400).json({ message: "Email is already in use by another creator." });
      }

      // Hash password if updating
      let hashedPassword = null;
      if (password) {
          hashedPassword = await bcrypt.hash(password, 10);
      }

      // Update brand details
      await pool.query(
          `UPDATE creators 
           SET creator_name = $1, phone = $2, email = $3,  password = COALESCE($4, password) 
           WHERE id = $5`,
          [creatorName, phoneNumber, email, hashedPassword, creatorId]
      );

      res.json({ message: "Creator details updated successfully!" });
  } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ message: "Error updating creator details." });
  }
});


router.get("/profile/:creatorId", async (req, res) => {
  try {
      const { creatorId } = req.params; // Extract brandId from URL parameter
      console.log("Fetching profile for creator ID:", creatorId);

      if (!creatorId) {
          return res.status(400).json({ message: "creator ID is required." });
      }

      const creator = await pool.query("SELECT * FROM creators WHERE id = $1", [creatorId]);

      if (creator.rows.length === 0) {
          return res.status(404).json({ message: "creator not found." });
      }

      res.json(creator.rows[0]);
  } catch (error) {
      console.error("Error fetching creator profile:", error);
      res.status(500).json({ message: "Server error while fetching creator profile." });
  }
});



module.exports = router;


