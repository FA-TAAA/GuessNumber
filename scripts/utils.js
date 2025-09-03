"use strict";
function isInputValid(input, min, max) {
  if (isNaN(input)) {
    return {
      valid: false,
      message: "You shouldn't start with symbols nor letters !",
    };
  } else if (input > max) {
    return { valid: false, message: "The Guess Is Bigger Than The Max. Range" };
  } else if (input < min) {
    return {
      valid: false,
      message: "The Guess Is Smaller Than The Min. Range",
    };
  }
  return { valid: true };
}

function isValueEmpty(input) {
  return input.trim() == "";
}

function isValidGameParameters(minRange, maxRange, tries) {
  if (isNaN(minRange) || isNaN(maxRange) || isNaN(tries)) {
    return {
      valid: false,
      message: "You shouldn't start with symbols nor letters !",
    };
  }

  if (minRange >= maxRange) {
    return {
      valid: false,
      message: "Max range must be greater than min range.",
    };
  }
  if (tries <= 0) {
    return { valid: false, message: "Number of tries must be at least 1." };
  }
  return { valid: true };
}
