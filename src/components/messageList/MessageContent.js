import React from 'react';
import PropTypes from 'prop-types';

const MessageContent = props => {
  const { messageText } = props;

  if(messageText) {
    return (
      <p className="message-text">{ messageText }</p>
    );
  }
};

export default MessageContent;

MessageContent.propTypes = {
  messageText: PropTypes.string.isRequired
};