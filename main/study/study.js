/* =========================================================
   STUDYSPRINT — STUDY MODE
========================================================= */


var studyBanks = {

    science: [
        [
            "Rocks and Minerals",
            "../../questions/rocks-and-minerals.js",
            "rocksAndMineralsQuestions"
        ],
        [
            "Energy and Forces",
            "../../questions/energy-and-forces.js",
            "energyAndForcesQuestions"
        ]
    ],

    maths: [
        [
            "Year 9 Algebra",
            "../../questions/year-9-algebra.js",
            "year9AlgebraQuestions"
        ],
        [
            "BIDMAS",
            "../../questions/bidmas.js",
            "bidmasQuestions"
        ],
        [
            "Area and Perimeter",
            "../../questions/area-and-perimeter.js",
            "areaAndPerimeterQuestions"
        ]
    ],

    english: [
        [
            "Film Study",
            "../../questions/film-study.js",
            "filmStudyQuestions"
        ],
        [
            "Grammar",
            "../../questions/grammar.js",
            "grammarQuestions"
        ],
        [
            "English",
            "../../questions/english-generic.js",
            "englishGenericQuestions"
        ]
    ],

    humanities: [
        [
            "Humanities",
            "../../questions/humanities-generic-1.js",
            "humanitiesGenericQuestions"
        ],
        [
            "Geography",
            "../../questions/geography.js",
            "geographyQuestions"
        ]
    ],

    japanese: [
        [
            "Characters",
            "../../questions/japanese-characters.js",
            "japaneseCharactersQuestions"
        ],
        [
            "People, Places and Vehicles",
            "../../questions/japanese-people-places-vehicles.js",
            "japanesePeoplePlacesVehiclesQuestions"
        ],
        [
            "Travel",
            "../../questions/japanese-travel.js",
            "japaneseTravelQuestions"
        ]
    ],

    french: [
        [
            "Characters",
            "../../questions/french-characters.js",
            "frenchCharactersQuestions"
        ],
        [
            "People, Places and Vehicles",
            "../../questions/french-people-places-vehicles.js",
            "frenchPeoplePlacesVehiclesQuestions"
        ],
        [
            "Travel",
            "../../questions/french-travel.js",
            "frenchTravelQuestions"
        ]
    ]

};


var gameNames = {

    garden: "Garden",
    fishing: "Fishing",
    restaurant: "Restaurant"

};


var studyState = {

    game: "",
    subject: "",
    topic: "",
    questionPath: "",
    questionGlobal: "",
    questions: [],
    currentQuestion: 0,
    correct: 0,
    answered: 0,
    coins: 0,
    questionLocked: false

};


function getElement(id) {

    return document.getElementById(id);

}


function shuffle(array) {

    var copy = array.slice();

    for (
        var i = copy.length - 1;
        i > 0;
        i--
    ) {

        var randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );

        var temporary =
            copy[i];

        copy[i] =
            copy[randomIndex];

        copy[randomIndex] =
            temporary;

    }

    return copy;

}


function normaliseBank(bank) {

    if (Array.isArray(bank)) {

        return bank.slice();

    }


    if (
        !bank
        ||
        typeof bank !== "object"
    ) {

        return [];

    }


    var output = [];


    Object.keys(bank).forEach(
        function (key) {

            var value =
                bank[key];

            if (!Array.isArray(value)) {
                return;
            }


            value.forEach(
                function (question) {

                    if (
                        question
                        &&
                        typeof question === "object"
                    ) {

                        output.push(question);

                    }

                }
            );

        }
    );


    return output;

}


function showScreen(id) {

    var screenIds = [
        "game-screen",
        "subject-screen",
        "topic-screen",
        "ready-screen",
        "quiz-screen",
        "complete-screen"
    ];


    screenIds.forEach(
        function (screenId) {

            var element =
                getElement(screenId);

            if (!element) {
                return;
            }


            if (screenId === id) {

                element.classList.remove(
                    "hidden"
                );

            } else {

                element.classList.add(
                    "hidden"
                );

            }

        }
    );

}


function selectGame(game) {

    if (!gameNames[game]) {
        return;
    }


    studyState.game =
        game;


    var description =
        getElement(
            "selected-game-description"
        );


    if (description) {

        description.textContent =
            gameNames[game]
            + " selected. Now choose a subject.";

    }


    showScreen(
        "subject-screen"
    );

}


function selectSubject(subject) {

    studyState.subject =
        subject;


    var topics =
        studyBanks[subject] || [];


    var list =
        getElement("topic-list");


    var label =
        getElement(
            "selected-subject-label"
        );


    if (label) {

        label.textContent =
            subject.toUpperCase();

    }


    if (!list) {
        return;
    }


    list.innerHTML = "";


    topics.forEach(
        function (topic) {

            var button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "topic-card";


            button.innerHTML =
                "<strong>"
                + topic[0]
                + "</strong>"
                + "<small>Select</small>";


            button.addEventListener(
                "click",
                function () {

                    selectTopic(
                        topic
                    );

                }
            );


            list.appendChild(
                button
            );

        }
    );


    showScreen(
        "topic-screen"
    );

}


function selectTopic(topic) {

    studyState.topic =
        topic[0];

    studyState.questionPath =
        topic[1];

    studyState.questionGlobal =
        topic[2];


    var gameTitle =
        getElement("ready-game");

    var topicTitle =
        getElement("ready-topic");


    if (gameTitle) {

        gameTitle.textContent =
            gameNames[
                studyState.game
            ];

    }


    if (topicTitle) {

        topicTitle.textContent =
            studyState.topic;

    }


    showScreen(
        "ready-screen"
    );

}


function loadQuestions() {

    var oldScript =
        document.querySelector(
            "script[data-study-question-bank]"
        );


    if (oldScript) {

        oldScript.remove();

    }


    var script =
        document.createElement(
            "script"
        );


    script.src =
        studyState.questionPath;


    script.dataset.studyQuestionBank =
        "true";


    script.onload =
        function () {

            var bank =
                window[
                    studyState.questionGlobal
                ];


            var questions =
                normaliseBank(
                    bank
                );


            if (!questions.length) {

                alert(
                    "No questions were found for this topic."
                );

                return;

            }


            studyState.questions =
                shuffle(
                    questions
                );


            studyState.currentQuestion =
                0;

            studyState.correct =
                0;

            studyState.answered =
                0;

            studyState.coins =
                0;

            studyState.questionLocked =
                false;


            updateCoins();

            showScreen(
                "quiz-screen"
            );

            renderQuestion();

        };


    script.onerror =
        function () {

            alert(
                "The question file could not be loaded."
            );

        };


    document.head.appendChild(
        script
    );

}


function renderQuestion() {

    var question =
        studyState.questions[
            studyState.currentQuestion
        ];


    if (!question) {

        finishStudy();

        return;

    }


    studyState.questionLocked =
        false;


    var questionNumber =
        getElement(
            "question-number"
        );


    var progressBar =
        getElement(
            "progress-bar"
        );


    var questionType =
        getElement(
            "question-type"
        );


    var questionText =
        getElement(
            "question-text"
        );


    var answersArea =
        getElement(
            "answers-area"
        );


    var writtenArea =
        getElement(
            "written-area"
        );


    var writtenInput =
        getElement(
            "written-answer"
        );


    var submitWritten =
        getElement(
            "submit-written"
        );


    var feedback =
        getElement(
            "feedback"
        );


    var nextButton =
        getElement(
            "next-button"
        );


    if (questionNumber) {

        questionNumber.textContent =
            "Question "
            + (
                studyState.currentQuestion + 1
            )
            + " of "
            + studyState.questions.length;

    }


    if (progressBar) {

        var percentage =
            (
                studyState.currentQuestion
                /
                studyState.questions.length
            ) * 100;


        progressBar.style.width =
            percentage + "%";

    }


    if (questionType) {

        questionType.textContent =
            question.type === "written"
                ? "WRITTEN"
                : "QUESTION";

    }


    if (questionText) {

        questionText.textContent =
            question.question || "";

    }


    if (answersArea) {

        answersArea.innerHTML = "";

        answersArea.classList.remove(
            "hidden"
        );

    }


    if (writtenArea) {

        writtenArea.classList.add(
            "hidden"
        );

    }


    if (writtenInput) {

        writtenInput.value = "";

    }


    if (submitWritten) {

        submitWritten.disabled =
            false;

    }


    if (feedback) {

        feedback.classList.add(
            "hidden"
        );

    }


    if (nextButton) {

        nextButton.classList.add(
            "hidden"
        );

    }


    var isWritten =
        question.type === "written"
        ||
        Array.isArray(
            question.acceptedAnswers
        );


    if (isWritten) {

        if (answersArea) {

            answersArea.classList.add(
                "hidden"
            );

        }


        if (writtenArea) {

            writtenArea.classList.remove(
                "hidden"
            );

        }


        return;

    }


    var answers =
        Array.isArray(
            question.answers
        )
            ? shuffle(
                question.answers
            )
            : [];


    answers.forEach(
        function (answer) {

            var button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "answer-button";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                function () {

                    checkMultipleChoice(
                        answer,
                        question
                    );

                }
            );


            answersArea.appendChild(
                button
            );

        }
    );

}


function checkMultipleChoice(
    answer,
    question
) {

    if (
        studyState.questionLocked
    ) {

        return;

    }


    studyState.questionLocked =
        true;


    studyState.answered++;


    var correct =
        String(answer)
            .trim()
        ===
        String(question.correctAnswer)
            .trim();


    if (correct) {

        studyState.correct++;

        addCoins(
            10
        );

    }


    showFeedback(
        correct,
        question.correctAnswer
    );


    disableAnswers();

    showNextButton();

}


function checkWritten() {

    if (
        studyState.questionLocked
    ) {

        return;

    }


    var question =
        studyState.questions[
            studyState.currentQuestion
        ];


    var input =
        getElement(
            "written-answer"
        );


    if (!input) {
        return;
    }


    var answer =
        input.value.trim();


    if (!answer) {
        return;
    }


    studyState.questionLocked =
        true;


    studyState.answered++;


    var accepted =
        Array.isArray(
            question.acceptedAnswers
        )
            ? question.acceptedAnswers
            : [];


    var correct =
        accepted.some(
            function (possibleAnswer) {

                return (
                    String(possibleAnswer)
                        .trim()
                        .toLowerCase()
                    ===
                    answer
                        .toLowerCase()
                        .trim()
                );

            }
        );


    if (correct) {

        studyState.correct++;

        addCoins(
            15
        );

    }


    showFeedback(
        correct,
        accepted.length
            ? accepted[0]
            : ""
    );


    var submit =
        getElement(
            "submit-written"
        );


    if (submit) {

        submit.disabled =
            true;

    }


    showNextButton();

}


function addCoins(amount) {

    studyState.coins +=
        amount;


    updateCoins();


    saveCoins();

}


function updateCoins() {

    var element =
        getElement(
            "study-coins"
        );


    if (element) {

        element.textContent =
            studyState.coins;

    }

}


function saveCoins() {

    var currentCoins =
        Number(
            localStorage.getItem(
                "studysprint_coins"
            )
        )
        || 0;


    localStorage.setItem(
        "studysprint_coins",
        String(
            currentCoins
            +
            studyState.coins
        )
    );

}


function showFeedback(
    correct,
    correctAnswer
) {

    var feedback =
        getElement(
            "feedback"
        );


    var title =
        getElement(
            "feedback-title"
        );


    var text =
        getElement(
            "feedback-text"
        );


    if (!feedback) {
        return;
    }


    feedback.classList.remove(
        "hidden"
    );


    if (title) {

        title.textContent =
            correct
                ? "Correct"
                : "Not quite";

    }


    if (text) {

        if (correct) {

            text.textContent =
                "You earned coins for this answer.";

        } else {

            text.textContent =
                "The answer was: "
                + correctAnswer;

        }

    }

}


function disableAnswers() {

    var buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        function (button) {

            button.disabled =
                true;

        }
    );

}


function showNextButton() {

    var button =
        getElement(
            "next-button"
        );


    if (!button) {
        return;
    }


    button.classList.remove(
        "hidden"
    );


    button.onclick =
        function () {

            studyState.currentQuestion++;

            renderQuestion();

        };

}


function finishStudy() {

    var score =
        getElement(
            "score-number"
        );


    var coins =
        getElement(
            "coins-earned"
        );


    if (score) {

        score.textContent =
            studyState.correct;

    }


    if (coins) {

        coins.textContent =
            studyState.coins;

    }


    showScreen(
        "complete-screen"
    );

}


function restartStudy() {

    loadQuestions();

}


function setupNavigation() {

    var gameButtons =
        document.querySelectorAll(
            ".game-card[data-game]"
        );


    gameButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    selectGame(
                        button.dataset.game
                    );

                }
            );

        }
    );


    var subjectButtons =
        document.querySelectorAll(
            ".subject-card"
        );


    subjectButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    selectSubject(
                        button.dataset.subject
                    );

                }
            );

        }
    );


    getElement(
        "back-games"
    ).addEventListener(
        "click",
        function () {

            showScreen(
                "game-screen"
            );

        }
    );


    getElement(
        "back-subjects"
    ).addEventListener(
        "click",
        function () {

            showScreen(
                "subject-screen"
            );

        }
    );


    getElement(
        "back-topics"
    ).addEventListener(
        "click",
        function () {

            showScreen(
                "topic-screen"
            );

        }
    );


    getElement(
        "back-to-ready"
    ).addEventListener(
        "click",
        function () {

            showScreen(
                "ready-screen"
            );

        }
    );


    getElement(
        "start-study"
    ).addEventListener(
        "click",
        function () {

            loadQuestions();

        }
    );


    getElement(
        "submit-written"
    ).addEventListener(
        "click",
        function () {

            checkWritten();

        }
    );


    getElement(
        "study-again"
    ).addEventListener(
        "click",
        function () {

            restartStudy();

        }
    );


    getElement(
        "return-home"
    ).addEventListener(
        "click",
        function () {

            window.location.href =
                "../index.html";

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupNavigation();

        showScreen(
            "game-screen"
        );

    }
);
