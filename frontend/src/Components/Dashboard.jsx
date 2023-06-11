import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Dashboard.css';
import facultyImage from './Images/faculty.png';
import { format } from 'date-fns';

const Dashboard = () => {
  const facultyName = 'Mr. Manpreet ';
  const facultyQualification = 'M.Tech';
  const facultyEmail = 'manpreet@msijanakpuri.com';

  const today = format(new Date(), 'EEE, dd-MMM-yyyy'); // Get the current date with the day

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const rows = [
    { course: 'BCA', semester: '4', section: 'A', subject: 'Django', id: 34568 },
    { course: 'BBA', semester: '2', section: 'B', subject: 'Marketing', id: 34569 },
    { course: 'BCOM', semester: '3', section: 'A', subject: 'Accounting', id: 34570 },
    { course: 'BEd', semester: '1', section: 'B', subject: 'English', id: 34571 },
    { course: 'BEd', semester: '2', section: 'B', subject: 'English', id: 34572 },
    { course: 'MBA', semester: '1', section: 'A', subject: 'Marketing', id: 34573 },

    // Add more rows as needed
  ];

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm)
    )
  );

  // Get the current location
  const location = useLocation();

  return (
    <div className="page-container">
      <div className="rightbar">
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
        <div className="classInfo">
          <h1>Your Classes</h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Section</th>
                <th>Subject</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.course}</td>
                  <td>{row.semester}</td>
                  <td>{row.section}</td>
                  <td>{row.subject}</td>
                  <td>
                    <button className="action-button">
                      <NavLink to="/dashboard/take-attendance" activeClassName="active">TAKE ATTENDANCE</NavLink>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
