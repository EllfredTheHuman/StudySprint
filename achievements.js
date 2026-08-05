const achievements = {

    firstQuiz:{
        name:"⭐ First Steps",
        description:"Complete your first quiz."
    },


    perfectScore:{
        name:"💯 Perfect Score",
        description:"Get 100% on a quiz."
    },


    quiz10:{
        name:"📚 Getting Started",
        description:"Complete 10 quizzes."
    },


    quiz50:{
        name:"🎓 Dedicated Learner",
        description:"Complete 50 quizzes."
    },


    xp100:{
        name:"⭐ XP Collector",
        description:"Earn 100 XP."
    },


    xp500:{
        name:"🌟 XP Expert",
        description:"Earn 500 XP."
    },


    heartComplete:{
        name:"❤️ Heart Expert",
        description:"Complete the Heart topic."
    },


    electricityComplete:{
        name:"⚡ Electricity Expert",
        description:"Complete Electricity."
    }

};





function getUnlockedAchievements(){

    return JSON.parse(
        localStorage.getItem("achievements")
    ) || [];

}




function saveAchievements(list){

    localStorage.setItem(
        "achievements",
        JSON.stringify(list)
    );

}




function unlockAchievement(id){

    let unlocked = getUnlockedAchievements();


    if(!unlocked.includes(id)){

        unlocked.push(id);

        saveAchievements(unlocked);

        return true;

    }


    return false;

}





function checkAchievements(score,total,topic){

    let unlocked = [];

    let percentage =
    Math.round(
        score / total * 100
    );


    let xp =
    Number(localStorage.getItem("XP")) || 0;


    let quizzes =
    Number(localStorage.getItem("quizzes")) || 0;



    function check(id){

        if(unlockAchievement(id)){

            unlocked.push(id);

        }

    }




    if(quizzes >= 1)
        check("firstQuiz");



    if(percentage === 100)
        check("perfectScore");



    if(quizzes >= 10)
        check("quiz10");



    if(quizzes >= 50)
        check("quiz50");



    if(xp >= 100)
        check("xp100");



    if(xp >= 500)
        check("xp500");



    if(topic === "heart")
        check("heartComplete");



    if(topic === "electricity")
        check("electricityComplete");



    localStorage.setItem(
        "newAchievements",
        JSON.stringify(unlocked)
    );


}
