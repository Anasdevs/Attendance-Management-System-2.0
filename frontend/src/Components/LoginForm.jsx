import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import attendanceTracking from './Images/noteslist.svg';
import attendanceTaking from './Images/onlinecalendar.svg';
import attendanceCompiling from './Images/segmentanalysis.svg';

import './Auth.css';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordSent: '',
  });

  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordCreated, setIsPasswordCreated] = useState(false);
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isGetPasswordDisabled, setIsGetPasswordDisabled] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpSubmit = async () => {
    if (!formData.email) {
      alert('Please enter your email');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/send-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username, email: formData.email }),
      });

      const data = await response.json();
      alert(data.message);

      if (response.status === 200) {
        setIsOtpSent(true);
        setIsPasswordCreated(true);
        setIsGetPasswordDisabled(true);
        setOtpTimer(120);

        const timer = setInterval(() => {
          setOtpTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        setTimeout(() => {
          setIsGetPasswordDisabled(false);
          clearInterval(timer);
        }, 120000); // 120 seconds (120,000 milliseconds) to re-enable the button
      } else {
        setIsOtpSent(false);
        setIsPasswordCreated(false);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while sending the password.');
      setIsLoading(false);
    }
  };

  const handleValidatePassword = async () => {
    if (!formData.email) {
      alert('Please enter your email');
      return;
    }

    if (!formData.passwordSent) {
      alert('Please enter the password sent to your email');
      return;
    }

    setIsLoadingPassword(true);

    try {
      const response = await fetch('http://localhost:8000/api/validate-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.passwordSent }),
      });

      const data = await response.json();

      if (data.success) {
        setIsPasswordValidated(true);
        alert('Password validated!');
      } else {
        alert(data.message);
      }

      setIsLoadingPassword(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while validating the password.');
      setIsLoadingPassword(false);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        console.log('User authenticated!');
        setIsAuthenticated(true);
        window.location.href = 'http://localhost:3000/dashboard';
      } else {
        alert(data.message);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while signing in.');
      setIsLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      alert('Please enter your email');
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert('Password reset successfully!');
        navigate('/signin');
      } else {
        alert(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while resetting the password: ' + error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleSignUpSubmit = () => {
    if (isPasswordValidated) {
      console.log('SignUp submitted!');
      navigate('/signin');
    } else {
      alert('Please validate the password');
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setIsSignUp(false);
    setIsPasswordCreated(false);
    setFormData({
      email: '',
      password: '',
      passwordSent: '',
    });
    setErrors([]);
  };

  const handleResetPasswordSubmit = () => {
    console.log('Reset Password submitted!');
    setIsForgotPassword(false);
    setIsSignUp(false);
    setIsPasswordCreated(false);
    setFormData({
      email: '',
      password: '',
      passwordSent: '',
    });
    setErrors([]);
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSignUp = () => {
    setIsSignUp(true);
    setIsPasswordCreated(false);
    setIsForgotPassword(false);
    setFormData({
      username: '',
      email: '',
      password: '',
      passwordSent: '',
    });
    setErrors([]);
  };

  const handleSignIn = () => {
    setIsSignUp(false);
    setIsPasswordCreated(false);
    setIsForgotPassword(false);
    setFormData({
      email: '',
      password: '',
      passwordSent: '',
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
                className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: item.image }}
              >
                <div className="carousel-description">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="box-right">
          <div className="contact">
            {isForgotPassword ? (
              <>
                <form onSubmit={handleResetPasswordSubmit}>
                  <h3>Reset Password</h3>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit" className="submit" onClick={handleReset}>
                    {isLoading ? 'Sending email...' : 'Reset Password'}
                  </button>
                  <p>
                    Remember your password?{' '}
                    <button className="link-button" onClick={handleSignIn}>
                      Sign In
                    </button>
                  </p>
                </form>
              </>
            ) : isSignUp ? (
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
                  <input
                    type="password"
                    id="passwordSent"
                    name="passwordSent"
                    placeholder="Enter password sent to your email"
                    value={formData.passwordSent}
                    onChange={handleChange}
                    required
                  />
                  <div className="button-container">
                    <button
                      className="get-code"
                      onClick={handleOtpSubmit}
                      disabled={isLoading || isGetPasswordDisabled}
                    >
                      {isLoading ? 'Sending Email...' : isGetPasswordDisabled ? `Resend Password in ${otpTimer}s` : 'Get Password'}
                    </button>
                    <button
                      className="code-validate"
                      onClick={handleValidatePassword}
                      disabled={isLoadingPassword || !formData.passwordSent}
                    >
                      {isLoadingPassword ? 'Validating...' : 'Validate Password'}
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="submit"
                    disabled={!isPasswordValidated || isLoading}
                  >
                    Submit
                  </button>
                  <p>
                    Already have an account?{' '}
                    <button className="link-button" onClick={handleSignIn}>
                      Sign In
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
                <p>
                  Forgot your password?{' '}
                  <button className="link-button" onClick={handleForgotPassword}>
                    Reset Password
                  </button>
                </p>
                <button type="submit" className="submit" disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
                <p>
                  Don't have an account?{' '}
                  <button className="link-button" onClick={handleSignUp}>
                    Sign Up
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
