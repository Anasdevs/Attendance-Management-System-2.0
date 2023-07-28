import React, { useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap, faEnvelope, faBuilding, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import facultyImage from './Images/shikha.jpg';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const today = format(new Date(), 'EEE, dd-MMM-yyyy');
// const [loadingProgress, setLoadingProgress] = useState(0);

// Sample data (hardcoded)
const facultyData = {
  name: 'Ms. Shikha Shokeen',
  position: 'Assistant Professor',
  department: 'Computer Science 1st Shift',
  qualification: 'MCA',
  email: 'shikha@msijanakpuri.com'
};

export default function Profile({ handleLogout }) {
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    try {
      await handleLogout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const contactAdmin = () => {
    // Add functionality to contact admin here
    alert('Contacting Admin...');
  };

  return (
    <div className="rightbar">
      <h1 className='profile-heading'>Faculty Profile</h1>
      <div className="date">
        <div className="today-date">Today</div>
        <div className="today-date">{today}</div>
      </div>
      <div className="profile-container">
        <div className="profile-left">
          <img
            className="faculty-image"
            src={facultyImage} // Replace this with the actual faculty image URL
            alt="Faculty"
          />
          <div className="faculty-name">
            <h2>{facultyData.name}</h2>
            <p>{facultyData.position}</p>
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
    </div>
  );
}
