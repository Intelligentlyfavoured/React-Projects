import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { 
  BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, 
  BsSearch, BsJustify, BsFillSunFill, BsFillMoonFill 
} from 'react-icons/bs';

// Define the prop type
type HeaderProps = {
  OpenSidebar: () => void; // Function to handle sidebar toggle
};

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/", { replace: true });
    window.history.pushState(null, "", window.location.href); // Prevent back navigation
  };
  

  

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Apply theme class to the body
  useEffect(() => {
    const themeClass = isDarkMode ? 'dark-mode' : 'light-mode';
    document.body.className = themeClass;
  }, [isDarkMode]);

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
       
        <div onClick={toggleTheme} className="icon theme-toggle" aria-label="Toggle Theme">
          {isDarkMode ? <BsFillSunFill className='icon' /> : <BsFillMoonFill className='icon' />}
        </div>
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#FF4136',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
