import React from "react";
import { useNavigate, Link } from "react-router-dom";
import blueHand from "./pic/blue_hand.png";
import { currentCreator } from "./CreatorLoginForm";


const CreatorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (from localStorage or context)
    localStorage.removeItem("userSession");

    // Redirect to login page
    navigate("/login/creator");
  };

  return (
    <div className="bg-light">
      {/* Navbar */}
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link to="/creator" className="d-inline-flex link-body-emphasis text-decoration-none font-weight-light">
              <img src={blueHand} alt="TinyTies" width="40" height="40" />
            </Link>
          </div>
    
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/creator" className="nav-link px-2 link-secondary">Home</Link></li>
            <li><Link to="/hiring-creator" className="nav-link px-2">Requests</Link></li>
            <li><Link to="/creator-detail" className="nav-link px-2">Detail</Link></li>
            <li><Link to="/creator/update" className="nav-link px-2">Update</Link></li>
          </ul>
    
          <div className="col-md-3 text-end">
            <Link to="/login/creator"><button type="button" className="btn btn-primary me-2 rounded-pill" onClick={handleLogout}>Log Out</button></Link>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <div
        className="container text-center py-5"
        style={{
          background: "linear-gradient(135deg, #eaf3fc, #fdeef1)",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h1 className="fw-bold text-primary mb-3">Welcome Back, {currentCreator}!</h1>
        <p className="lead text-dark">Manage your campaigns and connect with influencers seamlessly.</p>
      </div>

      {/* Options Section */}
      <div className="container py-5">
        <div className="row g-4 justify-content-center">

          {/* Your Past Projects */}
          <div className="col-md-4">
            <div
              className="card h-100 shadow-sm border-0 text-center"
              style={{ borderRadius: "15px", backgroundColor: "#f9fafb" }}
            >
              <div className="card-body">
                <i className="bi bi-folder fs-1 text-success mb-3"></i>
                <h5 className="card-title fw-bold">Brand Requests</h5>
                <p className="card-text text-muted">
                  Review the brands willing to hire you for a campaign.
                </p>
                <Link
                  to="/hiring-creator"
                  className="btn btn-success rounded-pill shadow-sm"
                >
                  View Requests
                </Link>
              </div>
            </div>
          </div>

          {/* Creator Detail */}
          <div className="col-md-4">
            <div
              className="card h-100 shadow-sm border-0 text-center"
              style={{ borderRadius: "15px", backgroundColor: "#f9fafb" }}
            >
              <div className="card-body">
                <i className="bi bi-megaphone fs-1 text-danger mb-3"></i>
                <h5 className="card-title fw-bold">Provide Details</h5>
                <p className="card-text text-muted">
                  Launch new campaigns and reach your target audience effectively.
                </p>
                <Link
                  to="/creator-detail"
                  className="btn btn-danger rounded-pill shadow-sm"
                >
                  Give Detail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="col-md-4 mb-0 text-body-secondary">© TinyTies</p>
  
      <Link to="/creator" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src={blueHand} width="40" height="40" />
      </Link>
  
      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item"><Link to="/creator" class="nav-link px-2 text-body-secondary">Home</Link></li>
        <li className="nav-item"><a href="https://github.com/mrpravin21/brand" target="_blank" class="nav-link px-2 text-body-primary">GitHub</a></li>
        <li className="nav-item"><a href="https://www.instagram.com/_tinyties/" target="_blank" class="nav-link px-2 text-body-primary">Instagram</a></li>
      </ul>
    </footer>
    </div>
    </div>
  );
};

export default CreatorDashboard;
