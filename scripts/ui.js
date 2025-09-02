"use strict";
const TYPING_INTERVAL = 600; // in ms
let typingTimer;

const playerInput = document.querySelector("#number-input");
const endGameButtons = document.querySelector(".end-game-buttons");
const prefButton = document.querySelector(".pref-button");
const replayButton = document.querySelector(".replay-button");
const indicators = document.querySelectorAll(".indicator");
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
  resetUI("inGame");
});

prefButton.addEventListener("click", () => {
  resetUI("startMenu");
});

function updateIndicator(message, target, animation) {
  const index = target === "inGame" ? "1" : "0";
  indicators[index].textContent = message;
  indicators[index].classList.add(`${animation}-animation`, true);
  indicators[index].addEventListener(
    "animationend",
    () => {
      indicators[index].classList.remove(`${animation}-animation`, true);
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

function resetUI(target) {
  playerInput.disabled = false;
  playerInput.value = "";
  inGameTriesCounter = inputTries;
  generateNumberToGuess(minimumRange, maximumRange);
  if (target == "inGame") {
    toggleVisibility(endGameButtons, false);
    updateIndicator("", "inGame", "wrong");
    updateTriesCounter(inputTries);
  } else if ("startMenu") {
    toggleVisibility(inGame, false);
    toggleVisibility(startMenu, true);
  }
}
