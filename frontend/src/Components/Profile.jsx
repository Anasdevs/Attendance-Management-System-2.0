import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap, faEnvelope, faBuilding, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import LoadingBar from 'react-top-loading-bar';
import Skeleton from 'react-loading-skeleton';

export default function Profile({ handleLogout }) {
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useState(null);
  const today = format(new Date(), 'EEE, dd-MMM-yyyy');
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        setLoadingProgress(30); // Set initial loading progress

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
      } finally {
        setLoadingProgress(100);
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
    const adminEmail = 'attendance.msi@gmail.com'; // Replace this with the admin's email
  
    // Create the mailto link
    const mailtoLink = `mailto:${adminEmail}`;
  
    // Open the default email client with the mailto link
    window.location.href = mailtoLink;
  };

  return (
    <div className="rightbar">
      <LoadingBar progress={loadingProgress} color="#111137" height={4} />
      {/* <h1 className='profile-heading'>Faculty Profile</h1> */}
      {/* <div className="date">
        <div className="today-date">Today</div>
        <div className="today-date">{today}</div>
      </div> */}
      <div className="profile-container">
        {facultyData ? (
          <div className="profile-left">
            {facultyData.image ? (
              <img
                className="faculty-image"
                src={facultyData.image}
                alt="Faculty"
              />
            ) : (
              <Skeleton circle height={200} width={200} />
            )}
            <div className="faculty-name">
              {facultyData.name ? (
                <h2>{facultyData.name}</h2>
              ) : (
                <Skeleton width={150} />
              )}
              <p>{facultyData.designation}</p>
            </div>
          </div>
        ) : (
          <Skeleton height={1000} width={1500} />
        )}
        {facultyData && (
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
        )}
      </div>
    </div>
  );
        }  