import {
    createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";



const SUPABASE_URL = "https://yfteudoecpkosxjucuky.supabase.co";

const SUPABASE_KEY = "sb_publishable_d7w3Cg-X8oTsmJLgIO_OgQ_3DmiqeMo";


const supabase =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );



const profileName =
    document.getElementById(
        "profile-name"
    );


const profileUsername =
    document.getElementById(
        "profile-username"
    );


const accountEmail =
    document.getElementById(
        "account-email"
    );


const editButton =
    document.getElementById(
        "edit-profile-button"
    );


const saveButton =
    document.getElementById(
        "save-profile-button"
    );


const modal =
    document.getElementById(
        "profile-modal"
    );


const backdrop =
    document.getElementById(
        "profile-backdrop"
    );


const closeButton =
    document.getElementById(
        "close-profile-modal"
    );


const displayNameInput =
    document.getElementById(
        "display-name"
    );


const usernameInput =
    document.getElementById(
        "username"
    );


const profileMessage =
    document.getElementById(
        "profile-message"
    );


const profileError =
    document.getElementById(
        "profile-error"
    );



let currentUser = null;

let currentProfile = null;



function showError(text) {

    profileError.textContent = text;

    profileError.classList.remove(
        "hidden"
    );

}



function hideError() {

    profileError.textContent = "";

    profileError.classList.add(
        "hidden"
    );

}



async function getCurrentUser() {

    const {
        data,
        error
    } = await supabase.auth.getUser();


    if (error) {

        throw error;

    }


    return data.user;

}



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
            currentUser.email || "No email";



        const {
            data,
            error
        } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", currentUser.id)
            .maybeSingle();


        if (error) {

            throw error;

        }



        if (!data) {

            await createMissingProfile();

            return;

        }



        currentProfile = data;


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



async function createMissingProfile() {

    const metadata =
        currentUser.user_metadata || {};


    const username =
        metadata.username ||
        "player";


    const displayName =
        metadata.display_name ||
        username;


    const newProfile = {

        id: currentUser.id,

        username:
            username,

        display_name:
            displayName

    };



    const {
        data,
        error
    } = await supabase
        .from("profiles")
        .insert(newProfile)
        .select("*")
        .single();


    if (error) {

        console.error(
            "Profile creation error:",
            error
        );


        showError(
            "Your account exists, but your profile could not be created."
        );

        return;

    }



    currentProfile = data;

    renderProfile();

}



function getNumber(
    object,
    possibleNames
) {

    for (
        const name of possibleNames
    ) {

        if (
            object &&
            object[name] !== null &&
            object[name] !== undefined
        ) {

            const number =
                Number(
                    object[name]
                );


            if (
                Number.isFinite(number)
            ) {

                return number;

            }

        }

    }


    return 0;

}



function renderProfile() {

    if (!currentProfile) {

        return;

    }



    const displayName =
        currentProfile.display_name ||
        currentProfile.username ||
        "Player";


    const username =
        currentProfile.username ||
        "player";



    profileName.textContent =
        displayName;


    profileUsername.textContent =
        "@" + username;



    const streak =
        getNumber(
            currentProfile,
            [
                "streak"
            ]
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



function loadAchievements(
    streak,
    quizzes,
    bestScore
) {

    const container =
        document.getElementById(
            "achievements-list"
        );


    const achievements = [];



    if (streak >= 3) {

        achievements.push({
            icon: "🔥",
            title: "Getting Started",
            description:
                "Reach a 3 day streak."
        });

    }


    if (streak >= 7) {

        achievements.push({
            icon: "🔥",
            title: "Week Warrior",
            description:
                "Reach a 7 day streak."
        });

    }


    if (quizzes >= 10) {

        achievements.push({
            icon: "📝",
            title: "Quiz Machine",
            description:
                "Complete 10 quizzes."
        });

    }


    if (quizzes >= 25) {

        achievements.push({
            icon: "🏆",
            title: "Quiz Master",
            description:
                "Complete 25 quizzes."
        });

    }


    if (bestScore >= 100) {

        achievements.push({
            icon: "💯",
            title: "Perfect Score",
            description:
                "Get a perfect score."
        });

    }



    if (
        achievements.length === 0
    ) {

        container.innerHTML = `
            <div class="achievement locked">

                <div class="achievement-icon">
                    🔒
                </div>

                <div>

                    <strong>
                        No achievements yet
                    </strong>

                    <p>
                        Keep studying to unlock achievements.
                    </p>

                </div>

            </div>
        `;

        return;

    }



    container.innerHTML = "";


    achievements.forEach(
        function(achievement) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "achievement";


            item.innerHTML = `
                <div class="achievement-icon">
                    ${achievement.icon}
                </div>

                <div>

                    <strong>
                        ${achievement.title}
                    </strong>

                    <p>
                        ${achievement.description}
                    </p>

                </div>
            `;


            container.appendChild(
                item
            );

        }
    );

}



function openModal() {

    if (!currentProfile) {

        return;

    }


    hideMessage();


    displayNameInput.value =
        currentProfile.display_name ||
        currentProfile.username ||
        "";


    usernameInput.value =
        currentProfile.username ||
        "";


    modal.classList.remove(
        "hidden"
    );


    displayNameInput.focus();

}



function closeModal() {

    modal.classList.add(
        "hidden"
    );

}



function hideMessage() {

    profileMessage.textContent = "";

}



function showMessage(text) {

    profileMessage.textContent =
        text;

}



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



    if (!displayName) {

        showMessage(
            "Please enter a display name."
        );

        return;

    }



    if (!username) {

        showMessage(
            "Please enter a username."
        );

        return;

    }



    if (
        displayName.length > 24
    ) {

        showMessage(
            "Display name must be 24 characters or less."
        );

        return;

    }



    if (
        username.length > 20
    ) {

        showMessage(
            "Username must be 20 characters or less."
        );

        return;

    }



    if (
        !/^[a-z0-9._-]+$/.test(
            username
        )
    ) {

        showMessage(
            "Username can only use letters, numbers, dots, dashes and underscores."
        );

        return;

    }



    saveButton.disabled = true;

    saveButton.textContent =
        "Saving...";



    try {

        const {
            data: existingUsername,
            error: usernameError
        } = await supabase
            .from("profiles")
            .select("id")
            .eq("username", username)
            .neq("id", currentUser.id)
            .maybeSingle();



        if (usernameError) {

            throw usernameError;

        }



        if (existingUsername) {

            showMessage(
                "That username is already taken."
            );

            saveButton.disabled = false;

            saveButton.textContent =
                "Save Profile";

            return;

        }



        const {
            data,
            error
        } = await supabase
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



        if (error) {

            throw error;

        }



        currentProfile =
            data;


        renderProfile();

        closeModal();

    }
    catch (error) {

        console.error(
            "Profile save error:",
            error
        );


        showMessage(
            "Could not save your profile."
        );

    }



    saveButton.disabled = false;

    saveButton.textContent =
        "Save Profile";

}



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



supabase.auth.onAuthStateChange(
    function(event, session) {

        if (!session) {

            window.location.href =
                "../account/index.html";

        }

    }
);



loadProfile();
