```js
/* =========================================================
   STUDYSPRINT — QUIZ ENGINE
========================================================= */


/* =========================================================
   URL PARAMETERS
========================================================= */


const params =
    new URLSearchParams(
        window.location.search
    );


const subject =
    params.get("subject");


const topic =
    params.get("topic");


const file =
    params.get("file");


const key =
    params.get("key");



/* =========================================================
   ELEMENTS
========================================================= */


const quizTopic =
    document.getElementById(
        "quiz-topic"
    );


const questionText =
    document.getElementById(
        "question"
    );


const questionNumber =
    document.getElementById(
        "question-number"
    );


const answersContainer =
    document.getElementById(
        "answers"
    );


const writtenArea =
    document.getElementById(
        "written-area"
    );


const writtenAnswer =
    document.getElementById(
        "written-answer"
    );


const submitWritten =
    document.getElementById(
        "submit-written"
    );


const feedback =
    document.getElementById(
        "feedback"
    );


const feedbackTitle =
    document.getElementById(
        "feedback-title"
    );


const feedbackText =
    document.getElementById(
        "feedback-text"
    );


const nextQuestionButton =
    document.getElementById(
        "next-question"
    );



/* =========================================================
   QUIZ VARIABLES
========================================================= */


let questions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;



/* =========================================================
   CHECK URL
========================================================= */


if (
    !subject ||
    !topic ||
    !file ||
    !key
) {

    showError(
        "Invalid Sprint",
        "The Sprint information is missing."
    );

    throw new Error(
        "Missing Sprint parameters"
    );

}



/* =========================================================
   FORMAT TITLE
========================================================= */


const subjectNames = {

    science: "Science",

    maths: "Maths",

    english: "English",

    humanities: "Humanities",

    french: "French",

    japanese: "Japanese"

};



const subjectName =
    subjectNames[subject] ||
    subject;



quizTopic.textContent =
    `${subjectName} • ${topic}`;



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

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            copy[i],
            copy[j]
        ] =
        [
            copy[j],
            copy[i]
        ];

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
                `../../questions/${file}`
            );


        if (
            !response.ok
        ) {

            throw new Error(
                `Could not load ${file}`
            );

        }


        const code =
            await response.text();


        /*
         * The question files use:
         *
         * const someQuestions = {...}
         *
         * Because const variables are not properties of
         * window, we execute the file and return the variable.
         */


        const variableName =
            findVariableName(
                code
            );


        if (!variableName) {

            throw new Error(
                `No question variable found in ${file}`
            );

        }


        const questionData =
            new Function(

                code +

                `

                ;return typeof ${variableName}
                !== "undefined"
                ? ${variableName}
                : null;

                `

            )();


        if (
            !questionData
        ) {

            throw new Error(
                `Could not read ${file}`
            );

        }


        /*
         * Find the requested topic inside
         * the question file.
         */


        const topicQuestions =
            questionData[key];


        if (
            !Array.isArray(
                topicQuestions
            )
        ) {

            throw new Error(
                `Topic "${key}" was not found in ${file}`
            );

        }


        if (
            topicQuestions.length === 0
        ) {

            throw new Error(
                `Topic "${key}" has no questions yet.`
            );

        }


        /*
         * Take five random questions.
         */


        questions =
            shuffle(
                topicQuestions
            ).slice(
                0,
                Math.min(
                    5,
                    topicQuestions.length
                )
            );


        loadQuestion();


    }

    catch (error) {

        console.error(
            error
        );


        showError(

            "Could not load Sprint",

            error.message

        );

    }

}



/* =========================================================
   FIND QUESTION VARIABLE
========================================================= */


function findVariableName(code) {

    /*
     * Looks for:
     *
     * const japaneseCharactersQuestions = {
     *
     * or
     *
     * const frenchTravelQuestions = {
     *
     */


    const match =
        code.match(
            /const\s+([A-Za-z_$][\w$]*)\s*=\s*\{/
        );


    if (!match) {

        return null;

    }


    return match[1];

}



/* =========================================================
   LOAD QUESTION
========================================================= */


function loadQuestion() {

    answered =
        false;


    const question =
        questions[
            currentQuestion
        ];


    if (!question) {

        finishQuiz();

        return;

    }


    questionText.textContent =
        question.question;


    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    feedback.style.display =
        "none";


    answersContainer.innerHTML =
        "";


    writtenArea.style.display =
        "none";


    writtenAnswer.value =
        "";


    /*
     * MULTIPLE CHOICE
     */


    if (
        question.type === "multiple"
    ) {

        showMultipleChoice(
            question
        );

    }


    /*
     * WRITTEN
     */


    else if (
        question.type === "written"
    ) {

        showWrittenQuestion(
            question
        );

    }


    else {

        console.error(
            "Unknown question type:",
            question.type
        );

        showError(
            "Question Error",
            "This question has an invalid question type."
        );

    }

}



/* =========================================================
   MULTIPLE CHOICE
========================================================= */


function showMultipleChoice(
    question
) {

    answersContainer.style.display =
        "flex";


    const shuffledAnswers =
        shuffle(
            question.answers
        );


    shuffledAnswers.forEach(
        answer => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => {

                    checkMultipleChoice(
                        question,
                        answer,
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
   CHECK MULTIPLE CHOICE
========================================================= */


function checkMultipleChoice(
    question,
    answer,
    selectedButton
) {

    if (
        answered
    ) {

        return;

    }


    answered =
        true;


    const buttons =
        answersContainer.querySelectorAll(
            "button"
        );


    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    const correct =
        normalise(
            answer
        ) ===
        normalise(
            question.correctAnswer
        );


    if (correct) {

        score++;


        selectedButton.dataset.correct =
            "true";


        showFeedback(

            "Correct!",

            "Nice work."

        );

    }

    else {

        selectedButton.dataset.correct =
            "false";


        showFeedback(

            "Not quite.",

            `The correct answer was: ${question.correctAnswer}`

        );

    }

}



/* =========================================================
   WRITTEN QUESTION
========================================================= */


function showWrittenQuestion(
    question
) {

    answersContainer.style.display =
        "none";


    writtenArea.style.display =
        "block";


    writtenAnswer.focus();

}



/* =========================================================
   CHECK WRITTEN ANSWER
========================================================= */


function checkWrittenAnswer() {

    if (
        answered
    ) {

        return;

    }


    const question =
        questions[
            currentQuestion
        ];


    const userAnswer =
        normalise(
            writtenAnswer.value
        );


    if (
        !userAnswer
    ) {

        return;

    }


    answered =
        true;


    writtenAnswer.disabled =
        true;


    submitWritten.disabled =
        true;


    const acceptedAnswers =
        Array.isArray(
            question.acceptedAnswers
        )
            ? question.acceptedAnswers
            : [];


    const correct =
        acceptedAnswers.some(
            accepted => {

                return (
                    normalise(
                        accepted
                    ) ===
                    userAnswer
                );

            }
        );


    if (correct) {

        score++;


        showFeedback(

            "Correct!",

            "Nice work."

        );

    }

    else {

        showFeedback(

            "Not quite.",

            `Accepted answer: ${acceptedAnswers.join(", ")}`

        );

    }

}



/* =========================================================
   NORMALISE WRITTEN ANSWERS
========================================================= */


function normalise(value) {

    return String(
        value || ""
    )

        .trim()

        .toLowerCase()

        .normalize(
            "NFD"
        )

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .replace(
            /[’']/g,
            "'"
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
    title,
    text
) {

    feedbackTitle.textContent =
        title;


    feedbackText.textContent =
        text;


    feedback.style.display =
        "block";


    if (
        currentQuestion >=
        questions.length - 1
    ) {

        nextQuestionButton.textContent =
            "See Results";

    }

    else {

        nextQuestionButton.textContent =
            "Next Question";

    }


    nextQuestionButton.style.display =
        "block";

}



/* =========================================================
   NEXT QUESTION
========================================================= */


nextQuestionButton.addEventListener(
    "click",
    () => {

        if (
            !answered
        ) {

            return;

        }


        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            finishQuiz();

            return;

        }


        loadQuestion();

    }
);



/* =========================================================
   WRITTEN SUBMIT
========================================================= */


submitWritten.addEventListener(
    "click",
    checkWrittenAnswer
);



/* =========================================================
   ENTER KEY FOR WRITTEN QUESTIONS
========================================================= */


writtenAnswer.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            event.ctrlKey
        ) {

            event.preventDefault();

            checkWrittenAnswer();

        }

    }
);



/* =========================================================
   FINISH QUIZ
========================================================= */


function finishQuiz() {

    /*
     * Save Sprint statistics.
     */


    const completed =
        Number(
            localStorage.getItem(
                "sprintsCompleted"
            )
        ) || 0;


    localStorage.setItem(
        "sprintsCompleted",
        completed + 1
    );


    const bestScore =
        Number(
            localStorage.getItem(
                "bestScore"
            )
        ) || 0;


    if (
        score > bestScore
    ) {

        localStorage.setItem(
            "bestScore",
            score
        );

    }


    /*
     * Store the current result.
     */


    localStorage.setItem(
        "lastSprintScore",
        score
    );


    localStorage.setItem(
        "lastSprintTotal",
        questions.length
    );


    localStorage.setItem(
        "lastSprintSubject",
        subject
    );


    localStorage.setItem(
        "lastSprintTopic",
        topic
    );


    /*
     * Redirect to results.
     */


    window.location.href =
        `results.html?score=${score}&total=${questions.length}&subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}`;

}



/* =========================================================
   ERROR SCREEN
========================================================= */


function showError(
    title,
    message
) {

    document.body.innerHTML = `

        <main
            style="
                max-width:600px;
                margin:0 auto;
                padding:50px 20px 120px;
                color:#f5f5f7;
                font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
            "
        >

            <p
                style="
                    color:#858894;
                    font-size:11px;
                    font-weight:800;
                    letter-spacing:1.8px;
                    text-transform:uppercase;
                "
            >
                STUDYSPRINT
            </p>


            <h1
                style="
                    font-size:32px;
                    line-height:1.1;
                "
            >
                ${title}
            </h1>


            <p
                style="
                    color:#858894;
                    line-height:1.6;
                "
            >
                ${message}
            </p>


            <a
                href="index.html"
                style="
                    display:block;
                    margin-top:25px;
                    padding:15px;
                    border-radius:13px;
                    background:#8875f5;
                    color:white;
                    text-align:center;
                    text-decoration:none;
                    font-weight:800;
                "
            >
                Back to Sprints
            </a>

        </main>

    `;

}



/* =========================================================
   START
========================================================= */


loadQuestionFile();
```
