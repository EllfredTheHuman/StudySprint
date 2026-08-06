// =============================
// StudySprint Daily Sprint
// =============================


let allQuestions = [

    ...heartQuestions,
    ...electricityQuestions

];



// Shuffle questions

function shuffle(array){

    return array.sort(() => Math.random() - 0.5);

}




// Daily check

let today =
new Date().toDateString();


let lastSprint =
localStorage.getItem("lastSprint");



if(lastSprint === today){

    document.getElementById("status").textContent =
    "✅ You already completed today's Sprint! Come back tomorrow.";

}





let questions =
shuffle(allQuestions).slice(0,5);



let currentQuestion = 0;

let score = 0;

let answered = false;




const questionText =
document.getElementById("question");


const questionNumber =
document.getElementById("question-number");


const buttons =
document.querySelectorAll(".answer");


const feedback =
document.getElementById("feedback");


const next =
document.getElementById("next");







function loadQuestion(){


    answered = false;


    next.style.display = "none";


    feedback.textContent =
    "Choose an answer!";



    let q =
    questions[currentQuestion];



    questionText.textContent =
    q.question;



    questionNumber.textContent =
    `Question ${currentQuestion + 1}/5`;





    buttons.forEach((button,index)=>{


        button.disabled = false;


        button.textContent =
        q.answers[index];



        button.onclick = () => {

            checkAnswer(index);

        };


    });


}







function checkAnswer(answer){


    if(answered)
    return;



    answered = true;



    let q =
    questions[currentQuestion];



    buttons.forEach(button=>{

        button.disabled = true;

    });





    if(answer === q.correct){


        score++;


        feedback.textContent =
        "✅ Correct!";


    }

    else{


        feedback.textContent =
        "❌ Correct answer: "
        + q.answers[q.correct];


    }



    next.style.display =
    "inline-block";


}







next.onclick = () => {


    currentQuestion++;



    if(currentQuestion >= 5){



        finishSprint();


    }

    else{


        loadQuestion();


    }


};









function finishSprint(){


    let xp = score * 10;



    // Completion bonus

    xp += 25;



    // Perfect bonus

    if(score === 5){

        xp += 50;

    }




    let oldXP =
    Number(localStorage.getItem("XP")) || 0;



    localStorage.setItem(
        "XP",
        oldXP + xp
    );





    localStorage.setItem(
        "lastSprint",
        today
    );




    alert(
        "🏃 Sprint Complete!\n\n" +
        "Score: " +
        score +
        "/5\n\n" +
        "⭐ +" +
        xp +
        " XP"
    );



    window.location.href =
    "../profile/index.html";


}






// Start

loadQuestion();
