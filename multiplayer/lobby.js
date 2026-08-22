/* =========================================================
   STUDYSPRINT MULTIPLAYER LOBBY

   Handles:
   - Joining a lobby
   - Player information
   - Player cosmetics
   - Host detection
   - Real-time player syncing
   - Starting the game
   - Countdown
   - Leaving
   - Copying lobby code
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
    document.getElementById(
        "game-name"
    );

const lobbyStatusElement =
    document.getElementById(
        "lobby-status"
    );

const lobbyCodeElement =
    document.getElementById(
        "lobby-code"
    );

const copyCodeButton =
    document.getElementById(
        "copy-code"
    );

const playersListElement =
    document.getElementById(
        "players-list"
    );

const playerCountElement =
    document.getElementById(
        "player-count"
    );

const hostControls =
    document.getElementById(
        "host-controls"
    );

const startGameButton =
    document.getElementById(
        "start-game"
    );

const waitingMessage =
    document.getElementById(
        "waiting-message"
    );

const leaveLobbyButton =
    document.getElementById(
        "leave-lobby"
    );

const countdownOverlay =
    document.getElementById(
        "countdown-overlay"
    );

const countdownNumber =
    document.getElementById(
        "countdown-number"
    );

const countdownGame =
    document.getElementById(
        "countdown-game"
    );


/* =========================================================
   PLAYER IDENTITY
========================================================= */

/*
   VERY IMPORTANT:

   Never create a new ID when opening the lobby.

   games.js already created/retrieved this ID.

   Therefore the lobby page MUST use the exact same ID.
*/

let playerId =
    localStorage.getItem(
        "studySprintPlayerId"
    );


/*
   Fallback for somebody who directly opens a lobby.
*/

if (!playerId) {

    playerId =
        crypto.randomUUID();

    localStorage.setItem(
        "studySprintPlayerId",
        playerId
    );

}


const playerName =
    localStorage.getItem(
        "username"
    ) ||
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
   GAME ICONS
========================================================= */

const GAME_ICONS = {

    bossy:
        "👹",

    islands:
        "🏝️",

    modifiers:
        "⚡",

    "tower-defense":
        "🏰",

    protection:
        "🛡️",

    "bot-builder":
        "🤖",

    influenced:
        "🧠",

    "platform-battles":
        "⚔️",

    battle:
        "💥",

    gardeners:
        "🌱"

};


/* =========================================================
   STATE
========================================================= */

let lobbyData =
    null;


let playerIsHost =
    false;


let countdownRunning =
    false;


let countdownTimer =
    null;


/* =========================================================
   START
========================================================= */

if (
    !lobbyCode
) {

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
            ) ||
            "leafy",

        banner:
            localStorage.getItem(
                "character_banner"
            ) ||
            "purple-grid",

        title:
            localStorage.getItem(
                "character_title"
            ) ||
            "none",

        effect:
            localStorage.getItem(
                "character_effect"
            ) ||
            "none"

    };

}


/* =========================================================
   INITIALISE
========================================================= */

async function initialiseLobby() {

    try {

        lobbyStatusElement.textContent =
            "Connecting...";


        lobbyCodeElement.textContent =
            lobbyCode;


        const lobbyRef =
            ref(
                db,
                `lobbies/${lobbyCode}`
            );


        const snapshot =
            await get(
                lobbyRef
            );


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


        const icon =
            document.getElementById(
                "game-icon"
            );


        if (icon) {

            icon.textContent =
                GAME_ICONS[game] ||
                "🎮";

        }


        /* =================================================
           ALREADY STARTED
        ================================================= */

        if (
            lobbyData.started === true
        ) {

            handleGameStarted(
                lobbyData
            );

            return;

        }


        /* =================================================
           REGISTER PLAYER
        ================================================= */

        await registerPlayer(
            lobbyRef
        );


        /* =================================================
           REAL-TIME LISTENER
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
   REGISTER PLAYER
========================================================= */

async function registerPlayer(
    lobbyRef
) {

    const playerRef =
        ref(
            db,
            `lobbies/${lobbyCode}/players/${playerId}`
        );


    /*
       CHECK FIRST.

       This is the key fix.

       If games.js already added this player,
       we DON'T add them again.
    */

    const existingSnapshot =
        await get(
            playerRef
        );


    if (
        existingSnapshot.exists()
    ) {

        console.log(
            "Existing player found. Reusing player entry."
        );

    }
    else {

        /*
           This is a genuine joining player.
        */

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
                    Date.now(),

                isHost:
                    false

            }
        );

    }


    /*
       Remove this player if their connection disappears.
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


    const entries =
        Object.entries(
            players
        );


    playerCountElement.textContent =
        entries.length;


    playersListElement.innerHTML =
        "";


    if (
        entries.length === 0
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


    entries.forEach(
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


            if (
                id === playerId
            ) {

                playerElement.classList.add(
                    "current-player"
                );

            }


            /* =================================================
               CHARACTER
            ================================================= */

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


            /* =================================================
               DETAILS
            ================================================= */

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


            /* =================================================
               TITLE
            ================================================= */

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


            /* =================================================
               HOST
            ================================================= */

            if (
                id === data.hostId
            ) {

                const badge =
                    document.createElement(
                        "span"
                    );


                badge.className =
                    "host-badge";


                badge.textContent =
                    "👑 HOST";


                details.appendChild(
                    badge
                );

            }


            /* =================================================
               YOU
            ================================================= */

            if (
                id === playerId
            ) {

                const you =
                    document.createElement(
                        "span"
                    );


                you.className =
                    "you-badge";


                you.textContent =
                    "YOU";


                details.appendChild(
                    you
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

       IMPORTANT:
       Firebase uses hostId.
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
   TITLES
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

            await update(
                ref(
                    db,
                    `lobbies/${lobbyCode}`
                ),
                {

                    started:
                        true,

                    state:
                        "countdown",

                    countdown:
                        5,

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


/* =========================================================
   GAME STARTED / COUNTDOWN
========================================================= */

function handleGameStarted(
    data
) {

    if (
        countdownRunning
    ) {

        return;

    }


    countdownRunning =
        true;


    hostControls.style.display =
        "none";


    waitingMessage.style.display =
        "none";


    const game =
        data.game ||
        "unknown";


    if (
        countdownOverlay
    ) {

        countdownOverlay.style.display =
            "flex";

    }


    if (
        countdownGame
    ) {

        countdownGame.textContent =
            GAME_NAMES[game] ||
            game;

    }


    let number = 5;


    countdownNumber.textContent =
        number;


    countdownTimer =
        setInterval(
            function() {

                number--;


                if (
                    number <= 0
                ) {

                    clearInterval(
                        countdownTimer
                    );


                    countdownNumber.textContent =
                        "GO!";


                    setTimeout(
                        function() {

                            /*
                               TEMPORARY GAME LAUNCH.

                               Replace this with the actual
                               Bossy game URL later.
                            */

                            if (
                                game === "bossy"
                            ) {

                                window.location.href =
                                    "../games/bossy/index.html";

                            }

                        },
                        650
                    );


                    return;

                }


                countdownNumber.textContent =
                    number;


                /*
                   Restart the number animation.
                */

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
                "✓ COPIED!";


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


            /*
               If the host leaves, remove the lobby.

               For now this is simpler than transferring
               host ownership.
            */

            if (
                playerIsHost
            ) {

                await remove(
                    ref(
                        db,
                        `lobbies/${lobbyCode}`
                    )
                );

            }


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

    if (
        lobbyStatusElement
    ) {

        lobbyStatusElement.textContent =
            message;


        lobbyStatusElement.classList.add(
            "error"
        );

    }


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


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "StudySprint Multiplayer Lobby loaded."
);

console.log(
    "Lobby:",
    lobbyCode
);

console.log(
    "Player:",
    playerId
);
