import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        className="d-flex  min-vh-100"
        style={{
          background: "linear-gradient(135deg, #eaf3fc, #fdeef1)",
          color: "#333",
        }}
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

