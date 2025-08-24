"use strict";

const MAX_NUMBER_RANGE = 100;

let numberToGuess = generateNewRandomNumber();
const guessIndicator = document.querySelector("#indicator");
const guessButton = document.querySelector("#guess");
const userInput = document.querySelector("#numberToGuess");
const replayButton = document.querySelector("#replay");

function generateNewRandomNumber() {
  let n = Math.floor(Math.random() * MAX_NUMBER_RANGE) + 1;
  console.log(`Number to Guess : ${n}`);
  return n;
}

function validateInput(n) {
  if (isNaN(n)) {
    guessIndicator.textContent =
      "ERROR ! You're Input Should Only Contain Numbers !";
    return false;
  } else if (n <= 0) {
    guessIndicator.textContent =
      "ERROR ! Your Number is Bellow The Minimum Range ( 1 )";
    return false;
  } else if (n > MAX_NUMBER_RANGE) {
    guessIndicator.textContent = `ERROR ! Your Number is Above The Minimum Range ( ${MAX_NUMBER_RANGE} )`;
    return false;
  }
  return true;
}

function isCorrectGuess(n) {
  if (n === numberToGuess) {
    guessIndicator.textContent = "You Won ! Click on Replay to Play Again.";
    return true;
  } else if (n > numberToGuess) {
    guessIndicator.textContent = "Your guess is too big";
  } else {
    guessIndicator.textContent = "Your guess is too small";
  }
  return false;
}

function updateReplayUI(replay) {
  if (replay) {
    userInput.disabled = true;
    replayButton.classList.remove("hidden");
    guessButton.classList.add("hidden");
  } else {
    userInput.disabled = false;
    userInput.value = "";
    guessIndicator.textContent = "";
    replayButton.classList.add("hidden");
    guessButton.classList.remove("hidden");
  }
}

guessButton.addEventListener("click", (e) => {
  e.preventDefault();
  const parsedUserInput = parseInt(userInput.value);

  if (!validateInput(parsedUserInput)) {
    return;
  }

  if (isCorrectGuess(parsedUserInput)) {
    updateReplayUI(true);
  }
});

replayButton.addEventListener("click", (e) => {
  e.preventDefault();
  numberToGuess = generateNewRandomNumber();
  updateReplayUI(false);
});
