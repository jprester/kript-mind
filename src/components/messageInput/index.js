import React from 'react';

export default function MessageInput(props) {
  return (
    <div>
      <textarea value={ props.currentText } onChange={ props.inputChange } onKeyPress={ props.keyPress } />
      <button onClick={ props.onSendBtnClick }>Send</button>
    </div>
  );
}
