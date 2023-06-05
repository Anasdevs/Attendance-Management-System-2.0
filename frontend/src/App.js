import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';
import Sidebar from './Components/Sidebar';
import Attendance from './Components/Attendance';
import Admin from './Components/Admin'
import AdminDashboard from './Components/AdminDashboard'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard/*" element={<DashboardWithSidebar />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/dashboard/take-attendance" element={<Attendance/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/admin-dashboard" element={<AdminDashboard/>}/>


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
