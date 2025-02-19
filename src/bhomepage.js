import React, { useRef } from "react";
import { Link } from "react-router-dom";
import blueHand from "./pic/blue_hand.png";

const Bhomepage = () => {
  const callToActionRef = useRef(null);

  const scrollToAction = () => {
    if (callToActionRef.current) {
      const targetOffset = callToActionRef.current.offsetTop - 50;
      window.scrollTo({
        top: targetOffset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-light" style={{ overflowX: "hidden" }}>
      {/* Navbar */}
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none font-weight-light">
              <img src={blueHand} alt="TinyTies" width="40" height="40" />
            </Link>
          </div>
    
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
            <li><Link to="/register/brand" className="nav-link px-2">Brand</Link></li>
            <li><Link to="/register/creator" className="nav-link px-2">Creator</Link></li>
          </ul>
    
          <div className="col-md-3 text-end">
            <Link to="/login/brand"><button type="button" className="btn btn-primary me-2 rounded-pill">Brand</button></Link>
            <Link to="/login/creator"><button type="button" className="btn btn-primary me-2 rounded-pill">Creator</button></Link>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <div className="border-bottom">
      <div
        className="d-flex align-items-center mt-5 mb-5"
      >
        <div className="container text-center text-md-start">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold"><span className="text-primary">TinyTies</span></h1>
              <h2 className="display-6 fw-bold">Builds Genuine Connections!</h2>
              <p className="lead">
                Join thousands who trust us to create meaningful Collabs.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                <Link to="register/brand">
                <button
                  className="btn btn-outline-primary btn-lg rounded-pill shadow-lg"
                >
                  Get Started as Brand
                </button>
                </Link>
                <Link to="/register/creator">
                  <button className="btn btn-outline-primary btn-lg rounded-pill shadow-lg">
                  Get Started as Creator
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="https://gatton.uky.edu/sites/default/files/iStock-networkWEB.png"
                alt="Happy couple"
                className="img-fluid rounded"
              />
            </div>
          </div>
          
        </div>
      </div>
      
      </div>

      {/* Features Section */}
      <section ref={callToActionRef} id="Features">
      <div className="border-bottom">
      <div
        className="container-fluid py-5"
        style={{
          background: "#f9fafb",
        }}
      >
        <div className="container mt-5 mb-5">
          <h2 className="text-center text-dark mb-5 fw-bold"><span className="text-primary-emphasis">Why TinyTies?</span></h2>
          <div className="row g-5 px-3">
            <div className="col-md-4">
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  background: "#e8f0fe",
                  color: "#333",
                }}
              >
                <div className="card-body text-center">
                  <i className="bi bi-shield-check fs-1 mb-3 text-primary"></i>
                  <h5 className="card-title fw-bold">Safety & Privacy</h5>
                  <p className="card-text">
                    Your personal information stays secure with us.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  background: "#fff0f1",
                  color: "#333",
                }}
              >
                <div className="card-body text-center">
                  <i className="bi bi-heart fs-1 mb-3 text-danger"></i>
                  <h5 className="card-title fw-bold">Personalized Matches</h5>
                  <p className="card-text">
                    Meet your ideal match based on unique preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card h-100 shadow-sm border-0 mb-5"
                style={{
                  background: "#f2f9e9",
                  color: "#333",
                }}
              >
                <div className="card-body text-center">
                  <i className="bi bi-people fs-1 mb-3 text-success"></i>
                  <h5 className="card-title fw-bold">Supportive Community</h5>
                  <p className="card-text">
                    Engage with like-minded individuals in a trusted space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </section>

      {/* Call to Action Section */}
      <div
        ref={callToActionRef}
        className="py-5 mt-5"
        style={{
          textAlign: "center"
        }}
        
      >
        <h3 className="display-6 fw-bold mb-5">Ready to Start Your Journey?</h3>
        <p className="lead mb-5">
          Join the platform trusted by thousands to create meaningful
          relationships.
        </p>
        <Link
          to="/register/brand" className="btn btn-lg rounded-pill"
        ><button className="btn btn-outline-primary btn-lg px-5 rounded-pill shadow-lg">
          Brand
          </button></Link>
        <Link
          to="/register/creator"
          className="btn btn-lg rounded-pill"
        >
          <button className="btn btn-outline-primary btn-lg px-5 rounded-pill shadow-lg">
          Creator
        </button></Link>

      </div>

      {/* Footer */}
      <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="col-md-4 mb-0 text-body-secondary">© TinyTies</p>
  
      <Link to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src={blueHand} width="40" height="40" />
      </Link>
  
      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item"><Link to="/" class="nav-link px-2 text-body-secondary">Home</Link></li>
        <li className="nav-item"><a href="https://github.com/mrpravin21/brand" target="_blank" class="nav-link px-2 text-body-primary">GitHub</a></li>
        <li className="nav-item"><a href="https://www.instagram.com/_tinyties/" target="_blank" class="nav-link px-2 text-body-primary">Instagram</a></li>
      </ul>
    </footer>
    </div>
    </div>
  );
};

export default Bhomepage;
