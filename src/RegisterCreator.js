import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import blueHand from "./pic/blue_hand.png";

const RegisterCreator = () => {
  const [creatorName, setCreatorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [contentType, setContentType] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [password, setPassword] = useState("");
  //const [successMessage, setSuccessMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [analyticsPhoto1, setAnalyticsPhoto1] = useState(null);
  const [analyticsPhoto2, setAnalyticsPhoto2] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Real-time validation for email
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Real-time password validation
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  // Handle real-time validation for all fields
  const handleFieldChange = (e) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };

    switch (id) {
      case "email":
        if (!validateEmail(value)) {
          newErrors.email = "Please enter a valid email address.";
        } else {
          delete newErrors.email;
        }
        setEmail(value);
        break;
      case "password":
        if (!validatePassword(value)) {
          newErrors.password = "Password must be at least 8 characters long, with 1 number, 1 uppercase, and 1 lowercase letter.";
        } else {
          delete newErrors.password;
        }
        setPassword(value);
        break;
      case "confirmPassword":
        if (value !== password) {
          newErrors.confirmPassword = "Passwords do not match.";
        } else {
          delete newErrors.confirmPassword;
        }
        setConfirmPassword(value);
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for any validation errors before submitting
    if (Object.keys(errors).length > 0) {
      alert("Please fix the errors before submitting.");
      return;
    }

    // Proceed with form submission
    const formData = new FormData();
    formData.append("creatorName", creatorName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("category", category);
    formData.append("contentType", contentType);
    formData.append("socialLinks", socialLinks);
    formData.append("password", password);
    formData.append("analyticsPhoto1", analyticsPhoto1);
    formData.append("analyticsPhoto2", analyticsPhoto2);

    fetch("http://localhost:5001/api/creators/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          alert(data.message);
          //setSuccessMessage("Brand registered successfully!");
          navigate("/login/creator");
        } else {
          alert("Registration failed.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while registering.");
      });
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

      <div className="d-flex align-items-center mt-5">
        <div className="container text-center text-md-start">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">
                Creator Registration <span className="text-primary">Tinyties</span>
              </h1>
              <p className="lead">Join as a creator and collaborate with amazing brands.</p>
            </div>

            <div className="col-md-6">
              <div className="card shadow-lg border-0" style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "15px", boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)", marginTop: "-50px", maxWidth: "700px" }}>
                <h3 className="text-center text-primary mb-4">Creator Registration</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="creatorName" className="form-label">Creator Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="creatorName"
                          placeholder="Enter your name"
                          value={creatorName}
                          onChange={(e) => setCreatorName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="socialLinks" className="form-label">Social Media Links</label>
                        <input
                          type="text"
                          className="form-control"
                          id="socialLinks"
                          placeholder="Enter your social media links"
                          value={socialLinks}
                          onChange={(e) => setSocialLinks(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">Creator Category</label>
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
                      <div className="mb-3">
                        <label htmlFor="contentType" className="form-label">Content Type</label>
                        <input
                          type="text"
                          className="form-control"
                          id="contentType"
                          placeholder="e.g., Videos, Blogs, Reels"
                          value={contentType}
                          onChange={(e) => setContentType(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                   
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={handleFieldChange}
                          required
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
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
                          onChange={handleFieldChange}
                          required
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={handleFieldChange}
                          required
                        />
                        {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="analyticsPhoto1" className="form-label">Upload Analytics Photo 1</label>
                    <input
                      type="file"
                      className="form-control"
                      id="analyticsPhoto1"
                      onChange={(e) => setAnalyticsPhoto1(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="analyticsPhoto2" className="form-label">Upload Analytics Photo 2</label>
                    <input
                      type="file"
                      className="form-control"
                      id="analyticsPhoto2"
                      onChange={(e) => setAnalyticsPhoto2(e.target.files[0])}
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">Register</button>
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
        <li className="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
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

export default RegisterCreator;
