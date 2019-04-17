# kript-mind

Cryptocurrency chatbot

## Sample App
Netlify link: https://kript-mind.netlify.com/

### Description
 Just ask the bot some basic question related to cryptocurrencies. 

for example:
- "What is the current price of {cryptocurrency} ?"
- "What was the price of {cryptocurrency} on {yyyy-mm-dd} ?"
- "What is Bitcoin?"
- "what are your functions?"
- "How can I buy crypto?"

The bot will be regulary updated with new conversational features.


#### Installation

1. npm install
2. npm start

NOTE: To get results about crypto prices you need to get CoinAPI API key. You can get the key here: https://coinapi.io/pricing?apikey. Once you get it, create .env file and assign your key to REACT_APP_COINAPI_KEY variable inside the .env.

#### Author
Janko Prester - contact me at janko.prester@gmail.com

#### Technical information
App UI was made with React while the logic was made with simple JS. It uses coinapi.io to get the crypto data and string-similarity node package to for processing strings.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


#### Version
v0.1.0

