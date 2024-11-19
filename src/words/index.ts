// Define the structure of the words object with a type
type Words = {
  [key: string]: string[]; // Key is a language code, value is an array of words
};

// Declare the words object with strong typing
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

export function loadWords(language: string): string[] {
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

  return shuffledWords.slice(0, 15);
}
