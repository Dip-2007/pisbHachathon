// Alphabets page specific functionality

document.addEventListener("DOMContentLoaded", function () {
  // All initialization logic is now in one place
  initializeAlphabetsPage();
});

// --- DATA ---

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

// A placeholder for missing images
const placeholder = "https://iili.io/FsRSTCP.gif";

const signImages = {
  ASL: {
    A: "https://iili.io/Fi4TUQV.jpg",
    B: "https://iili.io/Fi4Ti3F.jpg",
    C: "https://iili.io/Fi4TrCB.jpg",
    D: "https://iili.io/Fi4T4EP.jpg",
    E: "https://iili.io/Fi4T641.jpg",
  },
  BSL: {
    A: "https://iili.io/Fi4GIcv.jpg ",
    B: "https://iili.io/Fi4GfwP.jpg",
    C: "https://iili.io/Fi4GnMg.jpg",
    D: "https://iili.io/Fi4GzKJ.jpg",
    E: "https://iili.io/Fi4GCoF.jpg",
    // ...
  },
  ISL: {
    A: "https://iili.io/Fi4eDCl.jpg",
    B: "https://iili.io/Fi4evQR.jpg",
    C: "https://iili.io/Fi4eSBp.jpg",
    D: "https://iili.io/Fi4eg4I.jpg",
    E: "https://iili.io/Fi4eUEN.jpg",
    I: "",
  },
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

// --- INITIALIZATION ---

function initializeAlphabetsPage() {
  addAccessibilityFeatures(); // Set up screen reader announcer first
  loadSavedProgress(); // Load saved state before generating the UI
  generateAlphabetGrid();
  setupLanguageSelector();
  setupAlphabetNavigation();
  setupNextLetterButton();
  setupPracticeButtons();
  setupReadAloud();
  updateDisplay(); // Initial display update
  setInterval(autoSaveProgress, 30000); // Auto-save every 30 seconds
}

//Integrated For read Aloud

// function setupReadAloud() {
//   const readAloudButton = document.getElementById("read-aloud-btn");
//   if (!readAloudButton) return;

//   readAloudButton.addEventListener("click", () => {
//     const letterToSpeak = currentLetter;
//     if (letterToSpeak && "speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(letterToSpeak);
//       window.speechSynthesis.speak(utterance);
//     } else {
//       alert("Sorry your browsers doesnt support read Aloud Feature");
//     }
//   });
// }

// UI SETUP & EVENT LISTENERS

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

      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(letter);

        window.speechSynthesis.speak(utterance);
      }
    });
    grid.appendChild(button);
  });
}

function setupLanguageSelector() {
  document.querySelectorAll(".language-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      const color = button.dataset.color;
      selectLanguage(language, color);
    });
  });
}

function setupAlphabetNavigation() {
  document.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      navigateToNextLetter();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      navigateToPreviousLetter();
    } else if (key.length === 1 && key >= "A" && key <= "Z") {
      // FIXED: Condition now correctly handles both upper and lower case key presses
      selectLetter(key);
    }
  });
}

function setupNextLetterButton() {
  const nextButton = document.getElementById("next-letter-btn");
  if (nextButton) {
    nextButton.addEventListener("click", navigateToNextLetter);
  }
}

function setupPracticeButtons() {
  document.querySelectorAll(".practice-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const practiceType = button.textContent.trim();
      startPracticeMode(practiceType);
    });
  });
}

// --- STATE & DISPLAY MANAGEMENT ---

function selectLanguage(language, color) {
  currentLanguage = language;
  document
    .querySelectorAll(".language-btn")
    .forEach((btn) => btn.classList.remove("active"));
  // FIXED: Query selector syntax was wrong, now corrected with backticks.
  const activeBtn = document.querySelector(`[data-language="${language}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  updateColorScheme(color);
  updateDisplay();
  announceToScreenReader(`Language changed to ${language}`);
}

function selectLetter(letter) {
  currentLetter = letter;
  document
    .querySelectorAll(".letter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  // FIXED: Query selector syntax was wrong, now corrected with backticks.
  const activeBtn = document.querySelector(`[data-letter="${letter}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  updateDisplay();
  announceToScreenReader(`Showing letter ${letter}`);
  // COMMENTED OUT: This function relies on an external utility not provided.
  // window.SignLearnUtils?.saveProgress(currentLanguage, letter, true);
}

function updateDisplay() {
  document.getElementById("current-letter").textContent = currentLetter;
  document.getElementById("current-language").textContent = currentLanguage;
  document.getElementById("current-language-display").textContent =
    currentLanguage;
  document.getElementById("letter-name").textContent = currentLetter;
  document.getElementById("letter-description").textContent =
    alphabetDescriptions[currentLetter] || "Description not available.";

  const handImage = document.getElementById("hand-image");
  if (handImage) {
    const imageURL =
      signImages[currentLanguage]?.[currentLetter] || placeholder;
    handImage.src = imageURL;
    // FIXED: Template literal now uses backticks `` to correctly form the string.
    handImage.alt = `Sign language image for ${currentLetter} in ${currentLanguage}`;
    handImage.onerror = function () {
      this.onerror = null; // Prevents infinite loops if the placeholder also fails
      this.src = placeholder;
      this.alt = "Image failed to load.";
    };
  }
  updateNextLetterButton();
}

function updateColorScheme(color) {
  const root = document.documentElement;
  const colorMap = { red: "#dc2626", blue: "#2563eb", orange: "#ea580c" };
  const targetColor = colorMap[color] || "#777"; // Fallback color
  root.style.setProperty("--primary-color", targetColor);
}

function updateNextLetterButton() {
  const nextButton = document.getElementById("next-letter-btn");
  if (!nextButton) return;
  const currentIndex = alphabet.indexOf(currentLetter);
  const nextIndex = (currentIndex + 1) % alphabet.length;
  const nextLetter = alphabet[nextIndex];
  // FIXED: Template literal now uses backticks ``.
  nextButton.textContent = `Next Letter (${nextLetter})`;
}

// --- NAVIGATION ---

function navigateToNextLetter() {
  const currentIndex = alphabet.indexOf(currentLetter);
  const nextIndex = (currentIndex + 1) % alphabet.length;
  selectLetter(alphabet[nextIndex]);
}

function navigateToPreviousLetter() {
  const currentIndex = alphabet.indexOf(currentLetter);
  // IMPROVED: Using modulo for cleaner wrap-around logic.
  const prevIndex = (currentIndex - 1 + alphabet.length) % alphabet.length;
  selectLetter(alphabet[prevIndex]);
}

// --- PRACTICE MODE ---

function startPracticeMode(type) {
  // FIXED: Template literal now uses backticks ``.
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
  if (name) practiceSpelling(name.toUpperCase());
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
  const randomLetters = Array.from(
    { length: 5 },
    () => alphabet[Math.floor(Math.random() * alphabet.length)]
  );
  practiceSpelling(randomLetters.join(""));
}

function practiceSpelling(word) {
  // FIXED: Template literal now uses backticks ``.
  alert(
    `Practice spelling: ${word}\nUse the arrow keys or click letters to spell it out!`
  );
}

// --- DATA PERSISTENCE & ACCESSIBILITY ---

function autoSaveProgress() {
  const progress = { currentLanguage, currentLetter, timestamp: Date.now() };
  localStorage.setItem("alphabets_progress", JSON.stringify(progress));
  console.log("Progress saved.");
}

function loadSavedProgress() {
  const saved = localStorage.getItem("alphabets_progress");
  if (saved) {
    try {
      const progress = JSON.parse(saved);
      currentLanguage = progress.currentLanguage || "ASL";
      currentLetter = progress.currentLetter || "A";
      console.log("Progress loaded.");
    } catch (e) {
      console.error("Error loading progress:", e);
    }
  }
}

function addAccessibilityFeatures() {
  document.querySelectorAll(".letter-btn").forEach((button) => {
    const letter = button.dataset.letter;
    // FIXED: Template literal now uses backticks ``.
    button.setAttribute(
      "aria-label",
      `Letter ${letter}: ${alphabetDescriptions[letter]}`
    );
  });
  if (!document.getElementById("accessibility-announcer")) {
    const announceElement = document.createElement("div");
    announceElement.id = "accessibility-announcer";
    announceElement.setAttribute("aria-live", "polite");
    announceElement.setAttribute("aria-atomic", "true");
    announceElement.style.cssText =
      "position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;";
    document.body.appendChild(announceElement);
  }
}

function announceToScreenReader(message) {
  const announcer = document.getElementById("accessibility-announcer");
  if (announcer) announcer.textContent = message;
}

// Export for potential use by other modules
window.AlphabetsModule = {
  selectLetter,
  selectLanguage,
  navigateToNextLetter,
  navigateToPreviousLetter,
  startPracticeMode,
  getCurrentState: () => ({ currentLanguage, currentLetter }),
};
