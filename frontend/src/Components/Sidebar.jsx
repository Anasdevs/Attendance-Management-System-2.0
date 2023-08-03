import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faCalendarAlt, faCalendarCheck, faUser, faFileAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import msilogo from './Images/msilogo.png';

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar);
  };

  return (
    <div>
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="sidebar-up">
          <img src={msilogo} alt="College Logo" className="logo" />
          <h2 className="ams">AMS</h2>
        </div>
        <hr />
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <span className="icon">
                <FontAwesomeIcon icon={faChartBar} />
              </span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar" activeClassName="active">
              <span className="icon">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </span>
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" activeClassName="active">
              <span className="icon">
                <FontAwesomeIcon icon={faFileAlt} />
              </span>
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName="active">
              <span className="icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              Profile
            </NavLink>
          </li>
        </ul>
        <div className="profile-button"></div>
        <div className="hamburger" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  );
}
