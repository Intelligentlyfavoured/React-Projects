import React, { useState } from 'react';
import '/src/App.css';
import './login';
import 'boxicons';
import 'bootstrap';
<script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>


function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Signup logic goes here
    console.log('Email:', email);
    console.log('Password:', password);
    alert('Signup functionality not yet implemented.');
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <i className='bx bx-user'></i>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <p> Already have an account?  <a href='/signin'> Sign In</a></p>
      </form>
      
      


      
    </div>
    
  );
}

export default Registration;
