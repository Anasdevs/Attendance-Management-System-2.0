import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap, faEnvelope, faBuilding, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const today = format(new Date(), 'EEE, dd-MMM-yyyy');

export default function Profile({ handleLogout }) {
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useState(null);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/faculty-profile/', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (response.status === 200) {
          const data = await response.json();
          setFacultyData(data);
        } else {
          alert('Error occurred while fetching faculty profile.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while fetching faculty profile.');
      }
    };

    fetchFacultyData();
  }, []);

  const onLogoutClick = async () => {
    try {
      await handleLogout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const contactAdmin = () => {
    alert('Contacting Admin...');
  };

  return (
    <div className="rightbar">
      <h1 className='profile-heading'>Faculty Profile</h1>
      <div className="date">
        <div className="today-date">Today</div>
        <div className="today-date">{today}</div>
      </div>
      {facultyData ? (
        <div className="profile-container">
          <div className="profile-left">
            <img
              className="faculty-image"
              src={facultyData.image} 
              alt="Faculty"
            />
            <div className="faculty-name">
              <h2>{facultyData.name}</h2>
              <p>{facultyData.designation}</p>
            </div>
          </div>
          <div className="profile-right">
            <div className="profile-item">
              <h3 className="dept-heading">
                <FontAwesomeIcon icon={faBuilding} className="icon" /> Department
              </h3>
              <h3 className="faculty-dept">{facultyData.department}</h3>
            </div>
            <hr />
            <div className="profile-item">
              <h3 className="qualification-heading">
                <FontAwesomeIcon icon={faGraduationCap} className="icon" /> Qualifications
              </h3>
              <h3 className="faculty-qualification">{facultyData.qualification}</h3>
            </div>
            <hr />
            <div className="profile-item">
              <h3 className="email-heading">
                <FontAwesomeIcon icon={faEnvelope} className="icon" /> Email
              </h3>
              <h3 className="faculty-email">{facultyData.email}</h3>
            </div>
            <hr />
            <div className="profile-actions">
              <button className="contact-admin-button" onClick={contactAdmin}>
                <FontAwesomeIcon icon={faUser} className="action-icon" /> Contact Admin
              </button>
              <button className="logout-button" onClick={onLogoutClick}>
                <FontAwesomeIcon icon={faSignOutAlt} className="action-icon" /> Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton height={10} count={5} />
      )}
    </div>
  );
}
