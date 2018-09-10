import React from 'react';

import Message from './Message';

const MessageList = props => {
  if (props.messages.length) {
    console.log("props message contents: ", props.messages);
    return (
      <ul className="message-list">
        {props.messages && props.messages.map(message =>
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
