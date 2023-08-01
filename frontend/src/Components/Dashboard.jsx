import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { format } from 'date-fns';
import LoadingBar from 'react-top-loading-bar';
import WithRightbarLayout from './WithRightbarLayout';
// import defaultFacultyImage from './Images/faculty.png'


const Dashboard = () => {
  const [facultyName, setFacultyName] = useState('');
  const [role , setRole] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyImage, setFacultyImage] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const today = format(new Date(), 'EEE, dd-MMM-yyyy');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProgress(30);
      try {
        const response = await fetch('http://localhost:8000/api/dashboard-data/', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 200) {
          const data = await response.json();
          setFacultyName(data.faculty.name);
          setRole(data.faculty.role);
          setFacultyEmail(data.faculty.email);
          setFacultyImage(data.faculty.image_url); // Set the faculty image URL
          setClasses(data.classes);
        } else if (response.status === 302) {
          navigate('/login');
        } else {
          alert('Error occurred while fetching dashboard data.');
        }
      } finally {
        setIsDataFetched(true);
        setLoadingProgress(100); // Set the loading bar progress when data fetching is completed
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
    <WithRightbarLayout>
      <div className="dashboard-container">
       <LoadingBar progress={loadingProgress} color="#111137" height={4} />
      <div className="rightside">
      
        <div className="image">
        {facultyImage ? (
            <img src={facultyImage} alt="Faculty" />
          ) : (
            <Skeleton circle height={70} width={70}/>
          )}
          <div className="faculty-info">
            <div className="faculty-info-name">
            {facultyName ? (
              <p className="faculty-name">{facultyName}</p>
            ) : (
              <Skeleton width={150} />
            )}
            {role ? (
              <p className="faculty-role">{role}</p>
            ) : (
              <Skeleton width={100} />
            )}
            </div>
            {facultyEmail ? (
              <p className="faculty-email">{facultyEmail}</p>
            ) : (
              <Skeleton count={1} />
            )}
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
              {isDataFetched ? (
                classes.length>0?(
                filteredRows.map((row, index) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>
                    No classes are assigned to you
                  </td>
                </tr>
              )
            ): (
                <tr>
                  <td colSpan={6}>
                    <Skeleton count={5} height={35} width="100%" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </WithRightbarLayout>
  );
};

export default Dashboard;