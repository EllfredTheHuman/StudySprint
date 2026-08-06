// =============================
// StudySprint Daily Sprint
// =============================


let allQuestions = [

    ...heartQuestions,
    ...electricityQuestions

];





function shuffle(array){

    return array.sort(() => Math.random() - 0.5);

}





function shuffleAnswers(question){


    let answers =
    question.answers.map((answer,index)=>{

        return {

            text: answer,

            correct: index === question.correct

        };

    });



    answers =
    shuffle(answers);



    question.answers =
    answers.map(answer => answer.text);



    question.correct =
    answers.findIndex(answer => answer.correct);


}






let today =
new Date().toDateString();



let lastSprint =
localStorage.getItem("lastSprint");



if(lastSprint === today){


    document.getElementById("status").textContent =
    "✅ You already completed today's Sprint! Come back tomorrow.";

}






let questions =
shuffle([...allQuestions]).slice(0,5);



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


    answered = false;


    next.style.display =
    "none";


    feedback.textContent =
    "Choose an answer!";



    let q =
    questions[currentQuestion];



    shuffleAnswers(q);



    questionText.textContent =
    q.question;



    document.getElementById("question-number").textContent =
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


    // XP SYSTEM

    let xp =
    score * 5;



    // Completion bonus

    xp += 15;



    // Perfect sprint bonus

    if(score === 5){

        xp += 25;

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





    localStorage.setItem(
        "sprintScore",
        score
    );



    localStorage.setItem(
        "sprintXP",
        xp
    );





    window.location.href =
    "results.html";


}






loadQuestion();
