import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WithRightbarLayout from './WithRightbarLayout';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import LoadingBar from 'react-top-loading-bar';
import './ReportsST.css';

export default function ReportsST() {
  const navigate = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [facultyName, setFacultyName] = useState('');
  const [role, setRole] = useState('');
  const [facultyDepartment, setFacultyDepartment] = useState('');
  const [facultyImage, setFacultyImage] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  
  const storedRole = localStorage.getItem('role'); // Get the stored role


  useEffect(() => {
    if (storedRole !== 'Class Coordinator') {
      alert('You do not have permission to access this page.');
      navigate('/dashboard'); 
      return () => {};
    }
    setLoadingProgress(30);
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dashboard-data-CC/', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 200) {
          const data = await response.json();
          setFacultyName(data.faculty.name);
          setRole(data.faculty.role);
          setFacultyDepartment(data.faculty.department);
          setFacultyImage(data.faculty.image_url);
          setAssignedSubjects(data.classes);
          setSelectedCourseId(data.classes[0]?.course_id || ''); // Set the selected course ID
        } else if (response.status === 302) {
          window.location.reload();
        } else {
          alert('Error occurred while fetching dashboard data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    setLoadingProgress(100);
  } ,
   []);

  
   

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubjectChange = (event) => {
    const selectedSubjectValue = event.target.value;
    setSelectedSubject(selectedSubjectValue);

    if (selectedSubjectValue === 'All subjects') {
      setSelectedSubjectId('');
    } else {
      // Find the subject_id for the selected subject and set it in the state
      const selectedCourse = assignedSubjects.find((course) => course.subject === selectedSubjectValue);
      if (selectedCourse) {
        setSelectedSubjectId(selectedCourse.subject_id);
      }
    }
  };

  const handleDownloadReports = () => {
    if (!startDate || !endDate || !selectedCourseId) {
      alert('Please select both the subject, start date, and end date to download the report.');
      return;
    }

    setIsLoading(true);

    let url = `http://localhost:8000/api/attendance/reports-hod/?startDate=${startDate}&endDate=${endDate}&courseId=${selectedCourseId}`;

    if (selectedSubject !== 'All subjects') {
      url += `&subjectId=${selectedSubjectId}`;
    }

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          let errorMessage;
          try {
            const errorResponse = await response.json();
            errorMessage = errorResponse.error || 'An error occurred while generating the report.';
          } catch (error) {
            errorMessage = 'An error occurred while generating the report.';
          }
          throw new Error(errorMessage);
        }

        return response.blob();
      })
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = `attendance_report_${startDate}_${endDate}.csv`;

        anchor.click();
        URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const today = format(new Date(), 'EEE, dd-MMM-yyyy');

  return (
    <WithRightbarLayout>
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
          <div className="dashboard-date">
            <div className="today-dashboard-date">Today</div>
            <div className="today-dashboard-date">{today}</div>
          </div>
        </div>
      </div>
      <hr />
      <div className="filters-container">
        <label htmlFor="subject">Select Class:</label>
        <select id="subject" value={selectedSubject} onChange={handleSubjectChange}>
  <option value="">Select a Class</option>
  <option value="All subjects">All Subjects</option>
  {assignedSubjects.map((course) => (
    <option key={`${course.course_id}-${course.subject_id}`} value={course.subject}>
      {`${course.course} - ${course.semester} - ${course.section} - ${course.subject}`}
    </option>
  ))}
</select>

        <label htmlFor="start-date">Start Date:</label>
        <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />

        <label htmlFor="end-date">End Date:</label>
        <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />

        <button className="download-button" onClick={handleDownloadReports} disabled={isLoading}>
          {isLoading ? 'Downloading...' : 'Download Reports'}
        </button>
      </div>
    </WithRightbarLayout>
  );
}
