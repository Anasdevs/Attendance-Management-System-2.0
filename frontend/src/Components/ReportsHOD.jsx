import React, { useState, useEffect } from 'react';
import WithRightbarLayout from './WithRightbarLayout';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import './ReportsHOD.css';

export default function ReportsHOD() {
  const navigate = useNavigate();
  const [facultyName, setFacultyName] = useState('');
  const [role, setRole] = useState('');
  const [facultyDepartment, setFacultyDepartment] = useState('');
  const [facultyImage, setFacultyImage] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const today = format(new Date(), 'EEE, dd-MMM-yyyy');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [departmentClasses, setDepartmentClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard data
        const response = await fetch('http://localhost:8000/api/dashboard-data/', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 200) {
          const data = await response.json();
          setFacultyName(data.faculty.name);
          setRole(data.faculty.role);
          setFacultyDepartment(data.faculty.department);
        } else if (response.status === 302) {
          window.location.reload();
        } else {
          alert('Error occurred while fetching dashboard data.');
        }
      } catch (error) {
        alert('An error occurred while fetching dashboard data.');
      }
    };

    fetchData()
      .then(() => {
        setIsLoading(false);
        setIsDataFetched(true);
        // After fetching dashboard data, make request to fetch department classes
        fetchDepartmentClasses();
      })
      .catch(() => {
        setIsLoading(false);
        setIsDataFetched(true);
      });
  }, []);

  const fetchDepartmentClasses = () => {
    const storedDepartment = localStorage.getItem('department');

    if (!storedDepartment) {
      alert('Faculty department not available.');
      return;
    }

    setIsLoading(true);

    // Fetch department classes based on stored department
    const url = `http://localhost:8000/api/classes-by-department/?department=${storedDepartment}`;

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          let errorMessage;
          try {
            const errorResponse = await response.json();
            errorMessage = errorResponse.error || 'An error occurred while fetching class data.';
          } catch (error) {
            errorMessage = 'An error occurred while fetching class data.';
          }
          throw new Error(errorMessage);
        }

        return response.json();
      })
      .then((data) => {
        setDepartmentClasses(data.classes);
        console.log("Department classes fetched");
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubjectChange = (event) => {
    const selectedSubjectValue = event.target.value;
    console.log("Selected Subject Value:", selectedSubjectValue);
    setSelectedSubject(selectedSubjectValue); // Update selectedSubject state

    if (selectedSubjectValue === 'all') {
      setSelectedCourseId(''); // Clear the selectedCourseId
    } else {
      const selectedCourse = departmentClasses.find((course) => course.subject === selectedSubjectValue);
      if (selectedCourse) {
        setSelectedCourseId(selectedCourse.course_id);
      }
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleClassChange = (event) => {
    const selectedClassValue = event.target.value;
    setSelectedClass(selectedClassValue);
    console.log("Selected class:", selectedClassValue);
  };
  
  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      alert('Please select start date and end date to download the report.');
      return;
    }
  
    setIsLoading(true);
  
    let url = `http://localhost:8000/api/attendance/reports-hod/?startDate=${startDate}&endDate=${endDate}`;
  
    if (selectedSubject === 'all') {
      if (selectedClass) {
        url += `&className=${selectedClass}`;
      }
    } else {
      if (selectedCourseId && selectedSubject) {
        url += `&courseId=${selectedCourseId}`;
      } else {
        alert('Please select subject.');
        setIsLoading(false);
        return;
      }
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
        anchor.download = selectedSubject === 'all'
          ? `attendance_report_all_subjects_${startDate}_${endDate}.csv`
          : `attendance_report_${selectedSubject}_${startDate}_${endDate}.csv`;
  
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
  


  return (
    <WithRightbarLayout>
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
      
      <label htmlFor="class">Select Class:</label>
<select id="class" value={selectedClass} onChange={handleClassChange}>
  <option value="">Select a Class</option>
  {Array.from(new Set(departmentClasses.map(course => `${course.course} - ${course.semester} - ${course.section}`))).map(uniqueCourse => (
    <option key={uniqueCourse} value={uniqueCourse}>
      {uniqueCourse}
    </option>
  ))}
</select>


<label htmlFor="subject">Select Subject:</label>
<select id="subject" value={selectedSubject} onChange={handleSubjectChange}>
  <option value="">Select Subject</option>
  <option value="all">All Subjects</option>
  {Array.from(new Set(departmentClasses.map((course) => course.subject))).map((subject) => (
    <option key={subject} value={subject}>
      {subject}
    </option>
  ))}
</select>
        <label htmlFor="start-date">Start Date:</label>
        <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
        <label htmlFor="end-date">End Date:</label>
        <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
        <button className="download-button" onClick={handleGenerateReport} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>
    </WithRightbarLayout>
  );
}



