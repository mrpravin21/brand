DATABSE KO NAAM Tinyties
CREATE TABLE creators (
  id SERIAL PRIMARY KEY,
  creator_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  category VARCHAR(50),
  social_links TEXT,
  password VARCHAR(255) NOT NULL,
  content_type TEXT,
  analytics_photo1 TEXT,
  analytics_photo2 TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    brand_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    category VARCHAR(255) NOT NULL,
    pan_number VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    about_brand TEXT
);
