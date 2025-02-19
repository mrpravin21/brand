import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import blueHand from "./pic/blue_hand.png";
const CreatorDetail = () => {
  const [creatorHandle, setCreatorHandle] = useState("");
  const [audienceAgeRange, setAudienceAgeRange] = useState("");
  const [audienceDemography, setAudienceDemography] = useState("");
  const [audienceGender, setAudienceGender] = useState("");
  const [totalReach, setTotalReach] = useState("");
  const [analyticsPhoto1, setAnalyticsPhoto1] = useState(null);
  const [analyticsPhoto2, setAnalyticsPhoto2] = useState(null);
  const [analyticsPhoto3, setAnalyticsPhoto3] = useState(null);
  const [contentType, setContentType] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !creatorHandle ||
      !audienceAgeRange ||
      !audienceDemography ||
      !audienceGender ||
      !totalReach ||
      !analyticsPhoto1 ||
      !analyticsPhoto2 ||
      !analyticsPhoto3 ||
      !contentType ||
      !location
    ) {
      alert("All fields are required, including uploading 3 photos.");
      return;
    }

    // Validate file size (max 5MB per file)
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (
      analyticsPhoto1.size > maxFileSize ||
      analyticsPhoto2.size > maxFileSize ||
      analyticsPhoto3.size > maxFileSize
    ) {
      alert("Each photo must be smaller than 5MB.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("creatorHandle", creatorHandle);
    formData.append("audienceAgeRange", audienceAgeRange);
    formData.append("audienceDemography", audienceDemography);
    formData.append("audienceGender", audienceGender);
    formData.append("totalReach", totalReach);
    formData.append("contentType", contentType);
    formData.append("location", location);
    formData.append("analyticsPhoto1", analyticsPhoto1);
    formData.append("analyticsPhoto2", analyticsPhoto2);
    formData.append("analyticsPhoto3", analyticsPhoto3);

    // Retrieve token from localStorage
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const token = userSession?.token;

    if (!token) {
      alert("You are not logged in. Please log in to submit details.");
      navigate("/login/creator"); // Redirect to login page
      return;
    }

    // API call
    fetch("http://localhost:5001/api/creators/creator-details", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Attach the JWT token
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            alert("Unauthorized. Please log in again.");
            navigate("/login"); // Redirect to login on unauthorized error
            return;
          }
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || "Submission successful!");
        navigate("/creator"); // Redirect on success
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while submitting details.");
      });
  };
  const handleLogout = () => {
    // Clear user session (from localStorage or context)
    localStorage.removeItem("userSession");

    // Redirect to login page
    navigate("/login/creator");
  };

  return (
    <div className="bg-light" style={{ overflowX: "hidden" }}>
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
            <li><Link to="/" className="nav-link px-2">Update</Link></li>
          </ul>
    
          <div className="col-md-3 text-end">
            <Link to="/login/creator"><button type="button" className="btn btn-primary me-2 rounded-pill" onClick={handleLogout}>Log Out</button></Link>
          </div>
        </header>
      </div>

      <div
        className="d-flex"
      >
        <div className="container py-5">
          <div
            className="card shadow-lg border-0 mx-auto"
            style={{
              maxWidth: "900px",
              padding: "30px",
              borderRadius: "15px",
            }}
          >
            <h2 className="text-center text-primary mb-4">Creator Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  {/* Input fields */}
                  <InputField
                    id="creatorHandle"
                    label="Social Media Handle Name"
                    placeholder="Enter your social media handle"
                    value={creatorHandle}
                    onChange={(e) => setCreatorHandle(e.target.value)}
                  />
                  <SelectField
                    id="audienceAgeRange"
                    label="Audience Age Range"
                    value={audienceAgeRange}
                    onChange={(e) => setAudienceAgeRange(e.target.value)}
                    options={[
                      "13-17",
                      "18-24",
                      "25-34",
                      "35-44",
                      "45+",
                    ]}
                  /> 
                                    <SelectField
                    id="location"
                    label="Geographical Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    options={[
                      "Kathmandu",
                      "Pokhara",
                      "Lalitpur",
                      "Biratnagar",
                      "Chitwan",
                    ]}
                  />
                  <SelectField
                    id="audienceGender"
                    label="Audience Gender"
                    value={audienceGender}
                    onChange={(e) => setAudienceGender(e.target.value)}
                    options={["Male", "Female"]}
                  />
                  <div className="mb-3">
                    <label
                      htmlFor="audienceDemography"
                      className="form-label"
                    >
                      Audience Details
                    </label>
                    <textarea
                      id="audienceDemography"
                      className="form-control"
                      placeholder="Describe your audience demographics"
                      value={audienceDemography}
                      onChange={(e) =>
                        setAudienceDemography(e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <InputField
                    id="totalReach"
                    label="Total Account Reach"
                    placeholder="Enter total reach"
                    type="number"
                    value={totalReach}
                    onChange={(e) => setTotalReach(e.target.value)}
                    min={1}
                    max={1000000}
                  />
                  <SelectField
                    id="contentType"
                    label="Content Type"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    options={["Videos", "Blogs", "Reels", "Podcasts"]}
                  />
                  <FileUpload
                    id="analyticsPhoto1"
                    label="Upload Analytics Screenshot 1"
                    onChange={(e) => setAnalyticsPhoto1(e.target.files[0])}
                  />
                  <FileUpload
                    id="analyticsPhoto2"
                    label="Upload Analytics Screenshot 2"
                    onChange={(e) => setAnalyticsPhoto2(e.target.files[0])}
                  />
                  <FileUpload
                    id="analyticsPhoto3"
                    label="Upload Analytics Screenshot 3"
                    onChange={(e) => setAnalyticsPhoto3(e.target.files[0])}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Submit Details
              </button>
            </form>
          </div>
        </div>
      </div>
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

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  ...rest
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  </div>
);

const SelectField = ({ id, label, value, onChange, options }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <select
      id={id}
      className="form-select"
      value={value}
      onChange={onChange}
      required
    >
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const FileUpload = ({ id, label, onChange }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      id={id}
      type="file"
      className="form-control"
      accept="image/*"
      onChange={onChange}
      required
    />

    
  </div>
);

export default CreatorDetail;

