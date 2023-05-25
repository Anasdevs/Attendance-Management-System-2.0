import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Auth.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    otp: '',
  });

  const [errors, setErrors] = useState([]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is from the college domain
    if (!formData.email.endsWith('@msijanakpuri.com')) {
      setErrors([{ msg: 'Please enter a valid college email address' }]);
      return;
    }

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsOtpVerified(true);
      } else {
        setErrors([{ msg: 'Invalid OTP' }]);
      }
    } catch (error) {
      console.error(error);
      setErrors([{ msg: 'Something went wrong' }]);
    }
  };

  const handleOtpSubmit = () => {
    alert("OTP has sent to your email!")
    setIsOtpSent(true);

    // Start the timer
    let countDown = otpTimer;
    const timer = setInterval(() => {
      countDown--;
      setOtpTimer(countDown);

      if (countDown === 0) {
        setIsOtpSent(false);
        setOtpTimer(30);
        clearInterval(timer);
      }
    }, 1000);
  };

  // Disable the button and show the countdown when OTP is sent
  const isButtonDisabled = isOtpSent || isOtpVerified;
  const buttonText = isOtpSent ? `Resend OTP in ${otpTimer}s` : 'Get Code';

  return (
    <div className="main">
      <div className="box">
        <div className="box-left">
          <div className="contact">
            <form onSubmit={handleSubmit}>
              <h3>SIGN IN</h3>
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

              <div className="otp-container">
                <input
                  type="number"
                  id="otp"
                  name="otp"
                  placeholder="OTP"
                  value={formData.otp}
                  onChange={handleChange}
                />
                <button
                  className="get-code"
                  onClick={handleOtpSubmit}
                  disabled={isButtonDisabled}
                >
                  {buttonText}
                </button>
              </div>

              <button className="submit">
                  <Link to="/dashboard/">LOGIN</Link>
                  </button>
            </form>
          </div>
        </div>
        <div className="box-right">

          <div className="right-text">
            <h2>AMS</h2>
            <h5>Attendance Management System</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
