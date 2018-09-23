import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';

import Loader from '../../components/common/Loader';

const styles = theme => ({
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#76DBD1',
    },
  },
});

const MessageInput = (props) => {
  const {
    classes,
    isLoading,
    inputChange,
    currentText,
    onSendBtnClick,
    errorMsg,
    keyPress
  } = props;

  return (
    <div className="message-input-container">
      <div className="main-container">
        <Loader isLoading={ isLoading } />
        <FormControl className="form-control">
          <Input id="name-simple"
            className="text-input"
            multiline
            classes={ {
              underline: classes.cssUnderline,
            } }
            placeholder="Type something ..."
            onChange={ inputChange }
            onKeyPress={ keyPress }
            value={ currentText }/>
        </FormControl>
        <button onClick={ onSendBtnClick }>Send</button>
        <div className="error-msg">{ errorMsg }</div>
      </div>
    </div>
  );
};

export default withStyles(styles)(MessageInput);

MessageInput.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  currentText: PropTypes.string,
  errorMsg: PropTypes.string,
  inputChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  keyPress: PropTypes.func.isRequired,
  onSendBtnClick: PropTypes.func.isRequired
};

