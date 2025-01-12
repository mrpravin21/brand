import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatorRegistration = () => {
  const [creatorName, setCreatorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [analyticsPhoto1, setAnalyticsPhoto1] = useState(null);
  const [analyticsPhoto2, setAnalyticsPhoto2] = useState(null);
  const [contentType, setContentType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!creatorName || !email || !phone || !category || !socialLinks || !password || !contentType || !analyticsPhoto1 || !analyticsPhoto2) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare the data to be sent to the backend
    const formData = new FormData();
    formData.append("creatorName", creatorName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("category", category);
    formData.append("socialLinks", socialLinks);
    formData.append("password", password);
    formData.append("contentType", contentType);
    formData.append("analyticsPhoto1", analyticsPhoto1);
    formData.append("analyticsPhoto2", analyticsPhoto2);

    // TODO: Implement backend API call to register creator
    // Use the following code template for the API call:
    /*
    fetch("/api/register/creator", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Registration successful!");
          navigate("/login");
        } else {
          alert("Registration failed: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while registering. Please try again.");
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

      <div className="d-flex align-items-center min-vh-100" style={{ background: "linear-gradient(135deg, #eaf3fc, #fdeef1)", color: "#333" }}>
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
                        <input type="text" className="form-control" id="creatorName" placeholder="Enter your name" value={creatorName} onChange={(e) => setCreatorName(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="socialLinks" className="form-label">Social Media Links</label>
                        <input type="text" className="form-control" id="socialLinks" placeholder="Enter your social media links" value={socialLinks} onChange={(e) => setSocialLinks(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">Creator Category</label>
                        <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                          <option value="">Select Category</option>
                          <option value="Lifestyle">Lifestyle</option>
                          <option value="Tech">Tech</option>
                          <option value="Food">Food</option>
                          <option value="Travel">Travel</option>
                          <option value="Fitness">Fitness</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="contentType" className="form-label">Content Type</label>
                        <input type="text" className="form-control" id="contentType" placeholder="e.g., Videos, Blogs, Reels" value={contentType} onChange={(e) => setContentType(e.target.value)} required />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="analyticsPhoto1" className="form-label">Upload Analytics Screenshot 1</label>
                        <input type="file" className="form-control" id="analyticsPhoto1" accept="image/*" onChange={(e) => setAnalyticsPhoto1(e.target.files[0])} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="analyticsPhoto2" className="form-label">Upload Analytics Screenshot 2</label>
                        <input type="file" className="form-control" id="analyticsPhoto2" accept="image/*" onChange={(e) => setAnalyticsPhoto2(e.target.files[0])} required />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-lg rounded-pill shadow-lg">Register as Creator</button>
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

export default CreatorRegistration;
