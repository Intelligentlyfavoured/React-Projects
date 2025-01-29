import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin: React.FC<{
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://bonanza.tililtech.com/api/auth/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred during login.");
      }

      const data = await response.json();
      const { success, token, user } = data;

      if (success) {
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        alert(`Welcome, ${user.user_name}!`);
        navigate("/Dashboard");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img src="./src/assets/game Logo.png" alt="Logo" className="login-logo" />
      <h1>Admin Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="social-login">
        <button className="social-button facebook">Facebook</button>
        <button className="social-button twitter">Twitter</button>
      </div>
      <p className="forgot-password">
        Forgot your password? <a href="/reset">Reset it here</a>.
      </p>
    </div>
  );
};

export default AdminLogin;
