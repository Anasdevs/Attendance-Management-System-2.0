import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import WithRightbarLayout from './WithRightbarLayout';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './ReportsHOD.css';

export default function ReportsHOD() {
  const navigate = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const today = format(new Date(), 'EEE, dd-MMM-yyyy');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [departmentClasses, setDepartmentClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedClassSubjects, setSelectedClassSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const facultyImage = useSelector((state) => state.faculty.image_url);
  const facultyName = useSelector((state) => state.faculty.name);
  const role = useSelector((state) => state.faculty.role);
  const facultyDepartment = useSelector((state) => state.faculty.department);

  useEffect (() => {
    fetchDepartmentClasses();
  }, []);

  const fetchDepartmentClasses = () => {
    const storedDepartment = localStorage.getItem('department');
    const storedRole = localStorage.getItem('role'); // Get the stored role

    if (!storedDepartment || storedRole !== 'Head Of Department(HOD)') {
    alert('You do not have permission to access this page.');
    navigate('/dashboard');
    return () => {};
    }

    setIsLoading(false);

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
        console.log(data);
        setDepartmentClasses(data.classes);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
      setLoadingProgress(100);

  };

  const redirectSubjectTeacher = () => {
    navigate('/reports/subject-teacher')
  }

  const handleSubjectChange = (event) => {
    const selectedSubjectValue = event.target.value;
    setSelectedSubject(selectedSubjectValue);
    
    if (selectedSubjectValue === 'all') {
      setSelectedCourseId(''); // Clear the selectedCourseId
      setSelectedSubjectId(''); // Clear the selectedSubjectId
    } else {
      const selectedSubjectObject = selectedClassSubjects.find(
        (subjectObj) => subjectObj.subject_name === selectedSubjectValue
      );
    
      if (selectedSubjectObject) {
        setSelectedSubjectId(selectedSubjectObject.subject_id);
      } else {
        setSelectedSubjectId(''); // Reset the selectedSubjectId if subject_id is not found
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
  
    // Find the class object in departmentClasses
    const selectedClassObject = departmentClasses.find(
      (course) => `${course.course} - ${course.semester} - ${course.section}` === selectedClassValue
    );
  
    if (selectedClassObject) {
      setSelectedClassSubjects(selectedClassObject.subjects);
      setSelectedSubject(''); // Clear the selected subject when class changes
      setSelectedCourseId(selectedClassObject.course_id); // Set the selected course ID
      setSelectedSubjectId(''); // Clear the selected subject ID
    }
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
        const selectedClassObject = departmentClasses.find(
          (course) => `${course.course} - ${course.semester} - ${course.section}` === selectedClass
        );
        if (selectedClassObject) {
          url += `&courseId=${selectedClassObject.course_id}`;
        }
      }
    } else {
      if (selectedCourseId && selectedSubjectId) {
        url += `&courseId=${selectedCourseId}&subjectId=${selectedSubjectId}`;
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
      <div className="to-subject-teacher" style={{float:'right'}}>
          <p>
             Download reports as subject teacher{' '}
                  <button className="link-button" onClick={redirectSubjectTeacher} >
                    Subject Reports
                  </button>
                </p>
      </div>
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
<select id="subject" value={selectedSubject} onChange={handleSubjectChange}> {/* Use selectedSubject here */}
  <option value="">Select Subject</option>
  <option value="all">All Subjects</option>
  {selectedClassSubjects.map((subjectObj) => (
    <option key={subjectObj.subject_id} value={subjectObj.subject_name}> {/* Use subject_name as value */}
      {subjectObj.subject_name}
    </option>
  ))}
</select>

  
  <label htmlFor="start-date">Start Date:</label>
  <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
  <label htmlFor="end-date">End Date:</label>
  <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
  <button className="download-button" onClick={handleGenerateReport} disabled={isLoading}>
    {isLoading ? 'Downloading...' : 'Download Report'}
  </button>
</div>
    </WithRightbarLayout>
  );
}



