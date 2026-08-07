// =============================
// StudySprint Quiz System
// =============================


// Get topic

const params = new URLSearchParams(window.location.search);

const topic = params.get("topic");



let questions = [];

let title = "";



// =============================
// Safe Question Loader
// =============================

function getQuestions(pack){

    return typeof pack !== "undefined" ? pack : [];

}



// =============================
// Question Database
// =============================

const questionPacks = {


heart:{
    questions:getQuestions(typeof heartQuestions !== "undefined" ? heartQuestions : undefined),
    title:"❤️ Heart Quiz"
},


electricity:{
    questions:getQuestions(typeof electricityQuestions !== "undefined" ? electricityQuestions : undefined),
    title:"⚡ Electricity Quiz"
},


cells:{
    questions:getQuestions(typeof cellsQuestions !== "undefined" ? cellsQuestions : undefined),
    title:"🧬 Cells Quiz"
},





algebra:{
    questions:getQuestions(typeof algebraQuestions !== "undefined" ? algebraQuestions : undefined),
    title:"📐 Algebra Quiz"
},


bidmas:{
    questions:getQuestions(typeof bidmasQuestions !== "undefined" ? bidmasQuestions : undefined),
    title:"🔢 BIDMAS Quiz"
},


geometry:{
    questions:getQuestions(typeof geometryQuestions !== "undefined" ? geometryQuestions : undefined),
    title:"📏 Geometry Quiz"
},





geography:{
    questions:getQuestions(typeof geographyQuestions !== "undefined" ? geographyQuestions : undefined),
    title:"🌍 Geography Quiz"
},


history:{
    questions:getQuestions(typeof historyQuestions !== "undefined" ? historyQuestions : undefined),
    title:"🏛️ History Quiz"
},


civics:{
    questions:getQuestions(typeof civicsQuestions !== "undefined" ? civicsQuestions : undefined),
    title:"⚖️ Civics Quiz"
},





englishGrammar:{
    questions:getQuestions(typeof englishGrammarQuestions !== "undefined" ? englishGrammarQuestions : undefined),
    title:"📝 English Grammar Quiz"
},


literature:{
    questions:getQuestions(typeof literatureQuestions !== "undefined" ? literatureQuestions : undefined),
    title:"📚 Literature Quiz"
},


poetry:{
    questions:getQuestions(typeof poetryQuestions !== "undefined" ? poetryQuestions : undefined),
    title:"📖 Poetry Quiz"
},





frenchConversation:{
    questions:getQuestions(typeof frenchConversationQuestions !== "undefined" ? frenchConversationQuestions : undefined),
    title:"💬 French Conversation Quiz"
},


frenchGrammar:{
    questions:getQuestions(typeof frenchGrammarQuestions !== "undefined" ? frenchGrammarQuestions : undefined),
    title:"🇫🇷 French Grammar Quiz"
},


frenchVocab:{
    questions:getQuestions(typeof frenchVocabQuestions !== "undefined" ? frenchVocabQuestions : undefined),
    title:"🔤 French Vocabulary Quiz"
},





japaneseHiragana:{
    questions:getQuestions(typeof japaneseHiraganaQuestions !== "undefined" ? japaneseHiraganaQuestions : undefined),
    title:"あ Hiragana Quiz"
},


japaneseGrammar:{
    questions:getQuestions(typeof japaneseGrammarQuestions !== "undefined" ? japaneseGrammarQuestions : undefined),
    title:"文 Japanese Grammar Quiz"
},


japaneseVocabulary:{
    questions:getQuestions(typeof japaneseVocabularyQuestions !== "undefined" ? japaneseVocabularyQuestions : undefined),
    title:"語 Japanese Vocabulary Quiz"
}


};






// =============================
// Load Topic
// =============================


if(questionPacks[topic]){


    questions = [...questionPacks[topic].questions];

    title = questionPacks[topic].title;


}


else{


    alert("Topic not found!");

    window.location.href="index.html";


}






// =============================
// Shuffle
// =============================


function shuffle(array){

    return array.sort(() => Math.random() - 0.5);

}





if(questions.length > 0){

    questions = shuffle(questions).slice(0,15);

}






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
// Load Question
// =============================


function loadQuestion(){


    if(questions.length === 0){

        questionText.textContent =
        "🚧 Questions coming soon!";

        return;

    }



    answered = false;


    next.style.display="none";


    feedback.textContent =
    "Choose an answer!";



    let q = questions[currentQuestion];



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




    localStorage.setItem(

        "XP",

        (Number(localStorage.getItem("XP")) || 0) + xp

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






loadQuestion();
