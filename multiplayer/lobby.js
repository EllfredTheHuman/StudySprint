/* =========================================================
   STUDYSPRINT MULTIPLAYER LOBBY

   Handles:
   - Joining a lobby
   - Player information
   - Player cosmetics
   - Host detection
   - Real-time player syncing
   - Starting the game
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
   PLAYER IDENTITY
========================================================= */

/*
   Each browser gets a unique ID for this lobby session.
*/

const playerId =
    crypto.randomUUID();


/*
   StudySprint already stores the player's
   username in localStorage.
*/

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
   LOBBY STATE
========================================================= */

let lobbyData = null;

let playerIsHost = false;


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
   INITIALISE LOBBY
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


        /* =================================================
           LOBBY DOES NOT EXIST
        ================================================= */

        if (!snapshot.exists()) {

            showError(
                "This lobby doesn't exist."
            );

            return;

        }


        lobbyData =
            snapshot.val();


        /* =================================================
           GAME
        ================================================= */

        const game =
            lobbyData.game ||
            selectedGame ||
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

            handleGameStarted(
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
           LISTEN FOR LOBBY CHANGES
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


    /*
       Save the player AND their cosmetics.
    */

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


    /*
       If the player closes their browser,
       Firebase automatically removes them.
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


            /* =============================================
               GAME STARTED
            ============================================== */

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
   UPDATE LOBBY UI
========================================================= */

function updateLobbyUI(
    data
) {

    /* =====================================================
       GAME
    ====================================================== */

    const game =
        data.game ||
        selectedGame ||
        "unknown";


    gameNameElement.textContent =
        GAME_NAMES[game] ||
        game;


    /* =====================================================
       LOBBY CODE
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


    /* =====================================================
       EMPTY
    ====================================================== */

    if (
        playerEntries.length === 0
    ) {

        const empty =
            document.createElement("p");


        empty.className =
            "empty-players";


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
                "player-item";


            /* =============================================
               CHARACTER
            ============================================== */

            const characterElement =
                document.createElement("div");


            characterElement.className =
                "player-character";


            /*
               Store cosmetic information as
               data attributes for the CSS/renderer.
            */

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
               For now, show a simple character
               placeholder.

               We can plug your existing
               createGooberPreview() system into
               this later so the actual Goober
               appears here.
            */

            characterElement.textContent =
                "●";


            /* =============================================
               PLAYER INFORMATION
            ============================================== */

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


                information.appendChild(
                    title
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


                information.appendChild(
                    effect
                );

            }


            /* =============================================
               HOST BADGE
            ============================================== */

            if (
                id === data.host
            ) {

                const hostBadge =
                    document.createElement("span");


                hostBadge.className =
                    "host-badge";


                hostBadge.textContent =
                    "HOST";


                information.appendChild(
                    hostBadge
                );

            }


            /* =============================================
               BUILD CARD
            ============================================== */

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
       HOST
    ====================================================== */

    playerIsHost =
        data.host === playerId;


    if (
        playerIsHost
    ) {

        hostControls.style.display =
            "block";


        waitingMessage.style.display =
            "none";

    }
    else {

        hostControls.style.display =
            "none";


        waitingMessage.style.display =
            "block";

    }


    /* =====================================================
       STATUS
    ====================================================== */

    if (
        playerIsHost
    ) {

        lobbyStatusElement.textContent =
            "You are the host.";

    }
    else {

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
   EFFECT NAMES
========================================================= */

function getEffectName(
    id
) {

    const effects = {

        none:
            "No Effect",

        sparkle:
            "Sparkle Effect",

        "speed-trail":
            "Speed Trail",

        lightning:
            "Lightning Effect",

        rainbow:
            "Rainbow Aura",

        fire:
            "Fire Aura",

        glitch:
            "Glitch Effect",

        shadow:
            "Shadow Aura",

        crystal:
            "Crystal Glow",

        "cosmic-aura":
            "Cosmic Aura",

        crown:
            "Crown + Glow"

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

        if (
            !playerIsHost
        ) {

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
        selectedGame;


    /*
       TEMPORARY:

       Later this will redirect everyone
       to the actual game page.

       The important thing right now is
       that every connected player receives
       the same "started: true" update.
    */

    setTimeout(
        function() {

            alert(
                `${GAME_NAMES[game] || game} is starting!`
            );

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


            const originalText =
                copyCodeButton.textContent;


            copyCodeButton.textContent =
                "Copied!";


            setTimeout(
                function() {

                    copyCodeButton.textContent =
                        originalText;

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
