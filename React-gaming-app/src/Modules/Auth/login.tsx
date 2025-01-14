import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '/src/App.css';
import 'boxicons';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Example: Login validation logic
    if (email === 'user@example.com' && password === 'password123') {
      console.log('Login successful!');
      alert('Login successful! Redirecting to dashboard...');
      
      // Redirect to the dashboard
      navigate('/home');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Sign In</h1>
      <form onSubmit={handleLogin}>
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
          <i className="bx bx-user"></i>
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
        <button type="submit" className="login-button">
          Sign In
        </button>
        <div className="remember-forgot">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <a href="">Forgot Password?</a>
        <div className="register-link">
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
