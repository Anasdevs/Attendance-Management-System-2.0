import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFacultyInfo } from '../redux/actions';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { format } from 'date-fns';
import LoadingBar from 'react-top-loading-bar';
import WithRightbarLayout from './WithRightbarLayout';
import Sidebar from './Sidebar';

// import defaultFacultyImage from './Images/faculty.png'


const Dashboard = () => {
  const dispatch = useDispatch();
  const [facultyName, setFacultyName] = useState('');
  const [role, setRole] = useState('');
  const [facultyDepartment, setFacultyDepartment] = useState('');
  const [facultyImage, setFacultyImage] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const today = format(new Date(), 'EEE, dd-MMM-yyyy');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);


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
          dispatch(setFacultyInfo(data.faculty));
          console.log(data)
          setFacultyName(data.faculty.name);
          setRole(data.faculty.role);
          setFacultyDepartment(data.faculty.department);
          setFacultyImage(data.faculty.image_url);
          setClasses(data.classes);
          localStorage.setItem('role', data.faculty.role);
          localStorage.setItem('department', data.faculty.department);
        }
        else if (!navigator.onLine) {
          alert('Check your internet connection');
          location.reload();
        }
      }
      catch (error) {
        location.reload();
        alert('Some error occurred');
      }

      finally {
        setIsDataFetched(true);
        setLoadingProgress(100); // Set the loading bar progress when data fetching is completed
      }
    };

    fetchData();
  }, [dispatch]);



  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleTakeAttendance = (courseId, subjectId) => {
    navigate(`/dashboard/take-attendance/${courseId}/${subjectId}`);
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
              <Skeleton circle height={70} width={70} />
            )}
            <div className="faculty-info">
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
              {facultyDepartment ? (
                <p className="faculty-department">{facultyDepartment}</p>
              ) : (
                <Skeleton count={1} />
              )}
            </div>
          </div>
          <div className="dashboard-date">
            <div className="today-dashboard-date">Today</div>
            <div className="date">{today}</div>
          </div>
          <div className="classInfo">
            <h1>Your Classes</h1>
            <input className='class-search-input'
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
                  classes.length > 0 ? (
                    filteredRows.map((row, index) => (
                      <tr key={index}>
                        <td>{row.course_id}</td>
                        <td>{row.course}</td>
                        <td>{row.semester}</td>
                        <td>{row.section}</td>
                        <td>{row.subject}</td>
                        <td>
                          <button
                            onClick={() => handleTakeAttendance(row.course_id, row.subject_id)}
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
                ) : (
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