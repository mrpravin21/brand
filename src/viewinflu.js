import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Viewinflu.css';

const Viewinflu = () => {
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5001/api/influencers')
      .then(response => setInfluencers(response.data))
      .catch(error => console.log('Error fetching influencers:', error));
  }, []);

  return (
    <div className="viewinflu-container">
      <h1 className="viewinflu-title">Our Influencers</h1>
      <div className="viewinflu-grid">
        {influencers.map((influencer, index) => (
          <div className="viewinflu-card" key={index}>
            <img
              src={influencer.image}
              alt={influencer.name}
              className="viewinflu-img"
            />
            <div className="viewinflu-details">
              <h2>{influencer.name}</h2>
              <p>Age: {influencer.age}</p>
              <p>Qualification: {influencer.qualification}</p>
              <p>{influencer.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Viewinflu;
