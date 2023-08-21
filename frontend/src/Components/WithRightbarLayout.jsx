import React from 'react';
import Sidebar from './Sidebar';
import './Rightbar.css'; 
import Footer from './Footer';

const WithRightbarLayout = ({ children }) => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="rightbar">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default WithRightbarLayout;
