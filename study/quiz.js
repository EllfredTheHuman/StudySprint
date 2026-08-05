let questions = [];

let currentQuestion = 0;

let score = 0;

let xpEarned = 0;



// Get topic from URL

const params = new URLSearchParams(window.location.search);

const topic = params.get("topic");




// Load correct questions

if(topic === "heart") {

    questions = heartQuestions;

    document.getElementById("topic-title").textContent =
    "❤️ Heart Quiz";

}


else if(topic === "electricity") {

    questions = electricityQuestions;

    document.getElementById("topic-title").textContent =
    "⚡ Electricity Quiz";

}





const questionElement =
document.getElementById("question");


const questionNumber =
document.getElementById("question-number");


const feedback =
document.getElementById("feedback");


const nextButton =
document.getElementById("next");


const answers =
document.querySelectorAll(".answer");





function loadQuestion(){


    let question =
    questions[currentQuestion];


    questionElement.textContent =
    question.question;



    questionNumber.textContent =
    `Question ${currentQuestion + 1}/${questions.length}`;




    feedback.textContent =
    "Choose an answer!";



    nextButton.style.display =
    "none";





    answers.forEach((button,index)=>{


        button.textContent =
        question.answers[index];


        button.style.background =
        "#6c5ce7";



        button.disabled =
        false;



        button.onclick = ()=>{

            checkAnswer(index);

        };


    });



    updateProgress();


}







function checkAnswer(selected){


    let question =
    questions[currentQuestion];



    answers.forEach(button=>{

        button.disabled = true;

    });




    if(selected === question.correct){


        score++;

        xpEarned += 10;


        feedback.textContent =
        "✅ Correct! +10 XP";



        answers[selected].style.background =
        "#00b894";


    }


    else {


        feedback.textContent =
        "❌ Wrong! " + 
        "Correct answer: " +
        question.answers[question.correct];



        answers[selected].style.background =
        "#d63031";


        answers[question.correct].style.background =
        "#00b894";


    }



    nextButton.style.display =
    "inline-flex";



}







nextButton.onclick = ()=>{


    currentQuestion++;



    if(currentQuestion < questions.length){


        loadQuestion();


    }


    else {


        finishQuiz();


    }


};








function finishQuiz(){


    let percentage =
    Math.round(
        (score / questions.length) * 100
    );




    // Save results

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
        xpEarned
    );






    // Profile data


    let totalXP =
    Number(localStorage.getItem("XP")) || 0;


    localStorage.setItem(
        "XP",
        totalXP + xpEarned
    );





    let quizzes =
    Number(localStorage.getItem("quizzes")) || 0;


    localStorage.setItem(
        "quizzes",
        quizzes + 1
    );





    let bestScore =
    Number(localStorage.getItem("bestScore")) || 0;



    if(percentage > bestScore){


        localStorage.setItem(
            "bestScore",
            percentage
        );


    }





    window.location.href =
    "results.html";


}







function updateProgress(){


    let progress =
    ((currentQuestion) / questions.length) * 100;



    let bar =
    document.getElementById("progress-bar");



    if(bar){

        bar.style.width =
        progress + "%";

    }


}







loadQuestion();
