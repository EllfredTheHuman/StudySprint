/* =========================================================
   STUDYSPRINT MULTIPLAYER LOBBY

   Handles:
   - Joining a lobby
   - Player information
   - Cosmetics
   - Host detection
   - Real-time syncing
   - Countdown
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

const gameIconElement =
    document.getElementById("game-icon");

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


/*
   IMPORTANT:

   The games page stores the player ID when
   the player creates/joins a lobby.

   We MUST reuse that ID.

   Otherwise the host gets one ID when creating
   the lobby and another ID when entering it.
*/

const playerId =
    sessionStorage.getItem(
        "studySprintPlayerId"
    ) ||
    localStorage.getItem(
        "studySprintPlayerId"
    );


const playerName =
    localStorage.getItem("username") ||
    "Player";


/* =========================================================
   GAME INFORMATION
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


const GAME_ICONS = {

    islands:
        "🏝️",

    modifiers:
        "⚡",

    "tower-defense":
        "🏰",

    protection:
        "🛡️",

    bossy:
        "👹",

    "bot-builder":
        "🤖",

    influenced:
        "🎭",

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
else if (!playerId) {

    showError(
        "Player information could not be found."
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


        gameIconElement.textContent =
            GAME_ICONS[game] ||
            "🎮";


        lobbyCodeElement.textContent =
            lobbyCode;


        /*
           If this player is already in the lobby,
           don't create a duplicate entry.
        */

        const existingPlayer =
            lobbyData.players &&
            lobbyData.players[playerId];


        if (!existingPlayer) {

            await addPlayer(
                lobbyRef
            );

        }


        /*
           Make sure the host is correctly identified.
        */

        playerIsHost =
            lobbyData.hostId === playerId;


        listenToLobby(
            lobbyRef
        );


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


    await onDisconnect(
        playerRef
    ).remove();

}


/* =========================================================
   LISTEN
========================================================= */

function listenToLobby(
    lobbyRef
) {

    onValue(
        lobbyRef,
        function(snapshot) {

            if (!snapshot.exists()) {

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
                lobbyData.startAt &&
                !countdownRunning
            ) {

                startCountdown(
                    lobbyData.startAt,
                    lobbyData.game
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


    gameIconElement.textContent =
        GAME_ICONS[game] ||
        "🎮";


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
            document.createElement("div");


        empty.className =
            "empty-players";


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

            const card =
                document.createElement("div");


            card.className =
                "player-item";


            /* CHARACTER */

            const character =
                document.createElement("div");


            character.className =
                "player-character";


            character.dataset.character =
                player.character ||
                "leafy";


            character.dataset.banner =
                player.banner ||
                "purple-grid";


            character.dataset.effect =
                player.effect ||
                "none";


            character.textContent =
                "●";


            /* INFORMATION */

            const information =
                document.createElement("div");


            information.className =
                "player-information";


            const name =
                document.createElement("div");


            name.className =
                "player-name";


            name.textContent =
                player.name ||
                "Player";


            information.appendChild(
                name
            );


            /* TITLE */

            if (
                player.title &&
                player.title !== "none"
            ) {

                const title =
                    document.createElement("div");


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


            /* EFFECT */

            if (
                player.effect &&
                player.effect !== "none"
            ) {

                const effect =
                    document.createElement("div");


                effect.className =
                    "player-effect";


                effect.textContent =
                    getEffectName(
                        player.effect
                    );


                information.appendChild(
                    effect
                );

            }


            /* HOST */

            if (
                id === data.hostId
            ) {

                const hostBadge =
                    document.createElement("span");


                hostBadge.className =
                    "host-badge";


                hostBadge.textContent =
                    "👑 HOST";


                information.appendChild(
                    hostBadge
                );

            }


            card.appendChild(
                character
            );


            card.appendChild(
                information
            );


            playersListElement.appendChild(
                card
            );

        }
    );


    /* =====================================================
       HOST DETECTION
    ====================================================== */

    playerIsHost =
        data.hostId === playerId;


    if (playerIsHost) {

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


    /*
       If countdown has already started,
       don't show the normal controls.
    */

    if (data.startAt) {

        hostControls.style.display =
            "none";

        waitingMessage.style.display =
            "none";

        lobbyStatusElement.textContent =
            "Game starting...";

    }

}


/* =========================================================
   START GAME
========================================================= */

startGameButton.addEventListener(
    "click",
    async function() {

        if (!playerIsHost) {
            return;
        }


        if (!lobbyData) {
            return;
        }


        startGameButton.disabled =
            true;


        startGameButton.textContent =
            "STARTING...";


        try {

            /*
               Everyone uses the same timestamp.

               This makes the countdown synchronized
               between different devices.
            */

            const startAt =
                Date.now() + 5000;


            const lobbyRef =
                ref(
                    db,
                    `lobbies/${lobbyCode}`
                );


            await update(
                lobbyRef,
                {

                    startAt:
                        startAt,

                    status:
                        "starting"

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
   COUNTDOWN
========================================================= */

function startCountdown(
    startAt,
    game
) {

    if (countdownRunning) {
        return;
    }


    countdownRunning =
        true;


    countdownOverlay.style.display =
        "flex";


    countdownGame.textContent =
        GAME_NAMES[game] ||
        game ||
        "Game";


    hostControls.style.display =
        "none";


    waitingMessage.style.display =
        "none";


    const interval =
        setInterval(
            function() {

                const remaining =
                    startAt -
                    Date.now();


                const seconds =
                    Math.ceil(
                        remaining / 1000
                    );


                if (
                    seconds <= 0
                ) {

                    clearInterval(
                        interval
                    );


                    countdownNumber.textContent =
                        "GO!";


                    /*
                       TEMPORARY:
                       Later this is where we redirect
                       to the actual game.
                    */

                    setTimeout(
                        function() {

                            countdownOverlay.style.display =
                                "none";

                            lobbyStatusElement.textContent =
                                "Game ready!";

                        },
                        700
                    );


                    return;

                }


                countdownNumber.textContent =
                    seconds;

            },
            100
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


            copyCodeButton.textContent =
                "✓ COPIED";


            setTimeout(
                function() {

                    copyCodeButton.textContent =
                        "📋 COPY";

                },
                1500
            );

        }
        catch (error) {

            console.error(
                "Copy failed:",
                error
            );

        }

    }
);


/* =========================================================
   LEAVE
========================================================= */

leaveLobbyButton.addEventListener(
    "click",
    async function() {

        try {

            await remove(
                ref(
                    db,
                    `lobbies/${lobbyCode}/players/${playerId}`
                )
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
   TITLE NAMES
========================================================= */

function getTitleName(id) {

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


    return titles[id] || id;

}


/* =========================================================
   EFFECT NAMES
========================================================= */

function getEffectName(id) {

    const effects = {

        sparkle:
            "✨ Sparkle",

        "speed-trail":
            "💨 Speed Trail",

        lightning:
            "⚡ Lightning",

        rainbow:
            "🌈 Rainbow Aura",

        fire:
            "🔥 Fire Aura",

        glitch:
            "👾 Glitch",

        shadow:
            "🌑 Shadow Aura",

        crystal:
            "💎 Crystal",

        "cosmic-aura":
            "🌌 Cosmic Aura",

        crown:
            "👑 Crown"

    };


    return effects[id] || id;

}


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


    hostControls.style.display =
        "none";


    waitingMessage.style.display =
        "none";

}
