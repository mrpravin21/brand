const express = require('express');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../db');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.SESSION_SECRET;


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or invalid." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.brandId = decoded.id;
    console.log("Token verified, brandId:", req.brandId);  // Assuming this will correctly set the brandId in the request
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// Middleware to check if the email exists
async function checkEmailExists(email) {
  try {
    const result = await pool.query('SELECT * FROM brands WHERE email = $1', [email]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    throw new Error('Error checking email existence.');
  }
}

// Route to register a brand
router.post('/register', async (req, res) => {
  const { brandName, ownerName, startDate, category, panNumber, email, password, aboutBrand } = req.body;

  // Validate required fields
  if (!brandName || !ownerName || !startDate || !category || !panNumber || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the email already exists
    const existingBrand = await checkEmailExists(email);
    if (existingBrand) {
      return res.status(409).json({ message: "Email already exists." });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert the brand into the database with the hashed password
    const result = await pool.query(
      'INSERT INTO brands (brand_name, owner_name, start_date, category, pan_number, email, password, about_brand) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [brandName, ownerName, startDate, category, panNumber, email, hashedPassword, aboutBrand]
    );

    res.status(201).json({
      message: "Brand registered successfully!",
      brand: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({ message: "Email already exists." });
    }
    res.status(500).json({ message: "Error registering brand." });
  }
});

// POST route for logging in a brand
router.post('/login/brand', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const brand = await checkEmailExists(email);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, brand.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ id: brand.id, email: brand.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: "Login successful!",
      token,
      user: { id: brand.id, email: brand.email, brandName: brand.brand_name },
    });
  } catch (error) {
    console.error('Error logging in brand:', error);
    res.status(500).json({ message: "Error logging in." });
  }
});

// POST route to create a campaign and match creators
// POST route to create a campaign (brand submits campaign details)
router.post('/brand-campaign', verifyToken, async (req, res) => {
  const { campaignName, targetAgeGroup, targetGender, category, budget, description, targetLocation } = req.body;
  const brandId = req.brandId;

  try {
    // Insert campaign into the campaigns table without associating creators
    const result = await pool.query(
      'INSERT INTO campaigns (brand_id, campaign_name, target_age_group, target_gender, category, budget, description, target_location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING campaign_id',
      [brandId, campaignName, targetAgeGroup, targetGender, category, budget, description, targetLocation]
    );

    // Send only the campaignId in the response
    res.status(200).json({
      message: "Campaign created successfully!",
      campaignId: result.rows[0].campaign_id,
    });
  } catch (error) {
    console.error("Error inserting campaign:", error);
    res.status(500).json({ message: "Error creating campaign." });
  }
});

// Route to match creators for a given campaign
router.get("/brand-campaign/:campaignId/match-creators", verifyToken, async (req, res) => {
  const { campaignId } = req.params;

  try {
    // Fetch campaign details from the database
    const campaignResult = await pool.query(
      "SELECT target_age_group, target_gender, target_location, category FROM campaigns WHERE campaign_id = $1",
      [campaignId]
    );
    const campaign = campaignResult.rows[0];

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found." });
    }

    const { target_age_group, target_gender, target_location, category } = campaign;

    // Query to find matching creators
    const creatorsResult = await pool.query(
      `SELECT c.id AS creator_id, c.creator_name, c.email, cd.audience_age_range, 
              cd.audience_gender, cd.location, c.category, cd.total_reach, c.analytics_photo1
       FROM creators c
       JOIN creator_details cd ON c.id = cd.creator_id
       WHERE c.category = $1
         AND cd.audience_age_range = $2
         AND cd.audience_gender = $3
         AND cd.location = $4`,
      [category, target_age_group, target_gender, target_location]
    );

    const matchedCreators = creatorsResult.rows;

    res.status(200).json({ matchedCreators });
  } catch (error) {
    console.error("Error matching creators:", error);
    res.status(500).json({ message: "Error matching creators." });
  }
});




module.exports = router;

