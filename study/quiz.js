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

let locked = false;



const question =
document.getElementById("question");


const buttons =
document.querySelectorAll(".answer");


const feedback =
document.getElementById("feedback");


const next =
document.getElementById("next");


const number =
document.getElementById("question-number");


const bar =
document.getElementById("progress-bar");





function loadQuestion() {


    locked = false;


    next.style.display = "none";


    feedback.textContent =
    "Choose an answer!";



    let q = questions[currentQuestion];


    question.textContent =
    q.question;



    number.textContent =
    `Question ${currentQuestion + 1}/${questions.length}`;



    buttons.forEach((button, index) => {


        button.disabled = false;


        button.textContent =
        q.answers[index];


        button.onclick = function(){

            checkAnswer(index);

        };


    });



    bar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

}





function checkAnswer(selected) {


    if (locked) return;


    locked = true;


    let q = questions[currentQuestion];



    buttons.forEach(button => {

        button.disabled = true;

    });



    if (selected === q.correct) {


        score++;


        feedback.textContent =
        "✅ Correct! +10 XP";


    } else {


        feedback.textContent =
        "❌ Wrong! Correct answer: " 
        + q.answers[q.correct];


    }



    next.style.display =
    "inline-block";


}





next.onclick = function(){


    currentQuestion++;



    if(currentQuestion >= questions.length){



        let percentage =
        Math.round((score / questions.length) * 100);



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
            score * 10
        );



        window.location.href =
        "results.html";



    } else {


        loadQuestion();


    }


};





loadQuestion();
