import React, { Component } from 'react';

import './App.css';
import { getMessage, checkforErrors } from './services/chatService';
import MessageBox from './components/messageBox';
import MessageList from './components/messageList/MessageList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMsg: '',
      currentMessage: '',
      messages: [],
    }

    this.onSendChatClick = this.onSendChatClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onInputText = event => {
    this.setState({
        currentMessage: event.target.value,
    });
  };

  async addMessage (source, text) {
    const lastItem = this.state.messages[this.state.messages.length - 1];

    this.setState({
      currentMessage: "",
      messages: [...this.state.messages, {
        id: lastItem ? lastItem.id + 1 : 0,
        content: text,
        timestamp: Date.now(),
        author: source || "bot"
      }]
    })
  }

  responseDelay() {
    setTimeout(this.botResponse.bind(this), 300);
  }

  async botResponse() {
    if (this.state.messages[this.state.messages.length - 1]) {
      const botMessage = await getMessage(this.state.messages[this.state.messages.length - 1].content);
      this.addMessage("bot", botMessage);
    }
    // this.addMessage("bot", getMessage(this.state.currentMessage));

    this.setState({ 
      loading: false
    });
  }

  onSendChatClick () {
    const message = this.state.currentMessage;
    const errorCheck = checkforErrors(message);

    if(errorCheck) {
      this.setState({
        errorMsg: errorCheck
      });

      return;
    }

    this.setState({ 
      errorMsg: '',
      loading: true
    });

    this.addMessage('user', message)
      // .then(() => this.botResponse());
    this.responseDelay();
  };

  handleKeyPress (event) {
    if(event.key === 'Enter'){
      event.preventDefault();
      console.log('enter press here! ');
      this.onSendChatClick();
    }
  }

  displayMessages() {
    if (this.state.messages.length > 0) {
      return <MessageList messages={this.state.messages}/>;
    }
  }

  render() {
    return (
      <div className="App">
        <div className='loader' style={{'position': 'fixed', 'top': '100px', 'left': '150px', 'display': this.state.loading ? 'block' : 'none'}}><img src={ require('./images/ajax-loader.gif') } alt='spinner'/></div>
        <h1>Crypto ChatBot</h1>
        {this.displayMessages()}
        <MessageBox inputChange={this.onInputText} keyPress={this.handleKeyPress} currentText={this.state.currentMessage} />
        <p>{this.state.errorMsg}</p>
        <button onClick={this.onSendChatClick}>Send</button>
      </div>
    );
  }
}

export default App;
