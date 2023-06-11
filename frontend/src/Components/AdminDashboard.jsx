import React, { useState } from 'react';
import './AdminDashboard.css';
import axios from 'axios';

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [faculties, setFaculties] = useState([]);
  const [sno, setSno] = useState(1);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddFaculty = () => {
    if (email.trim() !== '' && name.trim() !== '' && title.trim() !== '') {
      const isDuplicate = faculties.some((faculty) => faculty.email === email);
      if (isDuplicate) {
        alert('Faculty email already exists!');
      } else {
        const facultyData = {
          email,
          name,
          title,
        };
        axios
          .post('/api/faculties/', facultyData)
          .then((response) => {
            console.log('Faculty sent successfully:', response.data);
          })
          .catch((error) => {
            console.error('Error sending faculty:', error);
          });

        const newFaculty = {
          sno,
          email,
          name,
          title,
          date: new Date().toLocaleDateString(),
        };

        setFaculties([...faculties, newFaculty]);
        setSno((prevSno) => prevSno + 1);
        setEmail('');
        setName('');
        setTitle('');
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
        <input
          type="text"
          placeholder="Enter faculty name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Enter faculty title"
          value={title}
          onChange={handleTitleChange}
        />
        <button
          onClick={handleAddFaculty}
          disabled={email.trim() === '' || name.trim() === '' || title.trim() === ''}
        >
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
                <th>Name</th>
                <th>Title</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculties.map((faculty, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.name}</td>
                  <td>{faculty.title}</td>
                  <td>{faculty.date}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditFaculty(faculty.email)}>
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
