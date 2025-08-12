document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
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

  // Questions for ASL quiz
  const questions = [
    {
      question: "In ASl For Which Letter This Sign Is Used",
      image: "https://iili.io/FQ8yrOl.jpg",
      options: ["Letter A", "Letter B", "Letter C", "Letter D"],
      answer: 0,
      feedback:
        "The ASL 'A' is shown with a closed fist and thumb to the side.",
    },
    {
      question: "What is the ASL sign for the number '5'?",
      image: "https://iili.io/FQ8N3KJ.png",
      options: ["Number 5", "Number 2", "Number 7", "Number 9"],
      answer: 0,
      feedback:
        "The ASL '5' is shown with all fingers spread out, palm forward.",
    },
    {
      question: "What This Signs Means...?",
      image: "https://iili.io/FQS2Z9s.jpg",
      options: ["Hello", "Goodbye", "Thank you", "Sorry"],
      answer: 0,
      feedback: "A flat hand moves outward from the forehead to say 'Hello'.",
    },
    {
      question: "Which this Sign Means....?",
      image: "images/asl-thankyou.jpg",
      options: ["Hello", "Please", "Thank you", "Goodnight"],
      answer: 2,
      feedback: "A flat hand moves from chin outward to say 'Thank You'.",
    },
  ];

  // Quiz State
  let currentQuestionIndex = 0;
  let xp = 0;
  let hearts = 3;
  const XP_PER_CORRECT_ANSWER = 10;
  const HEART_EMOJI = "❤️";
  const BROKEN_HEART_EMOJI = "💔";

  function startQuiz() {
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

    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.classList.add("option-btn");
      button.addEventListener("click", () => selectAnswer(button, index));
      answerOptionsContainer.appendChild(button);
    });

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

  function selectAnswer(selectedButton, selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.answer;

    Array.from(answerOptionsContainer.children).forEach((button, i) => {
      button.disabled = true;
      if (i === correctIndex) {
        button.classList.add("correct");
      }
    });

    if (selectedIndex === correctIndex) {
      xp += XP_PER_CORRECT_ANSWER;
      selectedButton.classList.add("correct");
      showFeedback(true, currentQuestion.feedback);
    } else {
      hearts--;
      selectedButton.classList.add("incorrect");
      breakHeartAnimation();
      showFeedback(
        false,
        `The correct answer was: ${currentQuestion.options[correctIndex]}`
      );
    }

    updateHUD();

    setTimeout(() => {
      hideFeedback();
      if (hearts <= 0) {
        showScore(true);
      } else if (currentQuestionIndex < questions.length - 1) {
        nextBtn.style.display = "block";
      } else {
        showScore(false);
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

  function breakHeartAnimation() {
    const heartsDisplay = heartsText.querySelectorAll(".heart");
    // Optional: implement CSS animation for a breaking heart here
  }

  function handleNextButton() {
    currentQuestionIndex++;
    showQuestion();
  }

  function showScore(isGameOver) {
    quizMain.style.display = "none";
    scoreContainer.style.display = "block";
    finalScoreText.innerText = xp;
    document.getElementById("score-title").innerText = isGameOver
      ? "Game Over!"
      : "Quiz Complete!";
  }

  nextBtn.addEventListener("click", handleNextButton);
  retryBtn.addEventListener("click", startQuiz);

  startQuiz();
});
