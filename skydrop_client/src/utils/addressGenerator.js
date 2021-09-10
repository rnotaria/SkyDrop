import { wordMap } from "./wordMap";

export function getWords(addr) {
  const addrSplit = addr.match(/.{1,4}/g);
  let words = [];

  addrSplit.forEach((x) => {
    words.push(wordMap.revGet(x));
  });

  return words;
}
