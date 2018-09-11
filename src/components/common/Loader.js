import React from 'react';

const Loader = ({ isLoading }) => (
  <div className="loader" style={ {'display': isLoading ? 'block' : 'none'} }>
    <p className="loader-text">KriptMind is thinking...</p>
    <img src="ajax-loader_squares.gif" alt='spinner'/>
  </div>
);

export default Loader;