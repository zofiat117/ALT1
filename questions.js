const questions = [
    { 
        question: "You find yourself in a forest with a bear, what do you do?", 
        answers: [
            { text: "run", correct: false},
            { text: "run", correct: false},
            { text: "kiss it", correct: true},
            { text: "run", correct: false},
        ] 
    },
    { 
        question: "You find yourself in a forest with a bear, what do you do?", 
        answers: [
            { text: "run", correct: false},
            { text: "run", correct: false},
            { text: "kiss it", correct: true},
            { text: "run", correct: false},
        ] 
    },
    { 
        question: "You find yourself in a forest with a bear, what do you do?", 
        answers: [
            { text: "run", correct: false},
            { text: "run", correct: false},
            { text: "kiss it", correct: true},
            { text: "run", correct: false},
        ] 
    },
    { 
        question: "You find yourself in a forest with a bear, what do you do?", 
        answers: [
            { text: "run", correct: false},
            { text: "run", correct: false},
            { text: "kiss it", correct: true},
            { text: "run", correct: false},
        ] 
    },
    { 
        question: "You find yourself in a forest with a bear, what do you do?", 
        answers: [
            { text: "run", correct: false},
            { text: "run", correct: false},
            { text: "kiss it", correct: true},
            { text: "run", correct: false},
        ] 
    }
   
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;

        if (!isCorrect && button.dataset.correct === "true") {
            button.classList.remove("correct"); 
        }
    });
    nextButton.style.display = "block"; 
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        StartQuiz();
    }
})

StartQuiz();