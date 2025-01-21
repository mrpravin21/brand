import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Viewinflu.css';

const ViewInflu = () => {
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

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand text-primary fw-bold" to="/">
            🔗 Tinyties
          </Link>
        </div>
      </nav>

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
                  alt={`${creator.creator_name}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
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
      <footer className="py-4 mt-5" style={{ backgroundColor: '#333', color: '#fff' }}>
        <div className="container text-center">
          <p className="mb-2">&copy; 2025 Tinyties | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default ViewInflu;
