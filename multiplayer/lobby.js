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
   - Leaving the lobby
   - Copying the lobby code
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
   PLAYER IDENTITY
========================================================= */

/*
   IMPORTANT:

   This is intentionally generated once per TAB.

   That means opening the lobby in another browser/tab
   creates another player instead of replacing the first.
*/

let playerId =
    sessionStorage.getItem(
        "studySprintLobbyPlayerId"
    );


if (!playerId) {

    playerId =
        crypto.randomUUID();

    sessionStorage.setItem(
        "studySprintLobbyPlayerId",
        playerId
    );

}


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


const selectedGame =
    params.get("game") ||
    "unknown";


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
        "🌀",

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
   LOBBY STATE
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
   GET EQUIPPED COSMETICS
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
            selectedGame ||
            "unknown";


        updateGameDisplay(game);


        /* =================================================
           GAME ALREADY STARTED
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
           ADD THIS PLAYER
        ================================================= */

        await addPlayer(
            lobbyRef
        );


        /* =================================================
           LISTEN FOR CHANGES
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
       Automatically remove the player if they
       disconnect from the lobby.
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


            /* =============================================
               GAME STARTED
            ============================================== */

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
   UPDATE GAME DISPLAY
========================================================= */

function updateGameDisplay(
    game
) {

    gameNameElement.textContent =
        GAME_NAMES[game] ||
        game;


    if (gameIconElement) {

        gameIconElement.textContent =
            GAME_ICONS[game] ||
            "🎮";

    }

}


/* =========================================================
   UPDATE LOBBY UI
========================================================= */

function updateLobbyUI(
    data
) {

    const game =
        data.game ||
        selectedGame ||
        "unknown";


    updateGameDisplay(
        game
    );


    /* =====================================================
       CODE
    ====================================================== */

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


    if (
        playerEntries.length === 0
    ) {

        const empty =
            document.createElement("div");


        empty.className =
            "empty-player-list";


        empty.textContent =
            "Waiting for players...";


        playersListElement.appendChild(
            empty
        );

    }


    /* =====================================================
       PLAYER CARDS
    ====================================================== */

    playerEntries.forEach(
        function([
            id,
            player
        ]) {

            const playerElement =
                document.createElement("div");


            playerElement.className =
                "lobby-player";


            /*
               Highlight yourself.
            */

            if (
                id === playerId
            ) {

                playerElement.classList.add(
                    "current-player"
                );

            }


            /* =============================================
               BANNER
            ============================================== */

            const banner =
                document.createElement("div");


            banner.className =
                "player-banner";


            banner.dataset.banner =
                player.banner ||
                "purple-grid";


            playerElement.appendChild(
                banner
            );


            /* =============================================
               CHARACTER
            ============================================== */

            const character =
                document.createElement("div");


            character.className =
                "player-character";


            character.dataset.character =
                player.character ||
                "leafy";


            character.dataset.effect =
                player.effect ||
                "none";


            /*
               Temporary character display.

               This can later be replaced with the
               actual Goober renderer.
            */

            character.innerHTML = `
                <div class="lobby-character-body">
                    ●
                </div>
            `;


            /* =============================================
               PLAYER DETAILS
            ============================================== */

            const details =
                document.createElement("div");


            details.className =
                "player-details";


            const name =
                document.createElement("div");


            name.className =
                "player-name";


            name.textContent =
                player.name ||
                "Player";


            details.appendChild(
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
                    document.createElement("div");


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
               YOU BADGE
            ============================================== */

            if (
                id === playerId
            ) {

                const youBadge =
                    document.createElement("span");


                youBadge.className =
                    "you-badge";


                youBadge.textContent =
                    "YOU";


                details.appendChild(
                    youBadge
                );

            }


            /* =============================================
               HOST BADGE

               IMPORTANT:

               Firebase uses hostId.
            ============================================== */

            if (
                id === data.hostId
            ) {

                const hostBadge =
                    document.createElement("span");


                hostBadge.className =
                    "host-badge";


                hostBadge.textContent =
                    "👑 HOST";


                details.appendChild(
                    hostBadge
                );

            }


            /* =============================================
               EFFECT
            ============================================== */

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


                details.appendChild(
                    effect
                );

            }


            /* =============================================
               BUILD
            ============================================== */

            playerElement.appendChild(
                character
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
       Use hostId, NOT host.
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
            "👑 You are the host — start when everyone is ready.";

    }
    else {

        hostControls.style.display =
            "none";


        waitingMessage.style.display =
            "flex";


        lobbyStatusElement.textContent =
            "Waiting for the host...";

    }


    /* =====================================================
       GAME STARTED
    ====================================================== */

    if (
        data.started === true
    ) {

        hostControls.style.display =
            "none";


        waitingMessage.style.display =
            "none";

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
   EFFECTS
========================================================= */

function getEffectName(
    id
) {

    const effects = {

        none:
            "No Effect",

        sparkle:
            "✨ Sparkle",

        "speed-trail":
            "💨 Speed Trail",

        lightning:
            "⚡ Lightning",

        rainbow:
            "🌈 Rainbow",

        fire:
            "🔥 Fire",

        glitch:
            "👾 Glitch",

        shadow:
            "🌑 Shadow",

        crystal:
            "💎 Crystal",

        "cosmic-aura":
            "🌌 Cosmic",

        crown:
            "👑 Crown"

    };


    return (
        effects[id] ||
        id
    );

}


/* =========================================================
   START GAME
========================================================= */

startGameButton.addEventListener(
    "click",
    async function() {

        if (!playerIsHost) {

            console.warn(
                "Only the host can start the game."
            );

            return;

        }


        if (!lobbyData) {

            return;

        }


        if (
            lobbyData.started === true
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
                        "starting",

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


/* =========================================================
   COUNTDOWN
========================================================= */

function startCountdown(
    data
) {

    /*
       Prevent the same client from starting
       multiple countdowns because Firebase
       can fire onValue more than once.
    */

    if (countdownRunning) {

        return;

    }


    countdownRunning =
        true;


    const game =
        data.game ||
        selectedGame ||
        "unknown";


    countdownGame.textContent =
        GAME_NAMES[game] ||
        game;


    countdownOverlay.style.display =
        "flex";


    let count = 5;


    showCountdownNumber(
        count
    );


    const interval =
        setInterval(
            function() {

                count--;


                if (
                    count > 0
                ) {

                    showCountdownNumber(
                        count
                    );

                    return;

                }


                showCountdownNumber(
                    "GO!"
                );


                clearInterval(
                    interval
                );


                setTimeout(
                    function() {

                        /*
                           TEMPORARY UNTIL THE
                           ACTUAL GAME PAGE EXISTS.
                        */

                        countdownOverlay.style.display =
                            "none";

                        countdownRunning =
                            false;

                        lobbyStatusElement.textContent =
                            `${GAME_NAMES[game] || game} is ready!`;

                    },
                    900
                );

            },
            1000
        );

}


/* =========================================================
   COUNTDOWN NUMBER
========================================================= */

function showCountdownNumber(
    value
) {

    countdownNumber.classList.remove(
        "go"
    );


    /*
       Restart CSS animation.
    */

    countdownNumber.style.animation =
        "none";


    void countdownNumber.offsetWidth;


    countdownNumber.style.animation =
        "";


    countdownNumber.textContent =
        value;


    if (
        value === "GO!"
    ) {

        countdownNumber.classList.add(
            "go"
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


            const original =
                copyCodeButton.textContent;


            copyCodeButton.textContent =
                "✓ COPIED!";


            setTimeout(
                function() {

                    copyCodeButton.textContent =
                        original;

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
               If the host leaves, we don't
               automatically delete the lobby yet.
               We'll handle host migration later.
            */

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
    "Player ID:",
    playerId
);
