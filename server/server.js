const express = require("express");
const cors = require("cors"); // Import CORS package
const multer = require("multer");
const { Client } = require("pg");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS for all origins (or restrict it as needed)
app.use(cors({
  origin: "http://localhost:3000", // Allow requests only from React (localhost:3000)
  methods: ["GET", "POST", "PUT", "DELETE"], // Methods to allow
  allowedHeaders: ["Content-Type", "Authorization"] // Headers to allow
}));

// PostgreSQL Database Connection Details
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client.connect();

// Set up Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json()); // Parse JSON requests

// Route for handling the form submission
app.post("/register-creator", upload.fields([
  { name: "analyticsPhoto1", maxCount: 1 },
  { name: "analyticsPhoto2", maxCount: 1 }
]), async (req, res) => {
  const { name, address, socialMedia, audienceCategory, contentType, email, phone } = req.body;
  const analyticsPhoto1 = req.files.analyticsPhoto1 ? req.files.analyticsPhoto1[0].buffer : null;
  const analyticsPhoto2 = req.files.analyticsPhoto2 ? req.files.analyticsPhoto2[0].buffer : null;

  // SQL Query to insert creator data into the PostgreSQL table
  const query = `
    INSERT INTO creators 
    (name, address, social_media, audience_category, content_type, 
    analytics_photo1, analytics_photo2, email, phone)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id
  `;
  const values = [
    name, address, socialMedia, audienceCategory, contentType,
    analyticsPhoto1, analyticsPhoto2, email, phone
  ];

  try {
    const result = await client.query(query, values);
    res.status(200).json({ message: "Creator registered successfully", id: result.rows[0].id });
  } catch (err) {
    console.error("Error inserting data into database:", err);
    res.status(500).json({ message: "Error registering creator" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
