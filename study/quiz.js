let params = new URLSearchParams(window.location.search);

let topic = params.get("topic");


let questions;


if (topic === "electricity") {

    questions = electricityQuestions;

    document.getElementById("topic-title").textContent =
        "⚡ Electricity Quiz";

} else {

    questions = heartQuestions;

    document.getElementById("topic-title").textContent =
        "❤️ Heart Quiz";

}



let currentQuestion = 0;

let score = 0;

let answered = false;




const questionText =
document.getElementById("question");


const answerButtons =
document.querySelectorAll(".answer");


const feedback =
document.getElementById("feedback");


const nextButton =
document.getElementById("next");


const questionNumber =
document.getElementById("question-number");


const progressBar =
document.getElementById("progress-bar");






function loadQuestion() {


    answered = false;


    nextButton.style.display = "none";


    feedback.textContent =
    "Choose an answer!";



    let question =
    questions[currentQuestion];



    questionText.textContent =
    question.question;



    questionNumber.textContent =
    `Question ${currentQuestion + 1}/${questions.length}`;





    answerButtons.forEach((button, index) => {


        button.disabled = false;


        button.textContent =
        question.answers[index];



        button.onclick = () => {

            checkAnswer(index);

        };


    });



    progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;



}







function checkAnswer(selectedAnswer) {


    if(answered) return;


    answered = true;



    let question =
    questions[currentQuestion];



    answerButtons.forEach(button => {

        button.disabled = true;

    });





    if(selectedAnswer === question.correct){


        score++;


        feedback.textContent =
        "✅ Correct! +10 XP";


    }

    else {


        feedback.textContent =
        "❌ Wrong! Correct answer: "
        + question.answers[question.correct];


    }



    nextButton.style.display =
    "inline-block";


}









nextButton.onclick = () => {


    currentQuestion++;



    if(currentQuestion >= questions.length){



        let percentage =
        Math.round(
            (score / questions.length) * 100
        );



        let earnedXP =
        score * 10;



        // GET OLD DATA

        let oldXP =
        Number(localStorage.getItem("XP")) || 0;



        let oldQuizzes =
        Number(localStorage.getItem("quizzes")) || 0;



        let oldBest =
        Number(localStorage.getItem("bestScore")) || 0;





        // SAVE NEW DATA

        localStorage.setItem(
            "XP",
            oldXP + earnedXP
        );



        localStorage.setItem(
            "quizzes",
            oldQuizzes + 1
        );



        localStorage.setItem(
            "bestScore",
            Math.max(oldBest, percentage)
        );





        // RESULTS PAGE DATA

        localStorage.setItem(
            "quizScore",
            score
        );


        localStorage.setItem(
            "quizTotal",
            questions.length
        );


        localStorage.setItem(
            "quizPercentage",
            percentage
        );


        localStorage.setItem(
            "quizXP",
            earnedXP
        );



        window.location.href =
        "results.html";



    }

    else {


        loadQuestion();


    }



};






loadQuestion();
