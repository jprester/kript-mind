const _ = require("lodash");
const fetch = require('node-fetch');

const apiAddress = 'https://rest.coinapi.io';
const apiVersion = 'v1';

const coinApiAddress = 'https://rest.coinapi.io';
const coinApiKey = process.env.REACT_APP_COINAPI_KEY;
const coinApiVersion = 'v1';

const stringSimilarity = require('string-similarity');

const teststring = process.env.MY_VAR;

const phraseList = [
  {"phraseId": "p19", "text": "hello", "responseId": "r2"},
  {"phraseId": "p1", "text": "how are you", "responseId": "r1"},
  {"phraseId": "p2", "text": "how are you today", "responseId": "r1"},
  {"phraseId": "p3", "text": "greetings", "responseId": "r2"},
  {"phraseId": "p4", "text": "good morning", "responseId": "r2"},
  {"phraseId": "p5", "text": "good evening", "responseId": "r2"},
  {"phraseId": "p6", "text": "hope you are having a nice day", "responseId": "r2"},
  {"phraseId": "p7", "text": "can you help me", "responseId": "r3"},
  {"phraseId": "p8", "text": "what can I do here", "responseId": "r3"},
  {"phraseId": "p9", "text": "what are your functions", "responseId": "r7"},
  {"phraseId": "p10", "text": "show me what you can do", "responseId": "r3"},
  {"phraseId": "p11", "text": "what can I ask you", "responseId": "r7"},
  {"phraseId": "p11", "text": "what kind of services", "responseId": "r7"},
  {"phraseId": "p12", "text": "what can you tell me about cryptos", "responseId": "r4"},
  {"phraseId": "p13", "text": "do cryptos make sense", "responseId": "r4"},
  {"phraseId": "p14", "text": "do cryptos have a future", "responseId": "r2"},
  {"phraseId": "p15", "text": "what are the most important facts about cryptocurrencies", "responseId": "r2"},
  {"phraseId": "p16", "text": "how can I get cryptos", "responseId": "r2"},
  {"phraseId": "p17", "text": "where can I buy cryptos", "responseId": "r2"},
  {"phraseId": "p18", "text": "what is the best exchange for buying cryptos", "responseId": "r2"},
  {"phraseId": "p19", "text": "what is the best exchange for buying cryptos", "responseId": "r2"},
  {"phraseId": "p20", "text": "what is your name", "responseId": "r4"},
  {"phraseId": "p21", "text": "what are you", "responseId": "r5"},
  {"phraseId": "p21", "text": "who are you", "responseId": "r5"},
  {"phraseId": "p22", "text": "what can you do", "responseId": "r7"},
];

const failMessages = ["Sorry but I didnt get this.", "I did not understand your message.", "What did u say?", "Unfortunately my programmer was too lazy, and he didnt anticipate this question. Try asking something else."];

const responseList = [
  {"responseId": "r1", "responseList": ["I am ok", "I am very well, thanks for asking"]},
  {"responseId": "r2", "responseList": ["greetings", "hello dear human", "Hi! How can I be of service?"]},
  {"responseId": "r3", "responseList": ["Sure I can give you some crypto information", "let me know what you are interested about", "I offer wide range of services"]},
  {"responseId": "r4", "responseList": ["I am Kript Mind, cryptocurrency chatbot", "my name is Kript Mind, cryptocurrency chatbot", "it is: Kript Mind, cryptocurrency chatbot"]},
  {"responseId": "r5", "responseList": ["I am a cryptocurrency chatbot", "I am a bot that can give u info about cryptocurrencies"]},
  {"responseId": "r7", "responseList": ["So you can ask me: 'what is the current price of bitcoin?' 'Where I can buy bitcoin and stuff' etc.. "]}
];

const cryptoCurrencyCollection = [
  {"ethereum": ["eth", "ethereum", "ether"]},
  {"bitcoin": ["btc", "bitcoin", "bcoin", "bitcoins"]},
  {"ripple": ["xlm", "ripple", "ripples"]},
  {"cryptocurrency": ["crypto", "cryptos", "cryptocurrency", "cryptocurrencies"]},
  {"bitcoin_cash": ["bch", "bitcoin cash", "bcash", "btrash"]},
  {"stellar": ["stellar", "stellar lumens", "xml", "lumens"]},
  {"cardano": ["cardano", "ada"]}
];

const cryptoCurrencySymbols = {
  "ethereum": "eth",
  "bitcoin": "btc",
  "litecoin": "ltc",
  "ripple": "xrp",
  "bitcoin_cash": "bch",
  "cardano": "ada",
  "stellar": "xml",
  "eos": "eos"
};

const actionsCollection = [
  {"getPrice": ["price", "value", "worth", "pay"]},
  {"getInfo": ["about", "info", "information", "how", "where", "what is"]}
];

const timeCollection = [
  {"past": ["last week", "last year", "last month", "previously", "in the past", "past", "yesterday"]},
  {"now": ["now", "current", "currently", "today", "at the moment"]},
  {"future": ["future", "next year", "next week"]},
  {"chooseDate": []}
];

const regx1 = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/; // patern match 03/05/2012
const regx2= /\b(?:(?:Mon)|(?:Tues?)|(?:Wed(?:nes)?)|(?:Thur?s?)|(?:Fri)|(?:Sat(?:ur)?)|(?:Sun))(?:day)?\b[:\-,]?\s*(?:(?:jan|feb)?r?(?:uary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|oct(?:ober)?|(?:sept?|nov|dec)(?:ember)?)\s+\d{1,2}\s*,?\s*\d{4}/i;
const regx4 = /(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{2})/;
const regx5 = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
const regx6 = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/g;

function phraseIsQuestion(phrase) {
  let lastElement = phrase.substr(phrase.length - 1);
  if(lastElement === "?") {
    return true;
  }

  return false;
}

function stringSimilaritySearch(phraseToAnalyse) {
  let matchingPhraseObject = _.find(phraseList, (value) => {
    return stringSimilarity.compareTwoStrings(value.text, phraseToAnalyse) > 0.9;
  }) || {};

  if (matchingPhraseObject.hasOwnProperty('responseId')) {
    let answerId = matchingPhraseObject.responseId;
    let responseObject = _.find(responseList, { "responseId": answerId }) || {};

    return randomizeArrayReturn(responseObject.responseList);
  }

  return;
}

async function categorySearch(semanticObject) {
  semanticObject = semanticObject || {};

  let time = semanticObject.time || {};
  let action = semanticObject.action || {};
  let subject = semanticObject.subject || {};

  console.log("----- THIS IS THE ACTION: ", action);

  console.log("----- THIS IS THE CURRENCY: ", subject);

  if(!_.isEmpty(time) && subject.category) {
    return await getCryptoPriceTime(semanticObject);
  } else if (subject.category && action.category) {
    return getWikiText(subject.category);
  } else if (subject.category) {
    return "Sorry, I dont understand the question. However, I did notice that u mentioned " + subject.category + " in your question so I recommend you ask more specific questions. For example: 'what is the current " + subject.category + " price?, 'How much was " + subject.category + " price on x.date' or 'what is " + subject.category + " ?' ... ";
  } else {
    return;
  }
};

function checkDateFormat (date) {
  if(!date) {
    return;
  }

  let dateArray = [];
  let formattedDate;
  let newDate;

  if(date.match(regx6)) {
    return date;
  }

  if (date.indexOf(".") > -1) {
    formattedDate = date.replace(/\./g, '-');
  } else if(date.indexOf("/")) {
    formattedDate = date.replace(/\//g, '-');
  }

  dateArray = formattedDate.split("-");

  if (!dateArray.length || dateArray.length !== 3) {
    return;
  }

  if (dateArray[2].slice(0, 2) === "20" && dateArray[2].length === 4) {
    let tempItem = dateArray[2];

    dateArray[2] = dateArray[0];
    dateArray[0] = tempItem;
  }

  if (dateArray[1].length < 2) {
    dateArray[1] = "0" + dateArray[1];
  }

  if (dateArray[2].length < 2) {
    dateArray[2] = "0" + dateArray[2];
  }

  newDate = dateArray.join("-");

  if (newDate.match(regx6)) {
    return newDate;
  }

  return;
};

async function getCryptoValue(cryptoType, fiatType, chooseDate) {
  let url = `${coinApiAddress}/${coinApiVersion}/exchangerate/${cryptoType}/${fiatType}`;

  const selectedDate = checkDateFormat(chooseDate);

  if(chooseDate && selectedDate) {
    url = url + `?time=${selectedDate}`;
  } else if (chooseDate && !selectedDate) {
    return;
  }

  console.log(url);

  const cryptoValuePromise = await fetch(url, { method: 'GET', headers: {
    'Content-Type': 'application/json',
    'X-CoinAPI-Key': coinApiKey}
  });

  const cryptoValue = await cryptoValuePromise.json();

  return cryptoValue.rate || '';
};

async function getWikiText(info) {
  let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=raw&redirects=1&titles=${info}`;

  const cryptoTextPromise = await fetch(url, { method: 'GET', headers: {
    'Content-Type': 'application/json'}
  });

  const cryptoText = await cryptoTextPromise.json();

  return _.get(_.find(cryptoText.query.pages), "extract");

  // console.log("----- Wiki text for coin query: ", _.get(_.find(cryptoText.query.pages), "extract"));
};

async function getCryptoPriceTime (data) {
  if (!data) {
    return;
  }

  data = data || {};

  let time = data.time || {};
  console.log("data structure: " + JSON.stringify(data));

  const cryptoId = cryptoCurrencySymbols[data.subject.category].toUpperCase();
  let cryptoValue;

  console.log(time);

  if (time.category === "chooseDate") {
    cryptoValue = await getCryptoValue(cryptoId, 'USD', time.keyword);
  } else {
    cryptoValue = await getCryptoValue(cryptoId, 'USD');
  }

  if (!cryptoValue) {
    return `Apologies, but I wasnt able to get that information for ${data.subject.category}. It is possible that there is no price for that date. Also check if the date is in correct format.`;
  }

  let tense = "";
  let startText = time.keyword || "Currently";

  if (time.category === "now") {
    tense = "is";
  } else if (time.category === "past" || "chooseDate") {
    tense = "was";
    startText = "On " + startText;
  }

  return `${startText} price of ${data.subject.category} ${tense} ${cryptoValue} `;
}

async function responseAlgorithm(text) {
  const semanticObject = createSemanticObject(text);

  const categorySearchResult = await categorySearch(semanticObject);
  const stringSimilaritySearchResult = await stringSimilaritySearch(text);

  const finalResponse = stringSimilaritySearchResult || categorySearchResult || randomizeArrayReturn(failMessages) || "I didnt understand that, sorry.";
  ;

  console.log(finalResponse);
}

function randomizeArrayReturn(array) {
  if(!array || !(Array.isArray(array))) {
    return;
  }

  return array[Math.floor(Math.random() * array.length)];
}


function createSemanticObject(phrase) {
  if(phrase) {
    let cleanString = phrase.replace(/[|&;$%@"<>()+?]/g, "").toLowerCase();

    return {
      time: searchResult(timeCollection, cleanString, true),
      action: searchResult(actionsCollection, cleanString) || "",
      isQuestion: phraseIsQuestion(phrase),
      subject: searchResult(cryptoCurrencyCollection, cleanString) || "",
      contentType: "sentence" || "list" || "table"
    };
  }
}

function scanForDate(text) {
  let textArray = text.split(" ");
  let dateMatch;

  dateMatch = _.find(textArray, (value) => {
    console.log(value);
    return value.match(regx1) || value.match(regx5) || value.match(regx2) || value.match(regx6);
  }) || "";

  console.log("date match: " + JSON.stringify(dateMatch));

  return dateMatch;
}

function searchResult (categoryCollection, phrase, searchDate) {
  let category;
  let result = {};

  if(searchDate) {
    console.log(searchDate);
    let timeVar = scanForDate(phrase);

    console.log("timeVar: " + timeVar);
    if (timeVar) {
      return result = {
        category: "chooseDate",
        keyword: timeVar
      };
    }
  }

  _.forEach(categoryCollection, function(value, key) {
    _.forEach(value, function(value, key) {
      category = key;
      _.forEach(value, function(value) {
        if(teststring.indexOf(value) > -1) {
          result = {
            category: category,
            keyword: value
          };
          return;
        }
      });
      return;
    });
  });

  return result;
}

responseAlgorithm(teststring);

/*
    List of responses:

    1. the current price of {cryptocurrency} is y (in dollars but later we can add multiple fiat currencies)
    2. the price of {cryptocurrency} on {certain date} is y
    3. This crypto is ... {content}.
    4. I can buy {cryptocurrency} on this exchanges: ....
    5.

*/