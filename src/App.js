import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import your page components
import Bhomepage from './bhomepage';
import Viewinflu from './viewinflu';
import Hireinflu from './hireinflu';
import Brandreq from './brandreq';

// Import login and register components
import LoginForm from './CreatorLoginForm';
import BrandLogin from './BrandLogin';
import CreatorLogin from './CreatorLogin';
import RegisterBrand from './RegisterBrand';
import RegisterCreator from './RegisterCreator';

// Import dashboards
import BrandDashboard from './BrandDashboard';
import CreatorDashboard from './CreatorDashboard';

// Import additional components
import CreatorDetails from './CreatorDetails';
import Hello from './hello';
import ProtectedRoute from './ProtectedRoute';
import Hellobrand from './hellobrand';
import CreatorDetail from './CreatorDetails';
import CampaignForm from './CampaignForm';
import RequestCreator from './RequestCreator';
import ViewMatchCreator from './ViewMatchCreator';


function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Bhomepage />} />

        {/* Influencer Pages */}
        <Route path="/hire-influencer" element={<Hireinflu />} />

        {/* Brand Requirement Page */}
        <Route path="/fill-requirement" element={<Brandreq />} />

        {/* Login Pages */}
        <Route path="/login/brand" element={<BrandLogin />} />
        <Route path="/login/creator" element={<CreatorLogin />} />

        {/* Registration Pages */}
        <Route path="/register/brand" element={<RegisterBrand />} />
        <Route path="/register/creator" element={<RegisterCreator />} />

        {/* Route for displaying a creator's details */}
        <Route path="/creator/:id" element={<CreatorDetails />} />

        {/* Dashboard Routes */}
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />

        {/* Protected Hello World Page */}
        <Route
          path="/creator-detail"
          element={
            <ProtectedRoute role="creator">
              <CreatorDetail />
            </ProtectedRoute>
          }
        />

          <Route
            path="/hello"
            element={
            <ProtectedRoute role="creator">
              <Hello />
            </ProtectedRoute>
            }
          />
        {/* Brand Dashboard with Nested Routes */}
        <Route
          path="/brand"
          element={
            <ProtectedRoute role="brand">
              <BrandDashboard />
            </ProtectedRoute>
        }/>

        <Route
          path="/view-influencer"
          element={
            <ProtectedRoute role="brand">
              <Viewinflu />
            </ProtectedRoute>
        }/>

          <Route
          path="/brand-campaign"
          element={
            <ProtectedRoute role="brand">
              <CampaignForm />
            </ProtectedRoute>
        }/>

          <Route
          path="/request-creator"
          element={
            <ProtectedRoute role="brand">
              <RequestCreator />
            </ProtectedRoute>
        }/>

          <Route
          path="/view-match-creator"
          element={
            <ProtectedRoute role="brand">
              <ViewMatchCreator />
            </ProtectedRoute>
        }/>
        {/* Wildcard Redirect */}
        <Route path="*" element={<Navigate to="/login/creator" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

