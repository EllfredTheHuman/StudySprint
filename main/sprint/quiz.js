// ==========================================
// STUDYSPRINT QUIZ
// ==========================================

const params = new URLSearchParams(window.location.search);

const subject = params.get("subject") || "english";
const topic = params.get("topic") || "Grammar";


// ==========================================
// ELEMENTS
// ==========================================

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionNumberElement = document.getElementById("question-number");
const topicElement = document.getElementById("quiz-topic");

const feedbackElement = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackText = document.getElementById("feedback-text");

const nextButton = document.getElementById("next-question");

const writtenArea = document.getElementById("written-area");
const writtenAnswer = document.getElementById("written-answer");
const submitWritten = document.getElementById("submit-written");


topicElement.textContent =
    subject.charAt(0).toUpperCase() +
    subject.slice(1) +
    " • " +
    topic;


// ==========================================
// QUIZ VARIABLES
// ==========================================

let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


// ==========================================
// LOAD QUESTION FILE
// ==========================================

async function loadQuestions() {

    try {

        const filePath = `../../questions/${subject}.js`;

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(
                `Could not load ${filePath} (${response.status})`
            );
        }

        const code = await response.text();


        /*
         * Your question files currently use:
         *
         * const englishQuestions = {...}
         *
         * Top-level const variables aren't placed on window.
         *
         * So we execute the file and return the variable directly.
         */

        const variableName =
            subject.toLowerCase() + "Questions";


        const getQuestions = new Function(
            code +
            `\nreturn typeof ${variableName} !== "undefined"
                ? ${variableName}
                : null;`
        );


        const allQuestions = getQuestions();


        if (!allQuestions) {
            throw new Error(
                `Could not find ${variableName} inside ${filePath}`
            );
        }


        if (!allQuestions[topic]) {
            throw new Error(
                `Topic "${topic}" does not exist in ${variableName}`
            );
        }


        questions = shuffle(
            [...allQuestions[topic]]
        ).slice(0, 5);


        if (questions.length === 0) {
            throw new Error("This topic has no questions.");
        }


        currentQuestion = 0;
        score = 0;

        showQuestion();

    } catch (error) {

        console.error(error);

        questionElement.textContent =
            "Could not load questions.";

        answersElement.innerHTML = `
            <div class="feature-card">
                <h2>⚠️ Error</h2>
                <p>${escapeHTML(error.message)}</p>
                <br>
                <a href="index.html" class="main-button">
                    Back
                </a>
            </div>
        `;

    }

}


// ==========================================
// SHUFFLE
// ==========================================

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[j]] =
            [array[j], array[i]];
    }

    return array;
}


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];


    questionNumberElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    questionElement.textContent =
        question.question;


    feedbackElement.style.display = "none";

    writtenArea.style.display = "none";

    answersElement.innerHTML = "";


    // ======================================
    // WRITTEN QUESTION
    // ======================================

    if (question.type === "written") {

        writtenArea.style.display = "block";

        writtenAnswer.value = "";

        writtenAnswer.focus();

        return;
    }


    // ======================================
    // MULTIPLE CHOICE
    // ======================================

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "main-button";

        button.textContent = answer;

        button.style.display = "block";
        button.style.width = "100%";
        button.style.margin = "10px 0";


        button.addEventListener(
            "click",
            () => checkMultipleChoice(index)
        );


        answersElement.appendChild(button);

    });

}


// ==========================================
// MULTIPLE CHOICE CHECK
// ==========================================

function checkMultipleChoice(selected) {

    if (answered) return;

    answered = true;


    const question =
        questions[currentQuestion];


    const correct =
        selected === question.correct;


    if (correct) {
        score++;
    }


    showFeedback(
        correct,
        correct
            ? "Correct!"
            : "Incorrect!",
        question.explanation || ""
    );

}


// ==========================================
// WRITTEN ANSWER
// ==========================================

submitWritten.addEventListener(
    "click",
    checkWrittenAnswer
);


function checkWrittenAnswer() {

    if (answered) return;


    const answer =
        writtenAnswer.value.trim();


    if (!answer) {

        alert("Please enter an answer.");

        return;
    }


    answered = true;


    const question =
        questions[currentQuestion];


    /*
     * Temporary local checker.
     *
     * This supports expectedAnswer / acceptedAnswers.
     * Proper AI checking can be connected later.
     */

    const studentAnswer =
        normalise(answer);


    let correct = false;


    if (Array.isArray(question.acceptedAnswers)) {

        correct =
            question.acceptedAnswers.some(
                accepted =>
                    normalise(accepted) === studentAnswer
            );

    }


    if (question.expectedAnswer) {

        correct =
            normalise(question.expectedAnswer) ===
            studentAnswer;

    }


    if (correct) {
        score++;
    }


    showFeedback(
        correct,
        correct
            ? "Correct!"
            : "Not quite!",
        question.explanation || ""
    );

}


// ==========================================
// FEEDBACK
// ==========================================

function showFeedback(
    correct,
    title,
    explanation
) {

    feedbackElement.style.display = "block";


    feedbackTitle.textContent =
        title;


    feedbackText.textContent =
        explanation;


    answersElement
        .querySelectorAll("button")
        .forEach(button => {
            button.disabled = true;
        });


    writtenAnswer.disabled =
        true;


    submitWritten.disabled =
        true;


    if (currentQuestion >= questions.length - 1) {

        nextButton.textContent =
            "Finish Sprint";

    } else {

        nextButton.textContent =
            "Next Question";

    }

}


// ==========================================
// NEXT QUESTION
// ==========================================

nextButton.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            finishQuiz();

            return;
        }


        writtenAnswer.disabled =
            false;

        submitWritten.disabled =
            false;


        showQuestion();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ==========================================
// FINISH
// ==========================================

function finishQuiz() {

    const completed =
        Number(
            localStorage.getItem("sprintsCompleted")
        ) || 0;


    localStorage.setItem(
        "sprintsCompleted",
        completed + 1
    );


    const best =
        Number(
            localStorage.getItem("bestScore")
        ) || 0;


    if (score > best) {

        localStorage.setItem(
            "bestScore",
            score
        );

    }


    window.location.href =
        `results.html?score=${score}&total=${questions.length}&subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}`;

}


// ==========================================
// NORMALISE ANSWER
// ==========================================

function normalise(value) {

    return value
        .toLowerCase()
        .trim()
        .replace(/[.,!?;:]/g, "")
        .replace(/\s+/g, " ");

}


// ==========================================
// HTML ESCAPE
// ==========================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================================
// START
// ==========================================

loadQuestions();
