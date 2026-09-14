import {
    createClient
} from "https://esm.sh/@supabase/supabase-js@2";



/* =========================================================
   STUDYSPRINT — PROFILE
   Supabase account-connected profile
========================================================= */


const SUPABASE_URL =
    "https://yfteudoecpkosxjucuky.supabase.co";


const SUPABASE_KEY =
    "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";



const supabase =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );



/* =========================================================
   ELEMENTS
========================================================= */


const profileName =
    document.getElementById("profile-name");


const profileUsername =
    document.getElementById("profile-username");


const accountEmail =
    document.getElementById("account-email");


const editButton =
    document.getElementById("edit-profile-button");


const saveButton =
    document.getElementById("save-profile-button");


const modal =
    document.getElementById("profile-modal");


const backdrop =
    document.getElementById("profile-backdrop");


const closeButton =
    document.getElementById("close-profile-modal");


const displayNameInput =
    document.getElementById("display-name");


const usernameInput =
    document.getElementById("username");


const profileMessage =
    document.getElementById("profile-message");


const profileError =
    document.getElementById("profile-error");



let currentUser = null;

let currentProfile = null;



/* =========================================================
   ERROR MESSAGE
========================================================= */


function showError(message) {

    profileError.textContent = message;

    profileError.classList.remove("hidden");

}



function hideError() {

    profileError.textContent = "";

    profileError.classList.add("hidden");

}



/* =========================================================
   USER
========================================================= */


async function getCurrentUser() {

    const result =
        await supabase.auth.getUser();


    if (result.error) {

        throw result.error;

    }


    return result.data.user;

}



/* =========================================================
   LOAD PROFILE
========================================================= */


async function loadProfile() {

    hideError();


    try {

        currentUser =
            await getCurrentUser();


        if (!currentUser) {

            window.location.href =
                "../account/index.html";

            return;

        }



        accountEmail.textContent =
            currentUser.email ||
            "No email";



        const result =
            await supabase
                .from("profiles")
                .select("*")
                .eq(
                    "id",
                    currentUser.id
                )
                .maybeSingle();


        if (result.error) {

            throw result.error;

        }



        if (!result.data) {

            await createProfile();

            return;

        }



        currentProfile =
            result.data;


        renderProfile();

    }
    catch (error) {

        console.error(
            "Profile loading error:",
            error
        );


        showError(
            "Could not load your profile."
        );

    }

}



/* =========================================================
   CREATE MISSING PROFILE
========================================================= */


async function createProfile() {

    const metadata =
        currentUser.user_metadata ||
        {};


    let username =
        metadata.username ||
        "student";


    let displayName =
        metadata.display_name ||
        username;



    const profile = {

        id: currentUser.id,

        username: username,

        display_name: displayName

    };



    const result =
        await supabase
            .from("profiles")
            .insert(profile)
            .select("*")
            .single();


    if (result.error) {

        console.error(
            "Profile creation error:",
            result.error
        );


        showError(
            "Your account exists, but your profile could not be created."
        );

        return;

    }



    currentProfile =
        result.data;


    renderProfile();

}



/* =========================================================
   NUMBER HELPER
========================================================= */


function getNumber(
    object,
    names
) {

    for (
        let i = 0;
        i < names.length;
        i++
    ) {

        const name =
            names[i];


        if (
            object &&
            object[name] !== null &&
            object[name] !== undefined
        ) {

            const value =
                Number(
                    object[name]
                );


            if (
                Number.isFinite(value)
            ) {

                return value;

            }

        }

    }


    return 0;

}



/* =========================================================
   RENDER PROFILE
========================================================= */


function renderProfile() {

    if (!currentProfile) {

        return;

    }



    const displayName =
        currentProfile.display_name ||
        currentProfile.username ||
        "Student";


    const username =
        currentProfile.username ||
        "student";



    profileName.textContent =
        displayName;


    profileUsername.textContent =
        "@" + username;



    const streak =
        getNumber(
            currentProfile,
            ["streak"]
        );


    const quizzes =
        getNumber(
            currentProfile,
            [
                "quizzes",
                "quizzes_completed"
            ]
        );


    const bestScore =
        getNumber(
            currentProfile,
            [
                "best_score",
                "bestScore"
            ]
        );


    const studies =
        getNumber(
            currentProfile,
            [
                "studies",
                "studies_completed"
            ]
        );


    const sprints =
        getNumber(
            currentProfile,
            [
                "sprints",
                "sprints_completed"
            ]
        );


    const tests =
        getNumber(
            currentProfile,
            [
                "tests",
                "tests_completed"
            ]
        );



    document.getElementById(
        "stat-streak"
    ).textContent = streak;


    document.getElementById(
        "stat-quizzes"
    ).textContent = quizzes;


    document.getElementById(
        "stat-score"
    ).textContent =
        bestScore > 0
            ? bestScore + "%"
            : "0%";



    document.getElementById(
        "activity-studies"
    ).textContent = studies;


    document.getElementById(
        "activity-sprints"
    ).textContent = sprints;


    document.getElementById(
        "activity-tests"
    ).textContent = tests;



    loadAchievements(
        streak,
        quizzes,
        bestScore
    );

}



/* =========================================================
   ACHIEVEMENTS
========================================================= */


function loadAchievements(
    streak,
    quizzes,
    bestScore
) {

    const container =
        document.getElementById(
            "achievements-list"
        );


    container.innerHTML = "";



    const achievements = [];



    if (streak >= 3) {

        achievements.push({
            icon: "🔥",
            title: "Getting Started",
            description: "Reach a 3 day streak."
        });

    }



    if (streak >= 7) {

        achievements.push({
            icon: "🔥",
            title: "Week Warrior",
            description: "Reach a 7 day streak."
        });

    }



    if (quizzes >= 10) {

        achievements.push({
            icon: "📝",
            title: "Quiz Machine",
            description: "Complete 10 quizzes."
        });

    }



    if (quizzes >= 25) {

        achievements.push({
            icon: "🏆",
            title: "Quiz Master",
            description: "Complete 25 quizzes."
        });

    }



    if (bestScore >= 100) {

        achievements.push({
            icon: "💯",
            title: "Perfect Score",
            description: "Get a perfect score."
        });

    }



    if (achievements.length === 0) {

        const item =
            document.createElement("div");


        item.className =
            "achievement locked";


        const icon =
            document.createElement("div");


        icon.className =
            "achievement-icon";


        icon.textContent =
            "🔒";


        const content =
            document.createElement("div");


        const title =
            document.createElement("strong");


        title.textContent =
            "No achievements yet";


        const description =
            document.createElement("p");


        description.textContent =
            "Keep studying to unlock achievements.";


        content.appendChild(title);

        content.appendChild(description);

        item.appendChild(icon);

        item.appendChild(content);

        container.appendChild(item);

        return;

    }



    for (
        let i = 0;
        i < achievements.length;
        i++
    ) {

        const achievement =
            achievements[i];


        const item =
            document.createElement("div");


        item.className =
            "achievement";


        const icon =
            document.createElement("div");


        icon.className =
            "achievement-icon";


        icon.textContent =
            achievement.icon;


        const content =
            document.createElement("div");


        const title =
            document.createElement("strong");


        title.textContent =
            achievement.title;


        const description =
            document.createElement("p");


        description.textContent =
            achievement.description;


        content.appendChild(title);

        content.appendChild(description);

        item.appendChild(icon);

        item.appendChild(content);

        container.appendChild(item);

    }

}



/* =========================================================
   MODAL
========================================================= */


function openModal() {

    if (!currentProfile) {

        return;

    }


    profileMessage.textContent = "";


    displayNameInput.value =
        currentProfile.display_name ||
        currentProfile.username ||
        "";


    usernameInput.value =
        currentProfile.username ||
        "";


    modal.classList.remove("hidden");


    displayNameInput.focus();

}



function closeModal() {

    modal.classList.add("hidden");

}



/* =========================================================
   SAVE PROFILE
========================================================= */


async function saveProfile() {

    if (!currentUser) {

        return;

    }



    const displayName =
        displayNameInput.value.trim();


    const username =
        usernameInput.value
            .trim()
            .toLowerCase();



    profileMessage.textContent =
        "";



    if (!displayName) {

        profileMessage.textContent =
            "Please enter a display name.";

        return;

    }



    if (!username) {

        profileMessage.textContent =
            "Please enter a username.";

        return;

    }



    if (displayName.length > 24) {

        profileMessage.textContent =
            "Display name must be 24 characters or less.";

        return;

    }



    if (username.length > 20) {

        profileMessage.textContent =
            "Username must be 20 characters or less.";

        return;

    }



    const usernamePattern =
        /^[a-z0-9._-]+$/;


    if (
        !usernamePattern.test(
            username
        )
    ) {

        profileMessage.textContent =
            "Username can only use letters, numbers, dots, dashes and underscores.";

        return;

    }



    saveButton.disabled =
        true;


    saveButton.textContent =
        "Saving...";



    try {

        const usernameCheck =
            await supabase
                .from("profiles")
                .select("id")
                .eq(
                    "username",
                    username
                )
                .neq(
                    "id",
                    currentUser.id
                )
                .maybeSingle();


        if (usernameCheck.error) {

            throw usernameCheck.error;

        }



        if (usernameCheck.data) {

            profileMessage.textContent =
                "That username is already taken.";

            saveButton.disabled =
                false;

            saveButton.textContent =
                "Save Profile";

            return;

        }



        const result =
            await supabase
                .from("profiles")
                .update({

                    username:
                        username,

                    display_name:
                        displayName

                })
                .eq(
                    "id",
                    currentUser.id
                )
                .select("*")
                .single();


        if (result.error) {

            throw result.error;

        }



        currentProfile =
            result.data;


        renderProfile();


        closeModal();

    }
    catch (error) {

        console.error(
            "Profile save error:",
            error
        );


        profileMessage.textContent =
            "Could not save your profile.";

    }



    saveButton.disabled =
        false;


    saveButton.textContent =
        "Save Profile";

}



/* =========================================================
   EVENTS
========================================================= */


editButton.addEventListener(
    "click",
    openModal
);


saveButton.addEventListener(
    "click",
    saveProfile
);


closeButton.addEventListener(
    "click",
    closeModal
);


backdrop.addEventListener(
    "click",
    closeModal
);



/* =========================================================
   AUTH STATE
========================================================= */


supabase.auth.onAuthStateChange(
    function(
        event,
        session
    ) {

        if (!session) {

            window.location.href =
                "../account/index.html";

        }

    }
);



/* =========================================================
   START
========================================================= */


loadProfile();
