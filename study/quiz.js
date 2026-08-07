// =============================
// StudySprint Quiz System
// =============================


// Get topic from URL

const params = new URLSearchParams(window.location.search);

const topic = params.get("topic");



let questions = [];

let title = "";



// =============================
// Load Question Pack
// =============================

const questionPacks = {


heart: {
questions: heartQuestions,
title:"❤️ Heart Quiz"
},

electricity: {
questions: electricityQuestions,
title:"⚡ Electricity Quiz"
},

cells: {
questions: cellsQuestions,
title:"🧬 Cells Quiz"
},



algebra: {
questions: algebraQuestions,
title:"📐 Algebra Quiz"
},

BIDMAS: {
questions: BIDMASQuestions,
title:"🔢 BIDMAS Quiz"
},

geometry: {
questions: geometryQuestions,
title:"📏 Geometry Quiz"
},



geography: {
questions: geographyQuestions,
title:"🌍 Geography Quiz"
},

history: {
questions: historyQuestions,
title:"🏛️ History Quiz"
},

civics: {
questions: civicsQuestions,
title:"⚖️ Civics Quiz"
},



englishGrammar: {
questions: englishGrammarQuestions,
title:"📝 English Grammar Quiz"
},

literature: {
questions: literatureQuestions,
title:"📚 Literature Quiz"
},

poetry: {
questions: poetryQuestions,
title:"📖 Poetry Quiz"
},



frenchConversation: {
questions: frenchConversationQuestions,
title:"💬 French Conversation Quiz"
},

frenchGrammar: {
questions: frenchGrammarQuestions,
title:"🇫🇷 French Grammar Quiz"
},

frenchVocab: {
questions: frenchVocabQuestions,
title:"🔤 French Vocabulary Quiz"
},



japaneseHiragana: {
questions: japaneseHiraganaQuestions,
title:"あ Hiragana Quiz"
},

japaneseGrammar: {
questions: japaneseGrammarQuestions,
title:"文 Japanese Grammar Quiz"
},

japaneseVocabulary: {
questions: japaneseVocabularyQuestions,
title:"語 Japanese Vocabulary Quiz"
}


};





if(questionPacks[topic]){

questions = [...questionPacks[topic].questions];

title = questionPacks[topic].title;

}

else{

alert("No topic selected!");

window.location.href="index.html";

}






// =============================
// Shuffle
// =============================

function shuffle(array){

return array.sort(() => Math.random() - 0.5);

}





// Pick 15 random questions

questions = shuffle(questions).slice(0,15);







// =============================
// Setup
// =============================

document.getElementById("topic-title").textContent = title;



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








// =============================
// Shuffle Answers
// =============================


function shuffleAnswers(question){


let answers = question.answers.map((answer,index)=>{


return {

text:answer,

correct:index === question.correct

};


});



answers = shuffle(answers);



question.answers =
answers.map(answer=>answer.text);



question.correct =
answers.findIndex(answer=>answer.correct);


}









// =============================
// Load Question
// =============================


function loadQuestion(){


answered = false;


next.style.display="none";


feedback.textContent="Choose an answer!";



let q = questions[currentQuestion];



shuffleAnswers(q);



questionText.textContent =
q.question;



document.getElementById("question-number").textContent =

`Question ${currentQuestion + 1}/${questions.length}`;





buttons.forEach((button,index)=>{


button.disabled=false;


button.textContent =
q.answers[index];



button.onclick = ()=>{

checkAnswer(index);

};


});


}









// =============================
// Check Answer
// =============================


function checkAnswer(answer){


if(answered)

return;



answered=true;



let q =
questions[currentQuestion];



buttons.forEach(button=>{

button.disabled=true;

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



next.style.display="inline-block";


}









// =============================
// Next Question
// =============================


next.onclick = ()=>{


currentQuestion++;



if(currentQuestion >= questions.length){


finishQuiz();


}


else{


loadQuestion();


}


};









// =============================
// Finish Quiz
// =============================


function finishQuiz(){


const percentage = Math.round(

(score / questions.length) * 100

);



const xp = score * 5;





let oldXP =
Number(localStorage.getItem("XP")) || 0;



localStorage.setItem(

"XP",

oldXP + xp

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





localStorage.setItem("quizScore",score);

localStorage.setItem("quizTotal",questions.length);

localStorage.setItem("quizPercentage",percentage);

localStorage.setItem("quizXP",xp);





if(typeof checkAchievements === "function"){

checkAchievements(

score,

questions.length,

topic

);

}





window.location.href="results.html";


}







loadQuestion();
