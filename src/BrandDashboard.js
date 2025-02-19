import React from "react";
import { useNavigate, Link } from "react-router-dom";
import blueHand from "./pic/blue_hand.png";
import { currentBrand } from "./BrandLoginForm";

const BrandDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (from localStorage or context)
    localStorage.removeItem("userSession");

    // Redirect to login page
    navigate("/login/brand");
  };

  return (
    <div className="bg-light">
      {/* Navbar */}
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

      {/* Hero Section */}
      <div
        className="container text-center py-5"
        style={{
          background: "linear-gradient(135deg, #eaf3fc, #fdeef1)",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h1 className="fw-bold text-primary mb-3">Welcome Back, {currentBrand}!</h1>
        <p className="lead text-dark">Manage your campaigns and connect with influencers seamlessly.</p>
      </div>

      {/* Options Section */}
      <div className="container py-5">
        <div className="row g-4">
          {/* View Creator */}
          <div className="col-md-4">
            <div
              className="card h-100 shadow-sm border-0 text-center"
              style={{ borderRadius: "15px", backgroundColor: "#f9fafb" }}
            >
              <div className="card-body">
                <i className="bi bi-people fs-1 text-primary mb-3"></i>
                <h5 className="card-title fw-bold">View Creators</h5>
                <p className="card-text text-muted">
                  Explore and connect with influencers to match your brand’s needs.
                </p>
                <Link
                  to="/view-influencer"
                  className="btn btn-primary rounded-pill shadow-sm"
                >
                  Go to Creators
                </Link>
              </div>
            </div>
          </div>

          {/* Your Past Projects */}
          <div className="col-md-4">
            <div
              className="card h-100 shadow-sm border-0 text-center"
              style={{ borderRadius: "15px", backgroundColor: "#f9fafb" }}
            >
              <div className="card-body">
                <i className="bi bi-folder fs-1 text-success mb-3"></i>
                <h5 className="card-title fw-bold">Your Past Projects</h5>
                <p className="card-text text-muted">
                  Review your previous campaigns and measure their success.
                </p>
                <Link
                  to="/brand-campaigns"
                  className="btn btn-success rounded-pill shadow-sm"
                >
                  View Projects
                </Link>
              </div>
            </div>
          </div>

          {/* Create Campaign */}
          <div className="col-md-4">
            <div
              className="card h-100 shadow-sm border-0 text-center"
              style={{ borderRadius: "15px", backgroundColor: "#f9fafb" }}
            >
              <div className="card-body">
                <i className="bi bi-megaphone fs-1 text-danger mb-3"></i>
                <h5 className="card-title fw-bold">Create Campaign</h5>
                <p className="card-text text-muted">
                  Launch new campaigns and reach your target audience effectively.
                </p>
                <Link
                  to="/brand-campaign"
                  className="btn btn-danger rounded-pill shadow-sm"
                >
                  Start Now
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

export default BrandDashboard;

