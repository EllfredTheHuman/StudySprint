let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next");


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
        "❌ Incorrect! The correct answer is " 
        + question.correct 
        + ". " 
        + question.explanation;

    }


    nextButton.style.display = "block";

}



nextButton.onclick = function() {

    currentQuestion++;


    if (currentQuestion < heartQuestions.length) {

        loadQuestion();

    }

    else {

        // Save results
        localStorage.setItem("quizScore", score);
        localStorage.setItem("quizTotal", heartQuestions.length);


        // Go to results page
        window.location.href = "results.html";

    }

};



loadQuestion();
