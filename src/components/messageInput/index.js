import React from 'react';

export default function MessageInput(props) {
  return (
    <div className="message-input-container">
      <div className="main-container">
        <textarea value={ props.currentText } onChange={ props.inputChange } onKeyPress={ props.keyPress } placeholder="Type something ..."/>
        <button onClick={ props.onSendBtnClick }>Send</button>
        <div className="error-msg">{ props.errorMsg }</div>
      </div>
    </div>
  );
}
