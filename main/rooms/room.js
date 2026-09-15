import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    get,
    set,
    update,
    remove,
    onValue
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";



/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyBi3Ge5_pDiEV-scRC-kptDJoHnHmbdw6s",

    authDomain:
        "studysprint-67f63.firebaseapp.com",

    databaseURL:
        "https://studysprint-67f63-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId:
        "studysprint-67f63",

    storageBucket:
        "studysprint-67f63.firebasestorage.app",

    messagingSenderId:
        "1076120438088",

    appId:
        "1:1076120438088:web:284c4856998fb607ac1f7d"

};


const app =
    initializeApp(firebaseConfig);


const database =
    getDatabase(app);



/* =========================================================
   USER
========================================================= */

const userId =
    localStorage.getItem("studysprint_user_id");


const username =
    localStorage.getItem("studysprint_username")
    || "Student";


const avatar =
    localStorage.getItem("studysprint_avatar")
    || "S";



/* =========================================================
   ROOM CODE
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const roomCode =
    (
        params.get("code")
        || ""
    ).trim().toUpperCase();



/* =========================================================
   ELEMENTS
========================================================= */

const roomNameElement =
    document.getElementById("room-name");


const roomTypeElement =
    document.getElementById("room-type");


const roomCodeElement =
    document.getElementById("room-code");


const memberCountElement =
    document.getElementById("member-count");


const copyButton =
    document.getElementById("copy-code");


const copyMessage =
    document.getElementById("copy-message");


const roomError =
    document.getElementById("room-error");



/* =========================================================
   STATE
========================================================= */

let currentRoom = null;

let roomListener = null;



/* =========================================================
   HELPERS
========================================================= */

function showError(message) {

    if (!roomError) {
        return;
    }

    roomError.textContent =
        message;

    roomError.classList.remove(
        "hidden"
    );

}


function hideError() {

    if (!roomError) {
        return;
    }

    roomError.textContent = "";

    roomError.classList.add(
        "hidden"
    );

}


function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function formatDate(timestamp) {

    if (!timestamp) {
        return "";
    }

    const date =
        new Date(timestamp);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "";
    }

    return date.toLocaleDateString(
        "en-AU",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}



/* =========================================================
   UPDATE CURRENT USER
========================================================= */

async function syncCurrentUser() {

    if (!userId) {
        return;
    }

    if (!roomCode) {
        return;
    }

    const memberReference =
        ref(
            database,
            "rooms/"
            + roomCode
            + "/members/"
            + userId
        );


    const snapshot =
        await get(memberReference);


    if (!snapshot.exists()) {
        return;
    }


    const existing =
        snapshot.val()
        || {};


    const updates = {

        name: username,

        avatar: avatar

    };


    if (!existing.joinedAt) {

        updates.joinedAt =
            Date.now();

    }


    if (!existing.role) {

        updates.role =
            "member";

    }


    await update(
        memberReference,
        updates
    );

}



/* =========================================================
   LOAD ROOM
========================================================= */

async function loadRoom() {

    hideError();


    if (!roomCode) {

        showError(
            "No room code was provided."
        );

        return;

    }


    if (!userId) {

        showError(
            "Your StudySprint account could not be found."
        );

        return;

    }


    if (roomCodeElement) {

        roomCodeElement.textContent =
            roomCode;

    }


    try {

        const roomReference =
            ref(
                database,
                "rooms/"
                + roomCode
            );


        const snapshot =
            await get(
                roomReference
            );


        if (!snapshot.exists()) {

            showError(
                "This room does not exist."
            );

            return;

        }


        currentRoom =
            snapshot.val();


        await syncCurrentUser();


        renderRoom(
            currentRoom
        );


        listenToRoom();

    } catch (error) {

        console.error(
            "StudySprint room error:",
            error
        );


        showError(
            "Could not load this room."
        );

    }

}



/* =========================================================
   REAL-TIME ROOM LISTENER
========================================================= */

function listenToRoom() {

    if (!roomCode) {
        return;
    }


    const roomReference =
        ref(
            database,
            "rooms/"
            + roomCode
        );


    roomListener =
        onValue(
            roomReference,
            function (snapshot) {

                if (!snapshot.exists()) {

                    showError(
                        "This room has been deleted."
                    );

                    return;

                }


                currentRoom =
                    snapshot.val();


                renderRoom(
                    currentRoom
                );

            },
            function (error) {

                console.error(
                    "Room listener error:",
                    error
                );

            }
        );

}



/* =========================================================
   RENDER ROOM
========================================================= */

function renderRoom(room) {

    if (!room) {
        return;
    }


    if (roomNameElement) {

        roomNameElement.textContent =
            room.name
            || "Untitled Room";

    }


    if (roomTypeElement) {

        const type =
            room.type
            || "friends";


        roomTypeElement.textContent =
            type === "class"
                ? "CLASS"
                : "FRIENDS";

    }


    if (roomCodeElement) {

        roomCodeElement.textContent =
            roomCode;

    }


    renderMemberCount(
        room.members
    );


    renderMembers(
        room.members
    );


    renderLeaderboard(
        room.members
    );


    renderAssignments(
        room.assignments
    );


    renderActivity(
        room
    );

}



/* =========================================================
   MEMBER COUNT
========================================================= */

function renderMemberCount(
    members
) {

    if (!memberCountElement) {
        return;
    }


    const list =
        members
            ? Object.values(members)
            : [];


    memberCountElement.textContent =
        list.length
        + " "
        + (
            list.length === 1
                ? "member"
                : "members"
        );

}



/* =========================================================
   MEMBERS
========================================================= */

function renderMembers(
    members
) {

    const container =
        document.getElementById(
            "members-list"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const entries =
        members
            ? Object.entries(members)
            : [];


    if (!entries.length) {

        container.innerHTML =
            '<p class="muted">No members yet.</p>';

        return;

    }


    entries.sort(
        function (a, b) {

            const first =
                String(
                    a[1].name
                    || "Student"
                ).toLowerCase();


            const second =
                String(
                    b[1].name
                    || "Student"
                ).toLowerCase();


            return first.localeCompare(
                second
            );

        }
    );


    entries.forEach(
        function (entry) {

            const memberId =
                entry[0];


            const member =
                entry[1]
                || {};


            const name =
                member.name
                || "Student";


            const memberAvatar =
                member.avatar
                || String(name).charAt(0).toUpperCase()
                || "S";


            const role =
                member.role
                || "member";


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "member-card";


            card.innerHTML =

                '<div class="member-avatar">'
                + escapeHtml(
                    memberAvatar
                )
                + '</div>'

                + '<div class="member-info">'

                + '<strong>'
                + escapeHtml(name)
                + '</strong>'

                + '<small>'
                + (
                    role === "owner"
                        ? "Owner"
                        : "Member"
                )
                + '</small>'

                + '</div>';


            if (
                memberId === userId
            ) {

                card.classList.add(
                    "current-user"
                );

            }


            container.appendChild(
                card
            );

        }
    );

}



/* =========================================================
   LEADERBOARD
========================================================= */

function renderLeaderboard(
    members
) {

    const container =
        document.getElementById(
            "leaderboard-list"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const entries =
        members
            ? Object.entries(members)
            : [];


    if (!entries.length) {

        container.innerHTML =
            '<p class="muted">No leaderboard data yet.</p>';

        return;

    }


    entries.sort(
        function (a, b) {

            const first =
                Number(
                    a[1].score
                    || 0
                );


            const second =
                Number(
                    b[1].score
                    || 0
                );


            return second - first;

        }
    );


    entries.forEach(
        function (entry, index) {

            const memberId =
                entry[0];


            const member =
                entry[1]
                || {};


            const name =
                member.name
                || "Student";


            const score =
                Number(
                    member.score
                    || 0
                );


            const memberAvatar =
                member.avatar
                || String(name).charAt(0).toUpperCase()
                || "S";


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "leaderboard-row";


            if (
                memberId === userId
            ) {

                row.classList.add(
                    "current-user"
                );

            }


            row.innerHTML =

                '<span class="leaderboard-position">'
                + (
                    index + 1
                )
                + '</span>'

                + '<div class="leaderboard-avatar">'
                + escapeHtml(
                    memberAvatar
                )
                + '</div>'

                + '<div class="leaderboard-name">'
                + escapeHtml(name)
                + '</div>'

                + '<strong class="leaderboard-score">'
                + score
                + '</strong>';


            container.appendChild(
                row
            );

        }
    );

}



/* =========================================================
   ASSIGNMENTS
========================================================= */

function renderAssignments(
    assignments
) {

    const container =
        document.getElementById(
            "assignments-list"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const entries =
        assignments
            ? Object.entries(assignments)
            : [];


    if (!entries.length) {

        container.innerHTML =
            '<p class="muted">No assignments yet.</p>';

        return;

    }


    entries.sort(
        function (a, b) {

            return Number(
                b[1].createdAt
                || 0
            ) - Number(
                a[1].createdAt
                || 0
            );

        }
    );


    entries.forEach(
        function (entry) {

            const assignment =
                entry[1]
                || {};


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "assignment-card";


            const title =
                assignment.title
                || "Assignment";


            const type =
                assignment.type
                || "Custom Goal";


            const completed =
                assignment.completed
                ? assignment.completed[userId]
                : false;


            card.innerHTML =

                '<div class="assignment-content">'

                + '<span class="assignment-type">'
                + escapeHtml(type)
                + '</span>'

                + '<strong>'
                + escapeHtml(title)
                + '</strong>'

                + (
                    assignment.due
                        ? '<small>Due '
                        + escapeHtml(
                            formatDate(
                                assignment.due
                            )
                        )
                        + '</small>'
                        : ""
                )

                + '</div>'

                + '<span class="assignment-status">'
                + (
                    completed
                        ? "Complete"
                        : "Open"
                )
                + '</span>';


            container.appendChild(
                card
            );

        }
    );

}



/* =========================================================
   ACTIVITY
========================================================= */

function renderActivity(
    room
) {

    const container =
        document.getElementById(
            "activity-list"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const activity =
        room.activity
        || {};


    const entries =
        Object.entries(
            activity
        );


    if (!entries.length) {

        container.innerHTML =
            '<p class="muted">No activity yet.</p>';

        return;

    }


    entries.sort(
        function (a, b) {

            return Number(
                b[1].createdAt
                || 0
            ) - Number(
                a[1].createdAt
                || 0
            );

        }
    );


    entries.slice(
        0,
        20
    ).forEach(
        function (entry) {

            const item =
                entry[1]
                || {};


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "activity-item";


            row.innerHTML =

                '<strong>'
                + escapeHtml(
                    item.message
                    || "New activity"
                )
                + '</strong>'

                + (
                    item.createdAt
                        ? '<small>'
                        + escapeHtml(
                            formatDate(
                                item.createdAt
                            )
                        )
                        + '</small>'
                        : ""
                );


            container.appendChild(
                row
            );

        }
    );

}



/* =========================================================
   COPY ROOM CODE
========================================================= */

if (copyButton) {

    copyButton.addEventListener(
        "click",
        async function () {

            try {

                await navigator.clipboard.writeText(
                    roomCode
                );


                if (copyMessage) {

                    copyMessage.textContent =
                        "Copied!";

                    copyMessage.classList.remove(
                        "hidden"
                    );


                    setTimeout(
                        function () {

                            copyMessage.textContent =
                                "";

                            copyMessage.classList.add(
                                "hidden"
                            );

                        },
                        1800
                    );

                }

            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

            }

        }
    );

}



/* =========================================================
   LEAVE ROOM
========================================================= */

const leaveButton =
    document.getElementById(
        "leave-room"
    );


if (leaveButton) {

    leaveButton.addEventListener(
        "click",
        async function () {

            if (!userId) {
                return;
            }


            const confirmed =
                window.confirm(
                    "Leave this room?"
                );


            if (!confirmed) {
                return;
            }


            try {

                await remove(
                    ref(
                        database,
                        "rooms/"
                        + roomCode
                        + "/members/"
                        + userId
                    )
                );


                window.location.href =
                    "index.html";

            } catch (error) {

                console.error(
                    "Leave room error:",
                    error
                );

                showError(
                    "Could not leave the room."
                );

            }

        }
    );

}



/* =========================================================
   OWNER DELETE
========================================================= */

const deleteButton =
    document.getElementById(
        "delete-room"
    );


if (deleteButton) {

    deleteButton.addEventListener(
        "click",
        async function () {

            if (!currentRoom) {
                return;
            }


            if (
                currentRoom.owner !==
                userId
            ) {

                showError(
                    "Only the room owner can delete this room."
                );

                return;

            }


            const confirmed =
                window.confirm(
                    "Delete this room permanently?"
                );


            if (!confirmed) {
                return;
            }


            try {

                await set(
                    ref(
                        database,
                        "deletedRoomCodes/"
                        + roomCode
                    ),
                    {
                        deletedAt:
                            Date.now(),

                        deletedBy:
                            userId
                    }
                );


                await remove(
                    ref(
                        database,
                        "rooms/"
                        + roomCode
                    )
                );


                window.location.href =
                    "index.html";

            } catch (error) {

                console.error(
                    "Delete room error:",
                    error
                );

                showError(
                    "Could not delete the room."
                );

            }

        }
    );

}



/* =========================================================
   INITIALISE
========================================================= */

loadRoom();
