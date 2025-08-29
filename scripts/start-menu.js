"use strict";

let minimumRange;
let maximumRange;
let numberOfTries;
let numberToGuess;

const playButton = document.querySelector(".play-button");
const startMenu = document.querySelector(".start-menu");
const inGame = document.querySelector(".in-game");
const indicator = document.querySelectorAll(".indicator");
const triesCounter = document.querySelector(".tries-counter");

function generateNewRandomNumber() {
  return (
    Math.trunc(Math.random() * (maximumRange - minimumRange) + minimumRange) + 1
  );
}

playButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (setParameters()) {
    playerInput.value = "";
    playerInput.disabled = false;
    visibilityController(startMenu, "hide");
    visibilityController(inGame, "show");
    visibilityController(endGameButtons, "hide");
  } else {
    return;
  }
});

function setParameters() {
  minimumRange = parseInt(
    document.querySelector("#minimum-range").value.trim(),
  );

  maximumRange = parseInt(
    document.querySelector("#maximum-range").value.trim(),
  );

  numberOfTries = parseInt(
    document.querySelector("#number-tries").value.trim(),
  );

  if (minimumRange > maximumRange) {
    indicatorChange(
      "The Min. Range Has To Be Small Than Max. Range",
      "startMenu",
      "wrong",
    );
    return false;
  }

  if (numberOfTries <= 0) {
    indicatorChange(
      "The Number Of Tries Has To Be At least 1",
      "startMenu",
      "wrong",
    );
    return false;
  }

  indicatorChange("", "startMenu", "");
  indicatorChange("", "inGame", "");
  numberToGuess = generateNewRandomNumber();
  triesCounter.textContent = `Remaining Tries : ${numberOfTries}`;

  console.log(`Minimum Range : ${minimumRange}`);
  console.log(`Maximum Range : ${maximumRange}`);
  console.log(`Generated Number To Guess : ${numberToGuess}`);
  return true;
}
