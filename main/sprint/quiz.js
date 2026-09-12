```js
/* =========================================================
   STUDYSPRINT — SPRINT QUIZ ENGINE
========================================================= */

const params = new URLSearchParams(window.location.search);

const subject = params.get("subject");
const topicName = params.get("topic");
const questionFile = params.get("file");

const QUESTION_COUNT = 5;

let allQuestions = [];
let sprintQuestions = [];

let currentQuestion = 0;
let score = 0;
let answered = false;


/* =========================================================
   ELEMENTS
========================================================= */

const topicTitle = document.getElementById("topic-title");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers");

const feedback = document.getElementById("feedback");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackText = document.getElementById("feedback-text");

const nextButton = document.getElementById("next-button");
const nextText = document.getElementById("next-text");

const progressBar = document.getElementById("progress-bar");


/* =========================================================
   SETUP
========================================================= */

if (topicTitle) {
    topicTitle.textContent = topicName || "Sprint";
}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [result[i], result[j]] =
            [result[j], result[i]];
    }

    return result;
}


/* =========================================================
   NORMALISE TOPIC
========================================================= */

function normaliseTopicName(value) {

    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "");

}


/* =========================================================
   LOAD QUESTION FILE
========================================================= */

async function loadQuestionFile() {

    try {

        if (!questionFile) {

            throw new Error(
                "No question file was supplied."
            );

        }


        /* -------------------------------------------------
           FETCH FILE
        ------------------------------------------------- */

        const response =
            await fetch(
                questionFile,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Could not load question file. HTTP " +
                response.status
            );

        }


        const source =
            await response.text();


        if (!source.trim()) {

            throw new Error(
                "The question file is empty."
            );

        }


        console.log(
            "Loaded question file:",
            questionFile
        );


        /* -------------------------------------------------
           FIND QUESTION VARIABLE
        ------------------------------------------------- */

        const variableMatch =
            source.match(
                /\b(?:const|let|var)\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*/
            );


        if (!variableMatch) {

            throw new Error(
                "No question data variable was found."
            );

        }


        const variableName =
            variableMatch[1];


        console.log(
            "Question variable:",
            variableName
        );


        /* =================================================
           CREATE A SAFE GLOBAL NAME
        ================================================= */

        window.__studySprintData =
            undefined;


        /*
         * Example:
         *
         * const japaneseQuestions = {...};
         *
         * becomes:
         *
         * window.__studySprintData = {...};
         *
         * This lets us retrieve the object after execution.
         */

        const declarationPattern =
            new RegExp(
                "\\b(?:const|let|var)\\s+" +
                variableName +
                "\\s*=",
                "m"
            );


        if (
            !declarationPattern.test(
                source
            )
        ) {

            throw new Error(
                "Could not locate question data."
            );

        }


        const executableSource =
            source.replace(
                declarationPattern,
                "window.__studySprintData ="
            );


        /* =================================================
           EXECUTE QUESTION DATA
        ================================================= */

        try {

            /*
             * IMPORTANT:
             *
             * We deliberately use eval here because the
             * question files are the user's own static
             * StudySprint question files.
             *
             * There are NO Blob URLs, dynamic imports,
             * Function() calls, or module URLs.
             */

            eval(executableSource);

        } catch (error) {

            console.error(
                "Question file execution error:",
                error
            );

            throw new Error(
                "The question file contains invalid JavaScript."
            );

        }


        const questionData =
            window.__studySprintData;


        delete window.__studySprintData;


        /* =================================================
           CHECK DATA
        ================================================= */

        if (
            questionData === undefined ||
            questionData === null
        ) {

            throw new Error(
                "The question data could not be read."
            );

        }


        console.log(
            "Question data successfully loaded."
        );


        /* =================================================
           FIND TOPIC ARRAY
        ================================================= */

        if (
            Array.isArray(
                questionData
            )
        ) {

            allQuestions =
                questionData;

        } else if (
            typeof questionData === "object"
        ) {


            /* ------------------------------------------------
               EXACT TOPIC
            ------------------------------------------------ */

            if (
                Array.isArray(
                    questionData[topicName]
                )
            ) {

                allQuestions =
                    questionData[topicName];

            } else {


                /* ------------------------------------------------
                   NORMALISED TOPIC
                ------------------------------------------------ */

                const wantedTopic =
                    normaliseTopicName(
                        topicName
                    );


                const matchingKey =
                    Object.keys(
                        questionData
                    ).find(
                        key =>
                            normaliseTopicName(
                                key
                            ) === wantedTopic
                    );


                if (
                    matchingKey &&
                    Array.isArray(
                        questionData[
                            matchingKey
                        ]
                    )
                ) {

                    allQuestions =
                        questionData[
                            matchingKey
                        ];

                } else {


                    /* ------------------------------------------------
                       SINGLE ARRAY FALLBACK
                    ------------------------------------------------ */

                    const arrays =
                        Object.values(
                            questionData
                        ).filter(
                            value =>
                                Array.isArray(
                                    value
                                )
                        );


                    if (
                        arrays.length === 1
                    ) {

                        allQuestions =
                            arrays[0];

                    }

                }

            }

        }


        /* =================================================
           VALIDATE ARRAY
        ================================================= */

        if (
            !Array.isArray(
                allQuestions
            )
        ) {

            throw new Error(
                "No question array was found for " +
                topicName +
                "."
            );

        }


        console.log(
            "Total questions found:",
            allQuestions.length
        );


        /* =================================================
           ONLY MULTIPLE CHOICE
        ================================================= */

        allQuestions =
            allQuestions.filter(
                question => {

                    if (
                        !question ||
                        typeof question !==
                            "object"
                    ) {

                        return false;

                    }


                    if (
                        question.type !==
                        "multiple"
                    ) {

                        return false;

                    }


                    if (
                        typeof question.question !==
                        "string"
                    ) {

                        return false;

                    }


                    if (
                        !Array.isArray(
                            question.answers
                        )
                    ) {

                        return false;

                    }


                    if (
                        question.answers.length <
                        2
                    ) {

                        return false;

                    }


                    const hasCorrectAnswer =
                        typeof
                            question.correctAnswer ===
                            "string" ||

                        typeof
                            question.correct ===
                            "string" ||

                        typeof
                            question.correct ===
                            "number";


                    return hasCorrectAnswer;

                }
            );


        console.log(
            "Multiple-choice questions found:",
            allQuestions.length
        );


        if (
            allQuestions.length === 0
        ) {

            throw new Error(
                "No usable multiple-choice questions were found."
            );

        }


        /* =================================================
           START SPRINT
        ================================================= */

        startSprint();


    } catch (error) {

        console.error(
            "StudySprint Sprint error:",
            error
        );


        showError(
            "We couldn't load the questions for " +
            (
                topicName ||
                "this topic"
            ) +
            "."
        );

    }

}


/* =========================================================
   NORMALISE QUESTION
========================================================= */

function normaliseQuestion(
    question
) {

    const answers =
        Array.isArray(
            question.answers
        )
            ? [...question.answers]
            : [];


    let correctAnswer =
        question.correctAnswer;


    if (
        correctAnswer === undefined &&
        typeof question.correct ===
            "number"
    ) {

        correctAnswer =
            answers[
                question.correct
            ];

    }


    if (
        correctAnswer === undefined &&
        typeof question.correct ===
            "string"
    ) {

        correctAnswer =
            question.correct;

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


    currentQuestion = 0;

    score = 0;


    loadQuestion();

}


/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion() {

    answered = false;


    feedback.classList.add(
        "hidden"
    );

    feedback.classList.remove(
        "wrong"
    );

    nextButton.classList.add(
        "hidden"
    );


    answersContainer.innerHTML =
        "";


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

        showError(
            "One of the questions in this topic is invalid."
        );

        return;

    }


    questionText.textContent =
        question.question;


    questionNumber.textContent =
        `${currentQuestion + 1} / ${sprintQuestions.length}`;


    const progress =
        (
            currentQuestion /
            sprintQuestions.length
        ) * 100;


    progressBar.style.width =
        progress + "%";


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
                "";


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
                () => {

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


    answered = true;


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
        String(
            selectedAnswer
        ).trim() ===
        String(
            correctAnswer
        ).trim();


    if (isCorrect) {

        score++;


        selectedButton.classList.add(
            "correct"
        );


        const result =
            selectedButton.querySelector(
                ".answer-result"
            );


        if (result) {

            result.textContent =
                "✓";

        }


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


    } else {

        selectedButton.classList.add(
            "wrong"
        );


        const selectedResult =
            selectedButton.querySelector(
                ".answer-result"
            );


        if (selectedResult) {

            selectedResult.textContent =
                "×";

        }


        buttons.forEach(
            button => {

                const text =
                    button.querySelector(
                        ".answer-text"
                    );


                if (
                    text &&
                    text.textContent.trim() ===
                    String(
                        correctAnswer
                    ).trim()
                ) {

                    button.classList.add(
                        "correct"
                    );


                    const result =
                        button.querySelector(
                            ".answer-result"
                        );


                    if (result) {

                        result.textContent =
                            "✓";

                    }

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

    } else {

        nextText.textContent =
            "Next Question";

    }


    nextButton.classList.remove(
        "hidden"
    );

}


/* =========================================================
   NEXT QUESTION
========================================================= */

nextButton.addEventListener(
    "click",
    () => {

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
   FINISH SPRINT
========================================================= */

function finishSprint() {

    const total =
        sprintQuestions.length;


    if (total === 0) {

        showError(
            "No questions were completed."
        );

        return;

    }


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
        previousDate !== today
    ) {

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

        } else {

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
        percentage > bestScore
    ) {

        localStorage.setItem(
            "bestScore",
            String(
                percentage
            )
        );

    }


    const bestStreak =
        Number(
            localStorage.getItem(
                "bestStreak"
            )
        ) || 0;


    if (
        streak > bestStreak
    ) {

        localStorage.setItem(
            "bestStreak",
            String(
                streak
            )
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

function showError(
    message
) {

    document.body.innerHTML = `

        <main style="
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:24px;
            background:#0d0d12;
            color:#ffffff;
            font-family:Arial,sans-serif;
            text-align:center;
        ">

            <div style="
                width:100%;
                max-width:500px;
                padding:32px;
                border-radius:20px;
                background:#17171f;
                border:1px solid #292934;
                box-shadow:
                    0 20px 60px
                    rgba(0,0,0,0.35);
            ">

                <div style="
                    font-size:48px;
                    margin-bottom:16px;
                ">
                    ⚠️
                </div>


                <h1 style="
                    margin:0 0 12px;
                    font-size:24px;
                ">
                    Something went wrong
                </h1>


                <p style="
                    margin:0 0 24px;
                    color:#aaaab5;
                    line-height:1.5;
                ">
                    ${escapeHtml(message)}
                </p>


                <button
                    type="button"
                    onclick="window.location.href='index.html'"
                    style="
                        border:0;
                        border-radius:12px;
                        padding:14px 20px;
                        background:#8875f5;
                        color:#ffffff;
                        font-size:15px;
                        font-weight:700;
                        cursor:pointer;
                    "
                >
                    Back to Sprint
                </button>

            </div>

        </main>

    `;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

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
   BEGIN
========================================================= */

if (
    topicName &&
    questionFile
) {

    loadQuestionFile();

}
```
