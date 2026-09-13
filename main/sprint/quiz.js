/* =========================================================
   STUDYSPRINT — SPRINT QUIZ
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


if (topicTitle) {
    topicTitle.textContent = topicName || "Sprint";
}


/* =========================================================
   HELPERS
========================================================= */

function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] =
            [result[j], result[i]];
    }

    return result;
}


function normaliseTopicName(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "");
}


/* =========================================================
   LOAD QUESTIONS
========================================================= */

async function loadQuestionFile() {

    try {

        if (!questionFile) {
            throw new Error("No question file was supplied.");
        }

        console.log(
            "Loading question file:",
            questionFile
        );


        const response = await fetch(
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


        const source = await response.text();


        if (!source.trim()) {
            throw new Error("The question file is empty.");
        }


        console.log("Question file loaded successfully.");


        /*
         * Find the object after the variable assignment.
         *
         * Example:
         *
         * const japaneseQuestions = {
         *     ...
         * };
         */

        const equalsIndex = source.indexOf("=");


        if (equalsIndex === -1) {
            throw new Error(
                "No question data assignment was found."
            );
        }


        let objectSource =
            source
                .slice(equalsIndex + 1)
                .trim();


        /*
         * Remove the final semicolon.
         */

        if (objectSource.endsWith(";")) {
            objectSource =
                objectSource
                    .slice(0, -1)
                    .trim();
        }


        console.log("Parsing question object...");


        let questionData;


        try {

            questionData =
                Function(
                    "return (" +
                    objectSource +
                    ")"
                )();

        } catch (error) {

            console.error(
                "Question object parsing error:",
                error
            );

            throw new Error(
                "The question file contains invalid JavaScript."
            );
        }


        console.log(
            "Question data loaded:",
            questionData
        );


        /* =================================================
           FIND TOPIC
        ================================================= */

        allQuestions = [];


        if (Array.isArray(questionData)) {

            allQuestions = questionData;

        } else if (
            questionData &&
            typeof questionData === "object"
        ) {

            /*
             * Exact topic name.
             */

            if (
                topicName &&
                Array.isArray(
                    questionData[topicName]
                )
            ) {

                allQuestions =
                    questionData[topicName];

            }


            /*
             * Normalised topic name.
             *
             * This allows:
             *
             * People Places Vehicles
             *
             * to match:
             *
             * People, Places & Vehicles
             */

            if (allQuestions.length === 0) {

                const wanted =
                    normaliseTopicName(
                        topicName
                    );


                const key =
                    Object.keys(
                        questionData
                    ).find(
                        function (item) {

                            return (
                                normaliseTopicName(item) ===
                                wanted
                            );

                        }
                    );


                if (key) {
                    allQuestions =
                        questionData[key];
                }
            }


            /*
             * If there is only one array in the file,
             * use that array.
             */

            if (allQuestions.length === 0) {

                const arrays =
                    Object.values(
                        questionData
                    ).filter(
                        function (value) {
                            return Array.isArray(value);
                        }
                    );


                if (arrays.length === 1) {
                    allQuestions = arrays[0];
                }
            }
        }


        if (
            !Array.isArray(allQuestions) ||
            allQuestions.length === 0
        ) {

            throw new Error(
                "No questions were found for the topic: " +
                (topicName || "unknown")
            );
        }


        console.log(
            "Questions found:",
            allQuestions.length
        );


        /*
         * Sprint only uses multiple-choice questions.
         */

        allQuestions =
            allQuestions.filter(
                function (question) {

                    return (
                        question &&
                        question.type === "multiple" &&
                        typeof question.question === "string" &&
                        Array.isArray(question.answers) &&
                        question.answers.length >= 2 &&
                        typeof question.correctAnswer === "string"
                    );

                }
            );


        console.log(
            "Usable multiple-choice questions:",
            allQuestions.length
        );


        if (allQuestions.length === 0) {

            throw new Error(
                "The topic contains no usable multiple-choice questions."
            );
        }


        startSprint();


    } catch (error) {

        console.error(
            "StudySprint Sprint error:",
            error
        );


        showError(
            "We couldn't load the questions for " +
            (topicName || "this topic") +
            ". " +
            error.message
        );
    }
}


/* =========================================================
   START SPRINT
========================================================= */

function startSprint() {

    sprintQuestions =
        shuffle(allQuestions).slice(
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


    if (feedback) {
        feedback.classList.add("hidden");
        feedback.classList.remove("wrong");
    }


    if (nextButton) {
        nextButton.classList.add("hidden");
    }


    if (answersContainer) {
        answersContainer.innerHTML = "";
    }


    const question =
        sprintQuestions[currentQuestion];


    if (!question) {

        showError(
            "The question could not be loaded."
        );

        return;
    }


    if (questionText) {
        questionText.textContent =
            question.question;
    }


    if (questionNumber) {

        questionNumber.textContent =
            String(currentQuestion + 1) +
            " / " +
            String(sprintQuestions.length);
    }


    if (progressBar) {

        progressBar.style.width =
            (
                currentQuestion /
                sprintQuestions.length *
                100
            ) + "%";
    }


    const answers =
        shuffle(question.answers);


    answers.forEach(
        function (answer, index) {

            const button =
                document.createElement("button");


            button.type = "button";
            button.className = "answer-button";


            const letter =
                document.createElement("span");

            letter.className = "answer-letter";
            letter.textContent =
                String.fromCharCode(65 + index);


            const text =
                document.createElement("span");

            text.className = "answer-text";
            text.textContent = answer;


            const result =
                document.createElement("span");

            result.className = "answer-result";


            button.appendChild(letter);
            button.appendChild(text);
            button.appendChild(result);


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


            answersContainer.appendChild(button);
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
        function (button) {
            button.disabled = true;
        }
    );


    const correct =
        String(selectedAnswer).trim() ===
        String(correctAnswer).trim();


    if (correct) {

        score++;


        selectedButton.classList.add(
            "correct"
        );


        const result =
            selectedButton.querySelector(
                ".answer-result"
            );


        if (result) {
            result.textContent = "✓";
        }


        if (feedbackIcon) {
            feedbackIcon.textContent = "✓";
        }


        if (feedbackTitle) {
            feedbackTitle.textContent = "Correct";
        }


        if (feedbackText) {
            feedbackText.textContent =
                "Nice work. Keep going.";
        }


        if (feedback) {
            feedback.classList.remove("hidden");
            feedback.classList.remove("wrong");
        }


    } else {

        selectedButton.classList.add(
            "wrong"
        );


        const selectedResult =
            selectedButton.querySelector(
                ".answer-result"
            );


        if (selectedResult) {
            selectedResult.textContent = "×";
        }


        buttons.forEach(
            function (button) {

                const text =
                    button.querySelector(
                        ".answer-text"
                    );


                if (
                    text &&
                    text.textContent.trim() ===
                    String(correctAnswer).trim()
                ) {

                    button.classList.add(
                        "correct"
                    );


                    const result =
                        button.querySelector(
                            ".answer-result"
                        );


                    if (result) {
                        result.textContent = "✓";
                    }
                }
            }
        );


        if (feedbackIcon) {
            feedbackIcon.textContent = "×";
        }


        if (feedbackTitle) {
            feedbackTitle.textContent =
                "Not quite";
        }


        if (feedbackText) {
            feedbackText.textContent =
                "The correct answer is " +
                correctAnswer +
                ".";
        }


        if (feedback) {
            feedback.classList.remove("hidden");
            feedback.classList.add("wrong");
        }
    }


    if (nextText) {

        nextText.textContent =
            currentQuestion ===
            sprintQuestions.length - 1
                ? "See Results"
                : "Next Question";
    }


    if (nextButton) {
        nextButton.classList.remove("hidden");
    }
}


/* =========================================================
   NEXT BUTTON
========================================================= */

if (nextButton) {

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
}


/* =========================================================
   FINISH
========================================================= */

function finishSprint() {

    const total =
        sprintQuestions.length;


    const percentage =
        Math.round(
            score /
            total *
            100
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


    if (previousDate !== today) {

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


    if (percentage > bestScore) {

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


    if (streak > bestStreak) {

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
        String(quizzes + 1)
    );


    const result = {
        subject: subject,
        topic: topicName,
        score: score,
        total: total,
        percentage: percentage,
        date: today
    };


    localStorage.setItem(
        "lastSprintResult",
        JSON.stringify(result)
    );


    window.location.href =
        "results.html";
}


/* =========================================================
   ERROR SCREEN
========================================================= */

function showError(message) {

    document.body.innerHTML = "";


    const main =
        document.createElement("main");


    main.style.minHeight = "100vh";
    main.style.display = "flex";
    main.style.alignItems = "center";
    main.style.justifyContent = "center";
    main.style.padding = "24px";
    main.style.background = "#0d0d12";
    main.style.color = "#ffffff";
    main.style.fontFamily =
        "Arial, sans-serif";
    main.style.textAlign = "center";


    const box =
        document.createElement("div");


    box.style.width = "100%";
    box.style.maxWidth = "500px";
    box.style.padding = "32px";
    box.style.borderRadius = "20px";
    box.style.background = "#17171f";
    box.style.border =
        "1px solid #292934";


    const icon =
        document.createElement("div");


    icon.textContent = "⚠️";
    icon.style.fontSize = "48px";
    icon.style.marginBottom = "16px";


    const title =
        document.createElement("h1");


    title.textContent =
        "Something went wrong";

    title.style.margin =
        "0 0 12px";


    const text =
        document.createElement("p");


    text.textContent = message;
    text.style.color = "#aaaab5";
    text.style.lineHeight = "1.5";


    const button =
        document.createElement("button");


    button.type = "button";
    button.textContent = "Back to Sprint";


    button.style.border = "0";
    button.style.borderRadius = "12px";
    button.style.padding = "14px 20px";
    button.style.background = "#8875f5";
    button.style.color = "#ffffff";
    button.style.fontSize = "15px";
    button.style.fontWeight = "700";


    button.addEventListener(
        "click",
        function () {
            window.location.href =
                "index.html";
        }
    );


    box.appendChild(icon);
    box.appendChild(title);
    box.appendChild(text);
    box.appendChild(button);

    main.appendChild(box);

    document.body.appendChild(main);
}


/* =========================================================
   START
========================================================= */

loadQuestionFile();
