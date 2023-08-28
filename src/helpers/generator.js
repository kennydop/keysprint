const passages = require("../assets/typing_tests/passages.json");

const levelToLetters = {
  1: ["a", "s", "d", "f"],
  2: ["j", "k", "l", ";"],
  3: ["a", "s", "d", "f", "j", "k", "l", ";"],
  4: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  5: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f"],
  6: [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "j",
    "k",
    "l",
    ";",
  ],
  7: ["z", "x", "c", "v", "b", "n", "m"],
  8: [
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "j",
    "k",
    "l",
    ";",
  ],
  9: [
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "j",
    "k",
    "l",
    ";",
  ],
  10: [
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "j",
    "k",
    "l",
    ";",
  ],
};

function generatePassageFromLetters(level, length = 100) {
  const letters = levelToLetters[level];
  let passage = "";
  let word = "";

  while (passage.length < length) {
    const nextLetter = letters[Math.floor(Math.random() * letters.length)];
    word += nextLetter;

    // Add a space after 2-6 characters to form a "word"
    if (word.length >= Math.floor(Math.random() * 5 + 2)) {
      passage += word + " ";
      word = "";
    }
  }

  return passage.slice(0, length).trim();
}

function selectPassage() {
  const randomIndex = Math.floor(Math.random() * passages.length);
  return passages[randomIndex];
}

exports.generatePassage = (level) => {
  if (level < 9) {
    return generatePassageFromLetters(level);
  } else {
    return selectPassage();
  }
};
