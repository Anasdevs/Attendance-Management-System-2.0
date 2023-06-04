import React, { useState } from 'react';
import styles from './AdminDashboard.css';

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [faculties, setFaculties] = useState([]);
  const [sno, setSno] = useState(1);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddFaculty = () => {
    if (email.trim() !== '') {
      const isDuplicate = faculties.some((faculty) => faculty.email === email);
      if (isDuplicate) {
        alert('Faculty email already exists!');
      } else {
        setFaculties([...faculties, { sno, email, date: new Date().toLocaleDateString() }]);
        setEmail('');
        setSno(sno + 1);
      }
    }
  };

  const handleRemoveFaculty = (email) => {
    const confirmation = window.confirm('Are you sure you want to remove this faculty?');
    if (confirmation) {
      const updatedFaculties = faculties.filter((faculty) => faculty.email !== email);
      setFaculties(updatedFaculties);
      setSno(1); // Reset S.no. to 1 after removing faculty email
    }
  };
  

  const handleEditFaculty = (email) => {
    const editedEmail = prompt('Enter the new faculty email:', email);
    if (editedEmail && editedEmail.trim() !== '') {
      const isDuplicate = faculties.some((faculty) => faculty.email === editedEmail);
      if (isDuplicate) {
        alert('Faculty email already exists!');
      } else {
        const updatedFaculties = faculties.map((faculty) =>
          faculty.email === email ? { ...faculty, email: editedEmail } : faculty
        );
        setFaculties(updatedFaculties);
      }
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="faculty-form">
        <input
          type="email"
          placeholder="Enter faculty email"
          value={email}
          onChange={handleEmailChange}
        />
        <button onClick={handleAddFaculty} disabled={email.trim() === ''}>
          Add Faculty
        </button>
      </div>
      <div className="faculty-list">
        <h3>Faculties:</h3>
        {faculties.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>S.no.</th>
                <th>Email</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculties.map((faculty, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.date}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditFaculty(faculty.email)}
                    >
                      Edit
                    </button>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveFaculty(faculty.email)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No faculties added yet.</p>
        )}
      </div>
    </div>
  );
}
