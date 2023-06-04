import React from 'react';
import './Admin.css';


export default function Admin() {
  return (
    <>
      <div className="login-container">
        <form className="login-form">
          <h2>Admin Panel Login</h2>
          <input type="text" placeholder="Login ID" name="login_id" required />
          <input type="password" placeholder="Password" name="password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
