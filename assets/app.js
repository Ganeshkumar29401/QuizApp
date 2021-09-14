const startQuizBtn = document.querySelector(".enableInput");
const getName = document.getElementById('getName');
const card = document.querySelector(".quizCardWrapper");
const alertDropdown = document.querySelector(".alert");
const cancelAlertDropdown = document.getElementById("cancel_icon");
const userInputField = document.querySelector(".playerName");

startQuizBtn.addEventListener('click', (e) => {
    const userName = document.querySelector(".playerName").value.trim();
    if(!userName){
        alertDropdown.classList.toggle('toggle');
        userInputField.classList.add('redBorder');
        return;
    }
    e.preventDefault();
    alertDropdown.classList.toggle('toggle');
    getName.style.display = 'none';
    card.style.display = 'block';
    console.log(userName);
})

cancelAlertDropdown.addEventListener('click', () => {
    alertDropdown.classList.toggle('toggle');
    userInputField.classList.remove('redBorder');
});