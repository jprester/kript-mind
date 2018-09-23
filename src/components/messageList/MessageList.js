import React from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

const MessageList = props => {
  const { messages } = props;

  if (messages.length) {
    return (
      <ul className="message-list">
        {messages && messages.map(message =>
          <Message
            author={ message.author }
            date={ message.date }
            hourAndMinute={ message.hourAndMinute }
            key={ message.id }
            text={ message.content }
          />)}
      </ul>
    );
  }
};

export default MessageList;

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};