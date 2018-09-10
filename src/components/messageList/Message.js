import React from 'react';

import MessageStatus from './MessageStatus';
import MessageContent from './MessageContent';

const Message = props => {
  const { author } = props;

  if (props && props.text) {
    console.log("props of the message: ", props);
    return (
      <li className={ author }>
        <MessageStatus authorType={ author } date={ props.date } hourAndMinute={ props.hourAndMinute }/>
        <MessageContent messageText={ props.text } />
      </li>
    );
  }
};

export default Message;