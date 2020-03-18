export const firtsLetters = fullName =>
  fullName.replace(
    /([a-zà-ú])([a-zà-ú]*\s)([a-zà-ú]{2,3}\s)?([a-zà-ú])?(.+)?/i,
    '$1$4'
  );

export const onlyTwoNames = fullName =>
  fullName.replace(/([a-zà-ú]+\s([a-zà-ú]{2,3}\s)?[a-zà-ú]+)(.*)/i, '$1');

export const yet100Digits = text => text.replace(/(.{120})(.+)/, '$1...');

export const atLeastTwoNames = /([a-zà-ú]+\s)([a-zà-ú]{2,3}\s)?([a-zà-ú]{4,})/i;

export const validCep = /\d{5}-\d{3}/;
