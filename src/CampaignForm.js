import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CampaignForm = () => {
  const [campaignName, setCampaignName] = useState("");
  const [targetAgeGroup, setTargetAgeGroup] = useState("");
  const [targetLocation, setTargetLocation] = useState("");
  const [targetGender, setTargetGender] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !campaignName ||
      !targetAgeGroup ||
      !targetLocation ||
      !targetGender ||
      !category ||
      !budget ||
      !description
    ) {
      alert("All fields are required.");
      return;
    }

    // Retrieve token from localStorage
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const token = userSession?.token;

    if (!token) {
      alert("You are not logged in. Please log in to start a campaign.");
      navigate("/login/brand"); // Redirect to login page
      return;
    }

    // API call to submit campaign data
    const campaignData = {
      campaignName,
      targetAgeGroup,
      targetLocation,
      targetGender,
      category,
      budget,
      description,
    };

    fetch("http://localhost:5001/api/brands/brand-campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(campaignData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            alert("Unauthorized. Please log in again.");
            navigate("/login/brand"); // Redirect to login on unauthorized error
            return;
          }
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || "Campaign created successfully!");

        // Navigate to the next page without the creatorsMatched data
        navigate("/brand", {
          state: {
            campaignId: data.campaignId, // Pass only campaignId for now
          },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while creating the campaign.");
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
        className="d-flex min-vh-100"
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
            <h2 className="text-center text-primary mb-4">Create Campaign</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <InputField
                    id="campaignName"
                    label="Campaign Name"
                    placeholder="Enter campaign name"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                  />
                  <SelectField
                    id="targetAgeGroup"
                    label="Target Age Group"
                    value={targetAgeGroup}
                    onChange={(e) => setTargetAgeGroup(e.target.value)}
                    options={[
                      "13-17",
                      "18-24",
                      "25-34",
                      "35-44",
                      "45+",
                    ]}
                  />
                  <SelectField
                    id="targetGender"
                    label="Target Gender"
                    value={targetGender}
                    onChange={(e) => setTargetGender(e.target.value)}
                    options={["Male", "Female", "All"]}
                  />
                  <SelectField
                    id="category"
                    label="Campaign Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={["Fashion", "Tech", "Food", "Travel", "Fitness"]}
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    id="budget"
                    label="Budget (in USD)"
                    placeholder="Enter campaign budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    min={1}
                  />
                  <SelectField
                    id="targetLocation"
                    label="Geographical Location"
                    value={targetLocation}
                    onChange={(e) => setTargetLocation(e.target.value)}
                    options={[
                      "Kathmandu",
                      "Pokhara",
                      "Lalitpur",
                      "Biratnagar",
                      "Chitwan",
                    ]}
                  />
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Campaign Description
                    </label>
                    <textarea
                      id="description"
                      className="form-control"
                      placeholder="Provide a brief description of the campaign"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Start Campaign
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

export default CampaignForm;
