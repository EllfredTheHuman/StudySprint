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

const topicTitle =
    document.getElementById("topic-title");

const questionNumber =
    document.getElementById("question-number");

const questionText =
    document.getElementById("question");

const answersContainer =
    document.getElementById("answers");

const feedback =
    document.getElementById("feedback");

const feedbackIcon =
    document.getElementById("feedback-icon");

const feedbackTitle =
    document.getElementById("feedback-title");

const feedbackText =
    document.getElementById("feedback-text");

const nextButton =
    document.getElementById("next-button");

const nextText =
    document.getElementById("next-text");

const progressBar =
    document.getElementById("progress-bar");


/* =========================================================
   BASIC VALIDATION
========================================================= */

if (!topicName || !questionFile) {

    showError(
        "This Sprint link is missing information."
    );

}


/* =========================================================
   TITLE
========================================================= */

if (topicTitle) {

    topicTitle.textContent =
        topicName || "Sprint";

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    const result = [...array];

    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            result[i],
            result[j]
        ] = [
            result[j],
            result[i]
        ];

    }

    return result;

}


/* =========================================================
   NORMALISE TOPIC NAME
========================================================= */

function normaliseTopicName(value) {

    return String(value || "")
        .toLowerCase()
        .replace(
            /[^a-z0-9]+/g,
            ""
        );

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


        const response =
            await fetch(
                questionFile,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );

        }


        const source =
            await response.text();


        /*
         * Question files normally look like:
         *
         * const japanesePeoplePlacesVehiclesQuestions = {
         *
         *     "People Places Vehicles": [
         *
         *         ...
         *
         *     ]
         *
         * };
         */


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


        let questionData;


        /* =====================================================
           EVALUATE QUESTION FILE
        ===================================================== */

        try {

            questionData =
                Function(
                    source +
                    "\nreturn " +
                    variableName +
                    ";"
                )();

        }

        catch (error) {

            console.error(
                "Question file evaluation error:",
                error
            );

            throw new Error(
                "The question file contains invalid JavaScript."
            );

        }


        /* =====================================================
           FIND QUESTION ARRAY
        ===================================================== */

        if (
            Array.isArray(questionData)
        ) {

            /*
             * The file directly contains an array.
             */

            allQuestions =
                questionData;

        }

        else if (
            questionData &&
            typeof questionData === "object"
        ) {

            /*
             * First attempt:
             * exact topic name.
             */

            if (
                Array.isArray(
                    questionData[topicName]
                )
            ) {

                allQuestions =
                    questionData[topicName];

            }

            else {

                /*
                 * Second attempt:
                 * normalised topic name.
                 *
                 * Example:
                 *
                 * URL:
                 * People, Places & Vehicles
                 *
                 * File:
                 * People Places Vehicles
                 */

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

                }

                else {

                    /*
                     * Final fallback:
                     * if there is exactly one array
                     * inside the object, use it.
                     */

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


        /* =====================================================
           VALIDATE QUESTION ARRAY
        ===================================================== */

        if (
            !Array.isArray(allQuestions)
        ) {

            throw new Error(
                "No question array was found for this topic."
            );

        }


        console.log(
            "Total questions found:",
            allQuestions.length
        );


        /* =====================================================
           FILTER MULTIPLE-CHOICE QUESTIONS
        ===================================================== */

        /*
         * StudySprint question files contain:
         *
         * 50 multiple-choice
         * 50 written
         *
         * Sprint only uses multiple-choice.
         */

        allQuestions =
            allQuestions.filter(
                question =>
                    question &&
                    typeof question === "object" &&
                    question.type === "multiple" &&
                    typeof question.question === "string" &&
                    Array.isArray(
                        question.answers
                    ) &&
                    question.answers.length >= 2 &&
                    (
                        typeof question.correctAnswer ===
                            "string" ||
                        typeof question.correct ===
                            "string" ||
                        typeof question.correct ===
                            "number"
                    )
            );


        console.log(
            "Multiple-choice questions found:",
            allQuestions.length
        );


        if (
            allQuestions.length === 0
        ) {

            throw new Error(
                "No usable multiple-choice questions were found in " +
                questionFile
            );

        }


        /* =====================================================
           START
        ===================================================== */

        startSprint();

    }

    catch (error) {

        console.error(
            "StudySprint Sprint error:",
            error
        );


        showError(
            "We couldn't load the questions for " +
            (topicName || "this topic") +
            "."
        );

    }

}


/* =========================================================
   NORMALISE QUESTION
========================================================= */

function normaliseQuestion(question) {

    const answers =
        Array.isArray(
            question.answers
        )
            ? [...question.answers]
            : [];


    let correctAnswer =
        question.correctAnswer;


    /* =====================================================
       SUPPORT NUMERIC CORRECT INDEX
    ===================================================== */

    if (
        correctAnswer === undefined &&
        typeof question.correct === "number"
    ) {

        correctAnswer =
            answers[
                question.correct
            ];

    }


    /* =====================================================
       SUPPORT STRING CORRECT ANSWER
    ===================================================== */

    if (
        correctAnswer === undefined &&
        typeof question.correct === "string"
    ) {

        correctAnswer =
            question.correct;

    }


    return {

        question:
            String(
                question.question || ""
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


    /* =====================================================
       RESET FEEDBACK
    ===================================================== */

    feedback.classList.add(
        "hidden"
    );


    feedback.classList.remove(
        "wrong"
    );


    /* =====================================================
       RESET NEXT BUTTON
    ===================================================== */

    nextButton.classList.add(
        "hidden"
    );


    /* =====================================================
       CLEAR ANSWERS
    ===================================================== */

    answersContainer.innerHTML =
        "";


    /* =====================================================
       GET QUESTION
    ===================================================== */

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


    /* =====================================================
       QUESTION TEXT
    ===================================================== */

    questionText.textContent =
        question.question;


    /* =====================================================
       QUESTION NUMBER
    ===================================================== */

    questionNumber.textContent =
        `${currentQuestion + 1} / ${sprintQuestions.length}`;


    /* =====================================================
       PROGRESS
    ===================================================== */

    const progress =
        (
            currentQuestion /
            sprintQuestions.length
        ) * 100;


    progressBar.style.width =
        progress + "%";


    /* =====================================================
       SHUFFLE ANSWERS
    ===================================================== */

    const shuffledAnswers =
        shuffle(
            question.answers
        );


    /* =====================================================
       CREATE ANSWER BUTTONS
    ===================================================== */

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


            /* =================================================
               LETTER
            ================================================= */

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


            /* =================================================
               ANSWER TEXT
            ================================================= */

            const text =
                document.createElement(
                    "span"
                );


            text.className =
                "answer-text";


            text.textContent =
                answer;


            /* =================================================
               RESULT ICON
            ================================================= */

            const result =
                document.createElement(
                    "span"
                );


            result.className =
                "answer-result";


            result.textContent =
                "";


            /* =================================================
               BUILD BUTTON
            ================================================= */

            button.appendChild(
                letter
            );


            button.appendChild(
                text
            );


            button.appendChild(
                result
            );


            /* =================================================
               CLICK
            ================================================= */

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


    /* =====================================================
       GET ALL BUTTONS
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    /* =====================================================
       DISABLE BUTTONS
    ===================================================== */

    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    /* =====================================================
       COMPARE ANSWERS
    ===================================================== */

    const isCorrect =
        String(
            selectedAnswer
        ).trim() ===
        String(
            correctAnswer
        ).trim();


    /* =====================================================
       CORRECT
    ===================================================== */

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

    }

    /* =====================================================
       WRONG
    ===================================================== */

    else {

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


        /* =================================================
           FIND CORRECT ANSWER BUTTON
        ================================================= */

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


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

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


    if (total <= 0) {

        showError(
            "No questions were completed."
        );

        return;

    }


    /* =====================================================
       CALCULATE SCORE
    ===================================================== */

    const percentage =
        Math.round(
            (
                score /
                total
            ) * 100
        );


    /* =====================================================
       DATE
    ===================================================== */

    const today =
        new Date().toDateString();


    const previousDate =
        localStorage.getItem(
            "lastSprintDate"
        );


    /* =====================================================
       STREAK
    ===================================================== */

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

        }

        else {

            streak = 1;

        }

    }


    /* =====================================================
       SAVE STREAK
    ===================================================== */

    localStorage.setItem(
        "streak",
        String(streak)
    );


    localStorage.setItem(
        "lastSprintDate",
        today
    );


    /* =====================================================
       BEST SCORE
    ===================================================== */

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


    /* =====================================================
       BEST STREAK
    ===================================================== */

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


    /* =====================================================
       QUIZ COUNT
    ===================================================== */

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


    /* =====================================================
       RESULT
    ===================================================== */

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


    /* =====================================================
       RESULTS PAGE
    ===================================================== */

    window.location.href =
        "results.html";

}


/* =========================================================
   ERROR SCREEN
========================================================= */

function showError(message) {

    document.body.innerHTML = `

        <main style="
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:24px;
            background:#0d0d12;
            color:#ffffff;
            font-family:Arial, sans-serif;
            text-align:center;
        ">

            <div style="
                width:100%;
                max-width:500px;
                padding:32px;
                border-radius:20px;
                background:#17171f;
                border:1px solid #292934;
                box-shadow:0 20px 60px rgba(0,0,0,0.35);
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

function escapeHtml(text) {

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
   START APPLICATION
========================================================= */

loadQuestionFile();
