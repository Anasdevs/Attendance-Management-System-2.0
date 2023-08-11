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
import ReportsST from './Components/ReportsST';
import ReportsCC from './Components/ReportsCC';
import ReportsHOD from './Components/ReportsHOD';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/check-session/', {
          credentials: 'include', // Include cookies in the request
        });

        const data = await response.json();
        const { is_authenticated, role } = data;

        setIsAuthenticated(is_authenticated);
        setRole(role); // Set the user's role
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
    }
  };

  if (isLoading) {
    return <div className="custom-loading-spinner"></div>;
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
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <WithSidebar handleLogout={handleLogout} role={role} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

const WithSidebar = ({ handleLogout, role }) => {
  // Define the report component based on the user's role
  let ReportComponent;
  switch (role) {
    case 'Head Of Department(HOD)':
      ReportComponent = ReportsHOD;
      break;
    case 'Class Coordinator':
      ReportComponent = ReportsCC;
      break;
    case 'Subject Teacher':
      ReportComponent = ReportsST;
      break;
    default:
      ReportComponent = ReportsST; 
      break;
  }

  return (
    <>
      <Sidebar handleLogout={handleLogout} role={role} />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/take-attendance/:courseId/:subjectId" element={<Attendance />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
        {/* <Route path="/reports" element={<ReportComponent />} />  */}
        <Route path="/reports/hod" element={<ReportsHOD />} />
        <Route path="/reports/class-coordinator" element={<ReportsCC />} />
        <Route path="/reports/subject-teacher" element={<ReportsST />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
