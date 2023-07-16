import React from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

export default function Profile({ handleLogout }) {
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    try {
      await handleLogout(); // Call the handleLogout function passed as a prop
      navigate('/login', { replace: true }); // Redirect to /login
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className="rightbar">
      <h1>Welcome to your profile</h1>
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  );
}
