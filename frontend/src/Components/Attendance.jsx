import React, { useState, useEffect } from 'react';
import { format, addDays, subDays, isToday } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Attendance.css';
import { useParams } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
// import defaultFacultyImage from './Images/faculty.png';

export default function Attendance() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { courseId } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const timeZone = 'Asia/Kolkata';
  const zonedDate = utcToZonedTime(currentDate, timeZone);
  const formattedDate = format(zonedDate, 'EEE, dd-MMM-yyyy');
  const isCurrentDate = isToday(zonedDate);
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [className, setClassName] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [facultyImage, setFacultyImage] = useState(null);
  const [showMarkAllAttendanceMessage, setShowMarkAllAttendanceMessage] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async (date) => {
    try {
      const timeZone = 'Asia/Kolkata';
      const zonedDate = utcToZonedTime(date, timeZone);
      const formattedDate = format(zonedDate, 'yyyy-MM-dd');

      const response = await fetch(`http://localhost:8000/api/take-attendance/?course_id=${courseId}&date=${formattedDate}`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });
      if (response.status === 200) {
        const data = await response.json();
        setClassName(data.class_name);
        setAttendanceData(data.students);
      } else {
        alert('Error occurred while fetching student records.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while fetching student records.');
    }
    setLoadingProgress(100);
  };

  useEffect(() => {
    fetchData(format(currentDate, 'yyyy-MM-dd'));
  }, [currentDate, courseId]);

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
          setFacultyImage(data.faculty.image_url); // Set the faculty image URL

        } else {
          alert('Error occurred while fetching dashboard data.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while fetching dashboard data.');
      }setLoadingProgress(100);
    };

    fetchData()
      .then(() => setIsDataFetched(true))
      .catch(() => setIsDataFetched(true));
  }, []);

  const handleKeyPress = (event, eno) => {
    if (event.key === 'p' || event.key === 'P') {
      markAttendance(eno, 'Present');
      moveNext(eno);
    } else if (event.key === 'a' || event.key === 'A') {
      markAttendance(eno, 'Absent');
      moveNext(eno);
    }
  };

  const markAttendance = (eno, status) => {
    setAttendanceData((prevAttendanceData) =>
      prevAttendanceData.map((student) => {
        if (student.enrolment_no === eno) {
          return {
            ...student,
            attendance__status: status,
            attendance_date: currentDate,
          };
        }
        return student;
      })
    );
  };

  const submitAttendanceData = async () => {
    try {
      const modifiedAttendanceData = attendanceData.map((student) => ({
        enrolment_no: student.enrolment_no,
        attendance__status: student.attendance__status,
        attendance_date: student.attendance_date,
      }));

      const requestBody = {
        course_id: courseId,
        attendance_data: modifiedAttendanceData,
        attendance_date: format(currentDate, 'yyyy-MM-dd'),
      };

      const response = await fetch('http://localhost:8000/api/submit-attendance/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        // Attendance submitted successfully
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        alert('Error occurred while submitting attendance.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while submitting attendance.');
    }
  };

  const moveNext = (eno) => {
    const studentIndex = attendanceData.findIndex((student) => student.enrolment_no === eno);
    const nextIndex = studentIndex + 1;

    if (nextIndex < attendanceData.length) {
      const nextStudent = attendanceData[nextIndex];
      const inputElement = document.getElementById(`attendance-input-${nextStudent.enrolment_no}`);
      if (inputElement) {
        inputElement.focus();
      }
    }
  };

  const getTotalPresent = () => {
    return attendanceData.filter((student) => student.attendance__status === 'Present').length;
  };

  const getTotalAbsent = () => {
    return attendanceData.filter((student) => student.attendance__status === 'Absent').length;
  };

  // const totalStudentsPercentage = (getTotalPresent() + getTotalAbsent())/attendanceData.length * 100;
  // const totalStudentsColor = `linear-gradient(to left, #9f9d9d, #7e7979d6 ${totalStudentsPercentage}%, transparent 0%)`;
  const [totalStudentsPercentage, setTotalStudentsPercentage] = useState(100);
  useEffect(() => {
    const initialPresentStudents = getTotalPresent(); // Initially marked as Present
    const initialAbsentStudents = getTotalAbsent(); // Initially marked as Absent
    const initialPercentage = ((initialPresentStudents + initialAbsentStudents) / attendanceData.length) * 100;
    const initialTotalStudentsPercentage = 100 - initialPercentage; // Invert the percentage
    setTotalStudentsPercentage(initialTotalStudentsPercentage);
  }, [attendanceData]);

  const presentPercentage = (getTotalPresent() / attendanceData.length) * 100;
  const absentPercentage = (getTotalAbsent() / attendanceData.length) * 100;
  const presentColor = `linear-gradient(to right, #52c234, #4dbc25 ${presentPercentage}%, transparent 0%)`;
  const absentColor = `linear-gradient(to right, #cb2d3e, #ef473a ${absentPercentage}%, transparent 0%)`;

  const handleSubmitAttendance = () => {
    // Check if all students' attendance is marked
    const allAttendanceMarked = attendanceData.every(
      (student) => student.attendance__status === 'Present' || student.attendance__status === 'Absent'
    );

    if (!allAttendanceMarked) {
      setShowMarkAllAttendanceMessage(true);
      setTimeout(() => {
        setShowMarkAllAttendanceMessage(false);
      }, 3000);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      submitAttendanceData();
    }, 2000);
  };

  const navigatePreviousDay = () => {
    setCurrentDate((prevDate) => subDays(prevDate, 1));
  };

  const navigateNextDay = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 1));
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleDownloadReports = () => {
    if (!startDate || !endDate) {
      alert('Please select both the start date and end date to download the report.');
      return;
    }
    setIsLoading(true);
    const url = `http://localhost:8000/api/attendance/reports?startDate=${startDate}&endDate=${endDate}&courseId=${courseId}`;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);

        // Create a temporary anchor element
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = `attendance_report_${startDate}_${endDate}.csv`;
        // Programmatically trigger the download
        anchor.click();
        URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="page-container">
      <LoadingBar progress={loadingProgress} color="#111137" height={4} />
      {showMarkAllAttendanceMessage && (
        <div className="message-container">
          <div className="message-popup">
            <p>Please mark the attendance of all students.</p>
          </div>
        </div>
      )}
      <div className="rightbar">
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
            {facultyEmail ? (
              <p className="faculty-email">{facultyEmail}</p>
            ) : (
              <Skeleton count={1} />
            )}
          </div>
          <div className="date">
            {isCurrentDate && <div className="today-date">Today</div>}
            <div className="today-date">{formattedDate}</div>
            <div className="date-navigation">
              <button className="navigation-button" onClick={navigatePreviousDay}>
                &lt; Prev
              </button>
              {!isCurrentDate && (
                <button className="navigation-button" onClick={navigateNextDay}>
                  Next &gt;
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="classInfo">
          <h1>{className}</h1>
        </div>
        {isSubmitted && (
          <div className="success-message">Attendance has been successfully submitted!</div>
        )}
        <div className="filters-container">
          <label htmlFor="start-date">Start Date:</label>
          <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />

          <label htmlFor="end-date">End Date:</label>
          <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />

          <button className="download-button" onClick={handleDownloadReports} disabled={isLoading}>
            {isLoading ? 'Downloading...' : 'Download Reports'}
          </button>
        </div>
        <div className="statistics-container">
        <div className="statistics-card" style={{ background: `linear-gradient(to right, #d3cce3, #e9e4f0 ${totalStudentsPercentage}%, transparent 0%)` }}>
          <h3>Total Students</h3>
          <p className="statistics-value">{attendanceData.length}</p>
        </div>
        <div className="statistics-card" style={{ background: presentColor }}>
          <h3>Total Present</h3>
          <p className="statistics-value">{getTotalPresent()}</p>
        </div>
        <div className="statistics-card" style={{ background: absentColor }}>
          <h3>Total Absent</h3>
          <p className="statistics-value">{getTotalAbsent()}</p>
        </div>
      </div>
        <div className="attendance-container">

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Enrollment No.</th>
                <th>Student Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            {isDataFetched ? (
            <tbody>
              {attendanceData.map((student) => (
                <tr key={student.enrolment_no}>
                  <td>{student.enrolment_no}</td>
                  <td>{student.name}</td>
                  <td>
                    <input
                      id={`attendance-input-${student.enrolment_no}`}
                      type="checkbox"
                      checked={student.attendance__status === 'Present'}
                      onChange={() =>
                        markAttendance(
                          student.enrolment_no,
                          student.attendance__status === 'Present' ? 'Absent' : 'Present'
                        )
                      }
                      onKeyPress={(event) => handleKeyPress(event, student.enrolment_no)}
                      data-status={student.attendance__status ? student.attendance__status : 'none'}
                    />
                  </td>
                </tr>
              ))}
              {attendanceData.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center' }}>
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={3}>
                  <Skeleton count={5} height={40} />
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <button
        className={`submit-button${isSubmitting ? ' submitting' : ''}`}
        onClick={handleSubmitAttendance}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
      </button>
    </div>
  </div>
)};