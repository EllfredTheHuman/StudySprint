import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    get,
    set
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

import {
    generateRoomCode,
    findAvailableRoomCode
} from "./room-code.js";


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


const createButton = document.getElementById("create-room-button");
const joinButton = document.getElementById("join-room-button");

const modal = document.getElementById("room-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const closeModalButton = document.getElementById("close-modal");
const modalContent = document.getElementById("modal-content");

const roomsList = document.getElementById("rooms-list");


let username = localStorage.getItem("studysprint_username") || "Student";

let userId = localStorage.getItem("studysprint_user_id");

if (!userId) {
    userId =
        "user_" +
        Date.now() +
        "_" +
        Math.random().toString(36).slice(2, 8);

    localStorage.setItem("studysprint_user_id", userId);
}


let savedRooms = [];

try {
    savedRooms = JSON.parse(
        localStorage.getItem("studysprint_rooms") || "[]"
    );
} catch {
    savedRooms = [];
}


function saveRooms() {
    localStorage.setItem(
        "studysprint_rooms",
        JSON.stringify(savedRooms)
    );
}


function openModal(content) {
    modalContent.innerHTML = content;
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
}


function closeModal() {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
}


function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}


function showError(message) {
    const existing = document.getElementById("room-modal-error");

    if (existing) {
        existing.textContent = message;
        return;
    }

    const error = document.createElement("div");

    error.id = "room-modal-error";
    error.className = "modal-error";
    error.textContent = message;

    modalContent.appendChild(error);
}


function showCreateRoom() {

    openModal(`
        <div class="modal-heading">
            <div class="modal-icon">🏠</div>

            <div>
                <p class="modal-eyebrow">NEW ROOM</p>
                <h2>Create a Room</h2>
            </div>
        </div>

        <p class="modal-description">
            Make a space for your class or your friends.
        </p>

        <label class="input-label" for="room-name-input">
            Room name
        </label>

        <input
            id="room-name-input"
            class="modal-input"
            type="text"
            maxlength="40"
            placeholder="e.g. Year 8 Science"
            autocomplete="off"
        >

        <p class="input-label">Room type</p>

        <div class="room-type-grid">

            <button
                type="button"
                class="room-type-option selected"
                data-room-type="class"
            >
                <span class="type-icon">🏫</span>

                <span>
                    <strong>Class</strong>
                    <small>For school classes</small>
                </span>
            </button>

            <button
                type="button"
                class="room-type-option"
                data-room-type="friends"
            >
                <span class="type-icon">👥</span>

                <span>
                    <strong>Friends</strong>
                    <small>For your friend group</small>
                </span>
            </button>

        </div>

        <button
            type="button"
            class="modal-primary-button"
            id="confirm-create"
        >
            Create Room
        </button>
    `);


    let selectedType = "class";

    document.querySelectorAll(".room-type-option").forEach(button => {

        button.addEventListener("click", () => {

            document.querySelectorAll(".room-type-option").forEach(option => {
                option.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedType = button.dataset.roomType;
        });

    });


    document.getElementById("confirm-create").addEventListener(
        "click",
        async () => {

            const nameInput =
                document.getElementById("room-name-input");

            const roomName =
                nameInput.value.trim();

            if (!roomName) {
                showError("Give your room a name first.");
                nameInput.focus();
                return;
            }

            const confirmButton =
                document.getElementById("confirm-create");

            confirmButton.disabled = true;
            confirmButton.textContent = "Creating...";


            try {

                const code =
                    await findAvailableRoomCode(database);


                const roomData = {

                    name: roomName,

                    type: selectedType,

                    owner: userId,

                    ownerName: username,

                    createdAt: Date.now(),

                    members: {

                        [userId]: {

                            name: username,

                            joinedAt: Date.now(),

                            role: "owner",

                            score: 0,

                            weeklyScore: 0,

                            quizzes: 0,

                            streak: 0

                        }

                    },

                    announcements: {},

                    assignments: {},

                    challenges: {}

                };


                await set(
                    ref(database, "rooms/" + code),
                    roomData
                );


                if (!savedRooms.some(room => room.code === code)) {

                    savedRooms.push({

                        code: code,

                        name: roomName,

                        type: selectedType

                    });

                    saveRooms();
                }


                window.location.href =
                    "room.html?code=" +
                    encodeURIComponent(code);

            } catch (error) {

                console.error(error);

                confirmButton.disabled = false;
                confirmButton.textContent = "Create Room";

                showError(
                    "Couldn't create the room. Check your Firebase connection."
                );

            }

        }
    );
}


function showJoinRoom() {

    openModal(`
        <div class="modal-heading">
            <div class="modal-icon">🔗</div>

            <div>
                <p class="modal-eyebrow">JOIN ROOM</p>
                <h2>Enter Room Code</h2>
            </div>
        </div>

        <p class="modal-description">
            Enter the six-character code shared by your class or friends.
        </p>

        <label class="input-label" for="join-code-input">
            Room code
        </label>

        <input
            id="join-code-input"
            class="modal-input room-code-input"
            type="text"
            maxlength="6"
            placeholder="ABC123"
            autocomplete="off"
            autocapitalize="characters"
        >

        <button
            type="button"
            class="modal-primary-button"
            id="confirm-join"
        >
            Join Room
        </button>
    `);


    const codeInput =
        document.getElementById("join-code-input");


    codeInput.addEventListener("input", () => {

        codeInput.value =
            codeInput.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
                .slice(0, 6);

    });


    document.getElementById("confirm-join").addEventListener(
        "click",
        async () => {

            const code =
                codeInput.value.trim().toUpperCase();

            if (code.length !== 6) {
                showError("Room codes are 6 characters long.");
                codeInput.focus();
                return;
            }


            const joinConfirm =
                document.getElementById("confirm-join");

            joinConfirm.disabled = true;
            joinConfirm.textContent = "Checking...";


            try {

                const roomSnapshot =
                    await get(
                        ref(database, "rooms/" + code)
                    );


                if (!roomSnapshot.exists()) {

                    joinConfirm.disabled = false;
                    joinConfirm.textContent = "Join Room";

                    showError(
                        "That room doesn't exist. Check the code and try again."
                    );

                    return;
                }


                const room =
                    roomSnapshot.val();


                const memberPath =
                    "rooms/" +
                    code +
                    "/members/" +
                    userId;


                await set(
                    ref(database, memberPath),
                    {

                        name: username,

                        joinedAt: Date.now(),

                        role: "member",

                        score: 0,

                        weeklyScore: 0,

                        quizzes: 0,

                        streak: 0

                    }
                );


                if (!savedRooms.some(room => room.code === code)) {

                    savedRooms.push({

                        code: code,

                        name: room.name || "Room",

                        type: room.type || "friends"

                    });

                    saveRooms();

                }


                window.location.href =
                    "room.html?code=" +
                    encodeURIComponent(code);


            } catch (error) {

                console.error(error);

                joinConfirm.disabled = false;
                joinConfirm.textContent = "Join Room";

                showError(
                    "Couldn't join the room. Check your Firebase connection."
                );

            }

        }
    );


    codeInput.focus();
}


function renderRooms() {

    if (!savedRooms.length) {

        roomsList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    🏠
                </div>

                <h3>No rooms yet</h3>

                <p>
                    Create a room for your class or invite your friends.
                </p>

            </div>
        `;

        return;
    }


    roomsList.innerHTML = "";


    savedRooms.forEach(room => {

        const card = document.createElement("button");

        card.type = "button";
        card.className = "room-card";


        const typeText =
            room.type === "class"
                ? "CLASS"
                : "FRIENDS";


        const typeIcon =
            room.type === "class"
                ? "🏫"
                : "👥";


        card.innerHTML = `

            <div class="room-card-icon">
                ${typeIcon}
            </div>

            <div class="room-card-info">

                <span class="room-card-type">
                    ${typeText}
                </span>

                <h3>
                    ${escapeHTML(room.name || "Untitled Room")}
                </h3>

                <p>
                    Code: <strong>${escapeHTML(room.code)}</strong>
                </p>

            </div>

            <div class="room-card-arrow">
                →
            </div>

        `;


        card.addEventListener("click", () => {

            window.location.href =
                "room.html?code=" +
                encodeURIComponent(room.code);

        });


        roomsList.appendChild(card);

    });

}


createButton.addEventListener(
    "click",
    showCreateRoom
);


joinButton.addEventListener(
    "click",
    showJoinRoom
);


closeModalButton.addEventListener(
    "click",
    closeModal
);


modalBackdrop.addEventListener(
    "click",
    closeModal
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);


renderRooms();
