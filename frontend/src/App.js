import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Attendance from './Components/Attendance';
import Admin from './Components/Admin';
import AdminDashboard from './Components/AdminDashboard';
import Holidays from './Components/Holidays';
import Calendar from './Components/Calendar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
        <Route element={<WithSidebar />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/dashboard/take-attendance" element={<Attendance />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </Router>
  );
};

const WithSidebar = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/take-attendance" element={<Attendance />} />
       
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </>
  );
};

export default App;
