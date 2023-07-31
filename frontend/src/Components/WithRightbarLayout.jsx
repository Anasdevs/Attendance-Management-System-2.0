import React from 'react';
import Sidebar from './Sidebar';
import './Rightbar.css'; 

const WithRightbarLayout = ({ children }) => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="rightbar">
        {children}
      </div>
    </div>
  );
};

export default WithRightbarLayout;
