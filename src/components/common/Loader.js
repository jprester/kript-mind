import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ isLoading }) => (
  <div className="loader" style={ {'display': isLoading ? 'block' : 'none'} }>
    <p className="loader-text">KriptMind is thinking...</p>
    <img src="img/ajax-loader_squares.gif" alt='spinner'/>
  </div>
);

export default Loader;

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
};