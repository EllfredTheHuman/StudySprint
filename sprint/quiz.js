const params = new URLSearchParams(window.location.search);

const subject = params.get("subject");
const topic = params.get("topic");

let questions = [];
let title = "";


// =============================
// LOAD TOPIC
// =============================

if (topic === "heart") {
    questions = [...heartQuestions];
    title = "❤️ Heart Sprint";
}

else if (topic === "electricity") {
    questions = [...electricityQuestions];
    title = "⚡ Electricity Sprint";
}

else if (topic === "cells") {
    questions = [...cellsQuestions];
    title = "🧬 Cells Sprint";
}

else if (topic === "algebra") {
    questions = [...algebraQuestions];
    title = "➗ Algebra Sprint";
}

else if (topic === "geometry") {
    questions = [...geometryQuestions];
    title = "📐 Geometry Sprint";
}

else if (topic === "BIDMAS") {
    questions = [...BIDMAS];
    title = "🧮 BIDMAS Sprint";
}

else if (topic === "englishGrammar") {
    questions = [...englishGrammarQuestions];
    title = "🔤 Grammar Sprint";
}

else if (topic === "literature") {
    questions = [...literatureQuestions];
    title = "📚 Literature Sprint";
}

else if (topic === "poetry") {
    questions = [...poetryQuestions];
    title = "📖 Poetry Sprint";
}

else if (topic === "geography") {
    questions = [...geographyQuestions];
    title = "🌍 Geography Sprint";
}

else if (topic === "history") {
    questions = [...historyQuestions];
    title = "🏛️ History Sprint";
}

else if (topic === "civics") {
    questions = [...civicsQuestions];
    title = "⚖️ Civics Sprint";
}

else if (topic === "frenchVocabulary") {
    questions = [...frenchVocabularyQuestions];
    title = "🇫🇷 French Vocabulary Sprint";
}

else if (topic === "frenchGrammar") {
    questions = [...frenchGrammarQuestions];
    title = "🇫🇷 French Grammar Sprint";
}

else if (topic === "frenchConversation") {
    questions = [...frechConversationQuestions];
    title = "💬 French Conversation Sprint";
}

else if (topic === "japaneseVocabulary") {
    questions = [...japaneseVocabularyQuestions];
    title = "🇯🇵 Japanese Vocabulary Sprint";
}

else if (topic === "japaneseHiragana") {
    questions = [...japaneseHiraganaQuestions];
    title = "あ Hiragana Sprint";
}

else if (topic === "japaneseGrammar") {
    questions = [...japaneseGrammarQuestions];
    title = "🇯🇵 Japanese Grammar Sprint";
}

else {
    alert("Topic not found!");
    window.location.href = "index.html";
    throw new Error("Topic not found");
}


// =============================
// CHECK QUESTIONS
// =============================

if (!questions || questions.length === 0) {

    alert("This topic has no questions!");

    throw new Error("No questions found");

}


// =============================
// DAILY LOCK
// =============================

const today = new Date().toDateString();

const lockName =
    "last" +
    subject.charAt(0).toUpperCase() +
    subject.slice(1) +
    "Sprint";


if (localStorage.getItem(lockName) === today) {

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
// SHUFFLE
// =============================

function shuffle(array) {

    return array.sort(
        () => Math.random() - 0.5
    );

}


// =============================
// PICK 5 QUESTIONS
// =============================

questions =
    shuffle(questions).slice(0, 5);


// =============================
// SHUFFLE ANSWERS
// =============================

function shuffleAnswers(question) {

    let answers =
        question.answers.map(
            (answer, index) => {

                return {

                    text: answer,

                    correct:
                        index === question.correct

                };

            }
        );


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
// QUIZ SETUP
// =============================

document.getElementById(
    "topic-title"
).textContent = title;


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
// LOAD QUESTION
// =============================

function loadQuestion() {

    answered = false;

    next.style.display = "none";

    feedback.textContent =
        "Choose an answer!";


    const q =
        questions[currentQuestion];


    shuffleAnswers(q);


    questionText.textContent =
        q.question;


    questionNumber.textContent =
        `Question ${currentQuestion + 1}/5`;


    const progress =
        (currentQuestion / questions.length) * 100;


    progressBar.style.width =
        progress + "%";


    buttons.forEach(
        (button, index) => {

            button.disabled = false;

            button.textContent =
                q.answers[index];

            button.onclick = () => {

                checkAnswer(index);

            };

        }
    );

}


// =============================
// CHECK ANSWER
// =============================

function checkAnswer(answer) {

    if (answered) {
        return;
    }


    answered = true;


    const q =
        questions[currentQuestion];


    buttons.forEach(
        button => {

            button.disabled = true;

        }
    );


    if (answer === q.correct) {

        score++;

        feedback.textContent =
            "✅ Correct!";

    }

    else {

        feedback.textContent =
            "❌ Correct answer: " +
            q.answers[q.correct];

    }


    next.style.display =
        "inline-block";

}


// =============================
// NEXT QUESTION
// =============================

next.onclick = () => {

    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        finishSprint();

    }

    else {

        loadQuestion();

    }

};


// =============================
// FINISH SPRINT
// =============================

function finishSprint() {

    let xp =
        score * 5;


    xp += 15;


    if (score === 5) {

        xp += 25;

    }


    let oldXP =
        Number(
            localStorage.getItem("XP")
        ) || 0;


    localStorage.setItem(
        "XP",
        oldXP + xp
    );


    localStorage.setItem(
        lockName,
        today
    );


    localStorage.setItem(
        "sprintScore",
        score
    );


    localStorage.setItem(
        "sprintXP",
        xp
    );


    window.location.href =
        "results.html";

}


// =============================
// START
// =============================

loadQuestion();
