import data from "./appData.js";

const startQuizBtn = document.querySelector(".enableInput");
const getNameCard = document.getElementById("getName");
const card = document.querySelector(".quizCardWrapper");
const alertDropdown = document.querySelector(".alert");
const cancelAlertDropdownBtn = document.getElementById("cancel_icon");
const userInputField = document.querySelector(".playerName");
const cardHeader = document.getElementById("setUserName");
const nextBtn = document.querySelector(".next");
const rootQuesBody = document.querySelector(".quesWrapper");
const currentQuestion = document.getElementById("questionCount");
const progressBar = document.querySelector(".progress");
let questionCount = 0,
  quizPoint = 0;
let unansweredQues = [...data];
console.log(unansweredQues);
let answeredOptions = [];
let timer;

const addToggleAlert = () => {
  alertDropdown.classList.add("toggle");
};

const removeToggleAlert = () => {
  alertDropdown.classList.remove("toggle");
};

const toggleActive = (event) => {
  const allLiElements = document.querySelectorAll("li");
  allLiElements.forEach((liEle) => {
    if (event.target.textContent === liEle.textContent) {
      liEle.classList.add("active");
    } else {
      liEle.classList.remove("active");
    }
  });
};

cancelAlertDropdownBtn.addEventListener("click", () => {
  removeToggleAlert();
  userInputField.classList.remove("redBorder");
});

const setUserName = () => {
  const userName = localStorage.getItem("name");
  cardHeader.textContent = `Welcome, ${userName}`;
};

const moveToQuizContent = () => {
  setUserName();
  getNameCard.style.display = "none";
  card.style.display = "block";
  timerHandler();
};

const createElements = (count) => {
  const ulElement = document.createElement("ul");
  const quesElement = document.createElement("h4");
  ulElement.classList.add("options");
  quesElement.classList.add("question");
  quesElement.textContent = data[count].question;
  currentQuestion.textContent = `${count+1}/5`;
  rootQuesBody.appendChild(quesElement);
  data[count].options.forEach((option) => {
    const liElement = document.createElement("li");
    liElement.addEventListener("click", toggleActive);
    liElement.className = "option";
    liElement.textContent = option;
    ulElement.appendChild(liElement);
  });
  rootQuesBody.appendChild(ulElement);
};

const timerHandler = (type = "start") => {
  if (type === "stop" && timer) {
    clearInterval(timer);
    return;
  }
  let initialSecond = 60;
  timer = setInterval(() => {
    if (initialSecond <= 0) {
      clearInterval(timer);
      return;
    }
    initialSecond--;
    let progressPercent = Math.ceil(100 - (initialSecond * 100) / 60);
    progressBar.style.transform = `translateX(-${progressPercent}%)`;
    progressBar.style.backgroundColor =
      progressPercent >= 50 ? "red" : "#01e327";
  }, 1000);
};

const calculateResult = (choosedAnswer) => {
  if (choosedAnswer === unansweredQues[questionCount].ans) {
    quizPoint += 10;
    console.log(quizPoint);
  } else {
    return;
  }
};

const nextQuestion = () => {
  const activeLi = document.querySelector("li.active");
  if (activeLi) {
    calculateResult(activeLi.textContent);
  } else {
    return;
  }
  questionCount++;
  if (questionCount > unansweredQues.length - 1) {
    timerHandler("stop");
    console.log("dafa");
    return;
  }
  while (rootQuesBody.firstChild) {
    rootQuesBody.removeChild(rootQuesBody.firstChild);
  }
  timerHandler();
  createElements(questionCount);
};

startQuizBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userName = userInputField.value.trim();
  if (!userName) {
    addToggleAlert();
    userInputField.classList.add("redBorder");
    return;
  }
  localStorage.setItem("name", userName.toUpperCase());
  removeToggleAlert();
  createElements(questionCount);
  moveToQuizContent();
});

nextBtn.addEventListener("click", nextQuestion);
