// =============================
// StudySprint Quiz System
// =============================


// Get topic

const params = new URLSearchParams(window.location.search);

const topic = params.get("topic");



let questions = [];

let title = "";



// =============================
// Question Database
// =============================

const questionPacks = {

    heart: {
        questions: heartQuestions,
        title: "❤️ Heart Quiz"
    },

    electricity: {
        questions: electricityQuestions,
        title: "⚡ Electricity Quiz"
    },

    cells: {
        questions: cellsQuestions,
        title: "🧬 Cells Quiz"
    },


    algebra: {
        questions: algebraQuestions,
        title: "📐 Algebra Quiz"
    },

    BIDMAS: {
        questions: BIDMASQuestions,
        title: "🔢 BIDMAS Quiz"
    },

    geometry: {
        questions: geometryQuestions,
        title: "📏 Geometry Quiz"
    },


    geography: {
        questions: geographyQuestions,
        title: "🌍 Geography Quiz"
    },

    history: {
        questions: historyQuestions,
        title: "🏛️ History Quiz"
    },

    civics: {
        questions: civicsQuestions,
        title: "⚖️ Civics Quiz"
    },


    englishGrammar: {
        questions: englishGrammarQuestions,
        title: "📝 English Grammar Quiz"
    },

    literature: {
        questions: literatureQuestions,
        title: "📚 Literature Quiz"
    },

    poetry: {
        questions: poetryQuestions,
        title: "📖 Poetry Quiz"
    },


    frenchConversation: {
        questions: frenchConversationQuestions,
        title: "💬 French Conversation Quiz"
    },

    frenchGrammar: {
        questions: frenchGrammarQuestions,
        title: "🇫🇷 French Grammar Quiz"
    },

    frenchVocab: {
        questions: frenchVocabQuestions,
        title: "🔤 French Vocabulary Quiz"
    },


    japaneseHiragana: {
        questions: japaneseHiraganaQuestions,
        title: "あ Hiragana Quiz"
    },

    japaneseGrammar: {
        questions: japaneseGrammarQuestions,
        title: "文 Japanese Grammar Quiz"
    },

    japaneseVocabulary: {
        questions: japaneseVocabularyQuestions,
        title: "語 Japanese Vocabulary Quiz"
    }

};





// Load selected topic

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

function shuffleAnswers(q){

    let answers = q.answers.map((answer,index)=>{

        return {
            text: answer,
            correct: index === q.correct
        };

    });


    answers = shuffle(answers);


    q.answers = answers.map(a=>a.text);


    q.correct =
    answers.findIndex(a=>a.correct);

}







// =============================
// Load Question
// =============================

function loadQuestion(){


    if(!questions[currentQuestion]){

        finishQuiz();

        return;

    }



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

        feedback.textContent="✅ Correct!";

    }

    else{

        feedback.textContent =
        "❌ Correct answer: " +
        q.answers[q.correct];

    }



    next.style.display="inline-block";


}









// =============================
// Next
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
// Finish
// =============================

function finishQuiz(){


    let percentage =
    Math.round(
        (score / questions.length) * 100
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



    window.location.href="results.html";


}







loadQuestion();
