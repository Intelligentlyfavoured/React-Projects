import { useState } from 'react'
import './App.css'
import { BrowserRouter as Routes, Route } from "react-router-dom";
import Header from './Modules/Dashboard/header'
import Sidebar from './Modules/Navbar/Navbar'
import Home from './Modules/Dashboard/home';
import Games from "./Modules/Dashboard/games";
import Categories from "./Modules/Dashboard/categories";
import Gamers from "./Modules/Dashboard/gamers";
import Inventory from "./Modules/Dashboard/inventory";
import Reports from "./Modules/Dashboard/reports";
import Settings from "./Modules/Dashboard/settings";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      {/* <Home/> */}
      <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/gamers" element={<Gamers />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
              </main>
    </div>
   
   
        
  
    
  );
}

export default App