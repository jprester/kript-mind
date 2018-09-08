import React from 'react';

const Message = props => (
  <li className={ props.author }>
    <p className="message-text">{ props.text }</p>
  </li>
);

export default Message;