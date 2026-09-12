/* =========================================================
   STUDYSPRINT — SPRINT ENGINE
========================================================= */


const params =
    new URLSearchParams(
        window.location.search
    );


const subject =
    params.get("subject");


const topicName =
    params.get("topic");


const questionFile =
    params.get("file");


const QUESTION_COUNT = 5;


let allQuestions = [];

let sprintQuestions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;


/* =========================================================
   ELEMENTS
========================================================= */

const topicTitle =
    document.getElementById(
        "topic-title"
    );


const questionNumber =
    document.getElementById(
        "question-number"
    );


const questionText =
    document.getElementById(
        "question"
    );


const answersContainer =
    document.getElementById(
        "answers"
    );


const feedback =
    document.getElementById(
        "feedback"
    );


const feedbackIcon =
    document.getElementById(
        "feedback-icon"
    );


const feedbackTitle =
    document.getElementById(
        "feedback-title"
    );


const feedbackText =
    document.getElementById(
        "feedback-text"
    );


const nextButton =
    document.getElementById(
        "next-button"
    );


const nextText =
    document.getElementById(
        "next-text"
    );


const progressBar =
    document.getElementById(
        "progress-bar"
    );


/* =========================================================
   VALIDATION
========================================================= */

if (
    !subject ||
    !topicName ||
    !questionFile
) {

    showFatalError(
        "This Sprint link is incomplete."
    );

}


/* =========================================================
   TITLE
========================================================= */

topicTitle.textContent =
    topicName || "Sprint";


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    const copy =
        [...array];


    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        const temporary =
            copy[i];


        copy[i] =
            copy[randomIndex];


        copy[randomIndex] =
            temporary;

    }


    return copy;

}


/* =========================================================
   LOAD QUESTION FILE
========================================================= */

async function loadQuestionFile() {

    try {

        const response =
            await fetch(
                questionFile,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Question file could not be loaded."
            );

        }


        const source =
            await response.text();


        /*
         * The question files contain arrays such as:
         *
         * const someQuestions = [
         *     ...
         * ];
         *
         * We expose that array temporarily so this
         * engine does not need to know the variable
         * name inside every individual question file.
         */

        const declaration =
            source.match(
                /(?:const|let|var)\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*\[/
            );


        if (!declaration) {

            throw new Error(
                "No question array was found."
            );

        }


        const variableName =
            declaration[1];


        const replacement =
            "window.__STUDYSPRINT_QUESTIONS = [";


        const modifiedSource =
            source.replace(
                declaration[0],
                replacement
            );


        window.__STUDYSPRINT_QUESTIONS =
            null;


        const runner =
            new Function(
                modifiedSource +
                "\nreturn window.__STUDYSPRINT_QUESTIONS;"
            );


        const loadedQuestions =
            runner();


        window.__STUDYSPRINT_QUESTIONS =
            null;


        if (
            !Array.isArray(
                loadedQuestions
            )
        ) {

            throw new Error(
                "The question file did not return a question array."
            );

        }


        allQuestions =
            loadedQuestions
                .filter(
                    question =>
                        question &&
                        (
                            question.type === "multiple" ||
                            Array.isArray(
                                question.answers
                            )
                        )
                );


        if (
            allQuestions.length === 0
        ) {

            throw new Error(
                "This topic has no multiple-choice questions yet."
            );

        }


        startSprint();

    }

    catch (error) {

        console.error(
            "StudySprint Sprint error:",
            error
        );


        showFatalError(
            "We couldn't load this topic's questions."
        );

    }

}


/* =========================================================
   START SPRINT
========================================================= */

function startSprint() {

    sprintQuestions =
        shuffle(
            allQuestions
        ).slice(
            0,
            Math.min(
                QUESTION_COUNT,
                allQuestions.length
            )
        );


    if (
        sprintQuestions.length === 0
    ) {

        showFatalError(
            "There aren't enough questions for this Sprint."
        );

        return;

    }


    currentQuestion =
        0;


    score =
        0;


    loadQuestion();

}


/* =========================================================
   NORMALISE QUESTION
========================================================= */

function normaliseQuestion(question) {

    /*
     * Current StudySprint format:
     *
     * {
     *     type: "multiple",
     *     question: "...",
     *     answers: ["A", "B", "C", "D"],
     *     correctAnswer: "B"
     * }
     *
     * The older Sprint format used:
     *
     * answers + correct
     *
     * This keeps the Sprint compatible with either.
     */


    if (
        Array.isArray(
            question.answers
        )
    ) {

        let answers =
            [...question.answers];


        let correctAnswer =
            question.correctAnswer;


        if (
            correctAnswer === undefined &&
            typeof question.correct === "number"
        ) {

            correctAnswer =
                question.answers[
                    question.correct
                ];

        }


        return {
            question:
                String(
                    question.question ||
                    ""
                ),

            answers,

            correctAnswer:
                correctAnswer === undefined
                    ? ""
                    : String(
                        correctAnswer
                    )
        };

    }


    return {
        question:
            String(
                question.question ||
                ""
            ),

        answers: [],

        correctAnswer: ""
    };

}


/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion() {

    answered =
        false;


    const question =
        normaliseQuestion(
            sprintQuestions[
                currentQuestion
            ]
        );


    if (
        !question.question ||
        question.answers.length < 2 ||
        !question.correctAnswer
    ) {

        showFatalError(
            "One of the questions in this topic is incorrectly formatted."
        );

        return;

    }


    answersContainer.innerHTML =
        "";


    feedback.classList.add(
        "hidden"
    );


    feedback.classList.remove(
        "wrong"
    );


    nextButton.classList.add(
        "hidden"
    );


    questionNumber.textContent =
        `${currentQuestion + 1} / ${sprintQuestions.length}`;


    questionText.textContent =
        question.question;


    const progress =
        (
            currentQuestion /
            sprintQuestions.length
        ) * 100;


    progressBar.style.width =
        `${progress}%`;


    const shuffledAnswers =
        shuffle(
            question.answers
        );


    shuffledAnswers.forEach(
        (
            answer,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "answer-button";


            const letter =
                document.createElement(
                    "span"
                );


            letter.className =
                "answer-letter";


            letter.textContent =
                String.fromCharCode(
                    65 + index
                );


            const text =
                document.createElement(
                    "span"
                );


            text.className =
                "answer-text";


            text.textContent =
                answer;


            const result =
                document.createElement(
                    "span"
                );


            result.className =
                "answer-result";


            result.textContent =
                "✓";


            button.appendChild(
                letter
            );


            button.appendChild(
                text
            );


            button.appendChild(
                result
            );


            button.addEventListener(
                "click",
                function () {

                    checkAnswer(
                        answer,
                        question.correctAnswer,
                        button
                    );

                }
            );


            answersContainer.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   CHECK ANSWER
========================================================= */

function checkAnswer(
    selectedAnswer,
    correctAnswer,
    selectedButton
) {

    if (answered) {
        return;
    }


    answered =
        true;


    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        button => {
            button.disabled =
                true;
        }
    );


    const isCorrect =
        selectedAnswer.trim() ===
        correctAnswer.trim();


    if (isCorrect) {

        score++;


        selectedButton.classList.add(
            "correct"
        );


        selectedButton
            .querySelector(
                ".answer-result"
            )
            .textContent =
            "✓";


        feedbackIcon.textContent =
            "✓";


        feedbackTitle.textContent =
            "Correct";


        feedbackText.textContent =
            "Nice work. Keep going.";


        feedback.classList.remove(
            "hidden"
        );


        feedback.classList.remove(
            "wrong"
        );

    }

    else {

        selectedButton.classList.add(
            "wrong"
        );


        selectedButton
            .querySelector(
                ".answer-result"
            )
            .textContent =
            "×";


        buttons.forEach(
            button => {

                const text =
                    button.querySelector(
                        ".answer-text"
                    );


                if (
                    text &&
                    text.textContent.trim() ===
                    correctAnswer.trim()
                ) {

                    button.classList.add(
                        "correct"
                    );


                    button.querySelector(
                        ".answer-result"
                    ).textContent =
                        "✓";

                }

            }
        );


        feedbackIcon.textContent =
            "×";


        feedbackTitle.textContent =
            "Not quite";


        feedbackText.textContent =
            "The correct answer is " +
            correctAnswer +
            ".";


        feedback.classList.remove(
            "hidden"
        );


        feedback.classList.add(
            "wrong"
        );

    }


    if (
        currentQuestion ===
        sprintQuestions.length - 1
    ) {

        nextText.textContent =
            "See Results";

    }

    else {

        nextText.textContent =
            "Next Question";

    }


    nextButton.classList.remove(
        "hidden"
    );

}


/* =========================================================
   NEXT
========================================================= */

nextButton.addEventListener(
    "click",
    function () {

        if (!answered) {
            return;
        }


        currentQuestion++;


        if (
            currentQuestion >=
            sprintQuestions.length
        ) {

            finishSprint();

            return;

        }


        loadQuestion();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   FINISH
========================================================= */

function finishSprint() {

    const total =
        sprintQuestions.length;


    const percentage =
        Math.round(
            (
                score /
                total
            ) * 100
        );


    const today =
        new Date().toDateString();


    const previousDate =
        localStorage.getItem(
            "lastSprintDate"
        );


    let streak =
        Number(
            localStorage.getItem(
                "streak"
            )
        ) || 0;


    if (
        previousDate === today
    ) {

        /* Same day:
           don't increase the streak. */

    }

    else {

        const yesterday =
            new Date();


        yesterday.setDate(
            yesterday.getDate() - 1
        );


        if (
            previousDate ===
            yesterday.toDateString()
        ) {

            streak++;

        }

        else {

            streak = 1;

        }

    }


    localStorage.setItem(
        "streak",
        String(streak)
    );


    localStorage.setItem(
        "lastSprintDate",
        today
    );


    const bestScore =
        Number(
            localStorage.getItem(
                "bestScore"
            )
        ) || 0;


    if (
        percentage >
        bestScore
    ) {

        localStorage.setItem(
            "bestScore",
            String(percentage)
        );

    }


    const bestStreak =
        Number(
            localStorage.getItem(
                "bestStreak"
            )
        ) || 0;


    if (
        streak >
        bestStreak
    ) {

        localStorage.setItem(
            "bestStreak",
            String(streak)
        );

    }


    const quizzes =
        Number(
            localStorage.getItem(
                "quizzes"
            )
        ) || 0;


    localStorage.setItem(
        "quizzes",
        String(
            quizzes + 1
        )
    );


    const result = {

        subject:
            subject,

        topic:
            topicName,

        score:
            score,

        total:
            total,

        percentage:
            percentage,

        date:
            today

    };


    localStorage.setItem(
        "lastSprintResult",
        JSON.stringify(
            result
        )
    );


    window.location.href =
        "results.html";

}


/* =========================================================
   ERROR
========================================================= */

function showFatalError(
    message
) {

    document.body.innerHTML = `

        <main style="
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:24px;
            background:#08080d;
            color:#f5f5f7;
            font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
        ">

            <section style="
                width:min(460px,100%);
                padding:30px;
                border:1px solid rgba(255,255,255,.08);
                border-radius:22px;
                background:#101016;
                text-align:center;
            ">

                <div style="
                    font-size:38px;
                    margin-bottom:15px;
                ">
                    ⚠️
                </div>

                <h1 style="
                    margin:0 0 10px;
                    font-size:25px;
                ">
                    Sprint unavailable
                </h1>

                <p style="
                    margin:0 0 22px;
                    color:#777782;
                    font-size:13px;
                    line-height:1.5;
                ">
                    ${escapeHtml(message)}
                </p>

                <a
                    href="index.html"
                    style="
                        display:block;
                        padding:14px;
                        border-radius:13px;
                        background:#8875f5;
                        color:white;
                        text-decoration:none;
                        font-weight:800;
                        font-size:13px;
                    "
                >
                    Back to Sprints
                </a>

            </section>

        </main>

    `;

}


function escapeHtml(
    text
) {

    return String(text)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   START
========================================================= */

loadQuestionFile();
