import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your page components
import Bhomepage from './bhomepage';
import Viewinflu from './viewinflu';
import Hireinflu from './hireinflu';
import Brandreq from './brandreq'; 

// Import new login and register components
import LoginForm from './LoginForm';
import BrandLogin from './BrandLogin';
import CreatorLogin from './CreatorLogin';
import RegisterBrand from './RegisterBrand';
import RegisterCreator from './RegisterCreator';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Bhomepage />} />
        
        {/* Influencer Pages */}
        <Route path="/view-influencer" element={<Viewinflu />} />
        <Route path="/hire-influencer" element={<Hireinflu />} />
        
        {/* Brand Requirement Page */}
        <Route path="/fill-requirement" element={<Brandreq />} />
        
        {/* Login Pages */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/brand" element={<BrandLogin />} />
        <Route path="/login/creator" element={<CreatorLogin />} />
        
        {/* Registration Pages */}
        <Route path="/register/brand" element={<RegisterBrand />} />
        <Route path="/register/creator" element={<RegisterCreator />} />
      </Routes>
    </Router>
  );
}

export default App;

