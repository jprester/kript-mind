import fetch from 'node-fetch';
import { get, find } from 'lodash';
import dayjs from 'dayjs';

import { cryptoCompareAddress } from './apiConfig';
import { checkDateFormat } from '../helpers/utils';


export async function getCryptoValue(cryptoType, fiatType, chooseDate) {
  const formatedDate = checkDateFormat(chooseDate.trim());

  if (chooseDate && !formatedDate && !dayjs(chooseDate).isValid()) {
    return;
  }

  const date = chooseDate ? dayjs(formatedDate).unix() : dayjs().unix();
  const url = `${cryptoCompareAddress}/data/dayAvg?fsym=${cryptoType}&tsym=${fiatType}&toTs=${date}`;

  const cryptoValuePromise = await fetch(url,
    { method: 'GET', headers: {'Content-Type': 'application/json'}}
  );

  const cryptoValue = await cryptoValuePromise.json();

  return cryptoValue[fiatType.toUpperCase()] || '';
};


export async function getCryptoList() {
  const url = `https://api.coinmarketcap.com/v2/listings/`;

  const cryptoListingsPromise = await fetch(url, {method: 'GET'});

  const cryptoList = await cryptoListingsPromise.json();

  return cryptoList;
};

export async function getWikiText(query) {
  const wikiQuery = (query).replace(/ /g, '_');

  const url = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&exsentences=5&exsectionformat=raw&redirects=1&titles=${wikiQuery}`;

  const cryptoTextPromise = await fetch(url, { method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resultObject = await cryptoTextPromise.json();

  const cryptoText = get(find(resultObject.query.pages), "extract");

  if (cryptoText && cryptoText.length > 30) {
    return cryptoText;
  }

  return `I didn't found anything about ${query}, sorry.`;
};