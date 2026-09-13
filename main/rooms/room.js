/* =========================================================
   STUDYSPRINT — ROOM PAGE
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "studysprint-67f63.firebaseapp.com",
    databaseURL: "https://studysprint-67f63-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "studysprint-67f63",
    storageBucket: "studysprint-67f63.firebasestorage.app",
    messagingSenderId: "1076120438088",
    appId: "1:1076120438088:web:284c4856998fb607ac1f7d"
};


const app =
    initializeApp(firebaseConfig);


const database =
    getDatabase(app);


/* =========================================================
   ROOM CODE
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const roomCode =
    params.get("code");


/* =========================================================
   ELEMENTS
========================================================= */

const roomName =
    document.getElementById(
        "room-name"
    );


const roomType =
    document.getElementById(
        "room-type"
    );


const displayedCode =
    document.getElementById(
        "room-code"
    );


const memberCount =
    document.getElementById(
        "member-count"
    );


const membersList =
    document.getElementById(
        "members-list"
    );


const welcomeText =
    document.getElementById(
        "welcome-text"
    );


const errorBox =
    document.getElementById(
        "room-error"
    );


const copyButton =
    document.getElementById(
        "copy-code"
    );


const copyMessage =
    document.getElementById(
        "copy-message"
    );


/* =========================================================
   COPY CODE
========================================================= */

copyButton.addEventListener(
    "click",
    async function () {

        if (!roomCode) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                roomCode
            );

            copyMessage.textContent =
                "Code copied!";

        }

        catch {

            copyMessage.textContent =
                "Copy failed — hold to copy the code.";

        }


        setTimeout(
            function () {

                copyMessage.textContent =
                    "";

            },
            2000
        );

    }
);


/* =========================================================
   TABS
========================================================= */

const navButtons =
    document.querySelectorAll(
        ".room-nav-button"
    );


navButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const section =
                    button.dataset.section;


                navButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                document
                    .querySelectorAll(
                        ".room-section"
                    )
                    .forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                const selected =
                    document.getElementById(
                        "section-" +
                        section
                    );


                if (selected) {

                    selected.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   LOAD ROOM
========================================================= */

async function loadRoom() {

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
                "rooms/" +
                roomCode
            );


        const snapshot =
            await get(roomRef);


        if (!snapshot.exists()) {

            showError(
                "This room does not exist."
            );

            return;

        }


        const room =
            snapshot.val();


        renderRoom(room);

    }

    catch (error) {

        console.error(error);

        showError(
            "Could not load this room."
        );

    }

}


/* =========================================================
   RENDER ROOM
========================================================= */

function renderRoom(room) {

    roomName.textContent =
        room.name || "StudySprint Room";


    displayedCode.textContent =
        roomCode;


    const type =
        room.type === "class"
            ? "CLASS ROOM"
            : "FRIENDS ROOM";


    roomType.textContent =
        type;


    const members =
        room.members || {};


    const memberArray =
        Object.entries(
            members
        );


    memberCount.textContent =
        memberArray.length +
        (
            memberArray.length === 1
                ? " member"
                : " members"
        );


    welcomeText.textContent =
        "Welcome to " +
        (
            room.name ||
            "your StudySprint room"
        ) +
        "!";


    renderMembers(
        memberArray
    );

}


/* =========================================================
   MEMBERS
========================================================= */

function renderMembers(
    memberArray
) {

    membersList.innerHTML = "";


    if (memberArray.length === 0) {

        membersList.textContent =
            "No members yet.";

        return;

    }


    memberArray.forEach(
        function ([id, member]) {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "member";


            const icon =
                document.createElement(
                    "div"
                );

            icon.className =
                "member-icon";


            const name =
                member.name ||
                "Student";


            icon.textContent =
                name
                    .charAt(0)
                    .toUpperCase();


            const nameElement =
                document.createElement(
                    "div"
                );

            nameElement.className =
                "member-name";

            nameElement.textContent =
                name;


            const role =
                document.createElement(
                    "div"
                );

            role.className =
                "member-role";

            role.textContent =
                member.role === "owner"
                    ? "Owner"
                    : "Member";


            row.appendChild(
                icon
            );

            row.appendChild(
                nameElement
            );

            row.appendChild(
                role
            );


            membersList.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   ERROR
========================================================= */

function showError(message) {

    errorBox.textContent =
        message;


    roomName.textContent =
        "Room unavailable";


    displayedCode.textContent =
        "------";

}


/* =========================================================
   START
========================================================= */

loadRoom();
