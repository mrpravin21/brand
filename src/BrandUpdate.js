import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import blueHand from "./pic/blue_hand.png";

const UpdateBrand = () => {
    const [brandName, setBrandName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrandDetails = async () => {
            const session = JSON.parse(localStorage.getItem("userSession"));
            if (!session?.token) {
                navigate("/login/brand");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5001/api/brands/profile/${session.id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${session.token}` },
                });

                if (response.status === 401) {
                    localStorage.removeItem("userSession");
                    navigate("/login/brand");
                    return;
                }

                const data = await response.json();
                if (response.ok) {
                    setBrandName(data.brand_name);
                    setOwnerName(data.owner_name);
                    setEmail(data.email);
                } else {
                    setErrorMessage(data.message || "Failed to fetch brand details.");
                }
            } catch (error) {
                setErrorMessage("Error fetching brand details.");
            }
        };

        fetchBrandDetails();
    }, [navigate]);

    // Email validation
    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };

    // Password validation
    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordPattern.test(password);
    };

    const validateInputs = () => {
        // Reset error message
        setErrorMessage("");

        // Validate email
        if (!email || !validateEmail(email)) {
            setErrorMessage("Please enter a valid email.");
            return false;
        }

        // Validate password if provided
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
            navigate("/login/brand");
            return;
        }

        const updateData = { brandName, ownerName, email };
        if (password.trim()) updateData.password = password;

        try {
            const response = await fetch(`http://localhost:5001/api/brands/update/${session.id}`, {
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
                setTimeout(() => navigate("/brand"), 2000);
            } else {
                setErrorMessage(data.message || "Update failed.");
            }
        } catch (error) {
            setErrorMessage("Error updating profile.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userSession");
        navigate("/login/brand");
    };

    return (
        <div className="bg-light" style={{ overflowX: "hidden" }}>
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
                        <Link to="/login/brand"><button type="button" className="btn btn-primary me-2 rounded-pill" onClick={handleLogout}>Log Out</button></Link>
                    </div>
                </header>
            </div>
            <div className="container py-5">
                <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: "900px", padding: "30px", borderRadius: "15px" }}>
                    <h2 className="text-center text-primary mb-4">Update Brand Profile</h2>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={handleUpdate}>
                        <div className="row">
                            <div className="col-md-6">
                                <InputField
                                    id="brandName"
                                    label="Brand Name"
                                    placeholder="Enter brand name"
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    required
                                />
                                <InputField
                                    id="ownerName"
                                    label="Owner Name"
                                    placeholder="Enter owner's name"
                                    value={ownerName}
                                    onChange={(e) => setOwnerName(e.target.value)}
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

export default UpdateBrand;
