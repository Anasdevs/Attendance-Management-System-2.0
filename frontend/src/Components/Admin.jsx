// import React, { useState } from 'react';
// import './Admin.css';

// export default function Admin() {
//   const [loginId, setLoginId] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/adminLogin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           loginId,
//           password,
//         }),
//       });

//       if (response.ok) {
//         // Redirect to the admin dashboard
//         window.location.href = '/admin/admin-dashboard';
//       } else {
//         // Display error message
//         const errorData = await response.json();
//         setErrorMessage(errorData.message);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setErrorMessage('An error occurred during login');
//     }
//   };

//   return (
//     <>
//       <div className="login-container">
//         <form className="login-form" onSubmit={handleLogin}>
//           <h2>Admin Panel Login</h2>
//           <input
//             type="text"
//             placeholder="Login ID"
//             name="login_id"
//             value={loginId}
//             onChange={(e) => setLoginId(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import './Admin.css';


function Admin() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginId,
          password,
        }),
      });

      if (response.ok) {
        // Redirect to the admin dashboard
        window.location.href = '/admin/admin-dashboard';
      } else {
        // Display error message
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login');
    }
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Admin Panel Login</h2>
          <input
            type="text"
            placeholder="Login ID"
            name="login_id"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Admin;
