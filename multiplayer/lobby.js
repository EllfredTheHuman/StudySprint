/* =========================================================
   STUDYSPRINT MULTIPLAYER LOBBY
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
   PLAYER NAME
========================================================= */

const playerName =
    localStorage.getItem(
        "username"
    ) ||
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


        /* =============================================
           GAME
        ============================================== */

        const game =
            lobbyData.game ||
            "unknown";


        gameNameElement.textContent =
            GAME_NAMES[game] ||
            game;


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
           MAKE SURE PLAYER EXISTS
        ============================================== */

        await ensurePlayerExists(
            lobbyRef,
            lobbyData
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
           LISTEN
        ============================================== */

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
   ENSURE PLAYER EXISTS
========================================================= */

async function ensurePlayerExists(
    lobbyRef,
    data
) {

    const players =
        data.players ||
        {};


    /*
       The host is already created by games.js.

       If this browser is already the host,
       DO NOT create another player.
    */

    if (
        data.hostId === playerId
    ) {

        return;

    }


    /*
       If this player is already in the lobby,
       don't overwrite them.
    */

    if (
        players[playerId]
    ) {

        return;

    }


    const cosmetics =
        getEquippedCosmetics();


    await set(
        ref(
            db,
            `lobbies/${lobbyCode}/players/${playerId}`
        ),
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

            isHost:
                false,

            joinedAt:
                Date.now()

        }
    );

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

    /* =============================================
       GAME
    ============================================== */

    const game =
        data.game ||
        "unknown";


    gameNameElement.textContent =
        GAME_NAMES[game] ||
        game;


    /* =============================================
       CODE
    ============================================== */

    lobbyCodeElement.textContent =
        lobbyCode;


    /* =============================================
       PLAYERS
    ============================================== */

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
                "p"
            );


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

            const playerElement =
                document.createElement(
                    "div"
                );


            playerElement.className =
                "player-item";


            /* =====================================
               CHARACTER
            ====================================== */

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


            characterElement.textContent =
                "●";


            /* =====================================
               INFO
            ====================================== */

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


            /* =====================================
               TITLE
            ====================================== */

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


            /* =====================================
               HOST
            ====================================== */

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


    /* =============================================
       HOST DETECTION
    ============================================== */

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
            !playerIsHost
        ) {

            return;

        }


        if (
            !lobbyData
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
       TEMPORARY TEST.

       Later this will redirect everyone
       to the actual Bossy game.
    */

    if (
        !window.studySprintGameAlertShown
    ) {

        window.studySprintGameAlertShown =
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


            const original =
                copyCodeButton.textContent;


            copyCodeButton.textContent =
                "COPIED!";


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
                "Could not copy code:",
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


            /*
               If the host leaves, delete the lobby.
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


console.log(
    "StudySprint multiplayer lobby loaded."
);

console.log(
    "Lobby:",
    lobbyCode
);

console.log(
    "Player ID:",
    playerId
);
