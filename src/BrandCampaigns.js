import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import blueHand from "./pic/blue_hand.png";

const BrandCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [hiredCreators, setHiredCreators] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const userSession = JSON.parse(localStorage.getItem("userSession"));
        const token = userSession?.token;
        const brandId = userSession?.id;

        if (!token) {
          alert("You are not logged in. Please log in.");
          navigate("/login/brand");
          return;
        }

        // Fetch campaigns
        const response = await fetch("http://localhost:5001/api/brands/brand-campaigns", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch campaigns.");

        const data = await response.json();
        setCampaigns(data.campaigns);

        // Fetch hired creators for all campaigns
        const hiredResponse = await fetch(`http://localhost:5001/api/brands/view-hired-creator/${brandId}/campaigns/hired-creator`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!hiredResponse.ok) throw new Error("Failed to fetch hired creators.");

        const hiredData = await hiredResponse.json();
        
        // Organize hired creators by campaign ID
        const hiredMap = {};
        hiredData.hiredCreators.forEach((creator) => {
          if (!hiredMap[creator.campaign_id]) {
            hiredMap[creator.campaign_id] = [];
          }
          hiredMap[creator.campaign_id].push(creator);
        });

        setHiredCreators(hiredMap);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [navigate]);

  const handleMatchCreators = async (campaignId) => {
    if (!campaignId) {
      alert("Campaign ID is missing!");
      return;
    }
  
    try {
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const token = userSession?.token;
  
      if (!token) {
        alert("You are not logged in. Please log in.");
        navigate("/login/brand");
        return;
      }
  
      const response = await fetch(
        `http://localhost:5001/api/brands/brand-campaign/${campaignId}/match-creators`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!response.ok) throw new Error("Failed to fetch matching creators.");
  
      const data = await response.json();
      navigate("/view-match-creator", {
        state: { campaignId, matchedCreators: data.matchedCreators },
      });
    } catch (error) {
      console.error("Error matching creators:", error);
      alert("An error occurred while matching creators.");
    }
  };

  const handleViewHiredCreators = (campaignId) => {
    console.log("Navigating with:", hiredCreators[campaignId]);
    navigate("/view-hired-creator", { state: { campaignId, hiredCreators: hiredCreators[campaignId] } });
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) return;

    try {
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const token = userSession?.token;
      const brandId = userSession?.id;
        const response = await fetch(`http://localhost:5001/api/brands/brand-campaigns/${brandId}/delete/${campaignId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        alert("Campaign deleted successfully!");
        setCampaigns(campaigns.filter((c) => c.campaign_id !== campaignId)); // Update state
    } catch (error) {
        console.error("Error deleting campaign:", error);
        alert(error.message || "Failed to delete campaign.");
    }
};

const handleLogout = () => {
  // Clear user session (from localStorage or context)
  localStorage.removeItem("userSession");

  // Redirect to login page
  navigate("/login/brand");
};


  if (loading) return <p>Loading campaigns...</p>;

  return (
    <div className="bg-light">
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
            <li><Link to="/" className="nav-link px-2">Update</Link></li>
          </ul>
    
          <div className="col-md-3 text-end">
            <Link to="/login/brand"><button type="button" className="btn btn-primary me-2 rounded-pill" onClick={handleLogout}>Log Out</button></Link>
          </div>
        </header>
      </div>
    <div className="container" style={{marginBottom: '220px'}}>
      <h1 className="text-primary fw-bold mb-5">Your Campaigns</h1>
      <table className="table table-bordered mb-5">
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Target Age Group</th>
            <th>Target Gender</th>
            <th>Category</th>
            <th>Budget</th>
            <th>Location</th>
            <th>Actions</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <tr key={campaign.campaign_id}>
                <td>{campaign.campaign_name}</td>
                <td>{campaign.target_age_group}</td>
                <td>{campaign.target_gender}</td>
                <td>{campaign.category}</td>
                <td>{campaign.budget}</td>
                <td>{campaign.target_location}</td>
                <td>
                  {hiredCreators[campaign.campaign_id]?.length > 0 ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleViewHiredCreators(campaign.campaign_id)}
                    >
                      View Hired Creator
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleMatchCreators(campaign.campaign_id)}
                    >
                      Request Creator
                    </button>
                  )}
                </td>
                <td>
                <button onClick={() => handleDeleteCampaign(campaign.campaign_id)} className="btn btn-danger">
                        Delete
                </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No campaigns found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="col-md-4 mb-0 text-body-secondary">© TinyTies</p>
  
      <Link to="/brand" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src={blueHand} width="40" height="40" />
      </Link>
  
      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item"><Link to="/brand" class="nav-link px-2 text-body-secondary">Home</Link></li>
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

export default BrandCampaigns;



