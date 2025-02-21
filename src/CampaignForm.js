import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import blueHand from "./pic/blue_hand.png";

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
  const handleLogout = () => {
    // Clear user session (from localStorage or context)
    localStorage.removeItem("userSession");

    // Redirect to login page
    navigate("/login/brand");
  };

  return (
    <div className="bg-light" style={{ overflowX: "hidden" }} >
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link to="/brand" className="d-inline-flex link-body-emphasis text-decoration-none font-weight-light">
              <img src={blueHand} alt="TinyTies" width="40" height="40" />
            </Link>
          </div>
    
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/brand" className="nav-link px-2 link-secondary">Home</Link></li>
            <li><Link to="/view-influencer" className="nav-link px-2">Creators</Link></li>
            <li><Link to="/brand-campaigns" className="nav-link px-2">Campaign</Link></li>
            <li><Link to="/brand-campaign" className="nav-link px-2">New Campaign</Link></li>
            <li><Link to="/brand/update" className="nav-link px-2">Update</Link></li>
          </ul>
    
          <div className="col-md-3 text-end">
            <Link to="/login/brand"><button type="button" className="btn btn-primary me-2 rounded-pill" onClick={handleLogout}>Log Out</button></Link>
          </div>
        </header>
      </div>

      <div className="max-vh-100" style={{maxHeight: '540px'}}
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
      <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="col-md-4 mb-0 text-body-secondary">© TinyTies</p>
  
      <Link to="/brand" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src={blueHand} width="40" height="40" />
      </Link>
  
      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item"><Link to="/brand" class="nav-link px-2 text-body-secondary">Home</Link></li>
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

export default CampaignForm;
