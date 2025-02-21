import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './Viewinflu.css';
import blueHand from "./pic/blue_hand.png";

const ViewInflu = () => {
  const navigate = useNavigate();
  const [creators, setCreators] = useState([]);
  const [sortedCreators, setSortedCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("name"); // Default sorting by name

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/creators');
        if (!response.ok) {
          throw new Error('Failed to fetch creators');
        }
        const data = await response.json();
        setCreators(data);
        setSortedCreators(data); // Initialize sorted creators
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  // Handle sorting when the sort option changes
  useEffect(() => {
    const sorted = [...creators].sort((a, b) => {
      if (sortOption === "name") {
        return a.creator_name.localeCompare(b.creator_name);
      } else if (sortOption === "category") {
        return a.category.localeCompare(b.category);
      } else if (sortOption === "registration_time") {
        return new Date(a.registration_date) - new Date(b.registration_date); // Sort by registration time
      } else if (sortOption === "content_type") {
        return a.content_type.localeCompare(b.content_type); // Sort by content type
      }
      return 0;
    });
    setSortedCreators(sorted);
  }, [sortOption, creators]);

  if (loading) {
    return <p>Loading creators...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleLogout = () => {
    // Clear user session (from localStorage or context)
    localStorage.removeItem("userSession");

    // Redirect to login page
    navigate("/login/brand");
  };

  return (
    <div className='bg-light'>
      {/* Navbar */}
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
            <Link to="/login/brand" ><button type="button" className="btn btn-primary me-2 rounded-pill" onClick={handleLogout}>Log Out</button></Link>
          </div>
        </header>
      </div>

      {/* Sorting Dropdown */}
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-primary fw-bold">Our Creators</h1>
          <select
            className="form-select w-auto"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
            <option value="registration_time">Sort by Registration Time</option>
            <option value="content_type">Sort by Content Type</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="card-grid">
          {sortedCreators.map((creator) => (
            <div className="card shadow" key={creator.id}>
              <div className="card-image">
                <img
                  src={`http://localhost:5001/${creator.analytics_photo1}`}
                  alt={blueHand}
                  onError={(e) => {
                    e.target.src = {blueHand};
                  }}
                  className="rounded"
                />
              </div>
              <div className="card-body text-center">
                <h3 className="card-title fw-bold text-primary">
                  {creator.creator_name}
                </h3>
                <p className="card-category text-muted mb-2">
                  {creator.category}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {creator.email}
                  <br />
                  <strong>Phone:</strong> {creator.phone}
                  <br />
                  <strong>Registration:</strong>{" "}
                  {new Date(creator.registration_date).toLocaleDateString()}
                  <br />
                  <strong>Content Type:</strong> {creator.content_type}
                </p>
                <a
                  href={`http://localhost:5001/${creator.analytics_photo2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary rounded-pill shadow-sm"
                >
                  View More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
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

export default ViewInflu;
