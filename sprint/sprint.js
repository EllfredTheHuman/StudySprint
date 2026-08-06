// =============================
// StudySprint Daily Sprint
// =============================


// Get all questions

let allQuestions = [

    ...heartQuestions,
    ...electricityQuestions

];




// Shuffle function

function shuffle(array){

    return array.sort(() => Math.random() - 0.5);

}




// Shuffle answer positions

function shuffleAnswers(question){


    let answers = question.answers.map((answer,index)=>{


        return {

            text: answer,

            correct: index === question.correct

        };


    });



    answers = shuffle(answers);



    question.answers =
    answers.map(answer => answer.text);



    question.correct =
    answers.findIndex(answer => answer.correct);


}






// Daily check

let today =
new Date().toDateString();



let lastSprint =
localStorage.getItem("lastSprint");





if(lastSprint === today){


    document.body.innerHTML = `

    <header>

        <div class="logo">
            🚀 StudySprint
        </div>

    </header>


    <main>

        <section class="hero">


            <h1>
                🏃 Daily Sprint Complete!
            </h1>


            <p>
                You have already completed today's Sprint.
                <br><br>
                Come back tomorrow for a new challenge!
            </p>


            <a href="../index.html" class="main-button">
                🏠 Home
            </a>


        </section>


    </main>


    `;


    throw new Error("Sprint already completed");


}








// Pick 5 random questions

let questions =
shuffle([...allQuestions]).slice(0,5);




let currentQuestion = 0;

let score = 0;

let answered = false;








// Elements

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



    let question =
    questions[currentQuestion];



    shuffleAnswers(question);





    questionText.textContent =
    question.question;




    document.getElementById("question-number").textContent =

    `Question ${currentQuestion + 1}/5`;







    buttons.forEach((button,index)=>{


        button.disabled = false;


        button.textContent =
        question.answers[index];



        button.onclick = () => {

            checkAnswer(index);

        };


    });



}









function checkAnswer(answer){


    if(answered)
    return;



    answered = true;



    let question =
    questions[currentQuestion];



    buttons.forEach(button=>{

        button.disabled = true;

    });






    if(answer === question.correct){


        score++;


        feedback.textContent =
        "✅ Correct!";


    }

    else{


        feedback.textContent =

        "❌ Correct answer: " +

        question.answers[question.correct];


    }




    next.style.display =
    "inline-block";


}









next.onclick = () => {


    currentQuestion++;



    if(currentQuestion >= questions.length){


        finishSprint();


    }

    else{


        loadQuestion();


    }


};









function finishSprint(){



    // XP

    let xp =
    score * 5;



    // Completion reward

    xp += 15;



    // Perfect reward

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
