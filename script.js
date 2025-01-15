const typeText = document.querySelector(".leftbox p"),
  inputField = document.querySelector(".inpField"),
  timeTag = document.querySelector(".timeleft span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  mistakesTag = document.querySelector(".mistake span"),
  settingsPanel = document.querySelector(".set_panel"),
  settingsButton = document.getElementById("setting"),
  resetButton = document.querySelector("button"),
  usernameDisplay = document.getElementById("username"),
  timeInput = document.getElementById("timeInp"),
  customParagraphInput = document.getElementById("customParaInp"),
  usernameInput = document.getElementById("userInp"),
  saveButton = document.getElementById("btn");

let timer = null,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = 0,
  mistakes = 0,
  isTyping = false,
  customParagraph = "";

// Generate and display a random or custom paragraph
function loadParagraph() {
  const paragraph = customParagraph || paragraphs[Math.floor(Math.random() * paragraphs.length)];
  typeText.innerHTML = paragraph
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  inputField.value = "";
  inputField.focus();
}

// Start the typing logic
function handleTyping() {
  const characters = typeText.querySelectorAll("span");
  const typedChar = inputField.value[charIndex];

  if (charIndex < characters.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(updateTimer, 1000);
      isTyping = true;
    }

    if (typedChar === undefined) {
      // Handle backspace
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) mistakes--;
        characters[charIndex].className = "";
      }
    } else {
      // Validate character
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    // Highlight the current character only if it is not a space
    characters.forEach((char) => char.classList.remove("active"));
    if (charIndex < characters.length && characters[charIndex].innerText !== " ") {
      characters[charIndex].classList.add("active");
    }

    // Update stats
    updateStats();
  } else {
    clearInterval(timer);
    inputField.value = "";
  }
}

// Update the timer
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

// Reset the game
function resetGame() {
  clearInterval(timer);
  timer = null;
  timeLeft = maxTime;
  charIndex = mistakes = 0;
  isTyping = false;
  timeTag.innerText = timeLeft;
  mistakesTag.innerText = 0;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
  loadParagraph();
}

// Update WPM, CPM, and mistakes
function updateStats() {
  const wpm = Math.round(((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60) || 0;
  wpmTag.innerText = wpm;
  cpmTag.innerText = charIndex - mistakes;
  mistakesTag.innerText = mistakes;
}

// Toggle settings panel
function toggleSettingsPanel() {
  const isOpen = settingsPanel.style.width === "20rem";
  settingsPanel.style.width = isOpen ? "0rem" : "20rem";
}

// Save settings and apply changes
function saveSettings() {
  const username = usernameInput.value.trim();
  usernameDisplay.innerText = username || "Unknown";

  customParagraph = customParagraphInput.value.trim();
  if (timeInput.value > 0) {
    maxTime = parseInt(timeInput.value);
    timeLeft = maxTime;
  }

  resetGame();
  toggleSettingsPanel();
}

// Event Listeners
resetButton.addEventListener("click", resetGame);
settingsButton.addEventListener("click", toggleSettingsPanel);
saveButton.addEventListener("click", saveSettings);
inputField.addEventListener("input", handleTyping);
typeText.addEventListener("click", () => inputField.focus());

// Initialize
loadParagraph();
