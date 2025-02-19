import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import blueHand from "./pic/blue_hand.png";

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
      navigate("/creator");
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept the hiring request.");
    }
  };
  
  
  

  if (loading) return <p>Loading hiring requests...</p>;

  const handleLogout = () => {
    // Clear user session (from localStorage or context)
    localStorage.removeItem("userSession");

    // Redirect to login page
    navigate("/login/creator");
  };

  return (
    <div className="bg-light">
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
    <div className="container" style={{marginBottom: '260px'}} >
      <h1 className="text-primary fw-bold mb-5">Your Hiring Requests</h1>
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

export default CreatorHiring;
