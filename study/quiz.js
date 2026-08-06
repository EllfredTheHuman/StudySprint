let params =
new URLSearchParams(window.location.search);


let topic =
params.get("topic");


let questions;


if(topic === "electricity"){

    questions = electricityQuestions;

    document.getElementById("topic-title").textContent =
    "⚡ Electricity Quiz";

}

else{

    questions = heartQuestions;

    document.getElementById("topic-title").textContent =
    "❤️ Heart Quiz";

}



let currentQuestion = 0;

let score = 0;

let answered = false;



const questionText =
document.getElementById("question");


const buttons =
document.querySelectorAll(".answer");


const feedback =
document.getElementById("feedback");


const next =
document.getElementById("next");




function loadQuestion(){


    answered=false;

    next.style.display="none";


    let q =
    questions[currentQuestion];


    questionText.textContent =
    q.question;



    document.getElementById("question-number").textContent =
    `Question ${currentQuestion+1}/${questions.length}`;



    buttons.forEach((button,index)=>{


        button.disabled=false;


        button.textContent =
        q.answers[index];


        button.onclick=()=>{

            checkAnswer(index);

        };


    });


}




function checkAnswer(answer){


    if(answered)
    return;


    answered=true;


    let q =
    questions[currentQuestion];


    buttons.forEach(b=>b.disabled=true);



    if(answer === q.correct){

        score++;

        feedback.textContent =
        "✅ Correct!";

    }

    else{

        feedback.textContent =
        "❌ Correct answer: " +
        q.answers[q.correct];

    }


    next.style.display="inline-block";


}





next.onclick=()=>{


    currentQuestion++;



    if(currentQuestion >= questions.length){


        let percentage =
        Math.round(
            score/questions.length*100
        );


        let xp =
        score*10;



        localStorage.setItem(
            "XP",
            (Number(localStorage.getItem("XP"))||0)+xp
        );



        localStorage.setItem(
            "quizzes",
            (Number(localStorage.getItem("quizzes"))||0)+1
        );



        localStorage.setItem(
            "bestScore",
            Math.max(
                Number(localStorage.getItem("bestScore"))||0,
                percentage
            )
        );



        checkAchievements(
            score,
            questions.length,
            topic
        );



        localStorage.setItem("quizScore",score);
        localStorage.setItem("quizTotal",questions.length);
        localStorage.setItem("quizPercentage",percentage);
        localStorage.setItem("quizXP",xp);



        window.location.href="results.html";


    }

    else{

        loadQuestion();

    }


};



loadQuestion();
