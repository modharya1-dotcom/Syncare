import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import RoleSelection from './pages/Auth/RoleSelection';
import DoctorDashboard from './pages/Doctor/Dashboard';
import PatientDashboard from './pages/Patient/Dashboard';
import FamilyDashboard from './pages/Family/Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/role-selection" element={<RoleSelection />} />
                <Route path="/doctor/*" element={<DoctorDashboard />} />
                <Route path="/patient/*" element={<PatientDashboard />} />
                <Route path="/family/*" element={<FamilyDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
