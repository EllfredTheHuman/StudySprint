let currentTopic = new URLSearchParams(window.location.search).get("topic");


let questions;


if(currentTopic === "electricity"){

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


const answers =
document.querySelectorAll(".answer");


const feedback =
document.getElementById("feedback");


const nextButton =
document.getElementById("next");


const questionNumber =
document.getElementById("question-number");


const progress =
document.getElementById("progress-bar");








function loadQuestion(){


answered = false;


let q = questions[currentQuestion];


questionText.textContent = q.question;


questionNumber.textContent =
`Question ${currentQuestion + 1}/${questions.length}`;



answers.forEach((button,index)=>{


button.disabled = false;

button.textContent =
q.answers[index];



button.onclick = () => checkAnswer(index);



});



feedback.textContent =
"Choose an answer!";


nextButton.style.display="none";



progress.style.width =
`${(currentQuestion/questions.length)*100}%`;



}







function checkAnswer(index){


if(answered) return;


answered=true;


let q = questions[currentQuestion];



answers.forEach(button=>{

button.disabled=true;

});



if(index === q.correct){


score++;


feedback.textContent =
"✅ Correct! +10 XP";


}

else{


feedback.textContent =
"❌ Wrong! Correct answer: " +
q.answers[q.correct];


}



nextButton.style.display="inline-block";



}








nextButton.onclick = () => {


currentQuestion++;



if(currentQuestion >= questions.length){


let percentage =
Math.round((score/questions.length)*100);



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


}

else{


loadQuestion();


}


};







loadQuestion();
