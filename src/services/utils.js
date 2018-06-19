import { regx1 } from './constants'

export const checkDateFormat = (date) => {
    if(!date) {
        return;
    }

    let dateArray = [];
    let formattedDate;
    let newDate;

    if(date.match(regx1)) {
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

    if (newDate.match(regx1)) {
        return newDate;
    }

    return;
};

export const randomizeArrayReturn = (array) => {
    if(!array || !(Array.isArray(array))) {
        return;
    }

    return array[Math.floor(Math.random() * array.length)];
}