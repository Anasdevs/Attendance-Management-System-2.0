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
      <footer className="footer">
        <p> &copy; 2023 MSI | Developed by <a href="https://github.com/Amitkumar71">Amit</a> & <a href="https://github.com/Anasdevs">Anas</a> | Under <a href="https://github.com/sikhalways">Mr.Manpreet Singh</a></p>
      </footer>
    </div>
  );
};

export default WithRightbarLayout;
