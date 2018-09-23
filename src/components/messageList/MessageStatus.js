import React from 'react';
import PropTypes from 'prop-types';

const MessageStatus = props => {
  if (props) {
    const {
      authorType,
      hourAndMinute,
      date
    } = props;

    return (
      <div className="message-status">
        <p className="author-icon"><img src={ authorType === "user" ? "img/message_human_image.png" : "img/message_bot_image.png" } alt="" /></p>
        <p className="author-name">{ authorType }</p>
        <p className="message-time">{ hourAndMinute }</p>
        <p className="message-date">{ date }</p>
      </div>
    );
  }
};

export default MessageStatus;

MessageStatus.propTypes = {
  authorType: PropTypes.string.isRequired,
  date: PropTypes.string,
  hourAndMinute: PropTypes.string
};

MessageStatus.defaultProps = {
  authorType: "user"
};

