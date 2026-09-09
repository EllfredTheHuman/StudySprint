const roomInput = document.getElementById("room-code");
const joinButton = document.getElementById("join-button");
const createButton = document.getElementById("create-button");
const joinMessage = document.getElementById("join-message");
const recentRooms = document.getElementById("recent-rooms");



/* =========================
   GENERATE ROOM CODE
========================= */

function generateRoomCode() {

    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 6; i++) {

        code += characters[
            Math.floor(Math.random() * characters.length)
        ];

    }

    return code;
}




/* =========================
   SAVE RECENT ROOM
========================= */

function saveRecentRoom(code) {

    let rooms =
        JSON.parse(
            localStorage.getItem("recentRooms")
        ) || [];


    rooms = rooms.filter(room => room !== code);

    rooms.unshift(code);

    rooms = rooms.slice(0, 5);


    localStorage.setItem(
        "recentRooms",
        JSON.stringify(rooms)
    );

}




/* =========================
   LOAD RECENT ROOMS
========================= */

function loadRecentRooms() {

    const rooms =
        JSON.parse(
            localStorage.getItem("recentRooms")
        ) || [];


    if (rooms.length === 0) {

        recentRooms.innerHTML = `
            <div class="empty-state">

                <span>🏠</span>

                <p>
                    No recent rooms
                </p>

            </div>
        `;

        return;
    }


    recentRooms.innerHTML = "";


    rooms.forEach(code => {

        const room = document.createElement("button");

        room.className = "secondary-button";

        room.textContent = `Join ${code}`;


        room.addEventListener("click", () => {

            joinRoom(code);

        });


        recentRooms.appendChild(room);

    });

}




/* =========================
   JOIN ROOM
========================= */

function joinRoom(code = roomInput.value) {

    code = code
        .trim()
        .toUpperCase();


    if (!code) {

        joinMessage.textContent =
            "Enter a room code first.";

        joinMessage.style.color =
            "#ff7d8d";

        return;

    }


    if (code.length !== 6) {

        joinMessage.textContent =
            "Room codes are 6 characters.";

        joinMessage.style.color =
            "#ff7d8d";

        return;

    }


    saveRecentRoom(code);


    joinMessage.textContent =
        `Joining room ${code}...`;

    joinMessage.style.color =
        "#8f9cff";


    /*
        TEMPORARY:

        This is where the real Firebase
        room joining system will go.

        For now, we send the code to a
        future lobby page.
    */


    setTimeout(() => {

        window.location.href =
            `lobby/index.html?code=${encodeURIComponent(code)}`;

    }, 400);

}




/* =========================
   CREATE ROOM
========================= */

function createRoom() {

    const code = generateRoomCode();


    saveRecentRoom(code);


    /*
        TEMPORARY:

        The actual Firebase room creation
        will happen here.

        The generated code is passed to
        the lobby.
    */


    window.location.href =
        `lobby/index.html?code=${encodeURIComponent(code)}&host=true`;

}




/* =========================
   EVENTS
========================= */

joinButton.addEventListener(
    "click",
    () => joinRoom()
);


createButton.addEventListener(
    "click",
    createRoom
);


roomInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            joinRoom();

        }

    }
);




/* =========================
   INPUT FORMATTING
========================= */

roomInput.addEventListener(
    "input",
    () => {

        roomInput.value =
            roomInput.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
                .slice(0, 6);

    }
);




/* =========================
   START
========================= */

loadRecentRooms();
