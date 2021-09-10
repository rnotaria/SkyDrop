import { wordMap } from "./wordMap";

export function getWords(addr) {
  if (addr == null) {
    return [];
  }

  const addrSplit = addr.match(/.{1,4}/g);
  let words = [];

  addrSplit.forEach((x) => {
    words.push(wordMap.revGet(x));
  });

  return words;
}