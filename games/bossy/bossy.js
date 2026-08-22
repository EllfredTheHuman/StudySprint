```javascript
/* =========================================================
   STUDYSPRINT — BOSSY

   Multiplayer side-view game

   Handles:
   - Joining the correct lobby
   - Loading every player
   - Displaying characters
   - Real-time movement
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
    document.getElementById("bossy-loading");

const gameWorld =
    document.getElementById("bossy-world");

const errorScreen =
    document.getElementById("bossy-error");

const errorMessage =
    document.getElementById("bossy-error-message");

const lobbyCodeElement =
    document.getElementById("bossy-code");

const playersContainer =
    document.getElementById("players-container");

const playerCountElement =
    document.getElementById("player-count");


/* =========================================================
   PLAYER ID
========================================================= */

/*
   This MUST be the same ID used by the lobby.

   That means the player who joined the lobby
   becomes the exact same player inside Bossy.
*/

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
   LOBBY CODE
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
   GAME STATE
========================================================= */

let localX = 100;

let localY = 0;

let velocityY = 0;

let grounded = true;

let keys = {};

let movementLoop = null;


/* =========================================================
   START
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
   START BOSSY
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


        if (!snapshot.exists()) {

            showError(
                "That lobby no longer exists."
            );

            return;

        }


        const lobby =
            snapshot.val();


        /* =================================================
           CHECK GAME
        ================================================== */

        if (
            lobby.game !== "bossy"
        ) {

            showError(
                "This lobby isn't a Bossy game."
            );

            return;

        }


        /* =================================================
           CHECK PLAYER
        ================================================== */

        const players =
            lobby.players ||
            {};


        if (
            !players[playerId]
        ) {

            showError(
                "You aren't a player in this lobby. Please return to the lobby and join again."
            );

            return;

        }


        /* =================================================
           GET CURRENT POSITION
        ================================================== */

        localX =
            Number(
                players[playerId].x
            ) || 100;


        localY =
            Number(
                players[playerId].y
            ) || 0;


        /* =================================================
           SHOW GAME
        ================================================= */

        loadingScreen.style.display =
            "none";

        gameWorld.style.display =
            "flex";


        /* =================================================
           LISTEN FOR PLAYERS
        ================================================== */

        listenForPlayers();


        /* =================================================
           CONTROLS
        ================================================== */

        setupControls();


        /* =================================================
           START MOVEMENT LOOP
        ================================================= */

        startMovementLoop();


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

function listenForPlayers() {

    const playersRef =
        ref(
            db,
            `lobbies/${lobbyCode}/players`
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


    const entries =
        Object.entries(
            players
        );


    playerCountElement.textContent =
        entries.length;


    entries.forEach(
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
        document.createElement("div");


    playerElement.className =
        "bossy-player";


    playerElement.dataset.playerId =
        id;


    /*
       Local player gets a special class.
    */

    if (
        id === playerId
    ) {

        playerElement.classList.add(
            "local-player"
        );

    }


    /* =====================================================
       CHARACTER
    ====================================================== */

    const character =
        document.createElement("div");


    character.className =
        "bossy-character";


    character.dataset.character =
        player.character ||
        "leafy";


    /*
       Different characters can have different
       colours/styles using the character ID.
    */

    character.classList.add(
        `character-${player.character || "leafy"}`
    );


    /* =====================================================
       CHARACTER BODY
    ====================================================== */

    const body =
        document.createElement("div");


    body.className =
        "character-body";


    /* =====================================================
       EYES
    ====================================================== */

    const leftEye =
        document.createElement("div");


    leftEye.className =
        "character-eye eye-left";


    const rightEye =
        document.createElement("div");


    rightEye.className =
        "character-eye eye-right";


    /* =====================================================
       FEET
    ====================================================== */

    const leftFoot =
        document.createElement("div");


    leftFoot.className =
        "character-foot foot-left";


    const rightFoot =
        document.createElement("div");


    rightFoot.className =
        "character-foot foot-right";


    character.appendChild(
        body
    );

    character.appendChild(
        leftEye
    );

    character.appendChild(
        rightEye
    );

    character.appendChild(
        leftFoot
    );

    character.appendChild(
        rightFoot
    );


    /* =====================================================
       NAME
    ====================================================== */

    const name =
        document.createElement("div");


    name.className =
        "bossy-player-name";


    name.textContent =
        player.name ||
        "Player";


    /* =====================================================
       HOST BADGE
    ====================================================== */

    if (
        id === player.lobbyHostId ||
        player.role === "host"
    ) {

        const badge =
            document.createElement("span");


        badge.className =
            "bossy-host-badge";


        badge.textContent =
            "HOST";


        name.appendChild(
            badge
        );

    }


    /* =====================================================
       BUILD
    ====================================================== */

    playerElement.appendChild(
        name
    );


    playerElement.appendChild(
        character
    );


    /* =====================================================
       POSITION
    ====================================================== */

    const x =
        Number(player.x);


    const y =
        Number(player.y);


    playerElement.style.left =
        `${Number.isFinite(x) ? x : 100}px`;


    playerElement.style.bottom =
        `${Number.isFinite(y) ? y : 0}px`;


    playersContainer.appendChild(
        playerElement
    );

}


/* =========================================================
   CONTROLS
========================================================= */

function setupControls() {

    document.addEventListener(
        "keydown",
        function(event) {

            const key =
                event.key.toLowerCase();


            keys[key] =
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

            keys[
                event.key.toLowerCase()
            ] =
                false;

        }
    );

}


/* =========================================================
   MOVEMENT LOOP
========================================================= */

function startMovementLoop() {

    if (
        movementLoop
    ) {

        clearInterval(
            movementLoop
        );

    }


    movementLoop =
        setInterval(
            function() {

                updateMovement();

            },
            30
        );

}


/* =========================================================
   MOVEMENT
========================================================= */

async function updateMovement() {

    let moving =
        false;


    /* =====================================================
       LEFT
    ====================================================== */

    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        localX -= 5;

        moving =
            true;

    }


    /* =====================================================
       RIGHT
    ====================================================== */

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

        velocityY -= 0.8;

        localY += velocityY;


        if (
            localY <= 0
        ) {

            localY =
                0;

            velocityY =
                0;

            grounded =
                true;

        }

    }


    /* =====================================================
       MAP BOUNDS
    ====================================================== */

    const mapWidth =
        playersContainer.parentElement
            .clientWidth;


    const playerWidth =
        60;


    localX =
        Math.max(
            10,
            Math.min(
                mapWidth - playerWidth,
                localX
            )
        );


    /* =====================================================
       SAVE POSITION
    ====================================================== */

    if (
        moving ||
        !grounded
    ) {

        const playerRef =
            ref(
                db,
                `lobbies/${lobbyCode}/players/${playerId}`
            );


        try {

            await update(
                playerRef,
                {

                    x:
                        localX,

                    y:
                        localY

                }
            );

        }
        catch (error) {

            console.error(
                "Movement update failed:",
                error
            );

        }

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
```
