import React from "react";

const Footer = () => {
  return (
    <footer
      className="py-4"
      style={{ backgroundColor: "#333", color: "#fff", textAlign: "center" }}
    >
      <div className="container">
        <p className="mb-2">&copy; 2025 Tinyties | All Rights Reserved</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="/privacy" className="text-decoration-none text-light">
              Privacy Policy
            </a>
          </li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item">
            <a href="/terms" className="text-decoration-none text-light">
              Terms of Service
            </a>
          </li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item">
            <a href="/contact" className="text-decoration-none text-light">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
