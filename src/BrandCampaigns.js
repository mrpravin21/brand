import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  if (loading) return <p>Loading campaigns...</p>;

  return (
    <div className="container">
      <h1 className="text-primary fw-bold">Your Campaigns</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Target Age Group</th>
            <th>Target Gender</th>
            <th>Category</th>
            <th>Budget</th>
            <th>Location</th>
            <th>Actions</th>
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
  );
};

export default BrandCampaigns;



