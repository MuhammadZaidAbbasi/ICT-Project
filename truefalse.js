"use strict";

const quizData = [
  {
    question: "You should always share your passwords with colleagues to ensure smooth work operations.",
    a: "True",
    b: "False",
    correct: "b",
  },
  {
    question: "Using public Wi-Fi for online banking is a safe practice.",
    a: "True",
    b: "False",
    correct: "b",
  },
  {
    question: "Updating your software regularly is a good cybersecurity practice.",
    a: "True",
    b: "False",
    correct: "a",
  },
  {
    question: "It's safe to click on links in emails from unknown senders.",
    a: "True",
    b: "False",
    correct: "b",
  },
  {
    question: "You should verify the identity of a utility worker before allowing them into your home.",
    a: "True",
    b: "False",
    correct: "a",
  },
  {
    question: "Antivirus software alone can protect your computer from all types of cyber threats",
    a: "True",
    b: "False",
    correct: "b",
  },
  {
    question: "Two-factor authentication adds an extra layer of security to your accounts",
    a: "True",
    b: "False",
    correct: "a",
  },
  {
    question: "Clicking on unknown links or attachments in emails can potentially infect your device with malware.",
    a: "True",
    b: "False",
    correct: "a",
  },
  {
    question: "Encrypting sensitive data is a key practice to prevent unauthorized access during transmission.",
    a: "True",
    b: "False",
    correct: "a",
  },
  {
    question: "A Virtual Private Network (VPN) can protect your online activity from being monitored by your Internet Service Provider (ISP).",
    a: "True",
    b: "False",
    correct: "a",
  },
];

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
nextBtn.disabled = false;
backBtn.addEventListener("click", previousQuestion);

function startQuiz() {
  console.log("Quiz started");
  nextBtn.disabled = false;
  backBtn.disabled = false;
  startTimer(20 * 60);
  document.getElementById("quiz-container").style.display = "block";
}

const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", saveAnswer);
nextBtn.addEventListener("click", nextQuestion);

let userAnswers = [];
let scoredQuestions = []; // Track scored questions

const quiz = document.querySelector(".quiz-body");
const answerEl = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const footerEl = document.querySelector(".quiz-footer");
const quizDetailEl = document.querySelector(".quiz-details");
const liEl = document.querySelector("ul li");

const a_txt = document.getElementById("a_text");
const b_txt = document.getElementById("b_text");
const btnSubmit = document.getElementById("btn");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  markSavedAnswer();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_txt.innerText = currentQuizData.a;
  b_txt.innerText = currentQuizData.b;
  quizDetailEl.innerHTML = `<p>${currentQuiz + 1} of ${quizData.length}</p>`;
  answerEl.forEach((answerEl) => {
    answerEl.disabled = false;
  });
  if (currentQuiz === quizData.length - 1) {
    nextBtn.innerText = "End Quiz";
    nextBtn.innerTextSize=10;
    nextBtn.removeEventListener("click", nextQuestion);
    nextBtn.addEventListener("click", displayResults);
  } else {
    nextBtn.innerText = "Next ";
    nextBtn.removeEventListener("click", displayResults);
    nextBtn.addEventListener("click", nextQuestion);
  }
}

function deselectAnswers() {
  answerEl.forEach((answerEl) => {
    answerEl.checked = false;
    answerEl.parentElement.classList.remove("correct", "wrong");
  });

  const feedbackElements = footerEl.querySelectorAll(".correct-feedback, .incorrect-feedback");
  feedbackElements.forEach((element) => {
    element.remove();
  });
}

function getSelected() {
  let answer;
  answerEl.forEach((answerEls) => {
    if (answerEls.checked) {
      answer = answerEls.id;
    }
  });
  return answer;
}

function nextQuestion() {
  saveBtn.disabled = false;

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  }

  if (currentQuiz === quizData.length - 1) {
    nextBtn.innerText = "End Quiz";
    nextBtn.removeEventListener("click", nextQuestion);
    nextBtn.addEventListener("click", displayResults);
  } else {
    nextBtn.innerText = "Next ";
    nextBtn.removeEventListener("click", displayResults);
    nextBtn.addEventListener("click", nextQuestion);
  }

  backBtn.disabled = false;
}

function saveAnswer() {
  const answer = getSelected();
  const correctAnswer = quizData[currentQuiz].correct;
  if (!answer) {
    return;
  }
  if (userAnswers[currentQuiz] !== undefined) {
    return;
  }
  answerEl.forEach((answerEl) => {
    const id = answerEl.id;
    if (id === correctAnswer) {
      answerEl.parentElement.classList.add("correct");
    } else {
      if (id === answer) {
        answerEl.parentElement.classList.add("wrong");
      }
    }
  });

  const isCorrect = answer === correctAnswer;
  const feedback = document.createElement("p");
  feedback.classList.add(isCorrect ? "correct-feedback" : "incorrect-feedback");
  footerEl.appendChild(feedback);

  nextBtn.disabled = false;
  if (userAnswers[currentQuiz] === undefined) {
    userAnswers[currentQuiz] = answer;
  }

  console.log("User Answer:", answer);
  console.log("Correct Answer:", correctAnswer);
  console.log("Is Correct?", isCorrect);

  if (isCorrect && !scoredQuestions.includes(currentQuiz)) {
    score++;
    scoredQuestions.push(currentQuiz); // Mark the question as scored
    console.log("Score:", score);
  }
}
let timerRunning = true;
let remainingTimeInSeconds = 20 * 60;

function startTimer(duration) {
  let timer = duration, minutes, seconds;
  const timerDisplay = document.getElementById('timer');

  const intervalID = setInterval(function () {
    console.log("Interval Running...");
    if (!timerRunning) {
      clearInterval(intervalID);
      console.log("Timer Stopped");
      return;
    }
    console.log("Timer Running...");
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    if (timer < 300) {
      timerDisplay.style.color = 'red';
    }

    timerDisplay.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      timerDisplay.textContent = 'Time\'s up!';
      timerDisplay.style.fontSize = '28px';
      timerDisplay.style.fontWeight = "bold";
      timerDisplay.style.color = "black";
      timerDisplay.style.PaddingBottom = "11px";
      displayResults();
      clearInterval(intervalID);
    }
  }, 1000);
}

function stopTimer() {
  console.log("Stopping Timer...");
  timerRunning = false;
}

function resumeTimer() {
  startTimer(remainingTimeInSeconds);
}

function displayResults() {
  const headerTxt = document.querySelector(".header-txt");
  headerTxt.textContent = "Quiz Completed";
  headerTxt.style.fontSize = "35px";
  sessionStorage.setItem('userscr', score);
  const scorePercentage = Math.round((score / quizData.length) * 100);
  let remark = "";

  if (scorePercentage >= 90) {
    remark = "Excellent!";
  } else if (scorePercentage >= 75) {
    remark = "Good";
  } else if (scorePercentage >= 50) {
    remark = "Above Average";
  } else if (scorePercentage > 35) {
    remark = "Below Average";
  } else {
    remark = "Learn more";
  }

  quiz.innerHTML = `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center;">
      <h1>You answered ${score}/${quizData.length} questions correctly</h1>
      <p>Your Score Percentage is ${scorePercentage}%</p>
      <p>Remark: ${remark}</p>
      <button type="button" style="padding: 10px 20px; font-size: 18px; background-color: #28a745; color: white; border: none; cursor: pointer; margin-top: 10px;" onclick="location.href='index.html'" >Back to Menu</button>
      </div>
   
  `;

  footerEl.style.display = "none";
  stopTimer();
  document.getElementById("timer").style.display = "none";
  const quizLength = quizData.length;
  handleQuizCompletion(employeeIDInput.value.trim(), score, quizLength, scorePercentage, remark);
}

function markSavedAnswer() {
    const savedAnswer = userAnswers[currentQuiz];
  
    if (!savedAnswer) {
      return;
    }
  
    answerEl.forEach((answerEl) => {
      if (answerEl.id === savedAnswer) {
        answerEl.checked = true;
        answerEl.disabled = true;
        const correctAnswer = quizData[currentQuiz].correct;
        if (savedAnswer === correctAnswer) {
          answerEl.parentElement.classList.add("correct");
        } else {
          answerEl.parentElement.classList.add("wrong");
        }
      }
    });
  }
  
  function previousQuestion() {
    console.log("Navigating to previous question...");
    currentQuiz--;
  
    if (currentQuiz >= 0) {
      loadQuiz();
      markSavedAnswer();
  
      answerEl.forEach((answerEl) => {
        answerEl.disabled = false;
      });
  
      if (currentQuiz === quizData.length - 2) {
        const btnSubmit = document.getElementById("nextBtn");
        btnSubmit.innerText = "Next";
      }
  
      nextBtn.disabled = false;
    } else {
      currentQuiz = 0;
      backBtn.disabled = true;
    }
  }