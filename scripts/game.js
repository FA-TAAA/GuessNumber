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

function generateNumberToGuess(minRange, maxRange) {
  numberToGuess =
    Math.floor(Math.random() * (maxRange - minRange) + minRange) + 1;
}

function checkGuess(userGuess) {
  inGameTriesCounter--;
  if (inGameTriesCounter <= 0) {
    return "No More Tries !";
  }
  if (userGuess == numberToGuess) {
    return "Correct !";
  } else if (userGuess > numberToGuess) {
    return "Too Big !";
  } else if (userGuess < numberToGuess) {
    return "Too Small !";
  }
}
