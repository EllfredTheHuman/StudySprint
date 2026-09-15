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

let userId =
    localStorage.getItem(
        "studysprint_user_id"
    );


if (!userId) {

    userId =
        "user_"
        + Date.now()
        + "_"
        + Math.random()
            .toString(36)
            .substring(2, 8);

    localStorage.setItem(
        "studysprint_user_id",
        userId
    );

}


function getUsername() {

    return (
        localStorage.getItem(
            "studysprint_username"
        )
        || "Student"
    ).trim();

}


function getAvatar() {

    return (
        localStorage.getItem(
            "studysprint_avatar"
        )
        || "S"
    );

}


/* =========================================================
   ROOM
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const roomCode =
    (
        params.get("code")
        || ""
    )
    .trim()
    .toUpperCase();


let currentRoom =
    null;


let roomUnsubscribe =
    null;


/* =========================================================
   ELEMENT HELPERS
========================================================= */

function get(id) {

    return document.getElementById(id);

}


function setText(
    id,
    value
) {

    const element =
        get(id);

    if (element) {

        element.textContent =
            value;

    }

}


function showElement(
    element
) {

    if (element) {

        element.classList.remove(
            "hidden"
        );

    }

}


function hideElement(
    element
) {

    if (element) {

        element.classList.add(
            "hidden"
        );

    }

}


function escapeHtml(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   ERROR
========================================================= */

function showError(
    message
) {

    const element =
        get("room-error");

    if (!element) {
        return;
    }

    element.textContent =
        message;

    showElement(element);

}


function clearError() {

    const element =
        get("room-error");

    if (!element) {
        return;
    }

    element.textContent =
        "";

    hideElement(element);

}


/* =========================================================
   ROOM NAVIGATION
========================================================= */

function setupNavigation() {

    const buttons =
        document.querySelectorAll(
            ".room-nav-button"
        );


    const sections =
        document.querySelectorAll(
            ".room-section"
        );


    if (!buttons.length) {
        return;
    }


    function showSection(
        sectionName
    ) {

        buttons.forEach(
            function (button) {

                const active =
                    button.dataset.section ===
                    sectionName;


                button.classList.toggle(
                    "active",
                    active
                );

            }
        );


        sections.forEach(
            function (section) {

                const active =
                    section.dataset.section ===
                    sectionName;


                section.classList.toggle(
                    "hidden",
                    !active
                );

            }
        );

    }


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const sectionName =
                        button.dataset.section;


                    if (!sectionName) {
                        return;
                    }


                    showSection(
                        sectionName
                    );

                }
            );

        }
    );


    showSection(
        "home"
    );

}


/* =========================================================
   SYNC PROFILE TO ROOM
========================================================= */

async function syncProfile() {

    if (!roomCode) {
        return;
    }


    const memberRef =
        ref(
            database,
            "rooms/"
            + roomCode
            + "/members/"
            + userId
        );


    try {

        const snapshot =
            await get(memberRef);


        if (!snapshot.exists()) {
            return;
        }


        const member =
            snapshot.val()
            || {};


        const name =
            getUsername();


        const avatar =
            getAvatar();


        const changes = {

            name: name,

            avatar: avatar

        };


        if (!member.joinedAt) {

            changes.joinedAt =
                Date.now();

        }


        await update(
            memberRef,
            changes
        );


    } catch (error) {

        console.error(
            "Profile sync error:",
            error
        );

    }

}


/* =========================================================
   LOAD ROOM
========================================================= */

async function loadRoom() {

    clearError();


    if (!roomCode) {

        showError(
            "No room code was provided."
        );

        return;

    }


    try {

        const roomRef =
            ref(
                database,
                "rooms/"
                + roomCode
            );


        const snapshot =
            await get(roomRef);


        if (!snapshot.exists()) {

            showError(
                "This room does not exist."
            );

            return;

        }


        currentRoom =
            snapshot.val();


        if (
            currentRoom.deleted === true
        ) {

            showError(
                "This room has been deleted."
            );

            return;

        }


        await syncProfile();


        renderRoom(
            currentRoom
        );


        startRoomListener();


    } catch (error) {

        console.error(
            "Room loading error:",
            error
        );


        showError(
            "Could not load this room."
        );

    }

}


/* =========================================================
   REAL-TIME LISTENER
========================================================= */

function startRoomListener() {

    if (roomUnsubscribe) {

        roomUnsubscribe();

    }


    const roomRef =
        ref(
            database,
            "rooms/"
            + roomCode
        );


    roomUnsubscribe =
        onValue(
            roomRef,
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

function renderRoom(
    room
) {

    if (!room) {
        return;
    }


    setText(
        "room-name",
        room.name
        || "Untitled Room"
    );


    setText(
        "room-code",
        roomCode
    );


    const roomType =
        get("room-type");


    if (roomType) {

        const type =
            String(
                room.type
                || "friends"
            ).toLowerCase();


        roomType.textContent =
            type === "class"
                ? "CLASS"
                : "FRIENDS";

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
        room.activity
    );


    updateOwnerControls(
        room
    );

}


/* =========================================================
   MEMBER COUNT
========================================================= */

function renderMemberCount(
    members
) {

    const element =
        get("member-count");


    if (!element) {
        return;
    }


    const count =
        members
            ? Object.keys(members).length
            : 0;


    element.textContent =
        count
        + (
            count === 1
                ? " member"
                : " members"
        );

}


/* =========================================================
   MEMBERS
========================================================= */

function renderMembers(
    members
) {

    const container =
        get("members-list");


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


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
                );


            const second =
                String(
                    b[1].name
                    || "Student"
                );


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


            const avatar =
                member.avatar
                || name
                    .charAt(0)
                    .toUpperCase();


            const role =
                member.role
                || "member";


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "member-card";


            if (
                memberId === userId
            ) {

                card.classList.add(
                    "current-user"
                );

            }


            card.innerHTML =

                '<div class="member-avatar">'
                + escapeHtml(avatar)
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
        get("leaderboard-list");


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


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

            const firstScore =
                Number(
                    a[1].score
                    || 0
                );


            const secondScore =
                Number(
                    b[1].score
                    || 0
                );


            return secondScore -
                firstScore;

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


            const avatar =
                member.avatar
                || name
                    .charAt(0)
                    .toUpperCase();


            const score =
                Number(
                    member.score
                    || 0
                );


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
                + escapeHtml(avatar)
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
        get("assignments-list");


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


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
            ) -
            Number(
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


            const title =
                assignment.title
                || "Assignment";


            const type =
                assignment.type
                || "Custom Goal";


            const completed =
                assignment.completed &&
                assignment.completed[userId];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "assignment-card";


            card.innerHTML =

                '<div class="assignment-content">'

                + '<span class="assignment-type">'
                + escapeHtml(type)
                + '</span>'

                + '<strong>'
                + escapeHtml(title)
                + '</strong>'

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
    activity
) {

    const container =
        get("activity-list");


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    const entries =
        activity
            ? Object.entries(activity)
            : [];


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
            ) -
            Number(
                a[1].createdAt
                || 0
            );

        }
    );


    entries
        .slice(0, 20)
        .forEach(
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
                    + '</strong>';


                container.appendChild(
                    row
                );

            }
        );

}


/* =========================================================
   OWNER CONTROLS
========================================================= */

function updateOwnerControls(
    room
) {

    const deleteButton =
        get("delete-room");


    if (!deleteButton) {
        return;
    }


    const isOwner =
        room.owner === userId;


    if (isOwner) {

        showElement(
            deleteButton
        );

    } else {

        hideElement(
            deleteButton
        );

    }

}


/* =========================================================
   COPY CODE
========================================================= */

function setupCopyButton() {

    const button =
        get("copy-code");


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        async function () {

            try {

                await navigator.clipboard.writeText(
                    roomCode
                );


                const message =
                    get("copy-message");


                if (message) {

                    message.textContent =
                        "Copied";

                    showElement(
                        message
                    );


                    setTimeout(
                        function () {

                            hideElement(
                                message
                            );

                        },
                        1500
                    );

                }

            } catch (error) {

                console.error(
                    "Copy error:",
                    error
                );

            }

        }
    );

}


/* =========================================================
   LEAVE ROOM
========================================================= */

function setupLeaveButton() {

    const button =
        get("leave-room");


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        async function () {

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
   DELETE ROOM
========================================================= */

function setupDeleteButton() {

    const button =
        get("delete-room");


    if (!button) {
        return;
    }


    button.addEventListener(
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
   BACK BUTTON
========================================================= */

function setupBackButton() {

    const button =
        document.querySelector(
            ".back-button"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );

}


/* =========================================================
   CLEAN UP
========================================================= */

window.addEventListener(
    "beforeunload",
    function () {

        if (roomUnsubscribe) {

            roomUnsubscribe();

        }

    }
);


/* =========================================================
   START
========================================================= */

setupNavigation();

setupCopyButton();

setupLeaveButton();

setupDeleteButton();

setupBackButton();

loadRoom();
