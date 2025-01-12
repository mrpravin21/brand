import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BrandRegistration = () => {
  const [brandName, setBrandName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [category, setCategory] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aboutBrand, setAboutBrand] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!brandName || !ownerName || !startDate || !category || !panNumber || !email || !password) {
      alert("All fields are required.");
      return;
    }

    // Prepare form data to be sent to the backend
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

    // TODO: Implement the backend call here
    // Example: Using fetch to send formData to the backend
    /*
    fetch('/api/register/brand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          navigate("/login");  // Redirect to login on success
        } else {
          alert("Registration failed: " + data.message);  // Show error message
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
    */
  };

  return (
    <div className="bg-light" style={{ overflowX: "hidden" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container">
          <a className="navbar-brand text-primary fw-bold" href="/">
            🔗 Tinyties
          </a>
        </div>
      </nav>

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
                          style={{
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "12px",
                          }}
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
                          style={{
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "12px",
                          }}
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
                          style={{
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "12px",
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">Business Category</label>
                        <input
                          type="text"
                          className="form-control"
                          id="category"
                          placeholder="Enter your business category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                          style={{
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "12px",
                          }}
                        />
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
                          style={{
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "12px",
                          }}
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
                          style={{
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "12px",
                          }}
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
                          style={{
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "12px",
                          }}
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
                          style={{
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "12px",
                          }}
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
                      required
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        padding: "12px",
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-pill shadow-lg"
                      style={{
                        background: "#1976D2",
                        color: "#fff",
                      }}
                    >
                      Register as Brand
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4" style={{ backgroundColor: "#333", color: "#fff", textAlign: "center" }}>
        <div className="container">
          <p>© 2025 Tinyties. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BrandRegistration;
