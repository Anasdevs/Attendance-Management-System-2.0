import React, { createContext, useState, useEffect } from 'react';
import { NavLink, useHistory, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import facultyImage from './Images/faculty.png';
import { format } from 'date-fns';
import Attendance from './Attendance';

const Dashboard = () => {
  const [facultyName, setFacultyName] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [classes, setClasses] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const today = format(new Date(), 'EEE, dd-MMM-yyyy'); // Get the current date with the day

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dashboard-data/', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (response.status === 200) {
          const data = await response.json();
          setFacultyName(data.faculty.name);
          setFacultyEmail(data.faculty.email);
          setClasses(data.classes);
        } else if (response.status === 302) {
          navigate('/signin');
        } else {
          alert('Error occurred while fetching dashboard data.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while fetching dashboard data.');
      }
    };

    fetchData()
      .then(() => setIsDataFetched(true))
      .catch(() => setIsDataFetched(true));
  }, []);

  const navigate = useNavigate();

  const handleTakeAttendance = (courseId) => {
    navigate(`/dashboard/take-attendance/${courseId}`);
  };

  const filteredRows = classes.filter((row) =>
    Object.values(row).some(
      (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm)
    )
  );

  return (
    <div className="page-container">
      <div className="rightbar">
        <div className="image">
          <img src={facultyImage} alt="Faculty" />
          <div className="faculty-info">
            <p className="faculty-name">{facultyName}</p>
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
                <th>Course ID</th>
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
                  <td>{row.course_id}</td>
                  <td>{row.course}</td>
                  <td>{row.semester}</td>
                  <td>{row.section}</td>
                  <td>{row.subject}</td>
                  <td>
                    <button
                      onClick={() => handleTakeAttendance(row.course_id)}
                      className="action-button"
                    >
                      TAKE ATTENDANCE
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

{/* <Attendance facultyEmail={facultyEmail} facultyName={facultyName}/> */}
export default Dashboard;
