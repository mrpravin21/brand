import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import blueHand from "./pic/blue_hand.png";

const RegisterBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [category, setCategory] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aboutBrand, setAboutBrand] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (!brandName || !ownerName || !startDate || !category || !panNumber || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    const formData = {
      brandName,
      ownerName,
      startDate,
      category,
      panNumber,
      email,
      password,
      aboutBrand,
    };

    try {
      const response = await fetch("http://localhost:5001/api/brands/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Brand registered successfully!");
        setErrorMessage(""); // Clear error if success
        setTimeout(() => navigate("/login/brand"), 2000); // Redirect to login page after a brief delay
      } else {
        setErrorMessage(data.message || "An error occurred.");
        setSuccessMessage(""); // Clear success message on error
      }
    } catch (error) {
      setErrorMessage("An error occurred while registering the brand.");
      setSuccessMessage(""); // Clear success message on error
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
            <li><Link to="/" className="nav-link px-2">Features</Link></li>
            <li><a href="#" className="nav-link px-2">Pricing</a></li>
            <li><a href="#" className="nav-link px-2">FAQs</a></li>
            <li><a href="#" className="nav-link px-2">About</a></li>
          </ul>
          <div className="col-md-3 text-end">
            <Link to="/login/brand"><button type="button" className="btn btn-primary me-2 rounded-pill">Brand</button></Link>
            <Link to="/login/creator"><button type="button" className="btn btn-primary me-2 rounded-pill">Creator</button></Link>
          </div>
        </header>
      </div>

      <div className="d-flex align-items-center min-vh-100">
        <div className="container text-center text-md-start">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">
                Brand Registration <span className="text-primary">Tinyties</span>
              </h1>
              <p className="lead">Create an account to collaborate with the right creators.</p>
            </div>

            <div className="col-md-6">
              <div
                className="card shadow-lg border-0"
                style={{
                  backgroundColor: "#ffffff",
                  padding: "40px",
                  borderRadius: "15px",
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  marginTop: "-50px",
                  maxWidth: "700px",
                  minHeight: "700px",
                }}
              >
                <h3 className="text-center text-primary mb-4">Brand Registration</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="brandName" className="form-label">Brand Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="brandName"
                          placeholder="Enter your brand name"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="ownerName" className="form-label">Brand Owner's Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="ownerName"
                          placeholder="Enter the owner's name"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">Brand Start Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="startDate"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">Business Category</label>
                        <select
                          className="form-select"
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        >
              
                          <option value="">Select Category</option>
                          <option value="Fashion">Fashion</option>
                          <option value="Riding">Riding</option>
                          <option value="Food and Beverage">Food & Beverage</option>
                          <option value="Lifestyle">Lifestyle</option>
                          <option value="Technology">Technology</option>
                          <option value="Gaming">Gaming</option>
                          <option value="Beauty">Beauty</option>
                          <option value="Fitness">Fitness</option>
                          <option value="Organic">Organic</option>
                          <option value="Travel">Travel</option>
                          <option value="Feel Good">Feel Good</option>
                          

                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="panNumber" className="form-label">PAN Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="panNumber"
                          placeholder="Enter your PAN number"
                          value={panNumber}
                          onChange={(e) => setPanNumber(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
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
                        <label htmlFor="password" className="form-label">Password</label>
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

                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="aboutBrand" className="form-label">About the Brand</label>
                    <textarea
                      className="form-control"
                      id="aboutBrand"
                      rows="4"
                      placeholder="Tell us more about your brand"
                      value={aboutBrand}
                      onChange={(e) => setAboutBrand(e.target.value)}
                    />
                  </div>

                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-pill w-100"
                    >
                      Register Brand
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">© 2025 Company, Inc</p>
          <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <img src={blueHand} width="40" height="40" />
          </a>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default RegisterBrand;
