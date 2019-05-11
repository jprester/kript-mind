export const msgAuthor = {
  user: "user",
  bot: "bot"
};

export const config = {
  appVersion: "0.1.0"
};

export const options = {
  "phrase_size": {
    "min_length": 6,
    "max_length": 180
  }
};

export const specialCharRegex = /[~`!#$%^&*+=[\]\\';/{}|\\:]/g;
export const dateRegex1 = /\d{4}[-/.](0?[1-9]|1[012])[-/.](0?[1-9]|[12][0-9]|3[01])*/g; // match year-month-day or year.month.day
export const dateRegex2 = /\b(?:(?:Mon)|(?:Tues?)|(?:Wed(?:nes)?)|(?:Thur?s?)|(?:Fri)|(?:Sat(?:ur)?)|(?:Sun))(?:day)?\b[:\-,]?\s*(?:(?:jan|feb)?r?(?:uary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|oct(?:ober)?|(?:sept?|nov|dec)(?:ember)?)\s+\d{1,2}\s*,?\s*\d{4}/i;
export const dateRegex3 = /^\s*(3[01]|[12][0-9]|0?[1-9])[./-](1[012]|0?[1-9])[./-]((?:19|20)\d{2})\s*$/; // match day-month-year or day.month.year
