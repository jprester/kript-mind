import React from 'react';

import Message from './Message';

const MessageList = props => {
  if (props.messages.length) {
    return (
      <ul>
        {props.messages && props.messages.map(message =>
          <Message author={ message.author } key={ message.id } text={ message.content } />)}
      </ul>
    );
  }
};

export default MessageList;
