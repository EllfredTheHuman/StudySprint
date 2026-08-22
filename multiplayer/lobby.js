/* =========================================================
   STUDYSPRINT MULTIPLAYER LOBBY

   Handles:
   - Joining a lobby
   - Player syncing
   - Cosmetics
   - Host detection
   - Starting
   - Leaving
========================================================= */

import { db } from "../firebase.js";

import {
    ref,
    get,
    set,
    update,
    remove,
    onValue,
    onDisconnect
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


/* =========================================================
   ELEMENTS
========================================================= */

const gameNameElement =
    document.getElementById("game-name");

const lobbyStatusElement =
    document.getElementById("lobby-status");

const lobbyCodeElement =
    document.getElementById("lobby-code");

const copyCodeButton =
    document.getElementById("copy-code");

const playersListElement =
    document.getElementById("players-list");

const playerCountElement =
    document.getElementById("player-count");

const hostControls =
    document.getElementById("host-controls");

const startGameButton =
    document.getElementById("start-game");

const waitingMessage =
    document.getElementById("waiting-message");

const leaveLobbyButton =
    document.getElementById("leave-lobby");


/* =========================================================
   PLAYER ID
========================================================= */

let playerId =
    localStorage.getItem(
        "studySprintPlayerId"
    );


if (!playerId) {

    playerId =
        crypto.randomUUID();

    localStorage.setItem(
        "studySprintPlayerId",
        playerId
    );

}


/* =========================================================
   PLAYER NAME
========================================================= */

const playerName =
    localStorage.getItem("username") ||
    "Player";


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
   GAME NAMES
========================================================= */

const GAME_NAMES = {

    islands:
        "Islands",

    modifiers:
        "Modifiers",

    "tower-defense":
        "Tower Defense",

    protection:
        "Protection",

    bossy:
        "Bossy",

    "bot-builder":
        "Bot Builder",

    influenced:
        "Influenced",

    "platform-battles":
        "Platform Battles",

    battle:
        "Battle",

    gardeners:
        "Gardeners"

};


/* =========================================================
   STATE
========================================================= */

let lobbyData =
    null;

let playerIsHost =
    false;

let playerAdded =
    false;


/* =========================================================
   START
========================================================= */

if (!lobbyCode) {

    showError(
        "No lobby code was provided."
    );

}
else {

    initialiseLobby();

}


/* =========================================================
   COSMETICS
========================================================= */

function getEquippedCosmetics() {

    return {

        character:
            localStorage.getItem(
                "character_character"
            ) || "leafy",

        banner:
            localStorage.getItem(
                "character_banner"
            ) || "purple-grid",

        title:
            localStorage.getItem(
                "character_title"
            ) || "none",

        effect:
            localStorage.getItem(
                "character_effect"
            ) || "none"

    };

}


/* =========================================================
   INITIALISE
========================================================= */

async function initialiseLobby() {

    try {

        lobbyStatusElement.textContent =
            "Connecting...";


        const lobbyRef =
            ref(
                db,
                `lobbies/${lobbyCode}`
            );


        const snapshot =
            await get(lobbyRef);


        if (
            !snapshot.exists()
        ) {

            showError(
                "This lobby doesn't exist."
            );

            return;

        }


        lobbyData =
            snapshot.val();


        const game =
            lobbyData.game ||
            "unknown";


        gameNameElement.textContent =
            GAME_NAMES[game] ||
            game;


        lobbyCodeElement.textContent =
            lobbyCode;


        /* =============================================
           ALREADY STARTED
        ============================================== */

        if (
            lobbyData.started === true
        ) {

            handleGameStarted(
                lobbyData
            );

            return;

        }


        /* =============================================
           ADD PLAYER IF NECESSARY
        ============================================== */

        await ensurePlayerExists(
            lobbyRef
        );


        /* =============================================
           DISCONNECT HANDLER
        ============================================== */

        const playerRef =
            ref(
                db,
                `lobbies/${lobbyCode}/players/${playerId}`
            );


        await onDisconnect(
            playerRef
        ).remove();


        /* =============================================
           REALTIME LISTENER
        ============================================== */

        listenToLobby(
            lobbyRef
        );


        lobbyStatusElement.textContent =
            "Waiting for players...";

    }
    catch (error) {

        console.error(
            "Lobby initialisation error:",
            error
        );


        showError(
            "Could not connect to the lobby."
        );

    }

}


/* =========================================================
   ENSURE PLAYER EXISTS
========================================================= */

async function ensurePlayerExists(
    lobbyRef
) {

    const playerRef =
        ref(
            db,
            `lobbies/${lobbyCode}/players/${playerId}`
        );


    const snapshot =
        await get(playerRef);


    if (
        snapshot.exists()
    ) {

        playerAdded =
            true;

        return;

    }


    const cosmetics =
        getEquippedCosmetics();


    await set(
        playerRef,
        {

            name:
                playerName,

            character:
                cosmetics.character,

            banner:
                cosmetics.banner,

            title:
                cosmetics.title,

            effect:
                cosmetics.effect,

            joinedAt:
                Date.now(),

            role:
                null

        }
    );


    playerAdded =
        true;

}


/* =========================================================
   LISTEN TO LOBBY
========================================================= */

function listenToLobby(
    lobbyRef
) {

    onValue(
        lobbyRef,
        function(snapshot) {

            if (
                !snapshot.exists()
            ) {

                showError(
                    "The lobby no longer exists."
                );

                return;

            }


            lobbyData =
                snapshot.val();


            updateLobbyUI(
                lobbyData
            );


            if (
                lobbyData.started === true
            ) {

                handleGameStarted(
                    lobbyData
                );

            }

        }
    );

}


/* =========================================================
   UPDATE UI
========================================================= */

function updateLobbyUI(
    data
) {

    /* =====================================================
       GAME
    ====================================================== */

    const game =
        data.game ||
        "unknown";


    gameNameElement.textContent =
        GAME_NAMES[game] ||
        game;


    lobbyCodeElement.textContent =
        lobbyCode;


    /* =====================================================
       PLAYERS
    ====================================================== */

    const players =
        data.players ||
        {};


    const playerEntries =
        Object.entries(
            players
        );


    playerCountElement.textContent =
        playerEntries.length;


    playersListElement.innerHTML =
        "";


    playerEntries.forEach(
        function([
            id,
            player
        ]) {

            const playerElement =
                document.createElement(
                    "div"
                );


            playerElement.className =
                "player-item";


            /* =============================================
               CHARACTER
            ============================================== */

            const characterElement =
                document.createElement(
                    "div"
                );


            characterElement.className =
                "player-character";


            characterElement.dataset.character =
                player.character ||
                "leafy";


            characterElement.dataset.banner =
                player.banner ||
                "purple-grid";


            characterElement.dataset.effect =
                player.effect ||
                "none";


            characterElement.textContent =
                "●";


            /* =============================================
               INFO
            ============================================== */

            const information =
                document.createElement(
                    "div"
                );


            information.className =
                "player-information";


            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "player-name";


            name.textContent =
                player.name ||
                "Player";


            information.appendChild(
                name
            );


            /* =============================================
               TITLE
            ============================================== */

            if (
                player.title &&
                player.title !== "none"
            ) {

                const title =
                    document.createElement(
                        "div"
                    );


                title.className =
                    "player-title";


                title.textContent =
                    getTitleName(
                        player.title
                    );


                information.appendChild(
                    title
                );

            }


            /* =============================================
               HOST
            ============================================== */

            if (
                id === data.hostId
            ) {

                const hostBadge =
                    document.createElement(
                        "span"
                    );


                hostBadge.className =
                    "host-badge";


                hostBadge.textContent =
                    "HOST";


                information.appendChild(
                    hostBadge
                );

            }


            playerElement.appendChild(
                characterElement
            );


            playerElement.appendChild(
                information
            );


            playersListElement.appendChild(
                playerElement
            );

        }
    );


    /* =====================================================
       HOST DETECTION
    ====================================================== */

    playerIsHost =
        data.hostId === playerId;


    if (
        playerIsHost
    ) {

        hostControls.style.display =
            "block";


        waitingMessage.style.display =
            "none";


        lobbyStatusElement.textContent =
            "You are the host.";

    }
    else {

        hostControls.style.display =
            "none";


        waitingMessage.style.display =
            "block";


        lobbyStatusElement.textContent =
            "Waiting for the host...";

    }

}


/* =========================================================
   TITLE NAMES
========================================================= */

function getTitleName(
    id
) {

    const titles = {

        "study-sprinter":
            "Study Sprinter",

        brainiac:
            "Brainiac",

        "speed-learner":
            "Speed Learner",

        "knowledge-seeker":
            "Knowledge Seeker",

        "study-legend":
            "Study Legend"

    };


    return (
        titles[id] ||
        id
    );

}


/* =========================================================
   START GAME
========================================================= */

startGameButton.addEventListener(
    "click",
    async function() {

        if (
            !playerIsHost ||
            !lobbyData
        ) {

            return;

        }


        startGameButton.disabled =
            true;


        startGameButton.textContent =
            "STARTING...";


        try {

            const lobbyRef =
                ref(
                    db,
                    `lobbies/${lobbyCode}`
                );


            await update(
                lobbyRef,
                {

                    started:
                        true,

                    status:
                        "playing",

                    state:
                        "playing",

                    startedAt:
                        Date.now()

                }
            );

        }
        catch (error) {

            console.error(
                "Could not start game:",
                error
            );


            startGameButton.disabled =
                false;


            startGameButton.textContent =
                "START GAME";

        }

    }
);


/* =========================================================
   GAME STARTED
========================================================= */

function handleGameStarted(
    data
) {

    lobbyStatusElement.textContent =
        "Game starting!";


    const game =
        data.game ||
        "unknown";


    /*
       TEMPORARY TEST BEHAVIOUR.
       Later this will redirect everyone
       to the actual Bossy game.
    */

    if (
        !window.gameStartAlertShown
    ) {

        window.gameStartAlertShown =
            true;


        setTimeout(
            function() {

                alert(
                    `${GAME_NAMES[game] || game} is starting!`
                );

            },
            100
        );

    }

}


/* =========================================================
   COPY CODE
========================================================= */

copyCodeButton.addEventListener(
    "click",
    async function() {

        try {

            await navigator.clipboard.writeText(
                lobbyCode
            );


            const oldText =
                copyCodeButton.textContent;


            copyCodeButton.textContent =
                "COPIED!";


            setTimeout(
                function() {

                    copyCodeButton.textContent =
                        oldText;

                },
                1500
            );

        }
        catch (error) {

            console.error(
                "Could not copy code:",
                error
            );

        }

    }
);


/* =========================================================
   LEAVE LOBBY
========================================================= */

leaveLobbyButton.addEventListener(
    "click",
    async function() {

        try {

            const playerRef =
                ref(
                    db,
                    `lobbies/${lobbyCode}/players/${playerId}`
                );


            await remove(
                playerRef
            );


            window.location.href =
                "../games/index.html";

        }
        catch (error) {

            console.error(
                "Could not leave lobby:",
                error
            );

        }

    }
);


/* =========================================================
   ERROR
========================================================= */

function showError(
    message
) {

    lobbyStatusElement.textContent =
        message;


    lobbyStatusElement.classList.add(
        "error"
    );


    if (
        hostControls
    ) {

        hostControls.style.display =
            "none";

    }


    if (
        waitingMessage
    ) {

        waitingMessage.style.display =
            "none";

    }

}
