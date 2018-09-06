import React from 'react';

export default function MessageForm(props) {
  return (
    <textarea value={ props.currentText } onChange={ props.inputChange } onKeyPress={ props.keyPress } />
  );
}
