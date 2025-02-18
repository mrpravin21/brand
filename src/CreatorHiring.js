import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatorHiring = () => {
  const [hiringRequests, setHiringRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHiringRequests = async () => {
      try {
        const userSession = JSON.parse(localStorage.getItem("userSession"));
        const token = userSession?.token;
        const creatorId = userSession?.id; // Assuming creatorId is stored in localStorage

        if (!token || !creatorId) {
          alert("You are not logged in. Please log in.");
          navigate("/login/creator");
          return;
        }

        const response = await fetch(
          `http://localhost:5001/api/creators/hire-creator/${creatorId}/hiring-requests`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch hiring requests.");

        const data = await response.json();
        setHiringRequests(data.hiringRequests);
      } catch (error) {
        console.error("Error fetching hiring requests:", error);
        alert("Failed to fetch hiring requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchHiringRequests();
  }, [navigate]);

  const handleAcceptRequest = async (requestId) => {
    console.log("Sending request with ID:", requestId);
    try {
      console.log("Accepting request with ID:", requestId); // Debugging line
  
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const token = userSession?.token;
      const creatorId = userSession?.id;
  
      if (!token) {
        alert("You are not logged in. Please log in.");
        navigate("/login/creator");
        return;
      }
  
      const request = hiringRequests.find((req) => req.id === requestId);
      console.log("Found request:", request); // Debugging line
  
      if (!request) {
        alert("Hiring request not found.");
        return;
      }
  
      const { campaign_id, brand_id } = request;
      console.log("Campaign ID:", campaign_id, "Brand ID:", brand_id); // Debugging line
  
      if (!campaign_id || !brand_id) {
        alert("Campaign or Brand data is missing.");
        return;
      }
  
      const response = await fetch(
        `http://localhost:5001/api/creators/hire-creator/${creatorId}/hiring-requests/${requestId}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ campaignId: campaign_id, brandId: brand_id }),
        }
      );
  
      if (!response.ok) throw new Error("Failed to accept request.");
  
      alert("Successfully accepted the hiring request!");
  
      setHiringRequests((prevHiringRequests) =>
        prevHiringRequests.filter((req) => req.request_id !== requestId)
      );
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept the hiring request.");
    }
  };
  
  
  

  if (loading) return <p>Loading hiring requests...</p>;

  return (
    <div className="container">
      <h1 className="text-primary fw-bold">Your Hiring Requests</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>Campaign Name</th>
            <th>Budget</th>
            <th>Category</th>
            <th>Location</th>
            <th>Accept</th>
          </tr>
        </thead>
        <tbody>
          {hiringRequests.length > 0 ? (
            hiringRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.brand_name}</td>
                <td>{request.campaign_name}</td>
                <td>{request.budget}</td>
                <td>{request.campaign_category}</td>
                <td>{request.campaign_location}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hiring requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreatorHiring;
