import { options } from './constants';

import { responseAlogrithm } from './botResponseService';

export async function parsePhrase(phrase) {
    if(!phrase || typeof phrase !== "string") {
        return "message was wrong"
    }

    return responseAlogrithm(phrase);
}

export const checkforErrors = text => {
    if(!text) {
        return "The message is empty.";
    }

    if(typeof text !== "string") {
        return "Please write text";
    }

    if(/[~`!#$%\^&*+=\[\]\\';,/{}|\\:]/g.test(text)) {
        return "Please dont use forbidden characters. (/,*, +, `, {, (, < ....) ";
    }

    if(text.length < options.phrase_size.min_length || text.length > options.phrase_size.max_length ) {
        return `Messages needs to have more than ${options.phrase_size.min_length} and less than ${options.phrase_size.max_length} characters.`;
    }

    return "";
}

export async function getMessage (message) {
    if(!message && typeof message !== "string") {
        return "Message is empty or in incorrect format.";
    }

    return await parsePhrase(message);
};