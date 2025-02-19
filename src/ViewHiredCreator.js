import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./ViewHiredCreator.css";
import blueHand from "./pic/blue_hand.png";

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
            <li><Link to="/" className="nav-link px-2">Update</Link></li>
          </ul>
    
          <div className="col-md-3 text-end">
            <Link to="/login/brand"><button type="button" className="btn btn-primary me-2 rounded-pill" onClick={handleLogout}>Log Out</button></Link>
          </div>
        </header>
      </div>
    <div className="container">
      <h1 className="text-primary fw-bold mb-3">Hired Creator</h1>
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
    <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="col-md-4 mb-0 text-body-secondary">© TinyTies</p>
  
      <Link to="/brand" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src={blueHand} width="40" height="40" />
      </Link>
  
      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item"><Link to="/brand" class="nav-link px-2 text-body-secondary">Home</Link></li>
        <li className="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Features</a></li>
        <li className="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Pricing</a></li>
        <li className="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">FAQs</a></li>
        <li className="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About</a></li>
      </ul>
    </footer>
    </div>
    </div>
  );
};

export default ViewHiredCreator;
