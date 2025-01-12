const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for frontend-backend communication

// Mock influencer data
const influencers = [
  {
    id: 1,
    name: "Anusha F.",
    age: 23,
    qualification: "B.S Engineering",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    name: "Sana T.",
    age: 28,
    qualification: "MBBS",
    bio: "Passionate about medical research and helping others.",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    name: "Sadia J.",
    age: 21,
    qualification: "B.S Engineering",
    bio: "Focused on innovation and technology.",
    image: "https://via.placeholder.com/200"
  }
];

// API Endpoint
app.get("/api/influencers", (req, res) => {
  res.json(influencers);
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
