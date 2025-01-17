import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from './Modules/Dashboard/header';
import Sidebar from './Modules/Navbar/Navbar';
import Home from './Modules/Dashboard/home';
import Games from "./Modules/Dashboard/games";
import Categories from "./Modules/Dashboard/categories";
import Gamers from "./Modules/Dashboard/gamers";
import Inventory from "./Modules/Dashboard/inventory";
import Reports from "./Modules/Dashboard/reports";
import Settings from "./Modules/Dashboard/settings";
import AdminLogin from './Modules/Auth/login';
import PrivateRoute from "./Modules/Routing/privateRoutes";

const App: React.FC = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // To track authentication status
  const navigate = useNavigate();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsAuthenticated(true); // If token exists, the user is authenticated
    } else {
      setIsAuthenticated(false); // No token, user is not authenticated
      navigate("/", { replace: true }); // Redirect to login
    }
  }, [navigate]);

  return (
    <div className='grid-container'>
      {isAuthenticated && <Header OpenSidebar={OpenSidebar} />}
      {isAuthenticated && <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />}

      <main>
        <Routes>
          <Route path="/" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
          {/* Protected Routes */}
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>} />
          <Route path="/games" element={
            <PrivateRoute>
              <Games />
            </PrivateRoute>} />
          <Route path="/categories" element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>} />
          <Route path="/gamers" element={
            <PrivateRoute>
              <Gamers />
            </PrivateRoute>} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
