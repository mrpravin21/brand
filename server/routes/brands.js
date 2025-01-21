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



module.exports = router;

