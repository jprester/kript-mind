import React from 'react';

const Header = () => (
  <div className="header-container">
    <div className="main-container">
      <div className="header-content-logo">
        <h1><a href = "./" className="logo-link"><img className="logo-image" src="./km_logo.png" alt="logo"></img><span className="logo-text"> <span className="logo-color-1">Kript</span><span className="logo-color-2">Mind</span></span></a></h1>
      </div>

      <div className="header-content-navigation">
        <ul className="navigation-links">
          <li><a href="./">About</a></li>
          <li><a href="./">Contacts</a></li>
        </ul>
      </div>
    </div>
  </div>
);

export default Header;