"use strict";
const TYPING_INTERVAL = 600; // in ms
let typingTimer;

const playerInput = document.querySelector("#number-input");
const endGameButtons = document.querySelector(".end-game-buttons");
const prefButton = document.querySelector(".pref-button");
const replayButton = document.querySelector(".replay-button");
const indicator = document.querySelectorAll(".indicator");
const triesCounter = document.querySelector(".tries-counter");

playerInput.addEventListener("input", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    let userInput = playerInput.value;
    if (isValueEmpty(userInput)) {
      return;
    }

    userInput = parseInt(userInput.trim());

    const validation = isInputValid(userInput, minimumRange, maximumRange);

    if (!validation.valid) {
      updateIndicator(validation.message, "inGame", "error");
      return;
    }

    const guess = checkGuess(userInput);

    switch (guess) {
      case "Correct !":
        playerInput.disabled = true;
        updateIndicator(guess, "inGame", "win");
        toggleVisibility(endGameButtons, true);
        break;

      case "Too Big !":
        updateIndicator(guess, "inGame", "wrong");
        break;

      case "Too Small !":
        updateIndicator(guess, "inGame", "wrong");
        break;
    }
    updateTriesCounter(inGameTriesCounter);
  }, TYPING_INTERVAL);
});

playerInput.addEventListener("keydown", () => {
  clearTimeout(typingTimer);
});

replayButton.addEventListener("click", () => {
  UIreset("inGame");
});
prefButton.addEventListener("click", () => {
  UIreset("startMenu");
});

function updateIndicator(message, target, animation) {
  const index = target === "inGame" ? "1" : "0";
  indicator[index].textContent = message;
  indicator[index].classList.add(`${animation}-animation`, true);
  indicator[index].addEventListener(
    "animationend",
    () => {
      indicator[index].classList.remove(`${animation}-animation`, true);
    },
    { once: true },
  );
}

function updateTriesCounter(tries) {
  triesCounter.textContent = `Remaining Tries : ${tries}`;
}

function toggleVisibility(element, isVisible) {
  element.classList.toggle("hidden", !isVisible);
}

function UIreset(target) {
  playerInput.disabled = false;
  playerInput.value = "";
  inGameTriesCounter = inputTries;
  generateNumberToGuess();
  if (target == "inGame") {
    toggleVisibility(endGameButtons, false);
    updateIndicator("", "inGame");
    updateTriesCounter(inputTries);
  } else if ("startMenu") {
    toggleVisibility(inGame, false);
    toggleVisibility(startMenu, true);
  }
}
