import React from 'react';

const Header = () => (
  <div className="header-container">
    <div className="header-content-logo">
      <img className="logo-image" src="./km_logo.png" alt="logo"></img>
      <h1 className="logo-text">KriptMind</h1>
    </div>

    <div className="header-content-navigation">
      <ul>
        <li><a href="./">About</a></li>
        <li><a href="./">Contacts</a></li>
      </ul>
    </div>
  </div>
);

export default Header;