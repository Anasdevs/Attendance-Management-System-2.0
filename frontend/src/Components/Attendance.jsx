import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { format, addDays, subDays, isToday } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Attendance.css';
import LoadingBar from 'react-top-loading-bar';
import WithRightbarLayout from './WithRightbarLayout';
import { Link } from 'react-router-dom';


export default function Attendance() {
  const navigate = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { courseId, subjectId } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const timeZone = 'Asia/Kolkata';
  const zonedDate = utcToZonedTime(currentDate, timeZone);
  const formattedDate = format(zonedDate, 'EEE, dd-MMM-yyyy');
  const isCurrentDate = isToday(zonedDate);
  // const [facultyImage, setFacultyImage] = useState(null);
  // const [role, setRole] = useState('');
  // const [facultyName, setFacultyName] = useState('');
  // const [facultyDepartment, setFacultyDepartment] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [className, setClassName] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMarkAllAttendanceMessage, setShowMarkAllAttendanceMessage] = useState(false);
  const [focusedEno, setFocusedEno] = useState(null);
  const facultyImage = useSelector((state) => state.faculty.image_url);
  const facultyName = useSelector((state) => state.faculty.name);
  const role = useSelector((state) => state.faculty.role);
  const facultyDepartment = useSelector((state) => state.faculty.department);

  useEffect(() => {
    fetchData(format(currentDate, 'yyyy-MM-dd'));
  }, [currentDate, courseId]);


  const fetchData = async (date) => {
    try {
      const timeZone = 'Asia/Kolkata';
      const zonedDate = utcToZonedTime(date, timeZone);
      const formattedDate = format(zonedDate, 'yyyy-MM-dd');

      const response = await fetch(`http://localhost:8000/api/take-attendance/?course_id=${courseId}&subject_id=${subjectId}&date=${formattedDate}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.status === 200) {
        const data = await response.json();
        setClassName(data.class_name);
        setAttendanceData(data.students);
        setIsDataFetched(true);
        const firstStudent = data.students[0];
        if (firstStudent) {
          setTimeout(() => {
            const inputElement = document.getElementById(`attendance-input-${firstStudent.enrolment_no}`);
            if (inputElement) {
              inputElement.focus();
            }
          }, 0);
        }
      } else if (response.status === 403) {
        window.location.reload();
        setClassName("Class Name Not Found");
        setAttendanceData([]);
        setIsDataFetched(true);
      } else if (response.status === 500) {
        navigate('/dashboard');
      } else {
        window.location.reload();
        alert('Error occurred while fetching student records.');

      }
    } catch (error) {
      console.error('Error:', error);
      window.location.reload();
      alert('Error occurred while fetching student records.');
    }
    setLoadingProgress(100);
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

  const handleKeyPress = (event, eno) => {
    switch (event.key) {
      case 'p':
      case 'P':
        markAttendance(eno, 'Present');
        moveNext(eno, 'down');
        break;
      case 'a':
      case 'A':
        markAttendance(eno, 'Absent');
        moveNext(eno, 'down');
        break;
      case 'D':
      case 'd':
        moveNext(eno, 'down');
        break;
      case 'U':
      case 'u':
        movePrevious(eno);
        break;
      default:
        return;
    }
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
        subject_id: subjectId,
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
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        location.reload();
        alert('Error occurred while submitting attendance.');
      }
    } catch (error) {
      location.reload();
      console.error('Error:', error);
      alert('Error occurred while submitting attendance.');
    }
  };

  const moveNext = (eno, direction) => {
    const studentIndex = attendanceData.findIndex((student) => student.enrolment_no === eno);
    let nextIndex;

    if (direction === 'down') {
      nextIndex = studentIndex + 1;
    } else if (direction === 'up') {
      nextIndex = studentIndex - 1;
    } else {
      return;
    }

    if (nextIndex >= 0 && nextIndex < attendanceData.length) {
      const nextStudent = attendanceData[nextIndex];
      const inputElement = document.getElementById(`attendance-input-${nextStudent.enrolment_no}`);
      if (inputElement) {
        inputElement.focus();
      }
    }
  };

  const movePrevious = (eno) => {
    const studentIndex = attendanceData.findIndex((student) => student.enrolment_no === eno);
    const previousIndex = studentIndex - 1;

    if (previousIndex >= 0) {
      const previousStudent = attendanceData[previousIndex];
      const inputElement = document.getElementById(`attendance-input-${previousStudent.enrolment_no}`);
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
    const url = `http://localhost:8000/api/attendance/reports/?startDate=${startDate}&endDate=${endDate}&courseId=${courseId}`;

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

        // Create a temporary anchor element
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = `attendance_report_${startDate}_${endDate}.csv`;

        // Programmatically trigger the download
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

  const handleTodayButtonClick = () => {
    // Set the currentDate to the current date
    setCurrentDate(new Date());
  };


  return (
    <WithRightbarLayout>
      <div className="page-container">
        <LoadingBar progress={loadingProgress} color="#111137" height={4} />
        {showMarkAllAttendanceMessage && (
          <div className="message-container">
            <div className="message-popup">
              <p>Please mark the attendance of all students.</p>
            </div>
          </div>
        )}
        <div className="attendance-rightside">
          <div className="image">
            <div className='image-container'>
            <Link to="/profile">
              {facultyImage ? (
                <img src={facultyImage} alt="Faculty" />
              ) : (
                <Skeleton circle height={70} width={70} />
              )}
            </Link>
            </div>
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
            <div className="AT-date">
              {isCurrentDate && <div className="today">Today</div>}
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
                {!isCurrentDate && (
                <button className="navigation-button" onClick={handleTodayButtonClick}>
                  Today
                </button>
              )}
              </div>
            </div>
          </div>
          <div className="AT-classInfo">
            <h1>{className}</h1>
          </div>
          {isSubmitted && (
            <div className="success-message">Attendance has been successfully submitted!</div>
          )}
          <div className="statistics-container">
            <div className="statistics-card" style={{ background: `linear-gradient(to right, #7e7c80, #97959a ${totalStudentsPercentage}%, transparent 0%)` }}>
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
            <div className="table-description">
              <p>
                Use keyboard shortcuts: <strong>P</strong> for present, <strong>A</strong> for absent, <strong>U</strong> to move up, <strong>D</strong> to move down.
              </p>
            </div>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>E.NO.</th>
                  <th>Student Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              {isDataFetched ? (
                <tbody>
                  {attendanceData.map((student) => (
                    <tr key={student.enrolment_no} id={`attendance-row-${student.enrolment_no}`}
                      className={focusedEno === student.enrolment_no ? 'highlighted' : ''}>
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
                          onFocus={() => setFocusedEno(student.enrolment_no)}
                          onBlur={() => setFocusedEno(null)}
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
            disabled={attendanceData.length === 0 || className === 'Class Name Not Found' || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
          </button>
        </div>
      </div>
    </WithRightbarLayout>
  )
};
