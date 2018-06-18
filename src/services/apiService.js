import fetch from 'node-fetch';

import { coinApiAddress, coinApiKey, coinApiVersion} from './apiConfig';

import { checkDateFormat } from './utils';

export async function getCryptoValue(cryptoType, fiatType, chooseDate) {
    let url = `${coinApiAddress}/${coinApiVersion}/exchangerate/${cryptoType}/${fiatType}`;

    const selectedDate = checkDateFormat(chooseDate);

    if(chooseDate && selectedDate) {
        url = url + `?time=${selectedDate}`;
    } else if (chooseDate && !selectedDate) {
        return;
    }

    const cryptoValuePromise = await fetch(url, { method: 'GET',  headers: {
        'Content-Type': 'application/json',
        'X-CoinAPI-Key': coinApiKey}
    });

    const cryptoValue = await cryptoValuePromise.json();

    return cryptoValue.rate || '';
};


export async function getCryptoList() {
    const url = `https://api.coinmarketcap.com/v2/listings/`;

    const cryptoListingsPromise = await fetch(url, {method: 'GET'});

    const cryptoList = await cryptoListingsPromise.json();

    return cryptoList;
};