import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faCalendarAlt, faCalendarCheck, faUser, faFileAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import msilogo from './Images/msilogo.png';

export default function Sidebar(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role } = props;

  console.log('Sidebar role:', role);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const getReportsLink = () => {
    const role = localStorage.getItem('role');
    switch (role) {
      case 'Head Of Department(HOD)':
        return '/reports/hod';
      case 'Class Coordinator':
        return '/reports/class-coordinator';
      case 'Subject Teacher':
        return '/reports/subject-teacher';
      default:
        return '/dashboard';
    }
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
            <NavLink to={getReportsLink()} activeClassName="active" onClick={toggleSidebar}>
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
      </div>
    </div>
  );
}
