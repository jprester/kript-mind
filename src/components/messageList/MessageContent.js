import React from 'react';

const MessageContent = props => {
  if(props.messageText) {
    return (
      <p className="message-text">{ props.messageText }</p>
    );
  }
};

export default MessageContent;