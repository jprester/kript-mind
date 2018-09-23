import React from 'react';
import PropTypes from 'prop-types';

import MessageStatus from './MessageStatus';
import MessageContent from './MessageContent';

const Message = props => {
  const {
    author,
    date,
    hourAndMinute,
    text
  } = props;

  if (text) {
    return (
      <li className={ author }>
        <MessageStatus authorType={ author } date={ date } hourAndMinute={ hourAndMinute } />
        <MessageContent messageText={ text } />
      </li>
    );
  }
};

export default Message;

Message.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  hourAndMinute: PropTypes.string,
  text: PropTypes.string.isRequired
};