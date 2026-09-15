var questionBanks = {

    science: [
        {
            name: "Rocks and Minerals",
            icon: "🪨",
            file: "../../questions/rocks-and-minerals.js",
            globalName: "rocksAndMineralsQuestions"
        },
        {
            name: "Energy and Forces",
            icon: "⚡",
            file: "../../questions/energy-and-forces.js",
            globalName: "energyAndForcesQuestions"
        },
        {
            name: "Cells",
            icon: "🧬",
            file: "../../questions/cells.js",
            globalName: "cellsQuestions"
        },
        {
            name: "The Heart",
            icon: "❤️",
            file: "../../questions/heart.js",
            globalName: "heartQuestions"
        },
        {
            name: "Electricity",
            icon: "🔌",
            file: "../../questions/electricity.js",
            globalName: "electricityQuestions"
        }
    ],

    maths: [
        {
            name: "Algebra",
            icon: "🔢",
            file: "../../questions/year-9-algebra.js",
            globalName: "year9AlgebraQuestions"
        },
        {
            name: "BIDMAS",
            icon: "➗",
            file: "../../questions/bidmas.js",
            globalName: "bidmasQuestions"
        },
        {
            name: "Area and Perimeter",
            icon: "📐",
            file: "../../questions/area-and-perimeter.js",
            globalName: "areaAndPerimeterQuestions"
        },
        {
            name: "Geometry",
            icon: "📏",
            file: "../../questions/geometry.js",
            globalName: "geometryQuestions"
        }
    ],

    english: [
        {
            name: "Grammar",
            icon: "✏️",
            file: "../../questions/grammar.js",
            globalName: "grammarQuestions"
        },
        {
            name: "Film Study",
            icon: "🎬",
            file: "../../questions/film-study.js",
            globalName: "filmStudyQuestions"
        },
        {
            name: "English",
            icon: "📖",
            file: "../../questions/english-generic.js",
            globalName: "englishGenericQuestions"
        },
        {
            name: "Literature",
            icon: "📚",
            file: "../../questions/literature.js",
            globalName: "literatureQuestions"
        },
        {
            name: "Poetry",
            icon: "📝",
            file: "../../questions/poetry.js",
            globalName: "poetryQuestions"
        }
    ],

    humanities: [
        {
            name: "Geography",
            icon: "🌍",
            file: "../../questions/geography.js",
            globalName: "geographyQuestions"
        },
        {
            name: "Humanities",
            icon: "🏛️",
            file: "../../questions/humanities-generic-1.js",
            globalName: "humanitiesGeneric1Questions"
        }
    ],

    japanese: [
        {
            name: "Characters",
            icon: "あ",
            file: "../../questions/japanese-characters.js",
            globalName: "japaneseCharactersQuestions"
        },
        {
            name: "People, Places and Vehicles",
            icon: "🚅",
            file: "../../questions/japanese-people-places-vehicles.js",
            globalName: "japanesePeoplePlacesVehiclesQuestions"
        },
        {
            name: "Travel",
            icon: "🗾",
            file: "../../questions/japanese-travel.js",
            globalName: "japaneseTravelQuestions"
        }
    ],

    french: [
        {
            name: "Characters",
            icon: "🔤",
            file: "../../questions/french-characters.js",
            globalName: "frenchCharactersQuestions"
        },
        {
            name: "People, Places and Vehicles",
            icon: "🚗",
            file: "../../questions/french-people-places-vehicles.js",
            globalName: "frenchPeoplePlacesVehiclesQuestions"
        },
        {
            name: "Travel",
            icon: "✈️",
            file: "../../questions/french-travel.js",
            globalName: "frenchTravelQuestions"
        }
    ]

};

var subjectNames = {
    science: "SCIENCE",
    maths: "MATHS",
    english: "ENGLISH",
    humanities: "HUMANITIES",
    japanese: "JAPANESE",
    french: "FRENCH"
};

var subjectScreen = document.getElementById("subject-screen");
var topicScreen = document.getElementById("topic-screen");
var quizScreen = document.getElementById("quiz-screen");
var completeScreen = document.getElementById("complete-screen");

var topicList = document.getElementById("topic-list");
var selectedSubjectLabel = document.getElementById("selected-subject-label");

var questionNumber = document.getElementById("question-number");
var progressBar = document.getElementById("progress-bar");
var questionType = document.getElementById("question-type");
var questionText = document.getElementById("question-text");

var answersArea = document.getElementById("answers-area");
var writtenArea = document.getElementById("written-area");
var writtenAnswer = document.getElementById("written-answer");
var submitWritten = document.getElementById("submit-written");

var feedback = document.getElementById("feedback");
var feedbackTitle = document.getElementById("feedback-title");
var feedbackText = document.getElementById("feedback-text");

var nextButton = document.getElementById("next-button");

var currentSubject = null;
var currentTopic = null;
var currentQuestions = [];
var currentQuestionIndex = 0;
var currentScore = 0;
var currentAnswered = false;


/* =========================================================
   SCREEN HELPERS
========================================================= */

function showScreen(screen) {

    subjectScreen.classList.add("hidden");
    topicScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    completeScreen.classList.add("hidden");

    screen.classList.remove("hidden");
}


/* =========================================================
   LOAD REAL QUESTION FILE
========================================================= */

function loadQuestionBank(topic, callback) {

    var existing = window[topic.globalName];

    if (existing) {
        callback(existing);
        return;
    }

    var script = document.createElement("script");

    script.src = topic.file;

    script.onload = function () {

        var bank = window[topic.globalName];

        if (!bank) {
            callback([]);
            return;
        }

        callback(bank);
    };

    script.onerror = function () {
        callback([]);
    };

    document.body.appendChild(script);
}


/* =========================================================
   SUBJECTS
========================================================= */

document.querySelectorAll(".subject-card").forEach(function (button) {

    button.addEventListener("click", function () {

        currentSubject = button.getAttribute("data-subject");

        selectedSubjectLabel.textContent =
            subjectNames[currentSubject];

        renderTopics();

        showScreen(topicScreen);

        window.scrollTo(0, 0);

    });

});


/* =========================================================
   TOPICS
========================================================= */

function renderTopics() {

    topicList.innerHTML = "";

    var topics = questionBanks[currentSubject] || [];

    topics.forEach(function (topic) {

        var button = document.createElement("button");

        button.className = "topic-card";

        button.innerHTML =
            '<span class="topic-icon">' +
                topic.icon +
            '</span>' +
            '<span class="topic-content">' +
                '<strong>' + topic.name + '</strong>' +
                '<small>Study this topic</small>' +
            '</span>' +
            '<span class="topic-arrow">→</span>';

        button.addEventListener("click", function () {

            currentTopic = topic;

            loadQuestionBank(topic, function (questions) {

                if (!questions || !questions.length) {

                    alert(
                        "There are no questions available for this topic yet."
                    );

                    return;
                }

                startQuiz(questions);

            });

        });

        topicList.appendChild(button);

    });

}


/* =========================================================
   START QUIZ
========================================================= */

function startQuiz(questions) {

    currentQuestions = questions.slice();
    currentQuestionIndex = 0;
    currentScore = 0;
    currentAnswered = false;

    showScreen(quizScreen);

    window.scrollTo(0, 0);

    showQuestion();

}


/* =========================================================
   QUESTION TYPE
========================================================= */

function isWrittenQuestion(question) {

    if (!question) {
        return false;
    }

    if (question.type === "written") {
        return true;
    }

    if (question.type === "short_answer") {
        return true;
    }

    if (question.type === "multiple") {
        return false;
    }

    if (question.answers && question.correct !== undefined) {
        return false;
    }

    if (
        question.answer !== undefined ||
        question.correctAnswer !== undefined ||
        question.acceptedAnswers !== undefined
    ) {
        return true;
    }

    return false;
}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

    var question = currentQuestions[currentQuestionIndex];

    if (!question) {
        finishQuiz();
        return;
    }

    currentAnswered = false;

    feedback.classList.add("hidden");
    feedback.classList.remove(
        "correct-feedback",
        "wrong-feedback"
    );

    nextButton.classList.add("hidden");

    answersArea.innerHTML = "";
    writtenAnswer.value = "";

    var total = currentQuestions.length;
    var number = currentQuestionIndex + 1;

    questionNumber.textContent =
        "Question " + number + " of " + total;

    progressBar.style.width =
        ((number - 1) / total * 100) + "%";

    questionText.textContent =
        question.question || "Question";

    if (isWrittenQuestion(question)) {

        questionType.textContent = "WRITTEN ANSWER";

        answersArea.classList.add("hidden");
        writtenArea.classList.remove("hidden");

        setTimeout(function () {
            writtenAnswer.focus();
        }, 100);

    } else {

        questionType.textContent = "MULTIPLE CHOICE";

        answersArea.classList.remove("hidden");
        writtenArea.classList.add("hidden");

        renderMultipleChoice(question);

    }

}


/* =========================================================
   MULTIPLE CHOICE
========================================================= */

function renderMultipleChoice(question) {

    var answers = question.answers || [];

    answers.forEach(function (answer, index) {

        var button = document.createElement("button");

        button.className = "answer-button";

        var letter = document.createElement("span");

        letter.className = "answer-letter";

        letter.textContent =
            String.fromCharCode(65 + index);

        var text = document.createElement("span");

        text.textContent = answer;

        button.appendChild(letter);
        button.appendChild(text);

        button.addEventListener("click", function () {

            checkMultipleChoice(
                question,
                index,
                button
            );

        });

        answersArea.appendChild(button);

    });

}


/* =========================================================
   CHECK MULTIPLE CHOICE
========================================================= */

function checkMultipleChoice(
    question,
    selectedIndex,
    selectedButton
) {

    if (currentAnswered) {
        return;
    }

    currentAnswered = true;

    var correctIndex = Number(question.correct);

    var buttons =
        answersArea.querySelectorAll(".answer-button");

    buttons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === correctIndex) {

        currentScore++;

        selectedButton.classList.add("correct");

        showFeedback(
            true,
            "Correct!",
            "Nice work. You got it right."
        );

    } else {

        selectedButton.classList.add("wrong");

        if (buttons[correctIndex]) {
            buttons[correctIndex].classList.add("correct");
        }

        var correctAnswer =
            question.answers &&
            question.answers[correctIndex];

        showFeedback(
            false,
            "Not quite.",
            "The correct answer is: " +
            (correctAnswer || "the answer shown above.")
        );

    }

    showNextButton();

}


/* =========================================================
   WRITTEN ANSWER
========================================================= */

submitWritten.addEventListener("click", function () {

    checkWrittenAnswer();

});


writtenAnswer.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        checkWrittenAnswer();
    }

});


function getWrittenAnswers(question) {

    var answers = [];

    if (question.answer !== undefined) {

        if (Array.isArray(question.answer)) {
            answers = answers.concat(question.answer);
        } else {
            answers.push(question.answer);
        }

    }

    if (question.correctAnswer !== undefined) {

        if (Array.isArray(question.correctAnswer)) {
            answers = answers.concat(question.correctAnswer);
        } else {
            answers.push(question.correctAnswer);
        }

    }

    if (Array.isArray(question.acceptedAnswers)) {
        answers = answers.concat(question.acceptedAnswers);
    }

    return answers;
}


function normaliseAnswer(value) {

    return String(value)
        .trim()
        .toLowerCase()
        .replace(/[.,!?]/g, "")
        .replace(/\s+/g, " ");

}


function checkWrittenAnswer() {

    if (currentAnswered) {
        return;
    }

    var question =
        currentQuestions[currentQuestionIndex];

    var userAnswer =
        normaliseAnswer(writtenAnswer.value);

    if (!userAnswer) {
        return;
    }

    currentAnswered = true;

    var accepted =
        getWrittenAnswers(question);

    var correct = false;

    accepted.forEach(function (answer) {

        if (
            normaliseAnswer(answer) ===
            userAnswer
        ) {
            correct = true;
        }

    });

    writtenAnswer.disabled = true;
    submitWritten.disabled = true;

    if (correct) {

        currentScore++;

        showFeedback(
            true,
            "Correct!",
            "Your written answer matches the expected answer."
        );

    } else {

        var displayAnswer =
            accepted.length ?
            accepted[0] :
            "Check the topic again.";

        showFeedback(
            false,
            "Not quite.",
            "The expected answer is: " +
            displayAnswer
        );

    }

    showNextButton();

}


/* =========================================================
   FEEDBACK
========================================================= */

function showFeedback(
    correct,
    title,
    message
) {

    feedback.classList.remove("hidden");

    feedback.classList.remove(
        "correct-feedback",
        "wrong-feedback"
    );

    feedback.classList.add(
        correct ?
        "correct-feedback" :
        "wrong-feedback"
    );

    feedbackTitle.textContent = title;
    feedbackText.textContent = message;

}


/* =========================================================
   NEXT
========================================================= */

function showNextButton() {

    nextButton.textContent =
        currentQuestionIndex >= currentQuestions.length - 1
        ? "Finish →"
        : "Next Question →";

    nextButton.classList.remove("hidden");

}


nextButton.addEventListener("click", function () {

    currentQuestionIndex++;

    if (
        currentQuestionIndex >=
        currentQuestions.length
    ) {

        finishQuiz();
        return;

    }

    writtenAnswer.disabled = false;
    submitWritten.disabled = false;

    showQuestion();

    window.scrollTo(0, 0);

});


/* =========================================================
   FINISH
========================================================= */

function finishQuiz() {

    progressBar.style.width = "100%";

    var oldQuizzes =
        Number(localStorage.getItem("quizzes")) || 0;

    localStorage.setItem(
        "quizzes",
        String(oldQuizzes + 1)
    );

    var oldCompleted =
        Number(localStorage.getItem("quizzes_completed")) || 0;

    localStorage.setItem(
        "quizzes_completed",
        String(oldCompleted + 1)
    );

    var streak =
        Number(localStorage.getItem("streak")) || 0;

    localStorage.setItem(
        "streak",
        String(streak + 1)
    );

    document.getElementById("score-number").textContent =
        currentScore;

    document.getElementById("total-number").textContent =
        currentQuestions.length;

    document.getElementById("complete-message").textContent =
        "You scored " +
        currentScore +
        " out of " +
        currentQuestions.length +
        " in " +
        currentTopic.name +
        ".";

    showScreen(completeScreen);

    window.scrollTo(0, 0);

}


/* =========================================================
   NAVIGATION
========================================================= */

document.getElementById("back-subjects")
    .addEventListener("click", function () {

        showScreen(subjectScreen);

        window.scrollTo(0, 0);

    });


document.getElementById("back-topics")
    .addEventListener("click", function () {

        showScreen(topicScreen);

        window.scrollTo(0, 0);

    });


document.getElementById("study-again")
    .addEventListener("click", function () {

        startQuiz(currentQuestions);

    });


document.getElementById("return-home")
    .addEventListener("click", function () {

        window.location.href = "../index.html";

    });
