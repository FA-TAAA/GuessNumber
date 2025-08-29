"use strict";

const TYPING_INTERVAL = 600; // in ms

const playerInput = document.querySelector("#number-input");
let typingTimer;
let parsedUserInput;

playerInput.addEventListener("input", () => {
  clearTimeout(typingTimer);
  parsedUserInput = parseInt(playerInput.value.trim());
  typingTimer = setTimeout(() => {
    if (isInputValid(playerInput.value.trim())) {
      isGuessCorrect(playerInput.value.trim());
    }
  }, TYPING_INTERVAL);
});

playerInput.addEventListener("keydown", () => {
  clearTimeout(typingTimer);
});

function isInputValid(n) {
  if (n == "") {
    indicatorChange("", "inGame");
    return false;
  }
  n = parseInt(n);
  if (isNaN(n)) {
    indicatorChange(
      "Your input should only contain numbers !",
      "inGame",
      "error",
    );
    return false;
  } else if (n < minimumRange || n > maximumRange) {
    indicatorChange("You're outside the range", "inGame", "error");
    return false;
  }
  return true;
}

function isGuessCorrect(n) {
  numberOfTries--;
  triesCounter.textContent = `Remaining Tries : ${numberOfTries}`;
  if (numberOfTries < 0) {
    indicatorChange("Your Tries Are Finished", "inGame", "wrong");
    visibilityController(endGameButtons, "show");
  } else {
    if (n > numberToGuess) {
      indicatorChange("Too big", "inGame", "wrong");
      return false;
    } else if (n < numberToGuess) {
      indicatorChange("Too small", "inGame", "wrong");
      return false;
    } else if (n == numberToGuess) {
      indicatorChange("Correct !", "inGame", "win");
    }
  }
  playerInput.disabled = true;
  visibilityController(endGameButtons, "show");
  return true;
}

function indicatorChange(message, menu, typeAnimation) {
  let index;
  if (menu == "inGame") {
    index = 1;
  } else if (menu == "startMenu") {
    index = 0;
  } else {
    console.error(`Wrong parameter --> ${menu}`);
    return;
  }

  indicator[index].textContent = message;
  switch (typeAnimation) {
    case "error":
    case "wrong":
      indicator[index].textContent = message;
      indicator[index].classList.add("wrong-animation");
      indicator[index].addEventListener(
        "animationend",
        () => {
          indicator[index].classList.remove("wrong-animation");
        },
        { once: true },
      );
      break;

    case "win":
      indicator[index].textContent = message;
      indicator[index].classList.add("win-animation");
      indicator[index].addEventListener(
        "animationend",
        () => {
          indicator[index].classList.remove("win-animation");
        },
        { once: true },
      );
      break;

    default:
      indicator[index].textContent = "";
  }
}

const endGameButtons = document.querySelector(".end-game-buttons");
const prefButton = document.querySelector(".pref-button");
const replayButton = document.querySelector(".replay-button");

function visibilityController(button, visibility) {
  switch (visibility) {
    case "hide":
      button.classList.add("hidden");
      return;
    case "show":
      button.classList.remove("hidden");
      return;
    default:
      console.error("invalid visibility parameter");
      return;
  }
}

prefButton.addEventListener("click", () => {
  visibilityController(startMenu, "show");
  visibilityController(inGame, "hide");
});

replayButton.addEventListener("click", () => {
  setParameters();
  playerInput.disabled = false;
  visibilityController(endGameButtons, "hide");
});
