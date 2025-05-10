import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // import the CSS file

function Header() {
  return (
    <header className="header">
      <h1 className="logo">URL Shortener</h1>
      <nav className="nav">
        <Link to="/" className="link">Home</Link>
        <Link to="/register" className="link">Register</Link>
        <Link to="/login" className="link">Login</Link>
        <Link to="/shorten-url" className='link'>Shorten URL</Link>
        <Link to="/my-urls" className='link'>My URLs</Link>

      </nav>
    </header>
  );
}

export default Header;
