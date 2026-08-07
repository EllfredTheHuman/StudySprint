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

    return pack || [];

}



// =============================
// Question Database
// =============================

const questionPacks = {

heart:{
    questions:getQuestions(typeof heartQuestions !== "undefined" ? heartQuestions : null),
    title:"❤️ Heart Quiz"
},

electricity:{
    questions:getQuestions(typeof electricityQuestions !== "undefined" ? electricityQuestions : null),
    title:"⚡ Electricity Quiz"
},

cells:{
    questions:getQuestions(typeof cellsQuestions !== "undefined" ? cellsQuestions : null),
    title:"🧬 Cells Quiz"
},


algebra:{
    questions:getQuestions(typeof algebraQuestions !== "undefined" ? algebraQuestions : null),
    title:"📐 Algebra Quiz"
},

bidmas:{
    questions:getQuestions(typeof BIDMASQuestions !== "undefined" ? BIDMASQuestions : null),
    title:"🔢 BIDMAS Quiz"
},

geometry:{
    questions:getQuestions(typeof geometryQuestions !== "undefined" ? geometryQuestions : null),
    title:"📏 Geometry Quiz"
},


geography:{
    questions:getQuestions(typeof geographyQuestions !== "undefined" ? geographyQuestions : null),
    title:"🌍 Geography Quiz"
},

history:{
    questions:getQuestions(typeof historyQuestions !== "undefined" ? historyQuestions : null),
    title:"🏛️ History Quiz"
},

civics:{
    questions:getQuestions(typeof civicsQuestions !== "undefined" ? civicsQuestions : null),
    title:"⚖️ Civics Quiz"
},


englishGrammar:{
    questions:getQuestions(typeof englishGrammarQuestions !== "undefined" ? englishGrammarQuestions : null),
    title:"📝 English Grammar Quiz"
},

literature:{
    questions:getQuestions(typeof literatureQuestions !== "undefined" ? literatureQuestions : null),
    title:"📚 Literature Quiz"
},

poetry:{
    questions:getQuestions(typeof poetryQuestions !== "undefined" ? poetryQuestions : null),
    title:"📖 Poetry Quiz"
},


frenchConversation:{
    questions:getQuestions(typeof frenchConversationQuestions !== "undefined" ? frenchConversationQuestions : null),
    title:"💬 French Conversation Quiz"
},

frenchGrammar:{
    questions:getQuestions(typeof frenchGrammarQuestions !== "undefined" ? frenchGrammarQuestions : null),
    title:"🇫🇷 French Grammar Quiz"
},

frenchVocab:{
    questions:getQuestions(typeof frenchVocabQuestions !== "undefined" ? frenchVocabQuestions : null),
    title:"🔤 French Vocabulary Quiz"
},


japaneseHiragana:{
    questions:getQuestions(typeof japaneseHiraganaQuestions !== "undefined" ? japaneseHiraganaQuestions : null),
    title:"あ Hiragana Quiz"
},

japaneseGrammar:{
    questions:getQuestions(typeof japaneseGrammarQuestions !== "undefined" ? japaneseGrammarQuestions : null),
    title:"文 Japanese Grammar Quiz"
},

japaneseVocabulary:{
    questions:getQuestions(typeof japaneseVocabularyQuestions !== "undefined" ? japaneseVocabularyQuestions : null),
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
        "❌ Correct answer: " + q.answers[q.correct];


    }



    next.style.display =
    "inline-block";


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
