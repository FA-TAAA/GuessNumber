"use strict";

let minimumRange;
let maximumRange;
let inGameTriesCounter;
let numberToGuess;

function setGameParameters(minRange, maxRange, tries) {
  minimumRange = minRange;
  maximumRange = maxRange;
  inGameTriesCounter = tries;
}

function generateNumberToGuess() {
  numberToGuess =
    Math.trunc(Math.random() * (maximumRange - minimumRange) + minimumRange) +
    1;
}

function checkGuess(userGuess) {
  inGameTriesCounter--;
  if (userGuess == numberToGuess) {
    return "Correct !";
  } else if (userGuess > numberToGuess) {
    return "Too Big !";
  } else if (userGuess < numberToGuess) {
    return "Too Small !";
  }
}
