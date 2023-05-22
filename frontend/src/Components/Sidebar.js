import React from 'react';
import './Sidebar.css';
import facultyImage from './faculty.jpg';

const Sidebar = () => {
  const facultyName = 'Mr. Manpreet ';
  const facultyQualification = 'M.Tech';
  const facultyEmail = 'manpreet@msijanakpuri.com';

  return (
    <div className='main'>
      <div className="sidebar">
        <h2 className='ams'>AMS</h2>
        <ul>
          <li>Main Menu</li>
          <li>Dashboard</li>
          <li>Holidays</li>
          <li>Calendar</li>
        </ul>
      </div>
      <div className='rightbar'>
        <div className="image">
          <img src={facultyImage} alt="Faculty" />
          <div className="faculty-info">
            <p className="faculty-name">{facultyName}</p>
            <p className="faculty-qualification">{facultyQualification}</p>
            <p className="faculty-email">{facultyEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
