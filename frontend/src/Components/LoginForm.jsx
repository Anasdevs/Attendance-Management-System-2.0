import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import attendanceTracking from './Images/noteslist.svg';
import attendanceTaking from './Images/onlinecalendar.svg';
import attendanceCompiling from './Images/segmentanalysis.svg';

import './Auth.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    createPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState([]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const [isSignUp, setIsSignUp] = useState(false); // Added state for signup
  const [isPasswordCreated, setIsPasswordCreated] = useState(false); // Added state for password creation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpSubmit = () => {
    // Simulate sending OTP to email
    alert('Password has been sent to your email!');
    setIsOtpSent(true);

    // Start the timer
    let countDown = otpTimer;
    const timer = setInterval(() => {
      countDown--;
      setOtpTimer(countDown);

      if (countDown === 0) {
        setIsOtpSent(false);
        setOtpTimer(120);
        clearInterval(timer);
      }
    }, 1000);
  };

  const handleCreatePassword = () => {
    setIsPasswordCreated(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform authentication or further processing
    // Here, we are just displaying the form data
    console.log(formData);
  };

  // Carousel images and descriptions
  const carouselItems = [
    {
      image: `url(${attendanceTracking})`,
      description: 'Attendance Tracking',
    },
    {
      image: `url(${attendanceTaking})`,
      description: 'Attendance Taking',
    },
    {
      image: `url(${attendanceCompiling})`,
      description: 'Attendance Compiling',
    },
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
      password: '',
      createPassword: '',
      confirmPassword: '',
    });
    setErrors([]);
  };

  const handleSignIn = () => {
    setIsSignUp(false);
    setIsPasswordCreated(false);
    setFormData({
      email: '',
      password: '',
      createPassword: '',
      confirmPassword: '',
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
                {isPasswordCreated ? (
                  <form onSubmit={handleSubmit}>
                    <h3>Create Password</h3>
                    <input
                      type="password"
                      id="createPassword"
                      name="createPassword"
                      placeholder="Create password"
                      value={formData.createPassword}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button type="submit" className="submit">
                      Submit
                    </button>
                  </form>
                ) : (
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
                    <input
                      type="password"
                      id="passwordSent"
                      name="passwordSent"
                      placeholder="Enter password sent to your email"
                      value={formData.passwordSent}
                      onChange={handleChange}
                      required
                    />
                    <div className="otp-container">
                      <button
                        className="get-code"
                        onClick={handleOtpSubmit}
                        disabled={isOtpSent}
                      >
                        {buttonText}
                      </button>
                    </div>
                    <button
                      className="submit"
                      onClick={handleCreatePassword}
                      disabled={!isOtpSent}
                    >
                      Create Password
                    </button>
                    <p>
                      Already have an account?{' '}
                      <button className="link-button" onClick={handleSignIn}>
                        SignIn
                      </button>
                    </p>
                  </form>
                )}
              </>
            ) : (
              <form onSubmit={handleSubmit}>
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
                <button type="submit" className="submit">
                  Sign In
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
