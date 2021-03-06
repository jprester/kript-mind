import _ from 'lodash';
import stringSimilarity from 'string-similarity';

import {
  phraseList,
  failMessages,
  responseList,
  cryptoCurrencyCollection,
  cryptoCurrencySymbols,
  actionsCollection,
  timeCollection
} from './chatData';

import { getCryptoValue, getWikiText } from './apiService';
import { randomizeArrayReturn } from '../helpers/utils';
import { dateRegex1, dateRegex2, dateRegex3 } from '../helpers/constants';

function phraseIsQuestion(phrase) {
  let lastElement = phrase.substr(phrase.length - 1);

  if(lastElement === "?") {
    return true;
  }

  return false;
}

function stringSimilaritySearch(phraseToAnalyse) {
  let matchingPhraseObject = _.find(phraseList, (value) => {
    return stringSimilarity.compareTwoStrings(value.text, phraseToAnalyse) > 0.8;
  }) || {};

  if (matchingPhraseObject.hasOwnProperty('responseId')) {
    let answerId = matchingPhraseObject.responseId;
    let responseObject = _.find(responseList, { "responseId": answerId }) || {};

    return randomizeArrayReturn(responseObject.responseList);
  }

  return;
}

async function categorySearch(semanticObject) {
  let time = semanticObject.time || {};
  let action = semanticObject.action || {};
  let subject = semanticObject.subject || {};

  if(!_.isEmpty(time) && subject.category) {
    return await getCryptoPriceTime(semanticObject);
  } else if (subject.category && action.category) {
    try {
      return await getWikiText(subject.keyword);
    } catch(err) {
      console.error(err);
      return "Sorry, I couldnt get this information.";
    }
  } else if (subject.category) {
    return "Sorry, I don't understand the question. However, I did notice that u mentioned " + subject.category + " in your question so I recommend you ask more specific questions. For example: 'what is the current " + subject.category + " price?, 'How much was " + subject.category + " price on x.date' or 'what is " + subject.category + " ?' ... ";
  } else {
    return;
  }
};

async function getCryptoPriceTime(data) {
  if (!data) {
    return;
  }

  data = data || {};

  if (!data.time || !cryptoCurrencySymbols[data.subject.category]) {
    return;
  }

  const time = data.time || {};

  const cryptoName = cryptoCurrencySymbols[data.subject.category];

  if (!cryptoName) {
    return;
  }

  const cryptoId = cryptoName.toUpperCase();
  let cryptoValue;

  cryptoValue = await getCryptoValue(cryptoId, 'USD', time.category === "chooseDate" ? time.keyword : "");
  if (!cryptoValue) {
    return `Apologies, but I wasn't able to get that information for ${data.subject.category}. It is possible that there is no price for that date. Also check if the date is in correct format.`;
  }

  let tense = "";
  let startText = time.keyword || "Currently";

  if (time.category === "now") {
    tense = "is";
  } else if (time.category === "past" || "chooseDate") {
    tense = "was";
    startText = "On " + startText;
  }

  return `${startText} price of ${data.subject.category} ${tense} ${Math.round(cryptoValue * 100) / 100} $`;
}

export async function responseAlgorithm(text) {
  const semanticObject = createSemanticObject(text);

  const categorySearchResult = await categorySearch(semanticObject);
  const stringSimilaritySearchResult = await stringSimilaritySearch(text);

  const finalResponse = stringSimilaritySearchResult || categorySearchResult || randomizeArrayReturn(failMessages) || "I did not understand that, sorry.";

  return finalResponse;
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
    return value.match(dateRegex1) || value.match(dateRegex2) || value.match(dateRegex3);
  }) || "";

  return dateMatch;
}

function searchResult(categoryCollection, phrase, searchDate) {
  let category;
  let result = {};

  if(searchDate) {
    let timeVar = scanForDate(phrase);

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
        if(phrase.indexOf(value) > -1) {
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