"use strict";

const startMenuUI = document.querySelector(".start-menu-ui");
const inGameUI = document.querySelector(".in-game-ui");

let minRange;
let maxRange;
let inputTries;

document.querySelector(".play-button").addEventListener("click", () => {
  minRange = parseInt(document.querySelector("#minimum-range").value);
  maxRange = parseInt(document.querySelector("#maximum-range").value);
  inputTries = parseInt(document.querySelector("#number-tries").value);

  const validation = isValidGameParameters(minRange, maxRange, inputTries);
  if (!validation.valid) {
    console.log(validation.message);
    updateIndicator("startMenu", validation.message, "error");
    return;
  }

  setGameParameters(minRange, maxRange, inputTries);
  updateTriesCounter(inputTries);
  generateNumberToGuess(minRange, maxRange);

  playerInput.disabled = false;
  playerInput.value = "";
  toggleVisibility(startMenuUI, false);
  toggleVisibility(inGameUI, true);
  toggleVisibility(endGameButtons, false);

  updateIndicator("inGame", "", "wrong");
  updateIndicator("startMenu", "", "wrong");
});
