import React from 'react';

import Message from './Message';

export default class MessageList extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.messages && this.props.messages.map(message =>
            <Message author={ message.author } key={ message.id } text={ message.content } />)}
        </ul>
      </div>
    );
  }
}