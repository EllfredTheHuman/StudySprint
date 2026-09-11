/* =========================================================
   STUDYSPRINT — SPRINT QUIZ
========================================================= */

const params = new URLSearchParams(window.location.search);

const subject = params.get("subject") || "Science";
const topic = params.get("topic") || "Unknown Topic";
const file = params.get("file");
const key = params.get("key");

const questionElement = document.getElementById("question");
const questionNumberElement = document.getElementById("question-number");
const topicElement = document.getElementById("quiz-topic");
const answersElement = document.getElementById("answers");

const writtenArea = document.getElementById("written-area");
const writtenAnswer = document.getElementById("written-answer");
const submitWritten = document.getElementById("submit-written");

const feedback = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackText = document.getElementById("feedback-text");
const nextQuestion = document.getElementById("next-question");


let questions = [];
let quizQuestions = [];

let currentQuestion = 0;
let score = 0;

let answered = false;


/* =========================================================
   LOAD QUESTIONS
========================================================= */

async function loadQuestions() {

    topicElement.textContent = topic;

    if (!file) {
        showError("No question file was selected.");
        return;
    }

    try {

        /*
            IMPORTANT:

            All question files are directly inside:

            questions/

            There are NO subject folders.
        */

        const response = await fetch("../../questions/" + file);

        if (!response.ok) {
            throw new Error(
                "Could not load question file: " + file
            );
        }

        const code = await response.text();


        /*
            Get the first top-level const object
            from the question file.
        */

        const match = code.match(
            /const\s+([A-Za-z_$][\w$]*)\s*=\s*\{/
        );


        if (!match) {
            throw new Error(
                "Could not find the question data in " + file
            );
        }


        const variableName = match[1];


        /*
            Execute the question file and return
            the question object.
        */

        const questionData = new Function(
            code +
            "\nreturn typeof " +
            variableName +
            ' !== "undefined" ? ' +
            variableName +
            " : null;"
        )();


        if (!questionData) {
            throw new Error(
                "Question data could not be loaded."
            );
        }


        /*
            Get the selected topic from the file.
        */

        let topicQuestions = questionData[key];


        /*
            If the exact key wasn't found, try
            finding a matching key ignoring case.
        */

        if (!topicQuestions) {

            const keys = Object.keys(questionData);

            for (let i = 0; i < keys.length; i++) {

                if (
                    keys[i].toLowerCase() ===
                    key.toLowerCase()
                ) {

                    topicQuestions =
                        questionData[keys[i]];

                    break;
                }
            }
        }


        if (!Array.isArray(topicQuestions)) {

            /*
                Some files may contain the questions
                directly rather than inside a topic.
            */

            if (Array.isArray(questionData)) {

                topicQuestions = questionData;

            } else {

                throw new Error(
                    "Could not find topic: " + key
                );
            }
        }


        questions = topicQuestions;


        if (questions.length === 0) {
            throw new Error(
                "This topic does not have any questions yet."
            );
        }


        /*
            Randomise the questions.
        */

        quizQuestions = shuffle(
            questions.slice()
        );


        /*
            Sprint currently uses 5 questions.
        */

        quizQuestions =
            quizQuestions.slice(0, 5);


        currentQuestion = 0;
        score = 0;

        showQuestion();

    } catch (error) {

        console.error(error);

        showError(
            "There was a problem loading this quiz."
        );
    }
}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

    answered = false;

    feedback.style.display = "none";

    answersElement.innerHTML = "";

    writtenArea.style.display = "none";


    const question = quizQuestions[currentQuestion];


    if (!question) {
        finishQuiz();
        return;
    }


    questionElement.textContent =
        question.question;


    questionNumberElement.textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        quizQuestions.length;


    /*
        MULTIPLE CHOICE
    */

    if (question.type === "multiple") {

        answersElement.style.display = "flex";


        const shuffledAnswers =
            shuffle(question.answers.slice());


        for (
            let i = 0;
            i < shuffledAnswers.length;
            i++
        ) {

            const answer =
                shuffledAnswers[i];


            const button =
                document.createElement("button");


            button.textContent = answer;


            button.addEventListener(
                "click",
                function () {
                    checkMultipleAnswer(
                        answer,
                        question.correctAnswer,
                        button
                    );
                }
            );


            answersElement.appendChild(button);
        }


        return;
    }


    /*
        WRITTEN
    */

    if (question.type === "written") {

        answersElement.style.display = "none";

        writtenArea.style.display = "block";

        writtenAnswer.value = "";

        writtenAnswer.focus();

        return;
    }


    showError(
        "This question has an invalid question type."
    );
}


/* =========================================================
   MULTIPLE CHOICE CHECK
========================================================= */

function checkMultipleAnswer(
    selectedAnswer,
    correctAnswer,
    selectedButton
) {

    if (answered) {
        return;
    }

    answered = true;


    const buttons =
        answersElement.querySelectorAll("button");


    for (let i = 0; i < buttons.length; i++) {

        buttons[i].disabled = true;

        if (
            buttons[i].textContent ===
            correctAnswer
        ) {

            buttons[i].style.borderColor =
                "#35c759";

            buttons[i].style.background =
                "rgba(53, 199, 89, 0.12)";
        }
    }


    if (
        selectedAnswer ===
        correctAnswer
    ) {

        score++;

        selectedButton.style.borderColor =
            "#35c759";

        selectedButton.style.background =
            "rgba(53, 199, 89, 0.12)";


        showFeedback(
            "Correct!",
            "Nice work."
        );

    } else {

        selectedButton.style.borderColor =
            "#ff453a";

        selectedButton.style.background =
            "rgba(255, 69, 58, 0.12)";


        showFeedback(
            "Incorrect",
            "The correct answer was: " +
            correctAnswer
        );
    }
}


/* =========================================================
   WRITTEN ANSWER CHECK
========================================================= */

submitWritten.addEventListener(
    "click",
    function () {

        if (answered) {
            return;
        }


        const question =
            quizQuestions[currentQuestion];


        const userAnswer =
            writtenAnswer.value
                .trim()
                .toLowerCase();


        if (!userAnswer) {

            showFeedback(
                "Enter an answer",
                "Type your answer before submitting."
            );

            return;
        }


        answered = true;


        let correct = false;


        if (
            Array.isArray(
                question.acceptedAnswers
            )
        ) {

            for (
                let i = 0;
                i < question.acceptedAnswers.length;
                i++
            ) {

                const accepted =
                    String(
                        question.acceptedAnswers[i]
                    )
                    .trim()
                    .toLowerCase();


                if (userAnswer === accepted) {

                    correct = true;
                    break;
                }
            }
        }


        if (correct) {

            score++;


            showFeedback(
                "Correct!",
                "Nice work."
            );

        } else {

            let correctAnswer =
                "Check the question and try again.";

            if (
                Array.isArray(
                    question.acceptedAnswers
                ) &&
                question.acceptedAnswers.length > 0
            ) {

                correctAnswer =
                    question.acceptedAnswers[0];
            }


            showFeedback(
                "Incorrect",
                "An accepted answer was: " +
                correctAnswer
            );
        }
    }
);


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
}


/* =========================================================
   NEXT QUESTION
========================================================= */

nextQuestion.addEventListener(
    "click",
    function () {

        currentQuestion++;

        if (
            currentQuestion >=
            quizQuestions.length
        ) {

            finishQuiz();

            return;
        }

        showQuestion();
    }
);


/* =========================================================
   FINISH
========================================================= */

function finishQuiz() {

    const total =
        quizQuestions.length;


    localStorage.setItem(
        "sprintsCompleted",
        String(
            Number(
                localStorage.getItem(
                    "sprintsCompleted"
                )
            ) + 1
        )
    );


    localStorage.setItem(
        "lastSprintScore",
        String(score)
    );


    localStorage.setItem(
        "lastSprintTotal",
        String(total)
    );


    localStorage.setItem(
        "lastSprintSubject",
        subject
    );


    localStorage.setItem(
        "lastSprintTopic",
        topic
    );


    const previousBest =
        Number(
            localStorage.getItem(
                "bestScore"
            )
        ) || 0;


    if (score > previousBest) {

        localStorage.setItem(
            "bestScore",
            String(score)
        );
    }


    window.location.href =
        "results.html?score=" +
        encodeURIComponent(score) +
        "&total=" +
        encodeURIComponent(total) +
        "&subject=" +
        encodeURIComponent(subject) +
        "&topic=" +
        encodeURIComponent(topic);
}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        const temp =
            array[i];

        array[i] =
            array[j];

        array[j] =
            temp;
    }


    return array;
}


/* =========================================================
   ERROR
========================================================= */

function showError(message) {

    topicElement.textContent =
        "ERROR";

    questionElement.textContent =
        message;

    questionNumberElement.textContent =
        "";

    answersElement.innerHTML = "";

    writtenArea.style.display =
        "none";

    feedback.style.display =
        "none";
}


/* =========================================================
   START
========================================================= */

loadQuestions();
