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

  // Questions for BSL quiz
  const questions = [
    {
      image: "https://iili.io/FQ8aLej.webp",
      question: "In BSL, which gesture is commonly used for 'Hello'?",
      options: ["Wave hand near head", "Touch chin", "Tap shoulder", "Thumbs up"],
      answer: "Wave hand near head",
      feedback: "A friendly wave near the head is a common greeting in BSL."
    },
    {
      image: "https://iili.io/FQ8NHoF.png",
      question: "BSL fingerspelling uses:",
      options: ["One hand", "Two hands", "Both depending on context", "No hands"],
      answer: "Two hands",
      feedback: "BSL uses a two-handed alphabet for fingerspelling."
    },
    {
      image: "https://iili.io/FQ8NdPa.jpg",
      question: "Which of these is a common greeting in BSL?",
      options: ["Good morning", "Good night", "See you later", "All of the above"],
      answer: "All of the above",
      feedback: "BSL includes signs for all these everyday greetings."
    },
    {
      image: "https://iili.io/FQ8N3KJ.png",
      question: "How is '5' shown in BSL numbers?",
      options: ["Open hand, palm forward", "Closed fist", "Thumb and four fingers together", "Index and middle finger up"],
      answer: "Open hand, palm forward",
      feedback: "Five is shown with all fingers spread, palm facing out."
    },
    {
      image: "https://i.ibb.co/3YVJHkp/bsl-family.jpg",
      question: "What is the sign for 'Family' in BSL?",
      options: [
        "Circle hands together in front",
        "Tap chest twice",
        "Hands together making a circle motion",
        "Point to multiple people"
      ],
      answer: "Hands together making a circle motion",
      feedback: "The family sign uses both hands to indicate a connected group."
    }
  ];

  // Quiz State
  let currentQuestionIndex = 0;
  let xp = 0;
  let hearts = 3;
  const XP_PER_CORRECT_ANSWER = 10;
  const HEART_EMOJI = "❤️";
  const BROKEN_HEART_EMOJI = "💔";

  // Start quiz
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

    currentQuestion.options.forEach(option => {
      const button = document.createElement("button");
      button.innerText = option;
      button.classList.add("option-btn");
      button.addEventListener("click", () => selectAnswer(button, option));
      answerOptionsContainer.appendChild(button);
    });

    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
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

    Array.from(answerOptionsContainer.children).forEach(button => {
      button.disabled = true;
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
      feedbackOverlay.querySelector(".feedback-content").className = "feedback-content correct";
    } else {
      feedbackTitle.innerText = "Incorrect!";
      feedbackOverlay.querySelector(".feedback-content").className = "feedback-content incorrect";
    }
  }

  function hideFeedback() {
    feedbackOverlay.classList.remove("show");
  }

  function updateHUD() {
    xpText.innerText = xp;
    heartsText.innerHTML = HEART_EMOJI.repeat(hearts) + BROKEN_HEART_EMOJI.repeat(3 - hearts);
  }

  function handleNextButton() {
    currentQuestionIndex++;
    showQuestion();
  }

  function showScore(isGameOver) {
    quizMain.style.display = "none";
    scoreContainer.style.display = "block";
    finalScoreText.innerText = xp;
    document.getElementById("score-title").innerText = isGameOver ? "Game Over!" : "Quiz Complete!";
  }

  nextBtn.addEventListener("click", handleNextButton);
  retryBtn.addEventListener("click", startQuiz);

  startQuiz();
});
