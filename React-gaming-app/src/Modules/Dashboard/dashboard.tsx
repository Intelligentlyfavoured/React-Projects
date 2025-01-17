// import { useState } from 'react'
// import '../../App.css'
// import { Routes, Route } from "react-router-dom";
// import Header from './header'
// import Sidebar from '../Navbar/Navbar'
// import Home from './home';
// import Games from "./games";
// import Categories from "./categories";
// import Gamers from "./gamers";
// import Inventory from "./inventory";
// import Reports from "./reports";
// import Settings from "./settings";


// function Dashboard() {
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }

//   return (
//     // <BrowserRouter>
//     <div className='grid-container'>
//       <Header OpenSidebar={OpenSidebar}/>
//       <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//        {/* <Home/>  */}
//       <main>
//               <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/games" element={<Games />} />
//                 <Route path="/categories" element={<Categories />} />
//                 <Route path="/gamers" element={<Gamers />} />
//                 <Route path="/inventory" element={<Inventory />} />
//                 <Route path="/reports" element={<Reports />} />
//                 <Route path="/settings" element={<Settings />} />
               
             

//               </Routes>
//               </main>
//     </div>
//     // </BrowserRouter>
   
        
  
    
//   );
// }

// export default Dashboard