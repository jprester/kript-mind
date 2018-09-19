import React from 'react';

import './App.css';
import { getMessage, checkforErrors } from './services/chatService';
import MessageInput from './components/messageInput';
import MessageList from './components/messageList/MessageList';
import Header from './components/header/';
import Footer from './components/footer/';
import { msgAuthor } from './components/common/Constants.js';
import { initialMessages } from './services/chatData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMsg: '',
      currentMessage: '',
      messages: [],
    };

    this.onSendChatClick = this.onSendChatClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onInputText(event) {
    this.setState({
      currentMessage: event.target.value,
    });
  };

  async addMessage (source, text) {
    const lastItem = this.state.messages[this.state.messages.length - 1];
    const time = new Date();
    const date = time.getUTCDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();
    const hourAndMinute = time.getHours() + ":" + time.getMinutes();

    this.setState({
      currentMessage: "",
      messages: [...this.state.messages, {
        id: lastItem ? lastItem.id + 1 : 0,
        content: text,
        date: date,
        hourAndMinute: hourAndMinute,
        author: source || msgAuthor.bot
      }]
    });
  }

  componentDidMount() {
    if (!this.state.currentMessage) {
      this.addInitialMessage();
    }
  }

  addInitialMessage () {
    if (!this.state.messages.length) {
      this.setState({
        errorMsg: '',
        loading: true
      });
      setTimeout(() => {
        this.addMessage(msgAuthor.bot, initialMessages[0]);
        this.setState({
          loading: false
        });
      }, 400);
    }
  }

  responseDelay() {
    setTimeout(this.botResponse.bind(this), 400);
  }

  async botResponse() {
    if (this.state.messages[this.state.messages.length - 1]) {
      const botMessage = await getMessage(this.state.messages[this.state.messages.length - 1].content);
      this.addMessage(msgAuthor.bot, botMessage);
    }

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

    this.addMessage(msgAuthor.user, message);
    this.responseDelay();
  };

  handleKeyPress (event) {
    if(event.key === 'Enter'){
      event.preventDefault();
      this.onSendChatClick();
    }
  }

  displayMessages() {
    if (this.state.messages.length > 0) {
      return <MessageList messages={ this.state.messages }/>;
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="chat-content">
          <div className="main-container">
            {this.displayMessages()}
          </div>
        </div>
        <MessageInput
          inputChange={ this.onInputText.bind(this) }
          keyPress={ this.handleKeyPress }
          currentText={ this.state.currentMessage }
          onSendBtnClick={ this.onSendChatClick }
          errorMsg= { this.state.errorMsg }
          isLoading={ this.state.loading }
        />
        <Footer />
      </div>
    );
  }
}

export default App;
