```js
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

let username =
    localStorage.getItem(
        "studysprint_username"
    ) || "Student";


let userId =
    localStorage.getItem(
        "studysprint_user_id"
    );


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

const roomCodeInput =
    document.getElementById(
        "room-code-input"
    );


const joinRoomButton =
    document.getElementById(
        "join-room-button"
    );


const joinMessage =
    document.getElementById(
        "join-message"
    );


const createClassButton =
    document.getElementById(
        "create-class-button"
    );


const createFriendsButton =
    document.getElementById(
        "create-friends-button"
    );


const createMessage =
    document.getElementById(
        "create-message"
    );


const roomsList =
    document.getElementById(
        "rooms-list"
    );


const emptyState =
    document.getElementById(
        "empty-state"
    );


const modal =
    document.getElementById(
        "room-modal"
    );


const modalTitle =
    document.getElementById(
        "modal-title"
    );


const modalBody =
    document.getElementById(
        "modal-body"
    );


const closeModal =
    document.getElementById(
        "close-modal"
    );


const modalBackdrop =
    document.querySelector(
        ".modal-backdrop"
    );



/* =========================================================
   MESSAGE HELPERS
========================================================= */

function setJoinMessage(
    message,
    error
) {

    joinMessage.textContent =
        message || "";

    joinMessage.style.color =
        error
            ? "#ff7373"
            : "#777783";

}


function setCreateMessage(
    message,
    error
) {

    createMessage.textContent =
        message || "";

    createMessage.style.color =
        error
            ? "#ff7373"
            : "#777783";

}



/* =========================================================
   ROOM CODE INPUT
========================================================= */

roomCodeInput.addEventListener(
    "input",
    function () {

        let value =
            roomCodeInput.value
                .toUpperCase();

        let clean =
            "";

        for (
            let i = 0;
            i < value.length;
            i++
        ) {

            const code =
                value.charCodeAt(i);

            const isLetter =
                code >= 65 &&
                code <= 90;

            const isNumber =
                code >= 48 &&
                code <= 57;

            if (
                isLetter ||
                isNumber
            ) {

                clean +=
                    value[i];

            }

        }

        roomCodeInput.value =
            clean.slice(0, 6);

    }
);


roomCodeInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            joinRoom();

        }

    }
);



/* =========================================================
   VALIDATE ROOM CODE
========================================================= */

function validRoomCode(
    code
) {

    if (
        code.length !== 6
    ) {

        return false;

    }


    for (
        let i = 0;
        i < code.length;
        i++
    ) {

        const value =
            code.charCodeAt(i);

        const letter =
            value >= 65 &&
            value <= 90;

        const number =
            value >= 48 &&
            value <= 57;

        if (
            !letter &&
            !number
        ) {

            return false;

        }

    }

    return true;

}



/* =========================================================
   JOIN ROOM
========================================================= */

async function joinRoom() {

    const code =
        roomCodeInput.value
            .trim()
            .toUpperCase();


    if (
        !validRoomCode(code)
    ) {

        setJoinMessage(
            "Enter a 6-character room code.",
            true
        );

        roomCodeInput.focus();

        return;

    }


    joinRoomButton.disabled =
        true;

    joinRoomButton.textContent =
        "Joining...";

    setJoinMessage(
        "Checking room..."
    );


    try {

        const roomReference =
            ref(
                database,
                "rooms/" + code
            );


        const snapshot =
            await get(
                roomReference
            );


        if (
            !snapshot.exists()
        ) {

            setJoinMessage(
                "That room does not exist.",
                true
            );

            joinRoomButton.disabled =
                false;

            joinRoomButton.textContent =
                "Join";

            return;

        }


        const room =
            snapshot.val();


        if (
            room.deleted === true
        ) {

            setJoinMessage(
                "That room has been deleted.",
                true
            );

            joinRoomButton.disabled =
                false;

            joinRoomButton.textContent =
                "Join";

            return;

        }


        const memberReference =
            ref(
                database,
                "rooms/" +
                code +
                "/members/" +
                userId
            );


        await set(
            memberReference,
            {
                name:
                    username,

                joinedAt:
                    Date.now(),

                role:
                    "member"
            }
        );


        saveLocalRoom(
            code,
            room.name || "Room",
            room.type || "friends"
        );


        window.location.href =
            "room.html?code=" +
            encodeURIComponent(code);

    }

    catch (error) {

        console.error(
            "ROOM JOIN ERROR:",
            error
        );

        setJoinMessage(
            "Something went wrong. Try again.",
            true
        );

        joinRoomButton.disabled =
            false;

        joinRoomButton.textContent =
            "Join";

    }

}



/* =========================================================
   CREATE ROOM MODAL
========================================================= */

function openCreateModal(
    type
) {

    modalTitle.textContent =
        type === "class"
            ? "Create a class room"
            : "Create a friends room";


    modalBody.innerHTML =
        "";


    const form =
        document.createElement(
            "div"
        );

    form.className =
        "modal-form";


    const nameLabel =
        document.createElement(
            "label"
        );

    nameLabel.className =
        "modal-label";

    nameLabel.textContent =
        "Room name";


    const nameInput =
        document.createElement(
            "input"
        );

    nameInput.className =
        "modal-input";

    nameInput.type =
        "text";

    nameInput.maxLength =
        40;

    nameInput.autocomplete =
        "off";

    nameInput.placeholder =
        type === "class"
            ? "Year 8 Science"
            : "Study Squad";


    const typeLabel =
        document.createElement(
            "label"
        );

    typeLabel.className =
        "modal-label";

    typeLabel.textContent =
        "Room type";


    const types =
        document.createElement(
            "div"
        );

    types.className =
        "modal-types";


    const friendsType =
        document.createElement(
            "button"
        );

    friendsType.type =
        "button";

    friendsType.className =
        "modal-type";


    const classType =
        document.createElement(
            "button"
        );

    classType.type =
        "button";

    classType.className =
        "modal-type";


    friendsType.innerHTML =
        "<strong>👥 Friends</strong>" +
        "<span>For your own group</span>";


    classType.innerHTML =
        "<strong>🏫 Class</strong>" +
        "<span>For school</span>";


    let selectedType =
        type;


    function updateSelected() {

        friendsType.classList.toggle(
            "selected",
            selectedType === "friends"
        );

        classType.classList.toggle(
            "selected",
            selectedType === "class"
        );

    }


    friendsType.addEventListener(
        "click",
        function () {

            selectedType =
                "friends";

            updateSelected();

        }
    );


    classType.addEventListener(
        "click",
        function () {

            selectedType =
                "class";

            updateSelected();

        }
    );


    updateSelected();


    types.appendChild(
        friendsType
    );

    types.appendChild(
        classType
    );


    const createButton =
        document.createElement(
            "button"
        );

    createButton.type =
        "button";

    createButton.className =
        "modal-submit";

    createButton.textContent =
        "Create Room";


    const error =
        document.createElement(
            "p"
        );

    error.className =
        "modal-error";


    createButton.addEventListener(
        "click",
        async function () {

            const name =
                nameInput.value.trim();


            if (!name) {

                error.textContent =
                    "Give your room a name.";

                nameInput.focus();

                return;

            }


            createButton.disabled =
                true;

            createButton.textContent =
                "Creating...";

            error.textContent =
                "";


            try {

                const code =
                    await findAvailableRoomCode(
                        database
                    );


                const now =
                    Date.now();


                const roomData = {

                    name:
                        name,

                    type:
                        selectedType,

                    owner:
                        userId,

                    ownerName:
                        username,

                    createdAt:
                        now,

                    members: {

                        [userId]: {

                            name:
                                username,

                            joinedAt:
                                now,

                            role:
                                "owner"

                        }

                    },

                    announcements:
                        {},

                    assignments:
                        {},

                    challenges:
                        {}

                };


                await set(
                    ref(
                        database,
                        "rooms/" +
                        code
                    ),
                    roomData
                );


                saveLocalRoom(
                    code,
                    name,
                    selectedType
                );


                window.location.href =
                    "room.html?code=" +
                    encodeURIComponent(code);

            }

            catch (errorValue) {

                console.error(
                    "ROOM CREATE ERROR:",
                    errorValue
                );

                error.textContent =
                    "Something went wrong. Try again.";

                createButton.disabled =
                    false;

                createButton.textContent =
                    "Create Room";

            }

        }
    );


    form.appendChild(
        nameLabel
    );

    form.appendChild(
        nameInput
    );

    form.appendChild(
        typeLabel
    );

    form.appendChild(
        types
    );

    form.appendChild(
        createButton
    );

    form.appendChild(
        error
    );


    modalBody.appendChild(
        form
    );


    modal.classList.add(
        "show"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    setTimeout(
        function () {
            nameInput.focus();
        },
        50
    );

}



/* =========================================================
   CLOSE MODAL
========================================================= */

function closeRoomModal() {

    modal.classList.remove(
        "show"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


closeModal.addEventListener(
    "click",
    closeRoomModal
);


modalBackdrop.addEventListener(
    "click",
    closeRoomModal
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains(
                "show"
            )
        ) {

            closeRoomModal();

        }

    }
);



/* =========================================================
   LOCAL ROOMS
========================================================= */

function getLocalRooms() {

    try {

        const saved =
            localStorage.getItem(
                "studysprint_rooms"
            );


        if (!saved) {

            return [];

        }


        const rooms =
            JSON.parse(
                saved
            );


        return Array.isArray(
            rooms
        )
            ? rooms
            : [];

    }

    catch (error) {

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


    let found =
        false;


    for (
        let i = 0;
        i < rooms.length;
        i++
    ) {

        if (
            rooms[i].code === code
        ) {

            rooms[i].name =
                name;

            rooms[i].type =
                type;

            found =
                true;

            break;

        }

    }


    if (!found) {

        rooms.push({

            code:
                code,

            name:
                name,

            type:
                type

        });

    }


    localStorage.setItem(
        "studysprint_rooms",
        JSON.stringify(
            rooms
        )
    );

}



/* =========================================================
   DISPLAY ROOMS
========================================================= */

function displayRooms() {

    roomsList.innerHTML =
        "";


    const rooms =
        getLocalRooms();


    if (
        rooms.length === 0
    ) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";


    rooms.forEach(
        function (room) {

            const card =
                document.createElement(
                    "button"
                );

            card.type =
                "button";

            card.className =
                "room-card";


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


            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "room-card-info";


            const name =
                document.createElement(
                    "h3"
                );

            name.textContent =
                room.name;


            const type =
                document.createElement(
                    "p"
                );

            type.textContent =
                room.type === "class"
                    ? "Class room"
                    : "Friends room";


            const code =
                document.createElement(
                    "span"
                );

            code.className =
                "room-card-code";

            code.textContent =
                room.code;


            info.appendChild(
                name
            );

            info.appendChild(
                type
            );


            card.appendChild(
                icon
            );

            card.appendChild(
                info
            );

            card.appendChild(
                code
            );


            card.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "room.html?code=" +
                        encodeURIComponent(
                            room.code
                        );

                }
            );


            roomsList.appendChild(
                card
            );

        }
    );

}



/* =========================================================
   BUTTONS
========================================================= */

joinRoomButton.addEventListener(
    "click",
    joinRoom
);


createClassButton.addEventListener(
    "click",
    function () {

        setCreateMessage(
            ""
        );

        openCreateModal(
            "class"
        );

    }
);


createFriendsButton.addEventListener(
    "click",
    function () {

        setCreateMessage(
            ""
        );

        openCreateModal(
            "friends"
        );

    }
);



/* =========================================================
   START
========================================================= */

displayRooms();
