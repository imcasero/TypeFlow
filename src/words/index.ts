type Words = {
  [key: string]: string[];
};
const words: Words = {
  en: [
    "the",
    "of",
    "and",
    "to",
    "a",
    "in",
    "that",
    "it",
    "with",
    "as",
    "for",
    "on",
    "was",
    "at",
    "by",
    "an",
    "be",
    "this",
    "which",
    "or",
    "from",
    "but",
    "not",
    "are",
    "you",
    "have",
    "had",
    "they",
    "he",
    "she",
    "we",
    "I",
    "all",
    "one",
    "two",
    "three",
    "four",
    "five",
  ],
};

export function loadWords(language: string, length: number): string {
  if (!Object.prototype.hasOwnProperty.call(words, language)) {
    throw new Error(`Language "${language}" is not supported.`);
  }

  const selectedWords: string[] = words[language];

  const shuffledWords: string[] = [...selectedWords];
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledWords[i], shuffledWords[randomIndex]] = [
      shuffledWords[randomIndex],
      shuffledWords[i],
    ];
  }

  const selectedSlice = shuffledWords.slice(0, length);
  return selectedSlice.join(" ");
}
