let currentQuestion = 0;
let score = 0;

let questions = [];


// Get topic from URL

const urlParams = new URLSearchParams(window.location.search);

const topic = urlParams.get("topic");



// Choose questions

if (topic === "heart") {

    questions = heartQuestions;

}


else if (topic === "electricity") {

    questions = electricityQuestions;

}


else {

    alert("Topic not found!");

}





const questionText = document.getElementById("question");

const answerButtons = document.querySelectorAll(".answer");

const feedback = document.getElementById("feedback");

const nextButton = document.getElementById("next");





function loadQuestion() {


    let question = questions[currentQuestion];


    questionText.textContent = question.question;


    feedback.textContent = "Choose an answer!";


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


    let question = questions[currentQuestion];



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



    if (currentQuestion < questions.length) {


        loadQuestion();


    }


    else {


        localStorage.setItem("quizScore", score);

        localStorage.setItem("quizTotal", questions.length);


        window.location.href = "results.html";


    }


};





loadQuestion();
