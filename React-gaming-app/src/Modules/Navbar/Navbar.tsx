import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BsGrid1X2Fill, 
  BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill 
} from 'react-icons/bs';
import {BiSolidUserCircle} from 'react-icons/bi';
import { IoGameController } from "react-icons/io5";
import './Navbar.css';
// prop types
type SidebarProps = {
  openSidebarToggle: boolean; // Determines if the sidebar is responsive
  OpenSidebar: () => void;    // Function to toggle the sidebar
};

const Sidebar: React.FC<SidebarProps> = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BiSolidUserCircle className="icon_header" /> ADMIN
        </div>
        <span className="menu-icon" onClick={OpenSidebar}>
          ☰
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to='/home'>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/games">
            <IoGameController className="icon" /> Games
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/categories">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/gamers">
            <BsPeopleFill className="icon" /> Gamers
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/inventory">
            <BsListCheck className="icon" /> Inventory
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/reports">
            <BsMenuButtonWideFill className="icon" /> Reports
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/settings">
            <BsFillGearFill className="icon" /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

