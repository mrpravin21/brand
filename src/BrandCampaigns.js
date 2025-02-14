import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BrandCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const userSession = JSON.parse(localStorage.getItem("userSession"));
        const token = userSession?.token;

        if (!token) {
          alert("You are not logged in. Please log in.");
          navigate("/login/brand");
          return;
        }

        const response = await fetch("http://localhost:5001/api/brands/brand-campaigns", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch campaigns.");

        const data = await response.json();
        setCampaigns(data.campaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        alert("Failed to fetch campaigns.");
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
      console.log("Matched Creators:", data);
  
      navigate("/view-match-creator", {
        state: { campaignId, matchedCreators: data.matchedCreators },
      });
    } catch (error) {
      console.error("Error matching creators:", error);
      alert("An error occurred while matching creators.");
    }
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
            <th>Request Creator</th>
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
                  <button
                    className="btn btn-primary"
                    onClick={() => handleMatchCreators(campaign.campaign_id)}
                  >
                    Request Creator
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
  );
};

export default BrandCampaigns;
