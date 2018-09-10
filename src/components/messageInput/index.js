import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#76DBD1',
    },
  },
});

const MessageInput = (props) => {
  const { classes } = props;

  return (
    <div className="message-input-container">
      <div className="main-container">
        <FormControl className="form-control">
          <Input id="name-simple"
            className="text-input"
            multiline
            classes={ {
              underline: classes.cssUnderline,
            } }
            placeholder="Type something ..."
            onChange={ props.inputChange }
            onKeyPress={ props.keyPress }
            value={ props.currentText }/>
        </FormControl>
        <button onClick={ props.onSendBtnClick }>Send</button>
        <div className="error-msg">{ props.errorMsg }</div>
      </div>
    </div>
  );
};

export default withStyles(styles)(MessageInput);

