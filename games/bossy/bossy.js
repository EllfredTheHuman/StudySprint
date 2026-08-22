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
   - Reliable ground collision
   - Remote character syncing
   - Loading timeout protection
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

const PLAYER_WIDTH = 140;
const PLAYER_HEIGHT = 150;

const MOVE_SPEED = 6;

const GRAVITY = 0.75;

const JUMP_FORCE = 15;

const UPDATE_RATE = 30;

const START_X = 150;

const GROUND_Y = 0;


/* =========================================================
   FIREBASE TIMEOUT
========================================================= */

const FIREBASE_TIMEOUT = 8000;


/*
   Firebase can occasionally leave a get()/write()
   waiting forever when the connection is unavailable.

   This prevents Bossy from being stuck on
   "Loading Bossy..." indefinitely.
*/

function withTimeout(
    promise,
    milliseconds,
    message
) {

    return Promise.race([

        promise,

        new Promise(
            function(_, reject) {

                setTimeout(
                    function() {

                        reject(
                            new Error(message)
                        );

                    },
                    milliseconds
                );

            }
        )

    ]);

}


/* =========================================================
   PLAYER ID
========================================================= */

function getPlayerId() {

    let id =
        localStorage.getItem(
            "studySprintPlayerId"
        );


    if (!id) {

        if (
            window.crypto &&
            typeof crypto.randomUUID === "function"
        ) {

            id =
                crypto.randomUUID();

        }

        else {

            id =
                "player-" +
                Date.now() +
                "-" +
                Math.random()
                    .toString(36)
                    .slice(2);

        }


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
   LOCAL PLAYER DATA
========================================================= */

const username =
    localStorage.getItem(
        "username"
    ) ||
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

let localX =
    START_X;

let localY =
    GROUND_Y;

let velocityY =
    0;

let onGround =
    true;

let leftPressed =
    false;

let rightPressed =
    false;

let jumpQueued =
    false;


/* =========================================================
   PLAYER DOM CACHE
========================================================= */

const playerElements =
    new Map();


/* =========================================================
   LAST KNOWN PLAYER DATA
========================================================= */

const knownPlayers =
    new Map();


/* =========================================================
   SHOP CHARACTERS
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
   TITLES
========================================================= */

const CHARACTER_TITLES = {

    "none":
        "",

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


    face.appendChild(
        leftEye
    );

    face.appendChild(
        rightEye
    );

    face.appendChild(
        mouth
    );


    feet.appendChild(
        leftFoot
    );

    feet.appendChild(
        rightFoot
    );


    goober.appendChild(
        feet
    );

    goober.appendChild(
        body
    );

    goober.appendChild(
        face
    );


    function addPart(
        className
    ) {

        const part =
            document.createElement("div");

        part.className =
            "goober-part " +
            className;

        goober.appendChild(
            part
        );

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
        designs[data.design] ||
        designs.leafy;


    parts.forEach(
        function(part) {

            if (
                bodyColours.includes(part)
            ) {

                body.classList.add(
                    part
                );

            }

            else {

                addPart(
                    part
                );

            }

        }
    );


    /* =====================================================
       FOUR EYES
    ====================================================== */

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


        face.appendChild(
            extraOne
        );

        face.appendChild(
            extraTwo
        );

    }


    /* =====================================================
       SHELBY
    ====================================================== */

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


    /* =====================================================
       CAPTAIN GOOB
    ====================================================== */

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
        effectId
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

            sparkle.style.setProperty(
                "--sparkle-index",
                i
            );

            wrapper.appendChild(
                sparkle
            );

        }

    }


    if (
        effectId === "speed-trail"
    ) {

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            const streak =
                document.createElement("div");

            streak.className =
                "character-effect-element effect-speed-streak";

            streak.style.setProperty(
                "--trail-index",
                i
            );

            wrapper.appendChild(
                streak
            );

        }

    }


    if (
        effectId === "lightning"
    ) {

        for (
            let i = 0;
            i < 4;
            i++
        ) {

            const bolt =
                document.createElement("div");

            bolt.className =
                "character-effect-element effect-lightning-bolt";

            bolt.style.setProperty(
                "--lightning-index",
                i
            );

            wrapper.appendChild(
                bolt
            );

        }

    }


    if (
        effectId === "rainbow"
    ) {

        const ring =
            document.createElement("div");

        ring.className =
            "character-effect-element effect-rainbow-ring";

        wrapper.appendChild(
            ring
        );


        const inner =
            document.createElement("div");

        inner.className =
            "character-effect-element effect-rainbow-ring-inner";

        wrapper.appendChild(
            inner
        );

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

            flame.style.setProperty(
                "--flame-index",
                i
            );

            wrapper.appendChild(
                flame
            );

        }

    }


    if (
        effectId === "glitch"
    ) {

        for (
            let i = 0;
            i < 3;
            i++
        ) {

            const glitch =
                document.createElement("div");

            glitch.className =
                "character-effect-element effect-glitch-piece";

            glitch.style.setProperty(
                "--glitch-index",
                i
            );

            wrapper.appendChild(
                glitch
            );

        }

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
        effectId === "crystal"
    ) {

        for (
            let i = 0;
            i < 6;
            i++
        ) {

            const crystal =
                document.createElement("div");

            crystal.className =
                "character-effect-element effect-crystal-shard";

            crystal.style.setProperty(
                "--crystal-index",
                i
            );

            wrapper.appendChild(
                crystal
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


        for (
            let i = 0;
            i < 8;
            i++
        ) {

            const star =
                document.createElement("div");

            star.className =
                "character-effect-element effect-cosmic-star";

            star.style.setProperty(
                "--star-index",
                i
            );

            wrapper.appendChild(
                star
            );

        }

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


            const glow =
                document.createElement("div");

            glow.className =
                "character-effect-element crown-glow";

            wrapper.appendChild(
                glow
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


    wrapper.dataset.characterId =
        player.characterId ||
        player.character ||
        "leafy";


    wrapper.dataset.effectId =
        player.effectId ||
        "none";


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
            wrapper.dataset.characterId
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
        wrapper.dataset.effectId
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

    const titleId =
        player.titleId ||
        "none";


    if (
        titleId !== "none"
    ) {

        const title =
            document.createElement("div");

        title.className =
            "bossy-player-title";


        title.textContent =
            CHARACTER_TITLES[
                titleId
            ] ||
            "";


        if (
            title.textContent
        ) {

            wrapper.appendChild(
                title
            );

        }

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
   REBUILD PLAYER CHARACTER
========================================================= */

function rebuildPlayerElement(
    id,
    player
) {

    const oldElement =
        playerElements.get(id);


    if (
        oldElement
    ) {

        oldElement.remove();

        playerElements.delete(
            id
        );

    }


    return createPlayerElement(
        id,
        player
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
            : START_X;


    const y =
        Number.isFinite(
            Number(player.y)
        )
            ? Math.max(
                GROUND_Y,
                Number(player.y)
            )
            : GROUND_Y;


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
            Object.keys(
                players
            )
        );


    /* =====================================================
       REMOVE PLAYERS WHO LEFT
    ====================================================== */

    playerElements.forEach(
        function(element, id) {

            if (
                !ids.has(id)
            ) {

                element.remove();

                playerElements.delete(
                    id
                );

                knownPlayers.delete(
                    id
                );

            }

        }
    );


    /* =====================================================
       CREATE / UPDATE PLAYERS
    ====================================================== */

    Object.entries(
        players
    ).forEach(
        function([
            id,
            player
        ]) {

            if (!player)
                return;


            const characterId =
                player.characterId ||
                player.character ||
                "leafy";


            const effectId =
                player.effectId ||
                "none";


            const titleId =
                player.titleId ||
                "none";


            let element =
                playerElements.get(
                    id
                );


            const previous =
                knownPlayers.get(
                    id
                );


            const appearanceChanged =
                !previous ||
                previous.characterId !==
                    characterId ||
                previous.effectId !==
                    effectId ||
                previous.titleId !==
                    titleId;


            if (
                !element
            ) {

                element =
                    createPlayerElement(
                        id,
                        player
                    );

            }

            else if (
                appearanceChanged
            ) {

                element =
                    rebuildPlayerElement(
                        id,
                        player
                    );

            }


            element.dataset.characterId =
                characterId;


            element.dataset.effectId =
                effectId;


            updatePlayerElement(
                element,
                player
            );


            knownPlayers.set(
                id,
                {

                    characterId:
                        characterId,

                    effectId:
                        effectId,

                    titleId:
                        titleId

                }
            );

        }
    );


    /* =====================================================
       PLAYER COUNT
    ====================================================== */

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
   FIND SPAWN
========================================================= */

function getSpawnPosition(
    players
) {

    const usedPositions =
        Object.values(
            players || {}
        )
        .map(
            player =>
                Number(player?.x)
        )
        .filter(
            Number.isFinite
        );


    let spawn =
        START_X;


    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const collision =
            usedPositions.some(
                x =>
                    Math.abs(
                        x - spawn
                    ) <
                    PLAYER_WIDTH + 20
            );


        if (!collision)
            break;


        spawn +=
            PLAYER_WIDTH + 30;

    }


    const mapWidth =
        gameMap?.clientWidth ||
        1200;


    const maxX =
        Math.max(
            20,
            mapWidth -
            PLAYER_WIDTH -
            20
        );


    return Math.min(
        spawn,
        maxX
    );

}


/* =========================================================
   REGISTER LOCAL PLAYER
========================================================= */

async function registerLocalPlayer(
    existingPlayers
) {

    const playerRef =
        ref(
            db,
            `lobbies/${lobbyCode}/players/${playerId}`
        );


    let existing = {};


    try {

        const existingSnapshot =
            await withTimeout(
                get(
                    playerRef
                ),
                FIREBASE_TIMEOUT,
                "Firebase took too long to read your player data."
            );


        if (
            existingSnapshot.exists()
        ) {

            existing =
                existingSnapshot.val() ||
                {};

        }

    }

    catch (error) {

        console.warn(
            "Could not read existing player data. Using a fresh spawn.",
            error
        );

    }


    const existingX =
        Number.isFinite(
            Number(existing.x)
        )
            ? Number(existing.x)
            : getSpawnPosition(
                existingPlayers
            );


    localX =
        existingX;

    localY =
        GROUND_Y;

    velocityY =
        0;

    onGround =
        true;


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
            localX,

        y:
            GROUND_Y,

        grounded:
            true,

        direction:
            existing.direction === "left"
                ? "left"
                : "right",

        connected:
            true,

        game:
            "bossy"

    };


    /*
       Register the player.

       This write has a timeout so a broken Firebase
       connection can NEVER leave the loading screen
       spinning forever.
    */

    await withTimeout(

        update(
            playerRef,
            playerData
        ),

        FIREBASE_TIMEOUT,

        "Firebase took too long to register your player."

    );


    /*
       Tell Firebase to mark the player disconnected
       if this browser suddenly disappears.
    */

    try {

        await withTimeout(

            onDisconnect(
                ref(
                    db,
                    `lobbies/${lobbyCode}/players/${playerId}/connected`
                )
            )
            .set(false),

            FIREBASE_TIMEOUT,

            "Firebase took too long to configure disconnect handling."

        );

    }

    catch (error) {

        console.warn(
            "Could not configure onDisconnect:",
            error
        );

    }


    localNameElement.textContent =
        username;

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
                event.key?.toLowerCase() === "a"
            ) {

                leftPressed =
                    true;

                event.preventDefault();

            }


            if (
                event.code === "KeyD" ||
                event.key?.toLowerCase() === "d"
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
                event.key?.toLowerCase() === "a"
            ) {

                leftPressed =
                    false;

            }


            if (
                event.code === "KeyD" ||
                event.key?.toLowerCase() === "d"
            ) {

                rightPressed =
                    false;

            }

        }
    );


    window.addEventListener(
        "blur",
        function() {

            leftPressed =
                false;

            rightPressed =
                false;

        }
    );

}


/* =========================================================
   PHYSICS
========================================================= */

function updatePhysics(
    delta
) {

    /* =====================================================
       HORIZONTAL MOVEMENT
    ====================================================== */

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
        jumpQueued
    ) {

        if (
            onGround
        ) {

            velocityY =
                JUMP_FORCE;

            onGround =
                false;

        }

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


        /*
           HARD LANDING RULE

           The player can NEVER finish a physics
           frame below the ground.

           Once they touch it:
           y = 0
           velocity = 0
           grounded = true
        */

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

    else {

        /*
           Extra safety.

           If some weird state ever gives us a
           non-zero Y while grounded, force it back.
        */

        localY =
            GROUND_Y;

        velocityY =
            0;

    }


    /* =====================================================
       MAP BOUNDS
    ====================================================== */

    const mapWidth =
        gameMap?.clientWidth ||
        1200;


    const maxX =
        Math.max(
            20,
            mapWidth -
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
       LOCAL DOM
    ====================================================== */

    const localElement =
        playerElements.get(
            playerId
        );


    if (
        localElement
    ) {

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
                            : localElement.classList.contains(
                                "facing-left"
                            )
                                ? "left"
                                : "right"

            }
        );

    }

}


/* =========================================================
   START PHYSICS
========================================================= */

function startPhysics() {

    const playerRef =
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
                (
                    currentTime -
                    lastTime
                ) /
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

            const direction =
                leftPressed
                    ? "left"
                    : rightPressed
                        ? "right"
                        : localElementDirection();


            update(
                playerRef,
                {

                    x:
                        Math.round(
                            localX
                        ),

                    y:
                        Math.round(
                            Math.max(
                                GROUND_Y,
                                localY
                            )
                        ),

                    grounded:
                        onGround,

                    direction:
                        direction

                }
            )
            .catch(
                function(error) {

                    console.warn(
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
   CURRENT DIRECTION
========================================================= */

function localElementDirection() {

    const localElement =
        playerElements.get(
            playerId
        );


    if (
        localElement?.classList.contains(
            "facing-left"
        )
    ) {

        return "left";

    }


    return "right";

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


            connectionElement.textContent =
                "Connected";

            connectionElement.className =
                "connection-status connected";

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
   SHOW GAME
========================================================= */

function showGame() {

    loadingScreen.style.display =
        "none";


    errorScreen.style.display =
        "none";


    gameWorld.style.display =
        "flex";

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
   START BOSSY
========================================================= */

async function startBossy() {

    try {

        /* =================================================
           BASIC DOM CHECK
        ================================================== */

        if (
            !loadingScreen ||
            !gameWorld ||
            !errorScreen ||
            !playersContainer
        ) {

            throw new Error(
                "Bossy could not find the required game elements."
            );

        }


        /* =================================================
           LOBBY CODE
        ================================================== */

        if (
            !lobbyCode
        ) {

            showError(
                "No lobby code was provided. Return to the games page and try again."
            );

            return;

        }


        lobbyCodeElement.textContent =
            lobbyCode;


        loadingStatus.textContent =
            "Finding your lobby...";


        /* =================================================
           FIND LOBBY
        ================================================== */

        const lobbyRef =
            ref(
                db,
                `lobbies/${lobbyCode}`
            );


        const snapshot =
            await withTimeout(

                get(
                    lobbyRef
                ),

                FIREBASE_TIMEOUT,

                "Firebase did not respond while finding the lobby."

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
            snapshot.val() ||
            {};


        /* =================================================
           VERIFY GAME
        ================================================== */

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


        /* =================================================
           GET EXISTING PLAYERS
        ================================================== */

        loadingStatus.textContent =
            "Loading players...";


        const existingPlayers =
            lobby.players ||
            {};


        /* =================================================
           SHOW GAME IMMEDIATELY
        ================================================== */

        /*
           This happens BEFORE registration/listening.

           The browser will therefore never remain stuck
           on the loading screen just because a Firebase
           write is slow.
        */

        showGame();


        connectionElement.textContent =
            "Connecting...";

        connectionElement.className =
            "connection-status";


        setupControls();


        /* =================================================
           REGISTER PLAYER
        ================================================== */

        try {

            await registerLocalPlayer(
                existingPlayers
            );

        }

        catch (error) {

            /*
               Do NOT return to the loading screen.

               The game is already visible.

               If Firebase registration fails, show the
               error in the connection indicator instead.
            */

            console.error(
                "Bossy player registration failed:",
                error
            );


            connectionElement.textContent =
                "Connection problem";

            connectionElement.className =
                "connection-status error";

        }


        /* =================================================
           LISTEN FOR PLAYERS
        ================================================== */

        listenForPlayers();


        /* =================================================
           START PHYSICS
        ================================================== */

        startPhysics();


        /* =================================================
           INITIAL LOCAL CHARACTER
        ================================================== */

        /*
           If Firebase has not sent the first player
           snapshot yet, create our own character locally
           so the screen is not empty.
        */

        if (
            !playerElements.has(
                playerId
            )
        ) {

            createPlayerElement(
                playerId,
                {

                    name:
                        username,

                    characterId:
                        equippedCharacterId,

                    titleId:
                        equippedTitleId,

                    effectId:
                        equippedEffectId,

                    x:
                        localX,

                    y:
                        localY,

                    grounded:
                        true,

                    direction:
                        "right"

                }
            );

        }

    }

    catch (error) {

        console.error(
            "Bossy failed to load:",
            error
        );


        let message =
            "Couldn't connect to the multiplayer game.";


        if (
            error?.message
        ) {

            message =
                error.message;

        }


        showError(
            message
        );

    }

}


/* =========================================================
   START
========================================================= */

startBossy();
