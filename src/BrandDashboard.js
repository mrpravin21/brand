import React from "react";
import { useNavigate, Link } from "react-router-dom";

const BrandDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (from localStorage or context)
    localStorage.removeItem("userSession");

    // Redirect to login page
    navigate("/login/brand");
  };

  return (
    <div className="bg-light" style={{ minHeight: "100vh", overflowX: "hidden" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand text-primary fw-bold" to="/">
            🔗 Tinyties
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-primary btn-lg rounded-pill shadow-lg"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="container text-center py-5"
        style={{
          background: "linear-gradient(135deg, #eaf3fc, #fdeef1)",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h1 className="fw-bold text-primary mb-3">Welcome Back, [Brand Name]!</h1>
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
                  to="/past-projects"
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
                  to="/create-campaign"
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
      <footer
        className="py-4 mt-5"
        style={{
          backgroundColor: "#333",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p className="mb-2">&copy; 2025 Tinyties | All Rights Reserved</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link to="/privacy" className="text-decoration-none text-light">
                Privacy Policy
              </Link>
            </li>
            <li className="list-inline-item">|</li>
            <li className="list-inline-item">
              <Link to="/terms" className="text-decoration-none text-light">
                Terms of Service
              </Link>
            </li>
            <li className="list-inline-item">|</li>
            <li className="list-inline-item">
              <Link to="/contact" className="text-decoration-none text-light">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default BrandDashboard;

