/* =========================================================
   STUDYSPRINT MULTIPLAYER LOBBY

   Handles:
   - Connecting to a lobby
   - Joining players
   - Host detection
   - Player syncing
   - Cosmetics
   - Starting the game
   - Countdown
   - Passing lobby code to the game
   - Leaving the lobby
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

const countdownOverlay =
    document.getElementById("countdown-overlay");

const countdownNumber =
    document.getElementById("countdown-number");

const countdownGame =
    document.getElementById("countdown-game");


/* =========================================================
   PLAYER ID
========================================================= */

/*
   IMPORTANT:

   Use the existing StudySprint player ID instead
   of generating a new ID every time the lobby loads.

   This prevents the same person from appearing
   as multiple players.
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


const playerName =
    localStorage.getItem("username") ||
    "Player";


/* =========================================================
   LOBBY INFORMATION
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

let lobbyData = null;

let playerIsHost = false;

let countdownRunning = false;


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
   INITIALISE LOBBY
========================================================= */

async function initialiseLobby() {

    try {

        lobbyStatusElement.textContent =
            "Connecting to lobby...";


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


        /* =================================================
           ALREADY STARTED
        ================================================= */

        if (
            lobbyData.started === true
        ) {

            updateLobbyUI(
                lobbyData
            );


            startCountdown(
                lobbyData
            );


            return;

        }


        /* =================================================
           ADD PLAYER
        ================================================= */

        await addPlayer(
            lobbyRef
        );


        /* =================================================
           LISTEN
        ================================================= */

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
   ADD PLAYER
========================================================= */

async function addPlayer(
    lobbyRef
) {

    const playerRef =
        ref(
            db,
            `lobbies/${lobbyCode}/players/${playerId}`
        );


    const cosmetics =
        getEquippedCosmetics();


    await set(
        playerRef,
        {

            id:
                playerId,

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
                Date.now()

        }
    );


    /*
       Automatically remove the player
       if their connection disappears.
    */

    await onDisconnect(
        playerRef
    ).remove();

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

                startCountdown(
                    lobbyData
                );

            }

        }
    );

}


/* =========================================================
   UPDATE LOBBY UI
========================================================= */

function updateLobbyUI(
    data
) {

    const game =
        data.game ||
        "unknown";


    gameNameElement.textContent =
        GAME_NAMES[game] ||
        game;


    lobbyCodeElement.textContent =
        lobbyCode;


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


    if (
        playerEntries.length === 0
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "empty-player-list";


        empty.textContent =
            "Waiting for players...";


        playersListElement.appendChild(
            empty
        );

    }


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
                "lobby-player";


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


            characterElement.dataset.title =
                player.title ||
                "none";


            characterElement.dataset.effect =
                player.effect ||
                "none";


            /*
               Temporary character display.

               Bossy will later use the full character
               renderer.
            */

            characterElement.textContent =
                "●";


            /* =============================================
               DETAILS
            ============================================== */

            const details =
                document.createElement(
                    "div"
                );


            details.className =
                "player-details";


            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "player-name";


            name.textContent =
                player.name ||
                "Player";


            details.appendChild(
                name
            );


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


                details.appendChild(
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


                details.appendChild(
                    hostBadge
                );

            }


            playerElement.appendChild(
                characterElement
            );


            playerElement.appendChild(
                details
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
            "flex";


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

        none:
            "No Title",

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

if (startGameButton) {

    startGameButton.addEventListener(
        "click",
        async function() {

            if (
                !playerIsHost ||
                !lobbyData ||
                countdownRunning
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

                        state:
                            "countdown",

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
                    "🚀 START GAME";

            }

        }
    );

}


/* =========================================================
   COUNTDOWN
========================================================= */

function startCountdown(
    data
) {

    if (
        countdownRunning
    ) {

        return;

    }


    countdownRunning =
        true;


    const game =
        data.game ||
        "unknown";


    countdownGame.textContent =
        GAME_NAMES[game] ||
        game;


    countdownOverlay.style.display =
        "flex";


    let count = 5;


    countdownNumber.textContent =
        count;


    countdownNumber.classList.add(
        "countdown-pop"
    );


    const interval =
        setInterval(
            function() {

                count--;


                if (
                    count <= 0
                ) {

                    clearInterval(
                        interval
                    );


                    countdownNumber.textContent =
                        "GO!";


                    countdownNumber.classList.remove(
                        "countdown-pop"
                    );


                    void countdownNumber.offsetWidth;


                    countdownNumber.classList.add(
                        "countdown-pop"
                    );


                    setTimeout(
                        function() {

                            redirectToGame(
                                game
                            );

                        },
                        600
                    );


                    return;

                }


                countdownNumber.textContent =
                    count;


                countdownNumber.classList.remove(
                    "countdown-pop"
                );


                void countdownNumber.offsetWidth;


                countdownNumber.classList.add(
                    "countdown-pop"
                );

            },
            1000
        );

}


/* =========================================================
   REDIRECT TO GAME
========================================================= */

function redirectToGame(
    game
) {

    /*
       THIS IS THE IMPORTANT PART.

       The lobby code is passed into the game URL.
    */

    if (
        game === "bossy"
    ) {

        window.location.href =
            `../games/bossy/index.html?code=${encodeURIComponent(
                lobbyCode
            )}`;

        return;

    }


    console.error(
        "No game page exists for:",
        game
    );

}


/* =========================================================
   COPY CODE
========================================================= */

if (copyCodeButton) {

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
                    "✓ COPIED";


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
                    "Could not copy lobby code:",
                    error
                );

            }

        }
    );

}


/* =========================================================
   LEAVE LOBBY
========================================================= */

if (leaveLobbyButton) {

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

}


/* =========================================================
   ERROR
========================================================= */

function showError(
    message
) {

    if (lobbyStatusElement) {

        lobbyStatusElement.textContent =
            message;


        lobbyStatusElement.classList.add(
            "error"
        );

    }


    if (hostControls) {

        hostControls.style.display =
            "none";

    }


    if (waitingMessage) {

        waitingMessage.style.display =
            "none";

    }

}
