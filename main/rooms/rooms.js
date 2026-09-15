import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    get,
    set
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

const closeModalButton =
    document.getElementById(
        "close-modal"
    );

const modalBackdrop =
    document.querySelector(
        ".modal-backdrop"
    );



/* =========================================================
   MESSAGES
========================================================= */

function showJoinMessage(
    text,
    isError
) {

    joinMessage.textContent =
        text || "";

    joinMessage.style.color =
        isError
            ? "#ff7070"
            : "#777783";

}


function showCreateMessage(
    text,
    isError
) {

    createMessage.textContent =
        text || "";

    createMessage.style.color =
        isError
            ? "#ff7070"
            : "#777783";

}



/* =========================================================
   ROOM CODE
========================================================= */

function cleanRoomCode(
    value
) {

    let result = "";

    const text =
        String(value || "")
            .toUpperCase();


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        const character =
            text[i];

        const code =
            character.charCodeAt(0);


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

            result +=
                character;

        }

    }


    return result.slice(
        0,
        6
    );

}


roomCodeInput.addEventListener(
    "input",
    function () {

        roomCodeInput.value =
            cleanRoomCode(
                roomCodeInput.value
            );

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
   RANDOM ROOM CODE
========================================================= */

function generateRoomCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const index =
            Math.floor(
                Math.random() *
                characters.length
            );

        code +=
            characters[index];

    }


    return code;

}



/* =========================================================
   FIND AVAILABLE CODE
========================================================= */

async function findAvailableRoomCode() {

    for (
        let attempt = 0;
        attempt < 20;
        attempt++
    ) {

        const code =
            generateRoomCode();


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

            return code;

        }

    }


    throw new Error(
        "Could not generate a room code."
    );

}



/* =========================================================
   LOCAL ROOM STORAGE
========================================================= */

function getSavedRooms() {

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


        if (
            !Array.isArray(rooms)
        ) {

            return [];

        }


        return rooms;

    }

    catch (error) {

        return [];

    }

}


function saveRoom(
    code,
    name,
    type
) {

    const rooms =
        getSavedRooms();


    let existing =
        null;


    for (
        let i = 0;
        i < rooms.length;
        i++
    ) {

        if (
            rooms[i].code === code
        ) {

            existing =
                rooms[i];

            break;

        }

    }


    if (existing) {

        existing.name =
            name;

        existing.type =
            type;

    }

    else {

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
   JOIN ROOM
========================================================= */

async function joinRoom() {

    const code =
        cleanRoomCode(
            roomCodeInput.value
        );


    roomCodeInput.value =
        code;


    if (
        code.length !== 6
    ) {

        showJoinMessage(
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

    showJoinMessage(
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

            showJoinMessage(
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

            showJoinMessage(
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


        saveRoom(
            code,
            room.name || "Room",
            room.type || "friends"
        );


        window.location.href =
            "room.html?code=" +
            encodeURIComponent(
                code
            );

    }

    catch (error) {

        console.error(
            "StudySprint room join error:",
            error
        );

        showJoinMessage(
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
   OPEN CREATE MODAL
========================================================= */

function openCreateModal(
    startingType
) {

    modalTitle.textContent =
        startingType === "class"
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
        startingType === "class"
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


    const typeButtons =
        document.createElement(
            "div"
        );

    typeButtons.className =
        "modal-types";


    const classButton =
        document.createElement(
            "button"
        );

    classButton.type =
        "button";

    classButton.className =
        "modal-type";


    const friendsButton =
        document.createElement(
            "button"
        );

    friendsButton.type =
        "button";

    friendsButton.className =
        "modal-type";


    classButton.innerHTML =
        "<strong>🏫 Class</strong>" +
        "<span>For school</span>";


    friendsButton.innerHTML =
        "<strong>👥 Friends</strong>" +
        "<span>For your group</span>";


    let selectedType =
        startingType;


    function refreshTypeButtons() {

        classButton.classList.toggle(
            "selected",
            selectedType === "class"
        );

        friendsButton.classList.toggle(
            "selected",
            selectedType === "friends"
        );

    }


    classButton.addEventListener(
        "click",
        function () {

            selectedType =
                "class";

            refreshTypeButtons();

        }
    );


    friendsButton.addEventListener(
        "click",
        function () {

            selectedType =
                "friends";

            refreshTypeButtons();

        }
    );


    refreshTypeButtons();


    typeButtons.appendChild(
        classButton
    );

    typeButtons.appendChild(
        friendsButton
    );


    const submitButton =
        document.createElement(
            "button"
        );

    submitButton.type =
        "button";

    submitButton.className =
        "modal-submit";

    submitButton.textContent =
        "Create Room";


    const errorMessage =
        document.createElement(
            "p"
        );

    errorMessage.className =
        "modal-error";


    submitButton.addEventListener(
        "click",
        async function () {

            const name =
                nameInput.value.trim();


            if (!name) {

                errorMessage.textContent =
                    "Give your room a name.";

                nameInput.focus();

                return;

            }


            submitButton.disabled =
                true;

            submitButton.textContent =
                "Creating...";

            errorMessage.textContent =
                "";


            try {

                const code =
                    await findAvailableRoomCode();


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
                        "rooms/" + code
                    ),
                    roomData
                );


                saveRoom(
                    code,
                    name,
                    selectedType
                );


                window.location.href =
                    "room.html?code=" +
                    encodeURIComponent(
                        code
                    );

            }

            catch (error) {

                console.error(
                    "StudySprint room creation error:",
                    error
                );

                errorMessage.textContent =
                    "Something went wrong. Try again.";

                submitButton.disabled =
                    false;

                submitButton.textContent =
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
        typeButtons
    );

    form.appendChild(
        submitButton
    );

    form.appendChild(
        errorMessage
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


closeModalButton.addEventListener(
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
   DISPLAY SAVED ROOMS
========================================================= */

function displayRooms() {

    roomsList.innerHTML =
        "";


    const rooms =
        getSavedRooms();


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
   BUTTON EVENTS
========================================================= */

joinRoomButton.addEventListener(
    "click",
    joinRoom
);


createClassButton.addEventListener(
    "click",
    function () {

        showCreateMessage(
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

        showCreateMessage(
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
