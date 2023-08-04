import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faCalendarAlt, faCalendarCheck, faUser, faFileAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import msilogo from './Images/msilogo.png';

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div>
      <div className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-up">
          <img src={msilogo} alt="College Logo" className="logo" />
          <h2 className="ams">AMS</h2>
          <div className="hamburger" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
        <hr className='horizontal-line' />
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active" onClick={toggleSidebar}>
              <span className="icon">
                <FontAwesomeIcon icon={faChartBar} />
              </span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar" activeClassName="active" onClick={toggleSidebar}>
              <span className="icon">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </span>
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" activeClassName="active" onClick={toggleSidebar}>
              <span className="icon">
                <FontAwesomeIcon icon={faFileAlt} />
              </span>
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName="active" onClick={toggleSidebar}>
              <span className="icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              Profile
            </NavLink>
          </li>
        </ul>
        {/* <div className="profile-button"></div> */}
      </div>
    </div>
  );
}