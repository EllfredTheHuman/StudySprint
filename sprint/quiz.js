```javascript
// =============================
// StudySprint Sprint Quiz
// =============================


// =============================
// Get URL Data
// =============================

const params = new URLSearchParams(window.location.search);

const subject = params.get("subject");
const topic = params.get("topic");



let questions = [];
let title = "";



// =============================
// Load Topic Questions
// =============================

if(topic === "heart"){

    questions = [...heartQuestions];

    title = "❤️ Heart Sprint";

}

else if(topic === "electricity"){

    questions = [...electricityQuestions];

    title = "⚡ Electricity Sprint";

}

else if(topic === "algebra"){

    questions = [...algebraQuestions];

    title = "➗ Algebra Sprint";

}

else if(topic === "geometry"){

    questions = [...geometryQuestions];

    title = "📐 Geometry Sprint";

}

else if(topic === "statistics"){

    questions = [...statisticsQuestions];

    title = "📊 Statistics Sprint";

}

else if(topic === "poetry"){

    questions = [...poetryQuestions];

    title = "📖 Poetry Sprint";

}

else if(topic === "grammar"){

    questions = [...grammarQuestions];

    title = "🔤 Grammar Sprint";

}

else if(topic === "geography"){

    questions = [...geographyQuestions];

    title = "🌍 Geography Sprint";

}

else if(topic === "history"){

    questions = [...historyQuestions];

    title = "🏛️ History Sprint";

}

else if(topic === "french"){

    questions = [...frenchQuestions];

    title = "🇫🇷 French Sprint";

}

else if(topic === "japanese"){

    questions = [...japaneseQuestions];

    title = "🇯🇵 Japanese Sprint";

}

else{

    alert("Topic not found!");

    window.location.href = "index.html";

}



// =============================
// Daily Subject Lock
// =============================

const today = new Date().toDateString();


const lockName =
"last" +
subject.charAt(0).toUpperCase() +
subject.slice(1) +
"Sprint";



if(localStorage.getItem(lockName) === today){

    document.body.innerHTML = `

    <header>

        <div class="logo">
        🚀 StudySprint
        </div>

    </header>


    <main>

        <section class="hero">

            <h1>
            ✅ Sprint Complete!
            </h1>

            <p>

            You have already completed today's
            ${subject} Sprint.

            <br><br>

            Come back tomorrow!

            </p>


            <a href="index.html" class="main-button">

            🏠 Back to Sprint

            </a>

        </section>

    </main>

    `;

    throw new Error("Sprint already completed");

}



// =============================
// Shuffle Function
// =============================

function shuffle(array){

    return array.sort(
        () => Math.random() - 0.5
    );

}



// =============================
// Pick 5 Random Questions
// =============================

questions =
shuffle(questions).slice(0, 5);



// =============================
// Shuffle Answers
// =============================

function shuffleAnswers(question){

    let answers =
    question.answers.map((answer, index) => {

        return {

            text: answer,

            correct:
            index === question.correct

        };

    });


    answers =
    shuffle(answers);


    question.answers =
    answers.map(
        answer => answer.text
    );


    question.correct =
    answers.findIndex(
        answer => answer.correct
    );

}



// =============================
// Quiz Setup
// =============================

document.getElementById("topic-title").textContent =
title;



let currentQuestion = 0;

let score = 0;

let answered = false;



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

const progressBar =
document.getElementById("progress-bar");



// =============================
// Load Question
// =============================

function loadQuestion(){

    answered = false;


    next.style.display = "none";


    feedback.textContent =
    "Choose an answer!";


    let q =
    questions[currentQuestion];


    shuffleAnswers(q);


    questionText.textContent =
    q.question;


    questionNumber.textContent =
    `Question ${currentQuestion + 1}/5`;


    // Update progress bar

    const progress =
    (currentQuestion / questions.length) * 100;


    progressBar.style.width =
    progress + "%";


    buttons.forEach((button, index) => {

        button.disabled = false;


        button.textContent =
        q.answers[index];


        button.onclick = () => {

            checkAnswer(index);

        };

    });

}



// =============================
// Check Answer
// =============================

function checkAnswer(answer){

    if(answered)

    return;


    answered = true;


    let q =
    questions[currentQuestion];


    buttons.forEach(button => {

        button.disabled = true;

    });



    if(answer === q.correct){

        score++;


        feedback.textContent =
        "✅ Correct!";

    }

    else{

        feedback.textContent =
        "❌ Correct answer: " +
        q.answers[q.correct];

    }



    next.style.display =
    "inline-block";

}



// =============================
// Next Question
// =============================

next.onclick = () => {

    currentQuestion++;


    if(currentQuestion >= questions.length){

        finishSprint();

    }

    else{

        loadQuestion();

    }

};



// =============================
// Finish Sprint
// =============================

function finishSprint(){

    // Base XP

    let xp =
    score * 5;


    // Completion bonus

    xp += 15;


    // Perfect bonus

    if(score === 5){

        xp += 25;

    }



    // Save XP

    let oldXP =
    Number(
        localStorage.getItem("XP")
    ) || 0;


    localStorage.setItem(
        "XP",
        oldXP + xp
    );



    // Lock subject

    localStorage.setItem(
        lockName,
        today
    );



    // Save results

    localStorage.setItem(
        "sprintScore",
        score
    );


    localStorage.setItem(
        "sprintXP",
        xp
    );



    // Finish

    window.location.href =
    "results.html";

}



// =============================
// Start
// =============================

loadQuestion();
```
