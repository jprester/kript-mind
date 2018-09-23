import React from 'react';

import { config } from '../../helpers/constants';

const Footer = () => (
  <footer>
    <div className="main-container">
      <div className="footer-text-left">v{config.appVersion}</div>
      <div className="footer-text-right">KriptMind, Janko Prester 2018</div>
    </div>
  </footer>
);

export default Footer;