/* =========================================================
   STUDYSPRINT — BOSSY

   Multiplayer game

   Handles:
   - Lobby connection
   - Loading players
   - Player characters
   - Real-time player syncing
   - Left/right movement
   - Jumping
========================================================= */

import { db } from "../../firebase.js";

import {
    ref,
    get,
    onValue,
    update
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


/* =========================================================
   ELEMENTS
========================================================= */

const loadingScreen =
    document.getElementById(
        "bossy-loading"
    );

const gameWorld =
    document.getElementById(
        "bossy-world"
    );

const errorScreen =
    document.getElementById(
        "bossy-error"
    );

const errorMessage =
    document.getElementById(
        "bossy-error-message"
    );

const lobbyCodeElement =
    document.getElementById(
        "bossy-code"
    );

const playersContainer =
    document.getElementById(
        "players-container"
    );


/* =========================================================
   PLAYER ID
========================================================= */

function getPlayerId() {

    let id =
        localStorage.getItem(
            "studySprintPlayerId"
        );


    if (!id) {

        id =
            crypto.randomUUID();

        localStorage.setItem(
            "studySprintPlayerId",
            id
        );

    }


    return id;

}


const playerId =
    getPlayerId();


/* =========================================================
   GET LOBBY CODE
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const lobbyCode =
    (
        params.get("code") ||
        ""
    )
        .trim()
        .toUpperCase();


/* =========================================================
   CHECK LOBBY CODE
========================================================= */

if (!lobbyCode) {

    showError(
        "No lobby code was provided. Return to the games page and try again."
    );

}
else {

    startBossy();

}


/* =========================================================
   START
========================================================= */

async function startBossy() {

    try {

        lobbyCodeElement.textContent =
            lobbyCode;


        const lobbyRef =
            ref(
                db,
                `lobbies/${lobbyCode}`
            );


        const snapshot =
            await get(lobbyRef);


        /* =================================================
           LOBBY DOESN'T EXIST
        ================================================= */

        if (
            !snapshot.exists()
        ) {

            showError(
                "That lobby no longer exists."
            );

            return;

        }


        const lobby =
            snapshot.val();


        /* =================================================
           WRONG GAME
        ================================================= */

        if (
            lobby.game !== "bossy"
        ) {

            showError(
                "This lobby isn't a Bossy game."
            );

            return;

        }


        /* =================================================
           LOAD GAME
        ================================================= */

        loadingScreen.style.display =
            "none";


        gameWorld.style.display =
            "block";


        /* =================================================
           LISTEN FOR PLAYERS
        ================================================= */

        listenForPlayers(
            lobbyCode
        );


        /* =================================================
           START CONTROLS
        ================================================= */

        setupControls();


    }
    catch (error) {

        console.error(
            "Bossy failed to load:",
            error
        );


        showError(
            "Couldn't connect to the multiplayer game."
        );

    }

}


/* =========================================================
   LISTEN FOR PLAYERS
========================================================= */

function listenForPlayers(
    code
) {

    const playersRef =
        ref(
            db,
            `lobbies/${code}/players`
        );


    onValue(
        playersRef,
        function(snapshot) {

            const players =
                snapshot.val() ||
                {};


            renderPlayers(
                players
            );

        }
    );

}


/* =========================================================
   RENDER PLAYERS
========================================================= */

function renderPlayers(
    players
) {

    playersContainer.innerHTML =
        "";


    Object.entries(
        players
    ).forEach(
        function([
            id,
            player
        ]) {

            createPlayer(
                id,
                player
            );

        }
    );

}


/* =========================================================
   CREATE PLAYER
========================================================= */

function createPlayer(
    id,
    player
) {

    const playerElement =
        document.createElement(
            "div"
        );


    playerElement.className =
        "bossy-player";


    playerElement.dataset.playerId =
        id;


    /* =====================================================
       CHARACTER
    ====================================================== */

    const character =
        document.createElement(
            "div"
        );


    character.className =
        "bossy-character";


    character.dataset.character =
        player.character ||
        "leafy";


    /*
       Temporary character.

       We'll replace this with the actual
       StudySprint Goober renderer next.
    */

    character.innerHTML = `
        <div class="character-body"></div>
        <div class="character-eye left"></div>
        <div class="character-eye right"></div>
    `;


    /* =====================================================
       NAME
    ====================================================== */

    const name =
        document.createElement(
            "div"
        );


    name.className =
        "bossy-player-name";


    name.textContent =
        player.name ||
        "Player";


    playerElement.appendChild(
        name
    );


    playerElement.appendChild(
        character
    );


    /* =====================================================
       POSITION
    ====================================================== */

    playerElement.style.left =
        `${player.x || 50}px`;


    playerElement.style.bottom =
        `${player.y || 0}px`;


    playersContainer.appendChild(
        playerElement
    );

}


/* =========================================================
   CONTROLS
========================================================= */

let keys = {};


let localX = 100;

let localY = 0;

let velocityY = 0;

let grounded = true;


document.addEventListener(
    "keydown",
    function(event) {

        keys[event.key.toLowerCase()] =
            true;


        if (
            event.code === "Space"
        ) {

            event.preventDefault();

            jump();

        }

    }
);


document.addEventListener(
    "keyup",
    function(event) {

        keys[event.key.toLowerCase()] =
            false;

    }
);


/* =========================================================
   SETUP CONTROLS
========================================================= */

function setupControls() {

    const playersRef =
        ref(
            db,
            `lobbies/${lobbyCode}/players/${playerId}`
        );


    onValue(
        playersRef,
        function(snapshot) {

            if (
                !snapshot.exists()
            ) {

                return;

            }


            const player =
                snapshot.val();


            localX =
                player.x ||
                100;


            localY =
                player.y ||
                0;

        }
    );


    setInterval(
        function() {

            updateMovement(
                playersRef
            );

        },
        50
    );

}


/* =========================================================
   MOVEMENT
========================================================= */

function updateMovement(
    playersRef
) {

    let moving =
        false;


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        localX -= 5;

        moving =
            true;

    }


    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        localX += 5;

        moving =
            true;

    }


    /* =====================================================
       GRAVITY
    ====================================================== */

    if (
        !grounded
    ) {

        velocityY -= 1;

        localY += velocityY;


        if (
            localY <= 0
        ) {

            localY = 0;

            velocityY = 0;

            grounded = true;

        }

    }


    /* =====================================================
       MAP BOUNDS
    ====================================================== */

    localX =
        Math.max(
            20,
            Math.min(
                900,
                localX
            )
        );


    if (
        moving ||
        !grounded
    ) {

        update(
            playersRef,
            {

                x:
                    localX,

                y:
                    localY

            }
        );

    }

}


/* =========================================================
   JUMP
========================================================= */

function jump() {

    if (
        !grounded
    ) {

        return;

    }


    grounded =
        false;


    velocityY =
        14;

}


/* =========================================================
   ERROR
========================================================= */

function showError(
    message
) {

    loadingScreen.style.display =
        "none";


    gameWorld.style.display =
        "none";


    errorScreen.style.display =
        "flex";


    errorMessage.textContent =
        message;

}
