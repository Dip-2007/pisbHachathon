document.addEventListener("DOMContentLoaded", () => {
  // --- DOM ELEMENTS ---
  const xpText = document.getElementById("xp-text");
  const heartsText = document.getElementById("hearts-text");
  const progressBar = document.getElementById("progress-bar");
  const questionImage = document.getElementById("question-image");
  const questionText = document.getElementById("question-text");
  const answerOptionsContainer = document.getElementById("answer-options");
  const nextBtn = document.getElementById("next-btn");
  const quizMain = document.getElementById("quiz-main");
  const scoreContainer = document.getElementById("score-container");
  const finalScoreText = document.getElementById("final-score");
  const retryBtn = document.getElementById("retry-btn");
  const feedbackOverlay = document.getElementById("feedback-overlay");
  const feedbackTitle = document.getElementById("feedback-title");
  const feedbackText = document.getElementById("feedback-text");

  // --- QUIZ DATA ---
  // You can add more questions and real image links here
  const questions = [
    {
      image: "https://iili.io/FimiwRS.jpg",
      question: "Which common greeting does this sign represent?",
      options: ["Hello", "Goodbye", "Thank You", "Namaste"],
      answer: "Namaste",
      feedback:
        "In ISL, placing both hands together is the sign for 'Namaste'.",
    },
    {
      image: "https://iili.io/FsJXoZl.png",
      question:
        "True or False: Indian Sign Language (ISL) has its own unique grammar and is a complete language.",
      options: ["True", "False"],
      answer: "True",
      feedback:
        "ISL is a natural and complete language with its own grammatical structure.",
    },
    {
      image: "https://iili.io/FimpfUu.jpg",
      question: "What is the primary mode of communication in ISL?",
      options: [
        "Facial Expressions",
        "Hand Gestures",
        "Body Language",
        "All of the above",
      ],
      answer: "All of the above",
      feedback:
        "ISL uses a combination of hand gestures, facial expressions, and body language to convey meaning.",
    },
    {
      image: "https://i.ibb.co/p1gSj3Y/r-ASLalpha.jpg", // Placeholder image
      question:
        "The process of spelling out words using hand signs for individual letters is called:",
      options: [
        "Hand-talking",
        "Fingerspelling",
        "Letter-signing",
        "Word-shaping",
      ],
      answer: "Fingerspelling",
      feedback:
        "Fingerspelling is used for names, places, and words that don't have a specific sign.",
    },
    {
      image: "https://i.ibb.co/yWf5t1j/l-ASLalpha.jpg", // Placeholder image
      question:
        "ISL is officially recognized as one of India's official languages.",
      options: ["True", "False"],
      answer: "False",
      feedback:
        "While widely used, ISL is not yet recognized as an official language in the Constitution of India, though there are active movements advocating for it.",
    },
  ];

  // --- QUIZ STATE ---
  let currentQuestionIndex = 0;
  let xp = 0;
  let hearts = 3;
  const XP_PER_CORRECT_ANSWER = 10;
  const HEART_EMOJI = "❤️";
  const BROKEN_HEART_EMOJI = "💔";

  // --- FUNCTIONS ---
  function startQuiz() {
    // Reset state
    currentQuestionIndex = 0;
    xp = 0;
    hearts = 3;
    scoreContainer.style.display = "none";
    quizMain.style.display = "block";
    nextBtn.style.display = "none";
    updateHUD();
    showQuestion();
  }

  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    questionImage.src = currentQuestion.image;
    questionImage.alt = currentQuestion.question;

    // Create answer buttons
    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.classList.add("option-btn");
      button.addEventListener("click", () => selectAnswer(button, option));
      answerOptionsContainer.appendChild(button);
    });

    // Update progress bar
    progressBar.style.width = `${
      ((currentQuestionIndex + 1) / questions.length) * 100
    }%`;
  }

  function resetState() {
    nextBtn.style.display = "none";
    while (answerOptionsContainer.firstChild) {
      answerOptionsContainer.removeChild(answerOptionsContainer.firstChild);
    }
  }

  function selectAnswer(selectedButton, selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    // Disable all buttons after an answer is chosen
    Array.from(answerOptionsContainer.children).forEach((button) => {
      button.disabled = true;
      // Highlight the correct answer
      if (button.innerText === correctAnswer) {
        button.classList.add("correct");
      }
    });

    if (selectedOption === correctAnswer) {
      xp += XP_PER_CORRECT_ANSWER;
      selectedButton.classList.add("correct");
      showFeedback(true, currentQuestion.feedback);
    } else {
      hearts--;
      selectedButton.classList.add("incorrect");
      showFeedback(false, `The correct answer was: ${correctAnswer}`);
    }

    updateHUD();

    setTimeout(() => {
      hideFeedback();
      if (hearts <= 0) {
        showScore(true); // Game over
      } else if (currentQuestionIndex < questions.length - 1) {
        nextBtn.style.display = "block";
      } else {
        showScore(false); // Quiz finished
      }
    }, 1800);
  }

  function showFeedback(isCorrect, text) {
    feedbackOverlay.classList.add("show");
    feedbackText.innerText = text;
    if (isCorrect) {
      feedbackTitle.innerText = "Correct!";
      feedbackOverlay.querySelector(".feedback-content").className =
        "feedback-content correct";
    } else {
      feedbackTitle.innerText = "Incorrect!";
      feedbackOverlay.querySelector(".feedback-content").className =
        "feedback-content incorrect";
    }
  }

  function hideFeedback() {
    feedbackOverlay.classList.remove("show");
  }

  function updateHUD() {
    xpText.innerText = xp;
    heartsText.innerHTML =
      HEART_EMOJI.repeat(hearts) + BROKEN_HEART_EMOJI.repeat(3 - hearts);
  }

  function handleNextButton() {
    currentQuestionIndex++;
    showQuestion();
  }

  function showScore(isGameOver) {
    quizMain.style.display = "none";
    scoreContainer.style.display = "block";
    finalScoreText.innerText = xp;
    if (isGameOver) {
      document.getElementById("score-title").innerText = "Game Over!";
    } else {
      document.getElementById("score-title").innerText = "Quiz Complete!";
    }
  }

  // --- EVENT LISTENERS ---
  nextBtn.addEventListener("click", handleNextButton);
  retryBtn.addEventListener("click", startQuiz);

  // --- INITIALIZE QUIZ ---
  startQuiz();
});
