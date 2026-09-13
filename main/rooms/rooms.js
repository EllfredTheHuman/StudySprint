/* =========================================================
   STUDYSPRINT — ROOMS
   Firebase + Room Creation + Joining
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyBi3Ge5_pDiEV-scRC-kptDJoHnHmbdw6s",
    authDomain: "studysprint-67f63.firebaseapp.com",
    databaseURL: "https://studysprint-67f63-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "studysprint-67f63",
    storageBucket: "studysprint-67f63.firebasestorage.app",
    messagingSenderId: "1076120438088",
    appId: "1:1076120438088:web:284c4856998fb607ac1f7d"
};


/* =========================================================
   INITIALISE FIREBASE
========================================================= */

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


/* =========================================================
   DOM
========================================================= */

const createRoomButton =
    document.getElementById("create-room-button");

const joinRoomButton =
    document.getElementById("join-room-button");

const roomModal =
    document.getElementById("room-modal");

const modalContent =
    document.getElementById("modal-content");

const closeModalButton =
    document.getElementById("close-modal");

const modalBackdrop =
    document.getElementById("modal-backdrop");

const roomsList =
    document.getElementById("rooms-list");


/* =========================================================
   USER
========================================================= */

let username =
    localStorage.getItem("studysprint_username");

if (!username) {
    username = "Student";
}


/* =========================================================
   ROOM CODE
========================================================= */

function generateRoomCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        code += characters[randomIndex];

    }

    return code;
}


/* =========================================================
   LOCAL ROOMS
========================================================= */

function getLocalRooms() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "studysprint_rooms"
            ) || "[]"
        );

    } catch {

        return [];

    }

}


function saveLocalRooms(rooms) {

    localStorage.setItem(
        "studysprint_rooms",
        JSON.stringify(rooms)
    );

}


/* =========================================================
   MODAL
========================================================= */

function openModal(content) {

    modalContent.innerHTML = content;

    roomModal.classList.remove("hidden");

}


function closeModal() {

    roomModal.classList.add("hidden");

    modalContent.innerHTML = "";

}


closeModalButton.addEventListener(
    "click",
    closeModal
);


modalBackdrop.addEventListener(
    "click",
    closeModal
);


/* =========================================================
   CREATE ROOM SCREEN
========================================================= */

function showCreateRoom() {

    openModal(`
        <h2 class="modal-title">
            Create a Room
        </h2>

        <p class="modal-description">
            Make a room for your class or your friends.
        </p>

        <div class="form-group">

            <label for="room-name">
                Room name
            </label>

            <input
                id="room-name"
                class="form-input"
                type="text"
                maxlength="40"
                placeholder="e.g. Year 8 Maths"
                autocomplete="off"
            >

        </div>

        <div class="form-group">

            <label>
                Room type
            </label>

            <div class="room-type-options">

                <button
                    type="button"
                    class="room-type selected"
                    id="class-room"
                >
                    <strong>📚 Class</strong>
                    <span>For school classes</span>
                </button>

                <button
                    type="button"
                    class="room-type"
                    id="friend-room"
                >
                    <strong>👥 Friends</strong>
                    <span>For your group</span>
                </button>

            </div>

        </div>

        <button
            class="modal-submit"
            id="create-room-submit"
        >
            Create Room
        </button>
    `);


    let roomType = "class";


    const classRoomButton =
        document.getElementById("class-room");

    const friendRoomButton =
        document.getElementById("friend-room");


    classRoomButton.addEventListener(
        "click",
        function () {

            roomType = "class";

            classRoomButton.classList.add(
                "selected"
            );

            friendRoomButton.classList.remove(
                "selected"
            );

        }
    );


    friendRoomButton.addEventListener(
        "click",
        function () {

            roomType = "friends";

            friendRoomButton.classList.add(
                "selected"
            );

            classRoomButton.classList.remove(
                "selected"
            );

        }
    );


    document
        .getElementById("create-room-submit")
        .addEventListener(
            "click",
            function () {

                createRoom(roomType);

            }
        );

}


/* =========================================================
   CREATE ROOM
========================================================= */

async function createRoom(roomType) {

    const roomNameInput =
        document.getElementById("room-name");


    const roomName =
        roomNameInput.value.trim();


    if (!roomName) {

        roomNameInput.focus();

        roomNameInput.placeholder =
            "Enter a room name first";

        return;

    }


    const submitButton =
        document.getElementById(
            "create-room-submit"
        );


    submitButton.disabled = true;

    submitButton.textContent =
        "Creating...";


    try {

        let roomCode =
            generateRoomCode();


        let roomReference =
            ref(
                database,
                "rooms/" + roomCode
            );


        let existingRoom =
            await get(roomReference);


        while (existingRoom.exists()) {

            roomCode =
                generateRoomCode();


            roomReference =
                ref(
                    database,
                    "rooms/" + roomCode
                );


            existingRoom =
                await get(roomReference);

        }


        const roomData = {

            name: roomName,

            type: roomType,

            owner: username,

            createdAt: Date.now(),

            members: {

                [username]: {

                    name: username,

                    joinedAt: Date.now(),

                    role:
                        roomType === "class"
                            ? "student"
                            : "member"

                }

            },

            announcements: {},

            assignments: {},

            challenges: {}

        };


        await set(
            roomReference,
            roomData
        );


        const localRooms =
            getLocalRooms();


        localRooms.push({

            code: roomCode,

            name: roomName,

            type: roomType,

            owner: username

        });


        saveLocalRooms(localRooms);


        closeModal();

        renderRooms();


        alert(
            "Room created!\n\nRoom code: " +
            roomCode
        );


    } catch (error) {

        console.error(
            "Could not create room:",
            error
        );


        submitButton.disabled = false;

        submitButton.textContent =
            "Create Room";


        alert(
            "We couldn't create the room.\n\n" +
            "Check that Firebase Realtime Database " +
            "is enabled and its rules allow testing."
        );

    }

}


/* =========================================================
   JOIN ROOM SCREEN
========================================================= */

function showJoinRoom() {

    openModal(`
        <h2 class="modal-title">
            Join a Room
        </h2>

        <p class="modal-description">
            Enter the 6-character code given to you.
        </p>

        <div class="form-group">

            <label for="room-code">
                Room code
            </label>

            <input
                id="room-code"
                class="form-input"
                type="text"
                maxlength="6"
                placeholder="ABC123"
                autocomplete="off"
            >

        </div>

        <button
            class="modal-submit"
            id="join-room-submit"
        >
            Join Room
        </button>
    `);


    const codeInput =
        document.getElementById("room-code");


    codeInput.addEventListener(
        "input",
        function () {

            codeInput.value =
                codeInput.value
                    .toUpperCase()
                    .replace(
                        /[^A-Z0-9]/g,
                        ""
                    );

        }
    );


    document
        .getElementById("join-room-submit")
        .addEventListener(
            "click",
            function () {

                joinRoom();

            }
        );

}


/* =========================================================
   JOIN ROOM
========================================================= */

async function joinRoom() {

    const codeInput =
        document.getElementById("room-code");


    const code =
        codeInput.value.trim().toUpperCase();


    if (code.length !== 6) {

        codeInput.focus();

        return;

    }


    const submitButton =
        document.getElementById(
            "join-room-submit"
        );


    submitButton.disabled = true;

    submitButton.textContent =
        "Checking...";


    try {

        const roomReference =
            ref(
                database,
                "rooms/" + code
            );


        const snapshot =
            await get(roomReference);


        if (!snapshot.exists()) {

            alert(
                "That room doesn't exist."
            );


            submitButton.disabled = false;

            submitButton.textContent =
                "Join Room";

            return;

        }


        const room =
            snapshot.val();


        await set(
            ref(
                database,
                "rooms/" +
                code +
                "/members/" +
                username
            ),
            {

                name: username,

                joinedAt: Date.now(),

                role:
                    room.type === "class"
                        ? "student"
                        : "member"

            }
        );


        const localRooms =
            getLocalRooms();


        const alreadyJoined =
            localRooms.some(
                function (localRoom) {

                    return (
                        localRoom.code === code
                    );

                }
            );


        if (!alreadyJoined) {

            localRooms.push({

                code: code,

                name: room.name,

                type: room.type,

                owner: room.owner

            });


            saveLocalRooms(
                localRooms
            );

        }


        closeModal();

        renderRooms();


        alert(
            "Joined " +
            room.name +
            "!"
        );


    } catch (error) {

        console.error(
            "Could not join room:",
            error
        );


        submitButton.disabled = false;

        submitButton.textContent =
            "Join Room";


        alert(
            "We couldn't join that room.\n\n" +
            "Check your Firebase connection."
        );

    }

}


/* =========================================================
   OPEN ROOM
========================================================= */

function openRoom(room) {

    window.location.href =
        "room.html?code=" +
        encodeURIComponent(room.code);

}


/* =========================================================
   RENDER ROOMS
========================================================= */

function renderRooms() {

    const rooms =
        getLocalRooms();


    if (rooms.length === 0) {

        roomsList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    🏠
                </div>

                <h3>
                    No rooms yet
                </h3>

                <p>
                    Create a room for your class or invite your friends.
                </p>

            </div>
        `;

        return;

    }


    roomsList.innerHTML = "";


    rooms.forEach(
        function (room) {

            const card =
                document.createElement("div");


            card.className =
                "room-card";


            const roomInfo =
                document.createElement("div");

            roomInfo.className =
                "room-info";


            const roomName =
                document.createElement("h3");

            roomName.className =
                "room-name";

            roomName.textContent =
                room.name;


            const roomMeta =
                document.createElement("div");

            roomMeta.className =
                "room-meta";


            roomMeta.textContent =
                (
                    room.type === "class"
                        ? "📚 Class"
                        : "👥 Friends"
                ) +
                " · Code " +
                room.code;


            const arrow =
                document.createElement("div");

            arrow.className =
                "room-arrow";

            arrow.textContent =
                "›";


            roomInfo.appendChild(
                roomName
            );

            roomInfo.appendChild(
                roomMeta
            );


            card.appendChild(
                roomInfo
            );

            card.appendChild(
                arrow
            );


            card.addEventListener(
                "click",
                function () {

                    openRoom(room);

                }
            );


            roomsList.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   BUTTON EVENTS
========================================================= */

createRoomButton.addEventListener(
    "click",
    showCreateRoom
);


joinRoomButton.addEventListener(
    "click",
    showJoinRoom
);


/* =========================================================
   START
========================================================= */

renderRooms();


console.log(
    "StudySprint Rooms Firebase connected."
);

console.log(
    "Realtime Database ready."
);
