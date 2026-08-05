// ===============================
// StudySprint Achievement System
// ===============================


// All achievements

const achievements = {

    firstQuiz: {
        name: "⭐ First Steps",
        description: "Complete your first quiz."
    },


    perfectScore: {
        name: "💯 Perfect Score",
        description: "Get 100% on any quiz."
    },


    quiz10: {
        name: "📚 Getting Started",
        description: "Complete 10 quizzes."
    },


    quiz50: {
        name: "🎓 Dedicated Learner",
        description: "Complete 50 quizzes."
    },


    xp100: {
        name: "⭐ XP Collector",
        description: "Earn 100 XP."
    },


    xp500: {
        name: "🌟 XP Expert",
        description: "Earn 500 XP."
    },


    heartComplete: {
        name: "❤️ Heart Expert",
        description: "Complete the Heart topic."
    },


    electricityComplete: {
        name: "⚡ Electricity Expert",
        description: "Complete the Electricity topic."
    }

};




// Get unlocked achievements

function getUnlockedAchievements(){

    return JSON.parse(
        localStorage.getItem("achievements")
    ) || [];

}




// Save achievements

function saveAchievements(list){

    localStorage.setItem(
        "achievements",
        JSON.stringify(list)
    );

}




// Unlock achievement

function unlockAchievement(id){


    let unlocked =
    getUnlockedAchievements();



    if(!unlocked.includes(id)){


        unlocked.push(id);


        saveAchievements(unlocked);


        return true;


    }


    return false;


}






// Check achievements after quiz

function checkAchievements(score, total, topic){



    let percentage =
    Math.round(
        (score / total) * 100
    );



    let xp =
    Number(localStorage.getItem("XP")) || 0;



    let quizzes =
    Number(localStorage.getItem("quizzes")) || 0;




    // First quiz

    if(quizzes >= 1){

        unlockAchievement("firstQuiz");

    }



    // Perfect score

    if(percentage === 100){

        unlockAchievement("perfectScore");

    }



    // Quiz milestones

    if(quizzes >= 10){

        unlockAchievement("quiz10");

    }



    if(quizzes >= 50){

        unlockAchievement("quiz50");

    }




    // XP milestones

    if(xp >= 100){

        unlockAchievement("xp100");

    }


    if(xp >= 500){

        unlockAchievement("xp500");

    }




    // Topic achievements

    if(topic === "heart"){

        unlockAchievement("heartComplete");

    }



    if(topic === "electricity"){

        unlockAchievement("electricityComplete");

    }


}
