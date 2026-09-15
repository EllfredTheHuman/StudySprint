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


const firebaseConfig = {
    apiKey: "AIzaSyBi3Ge5_pDiEV-scRC-kptDJoHnHmbdw6s",
    authDomain: "studysprint-67f63.firebaseapp.com",
    databaseURL: "https://studysprint-67f63-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "studysprint-67f63",
    storageBucket: "studysprint-67f63.firebasestorage.app",
    messagingSenderId: "1076120438088",
    appId: "1:1076120438088:web:284c4856998fb607ac1f7d"
};


const roomApp =
    initializeApp(firebaseConfig);

const roomDatabase =
    getDatabase(roomApp);


const roomParams =
    new URLSearchParams(
        window.location.search
    );


const roomCode =
    (
        roomParams.get("code")
        || ""
    )
    trim()
    .toUpperCase();


let currentRoom = null;
let stopRoomListener = null;


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


function roomElement(
    id
) {

    return document.getElementById(
        id
    );

}


function roomUsername() {

    return (
        localStorage.getItem(
            "studysprint_username"
        )
        || "Student"
    ).trim();

}


const roomCode =
    (
        roomParams.get("code")
        || ""
    )
    .trim()
    .toUpperCase();


function roomAvatar() {

    return (
        localStorage.getItem(
            "studysprint_avatar"
        )
        || roomUsername()
            .charAt(0)
            .toUpperCase()
            || "S"
    );

}


function roomEscape(
    value
) {

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


function roomText(
    id,
    value
) {

    const element =
        roomElement(id);

    if (element) {

        element.textContent =
            value;

    }

}


function roomShow(
    element
) {

    if (element) {

        element.classList.remove(
            "hidden"
        );

    }

}


function roomHide(
    element
) {

    if (element) {

        element.classList.add(
            "hidden"
        );

    }

}


function roomError(
    message
) {

    const element =
        roomElement(
            "room-error"
        );

    if (!element) {
        return;
    }

    element.textContent =
        message;

    roomShow(element);

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupRoomNavigation() {

    const buttons =
        document.querySelectorAll(
            ".room-nav-button"
        );

    const sections =
        document.querySelectorAll(
            ".room-section"
        );


    function openSection(
        name
    ) {

        sections.forEach(
            function (section) {

                section.classList.toggle(
                    "hidden",
                    section.dataset.section !== name
                );

            }
        );


        buttons.forEach(
            function (button) {

                button.classList.toggle(
                    "active",
                    button.dataset.section === name
                );

            }
        );

    }


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const name =
                        button.dataset.section;

                    if (!name) {
                        return;
                    }

                    openSection(name);

                }
            );

        }
    );


    openSection("home");

}


/* =========================================================
   SYNC CURRENT USER
========================================================= */

async function syncRoomUser() {

    if (!roomCode) {
        return;
    }


    const memberRef =
        ref(
            roomDatabase,
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


        await update(
            memberRef,
            {
                name: roomUsername(),
                avatar: roomAvatar(),
                joinedAt:
                    member.joinedAt
                    || Date.now(),
                role:
                    member.role
                    || "member"
            }
        );

    } catch (error) {

        console.error(
            "Could not sync room user:",
            error
        );

    }

}


/* =========================================================
   LOAD ROOM
========================================================= */

async function loadRoomData() {

    if (!roomCode) {

        roomError(
            "No room code was provided."
        );

        return;

    }


    try {

        const roomRef =
            ref(
                roomDatabase,
                "rooms/"
                + roomCode
            );


        const snapshot =
            await get(roomRef);


        if (!snapshot.exists()) {

            roomError(
                "This room does not exist."
            );

            return;

        }


        currentRoom =
            snapshot.val();


        await syncRoomUser();


        renderRoomData(
            currentRoom
        );


        startRoomListener();


    } catch (error) {

        console.error(
            "Room loading error:",
            error
        );


        roomError(
            "Could not load this room."
        );

    }

}


/* =========================================================
   REAL-TIME ROOM
========================================================= */

function startRoomListener() {

    if (stopRoomListener) {

        stopRoomListener();

    }


    const roomRef =
        ref(
            roomDatabase,
            "rooms/"
            + roomCode
        );


    stopRoomListener =
        onValue(
            roomRef,
            function (snapshot) {

                if (!snapshot.exists()) {

                    roomError(
                        "This room has been deleted."
                    );

                    return;

                }


                currentRoom =
                    snapshot.val();


                renderRoomData(
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
   ROOM HEADER
========================================================= */

function renderRoomData(
    room
) {

    if (!room) {
        return;
    }


    roomText(
        "room-name",
        room.name || "Untitled Room"
    );


    roomText(
        "room-code",
        roomCode
    );


    const typeElement =
        roomElement(
            "room-type"
        );


    if (typeElement) {

        typeElement.textContent =
            String(
                room.type || "friends"
            ).toUpperCase();

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
        roomElement(
            "member-count"
        );


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
        roomElement(
            "members-list"
        );


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

            return String(
                a[1].name || "Student"
            ).localeCompare(
                String(
                    b[1].name || "Student"
                )
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
                || name.charAt(0).toUpperCase();

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
                + roomEscape(avatar)
                + '</div>'

                + '<div class="member-info">'

                + '<strong>'
                + roomEscape(name)
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
        roomElement(
            "leaderboard-list"
        );


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

            return Number(
                b[1].score || 0
            )
            -
            Number(
                a[1].score || 0
            );

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
                || name.charAt(0).toUpperCase();

            const score =
                Number(
                    member.score || 0
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
                + (index + 1)
                + '</span>'

                + '<div class="leaderboard-avatar">'
                + roomEscape(avatar)
                + '</div>'

                + '<div class="leaderboard-name">'
                + roomEscape(name)
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
        roomElement(
            "assignments-list"
        );


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
                b[1].createdAt || 0
            )
            -
            Number(
                a[1].createdAt || 0
            );

        }
    );


    entries.forEach(
        function (entry) {

            const assignment =
                entry[1]
                || {};

            const completed =
                assignment.completed
                && assignment.completed[userId];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "assignment-card";


            card.innerHTML =
                '<div class="assignment-content">'

                + '<span class="assignment-type">'
                + roomEscape(
                    assignment.type
                    || "Custom Goal"
                )
                + '</span>'

                + '<strong>'
                + roomEscape(
                    assignment.title
                    || "Assignment"
                )
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
        roomElement(
            "activity-list"
        );


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
                b[1].createdAt || 0
            )
            -
            Number(
                a[1].createdAt || 0
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
                    + roomEscape(
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
   OWNER
========================================================= */

function updateOwnerControls(
    room
) {

    const button =
        roomElement(
            "delete-room"
        );


    if (!button) {
        return;
    }


    if (
        room.owner === userId
    ) {

        roomShow(button);

    } else {

        roomHide(button);

    }

}


/* =========================================================
   COPY
========================================================= */

function setupCopyCode() {

    const button =
        roomElement(
            "copy-code"
        );


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
                    roomElement(
                        "copy-message"
                    );


                if (message) {

                    message.textContent =
                        "Copied";

                    roomShow(
                        message
                    );


                    setTimeout(
                        function () {

                            roomHide(
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
   LEAVE
========================================================= */

function setupLeaveRoom() {

    const button =
        roomElement(
            "leave-room"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        async function () {

            if (
                !window.confirm(
                    "Leave this room?"
                )
            ) {
                return;
            }


            try {

                await remove(
                    ref(
                        roomDatabase,
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
                    "Leave error:",
                    error
                );


                roomError(
                    "Could not leave the room."
                );

            }

        }
    );

}


/* =========================================================
   DELETE
========================================================= */

function setupDeleteRoom() {

    const button =
        roomElement(
            "delete-room"
        );


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
                return;
            }


            if (
                !window.confirm(
                    "Delete this room permanently?"
                )
            ) {
                return;
            }


            try {

                await set(
                    ref(
                        roomDatabase,
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
                        roomDatabase,
                        "rooms/"
                        + roomCode
                    )
                );


                window.location.href =
                    "index.html";

            } catch (error) {

                console.error(
                    "Delete error:",
                    error
                );


                roomError(
                    "Could not delete the room."
                );

            }

        }
    );

}


/* =========================================================
   BACK
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
   START
========================================================= */

setupRoomNavigation();

setupCopyCode();

setupLeaveRoom();

setupDeleteRoom();

setupBackButton();

loadRoomData();


window.addEventListener(
    "beforeunload",
    function () {

        if (stopRoomListener) {

            stopRoomListener();

        }

    }
);
