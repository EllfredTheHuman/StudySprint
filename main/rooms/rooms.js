/* =========================================================
   STUDYSPRINT — ROOMS
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

import {
    findAvailableRoomCode
} from "./room-code.js";


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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


/* =========================================================
   USER
========================================================= */

let username =
    localStorage.getItem("studysprint_username") ||
    "Student";

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


/* =========================================================
   ELEMENTS
========================================================= */

const createButton =
    document.getElementById("create-room-button");

const joinButton =
    document.getElementById("join-room-button");

const modal =
    document.getElementById("room-modal");

const modalContent =
    document.getElementById("modal-content");

const closeModal =
    document.getElementById("close-modal");

const modalBackdrop =
    document.getElementById("modal-backdrop");

const roomList =
    document.getElementById("rooms-list");


/* =========================================================
   MODAL
========================================================= */

function openModal(content) {

    modalContent.innerHTML = "";

    modalContent.appendChild(content);

    modal.classList.remove("hidden");

}


function closeRoomModal() {

    modal.classList.add("hidden");

}


closeModal.addEventListener(
    "click",
    closeRoomModal
);


modalBackdrop.addEventListener(
    "click",
    closeRoomModal
);


/* =========================================================
   CREATE ROOM
========================================================= */

function showCreateRoom() {

    const wrapper =
        document.createElement("div");


    const title =
        document.createElement("h2");

    title.textContent =
        "Create Room";


    const nameLabel =
        document.createElement("label");

    nameLabel.textContent =
        "Room name";


    const nameInput =
        document.createElement("input");

    nameInput.type = "text";

    nameInput.placeholder =
        "e.g. Year 8 Science";

    nameInput.maxLength = 40;


    const typeLabel =
        document.createElement("label");

    typeLabel.textContent =
        "Room type";


    const typeContainer =
        document.createElement("div");

    typeContainer.className =
        "room-type-options";


    let selectedType = "friends";


    const friendsOption =
        document.createElement("button");

    friendsOption.type = "button";

    friendsOption.className =
        "room-type-option selected";

    friendsOption.innerHTML =
        "<strong>👥 Friends</strong>" +
        "<span>For you and your friends</span>";


    const classOption =
        document.createElement("button");

    classOption.type = "button";

    classOption.className =
        "room-type-option";

    classOption.innerHTML =
        "<strong>🏫 Class</strong>" +
        "<span>For a school class</span>";


    friendsOption.addEventListener(
        "click",
        function () {

            selectedType = "friends";

            friendsOption.classList.add(
                "selected"
            );

            classOption.classList.remove(
                "selected"
            );

        }
    );


    classOption.addEventListener(
        "click",
        function () {

            selectedType = "class";

            classOption.classList.add(
                "selected"
            );

            friendsOption.classList.remove(
                "selected"
            );

        }
    );


    typeContainer.appendChild(
        friendsOption
    );

    typeContainer.appendChild(
        classOption
    );


    const submitButton =
        document.createElement("button");

    submitButton.type = "button";

    submitButton.className =
        "modal-action-button";

    submitButton.textContent =
        "Create Room";


    const error =
        document.createElement("p");

    error.className =
        "modal-error";


    submitButton.addEventListener(
        "click",
        async function () {

            const name =
                nameInput.value.trim();


            if (!name) {

                error.textContent =
                    "Give your room a name.";

                return;

            }


            submitButton.disabled = true;

            submitButton.textContent =
                "Creating...";

            error.textContent = "";


            try {

                const code =
                    await findAvailableRoomCode(
                        database
                    );


                const now =
                    Date.now();


                const roomData = {

                    name: name,

                    type: selectedType,

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

                    challenges: {}

                };


                await set(
                    ref(
                        database,
                        "rooms/" + code
                    ),
                    roomData
                );


                saveLocalRoom(
                    code,
                    name,
                    selectedType
                );


                window.location.href =
                    "room.html?code=" + code;

            }

            catch (err) {

                console.error(
                    "Create room error:",
                    err
                );

                error.textContent =
                    "Could not create the room. Check your Firebase connection.";

                submitButton.disabled = false;

                submitButton.textContent =
                    "Create Room";

            }

        }
    );


    wrapper.appendChild(title);

    wrapper.appendChild(nameLabel);

    wrapper.appendChild(nameInput);

    wrapper.appendChild(typeLabel);

    wrapper.appendChild(typeContainer);

    wrapper.appendChild(submitButton);

    wrapper.appendChild(error);


    openModal(wrapper);

}


/* =========================================================
   JOIN ROOM
========================================================= */

function showJoinRoom() {

    const wrapper =
        document.createElement("div");


    const title =
        document.createElement("h2");

    title.textContent =
        "Join Room";


    const label =
        document.createElement("label");

    label.textContent =
        "Room code";


    const input =
        document.createElement("input");

    input.type = "text";

    input.placeholder =
        "ABC123";

    input.maxLength = 6;

    input.autocomplete = "off";

    input.style.textTransform =
        "uppercase";


    const join =
        document.createElement("button");

    join.type = "button";

    join.className =
        "modal-action-button";

    join.textContent =
        "Join Room";


    const error =
        document.createElement("p");

    error.className =
        "modal-error";


    join.addEventListener(
        "click",
        async function () {

            const code =
                input.value
                    .trim()
                    .toUpperCase();


            if (!/^[A-Z0-9]{6}$/.test(code)) {

                error.textContent =
                    "Enter a valid 6-character room code.";

                return;

            }


            join.disabled = true;

            join.textContent =
                "Joining...";

            error.textContent = "";


            try {

                const roomRef =
                    ref(
                        database,
                        "rooms/" + code
                    );


                const snapshot =
                    await get(roomRef);


                if (!snapshot.exists()) {

                    error.textContent =
                        "That room does not exist.";

                    join.disabled = false;

                    join.textContent =
                        "Join Room";

                    return;

                }


                const room =
                    snapshot.val();


                const now =
                    Date.now();


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

                        joinedAt: now,

                        role: "member"

                    }
                );


                saveLocalRoom(
                    code,
                    room.name,
                    room.type
                );


                window.location.href =
                    "room.html?code=" + code;

            }

            catch (err) {

                console.error(
                    "Join room error:",
                    err
                );

                error.textContent =
                    "Could not join the room. Check your Firebase connection.";

                join.disabled = false;

                join.textContent =
                    "Join Room";

            }

        }
    );


    wrapper.appendChild(title);

    wrapper.appendChild(label);

    wrapper.appendChild(input);

    wrapper.appendChild(join);

    wrapper.appendChild(error);


    openModal(wrapper);

}


/* =========================================================
   LOCAL ROOMS
========================================================= */

function getLocalRooms() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "studysprint_rooms"
            )
        ) || [];

    }

    catch {

        return [];

    }

}


function saveLocalRoom(
    code,
    name,
    type
) {

    const rooms =
        getLocalRooms();


    const existing =
        rooms.find(
            function (room) {

                return room.code === code;

            }
        );


    if (existing) {

        existing.name = name;

        existing.type = type;

    }

    else {

        rooms.push({

            code: code,

            name: name,

            type: type

        });

    }


    localStorage.setItem(
        "studysprint_rooms",
        JSON.stringify(rooms)
    );

}


/* =========================================================
   DISPLAY ROOMS
========================================================= */

function displayRooms() {

    roomList.innerHTML = "";


    const rooms =
        getLocalRooms();


    if (rooms.length === 0) {

        const empty =
            document.createElement("div");

        empty.className =
            "empty-state";


        const icon =
            document.createElement("div");

        icon.className =
            "empty-icon";

        icon.textContent =
            "🏠";


        const title =
            document.createElement("h3");

        title.textContent =
            "No rooms yet";


        const text =
            document.createElement("p");

        text.textContent =
            "Create a room for your class or invite your friends.";


        empty.appendChild(icon);

        empty.appendChild(title);

        empty.appendChild(text);


        roomList.appendChild(empty);

        return;

    }


    rooms.forEach(
        function (room) {

            const card =
                document.createElement("button");

            card.className =
                "room-card";


            const icon =
                document.createElement("div");

            icon.className =
                "room-card-icon";

            icon.textContent =
                room.type === "class"
                    ? "🏫"
                    : "👥";


            const info =
                document.createElement("div");

            info.className =
                "room-card-info";


            const name =
                document.createElement("h3");

            name.textContent =
                room.name;


            const type =
                document.createElement("p");

            type.textContent =
                room.type === "class"
                    ? "Class room"
                    : "Friends room";


            info.appendChild(name);

            info.appendChild(type);


            card.appendChild(icon);

            card.appendChild(info);


            card.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "room.html?code=" +
                        room.code;

                }
            );


            roomList.appendChild(card);

        }
    );

}


/* =========================================================
   EVENTS
========================================================= */

createButton.addEventListener(
    "click",
    showCreateRoom
);


joinButton.addEventListener(
    "click",
    showJoinRoom
);


/* =========================================================
   START
========================================================= */

displayRooms();
