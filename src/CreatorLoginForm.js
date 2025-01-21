import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const CreatorLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages
  
    try {
      const response = await axios.post("/api/creators/login/creator", { email, password });
      const { user, token } = response.data;
  
      // Store user details in localStorage or context
      localStorage.setItem("userSession", JSON.stringify({...user, token, role: "creator"}));
  
      alert(`Welcome back, ${user.creatorName}!`);
      navigate("/hello"); // Redirect to the creator dashboard
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="bg-light" style={{ overflowX: "hidden" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand text-primary fw-bold" to="/">
            🔗 Tinyties
          </Link>
        </div>
      </nav>

      <div className="d-flex align-items-center min-vh-100" style={{ background: "linear-gradient(135deg, #eaf3fc, #fdeef1)", color: "#333" }}>
        <div className="container text-center text-md-start">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">
                Welcome Back <span className="text-primary">Tinyties</span>!
              </h1>
              <p className="lead">Sign in to start your journey.</p>
            </div>

            <div className="col-md-6">
              <div className="card shadow-lg border-0" style={{ backgroundColor: "#ffffff", padding: "60px", borderRadius: "25px" }}>
                <h3 className="text-center text-primary mb-4">Login</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-primary btn-lg rounded-pill shadow-lg">
                      Log In
                    </button>
                    <Link to="/forgot-password" className="text-primary">
                      Forgot Password?
                    </Link>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p>Don't have an account?</p>
                  <Link to="/register/brand" className="btn btn-outline-primary mx-2">
                    Register as Brand
                  </Link>
                  <Link to="/register/creator" className="btn btn-outline-primary mx-2">
                    Register as Creator
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4" style={{ backgroundColor: "#333", color: "#fff", textAlign: "center" }}>
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

export default CreatorLoginForm;

