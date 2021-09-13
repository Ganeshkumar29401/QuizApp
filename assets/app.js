const startQuizBtn = document.querySelector(".enableInput");
const getName = document.getElementById('getName');
const card = document.querySelector(".quizCardWrapper");
startQuizBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getName.style.display = 'none';
    card.style.display = 'block';
})