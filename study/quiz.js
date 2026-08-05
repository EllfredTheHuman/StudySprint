let currentQuestion = 0;

let score = 0;

let questions = [];

let quizQuestions = [];

const quizLength = 10;



// Get topic

const urlParams = new URLSearchParams(window.location.search);

const topic = urlParams.get("topic");





// Pick topic questions

if (topic === "heart") {

    questions = heartQuestions;

    document.getElementById("topic-title").textContent =
    "❤️ Heart Quiz";

}


else if (topic === "electricity") {

    questions = electricityQuestions;

    document.getElementById("topic-title").textContent =
    "⚡ Electricity Quiz";

}


else {

    alert("Topic not found!");

}





// Pick random questions

quizQuestions = [...questions]
.sort(() => Math.random() - 0.5)
.slice(0, quizLength);






const questionText = document.getElementById("question");

const questionNumber = document.getElementById("question-number");

const answerButtons = document.querySelectorAll(".answer");

const feedback = document.getElementById("feedback");

const nextButton = document.getElementById("next");







function loadQuestion() {


    let question = quizQuestions[currentQuestion];


    questionNumber.textContent =
    "Question " 
    + (currentQuestion + 1)
    + "/"
    + quizLength;



    questionText.textContent =
    question.question;



    feedback.textContent =
    "Choose an answer!";



    nextButton.style.display =
    "none";



    answerButtons.forEach((button, index) => {


        button.textContent =
        question.answers[index];


        button.disabled =
        false;



        button.onclick = function() {

            checkAnswer(button.textContent);

        };


    });


}









function checkAnswer(answer) {


    let question =
    quizQuestions[currentQuestion];



    answerButtons.forEach(button => {

        button.disabled = true;

    });





    if (answer === question.correct) {


        score++;


        feedback.textContent =
        "✅ Correct! "
        + question.explanation;


    }


    else {


        feedback.textContent =
        "❌ Incorrect! The correct answer is "
        + question.correct
        + ". "
        + question.explanation;


    }



    nextButton.style.display =
    "block";


}









nextButton.onclick = function() {


    currentQuestion++;



    if (currentQuestion < quizLength) {


        loadQuestion();


    }


    else {


        localStorage.setItem(
            "quizScore",
            score
        );


        localStorage.setItem(
            "quizTotal",
            quizLength
        );


        window.location.href =
        "results.html";


    }


};






loadQuestion();
