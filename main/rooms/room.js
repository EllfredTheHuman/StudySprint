import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue,
    get,
    remove,
    push,
    set
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";



const firebaseConfig = {
    apiKey: "AIzaSyBi3Ge5_pDiEV-scRC-kptDJoHnHmbdw6s",
    authDomain: "studysprint-67f63.firebaseapp.com",
    databaseURL: "https://studysprint-67f63-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "studysprint-67f63",
    storageBucket: "studysprint-67f63.firebasestorage.app",
    messagingSenderId: "1076120438088",
    appId: "1:1076120438088:web:284c4856998fb607ac1f7d"
};



const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



const params = new URLSearchParams(window.location.search);
const roomCode = params.get("code");


let userId =
    localStorage.getItem("studysprint_username_id") ||
    localStorage.getItem("studysprint_user_id");


if (!userId) {

    userId =
        "user_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .slice(2, 8);

    localStorage.setItem(
        "studysprint_user_id",
        userId
    );
}


const username =
    localStorage.getItem("studysprint_username") ||
    "Student";



const roomNameElement =
    document.getElementById("room-name");

const roomTypeElement =
    document.getElementById("room-type");

const memberCountElement =
    document.getElementById("member-count");

const roomCodeElement =
    document.getElementById("room-code");

const copyCodeButton =
    document.getElementById("copy-code");

const copyMessage =
    document.getElementById("copy-message");

const welcomeText =
    document.getElementById("welcome-text");

const membersList =
    document.getElementById("members-list");

const leaderboardList =
    document.getElementById("leaderboard-list");

const assignmentsList =
    document.getElementById("assignments-list");

const activityList =
    document.getElementById("activity-list");

const roomError =
    document.getElementById("room-error");

const newAssignmentButton =
    document.getElementById("new-assignment-button");

const assignmentModal =
    document.getElementById("assignment-modal");

const closeAssignmentModal =
    document.getElementById("close-assignment-modal");

const assignmentBackdrop =
    document.getElementById("assignment-backdrop");

const assignmentType =
    document.getElementById("assignment-type");

const assignmentOptions =
    document.getElementById("assignment-options");

const assignmentTitle =
    document.getElementById("assignment-title");

const assignmentDue =
    document.getElementById("assignment-due");

const saveAssignmentButton =
    document.getElementById("save-assignment-button");

const assignmentMessage =
    document.getElementById("assignment-message");

const deleteRoomButton =
    document.getElementById("delete-room-button");

const ownerSettings =
    document.getElementById("owner-settings");

const memberSettings =
    document.getElementById("member-settings");



let currentRoom = null;



if (!roomCode) {

    showError("No room code was provided.");

} else {

    loadRoom();

}



/* =========================================================
   LOAD ROOM
========================================================= */

async function loadRoom() {

    try {

        const roomRef =
            ref(
                database,
                "rooms/" + roomCode.toUpperCase()
            );

        const snapshot =
            await get(roomRef);


        if (!snapshot.exists()) {

            showError("This room does not exist.");
            return;

        }


        currentRoom =
            snapshot.val();


        renderRoom();

        listenToRoom(roomRef);

    } catch (error) {

        console.error(error);

        showError(
            "Could not load the room."
        );

    }

}



/* =========================================================
   LIVE ROOM
========================================================= */

function listenToRoom(roomRef) {

    onValue(
        roomRef,
        snapshot => {

            if (!snapshot.exists()) {

                window.location.href = "index.html";
                return;

            }

            currentRoom = snapshot.val();

            renderRoom();

        },
        error => {

            console.error(error);

            showError(
                "Could not connect to the room."
            );

        }
    );

}



/* =========================================================
   RENDER ROOM
========================================================= */

function renderRoom() {

    roomNameElement.textContent =
        currentRoom.name || "StudySprint Room";


    roomTypeElement.textContent =
        currentRoom.type === "class"
            ? "CLASS ROOM"
            : "FRIEND ROOM";


    roomCodeElement.textContent =
        roomCode.toUpperCase();


    const members =
        currentRoom.members || {};

    const memberIds =
        Object.keys(members);


    memberCountElement.textContent =
        memberIds.length === 1
            ? "1 member"
            : memberIds.length + " members";


    welcomeText.textContent =
        "Welcome to " +
        (currentRoom.name || "your room") +
        ".";


    const isOwner =
        currentRoom.owner === userId;


    if (isOwner) {

        ownerSettings.classList.remove("hidden");
        memberSettings.classList.add("hidden");

        newAssignmentButton.classList.remove("hidden");

    } else {

        ownerSettings.classList.add("hidden");
        memberSettings.classList.remove("hidden");

        newAssignmentButton.classList.add("hidden");

    }


    renderMembers(members);
    renderLeaderboard(members);
    renderAssignments(
        currentRoom.assignments || {},
        members
    );
    renderActivity(
        currentRoom.activity || {}
    );

}



/* =========================================================
   MEMBERS
========================================================= */

function renderMembers(members) {

    const ids =
        Object.keys(members);


    if (ids.length === 0) {

        membersList.innerHTML =
            '<p class="muted">No members yet.</p>';

        return;

    }


    membersList.innerHTML = "";


    ids.forEach(id => {

        const member =
            members[id] || {};


        const row =
            document.createElement("div");

        row.className =
            "member-row";


        const avatar =
            document.createElement("div");

        avatar.className =
            "member-avatar";


        const name =
            member.name ||
            "Student";


        avatar.textContent =
            name.charAt(0).toUpperCase();


        const nameElement =
            document.createElement("div");

        nameElement.className =
            "member-name";

        nameElement.textContent =
            name;


        const role =
            document.createElement("div");

        role.className =
            "member-role";

        role.textContent =
            member.role === "owner"
                ? "Owner"
                : "Member";


        row.appendChild(avatar);
        row.appendChild(nameElement);
        row.appendChild(role);


        membersList.appendChild(row);

    });

}



/* =========================================================
   LEADERBOARD
========================================================= */

function renderLeaderboard(members) {

    const ids =
        Object.keys(members);


    if (ids.length === 0) {

        leaderboardList.innerHTML =
            '<p class="muted">No members yet.</p>';

        return;

    }


    leaderboardList.innerHTML = "";


    const sorted =
        ids
            .map(id => {

                const member =
                    members[id] || {};


                return {
                    id: id,
                    name:
                        member.name ||
                        "Student",
                    score:
                        Number(member.score) || 0
                };

            })
            .sort(
                (a, b) =>
                    b.score - a.score
            );


    sorted.forEach((member, index) => {

        const row =
            document.createElement("div");

        row.className =
            "leaderboard-row";


        const rank =
            document.createElement("div");

        rank.className =
            "rank";

        rank.textContent =
            index + 1;


        const name =
            document.createElement("div");

        name.className =
            "leaderboard-name";

        name.textContent =
            member.name;


        const score =
            document.createElement("div");

        score.className =
            "leaderboard-value";

        score.textContent =
            member.score;


        row.appendChild(rank);
        row.appendChild(name);
        row.appendChild(score);


        leaderboardList.appendChild(row);

    });

}



/* =========================================================
   ASSIGNMENTS
========================================================= */

function renderAssignments(
    assignments,
    members
) {

    const ids =
        Object.keys(assignments);


    if (ids.length === 0) {

        assignmentsList.innerHTML =
            '<p class="muted">No assignments yet.</p>';

        return;

    }


    assignmentsList.innerHTML = "";


    ids
        .sort((a, b) => {

            const first =
                assignments[a].createdAt || 0;

            const second =
                assignments[b].createdAt || 0;

            return second - first;

        })
        .forEach(id => {

            const assignment =
                assignments[id];


            const card =
                document.createElement("div");

            card.className =
                "assignment-card";


            const top =
                document.createElement("div");

            top.className =
                "assignment-top";


            const title =
                document.createElement("h3");

            title.className =
                "assignment-title";

            title.textContent =
                assignment.title ||
                "Assignment";


            const type =
                document.createElement("div");

            type.className =
                "assignment-type";

            type.textContent =
                getAssignmentTypeName(
                    assignment.type
                );


            top.appendChild(title);
            top.appendChild(type);


            const description =
                document.createElement("p");

            description.className =
                "assignment-description";

            description.textContent =
                getAssignmentDescription(
                    assignment
                );


            const memberIds =
                Object.keys(members);


            let completed = 0;


            memberIds.forEach(memberId => {

                if (
                    assignment.completed &&
                    assignment.completed[memberId]
                ) {

                    completed++;

                }

            });


            const total =
                memberIds.length;


            const percentage =
                total === 0
                    ? 0
                    : Math.round(
                        completed /
                        total *
                        100
                    );


            const progress =
                document.createElement("div");

            progress.className =
                "assignment-progress";


            const progressHeader =
                document.createElement("div");

            progressHeader.className =
                "progress-header";


            const progressText =
                document.createElement("span");

            progressText.textContent =
                completed +
                " / " +
                total +
                " completed";


            const percentText =
                document.createElement("span");

            percentText.textContent =
                percentage + "%";


            progressHeader.appendChild(
                progressText
            );

            progressHeader.appendChild(
                percentText
            );


            const progressBar =
                document.createElement("div");

            progressBar.className =
                "progress-bar";


            const progressFill =
                document.createElement("div");

            progressFill.className =
                "progress-fill";

            progressFill.style.width =
                percentage + "%";


            progressBar.appendChild(
                progressFill
            );


            progress.appendChild(
                progressHeader
            );

            progress.appendChild(
                progressBar
            );


            card.appendChild(top);
            card.appendChild(description);
            card.appendChild(progress);


            if (assignment.due) {

                const due =
                    document.createElement("div");

                due.className =
                    "assignment-due";

                due.textContent =
                    "Due " +
                    formatDate(
                        assignment.due
                    );

                card.appendChild(due);

            }


            assignmentsList.appendChild(card);

        });

}



/* =========================================================
   ASSIGNMENT FORM
========================================================= */

function updateAssignmentOptions() {

    const type =
        assignmentType.value;


    assignmentOptions.innerHTML = "";


    if (type === "study") {

        addSelect(
            "Topic",
            "assignment-topic",
            [
                "Area and Perimeter",
                "BIDMAS",
                "Rocks and Minerals",
                "Energy and Forces",
                "Grammar",
                "Geography",
                "Japanese Characters",
                "Japanese Travel",
                "French Travel"
            ]
        );

    }


    if (type === "sprint") {

        addSelect(
            "Topic",
            "assignment-topic",
            [
                "Area and Perimeter",
                "BIDMAS",
                "Rocks and Minerals",
                "Energy and Forces",
                "Grammar",
                "Geography",
                "Japanese Characters",
                "Japanese Travel",
                "French Travel"
            ]
        );

    }


    if (type === "test") {

        addSelect(
            "Topic",
            "assignment-topic",
            [
                "Area and Perimeter",
                "BIDMAS",
                "Rocks and Minerals",
                "Energy and Forces",
                "Grammar",
                "Geography",
                "Japanese Characters",
                "Japanese Travel",
                "French Travel"
            ]
        );

    }


    if (type === "streak") {

        addNumberInput(
            "Required streak",
            "streak-target",
            "7",
            "Number of days"
        );

    }


    if (type === "achievement") {

        addNumberInput(
            "Achievements required",
            "achievement-target",
            "2",
            "Number of achievements"
        );

    }


    if (type === "score") {

        addNumberInput(
            "Required score",
            "score-target",
            "80",
            "Percentage"
        );

    }


    if (type === "activities") {

        addNumberInput(
            "Activities required",
            "activities-target",
            "5",
            "Number of activities"
        );

    }


    if (type === "studyTime") {

        addNumberInput(
            "Study time required",
            "study-time-target",
            "30",
            "Minutes"
        );

    }


    if (type === "custom") {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "dynamic-option";


        const label =
            document.createElement("label");

        label.textContent =
            "Goal description";

        label.htmlFor =
            "custom-goal";


        const input =
            document.createElement("input");

        input.id =
            "custom-goal";

        input.type =
            "text";

        input.placeholder =
            "e.g. Finish revision before Friday";


        wrapper.appendChild(label);
        wrapper.appendChild(input);


        assignmentOptions.appendChild(
            wrapper
        );

    }

}



/* =========================================================
   FORM HELPERS
========================================================= */

function addSelect(
    labelText,
    id,
    values
) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "dynamic-option";


    const label =
        document.createElement("label");

    label.textContent =
        labelText;

    label.htmlFor =
        id;


    const select =
        document.createElement("select");

    select.id =
        id;


    values.forEach(value => {

        const option =
            document.createElement("option");

        option.value =
            value;

        option.textContent =
            value;

        select.appendChild(option);

    });


    wrapper.appendChild(label);
    wrapper.appendChild(select);


    assignmentOptions.appendChild(
        wrapper
    );

}



function addNumberInput(
    labelText,
    id,
    value,
    description
) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "dynamic-option";


    const label =
        document.createElement("label");

    label.textContent =
        labelText;

    label.htmlFor =
        id;


    const descriptionElement =
        document.createElement("p");

    descriptionElement.className =
        "option-description";

    descriptionElement.textContent =
        description;


    const input =
        document.createElement("input");

    input.id =
        id;

    input.type =
        "number";

    input.min =
        "1";

    input.value =
        value;


    wrapper.appendChild(label);
    wrapper.appendChild(
        descriptionElement
    );
    wrapper.appendChild(input);


    assignmentOptions.appendChild(
        wrapper
    );

}



/* =========================================================
   OPEN ASSIGNMENT
========================================================= */

newAssignmentButton.addEventListener(
    "click",
    () => {

        assignmentTitle.value = "";
        assignmentDue.value = "";
        assignmentMessage.textContent = "";

        assignmentType.value =
            "study";

        updateAssignmentOptions();

        assignmentModal.classList.remove(
            "hidden"
        );

    }
);



assignmentType.addEventListener(
    "change",
    updateAssignmentOptions
);



function closeAssignment() {

    assignmentModal.classList.add(
        "hidden"
    );

}


closeAssignmentModal.addEventListener(
    "click",
    closeAssignment
);


assignmentBackdrop.addEventListener(
    "click",
    closeAssignment
);



/* =========================================================
   SAVE ASSIGNMENT
========================================================= */

saveAssignmentButton.addEventListener(
    "click",
    async () => {

        if (
            !currentRoom ||
            currentRoom.owner !== userId
        ) {

            return;

        }


        const title =
            assignmentTitle.value.trim();


        if (!title) {

            assignmentMessage.textContent =
                "Give the assignment a name.";

            return;

        }


        const type =
            assignmentType.value;


        const data = {

            title: title,

            type: type,

            createdBy: userId,

            createdAt: Date.now(),

            due:
                assignmentDue.value ||
                null,

            completed: {}

        };


        if (
            type === "study" ||
            type === "sprint" ||
            type === "test"
        ) {

            const topic =
                document.getElementById(
                    "assignment-topic"
                );

            data.topic =
                topic
                    ? topic.value
                    : "";

        }


        if (type === "streak") {

            data.target =
                Number(
                    document.getElementById(
                        "streak-target"
                    ).value
                );

        }


        if (type === "achievement") {

            data.target =
                Number(
                    document.getElementById(
                        "achievement-target"
                    ).value
                );

        }


        if (type === "score") {

            data.target =
                Number(
                    document.getElementById(
                        "score-target"
                    ).value
                );

        }


        if (type === "activities") {

            data.target =
                Number(
                    document.getElementById(
                        "activities-target"
                    ).value
                );

        }


        if (type === "studyTime") {

            data.target =
                Number(
                    document.getElementById(
                        "study-time-target"
                    ).value
                );

        }


        if (type === "custom") {

            data.goal =
                document.getElementById(
                    "custom-goal"
                ).value.trim();

        }


        try {

            saveAssignmentButton.disabled =
                true;

            saveAssignmentButton.textContent =
                "Creating...";


            const assignmentRef =
                push(
                    ref(
                        database,
                        "rooms/" +
                        roomCode +
                        "/assignments"
                    )
                );


            await set(
                assignmentRef,
                data
            );


            closeAssignment();


        } catch (error) {

            console.error(error);

            assignmentMessage.textContent =
                "Could not create the assignment.";

        } finally {

            saveAssignmentButton.disabled =
                false;

            saveAssignmentButton.textContent =
                "Create Assignment";

        }

    }
);



/* =========================================================
   ASSIGNMENT TEXT
========================================================= */

function getAssignmentTypeName(type) {

    const names = {

        study: "Study",

        sprint: "Sprint",

        test: "Test",

        streak: "Streak",

        achievement: "Achievement",

        score: "Score",

        activities: "Activities",

        studyTime: "Study Time",

        custom: "Custom"

    };


    return names[type] || "Goal";

}



function getAssignmentDescription(
    assignment
) {

    if (assignment.type === "study") {

        return (
            "Complete the " +
            assignment.topic +
            " study."
        );

    }


    if (assignment.type === "sprint") {

        return (
            "Complete a Sprint on " +
            assignment.topic +
            "."
        );

    }


    if (assignment.type === "test") {

        return (
            "Complete the " +
            assignment.topic +
            " test."
        );

    }


    if (assignment.type === "streak") {

        return (
            "Reach a " +
            assignment.target +
            " day streak."
        );

    }


    if (assignment.type === "achievement") {

        return (
            "Earn " +
            assignment.target +
            " achievements."
        );

    }


    if (assignment.type === "score") {

        return (
            "Reach a score of " +
            assignment.target +
            "% or higher."
        );

    }


    if (assignment.type === "activities") {

        return (
            "Complete " +
            assignment.target +
            " activities."
        );

    }


    if (assignment.type === "studyTime") {

        return (
            "Study for at least " +
            assignment.target +
            " minutes."
        );

    }


    if (assignment.type === "custom") {

        return (
            assignment.goal ||
            "Complete the custom goal."
        );

    }


    return "Complete this assignment.";

}



/* =========================================================
   ACTIVITY
========================================================= */

function renderActivity(activity) {

    const ids =
        Object.keys(activity);


    if (ids.length === 0) {

        activityList.innerHTML =
            '<p class="muted">No activity yet.</p>';

        return;

    }


    activityList.innerHTML = "";


    ids
        .sort((a, b) => {

            return (
                (activity[b].createdAt || 0) -
                (activity[a].createdAt || 0)
            );

        })
        .slice(0, 10)
        .forEach(id => {

            const item =
                activity[id];


            const wrapper =
                document.createElement("div");

            wrapper.className =
                "activity-item";


            const title =
                document.createElement("div");

            title.className =
                "activity-title";

            title.textContent =
                item.text ||
                "Room activity";


            const time =
                document.createElement("div");

            time.className =
                "activity-time";

            time.textContent =
                item.createdAt
                    ? formatRelativeTime(
                        item.createdAt
                    )
                    : "";


            wrapper.appendChild(title);
            wrapper.appendChild(time);


            activityList.appendChild(wrapper);

        });

}



/* =========================================================
   DELETE ROOM
========================================================= */

deleteRoomButton.addEventListener(
    "click",
    async () => {

        if (
            !currentRoom ||
            currentRoom.owner !== userId
        ) {

            return;

        }


        const confirmed =
            window.confirm(
                "Delete this room permanently? This cannot be undone."
            );


        if (!confirmed) {

            return;

        }


        try {

            deleteRoomButton.disabled =
                true;

            deleteRoomButton.textContent =
                "Deleting...";


            await remove(
                ref(
                    database,
                    "rooms/" + roomCode
                )
            );


            window.location.href =
                "index.html";

        } catch (error) {

            console.error(error);

            deleteRoomButton.disabled =
                false;

            deleteRoomButton.textContent =
                "Delete Room";

            showError(
                "Could not delete the room."
            );

        }

    }
);



/* =========================================================
   COPY CODE
========================================================= */

copyCodeButton.addEventListener(
    "click",
    async () => {

        try {

            await navigator.clipboard.writeText(
                roomCode.toUpperCase()
            );

            copyMessage.textContent =
                "Copied!";

            setTimeout(
                () => {
                    copyMessage.textContent =
                        "";
                },
                1800
            );

        } catch (error) {

            copyMessage.textContent =
                "Could not copy.";

        }

    }
);



/* =========================================================
   NAVIGATION
========================================================= */

document
    .querySelectorAll(".room-nav-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.section;


                document
                    .querySelectorAll(
                        ".room-nav-button"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                document
                    .querySelectorAll(
                        ".room-section"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                const target =
                    document.getElementById(
                        "section-" +
                        section
                    );


                if (target) {

                    target.classList.add(
                        "active"
                    );

                }


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    });



/* =========================================================
   HELPERS
========================================================= */

function formatDate(value) {

    const date =
        new Date(
            value + "T00:00:00"
        );


    return date.toLocaleDateString(
        undefined,
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}



function formatRelativeTime(timestamp) {

    const difference =
        Date.now() - timestamp;


    const minutes =
        Math.floor(
            difference / 60000
        );


    if (minutes < 1) {
        return "Just now";
    }


    if (minutes === 1) {
        return "1 minute ago";
    }


    if (minutes < 60) {
        return minutes + " minutes ago";
    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (hours === 1) {
        return "1 hour ago";
    }


    if (hours < 24) {
        return hours + " hours ago";
    }


    const days =
        Math.floor(
            hours / 24
        );


    if (days === 1) {
        return "1 day ago";
    }


    return days + " days ago";

}



function showError(message) {

    roomError.textContent =
        message;

}
