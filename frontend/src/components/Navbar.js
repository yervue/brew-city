import React from 'react'
import './css/nav.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">Brewery City Rental</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>

        <li><Link to="/users">Users</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
        <li><Link to="/videos">Videos</Link></li>

        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
