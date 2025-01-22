import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RequestCreator() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Assuming campaignId is passed via state from the previous page
  const { campaignId } = location.state || {};

  const handleMatchCreator = async () => {
    if (!campaignId) {
      alert("Campaign ID is missing!");
      return;
    }

    setLoading(true);

    try {
      // Retrieve token from localStorage
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const token = userSession?.token;

      if (!token) {
        alert("You are not logged in. Please log in to match creators.");
        navigate("/login/brand");
        return;
      }

      // Fetch matching creators from the backend
      const response = await fetch(
        `http://localhost:5001/api/brands/brand-campaign/${campaignId}/match-creators`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch matching creators.");
      }

      const data = await response.json();
      console.log("Matched Creators:", data);

      // Navigate to /view-match-creator with the matched creators and campaignId
      navigate("/view-match-creator", { state: { campaignId, matchedCreators: data.matchedCreators } });
    } catch (error) {
      console.error("Error matching creators:", error);
      alert("An error occurred while matching creators. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Request Creator</h1>
      <button
        className="btn btn-lg btn-primary"
        onClick={handleMatchCreator}
        disabled={loading}
      >
        {loading ? "Matching..." : "Match Creator"}
      </button>
    </div>
  );
}

export default RequestCreator;

