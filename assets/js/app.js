import data from './appData.js';

const startQuizBtn = document.querySelector(".enableInput");
const getNameCard = document.getElementById('getName');
const card = document.querySelector(".quizCardWrapper");
const alertDropdown = document.querySelector(".alert");
const cancelAlertDropdownBtn = document.getElementById("cancel_icon");
const userInputField = document.querySelector(".playerName");
const cardHeader = document.getElementById("setUserName");
const question = document.querySelector(".question");
const opt1 = document.querySelector(".opt1");
const opt2 = document.querySelector(".opt2");
const opt3 = document.querySelector(".opt3");
const opt4 = document.querySelector(".opt4");
const nextBtn = document.querySelector(".next");

console.log(question, opt1,opt2,opt3,opt4);

const addToggleAlert = () => {
    alertDropdown.classList.add('toggle');
};

const removeToggleAlert = () => {
    alertDropdown.classList.remove('toggle');
};

const setUserName = () => {
    const userName = localStorage.getItem('name');
    cardHeader.textContent = `Welcome, ${userName}`;
};

const moveToQuizContent = () => {
    setUserName();
    getNameCard.style.display = 'none';
    card.style.display = 'block';
};


startQuizBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userName = userInputField.value.trim();
    if(!userName){
        addToggleAlert();
        userInputField.classList.add('redBorder');
        return;
    }
    localStorage.setItem('name', userName.toUpperCase());
    moveToQuizContent();
})

cancelAlertDropdownBtn.addEventListener('click', () => {
    removeToggleAlert();
    userInputField.classList.remove('redBorder');
});