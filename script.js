"use strict";

const TYPING_INTERVAL = 1000; // in ms
const minimumRange = 20;
const maximumRange = 100;

const playerInput = document.querySelector("#number-input");
const indicator = document.querySelector(".indicator");

let typingTimer;
let parsedUserInput;
let numberToGuess = generateNewRandomNumber();

function generateNewRandomNumber() {
  console.log(numberToGuess);
  return Math.trunc(
    Math.random() * (maximumRange - minimumRange) + minimumRange,
  );
}

playerInput.addEventListener("input", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    parsedUserInput = playerInput.value.trim();
    //
    if (isInputValid(parsedUserInput)) {
      isGuessCorrect(parsedUserInput);
    }
  }, TYPING_INTERVAL);
});

playerInput.addEventListener("keydown", () => {
  clearTimeout(typingTimer);
});

function isInputValid(n) {
  if (n == "") {
    indicator.textContent = "";
    return false;
  } else if (isNaN(n)) {
    indicator.textContent = "Your input should only contain numbers !";
    return false;
  } else if (n < minimumRange || n > maximumRange) {
    indicator.textContent = "You've exceeded the range !";
    return false;
  }
  return true;
}

function isGuessCorrect(n) {
  if (n > numberToGuess) {
    indicator.textContent = "Too Big";
    return false;
  } else if (n < numberToGuess) {
    indicator.textContent = "Too Small";
    return false;
  } else if (n == numberToGuess) {
    indicator.textContent = "Correct !";
    return true;
  }
}
