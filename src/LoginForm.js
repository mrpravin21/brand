import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the formData object to log
    const formData = { email, password };
    console.log('Form Data:', formData); // Logging the form data for debugging

    // Remove backend fetch call, just logging formData
    alert("Form submitted! Check the console for form data.");

    // Optionally, you can navigate to a different page without actual login
    // navigate('/dashboard'); // Uncomment this if you want to navigate to the dashboard after "logging in"
  };

  return (
    <div className="bg-light" style={{ overflowX: "hidden" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand text-primary fw-bold" to="/">
            🔗 Tinyties
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="d-flex align-items-center min-vh-100"
        style={{
          background: "linear-gradient(135deg, #eaf3fc, #fdeef1)",
          color: "#333",
        }}
      >
        <div className="container text-center text-md-start">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">
                Welcome Back <span className="text-primary">Tinyties</span>!
              </h1>
              <p className="lead">Sign in to start your journey.</p>
            </div>

            {/* Login Form Box on the Right */}
            <div className="col-md-6">
              <div
                className="card shadow-lg border-0"
                style={{
                  backgroundColor: "#ffffff",
                  padding: "60px",
                  borderRadius: "25px",  // Rounded corners
                  boxShadow: "0 10px 20px rgba(242, 216, 216, 0.1)", // Shadow effect
                }}
              >
                <h3 className="text-center text-primary mb-4">Login</h3>
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
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-pill shadow-lg"
                      style={{
                        background: "#1976D2", // Trustworthy Blue
                        color: "#fff",
                      }}
                    >
                      Log In
                    </button>
                    <Link to="/forgot-password" className="text-primary">
                      Forgot Password?
                    </Link>
                  </div>
                </form>

                {/* Register Options */}
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

      {/* Footer */}
      <footer
        className="py-4"
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

export default LoginForm;
