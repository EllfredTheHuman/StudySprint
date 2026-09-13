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



/* =========================================================
   USER
========================================================= */

let userId =
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


let username =
    localStorage.getItem(
        "studysprint_username"
    ) || "Student";



/* =========================================================
   ELEMENTS
========================================================= */

const createRoomButton =
    document.getElementById(
        "create-room-button"
    );

const joinRoomButton =
    document.getElementById(
        "join-room-button"
    );

const roomsList =
    document.getElementById(
        "rooms-list"
    );

const roomModal =
    document.getElementById(
        "room-modal"
    );

const modalBackdrop =
    document.getElementById(
        "modal-backdrop"
    );

const closeModalButton =
    document.getElementById(
        "close-modal"
    );

const modalContent =
    document.getElementById(
        "modal-content"
    );



/* =========================================================
   DELETED ROOMS
========================================================= */

/*
    Deleted room codes are stored locally.

    This means that once a user deletes a room,
    that room code is permanently hidden from
    their Rooms page on that browser.
*/

function getDeletedRoomCodes() {

    try {

        const saved =
            localStorage.getItem(
                "studysprint_deleted_rooms"
            );


        if (!saved) {
            return [];
        }


        const parsed =
            JSON.parse(saved);


        if (!Array.isArray(parsed)) {
            return [];
        }


        return parsed.map(
            code =>
                String(code).toUpperCase()
        );

    } catch {

        return [];

    }

}



function markRoomAsDeleted(roomCode) {

    const code =
        String(roomCode).toUpperCase();


    const deletedRooms =
        getDeletedRoomCodes();


    if (
        !deletedRooms.includes(code)
    ) {

        deletedRooms.push(code);

    }


    localStorage.setItem(
        "studysprint_deleted_rooms",
        JSON.stringify(deletedRooms)
    );

}



function isRoomDeleted(roomCode) {

    const code =
        String(roomCode).toUpperCase();


    return getDeletedRoomCodes()
        .includes(code);

}



/* =========================================================
   USER ROOMS
========================================================= */

async function loadRooms() {

    roomsList.innerHTML = `
        <div class="loading-state">
            Loading rooms...
        </div>
    `;


    try {

        const roomsRef =
            ref(
                database,
                "rooms"
            );


        const snapshot =
            await get(roomsRef);


        if (!snapshot.exists()) {

            showEmptyState();
            return;

        }


        const allRooms =
            snapshot.val();


        const rooms =
            [];


        Object.keys(allRooms)
            .forEach(code => {

                /*
                    NEVER show a room that this
                    user has permanently deleted.
                */

                if (
                    isRoomDeleted(code)
                ) {

                    return;

                }


                const room =
                    allRooms[code];


                if (!room) {
                    return;
                }


                const members =
                    room.members || {};


                /*
                    Only show rooms where the
                    current user is actually a member.
                */

                if (
                    members[userId]
                ) {

                    rooms.push({
                        code: code,
                        room: room
                    });

                }

            });


        if (rooms.length === 0) {

            showEmptyState();
            return;

        }


        renderRooms(rooms);


    } catch (error) {

        console.error(error);


        roomsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Couldn't load rooms
                </h3>

                <p>
                    Check your connection and try again.
                </p>
            </div>
        `;

    }

}



/* =========================================================
   RENDER ROOMS
========================================================= */

function renderRooms(rooms) {

    roomsList.innerHTML = "";


    rooms.forEach(
        ({ code, room }) => {

            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";

            card.className =
                "room-card";


            card.addEventListener(
                "click",
                () => {

                    if (
                        isRoomDeleted(code)
                    ) {
                        return;
                    }


                    window.location.href =
                        "room.html?code=" +
                        encodeURIComponent(
                            code
                        );

                }
            );


            const top =
                document.createElement(
                    "div"
                );

            top.className =
                "room-card-top";


            const icon =
                document.createElement(
                    "div"
                );

            icon.className =
                "room-card-icon";

            icon.textContent =
                room.type === "class"
                    ? "🏫"
                    : "👥";


            const type =
                document.createElement(
                    "span"
                );

            type.className =
                "room-card-type";

            type.textContent =
                room.type === "class"
                    ? "CLASS"
                    : "FRIENDS";


            top.appendChild(icon);
            top.appendChild(type);


            const name =
                document.createElement(
                    "h3"
                );

            name.className =
                "room-card-name";

            name.textContent =
                room.name ||
                "StudySprint Room";


            const members =
                room.members || {};


            const memberCount =
                Object.keys(
                    members
                ).length;


            const info =
                document.createElement(
                    "p"
                );

            info.className =
                "room-card-info";

            info.textContent =
                memberCount === 1
                    ? "1 member"
                    : memberCount +
                      " members";


            const codeElement =
                document.createElement(
                    "span"
                );

            codeElement.className =
                "room-card-code";

            codeElement.textContent =
                code.toUpperCase();


            card.appendChild(top);
            card.appendChild(name);
            card.appendChild(info);
            card.appendChild(codeElement);


            roomsList.appendChild(card);

        }
    );

}



/* =========================================================
   EMPTY STATE
========================================================= */

function showEmptyState() {

    roomsList.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">
                🏠
            </div>

            <h3>
                No rooms yet
            </h3>

            <p>
                Create a room for your class
                or invite your friends.
            </p>

        </div>
    `;

}



/* =========================================================
   CREATE ROOM MODAL
========================================================= */

function openCreateRoomModal() {

    modalContent.innerHTML = `
        <div class="modal-eyebrow">
            NEW ROOM
        </div>

        <h2>
            Create a Room
        </h2>

        <p class="modal-description">
            Choose what kind of group you're creating.
        </p>

        <label for="room-name-input">
            Room name
        </label>

        <input
            id="room-name-input"
            type="text"
            placeholder="e.g. Year 8 Science"
            maxlength="40"
        >

        <label>
            Room type
        </label>

        <div class="room-type-options">

            <button
                type="button"
                class="room-type-option selected"
                data-room-type="class"
            >
                <span class="room-option-icon">
                    🏫
                </span>

                <span>
                    <strong>
                        Class
                    </strong>

                    <small>
                        For school classes
                    </small>
                </span>

            </button>


            <button
                type="button"
                class="room-type-option"
                data-room-type="friends"
            >
                <span class="room-option-icon">
                    👥
                </span>

                <span>
                    <strong>
                        Friends
                    </strong>

                    <small>
                        For your friend group
                    </small>
                </span>

            </button>

        </div>


        <button
            id="confirm-create-room"
            class="primary-button"
            type="button"
        >
            Create Room
        </button>

        <p
            id="create-room-message"
            class="form-message"
        ></p>
    `;


    let selectedType =
        "class";


    document
        .querySelectorAll(
            ".room-type-option"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".room-type-option"
                        )
                        .forEach(
                            option => {
                                option.classList.remove(
                                    "selected"
                                );
                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    selectedType =
                        button.dataset.roomType;

                }
            );

        });


    document
        .getElementById(
            "confirm-create-room"
        )
        .addEventListener(
            "click",
            () => {

                createRoom(
                    selectedType
                );

            }
        );


    openModal();

}



/* =========================================================
   CREATE ROOM
========================================================= */

async function createRoom(type) {

    const nameInput =
        document.getElementById(
            "room-name-input"
        );

    const message =
        document.getElementById(
            "create-room-message"
        );

    const button =
        document.getElementById(
            "confirm-create-room"
        );


    const name =
        nameInput.value.trim();


    if (!name) {

        message.textContent =
            "Give your room a name.";

        return;

    }


    try {

        button.disabled = true;

        button.textContent =
            "Creating...";


        const code =
            await findAvailableRoomCode(
                database
            );


        const now =
            Date.now();


        const roomData = {

            name: name,

            type: type,

            owner: userId,

            ownerName: username,

            createdAt: now,

            members: {

                [userId]: {

                    name: username,

                    joinedAt: now,

                    role: "owner"

                }

            },

            announcements: {},

            assignments: {},

            challenges: {},

            activity: {}

        };


        await set(
            ref(
                database,
                "rooms/" + code
            ),
            roomData
        );


        /*
            Make sure a newly created room
            isn't accidentally marked deleted.
        */

        removeDeletedRoomMark(
            code
        );


        window.location.href =
            "room.html?code=" +
            encodeURIComponent(code);


    } catch (error) {

        console.error(error);


        message.textContent =
            "Could not create the room.";

        button.disabled =
            false;

        button.textContent =
            "Create Room";

    }

}



/* =========================================================
   JOIN ROOM MODAL
========================================================= */

function openJoinRoomModal() {

    modalContent.innerHTML = `
        <div class="modal-eyebrow">
            JOIN ROOM
        </div>

        <h2>
            Join a Room
        </h2>

        <p class="modal-description">
            Enter the six-character room code.
        </p>

        <label for="join-code-input">
            Room code
        </label>

        <input
            id="join-code-input"
            type="text"
            placeholder="ABC123"
            maxlength="6"
            autocomplete="off"
            autocapitalize="characters"
        >

        <button
            id="confirm-join-room"
            class="primary-button"
            type="button"
        >
            Join Room
        </button>

        <p
            id="join-room-message"
            class="form-message"
        ></p>
    `;


    const input =
        document.getElementById(
            "join-code-input"
        );


    input.addEventListener(
        "input",
        () => {

            input.value =
                input.value
                    .toUpperCase()
                    .replace(
                        /[^A-Z0-9]/g,
                        ""
                    )
                    .slice(0, 6);

        }
    );


    document
        .getElementById(
            "confirm-join-room"
        )
        .addEventListener(
            "click",
            joinRoom
        );


    openModal();


    setTimeout(
        () => {
            input.focus();
        },
        100
    );

}



/* =========================================================
   JOIN ROOM
========================================================= */

async function joinRoom() {

    const input =
        document.getElementById(
            "join-code-input"
        );

    const message =
        document.getElementById(
            "join-room-message"
        );

    const button =
        document.getElementById(
            "confirm-join-room"
        );


    const code =
        input.value
            .trim()
            .toUpperCase();


    if (code.length !== 6) {

        message.textContent =
            "Enter a six-character room code.";

        return;

    }


    /*
        A room previously deleted by this user
        can NEVER be joined again from this browser.
    */

    if (
        isRoomDeleted(code)
    ) {

        message.textContent =
            "This room has been deleted.";

        return;

    }


    try {

        button.disabled = true;

        button.textContent =
            "Checking...";


        const roomRef =
            ref(
                database,
                "rooms/" + code
            );


        const snapshot =
            await get(roomRef);


        if (!snapshot.exists()) {

            message.textContent =
                "That room does not exist.";

            button.disabled =
                false;

            button.textContent =
                "Join Room";

            return;

        }


        const room =
            snapshot.val();


        const members =
            room.members || {};


        /*
            If the user is already in the room,
            just open it.
        */

        if (!members[userId]) {

            await set(
                ref(
                    database,
                    "rooms/" +
                    code +
                    "/members/" +
                    userId
                ),
                {
                    name: username,

                    joinedAt:
                        Date.now(),

                    role:
                        "member"
                }
            );

        }


        window.location.href =
            "room.html?code=" +
            encodeURIComponent(code);


    } catch (error) {

        console.error(error);


        message.textContent =
            "Could not join the room.";

        button.disabled =
            false;

        button.textContent =
            "Join Room";

    }

}



/* =========================================================
   REMOVE DELETED MARK
========================================================= */

function removeDeletedRoomMark(
    roomCode
) {

    const code =
        String(roomCode).toUpperCase();


    const remaining =
        getDeletedRoomCodes()
            .filter(
                item => item !== code
            );


    localStorage.setItem(
        "studysprint_deleted_rooms",
        JSON.stringify(remaining)
    );

}



/* =========================================================
   MODAL
========================================================= */

function openModal() {

    roomModal.classList.remove(
        "hidden"
    );

}



function closeModal() {

    roomModal.classList.add(
        "hidden"
    );

    modalContent.innerHTML = "";

}



createRoomButton.addEventListener(
    "click",
    openCreateRoomModal
);


joinRoomButton.addEventListener(
    "click",
    openJoinRoomModal
);


closeModalButton.addEventListener(
    "click",
    closeModal
);


modalBackdrop.addEventListener(
    "click",
    closeModal
);



/* =========================================================
   PROFILE NAME REFRESH
========================================================= */

window.addEventListener(
    "storage",
    event => {

        if (
            event.key ===
            "studysprint_username"
        ) {

            username =
                localStorage.getItem(
                    "studysprint_username"
                ) || "Student";


            loadRooms();

        }

    }
);



/* =========================================================
   START
========================================================= */

loadRooms();
