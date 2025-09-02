"use strict";

const startMenu = document.querySelector(".start-menu");
const inGame = document.querySelector(".in-game");

let minRange;
let maxRange;
let inputTries;

document.querySelector(".play-button").addEventListener("click", () => {
  minRange = parseInt(document.querySelector("#minimum-range").value);
  maxRange = parseInt(document.querySelector("#maximum-range").value);
  inputTries = parseInt(document.querySelector("#number-tries").value);

  const validation = isValidGameParameters(minRange, maxRange, inputTries);
  if (!validation.valid) {
    updateIndicator(validation.message, "startMenu", "error");
    return;
  }

  setGameParameters(minRange, maxRange, inputTries);
  updateTriesCounter(inputTries);
  generateNumberToGuess(minRange, maxRange);

  playerInput.disabled = false;
  playerInput.value = "";
  toggleVisibility(startMenu, false);
  toggleVisibility(inGame, true);
  toggleVisibility(endGameButtons, false);

  updateIndicator("", "startMenu", "wrong");
  updateIndicator("", "inGame", "wrong");
});
