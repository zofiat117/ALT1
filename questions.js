const questions = [
    { 
        question: "You find yourself in a forest with a brown bear, what do you do?", 
        answers: [
            { text: "Run", correct: false},
            { text: "Play dead", correct: false},
            { text: "Take height", correct: true},
            { text: "Stand still", correct: false},
        ] 
    },
    { 
        question: "You find yourself in a forest with a black bear, what do you do?", 
        answers: [
            { text: "Play dead", correct: false},
            { text: "Take height", correct: false},
            { text: "Stand still", correct: true},
            { text: "Run", correct: false},
        ] 
    },
    { 
        question: "You find yourself in a falling elevator, how do you survive?", 
        answers: [
            { text: "Put your hands behind your head and crouch down", correct: false},
            { text: "Jump before impact", correct: false},
            { text: "Hold onto the railing and stand firmly", correct: true},
            { text: "Lay flat on your back", correct: false},
        ] 
    },
    { 
        question: "A fire breaks out in your house at night, and the hallway is filled with smoke, what do you do?", 
        answers: [
            { text: "Move quickly through the smoke while holding your breath to avoid inhaling toxins", correct: false},
            { text: "Wrap yourself in a blanket to protect against burns and then run to the nearest exit", correct: false},
            { text: "Stay low to the ground, crawl to the nearest exit and cover your nose and mouth with a damp cloth", correct: true},
            { text: "Open a window and wait for rescuers to arrive, avoid opening doors to stop fire from spreading", correct: false},
        ] 
    },
    { 
        question: "Your car plunges into a lake and begins to sink, what should you do?", 
        answers: [
            { text: "Roll down / Break the window and escape before the car fills with water", correct: false},
            { text: "Call for help first, wait until emergency services arrive before trying to exit the car", correct: false},
            { text: "Wait until the car is fully submerged to equalise the pressure, making it easier to open the door", correct: true},
            { text: "Turn on the car's interior lights and wait until the water pressure stabilises to give you more time to act", correct: false},
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