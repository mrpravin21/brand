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
CREATE TABLE creator_details (
  id SERIAL PRIMARY KEY,
  creator_id INT NOT NULL,
  creator_handle VARCHAR(255) NOT NULL,
  audience_age_range VARCHAR(50) NOT NULL,
  audience_demography TEXT NOT NULL,
  audience_gender VARCHAR(20) NOT NULL,
  total_reach INT NOT NULL,
  content_type VARCHAR(50),
  location VARCHAR(100) NOT NULL,
  analytics_photo1 TEXT NOT NULL,
  analytics_photo2 TEXT NOT NULL,
  analytics_photo3 TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES creators(id) ON DELETE CASCADE
);
CREATE TABLE campaigns (
    campaign_id SERIAL PRIMARY KEY,
    brand_id INT NOT NULL,
    campaign_name VARCHAR(255) NOT NULL,
    target_age_group VARCHAR(20) NOT NULL,
    target_gender VARCHAR(10) NOT NULL,
    category VARCHAR(50) NOT NULL,
    budget INT NOT NULL,
    target_location VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);
CREATE TABLE hiring_requests (
  id SERIAL PRIMARY KEY,
  campaign_id INT NOT NULL,
  brand_id INT NOT NULL,
  creator_id INT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id) ON DELETE CASCADE,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
  FOREIGN KEY (creator_id) REFERENCES creators(id) ON DELETE CASCADE,
  UNIQUE (campaign_id, creator_id)
);
CREATE TABLE hired_creators (
  id SERIAL PRIMARY KEY,
  campaign_id INT NOT NULL,
  brand_id INT NOT NULL,
  creator_id INT NOT NULL,
  hired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id) ON DELETE CASCADE,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
  FOREIGN KEY (creator_id) REFERENCES creators(id) ON DELETE CASCADE,
  UNIQUE (campaign_id, creator_id)
);