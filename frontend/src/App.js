import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Attendance from './Components/Attendance';
import Holidays from './Components/Holidays';
import Calendar from './Components/Calendar';
import Profile from './Components/Profile';
import NotFound from './Components/NotFound'
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/check-session/', {
          credentials: 'include', // Include cookies in the request
        });

        const data = await response.json();
        const { is_authenticated } = data;

        setIsAuthenticated(is_authenticated);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        // Handle error
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        setIsAuthenticated(false);
      } else {
        // Handle logout error
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/login" element={<LoginForm />} />
        ) : (
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        )}
        {isAuthenticated && <Route path="" element={<Navigate to="/dashboard" replace />} />}
        <Route path="*" element={isAuthenticated ? <WithSidebar handleLogout={handleLogout} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const WithSidebar = ({ handleLogout }) => {
  return (
    <>
      <Sidebar handleLogout={handleLogout} />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/take-attendance/:courseId" element={<Attendance />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
