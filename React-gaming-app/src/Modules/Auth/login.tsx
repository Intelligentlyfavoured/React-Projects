import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

// interface LoginResponse {
//   success: boolean;
//   token: string;
//   user: {
//     user_id: number;
//     email_address: string;
//     user_name: string;   
//   };
// }


const AdminLogin: React.FC <{setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>}> =  ({ setIsAuthenticated }) => {
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
      const response = await fetch("http://197.248.122.31:3000/api/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred during login.");
      }
  
      const data = await response.json(); // Parse JSON response
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
  

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setErrorMessage("");
  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post<LoginResponse>(
  //         "http://197.248.122.31:3000/api/auth/admin-login",
  //       {
  //       email_address: email,
  //       password: password,
  //     });
      

  //     const { success, token, user } = response.data;

  //     if (success) {
      
  //       localStorage.setItem("authToken", token);
  //       alert(`Welcome, ${user.user_name}!`);
      
  //       navigate("/home");
  //     } else {
  //       setErrorMessage("Login failed. Please check your credentials.");
  //     }
  //   } catch (error: any) {
  //     setErrorMessage(
  //       error.response?.data?.message || "An error occurred during login."
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }

  

  // };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Admin Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
