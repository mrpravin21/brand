import React from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import RegistrationForm from "./RegistrationForm";

const BrandRegistration = () => {
  return (
    <div className="bg-light" style={{ overflowX: "hidden" }}>
      <Navbar />
      <div
        className="d-flex align-items-center min-vh-100"
        style={{
          background: "linear-gradient(135deg, #eaf3fc, #fdeef1)",
          color: "#333",
        }}
      >
        <div className="container text-center text-md-start">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">
                Brand Registration <span className="text-primary">Tinyties</span>
              </h1>
              <p className="lead">
                Create an account to collaborate with the right creators.
              </p>
            </div>
            <div className="col-md-6">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrandRegistration;
