// Alphabets page specific functionality

document.addEventListener("DOMContentLoaded", function () {
  initializeAlphabetsPage();
});

// Alphabet descriptions for each letter
const alphabetDescriptions = {
  A: "Make a fist with thumb alongside",
  B: "Four fingers up, thumb across palm",
  C: "Curved hand like holding a cup",
  D: "Index finger up, thumb touches other fingers",
  E: "All fingers bent, thumb across",
  F: "Index and thumb touch, others up",
  G: "Point index finger sideways",
  H: "Two fingers sideways",
  I: "Pinky finger up",
  J: "Draw a J in the air with pinky",
  K: "Index and middle up, thumb touches middle",
  L: "L-shape with thumb and index",
  M: "Three fingers over thumb",
  N: "Two fingers over thumb",
  O: "All fingers curved in circle",
  P: "K handshape pointing down",
  Q: "G handshape pointing down",
  R: "Cross index and middle fingers",
  S: "Make a fist with thumb in front",
  T: "Fist with thumb between index and middle",
  U: "Two fingers up together",
  V: "Two fingers up in V-shape",
  W: "Three fingers up",
  X: "Index finger bent like hook",
  Y: "Thumb and pinky out",
  Z: "Draw a Z in the air",
};

// Language color mapping
const languageColors = {
  ASL: "red",
  BSL: "blue",
  ISL: "orange",
};

// Current state
let currentLanguage = "ASL";
let currentLetter = "A";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function initializeAlphabetsPage() {
  generateAlphabetGrid();
  setupLanguageSelector();
  setupAlphabetNavigation();
  setupNextLetterButton();
  updateDisplay();

  // Initialize practice mode
  setupPracticeButtons();
}

function generateAlphabetGrid() {
  const grid = document.getElementById("alphabet-grid");
  if (!grid) return;

  grid.innerHTML = "";

  alphabet.forEach((letter) => {
    const button = document.createElement("button");
    button.className = "letter-btn";
    button.textContent = letter;
    button.setAttribute("data-letter", letter);

    if (letter === currentLetter) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      selectLetter(letter);
    });

    grid.appendChild(button);
  });
}

function setupLanguageSelector() {
  const languageButtons = document.querySelectorAll(".language-btn");

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      const color = button.dataset.color;

      selectLanguage(language, color);
    });
  });
}

function selectLanguage(language, color) {
  currentLanguage = language;

  // Update active language button
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`[data-language="${language}"]`)
    .classList.add("active");

  // Update color scheme
  updateColorScheme(color);

  // Update display
  updateDisplay();
}

function updateColorScheme(color) {
  const root = document.documentElement;
  const colorMap = {
    red: "#dc2626",
    blue: "#2563eb",
    orange: "#ea580c",
  };

  // Update CSS custom properties if using them
  root.style.setProperty("--primary-color", colorMap[color]);

  // Update language button styles
  document.querySelectorAll(".language-btn.active").forEach((btn) => {
    btn.style.backgroundColor = colorMap[color];
  });
}

function selectLetter(letter) {
  currentLetter = letter;

  // Update letter buttons
  document.querySelectorAll(".letter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(`[data-letter="${letter}"]`).classList.add("active");

  // Update display
  updateDisplay();

  // Save progress
  window.SignLearnUtils?.saveProgress(currentLanguage, letter, true);
}

function updateDisplay() {
  // Update current letter display
  const letterDisplay = document.getElementById("current-letter");
  if (letterDisplay) {
    letterDisplay.textContent = currentLetter;
  }

  // Update language display
  const languageDisplay = document.getElementById("current-language");
  if (languageDisplay) {
    languageDisplay.textContent = currentLanguage;
  }

  const languageDisplayInDescription = document.getElementById(
    "current-language-display"
  );
  if (languageDisplayInDescription) {
    languageDisplayInDescription.textContent = currentLanguage;
  }

  // Update letter name
  const letterName = document.getElementById("letter-name");
  if (letterName) {
    letterName.textContent = currentLetter;
  }

  // Update description
  const description = document.getElementById("letter-description");
  if (description) {
    description.textContent = alphabetDescriptions[currentLetter];
  }

  // Update next letter button
  updateNextLetterButton();
}

function setupAlphabetNavigation() {
  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      navigateToNextLetter();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      navigateToPreviousLetter();
    } else if (e.key >= "A" && e.key <= "Z") {
      selectLetter(e.key.toUpperCase());
    }
  });
}

function navigateToNextLetter() {
  const currentIndex = alphabet.indexOf(currentLetter);
  const nextIndex = (currentIndex + 1) % alphabet.length;
  selectLetter(alphabet[nextIndex]);
}

function navigateToPreviousLetter() {
  const currentIndex = alphabet.indexOf(currentLetter);
  const prevIndex = currentIndex === 0 ? alphabet.length - 1 : currentIndex - 1;
  selectLetter(alphabet[prevIndex]);
}

function setupNextLetterButton() {
  const nextButton = document.getElementById("next-letter-btn");
  if (nextButton) {
    nextButton.addEventListener("click", navigateToNextLetter);
  }
}

function updateNextLetterButton() {
  const nextButton = document.getElementById("next-letter-btn");
  if (!nextButton) return;

  const currentIndex = alphabet.indexOf(currentLetter);
  const nextIndex = (currentIndex + 1) % alphabet.length;
  const nextLetter = alphabet[nextIndex];

  nextButton.textContent = `Next Letter (${nextLetter})`;
}

function setupPracticeButtons() {
  const practiceButtons = document.querySelectorAll(".practice-btn");

  practiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const practiceType = button.textContent.trim();
      startPracticeMode(practiceType);
    });
  });
}

function startPracticeMode(type) {
  console.log(`Starting practice mode: ${type}`);

  switch (type) {
    case "Practice: Your Name":
      startNamePractice();
      break;
    case "Practice: Common Words":
      startCommonWordsPractice();
      break;
    case "Speed Challenge":
      startSpeedChallenge();
      break;
    case "Random Letters":
      startRandomLettersPractice();
      break;
    default:
      alert("Practice mode coming soon!");
  }
}

function startNamePractice() {
  const name = prompt("Enter your name to practice spelling:");
  if (name) {
    practiceSpelling(name.toUpperCase());
  }
}

function startCommonWordsPractice() {
  const commonWords = ["HELLO", "WORLD", "THANK", "YOU", "PLEASE", "SORRY"];
  const randomWord =
    commonWords[Math.floor(Math.random() * commonWords.length)];
  practiceSpelling(randomWord);
}

function startSpeedChallenge() {
  alert(
    "Speed Challenge: Spell the alphabet as fast as you can! (Feature coming soon)"
  );
}

function startRandomLettersPractice() {
  const randomLetters = [];
  for (let i = 0; i < 5; i++) {
    randomLetters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }
  practiceSpelling(randomLetters.join(""));
}

function practiceSpelling(word) {
  alert(
    `Practice spelling: ${word}\nUse the arrow keys or click letters to spell it out!`
  );
  // Here you would implement the actual practice interface
  // This is a simplified version for demonstration
}

// Auto-save progress
function autoSaveProgress() {
  const progress = {
    currentLanguage,
    currentLetter,
    timestamp: Date.now(),
  };

  localStorage.setItem("alphabets_progress", JSON.stringify(progress));
}

// Load saved progress
function loadSavedProgress() {
  const saved = localStorage.getItem("alphabets_progress");
  if (saved) {
    try {
      const progress = JSON.parse(saved);
      currentLanguage = progress.currentLanguage || "ASL";
      currentLetter = progress.currentLetter || "A";

      // Update UI to reflect loaded progress
      selectLanguage(currentLanguage, languageColors[currentLanguage]);
      selectLetter(currentLetter);
    } catch (e) {
      console.error("Error loading progress:", e);
    }
  }
}

// Accessibility improvements
function addAccessibilityFeatures() {
  // Add ARIA labels
  const letterButtons = document.querySelectorAll(".letter-btn");
  letterButtons.forEach((button) => {
    const letter = button.dataset.letter;
    button.setAttribute(
      "aria-label",
      `Letter ${letter}: ${alphabetDescriptions[letter]}`
    );
  });

  // Add screen reader announcements
  const announceElement = document.createElement("div");
  announceElement.setAttribute("aria-live", "polite");
  announceElement.setAttribute("aria-atomic", "true");
  announceElement.style.position = "absolute";
  announceElement.style.left = "-10000px";
  announceElement.id = "accessibility-announcer";
  document.body.appendChild(announceElement);
}

function announceToScreenReader(message) {
  const announcer = document.getElementById("accessibility-announcer");
  if (announcer) {
    announcer.textContent = message;
  }
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", () => {
  addAccessibilityFeatures();
  loadSavedProgress();

  // Auto-save progress periodically
  setInterval(autoSaveProgress, 30000); // Every 30 seconds
});

// Export for potential use by other modules
window.AlphabetsModule = {
  selectLetter,
  selectLanguage,
  navigateToNextLetter,
  navigateToPreviousLetter,
  startPracticeMode,
  getCurrentState: () => ({ currentLanguage, currentLetter }),
};
