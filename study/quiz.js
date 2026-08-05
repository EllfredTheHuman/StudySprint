let currentQuestion = 0;
let score = 0;


// Get the question elements
const questionText = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next");


// Load question
function loadQuestion() {

    let question = heartQuestions[currentQuestion];

    questionText.textContent = question.question;

    feedback.textContent = "";

    nextButton.style.display = "none";


    answerButtons.forEach((button, index) => {

        button.textContent = question.answers[index];

        button.disabled = false;

        button.onclick = function() {

            checkAnswer(button.textContent);

        };

    });

}


// Check answer
function checkAnswer(answer) {

    let question = heartQuestions[currentQuestion];


    answerButtons.forEach(button => {
        button.disabled = true;
    });


    if (answer === question.correct) {

        score++;

        feedback.textContent =
        "✅ Correct! " + question.explanation;

    } 
    
    else {

        feedback.textContent =
        "❌ Incorrect! The answer was: " 
        + question.correct 
        + ". " 
        + question.explanation;

    }


    nextButton.style.display = "block";

}



// Next question
nextButton.onclick = function() {

    currentQuestion++;


    if (currentQuestion < heartQuestions.length) {

        loadQuestion();

    }

    else {

        questionText.textContent =
        "Quiz Complete!";

        feedback.textContent =
        "You scored " + score + "/" + heartQuestions.length;

        answerButtons.forEach(button => {
            button.style.display = "none";
        });

        nextButton.style.display = "none";

    }

};


// Start quiz
loadQuestion();
