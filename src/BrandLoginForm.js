import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import blueHand from "./pic/blue_hand.png";

let currentBrand;

const BrandLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/api/brands/login/brand", { email, password });
      const { user, token } = response.data;

      // Store user details securely
      localStorage.setItem("userSession", JSON.stringify({...user, token, role: "brand"}));

      //alert(`Welcome back, ${user.brandName || "Brand"}!`);
      currentBrand = user.brandName;
      alert(`Welcome back, ${currentBrand}!`)
      
      navigate("/brand"); // Redirect to the brand dashboard
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-light" style={{ overflowX: "hidden" }}>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none font-weight-light">
              <img src={blueHand} alt="TinyTies" width="40" height="40" />
            </Link>
          </div>
    
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
            <li><Link to="/register/brand" className="nav-link px-2">Brand</Link></li>
            <li><Link to="/register/creator" className="nav-link px-2">Creator</Link></li>
          </ul>
    
          <div className="col-md-3 text-end">
            <Link to="/login/brand"><button type="button" className="btn btn-primary me-2 rounded-pill">Brand</button></Link>
            <Link to="/login/creator"><button type="button" className="btn btn-primary me-2 rounded-pill">Creator</button></Link>
          </div>
        </header>
      </div>

      <div className="d-flex align-items-center">
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

      <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="col-md-4 mb-0 text-body-secondary">© TinyTies</p>
  
      <Link to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src={blueHand} width="40" height="40" />
      </Link>
  
      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item"><Link to="/" class="nav-link px-2 text-body-secondary">Home</Link></li>
        <li className="nav-item"><a href="https://github.com/mrpravin21/brand" target="_blank" class="nav-link px-2 text-body-primary">GitHub</a></li>
        <li className="nav-item"><a href="https://www.instagram.com/_tinyties/" target="_blank" class="nav-link px-2 text-body-primary">Instagram</a></li>
      </ul>
    </footer>
    </div>
    </div>
  );
};

export default BrandLoginForm;
export { currentBrand };
