import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './Attendance.css';
import facultyImage from './Images/faculty.png';

const students = [
  { eno: '09821202021', name: 'Anas' },
  { eno: '09921202021', name: 'Harsh' },
  { eno: '10021202021', name: 'Amanjot' },
  { eno: '10121202021', name: 'Amit' },
  { eno: '10221202021', name: 'Aryan' },
  { eno: '10321202021', name: 'Ayush' },
  // Add more student objects here
];

export default function Attendance() {
  const today = format(new Date(), 'EEE, dd-MMM-yyyy'); // Get the current date with the day

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const facultyName = 'Mr. Manpreet ';
  const facultyQualification = 'M.Tech';
  const facultyEmail = 'manpreet@msijanakpuri.com';

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Initialize attendance state with default values
    const initialAttendance = students.map((student) => ({
      eno: student.eno,
      name: student.name,
      status: 'Absent',
    }));
    setAttendance(initialAttendance);
  }, []);

  const handleKeyPress = (event, index) => {
    if (event.key === 'p' || event.key === 'P') {
      markAttendance(index, 'Present');
      moveNext(index);
    } else if (event.key === 'a' || event.key === 'A') {
      markAttendance(index, 'Absent');
      moveNext(index);
    }
  };

  const markAttendance = (index, status) => {
    setAttendance((prevAttendance) => {
      const updatedAttendance = [...prevAttendance];
      updatedAttendance[index].status = status;
      return updatedAttendance;
    });
  };

  const moveNext = (currentIndex) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < students.length) {
      const inputElement = document.getElementById(`attendance-input-${nextIndex}`);
      if (inputElement) {
        inputElement.focus();
      }
    }
  };

  const getTotalPresent = () => {
    return attendance.filter((student) => student.status === 'Present').length;
  };

  const getTotalAbsent = () => {
    return attendance.filter((student) => student.status === 'Absent').length;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitAttendance = () => {
    setIsSubmitting(true);
    // Simulating API call or processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
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
            <div className="today-date">{today}</div>
          </div>
        </div>
        <div className="classInfo">
          <h1>BCA 4th B</h1>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
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
              {students.map((student, index) => (
                <tr key={student.eno}>
                  <td>{student.eno}</td>
                  <td>{student.name}</td>
                  <td>
                    <input
                      id={`attendance-input-${index}`}
                      type="checkbox"
                      checked={attendance[index]?.status === 'Present'}
                      onChange={() =>
                        markAttendance(
                          index,
                          attendance[index]?.status === 'Present' ? 'Absent' : 'Present'
                        )
                      }
                      onKeyPress={(event) => handleKeyPress(event, index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total Present:</td>
                <td>{getTotalPresent()}</td>
              </tr>
              <tr>
                <td colSpan="2">Total Absent:</td>
                <td>{getTotalAbsent()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        {isSubmitted && (
          <div className="success-message">
            Attendance has been successfully submitted!
          </div>
        )}
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
