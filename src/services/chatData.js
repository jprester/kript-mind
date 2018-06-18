export const phraseList = [
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
    {"phraseId": "p23", "text": "what kind of info can you give me",  "responseId": "r7"}
]

export const failMessages = ["Sorry but I didnt get this.", "I did not understand your message.", "What did u say?", "Unfortunately my programmer was too lazy, and he didnt anticipate this question. Try asking something else."];

export const responseList = [
    {"responseId": "r1", "responseList": ["I am ok", "I am very well, thanks for asking"]},
    {"responseId": "r2", "responseList": ["greetings", "hello dear human", "Hi! How can I be of service?"]},
    {"responseId": "r3", "responseList": ["Sure I can give you some crypto information", "let me know what you are interested about", "I offer wide range of services"]},
    {"responseId": "r4", "responseList": ["I am crypto bot", "my name is crypto bot", "it is: crypto bot"]},
    {"responseId": "r5", "responseList": ["I am a cryptocurrency chatbot", "I am a bot that can give u info about cryptocurrencies"]},
    {"responseId": "r7", "responseList": ["Well, you can ask me things like: 'what is the current price of bitcoin?' 'What was ethereum price on (yyyy)-(mm)-(dd) ' etc.. "]}
] 

export const cryptoCurrencyCollection = [
    {"ethereum": ["eth", "ethereum", "ether"]}, 
    {"bitcoin": ["btc", "bitcoin", "bcoin", "bitcoins"]}, 
    {"ripple": ["xlm", "ripple", "ripples"]},
    {"cryptocurrency": ["crypto", "cryptos", "cryptocurrency", "cryptocurrencies"]},
    {"bitcoin_cash": ["bch", "bitcoin cash", "bcash", "btrash"]},
    {"stellar": ["stellar", "stellar lumens", "xml", "lumens"]},
    {"cardano": ["cardano", "ada"]}
];

export const cryptoCurrencySymbols = {
    "ethereum": "eth",
    "bitcoin": "btc",
    "litecoin": "ltc",
    "ripple": "xrp",
    "bitcoin_cash": "bch",
    "cardano": "ada",
    "stellar": "xml",
    "eos": "eos"
}

export const actionsCollection = [
    {"getPrice": ["price", "value", "worth", "pay"]},
    {"getInfo": ["about", "info", "information", "how", "where", "what is"]}
];

export const timeCollection = [
    {"past": ["last week", "last year", "last month", "previously", "in the past", "past", "yesterday"]},
    {"now": ["now", "current", "currently", "today", "at the moment"]},
    {"future": ["future", "next year", "next week"]},
    {"chooseDate": []}
];