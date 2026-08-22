```javascript
/* =========================================================
   STUDYSPRINT — BOSSY
   Multiplayer side-view game

   Features:
   - Firebase lobby connection
   - Real StudySprint Goober characters
   - Equipped character from localStorage
   - Multiplayer player syncing
   - A / D movement
   - SPACE jumping
   - Gravity
   - Ground collision
   - Player spawning
========================================================= */

import { db } from "../../firebase.js";

import {
    ref,
    get,
    onValue,
    update,
    onDisconnect
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


/* =========================================================
   ELEMENTS
========================================================= */

const loadingScreen =
    document.getElementById("bossy-loading");

const loadingStatus =
    document.getElementById("loading-status");

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
    document.getElementById("bossy-player-count");

const connectionElement =
    document.getElementById("bossy-connection");

const localNameElement =
    document.getElementById("bossy-local-name");

const gameMap =
    document.getElementById("game-map");


/* =========================================================
   CONSTANTS
========================================================= */

const GAME_WIDTH = 1200;

const PLAYER_WIDTH = 140;

const PLAYER_HEIGHT = 150;

const GROUND_Y = 0;

const MOVE_SPEED = 6;

const GRAVITY = 0.75;

const JUMP_FORCE = 15;

const UPDATE_RATE = 30;


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
   PLAYER DATA
========================================================= */

const username =
    localStorage.getItem("username") ||
    "Player";


const equippedCharacterId =
    localStorage.getItem(
        "character_character"
    ) ||
    "leafy";


const equippedTitleId =
    localStorage.getItem(
        "character_title"
    ) ||
    "none";


const equippedBannerId =
    localStorage.getItem(
        "character_banner"
    ) ||
    "purple-grid";


const equippedEffectId =
    localStorage.getItem(
        "character_effect"
    ) ||
    "none";


/* =========================================================
   LOCAL PHYSICS
========================================================= */

let localX = 150;

let localY = 0;

let velocityY = 0;

let onGround = true;

let leftPressed = false;

let rightPressed = false;

let jumpQueued = false;


/* =========================================================
   PLAYER DOM CACHE
========================================================= */

const playerElements =
    new Map();


/* =========================================================
   CHARACTER DATA
========================================================= */

const SHOP_CHARACTERS = [

    {
        id: "leafy",
        name: "Leafy",
        rarity: "Common",
        design: "leafy"
    },

    {
        id: "squish",
        name: "Squish",
        rarity: "Common",
        design: "squish"
    },

    {
        id: "pebble",
        name: "Pebble",
        rarity: "Common",
        design: "pebble"
    },

    {
        id: "button",
        name: "Button",
        rarity: "Common",
        design: "button"
    },

    {
        id: "horns",
        name: "Horns",
        rarity: "Rare",
        design: "horns"
    },

    {
        id: "shelby",
        name: "Shelby",
        rarity: "Rare",
        design: "shelby"
    },

    {
        id: "tallboi",
        name: "Tallboi",
        rarity: "Rare",
        design: "tallboi"
    },

    {
        id: "four-eyes",
        name: "Four Eyes",
        rarity: "Rare",
        design: "fourEyes"
    },

    {
        id: "mothball",
        name: "Mothball",
        rarity: "Epic",
        design: "mothball"
    },

    {
        id: "spike",
        name: "Spike",
        rarity: "Epic",
        design: "spike"
    },

    {
        id: "orbit",
        name: "Orbit",
        rarity: "Epic",
        design: "orbit"
    },

    {
        id: "bubble",
        name: "Bubble",
        rarity: "Epic",
        design: "bubble"
    },

    {
        id: "captain-goob",
        name: "Captain Goob",
        rarity: "Mythic",
        design: "captainGoob"
    },

    {
        id: "tailspin",
        name: "Tailspin",
        rarity: "Mythic",
        design: "tailspin"
    },

    {
        id: "holy-moly",
        name: "Holy Moly",
        rarity: "Mythic",
        design: "holyMoly"
    },

    {
        id: "wingnut",
        name: "Wingnut",
        rarity: "Mythic",
        design: "wingnut"
    },

    {
        id: "cosmo",
        name: "Cosmo",
        rarity: "Legendary",
        design: "cosmo"
    },

    {
        id: "the-goober",
        name: "The Goober",
        rarity: "Legendary",
        design: "theGoober"
    },

    {
        id: "golden-goober",
        name: "Golden Goober",
        rarity: "Legendary",
        design: "golden"
    },

    {
        id: "galaxy-goober",
        name: "Galaxy Goober",
        rarity: "Legendary",
        design: "galaxy"
    },

    {
        id: "study-sprout",
        name: "Study Sprout",
        rarity: "Epic",
        design: "studySprout"
    },

    {
        id: "study-orbit",
        name: "Study Orbit",
        rarity: "Legendary",
        design: "studyOrbit"
    }

];


/* =========================================================
   GET CHARACTER
========================================================= */

function getCharacterData(id) {

    return (
        SHOP_CHARACTERS.find(
            character =>
                character.id === id
        ) ||
        SHOP_CHARACTERS[0]
    );

}


/* =========================================================
   CREATE REAL STUDYSPRINT GOOBER
========================================================= */

function createGooberPreview(data) {

    const goober =
        document.createElement("div");

    goober.className =
        "goober design-" +
        data.design;


    const body =
        document.createElement("div");

    body.className =
        "goober-body";


    const face =
        document.createElement("div");

    face.className =
        "goober-face";


    const leftEye =
        document.createElement("div");

    leftEye.className =
        "goober-eye eye-left";


    const rightEye =
        document.createElement("div");

    rightEye.className =
        "goober-eye eye-right";


    const mouth =
        document.createElement("div");

    mouth.className =
        "goober-mouth";


    const feet =
        document.createElement("div");

    feet.className =
        "goober-feet";


    const leftFoot =
        document.createElement("div");

    leftFoot.className =
        "goober-foot foot-left";


    const rightFoot =
        document.createElement("div");

    rightFoot.className =
        "goober-foot foot-right";


    face.appendChild(leftEye);

    face.appendChild(rightEye);

    face.appendChild(mouth);


    feet.appendChild(leftFoot);

    feet.appendChild(rightFoot);


    goober.appendChild(feet);

    goober.appendChild(body);

    goober.appendChild(face);


    function addPart(className) {

        const part =
            document.createElement("div");

        part.className =
            "goober-part " +
            className;

        goober.appendChild(part);

        return part;

    }


    const designs = {

        leafy: [
            "green",
            "leafy-leaf",
            "leafy-stem"
        ],

        squish: [
            "blue",
            "squishy",
            "squish-cheek-left",
            "squish-cheek-right"
        ],

        pebble: [
            "stone",
            "pebble-mark-one",
            "pebble-mark-two",
            "pebble-mark-three"
        ],

        button: [
            "pink",
            "button-top",
            "button-dot-left",
            "button-dot-right"
        ],

        horns: [
            "purple",
            "horn-left",
            "horn-right"
        ],

        shelby: [
            "mint"
        ],

        tallboi: [
            "yellow",
            "tall",
            "tallboi-hat"
        ],

        fourEyes: [
            "coral",
            "four-eyes-brow"
        ],

        mothball: [
            "lavender",
            "moth-wing-left",
            "moth-wing-right",
            "moth-antenna-left",
            "moth-antenna-right"
        ],

        spike: [
            "red",
            "spike-one",
            "spike-two",
            "spike-three",
            "spike-four"
        ],

        orbit: [
            "cyan",
            "orbit-ring",
            "orbit-dot"
        ],

        bubble: [
            "aqua",
            "bubble-small-one",
            "bubble-small-two",
            "bubble-shine"
        ],

        captainGoob: [
            "violet",
            "captain-badge",
            "captain-hat"
        ],

        tailspin: [
            "hotpink",
            "tailspin-tail",
            "tailspin-tip"
        ],

        holyMoly: [
            "gold",
            "holy-halo",
            "holy-rays"
        ],

        wingnut: [
            "peach",
            "wingnut-left",
            "wingnut-right",
            "wingnut-nut"
        ],

        cosmo: [
            "deep-purple",
            "cosmo-stars",
            "cosmo-moon"
        ],

        theGoober: [
            "orange",
            "goober-big-smile",
            "goober-tuft",
            "goober-star"
        ],

        golden: [
            "golden",
            "golden-shine",
            "golden-crown"
        ],

        galaxy: [
            "galaxy-body",
            "galaxy-stars",
            "galaxy-ring",
            "galaxy-glow"
        ],

        studySprout: [
            "study-green",
            "study-book",
            "study-leaf-left",
            "study-leaf-right"
        ],

        studyOrbit: [
            "study-purple",
            "study-orbit-ring",
            "study-star"
        ]

    };


    const bodyColours = [

        "green",
        "blue",
        "squishy",
        "stone",
        "pink",
        "purple",
        "yellow",
        "tall",
        "coral",
        "lavender",
        "red",
        "cyan",
        "aqua",
        "violet",
        "hotpink",
        "gold",
        "peach",
        "deep-purple",
        "orange",
        "golden",
        "galaxy-body",
        "study-green",
        "study-purple",
        "mint"

    ];


    const parts =
        designs[data.design] || [];


    parts.forEach(
        function(part) {

            if (
                bodyColours.includes(part)
            ) {

                body.classList.add(part);

            }

            else {

                addPart(part);

            }

        }
    );


    if (
        data.design === "fourEyes"
    ) {

        const extraOne =
            document.createElement("div");

        extraOne.className =
            "goober-eye extra-eye extra-one";


        const extraTwo =
            document.createElement("div");

        extraTwo.className =
            "goober-eye extra-eye extra-two";


        face.appendChild(extraOne);

        face.appendChild(extraTwo);

    }


    if (
        data.design === "shelby"
    ) {

        const shell =
            document.createElement("div");

        shell.className =
            "shelby-shell";


        goober.insertBefore(
            shell,
            face
        );


        addPart(
            "shell-highlight"
        );

    }


    if (
        data.design === "captainGoob"
    ) {

        const cape =
            document.createElement("div");

        cape.className =
            "captain-cape";


        goober.insertBefore(
            cape,
            body
        );

    }


    return goober;

}


/* =========================================================
   EFFECTS
========================================================= */

function applyEffect(
    wrapper,
    effectId
) {

    if (
        !effectId ||
        effectId === "none"
    ) {

        return;

    }


    wrapper.classList.add(
        "effect-" +
        effectId.replace(
            "speed-trail",
            "speed-trail"
        )
    );


    if (
        effectId === "sparkle"
    ) {

        for (
            let i = 0;
            i < 6;
            i++
        ) {

            const sparkle =
                document.createElement("div");

            sparkle.className =
                "character-effect-element effect-sparkle-dot";

            sparkle.dataset.index =
                i;

            wrapper.appendChild(
                sparkle
            );

        }

    }


    if (
        effectId === "fire"
    ) {

        for (
            let i = 0;
            i < 7;
            i++
        ) {

            const flame =
                document.createElement("div");

            flame.className =
                "character-effect-element effect-flame";

            flame.dataset.index =
                i;

            wrapper.appendChild(
                flame
            );

        }

    }


    if (
        effectId === "cosmic-aura"
    ) {

        const ring =
            document.createElement("div");

        ring.className =
            "character-effect-element effect-cosmic-ring";

        wrapper.appendChild(
            ring
        );

    }


    if (
        effectId === "shadow"
    ) {

        const shadow =
            document.createElement("div");

        shadow.className =
            "character-effect-element effect-shadow-ground";

        wrapper.appendChild(
            shadow
        );

    }


    if (
        effectId === "crown"
    ) {

        const goober =
            wrapper.querySelector(
                ".goober"
            );


        if (goober) {

            const crown =
                document.createElement("div");

            crown.className =
                "character-crown";


            crown.innerHTML = `
                <span class="crown-point"></span>
                <span class="crown-point"></span>
                <span class="crown-point"></span>
            `;


            goober.appendChild(
                crown
            );

        }

    }

}


/* =========================================================
   CREATE PLAYER ELEMENT
========================================================= */

function createPlayerElement(
    id,
    player
) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "bossy-player";


    wrapper.dataset.playerId =
        id;


    if (
        id === playerId
    ) {

        wrapper.classList.add(
            "local-player"
        );

    }


    /* =====================================================
       CHARACTER HOLDER
    ====================================================== */

    const characterHolder =
        document.createElement("div");

    characterHolder.className =
        "bossy-character";


    const character =
        getCharacterData(
            player.characterId ||
            player.character ||
            "leafy"
        );


    const goober =
        createGooberPreview(
            character
        );


    characterHolder.appendChild(
        goober
    );


    applyEffect(
        characterHolder,
        player.effectId ||
        "none"
    );


    wrapper.appendChild(
        characterHolder
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


    wrapper.appendChild(
        name
    );


    /* =====================================================
       TITLE
    ====================================================== */

    if (
        player.titleId &&
        player.titleId !== "none"
    ) {

        const title =
            document.createElement("div");

        title.className =
            "bossy-player-title";

        title.textContent =
            getTitleName(
                player.titleId
            );

        wrapper.appendChild(
            title
        );

    }


    playersContainer.appendChild(
        wrapper
    );


    playerElements.set(
        id,
        wrapper
    );


    updatePlayerElement(
        wrapper,
        player
    );


    return wrapper;

}


/* =========================================================
   TITLE
========================================================= */

function getTitleName(id) {

    const titles = {

        "study-sprinter":
            "Study Sprinter",

        "brainiac":
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
        ""
    );

}


/* =========================================================
   UPDATE PLAYER ELEMENT
========================================================= */

function updatePlayerElement(
    element,
    player
) {

    if (!element)
        return;


    const x =
        Number.isFinite(
            Number(player.x)
        )
            ? Number(player.x)
            : 150;


    const y =
        Number.isFinite(
            Number(player.y)
        )
            ? Number(player.y)
            : 0;


    element.style.left =
        `${x}px`;


    element.style.bottom =
        `${y}px`;


    if (
        player.direction === "left"
    ) {

        element.classList.add(
            "facing-left"
        );

    }

    else {

        element.classList.remove(
            "facing-left"
        );

    }


    if (
        player.grounded === false
    ) {

        element.classList.add(
            "jumping"
        );

    }

    else {

        element.classList.remove(
            "jumping"
        );

    }

}


/* =========================================================
   RENDER PLAYERS
========================================================= */

function renderPlayers(
    players
) {

    const ids =
        new Set(
            Object.keys(players)
        );


    playerElements.forEach(
        function(element, id) {

            if (
                !ids.has(id)
            ) {

                element.remove();

                playerElements.delete(
                    id
                );

            }

        }
    );


    Object.entries(
        players
    ).forEach(
        function([
            id,
            player
        ]) {

            if (!player)
                return;


            let element =
                playerElements.get(id);


            if (!element) {

                element =
                    createPlayerElement(
                        id,
                        player
                    );

            }


            const oldCharacter =
                element.dataset.characterId;


            const newCharacter =
                player.characterId ||
                player.character ||
                "leafy";


            if (
                oldCharacter !== newCharacter
            ) {

                element.remove();

                playerElements.delete(
                    id
                );


                element =
                    createPlayerElement(
                        id,
                        player
                    );

            }


            element.dataset.characterId =
                newCharacter;


            updatePlayerElement(
                element,
                player
            );

        }
    );


    const count =
        Object.keys(
            players
        ).length;


    playerCountElement.textContent =
        count === 1
            ? "1 Player"
            : `${count} Players`;

}


/* =========================================================
   REGISTER LOCAL PLAYER
========================================================= */

async function registerLocalPlayer(
    playersRef
) {

    const existingSnapshot =
        await get(
            ref(
                db,
                `lobbies/${lobbyCode}/players/${playerId}`
            )
        );


    let existing =
        existingSnapshot.exists()
            ? existingSnapshot.val()
            : {};


    const existingX =
        Number.isFinite(
            Number(existing.x)
        )
            ? Number(existing.x)
            : getSpawnPosition();


    const playerData = {

        name:
            username,

        characterId:
            equippedCharacterId,

        titleId:
            equippedTitleId,

        bannerId:
            equippedBannerId,

        effectId:
            equippedEffectId,

        x:
            existingX,

        y:
            0,

        grounded:
            true,

        direction:
            existing.direction ||
            "right",

        connected:
            true,

        game:
            "bossy"

    };


    await update(
        ref(
            db,
            `lobbies/${lobbyCode}/players/${playerId}`
        ),
        playerData
    );


    onDisconnect(
        ref(
            db,
            `lobbies/${lobbyCode}/players/${playerId}/connected`
        )
    ).set(false);


    localX =
        playerData.x;

    localY =
        0;

    velocityY =
        0;

    onGround =
        true;


    localNameElement.textContent =
        username;

}


/* =========================================================
   SPAWN POSITION
========================================================= */

function getSpawnPosition() {

    const existing =
        Array.from(
            playerElements.values()
        );


    const spawn =
        150 +
        (
            existing.length *
            160
        );


    return Math.min(
        spawn,
        GAME_WIDTH - PLAYER_WIDTH - 50
    );

}


/* =========================================================
   CONTROLS
========================================================= */

function setupControls() {

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.code === "KeyA" ||
                event.key.toLowerCase() === "a"
            ) {

                leftPressed =
                    true;

                event.preventDefault();

            }


            if (
                event.code === "KeyD" ||
                event.key.toLowerCase() === "d"
            ) {

                rightPressed =
                    true;

                event.preventDefault();

            }


            if (
                event.code === "Space"
            ) {

                if (
                    !event.repeat
                ) {

                    jumpQueued =
                        true;

                }

                event.preventDefault();

            }

        }
    );


    document.addEventListener(
        "keyup",
        function(event) {

            if (
                event.code === "KeyA" ||
                event.key.toLowerCase() === "a"
            ) {

                leftPressed =
                    false;

            }


            if (
                event.code === "KeyD" ||
                event.key.toLowerCase() === "d"
            ) {

                rightPressed =
                    false;

            }

        }
    );

}


/* =========================================================
   PHYSICS LOOP
========================================================= */

function startPhysics() {

    const playersRef =
        ref(
            db,
            `lobbies/${lobbyCode}/players/${playerId}`
        );


    let lastTime =
        performance.now();


    function loop(
        currentTime
    ) {

        const delta =
            Math.min(
                (currentTime - lastTime) /
                16.6667,
                2
            );


        lastTime =
            currentTime;


        updatePhysics(
            delta
        );


        requestAnimationFrame(
            loop
        );

    }


    requestAnimationFrame(
        loop
    );


    setInterval(
        function() {

            update(
                playersRef,
                {

                    x:
                        Math.round(
                            localX
                        ),

                    y:
                        Math.round(
                            localY
                        ),

                    grounded:
                        onGround,

                    direction:
                        leftPressed
                            ? "left"
                            : rightPressed
                                ? "right"
                                : undefined

                }
            )
            .catch(
                function(error) {

                    console.error(
                        "Bossy movement sync failed:",
                        error
                    );

                }
            );

        },
        1000 / UPDATE_RATE
    );

}


/* =========================================================
   UPDATE PHYSICS
========================================================= */

function updatePhysics(
    delta
) {

    let direction =
        0;


    if (
        leftPressed
    ) {

        direction -= 1;

    }


    if (
        rightPressed
    ) {

        direction += 1;

    }


    localX +=
        direction *
        MOVE_SPEED *
        delta;


    /* =====================================================
       JUMP
    ====================================================== */

    if (
        jumpQueued &&
        onGround
    ) {

        velocityY =
            JUMP_FORCE;

        onGround =
            false;

    }


    jumpQueued =
        false;


    /* =====================================================
       GRAVITY
    ====================================================== */

    if (
        !onGround
    ) {

        velocityY -=
            GRAVITY *
            delta;

        localY +=
            velocityY *
            delta;


        if (
            localY <= GROUND_Y
        ) {

            localY =
                GROUND_Y;

            velocityY =
                0;

            onGround =
                true;

        }

    }


    /* =====================================================
       MAP BOUNDS
    ====================================================== */

    const maxX =
        Math.max(
            100,
            gameMap.clientWidth -
            PLAYER_WIDTH -
            20
        );


    localX =
        Math.max(
            20,
            Math.min(
                maxX,
                localX
            )
        );


    /* =====================================================
       UPDATE OUR OWN DOM IMMEDIATELY
    ====================================================== */

    const localElement =
        playerElements.get(
            playerId
        );


    if (localElement) {

        updatePlayerElement(
            localElement,
            {

                x:
                    localX,

                y:
                    localY,

                grounded:
                    onGround,

                direction:
                    leftPressed
                        ? "left"
                        : rightPressed
                            ? "right"
                            : "right"

            }
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

        },
        function(error) {

            console.error(
                "Bossy player listener failed:",
                error
            );


            connectionElement.textContent =
                "Connection error";

            connectionElement.className =
                "connection-status error";

        }
    );

}


/* =========================================================
   START BOSSY
========================================================= */

async function startBossy() {

    try {

        if (!lobbyCode) {

            showError(
                "No lobby code was provided. Return to the games page and try again."
            );

            return;

        }


        lobbyCodeElement.textContent =
            lobbyCode;


        loadingStatus.textContent =
            "Finding your lobby...";


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
                "That lobby no longer exists."
            );

            return;

        }


        const lobby =
            snapshot.val();


        if (
            String(
                lobby.game ||
                ""
            ).toLowerCase() !==
            "bossy"
        ) {

            showError(
                "This lobby isn't a Bossy game."
            );

            return;

        }


        loadingStatus.textContent =
            "Loading players...";


        /*
           IMPORTANT:

           Show the actual game BEFORE waiting for
           Firebase listeners.

           This prevents the host from getting
           permanently stuck on the loading screen.
        */

        loadingScreen.style.display =
            "none";


        gameWorld.style.display =
            "flex";


        connectionElement.textContent =
            "Connected";

        connectionElement.className =
            "connection-status connected";


        setupControls();


        /*
           Register this browser as the current
           player before starting the listener.
        */

        await registerLocalPlayer();


        /*
           Now listen for everyone.
        */

        listenForPlayers();


        /*
           Start local physics.
        */

        startPhysics();

    }
    catch (error) {

        console.error(
            "Bossy failed to load:",
            error
        );


        showError(
            "Couldn't connect to the multiplayer game. Check your connection and try again."
        );

    }

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


/* =========================================================
   START
========================================================= */

startBossy();
```
