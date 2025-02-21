import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./ViewMatchCreator.css"; // Include the stylesheet
import blueHand from "./pic/blue_hand.png";

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

  const handleHireRequest = async (creatorId) => {
    const campaignId = location.state.campaignId;
    const brandId = JSON.parse(localStorage.getItem("userSession"))?.id;
    const token = JSON.parse(localStorage.getItem("userSession"))?.token;
  
    if (!brandId || !campaignId || !creatorId) {
      alert("Missing required data. Please refresh and try again.");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5001/api/brands/hire-creator/${brandId}/campaigns/${campaignId}/hire/${creatorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
  
      alert("Hiring request sent successfully!");
      navigate("/brand");
    } catch (error) {
      console.error("Error sending hire request:", error);
      alert(error.message || "Failed to send hire request.");
    }
  };
  
  const handleLogout = () => {
    // Clear user session (from localStorage or context)
    localStorage.removeItem("userSession");
  
    // Redirect to login page
    navigate("/login/brand");
  };

  return (

    <div className="bg-light">

<div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link to="/brand" className="d-inline-flex link-body-emphasis text-decoration-none font-weight-light">
              <img src={blueHand} alt="TinyTies" width="40" height="40" />
            </Link>
          </div>
    
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/brand" className="nav-link px-2 link-secondary">Home</Link></li>
            <li><Link to="/view-influencer" className="nav-link px-2">Creators</Link></li>
            <li><Link to="/brand-campaigns" className="nav-link px-2">Campaign</Link></li>
            <li><Link to="/brand-campaign" className="nav-link px-2">New Campaign</Link></li>
            <li><Link to="/brand/update" className="nav-link px-2">Update</Link></li>
          </ul>
    
          <div className="col-md-3 text-end">
            <Link to="/login/brand"><button type="button" className="btn btn-primary me-2 rounded-pill" onClick={handleLogout}>Log Out</button></Link>
          </div>
        </header>
      </div>
    <div className="container">
      <h1 className="text-primary fw-bold mb-5">Matched Creators</h1>
      <div className="card-grid">
        {creators.length > 0 ? (
          creators.map((creator) => (
            <div className="creator-card" key={creator.creator_id}>
              <div className="card-image">
                <img
                  src={`http://localhost:5001/${creator.analytics_photo1}`}
                  alt={`${creator.creator_name}`}
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

              <div className="hire-button-container">
                <button className="btn btn-primary btn-rounded-pill" onClick={() => handleHireRequest(creator.creator_id)}>Hire</button>
              </div>
            </div>
          ))
        ) : (
          <p>No creators matched the criteria. Try adjusting your campaign details.</p>
        )}
      </div>
    </div>

    <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="col-md-4 mb-0 text-body-secondary">© TinyTies</p>
  
      <Link to="/brand" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src={blueHand} width="40" height="40" />
      </Link>
  
      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item"><Link to="/brand" class="nav-link px-2 text-body-secondary">Home</Link></li>
        <li className="nav-item"><a href="https://github.com/mrpravin21/brand" target="_blank" class="nav-link px-2 text-body-primary">GitHub</a></li>
        <li className="nav-item"><a href="https://www.instagram.com/_tinyties/" target="_blank" class="nav-link px-2 text-body-primary">Instagram</a></li>
      </ul>
    </footer>
    </div>
    </div>
  );
};

export default ViewMatchCreator;

