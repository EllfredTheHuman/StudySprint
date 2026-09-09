/* =========================================================
   STUDYSPRINT SPRINT QUIZ
   Supports:
   - Multiple choice questions
   - Written answer questions
   - 5 questions per Sprint
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const QUESTIONS_PER_SPRINT = 5;


/* =========================================================
   GET TOPIC
========================================================= */

const params = new URLSearchParams(
    window.location.search
);

const subject =
    params.get("subject") || "english";

const topic =
    params.get("topic") || "Grammar";


/* =========================================================
   QUESTION STORAGE
========================================================= */

let allQuestions = [];

let sprintQuestions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;


/* =========================================================
   LOAD QUESTION FILE
========================================================= */

async function loadQuestions() {

    try {

        const script =
            document.createElement("script");

        script.src =
            `../../questions/${subject}.js`;

        script.onload = function() {

            const variableName =
                subject + "Questions";

            const questionData =
                window[variableName];

            if (!questionData) {

                showError(
                    `Could not find questions for ${subject}.`
                );

                return;

            }

            allQuestions =
                questionData[topic] || [];

            if (!allQuestions.length) {

                showError(
                    `No questions found for ${topic}.`
                );

                return;

            }

            startSprint();

        };


        script.onerror = function() {

            showError(
                `Could not load questions/${subject}.js`
            );

        };


        document.head.appendChild(
            script
        );

    }

    catch (error) {

        console.error(error);

        showError(
            "Something went wrong while loading the questions."
        );

    }

}


/* =========================================================
   START SPRINT
========================================================= */

function startSprint() {

    const shuffled =
        [...allQuestions]
            .sort(
                () => Math.random() - 0.5
            );


    sprintQuestions =
        shuffled.slice(
            0,
            Math.min(
                QUESTIONS_PER_SPRINT,
                shuffled.length
            )
        );


    currentQuestion = 0;

    score = 0;

    answered = false;


    renderQuestion();

}


/* =========================================================
   GET ELEMENTS
========================================================= */

function getElement(id) {

    return document.getElementById(id);

}


/* =========================================================
   RENDER QUESTION
========================================================= */

function renderQuestion() {

    if (
        currentQuestion >=
        sprintQuestions.length
    ) {

        finishSprint();

        return;

    }


    answered = false;


    const question =
        sprintQuestions[currentQuestion];


    const questionNumber =
        currentQuestion + 1;


    const total =
        sprintQuestions.length;


    const questionElement =
        getElement("question");


    const answersElement =
        getElement("answers");


    const progressElement =
        getElement("progress");


    const numberElement =
        getElement("question-number");


    const feedbackElement =
        getElement("feedback");


    if (questionElement) {

        questionElement.textContent =
            question.question;

    }


    if (numberElement) {

        numberElement.textContent =
            `${questionNumber} / ${total}`;

    }


    if (progressElement) {

        progressElement.style.width =
            `${(questionNumber / total) * 100}%`;

    }


    if (feedbackElement) {

        feedbackElement.textContent = "";

        feedbackElement.className =
            "feedback";

    }


    if (!answersElement)
        return;


    answersElement.innerHTML = "";


    /*
       QUESTION TYPE

       If type is "written", the user types
       an answer.

       Otherwise it defaults to multiple choice.
    */

    if (
        question.type === "written"
    ) {

        renderWrittenQuestion(
            question,
            answersElement
        );

    }

    else {

        renderMultipleChoice(
            question,
            answersElement
        );

    }

}


/* =========================================================
   MULTIPLE CHOICE
========================================================= */

function renderMultipleChoice(
    question,
    container
) {

    if (
        !Array.isArray(
            question.answers
        )
    ) {

        showError(
            "This question has no answer choices."
        );

        return;

    }


    question.answers.forEach(
        function(answer, index) {

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.className =
                "answer-button";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                function() {

                    if (answered)
                        return;


                    answered = true;


                    checkMultipleChoice(
                        question,
                        index,
                        container
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   WRITTEN ANSWER
========================================================= */

function renderWrittenQuestion(
    question,
    container
) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "written-answer";


    const input =
        document.createElement("textarea");


    input.id =
        "written-answer-input";


    input.className =
        "written-answer-input";


    input.placeholder =
        "Write your answer here...";


    input.rows = 5;


    const submit =
        document.createElement("button");


    submit.type =
        "button";


    submit.className =
        "answer-submit";


    submit.textContent =
        "Submit Answer";


    submit.addEventListener(
        "click",
        function() {

            if (answered)
                return;


            const answer =
                input.value.trim();


            if (!answer) {

                input.focus();

                return;

            }


            answered = true;


            checkWrittenAnswer(
                question,
                answer
            );

        }
    );


    wrapper.appendChild(
        input
    );


    wrapper.appendChild(
        submit
    );


    container.appendChild(
        wrapper
    );

}


/* =========================================================
   MULTIPLE CHOICE CHECK
========================================================= */

function checkMultipleChoice(
    question,
    selected,
    container
) {

    const buttons =
        container.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        function(button, index) {

            button.disabled = true;


            if (
                index === question.correct
            ) {

                button.classList.add(
                    "correct"
                );

            }


            if (
                index === selected &&
                selected !== question.correct
            ) {

                button.classList.add(
                    "incorrect"
                );

            }

        }
    );


    if (
        selected === question.correct
    ) {

        score++;

        showFeedback(
            true,
            question.explanation
        );

    }

    else {

        showFeedback(
            false,
            question.explanation
        );

    }


    showNextButton();

}


/* =========================================================
   WRITTEN ANSWER CHECK
========================================================= */

function checkWrittenAnswer(
    question,
    answer
) {

    /*
       Written questions can have several
       accepted answers.

       Example:

       acceptedAnswers: [
           "photosynthesis",
           "the process plants use to make food"
       ]

       For now this performs a local check.

       The structure is ready for an AI
       checker to replace this later.
    */


    const accepted =
        Array.isArray(
            question.acceptedAnswers
        )
            ? question.acceptedAnswers
            : [];


    const normalisedAnswer =
        normaliseAnswer(answer);


    let correct = false;


    for (
        const acceptedAnswer of accepted
    ) {

        if (
            normaliseAnswer(
                acceptedAnswer
            ) === normalisedAnswer
        ) {

            correct = true;

            break;

        }

    }


    /*
       Optional exact-answer fallback.

       This allows:

       answer: "..."

       to work for written questions too.
    */

    if (
        !correct &&
        typeof question.answer === "string"
    ) {

        correct =
            normaliseAnswer(
                question.answer
            ) === normalisedAnswer;

    }


    if (correct) {

        score++;

        showFeedback(
            true,
            question.explanation
        );

    }

    else {

        showFeedback(
            false,
            question.explanation
        );

    }


    showNextButton();

}


/* =========================================================
   NORMALISE WRITTEN ANSWER
========================================================= */

function normaliseAnswer(answer) {

    return String(answer)
        .toLowerCase()
        .trim()
        .replace(
            /[.,!?;:"'()[\]{}]/g,
            ""
        )
        .replace(
            /\s+/g,
            " "
        );

}


/* =========================================================
   FEEDBACK
========================================================= */

function showFeedback(
    correct,
    explanation
) {

    const feedback =
        getElement("feedback");


    if (!feedback)
        return;


    feedback.className =
        correct
            ? "feedback correct"
            : "feedback incorrect";


    feedback.textContent =
        correct
            ? `Correct! ${explanation || ""}`
            : `Not quite. ${explanation || ""}`;

}


/* =========================================================
   NEXT BUTTON
========================================================= */

function showNextButton() {

    let button =
        getElement("next-question");


    if (!button) {

        button =
            document.createElement("button");

        button.id =
            "next-question";

        button.type =
            "button";

        button.className =
            "next-question";


        const answers =
            getElement("answers");


        if (answers) {

            answers.parentElement.appendChild(
                button
            );

        }

    }


    if (
        currentQuestion >=
        sprintQuestions.length - 1
    ) {

        button.textContent =
            "Finish Sprint →";

    }

    else {

        button.textContent =
            "Next Question →";

    }


    button.style.display =
        "block";


    button.onclick =
        function() {

            button.style.display =
                "none";


            currentQuestion++;

            renderQuestion();

        };

}


/* =========================================================
   FINISH SPRINT
========================================================= */

function finishSprint() {

    const percentage =
        Math.round(
            (
                score /
                sprintQuestions.length
            ) * 100
        );


    /*
       Save sprint statistics.
    */

    const oldSprints =
        Number(
            localStorage.getItem(
                "sprintsCompleted"
            )
        ) || 0;


    localStorage.setItem(
        "sprintsCompleted",
        oldSprints + 1
    );


    const oldBest =
        Number(
            localStorage.getItem(
                "bestScore"
            )
        ) || 0;


    if (
        percentage > oldBest
    ) {

        localStorage.setItem(
            "bestScore",
            percentage
        );

    }


    /*
       Redirect to results page if one exists.
    */

    window.location.href =
        `results.html?score=${score}&total=${sprintQuestions.length}&percentage=${percentage}`;

}


/* =========================================================
   ERROR
========================================================= */

function showError(message) {

    console.error(
        "StudySprint:",
        message
    );


    const app =
        document.querySelector(".app") ||
        document.body;


    app.innerHTML = `
        <div class="quiz-error">
            <h1>Something went wrong.</h1>
            <p>${message}</p>
            <button
                type="button"
                onclick="history.back()"
            >
                Go Back
            </button>
        </div>
    `;

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadQuestions();

    }
);
