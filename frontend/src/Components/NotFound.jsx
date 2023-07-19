import React from 'react';
import './NotFound.css'; // Import the CSS file

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Page Not Found</h1>
      <p className="not-found-text">Oops! The page you're looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
