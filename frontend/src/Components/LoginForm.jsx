import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import attendanceTracking from './Images/noteslist.svg';
import attendanceTaking from './Images/onlinecalendar.svg';
import attendanceCompiling from './Images/segmentanalysis.svg';

import './Auth.css';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState([]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const [isSignUp, setIsSignUp] = useState(false); // Added state for signup
  const [isPasswordCreated, setIsPasswordCreated] = useState(false); // Added state for password creation
  const [isPasswordValidated, setIsPasswordValidated] = useState(false); // Added state for password validation
  const [isLoading, setIsLoading] = useState(false); // Added state for loading animation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpSubmit = async () => {
    if (!formData.email) {
      alert('Please enter your email');
      return;
    }

    try {
      setIsLoading(true); // Start loading animation
      const response = await fetch('http://localhost:8000/api/send-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: formData.username, email: formData.email })
      });

      const data = await response.json();
      alert(data.message); // Show response message from the backend

      if (response.status === 200) {
        setIsOtpSent(true);
        setIsPasswordCreated(true); // Password is created for this email
      } else {
        setIsOtpSent(false);
        setIsPasswordCreated(false); // Password is not created for this email
      }

      setIsLoading(false); // Stop loading animation

      // Start the timer
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while sending the password.');
      setIsLoading(false); // Stop loading animation
    }
  };

  const handleValidatePassword = async () => {
    try {
      setIsLoading(true); // Start loading animation
      const response = await fetch('http://localhost:8000/api/validate-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email, password: formData.passwordSent })
      });

      const data = await response.json();

      if (data.success) {
        setIsPasswordValidated(true);
        alert('Password validated!');
      } else {
        alert(data.message); // Show error message from the backend
      }

      setIsLoading(false); // Stop loading animation
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while validating the password.');
      setIsLoading(false); // Stop loading animation
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true); // Start loading animation
      const response = await fetch('http://localhost:8000/api/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        console.log('User authenticated!');
        window.location.href = 'http://localhost:3000/dashboard'; // Redirect to Dashboard component
      } else {
        alert(data.message); // Show error message from the backend
      }

      setIsLoading(false); // Stop loading animation
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while signing in.');
      setIsLoading(false); // Stop loading animation
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform authentication or further processing
    // Here, we are just displaying the form data
    console.log(formData);
  };

  const handleSignUpSubmit = () => {
    if (isPasswordValidated) {
      // Perform signup submission
      console.log('SignUp submitted!');
      navigate('/signin'); // Redirect to SignIn component
    } else {
      alert('Password is not validated');
    }
  };

  // Carousel images and descriptions
  const carouselItems = [
    {
      image: `url(${attendanceTracking})`,
      description: 'Attendance Tracking'
    },
    {
      image: `url(${attendanceTaking})`,
      description: 'Attendance Taking'
    },
    {
      image: `url(${attendanceCompiling})`,
      description: 'Attendance Compiling'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const buttonText = isOtpSent
    ? `Resend Password in ${Math.floor(otpTimer / 60)}:${otpTimer % 60
    .toString()
    .padStart(2, '0')}`
    : 'Get Password';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSignUp = () => {
    setIsSignUp(true);
    setIsPasswordCreated(false);
    setFormData({
      username: '',
      email: '',
      password: ''
    });
    setErrors([]);
  };

  const handleSignIn = () => {
    setIsSignUp(false);
    setIsPasswordCreated(false);
    setFormData({
      email: '',
      password: ''
    });
    setErrors([]);
  };

  return (
    <div className="main">
      <div className="box">
        <div className="box-left">
          <div className="carousel-container">
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${
                  index === currentSlide ? 'active' : ''
                  }`}
                style={{ backgroundImage: item.image }}
              >
                <div className="carousel-description">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="box-right">
          <div className="contact">
            {isSignUp ? (
              <>
                <form onSubmit={handleSubmit}>
                  <h3>SIGN UP</h3>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                   {isOtpSent && isPasswordCreated ? (
                    <>
                      <input
                        type="password"
                        id="passwordSent"
                        name="passwordSent"
                        placeholder="Enter password sent to your email"
                        value={formData.passwordSent}
                        onChange={handleChange}
                        required
                      />
                      <button
                        className="get-code"
                        onClick={handleValidatePassword}
                        disabled={!formData.passwordSent || isLoading}
                      >
                        {isLoading ? 'Validating...' : 'Validate Password'}
                      </button>
                    </>
                  ) : (
                    <button
                      className="get-code"
                      onClick={handleOtpSubmit}
                      disabled={isOtpSent || isLoading}
                    >
                      {isLoading ? 'Sending Email...' : buttonText}
                    </button>
                    )}
                  <button
                    type="submit"
                    className="submit"
                    disabled={!isPasswordValidated}
                    onClick={handleSignUpSubmit}
                  >
                    Submit
                  </button>
                  <p>
                    Already have an account?{' '}
                    <button className="link-button" onClick={handleSignIn}>
                      SignIn
                    </button>
                  </p>
                </form>
              </>
            ) : (
                <form onSubmit={handleSignInSubmit}>
                  <h3>SIGN IN</h3>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="submit"
                    className="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
                  <p>
                    Don't have an account?{' '}
                    <button className="link-button" onClick={handleSignUp}>
                      SignUp
                    </button>
                  </p>
                </form>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;