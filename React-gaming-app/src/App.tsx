import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from './Modules/Dashboard/header'
import Sidebar from './Modules/Navbar/Navbar'
import Home from './Modules/Dashboard/home';
import Games from "./Modules/Dashboard/games";
import Categories from "./Modules/Dashboard/categories";
import Gamers from "./Modules/Dashboard/gamers";
import Inventory from "./Modules/Dashboard/inventory";
import Reports from "./Modules/Dashboard/reports";
import Settings from "./Modules/Dashboard/settings";
import AdminLogin from './Modules/Auth/login';
import PrivateRoute from "./Modules/Routing/privateRoutes"


 
  const App: React.FC = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
    const navigate = useNavigate();
  
    useEffect(() => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        navigate("/", { replace: true });
      }
    }, [navigate]);

  return (
    // <BrowserRouter>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    
      <main>
              <Routes>
                <Route path="/home" element={ <PrivateRoute>
        <Home />
 </PrivateRoute>} />
                <Route path="/games" element={ <PrivateRoute>
        <Games />
      </PrivateRoute>} />
                <Route path="/categories" element={ <PrivateRoute>
        <Categories />
      </PrivateRoute>} />
                <Route path="/gamers" element={ <PrivateRoute>
        <Gamers />
      </PrivateRoute>} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/" element={<AdminLogin />} />

              </Routes>
              </main>
    </div>
    // </BrowserRouter>
   
        
  
    
  );
}

export default App