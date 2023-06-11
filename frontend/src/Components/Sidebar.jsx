import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div>
      <div className="sidebar">
        <h2 className="ams">AMS</h2>
        <ul>
          {/* <li className="menu-heading">Main Menu</li> */}
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <span className="icon">📊</span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/holidays" activeClassName="active">
              <span className="icon">📅</span>
              Holidays
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar" activeClassName="active">
              <span className="icon">🗓️</span>
              Calendar
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
