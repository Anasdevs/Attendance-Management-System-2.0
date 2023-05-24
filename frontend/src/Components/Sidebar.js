import React from 'react';
import './Sidebar.css';
import facultyImage from './Images/faculty.png';
import { format } from 'date-fns';

const Sidebar = () => {
  const facultyName = 'Mr. Manpreet ';
  const facultyQualification = 'M.Tech';
  const facultyEmail = 'manpreet@msijanakpuri.com';

  const today = format(new Date(), "EEE, dd-MMM-yyyy"); // Get the current date with the day

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
        <div className="date">

          <div className="today-date">Today</div>
        <div className="today-date">{today}</div> 
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
