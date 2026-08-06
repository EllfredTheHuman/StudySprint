// =============================
// StudySprint Study Quiz System
// =============================


// Get topic from URL

let params =
new URLSearchParams(window.location.search);


let topic =
params.get("topic");



let questions = [];

let title = "";




// Load question pack

if(topic === "heart"){

    questions = [...heartQuestions];
    title = "❤️ Heart Quiz";

}


else if(topic === "electricity"){

    questions = [...electricityQuestions];
    title = "⚡ Electricity Quiz";

}


else if(topic === "algebra"){

    questions = [...algebraQuestions];
    title = "➗ Algebra Quiz";

}


else if(topic === "geometry"){

    questions = [...geometryQuestions];
    title = "📐 Geometry Quiz";

}


else if(topic === "statistics"){

    questions = [...statisticsQuestions];
    title = "📊 Statistics Quiz";

}


else if(topic === "poetry"){

    questions = [...poetryQuestions];
    title = "📖 Poetry Quiz";

}


else if(topic === "grammar"){

    questions = [...grammarQuestions];
    title = "🔤 Grammar Quiz";

}


else if(topic === "geography"){

    questions = [...geographyQuestions];
    title = "🌍 Geography Quiz";

}


else if(topic === "history"){

    questions = [...historyQuestions];
    title = "🏛️ History Quiz";

}


else if(topic === "french"){

    questions = [...frenchQuestions];
    title = "🇫🇷 French Quiz";

}


else if(topic === "japanese"){

    questions = [...japaneseQuestions];
    title = "🇯🇵 Japanese Quiz";

}


else{

    alert("Topic not found!");

    window.location.href = "index.html";

}





// Randomise questions
function shuffle(array){

    return array.sort(
        () => Math.random() - 0.5
    );

}





// Study mode = 15 random questions

questions = shuffle(questions).slice(0,15);






document.getElementById("topic-title").textContent =
title;








// Quiz variables

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








// Shuffle answers

function shuffleAnswers(question){


    let answers =
    question.answers.map((answer,index)=>{


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








function loadQuestion(){


    answered = false;


    next.style.display = "none";


    feedback.textContent =
    "Choose an answer!";



    let q =
    questions[currentQuestion];



    shuffleAnswers(q);



    questionText.textContent =
    q.question;



    document.getElementById("question-number").textContent =

    `Question ${currentQuestion + 1}/${questions.length}`;





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



    buttons.forEach(button => {

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


        finishQuiz();


    }


    else{


        loadQuestion();


    }


};









function finishQuiz(){


    let percentage =

    Math.round(
        score / questions.length * 100
    );



    let xp =

    score * 5;






    localStorage.setItem(

        "XP",

        (Number(localStorage.getItem("XP")) || 0) + xp

    );





    localStorage.setItem(

        "quizzes",

        (Number(localStorage.getItem("quizzes")) || 0) + 1

    );





    localStorage.setItem(

        "bestScore",

        Math.max(

            Number(localStorage.getItem("bestScore")) || 0,

            percentage

        )

    );






    localStorage.setItem("quizScore", score);

    localStorage.setItem("quizTotal", questions.length);

    localStorage.setItem("quizPercentage", percentage);

    localStorage.setItem("quizXP", xp);






    checkAchievements(
        score,
        questions.length,
        topic
    );






    window.location.href =
    "results.html";


}







loadQuestion();
