let params =
new URLSearchParams(window.location.search);


let topic =
params.get("topic");


let allQuestions;


if(topic === "electricity"){

    allQuestions = electricityQuestions;

    document.getElementById("topic-title").textContent =
    "⚡ Electricity Quiz";

}

else{

    allQuestions = heartQuestions;

    document.getElementById("topic-title").textContent =
    "❤️ Heart Quiz";

}



// Shuffle function

function shuffle(array){

    return array.sort(() => Math.random() - 0.5);

}




// Pick random 15 questions

let questions =
shuffle([...allQuestions]).slice(0,15);




// Randomise answers

function shuffleAnswers(question){


    let answerList =
    question.answers.map((answer,index)=>{

        return {

            text: answer,

            correct: index === question.correct

        };

    });



    answerList =
    shuffle(answerList);



    question.answers =
    answerList.map(answer => answer.text);



    question.correct =
    answerList.findIndex(answer => answer.correct);


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



    if(currentQuestion >= questions.length){



        let percentage =
        Math.round(
            score / questions.length * 100
        );



        let xp =
        score * 10;



        let oldXP =
        Number(localStorage.getItem("XP")) || 0;


        let oldQuizzes =
        Number(localStorage.getItem("quizzes")) || 0;


        let oldBest =
        Number(localStorage.getItem("bestScore")) || 0;




        localStorage.setItem(
            "XP",
            oldXP + xp
        );



        localStorage.setItem(
            "quizzes",
            oldQuizzes + 1
        );



        localStorage.setItem(
            "bestScore",
            Math.max(oldBest, percentage)
        );





        checkAchievements(
            score,
            questions.length,
            topic
        );






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
            xp
        );



        window.location.href =
        "results.html";


    }

    else{


        loadQuestion();


    }


};






loadQuestion();
