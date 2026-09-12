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

topicTitle.textContent =
    topicName || "Sprint";


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
                "HTTP " +
                response.status
            );

        }


        const source =
            await response.text();


        /*
         * Question files are normal JavaScript files.
         *
         * We run the file in an isolated function and
         * detect the array assigned inside it.
         *
         * This supports files using:
         *
         * const questions = [...]
         *
         * let questions = [...]
         *
         * var questions = [...]
         *
         * as well as named arrays.
         */


        const beforeKeys =
            new Set(
                Object.keys(window)
            );


        const script =
            document.createElement(
                "script"
            );


        /*
         * Convert the question file into a Blob URL.
         * This lets the browser execute it exactly like
         * a normal JavaScript file.
         */


        const blob =
            new Blob(
                [source],
                {
                    type:
                        "text/javascript"
                }
            );


        const blobURL =
            URL.createObjectURL(
                blob
            );


        await new Promise(
            (resolve, reject) => {

                script.src =
                    blobURL;

                script.onload =
                    resolve;

                script.onerror =
                    reject;

                document.head.appendChild(
                    script
                );

            }
        );


        URL.revokeObjectURL(
            blobURL
        );


        /*
         * If the question file declares a global
         * variable using var, it will appear here.
         *
         * For const/let files we also inspect the
         * source and evaluate the array safely.
         */


        const globalCandidates =
            Object.keys(window)
                .filter(
                    key =>
                        !beforeKeys.has(key)
                );


        for (
            const key of globalCandidates
        ) {

            if (
                Array.isArray(
                    window[key]
                )
            ) {

                allQuestions =
                    window[key];

                break;

            }

        }


        /*
         * Most modern question files use const/let.
         * In that case the variable isn't attached to
         * window, so extract the array expression.
         */


        if (
            allQuestions.length === 0
        ) {

            const match =
                source.match(
                    /(?:const|let|var)\s+[A-Za-z_][A-Za-z0-9_]*\s*=\s*(\[[\s\S]*\]);?\s*$/
                );


            if (match) {

                try {

                    allQuestions =
                        Function(
                            '"use strict"; return (' +
                            match[1] +
                            ')'
                        )();

                }

                catch (error) {

                    console.error(
                        "Question array evaluation failed:",
                        error
                    );

                }

            }

        }


        /*
         * Final fallback:
         *
         * Find the first array beginning with an object
         * containing "type".
         */


        if (
            allQuestions.length === 0
        ) {

            const arrayStart =
                source.indexOf("[\n");

            if (
                arrayStart !== -1
            ) {

                const arraySource =
                    source.slice(
                        arrayStart
                    );


                try {

                    const possibleQuestions =
                        Function(
                            '"use strict"; return (' +
                            arraySource +
                            ')'
                        )();


                    if (
                        Array.isArray(
                            possibleQuestions
                        )
                    ) {

                        allQuestions =
                            possibleQuestions;

                    }

                }

                catch {

                    /* Final validation below handles it. */

                }

            }

        }


        /*
         * Remove anything that isn't an actual
         * multiple-choice question.
         */


        allQuestions =
            allQuestions.filter(
                question =>
                    question &&
                    typeof question === "object" &&
                    Array.isArray(
                        question.answers
                    ) &&
                    question.answers.length >= 2 &&
                    typeof question.question ===
                        "string"
            );


        if (
            allQuestions.length === 0
        ) {

            throw new Error(
                "No usable multiple-choice questions were found in " +
                questionFile
            );

        }


        console.log(
            "Loaded " +
            allQuestions.length +
            " questions for " +
            topicName
        );


        startSprint();

    }

    catch (error) {

        console.error(
            "StudySprint Sprint error:",
            error
        );


        showError(
            "We couldn't load the questions for " +
            topicName +
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


    /*
     * Support the older format:
     *
     * correct: 2
     */

    if (
        correctAnswer === undefined &&
        typeof question.correct === "number"
    ) {

        correctAnswer =
            answers[
                question.correct
            ];

    }


    /*
     * Support another possible format:
     *
     * correct: "answer text"
     */

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


                    button
                        .querySelector(
                            ".answer-result"
                        )
                        .textContent =
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
            background:#08080d;
            color:#f5f5f7;
            font-family:
                Inter,
                -apple-system,
                BlinkMacSystemFont,
                'Segoe UI',
                sans-serif;
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
   START
========================================================= */

loadQuestionFile();
