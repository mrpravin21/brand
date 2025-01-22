import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewMatchCreator.css"; // Include the stylesheet

const ViewMatchCreator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { campaignId, matchedCreators: initialMatchedCreators } = location.state || {};
  const [creators, setCreators] = useState(initialMatchedCreators || []);
  const [loading, setLoading] = useState(!initialMatchedCreators);

  useEffect(() => {
    if (!campaignId) {
      alert("Campaign ID is missing!");
      navigate("/request-creator");
      return;
    }

    const token = JSON.parse(localStorage.getItem("userSession"))?.token;
    if (!token) {
      alert("You are not authorized to view this page. Please log in.");
      navigate("/login/brand");
      return;
    }

    if (!initialMatchedCreators) {
      // Fetch matched creators from backend
      fetch(`http://localhost:5001/api/brands/brand-campaign/${campaignId}/match-creators`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch data");
          return response.json();
        })
        .then((data) => {
          setCreators(data.matchedCreators || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching matched creators:", error);
          alert("Failed to fetch matched creators. Please try again later.");
          setLoading(false);
        });
    }
  }, [campaignId, navigate, initialMatchedCreators]);

  if (loading) return <div className="loading-container">Loading...</div>;

  return (
    <div className="container">
      <h1 className="text-primary fw-bold">Matched Creators</h1>
      <div className="card-grid">
        {creators.length > 0 ? (
          creators.map((creator) => (
            <div className="card shadow" key={creator.creator_id}>
              <div className="card-image">
              <img
                  src={`http://localhost:5001/${creator.analytics_photo1}`}
                  alt={`${creator.creator_name}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                  className="rounded"
                />
              </div>
              <div className="card-body text-center">
                <h3 className="card-title fw-bold text-primary">{creator.creator_name}</h3>
                <p className="card-category text-muted mb-2">{creator.category}</p>
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
          <p>No creators matched the criteria. Try adjusting your campaign details.</p>
        )}
      </div>
    </div>
  );
};

export default ViewMatchCreator;

