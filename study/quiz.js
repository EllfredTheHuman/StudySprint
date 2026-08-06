// ===============================
// StudySprint Quiz System
// ===============================


// Get topic

const params = new URLSearchParams(window.location.search);
const topic = params.get("topic");


// Shuffle questions

function shuffleArray(array){

    let copy = [...array];

    for(let i = copy.length - 1; i > 0; i--){

        let j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];

    }

    return copy;

}


// Load topic

let questions;

if(topic === "electricity"){

    document.getElementById("topic-title").textContent =
    "⚡ Electricity Quiz";

    questions =
    shuffleArray(electricityQuestions).slice(
        0,
        Math.min(15, electricityQuestions.length)
    );

}

else{

    document.getElementById("topic-title").textContent =
    "❤️ Heart Quiz";

    questions =
    shuffleArray(heartQuestions).slice(
        0,
        Math.min(15, heartQuestions.length)
    );

}



// Quiz variables

let currentQuestion = 0;
let score = 0;
let answered = false;


// Elements

const questionText =
document.getElementById("question");

const questionNumber =
document.getElementById("question-number");

const buttons =
document.querySelectorAll(".answer");

const feedback =
document.getElementById("feedback");

const next =
document.getElementById("next");




// ===============================
// Load Question
// ===============================

function loadQuestion(){


    answered = false;

    next.style.display = "none";

    feedback.textContent =
    "Choose an answer!";


    let q =
    questions[currentQuestion];


    questionText.textContent =
    q.question;


    questionNumber.textContent =
    `Question ${currentQuestion + 1}/${questions.length}`;



    buttons.forEach((button,index)=>{

        button.disabled = false;

        button.textContent =
        q.answers[index];

        button.onclick = () => {

            checkAnswer(index);

        };

    });

}




// ===============================
// Check Answer
// ===============================

function checkAnswer(answer){


    if(answered){

        return;

    }


    answered = true;


    let q =
    questions[currentQuestion];


    buttons.forEach(button=>{

        button.disabled = true;

    });



    if(answer === q.correct){

        score++;

        feedback.textContent =
        "✅ Correct! +10 XP";

    }

    else{

        feedback.textContent =
        "❌ Correct answer: " +
        q.answers[q.correct];

    }


    next.style.display =
    "inline-block";

}




// ===============================
// Next Question
// ===============================

next.onclick = () => {


    currentQuestion++;


    if(currentQuestion >= questions.length){

        finishQuiz();

    }

    else{

        loadQuestion();

    }


};




// ===============================
// Finish Quiz
// ===============================

function finishQuiz(){


    let percentage =
    Math.round(
        (score / questions.length) * 100
    );


    let earnedXP =
    score * 10;


    let oldXP =
    Number(localStorage.getItem("XP")) || 0;


    let oldQuizzes =
    Number(localStorage.getItem("quizzes")) || 0;


    let bestScore =
    Number(localStorage.getItem("bestScore")) || 0;



    // Save progress

    localStorage.setItem(
        "XP",
        oldXP + earnedXP
    );


    localStorage.setItem(
        "quizzes",
        oldQuizzes + 1
    );


    localStorage.setItem(
        "bestScore",
        Math.max(bestScore, percentage)
    );



    // Check achievements

    checkAchievements(
        score,
        questions.length,
        topic
    );



    // Save results

    localStorage.setItem(
        "quizScore",
        score
    );

    localStorage.setItem(
        "quizTotal",
        questions.length
    );

    localStorage.setItem(
        "quizPercentage",
        percentage
    );

    localStorage.setItem(
        "quizXP",
        earnedXP
    );



    window.location.href =
    "results.html";

}



// Start quiz

loadQuestion();
