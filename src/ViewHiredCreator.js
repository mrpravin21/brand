import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewHiredCreator.css";

const ViewHiredCreator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { campaignId, hiredCreators } = location.state || {};
  console.log("Received Data:", hiredCreators);

  if (!campaignId) {
    alert("Campaign ID is missing!");
    navigate("/campaigns");
    return null;
  }

  return (
    <div className="container">
      <h1 className="text-primary fw-bold">Hired Creators</h1>
      <div className="card-grid">
        {hiredCreators && hiredCreators.length > 0 ? (
          hiredCreators.map((creator) => (
            <div className="creator-card" key={creator.creator_id}>
              <div className="card-image">
                <img
                  src={`http://localhost:5001/${creator.analytics_photo1}`}
                  alt={creator.creator_name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">{creator.creator_name}</h3>
                <p className="card-category">{creator.category}</p>
                <p className="card-text">
                  <strong>Email:</strong> {creator.email}
                  <br />
                  <strong>Audience Age Range:</strong> {creator.audience_age_range}
                  <br />
                  <strong>Audience Gender:</strong> {creator.audience_gender}
                  <br />
                  <strong>Location:</strong> {creator.location}
                  <br />
                  <strong>Total Reach:</strong> {creator.total_reach}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No hired creators found for this campaign.</p>
        )}
      </div>
    </div>
  );
};

export default ViewHiredCreator;
