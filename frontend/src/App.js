import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';
import Sidebar from './Components/Sidebar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard/*" element={<DashboardWithSidebar />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const DashboardWithSidebar = () => {
  return (
    <div>
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default App;
