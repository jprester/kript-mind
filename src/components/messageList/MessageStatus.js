import React from 'react';

const MessageStatus = props => {
  if (props) {
    console.log("message status props: ", props);
    console.log("the author type: ", props.authorType);

    return (
      <div className="message-status">
        <p className="author-icon"><img src={ props.authorType === "user" ? "message_human_image.png" : "message_bot_image.png" } alt="" /></p>
        <p className="author-name">{props.authorType}</p>
        <p className="message-time">{props.hourAndMinute}</p>
        <p className="message-date">{props.date}</p>
      </div>
    );
  }
};

export default MessageStatus;