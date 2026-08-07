// =============================
// StudySprint Sprint Quiz
// =============================


// Get URL data

const params = new URLSearchParams(window.location.search);


const subject =
params.get("subject");


const topic =
params.get("topic");





let questions = [];

let title = "";




// =============================
// Load Topic Questions
// =============================


if(topic === "heart"){

    questions = [...heartQuestions];

    title = "❤️ Heart Sprint";

}


else if(topic === "electricity"){

    questions = [...electricityQuestions];

    title = "⚡ Electricity Sprint";

}


else if(topic === "algebra"){

    questions = [...algebraQuestions];

    title = "➗ Algebra Sprint";

}


else if(topic === "geometry"){

    questions = [...geometryQuestions];

    title = "📐 Geometry Sprint";

}


else if(topic === "statistics"){

    questions = [...statisticsQuestions];

    title = "📊 Statistics Sprint";

}


else if(topic === "poetry"){

    questions = [...poetryQuestions];

    title = "📖 Poetry Sprint";

}


else if(topic === "grammar"){

    questions = [...grammarQuestions];

    title = "🔤 Grammar Sprint";

}


else if(topic === "geography"){

    questions = [...geographyQuestions];

    title = "🌍 Geography Sprint";

}


else if(topic === "history"){

    questions = [...historyQuestions];

    title = "🏛️ History Sprint";

}


else if(topic === "french"){

    questions = [...frenchQuestions];

    title = "🇫🇷 French Sprint";

}


else if(topic === "japanese"){

    questions = [...japaneseQuestions];

    title = "🇯🇵 Japanese Sprint";

}


else{

    alert("Topic not found!");

    window.location.href =
    "index.html";

}






// =============================
// Subject Daily Lock
// =============================


const today =
new Date().toDateString();



const lockName =
"last" +
subject.charAt(0).toUpperCase() +
subject.slice(1) +
"Sprint";




if(localStorage.getItem(lockName) === today){


    document.body.innerHTML = `

    <header>

    <div class="logo">
    🚀 StudySprint
    </div>

    </header>


    <main>

    <section class="hero">

    <h1>
    ✅ Sprint Complete!
    </h1>


    <p>
    You have already completed today's
    ${subject} Sprint.
    <br><br>
    Come back tomorrow!
    </p>


    <a href="index.html" class="main-button">
    🏠 Home
    </a>


    </section>


    </main>

    `;


    throw new Error("Sprint already completed");

}







// =============================
// Pick 5 Questions
// =============================


function shuffle(array){

    return array.sort(
        () => Math.random() - 0.5
    );

}



questions =
shuffle(questions).slice(0,5);







// =============================
// Shuffle Answers
// =============================


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
    answers.map(
        answer => answer.text
    );



    question.correct =
    answers.findIndex(
        answer => answer.correct
    );


}







// =============================
// Quiz Setup
// =============================


document.getElementById("topic-title").textContent =
title;



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

        "❌ Correct answer: " +

        q.answers[q.correct];


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


    let xp =
    score * 5;



    xp += 15;



    if(score === 5){

        xp += 25;

    }






    let oldXP =
    Number(localStorage.getItem("XP")) || 0;



    localStorage.setItem(

        "XP",

        oldXP + xp

    );





    // Lock subject until tomorrow

    localStorage.setItem(

        lockName,

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
