import _ from "lodash";
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

import { getCryptoValue } from './apiService';
import { randomizeArrayReturn } from './utils';
import { regx1, regx2, regx3, regx4 } from './constants';

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
    let currency = semanticObject.currency || {};

    if(!_.isEmpty(time) && currency.category) {
        return await getCryptoPriceTime(semanticObject);
    } else if (currency.category && action.getInfo) {
        return "Information is currently not available but I hope I will have some new updates soon.";
    } else if (currency.category) {
        return "Sorry, I dont understand the question. However, I did notice that u mentioned " + currency.category + " in your question so I recommend you ask more specific questions. For example: 'what is the current " + currency.category + " price?, 'How much was " + currency.category + " price on x.date' or 'what is " +  currency.category + " ?' ... ";
    } else {
        return;
    }
};

async function getCryptoPriceTime (data) {
    if (!data) {
        return;
    }

    data = data || {};

    if (!data.time || !cryptoCurrencySymbols[data.currency.category]) {
        return;
    }

    const time = data.time || {};

    const cryptoName = cryptoCurrencySymbols[data.currency.category];

    if (!cryptoName) {
        return;
    }

    const cryptoId = cryptoName.toUpperCase();
    let cryptoValue;

    cryptoValue = await getCryptoValue(cryptoId, 'USD', time.category === "chooseDate" ? time.keyword : "");

    if (!cryptoValue) {
        return `Apologies, but I wasnt able to get that information for ${data.currency.category}. It is possible that there is no price for that date. Also check if the date is in correct format.`;
    }

    let tense = "";
    let startText = time.keyword || "Currently";

    if (time.category === "now") {
        tense = "is";
    } else if (time.category === "past" || "chooseDate") {
        tense = "was";
        startText = "On " + startText;
    }

    return `${startText} price of ${data.currency.category} ${tense} ${cryptoValue} $`;
}

export async function responseAlogrithm(text) {
    const semanticObject = createSemanticObject(text);

    const categorySearchResult = await categorySearch(semanticObject);
    const stringSimilaritySearchResult = await stringSimilaritySearch(text);
 
    const finalResponse = stringSimilaritySearchResult || categorySearchResult || randomizeArrayReturn(failMessages) || "I didnt understand that, sorry.";
    ;

    return finalResponse;
}

function createSemanticObject(phrase) {
    let cleanString = phrase.replace(/[|&;$%@"<>()+?]/g, "").toLowerCase();

    return {
        time: searchResult(timeCollection, cleanString, true),
        action: searchResult(actionsCollection, cleanString) || "",
        isQuestion: phraseIsQuestion(phrase),
        currency: searchResult(cryptoCurrencyCollection, cleanString) || "",
        contentType: "sentence" || "list" || "table"
    };
}

function scanForDate(text) {
    let textArray = text.split(" ");
    let dateMatch;

    dateMatch = _.find(textArray, (value) => {
        return value.match(regx1) || value.match(regx2) || value.match(regx3) || value.match(regx4);
    }) || "";

   return dateMatch;
}

function searchResult (categoryCollection, phrase, searchDate) {
    let category;
    let result = {};

    if(searchDate) {
        let timeVar = scanForDate(phrase);

        if (timeVar) {
            return result = {
                category: "chooseDate",
                keyword: timeVar
            }
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
                    }
                    return;
                }
            });
            return;
        });
    });

    return result;
}