import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import blueHand from "./pic/blue_hand.png";

const UpdateCreator = () => {
    const [creatorName, setCreatorName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCreatorDetails = async () => {
            const session = JSON.parse(localStorage.getItem("userSession"));
            if (!session?.token) {
                navigate("/login/creator");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5001/api/creators/profile/${session.id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${session.token}` },
                });

                if (response.status === 401) {
                    localStorage.removeItem("userSession");
                    navigate("/login/creator");
                    return;
                }

                const data = await response.json();
                if (response.ok) {
                    setCreatorName(data.creator_name);
                    setPhoneNumber(data.phone);
                    setEmail(data.email);
                } else {
                    setErrorMessage(data.message || "Failed to fetch creator details.");
                }
            } catch (error) {
                setErrorMessage("Error fetching creator details.");
            }
        };

        fetchCreatorDetails();
    }, [navigate]);

    // Password validation function
    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordPattern.test(password);
    };

    const validateInputs = () => {
        // Reset error message
        setErrorMessage("");

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!email || !emailPattern.test(email)) {
            setErrorMessage("Please enter a valid email.");
            return false;
        }

        // Phone number validation (example: 10-digit phone number)
        const phonePattern = /^[0-9]{10}$/;
        if (!phoneNumber || !phonePattern.test(phoneNumber)) {
            setErrorMessage("Please enter a valid 10-digit phone number.");
            return false;
        }

        // Password validation (if provided)
        if (password && password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return false;
        }

        if (password && !validatePassword(password)) {
            setErrorMessage("Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number.");
            return false;
        }

        return true;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!validateInputs()) return;

        setSuccessMessage("");
        setErrorMessage("");

        const session = JSON.parse(localStorage.getItem("userSession"));
        if (!session?.token) {
            navigate("/login/creator");
            return;
        }

        const updateData = { creatorName, phoneNumber, email };
        if (password.trim()) updateData.password = password;

        try {
            const response = await fetch(`http://localhost:5001/api/creators/update/${session.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.token}`,
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage("Profile updated successfully!");
                setPassword("");
                setConfirmPassword("");
                setTimeout(() => navigate("/creator"), 2000);
            } else {
                setErrorMessage(data.message || "Update failed.");
            }
        } catch (error) {
            setErrorMessage("Error updating profile.");
        }
    };

    const handleLogout = () => {
        // Clear user session (from localStorage or context)
        localStorage.removeItem("userSession");
    
        // Redirect to login page
        navigate("/login/creator");
    };

    return (
        <div className="bg-light" style={{ overflowX: "hidden" }}>
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
            <li><Link to="/creator/update" className="nav-link px-2">Update</Link></li>
          </ul>
    
          <div className="col-md-3 text-end">
            <Link to="/login/creator"><button type="button" className="btn btn-primary me-2 rounded-pill" onClick={handleLogout}>Log Out</button></Link>
          </div>
        </header>
      </div>
            <div className="container py-5">
                <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: "900px", padding: "30px", borderRadius: "15px" }}>
                    <h2 className="text-center text-primary mb-4">Update Creator Profile</h2>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={handleUpdate}>
                        <div className="row">
                            <div className="col-md-6">
                                <InputField
                                    id="creatorName"
                                    label="Creator Name"
                                    placeholder="Enter creator name"
                                    value={creatorName}
                                    onChange={(e) => setCreatorName(e.target.value)}
                                    required
                                />
                                <InputField
                                    id="phoneNumber"
                                    label="Phone Number"
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                                <InputField
                                    id="email"
                                    label="Email"
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <InputField
                                    id="password"
                                    label="New Password (optional)"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputField
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
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

const InputField = ({ id, label, type = "text", placeholder, value, onChange, ...rest }) => (
    <div className="mb-3">
        <label htmlFor={id} className="form-label">
            {label}
        </label>
        <input
            id={id}
            type={type}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
        />
    </div>
);

export default UpdateCreator;
