```javascript
const questionBank = {

    science: {

        "The Heart": [
            {
                question: "Which chamber pumps oxygen-rich blood around the body?",
                answers: [
                    "Right atrium",
                    "Right ventricle",
                    "Left atrium",
                    "Left ventricle"
                ],
                correct: 3,
                explanation:
                    "The left ventricle pumps oxygen-rich blood from the heart to the rest of the body."
            },

            {
                question: "Which organ pumps blood around the body?",
                answers: [
                    "Lungs",
                    "Heart",
                    "Brain",
                    "Kidney"
                ],
                correct: 1,
                explanation:
                    "The heart is the muscular organ responsible for pumping blood."
            },

            {
                question: "Which chamber receives blood from the body?",
                answers: [
                    "Right atrium",
                    "Left atrium",
                    "Right ventricle",
                    "Left ventricle"
                ],
                correct: 0,
                explanation:
                    "The right atrium receives oxygen-poor blood returning from the body."
            },

            {
                question: "Where does blood pick up oxygen?",
                answers: [
                    "Heart",
                    "Stomach",
                    "Lungs",
                    "Brain"
                ],
                correct: 2,
                explanation:
                    "Blood picks up oxygen in the lungs."
            },

            {
                question: "How many chambers does the human heart have?",
                answers: [
                    "2",
                    "3",
                    "4",
                    "5"
                ],
                correct: 2,
                explanation:
                    "The human heart has four chambers."
            }
        ],


        "Electricity": [
            {
                question: "What must a circuit have for current to flow?",
                answers: [
                    "A complete path",
                    "A magnet",
                    "Two batteries",
                    "A motor"
                ],
                correct: 0,
                explanation:
                    "A circuit needs a complete conducting path for current to flow."
            },

            {
                question: "Which component can open or close a circuit?",
                answers: [
                    "Globe",
                    "Switch",
                    "Wire",
                    "Cell"
                ],
                correct: 1,
                explanation:
                    "A switch controls whether a circuit is open or closed."
            },

            {
                question: "What provides electrical energy in a simple circuit?",
                answers: [
                    "Cell",
                    "Wire",
                    "Switch",
                    "Globe"
                ],
                correct: 0,
                explanation:
                    "A cell provides electrical energy to a simple circuit."
            },

            {
                question: "What is a conductor?",
                answers: [
                    "A material that resists electricity",
                    "A material that allows charge to move easily",
                    "A type of battery",
                    "A type of switch"
                ],
                correct: 1,
                explanation:
                    "Conductors allow electric charge to move through them relatively easily."
            },

            {
                question: "Which material is generally a good conductor?",
                answers: [
                    "Rubber",
                    "Plastic",
                    "Copper",
                    "Glass"
                ],
                correct: 2,
                explanation:
                    "Copper is a very good electrical conductor."
            }
        ]

    },


    maths: {

        "Algebra": [
            {
                question: "If x + 5 = 12, what is x?",
                answers: [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                correct: 2,
                explanation:
                    "Subtract 5 from both sides: x = 7."
            },

            {
                question: "What is 3x when x = 4?",
                answers: [
                    "7",
                    "8",
                    "12",
                    "16"
                ],
                correct: 2,
                explanation:
                    "3 × 4 = 12."
            },

            {
                question: "Which of these is an algebraic expression?",
                answers: [
                    "15",
                    "7 + 2",
                    "3x + 4",
                    "20 ÷ 5"
                ],
                correct: 2,
                explanation:
                    "3x + 4 contains a variable, making it an algebraic expression."
            },

            {
                question: "If 2x = 18, what is x?",
                answers: [
                    "6",
                    "8",
                    "9",
                    "10"
                ],
                correct: 2,
                explanation:
                    "Divide both sides by 2: x = 9."
            },

            {
                question: "What is 5x + 2 when x = 2?",
                answers: [
                    "7",
                    "10",
                    "12",
                    "14"
                ],
                correct: 2,
                explanation:
                    "5 × 2 + 2 = 12."
            }
        ],


        "Geometry": [
            {
                question: "How many degrees are in a right angle?",
                answers: [
                    "45°",
                    "90°",
                    "180°",
                    "360°"
                ],
                correct: 1,
                explanation:
                    "A right angle measures exactly 90°."
            },

            {
                question: "How many sides does a triangle have?",
                answers: [
                    "2",
                    "3",
                    "4",
                    "5"
                ],
                correct: 1,
                explanation:
                    "A triangle has three sides."
            },

            {
                question: "What type of angle is 120°?",
                answers: [
                    "Acute",
                    "Right",
                    "Obtuse",
                    "Straight"
                ],
                correct: 2,
                explanation:
                    "An obtuse angle is greater than 90° and less than 180°."
            },

            {
                question: "How many degrees are in a straight angle?",
                answers: [
                    "90°",
                    "120°",
                    "180°",
                    "360°"
                ],
                correct: 2,
                explanation:
                    "A straight angle measures 180°."
            },

            {
                question: "How many sides does a hexagon have?",
                answers: [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                correct: 1,
                explanation:
                    "A hexagon has six sides."
            }
        ],


        "BIDMAS": [
            {
                question: "What should you calculate first in 3 + (4 × 2)?",
                answers: [
                    "3 + 4",
                    "4 × 2",
                    "3 + 2",
                    "Everything at once"
                ],
                correct: 1,
                explanation:
                    "Multiplication is performed before addition."
            },

            {
                question: "What does the B in BIDMAS stand for?",
                answers: [
                    "Base",
                    "Brackets",
                    "Below",
                    "Both"
                ],
                correct: 1,
                explanation:
                    "B stands for Brackets."
            },

            {
                question: "What is 2 + 3 × 4?",
                answers: [
                    "20",
                    "14",
                    "24",
                    "18"
                ],
                correct: 1,
                explanation:
                    "Multiply first: 3 × 4 = 12, then add 2 to get 14."
            },

            {
                question: "What does I stand for in BIDMAS?",
                answers: [
                    "Integers",
                    "Indices",
                    "Inverse",
                    "Increase"
                ],
                correct: 1,
                explanation:
                    "I stands for Indices."
            },

            {
                question: "What is 20 − 4 ÷ 2?",
                answers: [
                    "8",
                    "10",
                    "18",
                    "16"
                ],
                correct: 2,
                explanation:
                    "Division comes first: 4 ÷ 2 = 2, then 20 − 2 = 18."
            }
        ]

    }

};


// =========================
// URL DATA
// =========================

const params = new URLSearchParams(
    window.location.search
);

const subject =
    params.get("subject");

const topic =
    params.get("topic")
        ? decodeURIComponent(params.get("topic"))
        : null;


// =========================
// ELEMENTS
// =========================

const quizTopic =
    document.getElementById("quizTopic");

const questionText =
    document.getElementById("questionText");

const answersContainer =
    document.getElementById("answers");

const progressFill =
    document.getElementById("progressFill");

const questionCounter =
    document.getElementById("questionCounter");

const feedback =
    document.getElementById("feedback");

const feedbackTitle =
    document.getElementById("feedbackTitle");

const feedbackText =
    document.getElementById("feedbackText");

const nextButton =
    document.getElementById("nextButton");

const nextButtonText =
    document.getElementById("nextButtonText");

const quizHeader =
    document.querySelector(".quiz-header");

const questionSection =
    document.querySelector(".question-section");

const results =
    document.getElementById("results");

const finalScore =
    document.getElementById("finalScore");

const scorePercentage =
    document.getElementById("scorePercentage");

const correctCount =
    document.getElementById("correctCount");

const resultsTitle =
    document.getElementById("resultsTitle");

const retryButton =
    document.getElementById("retryButton");

const bestScore =
    document.getElementById("bestScore");


// =========================
// VALIDATE
// =========================

let questions =
    questionBank[subject]?.[topic];

if (!questions || questions.length < 5) {

    questionText.textContent =
        "This Sprint isn't available yet.";

    quizTopic.textContent =
        "COMING SOON";

    answersContainer.innerHTML = "";

} else {

    questions = shuffle(
        [...questions]
    ).slice(0, 5);

    startQuiz();

}


// =========================
// QUIZ STATE
// =========================

let currentQuestion = 0;
let score = 0;
let answered = false;


// =========================
// START
// =========================

function startQuiz() {

    currentQuestion = 0;
    score = 0;
    answered = false;

    quizHeader.style.display = "flex";
    questionSection.style.display = "block";
    answersContainer.style.display = "flex";

    results.hidden = true;

    nextButton.hidden = true;
    feedback.hidden = true;

    showQuestion();

}


// =========================
// SHOW QUESTION
// =========================

function showQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];

    quizTopic.textContent =
        topic;

    questionText.textContent =
        question.question;

    questionCounter.textContent =
        `${currentQuestion + 1} / ${questions.length}`;

    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    answersContainer.innerHTML = "";

    feedback.hidden = true;
    nextButton.hidden = true;


    const letters =
        ["A", "B", "C", "D"];


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer-button";


            button.innerHTML = `
                <span class="answer-letter">
                    ${letters[index]}
                </span>

                <span>
                    ${answer}
                </span>
            `;


            button.addEventListener(
                "click",
                () => selectAnswer(
                    index,
                    button
                )
            );


            answersContainer.appendChild(
                button
            );

        }
    );

}


// =========================
// ANSWER
// =========================

function selectAnswer(
    selectedIndex,
    selectedButton
) {

    if (answered) {
        return;
    }

    answered = true;

    const question =
        questions[currentQuestion];

    const answerButtons =
        document.querySelectorAll(
            ".answer-button"
        );


    answerButtons.forEach(button => {

        button.classList.add("disabled");

    });


    if (
        selectedIndex ===
        question.correct
    ) {

        score++;

        selectedButton.classList.add(
            "correct"
        );

        feedbackTitle.textContent =
            "Correct!";

        feedbackText.textContent =
            question.explanation;

    } else {

        selectedButton.classList.add(
            "incorrect"
        );

        answerButtons[
            question.correct
        ].classList.add("correct");

        feedbackTitle.textContent =
            "Not quite.";

        feedbackText.textContent =
            question.explanation;

    }


    feedback.hidden = false;

    nextButton.hidden = false;


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButtonText.textContent =
            "See results";

    } else {

        nextButtonText.textContent =
            "Next question";

    }

}


// =========================
// NEXT
// =========================

nextButton.addEventListener(
    "click",
    () => {

        if (
            currentQuestion ===
            questions.length - 1
        ) {

            showResults();

            return;

        }

        currentQuestion++;

        showQuestion();

    }
);


// =========================
// RESULTS
// =========================

function showResults() {

    quizHeader.style.display = "none";
    questionSection.style.display = "none";
    answersContainer.style.display = "none";

    feedback.hidden = true;
    nextButton.hidden = true;

    results.hidden = false;


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    finalScore.textContent =
        `${score} / ${questions.length}`;

    scorePercentage.textContent =
        `${percentage}%`;

    correctCount.textContent =
        score;


    if (percentage === 100) {

        resultsTitle.textContent =
            "Perfect Sprint.";

    } else if (percentage >= 80) {

        resultsTitle.textContent =
            "Great work.";

    } else if (percentage >= 60) {

        resultsTitle.textContent =
            "Nice effort.";

    } else {

        resultsTitle.textContent =
            "Keep practising.";

    }


    saveBestScore();

}


// =========================
// BEST SCORE
// =========================

function saveBestScore() {

    const key =
        `studysprint-best-${subject}-${topic}`;

    const previous =
        Number(
            localStorage.getItem(key)
        ) || 0;


    if (score > previous) {

        localStorage.setItem(
            key,
            score
        );

    }


    const best =
        Math.max(score, previous);

    bestScore.textContent =
        `${best} / ${questions.length}`;

}


// =========================
// RETRY
// =========================

retryButton.addEventListener(
    "click",
    () => {

        questions = shuffle(
            [...(questionBank[subject]?.[topic] || [])]
        ).slice(0, 5);

        startQuiz();

    }
);


// =========================
// SHUFFLE
// =========================

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

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

    return array;

}
```
