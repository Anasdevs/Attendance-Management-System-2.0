import React, { useState, useEffect } from 'react';
import { format, addDays, subDays, isToday, isSameDay } from 'date-fns';
import './Attendance.css';
import facultyImage from './Images/faculty.png';

const students = [
  { eno: '09821202021', name: 'Anas' },
  { eno: '09921202021', name: 'Harsh' },
  { eno: '10021202021', name: 'Amanjot' },
  { eno: '10121202021', name: 'Amit' },
  { eno: '10221202021', name: 'Aryan' },
  { eno: '10321202021', name: 'Ayush' },
  { eno: '09821222021', name: 'Anas' },
  { eno: '09921222021', name: 'Harsh' },
  { eno: '10021222021', name: 'Amanjot' },
  { eno: '10121232021', name: 'Amit' },
  { eno: '10221232021', name: 'Aryan' },
  { eno: '10321232021', name: 'Ayush' },
  { eno: '09821232021', name: 'Anas' },
  { eno: '09921232021', name: 'Harsh' },
  { eno: '10021232021', name: 'Amanjot' },
  { eno: '10121232021', name: 'Amit' },
  { eno: '10221232021', name: 'Aryan' },
  { eno: '10321212021', name: 'Ayush' },
  { eno: '09821212021', name: 'Anas' },
  { eno: '09921212021', name: 'Harsh' },
  { eno: '10021212021', name: 'Amanjot' },
  { eno: '10121212021', name: 'Amit' },
  { eno: '10221212021', name: 'Aryan' },
  { eno: '10321212021', name: 'Ayush' },
  // Add more student objects here
];

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = format(currentDate, 'EEE, dd-MMM-yyyy');
  const isCurrentDate = isToday(currentDate);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState({});

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const facultyName = 'Mr. Manpreet';
  const facultyQualification = 'M.Tech';
  const facultyEmail = 'manpreet@msijanakpuri.com';

  useEffect(() => {
    // Initialize attendance state with default values for each date
    const initialAttendanceData = {};
    const startDate = subDays(new Date(), 30); // Consider attendance for the past 30 days
    const currentDate = new Date();

    for (let date = startDate; !isSameDay(date, currentDate); date = addDays(date, 1)) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      initialAttendanceData[formattedDate] = students.map((student) => ({
        eno: student.eno,
        name: student.name,
        status: 'Absent',
      }));
    }

    setAttendanceData(initialAttendanceData);
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
    setAttendanceData((prevAttendanceData) => {
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      const updatedAttendanceData = { ...prevAttendanceData };
  
      if (formattedDate in updatedAttendanceData) {
        const updatedAttendance = updatedAttendanceData[formattedDate].map((student) => {
          if (student.eno === eno) {
            return { ...student, status };
          }
          return student;
        });
  
        updatedAttendanceData[formattedDate] = updatedAttendance;
      } else {
        // Create a new attendance entry for the current date
        updatedAttendanceData[formattedDate] = students.map((student) => ({
          eno: student.eno,
          name: student.name,
          status: student.eno === eno ? status : 'Absent',
        }));
      }
  
      return updatedAttendanceData;
    });
  };
  

  const moveNext = (eno) => {
    const studentIndex = students.findIndex((student) => student.eno === eno);
    const nextIndex = studentIndex + 1;

    if (nextIndex < students.length) {
      const nextStudent = students[nextIndex];
      const inputElement = document.getElementById(`attendance-input-${nextStudent.eno}`);
      if (inputElement) {
        inputElement.focus();
      }
    }
  };

  const getTotalPresent = () => {
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const attendance = attendanceData[formattedDate];
    if (attendance) {
      return attendance.filter((student) => student.status === 'Present').length;
    }
    return 0;
  };

  const getTotalAbsent = () => {
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const attendance = attendanceData[formattedDate];
    if (attendance) {
      return attendance.filter((student) => student.status === 'Absent').length;
    }
    return 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitAttendance = () => {
    setIsSubmitting(true);
    // Simulating API call or processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Clear the submitted state and hide the alert after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 1500);
    }, 2000);
  };

  const navigatePreviousDay = () => {
    setCurrentDate((prevDate) => subDays(prevDate, 1));
  };

  const navigateNextDay = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 1));
  };

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [studentId, setStudentId] = useState('');


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
    // Construct the URL or make API request with the filter values
    const url = `/api/attendance/reports?startDate=${startDate}&endDate=${endDate}&studentId=${studentId}`;

    // Redirect to the generated URL or use a download library
    window.location.href = url;
  };


  return (
    <div className="page-container">
      <div className="sidebar">
        <h2 className="ams">AMS</h2>
        <ul>
          <li>Main Menu</li>
          <li>Dashboard</li>
          <li>Holidays</li>
          <li>Calendar</li>
        </ul>
      </div>
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
          <h1>BCA 4th B</h1>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
        </div>
        {isSubmitted && (
          <div className="success-message">Attendance has been successfully submitted!</div>
        )}
        <div className="filters-container">
          <label htmlFor="start-date">Start Date:</label>
          <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />

          <label htmlFor="end-date">End Date:</label>
          <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />

          <button className="download-button" onClick={handleDownloadReports}>
            Download Reports
          </button>
          </div>
        <div className="statistics-container">
          <div className="statistics-card">
            <h3>Total Students</h3>
            <p className="statistics-value">{students.length}</p>
          </div>
          <div className="statistics-card">
            <h3>Total Present</h3>
            <p className="statistics-value">{getTotalPresent()}</p>
          </div>
          <div className="statistics-card">
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
            <tbody>
              {students.map((student) => (
                <tr key={student.eno}>
                  <td>{student.eno}</td>
                  <td>{student.name}</td>
                  <td>
                    <input
                      id={`attendance-input-${student.eno}`}
                      type="checkbox"
                      checked={
                        attendanceData[format(currentDate, 'yyyy-MM-dd')]?.find(
                          (s) => s.eno === student.eno
                        )?.status === 'Present'
                      }
                      onChange={() =>
                        markAttendance(
                          student.eno,
                          attendanceData[format(currentDate, 'yyyy-MM-dd')]?.find(
                            (s) => s.eno === student.eno
                          )?.status === 'Present' ? 'Absent' : 'Present'
                        )
                      }
                      onKeyPress={(event) => handleKeyPress(event, student.eno)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
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
  );
}
