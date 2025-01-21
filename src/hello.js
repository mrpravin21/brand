import React from "react";
import { useNavigate } from "react-router-dom";

function Hello() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (from localStorage or context)
    localStorage.removeItem("userSession");

    // Redirect to login page
    navigate("/login/creator");
  };

  return (
    <div className="container">
      <h1>Hello World</h1>
      <button
        className="btn btn-primary btn-lg rounded-pill shadow-lg"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
}

export default Hello;

