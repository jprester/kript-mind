import React from 'react';

const Loader = ({ isLoading }) => (
  <div className="loader" style={ {'display': isLoading ? 'block' : 'none'} }>
    <img src="ajax-loader.gif" alt='spinner'/>
  </div>
);

export default Loader;