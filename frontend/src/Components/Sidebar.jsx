import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faCalendarAlt, faCalendarCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import msilogo from './Images/msilogo.png';



export default function Sidebar() {
  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-up">
          <img src={msilogo} alt="College Logo" className="logo" />
          <h2 className="ams">AMS</h2>
        </div>
        <hr />
        <ul>
          <li>
            <NavLink to="/dashboard" activeclassname="active">
              <span className="icon">
                <FontAwesomeIcon icon={faChartBar} />
              </span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/holidays" activeclassname="active">
              <span className="icon">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </span>
              Holidays
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar" activeclassname="active">
              <span className="icon">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </span>
              Calendar
            </NavLink>
          </li>
          <li><NavLink to="/profile" activeclassname="active">
            <span className="icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            Profile
          </NavLink></li>
        </ul>
        <div className="profile-button">
          
        </div>
      </div>
    </div>
  );
}
