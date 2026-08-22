/* =========================================================
   STUDYSPRINT — BOSSY

   Multiplayer side-view game.

   Handles:
   - Lobby detection
   - Loading players
   - Character data
   - Real-time positions
   - Movement
   - Jumping
   - Canvas rendering
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

const canvas =
    document.getElementById(
        "game-canvas"
    );

const ctx =
    canvas.getContext("2d");

const loading =
    document.getElementById(
        "game-loading"
    );

const errorBox =
    document.getElementById(
        "game-error"
    );

const lobbyCodeElement =
    document.getElementById(
        "bossy-code"
    );

const playerCountElement =
    document.getElementById(
        "bossy-player-count"
    );

const connectionStatus =
    document.getElementById(
        "connection-status"
    );


/* =========================================================
   PLAYER ID

   IMPORTANT:
   Use the SAME ID as the lobby system.
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


if (!lobbyCode) {

    showError(
        "No lobby code was provided."
    );

}
else {

    startBossy();

}


/* =========================================================
   GAME STATE
========================================================= */

let players = {};

let localPlayer = null;

let playerRef = null;

let keys = {};

let lastTime = 0;


/* =========================================================
   WORLD
========================================================= */

const WORLD_WIDTH = 1400;

const GROUND_HEIGHT = 110;

const PLAYER_WIDTH = 42;

const PLAYER_HEIGHT = 64;

const MOVE_SPEED = 280;

const JUMP_POWER = 620;

const GRAVITY = 1500;


/* =========================================================
   CANVAS
========================================================= */

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();


    canvas.width =
        rect.width *
        window.devicePixelRatio;

    canvas.height =
        rect.height *
        window.devicePixelRatio;


    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


/* =========================================================
   START GAME
========================================================= */

async function startBossy() {

    try {

        lobbyCodeElement.textContent =
            lobbyCode;


        setConnectionStatus(
            "CONNECTING"
        );


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
                "That lobby doesn't exist anymore."
            );

            return;

        }


        const lobby =
            snapshot.val();


        if (
            lobby.game !== "bossy"
        ) {

            showError(
                "This isn't a Bossy lobby."
            );

            return;

        }


        /*
           Find our player inside the lobby.

           This is important because the lobby
           already created the player entry.
        */

        const lobbyPlayers =
            lobby.players ||
            {};


        if (
            !lobbyPlayers[playerId]
        ) {

            /*
               If the player ID wasn't found,
               try the username as a fallback.
            */

            const username =
                localStorage.getItem(
                    "username"
                ) ||
                "Player";


            const matchingPlayer =
                Object.entries(
                    lobbyPlayers
                ).find(
                    ([id, player]) =>
                        player &&
                        player.name === username
                );


            if (
                matchingPlayer
            ) {

                localPlayer =
                    {
                        id:
                            matchingPlayer[0],

                        ...matchingPlayer[1]

                    };

            }

        }
        else {

            localPlayer =
                {
                    id:
                        playerId,

                    ...lobbyPlayers[playerId]

                };

        }


        /*
           If the lobby player exists, use it.
        */

        if (
            !localPlayer
        ) {

            showError(
                "Your player could not be found in this lobby."
            );

            return;

        }


        /*
           Always use the actual database ID
           we found.
        */

        const actualPlayerId =
            localPlayer.id;


        playerRef =
            ref(
                db,
                `lobbies/${lobbyCode}/players/${actualPlayerId}`
            );


        /*
           Give the player an initial position
           if one doesn't exist.
        */

        if (
            typeof localPlayer.x !== "number" ||
            typeof localPlayer.y !== "number"
        ) {

            const spawnX =
                150 +
                (
                    Object.keys(
                        lobbyPlayers
                    ).indexOf(
                        actualPlayerId
                    ) * 100
                );


            await update(
                playerRef,
                {

                    x:
                        spawnX,

                    y:
                        0,

                    vx:
                        0,

                    vy:
                        0

                }
            );

        }


        /*
           Listen for everyone.
        */

        listenForPlayers();


        /*
           Controls.
        */

        setupControls();


        /*
           Start rendering.
        */

        loading.style.display =
            "none";


        setConnectionStatus(
            "CONNECTED"
        );


        requestAnimationFrame(
            gameLoop
        );

    }
    catch (error) {

        console.error(
            "Bossy startup error:",
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

            players =
                snapshot.val() ||
                {};


            playerCountElement.textContent =
                `👥 ${Object.keys(players).length} ${
                    Object.keys(players).length === 1
                        ? "Player"
                        : "Players"
                }`;


            /*
               Keep local player data updated.
            */

            const current =
                players[playerId];


            if (
                current
            ) {

                localPlayer =
                    {
                        id:
                            playerId,

                        ...current
                    };

            }


            setConnectionStatus(
                "CONNECTED"
            );

        },
        function(error) {

            console.error(
                "Player listener error:",
                error
            );


            setConnectionStatus(
                "ERROR"
            );

        }
    );

}


/* =========================================================
   CONTROLS
========================================================= */

function setupControls() {

    window.addEventListener(
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


                if (
                    localPlayer &&
                    localPlayer.y <= 1
                ) {

                    localPlayer.vy =
                        JUMP_POWER;

                }

            }

        }
    );


    window.addEventListener(
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
   GAME LOOP
========================================================= */

function gameLoop(
    timestamp
) {

    const delta =
        Math.min(
            (timestamp - lastTime) / 1000,
            0.05
        );


    lastTime =
        timestamp;


    updateLocalPlayer(
        delta
    );


    render();


    requestAnimationFrame(
        gameLoop
    );

}


/* =========================================================
   UPDATE LOCAL PLAYER
========================================================= */

let lastDatabaseUpdate = 0;

function updateLocalPlayer(
    delta
) {

    if (
        !localPlayer ||
        !playerRef
    ) {

        return;

    }


    let changed =
        false;


    /* =====================================================
       MOVEMENT
    ====================================================== */

    let direction = 0;


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        direction -= 1;

    }


    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        direction += 1;

    }


    if (
        direction !== 0
    ) {

        localPlayer.x +=
            direction *
            MOVE_SPEED *
            delta;

        changed =
            true;

    }


    /* =====================================================
       GRAVITY
    ====================================================== */

    localPlayer.vy =
        localPlayer.vy ||
        0;


    localPlayer.y +=
        localPlayer.vy *
        delta;


    localPlayer.vy -=
        GRAVITY *
        delta;


    if (
        localPlayer.y <= 0
    ) {

        localPlayer.y =
            0;

        localPlayer.vy =
            0;

    }
    else {

        changed =
            true;

    }


    /* =====================================================
       BOUNDS
    ====================================================== */

    localPlayer.x =
        Math.max(
            20,
            Math.min(
                WORLD_WIDTH -
                PLAYER_WIDTH -
                20,
                localPlayer.x
            )
        );


    /*
       Don't hammer Firebase every frame.

       ~20 updates per second is enough for
       this first version.
    */

    const now =
        performance.now();


    if (
        changed &&
        now - lastDatabaseUpdate > 50
    ) {

        lastDatabaseUpdate =
            now;


        update(
            playerRef,
            {

                x:
                    localPlayer.x,

                y:
                    localPlayer.y,

                vx:
                    direction *
                    MOVE_SPEED,

                vy:
                    localPlayer.vy

            }
        )
        .catch(
            error => {

                console.error(
                    "Position update failed:",
                    error
                );

            }
        );

    }

}


/* =========================================================
   RENDER
========================================================= */

function render() {

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* =====================================================
       SKY
    ====================================================== */

    const sky =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );


    sky.addColorStop(
        0,
        "#312e81"
    );

    sky.addColorStop(
        .55,
        "#4f46e5"
    );

    sky.addColorStop(
        1,
        "#818cf8"
    );


    ctx.fillStyle =
        sky;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /* =====================================================
       SUN
    ====================================================== */

    ctx.beginPath();

    ctx.arc(
        width - 130,
        100,
        48,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#fef3c7";

    ctx.fill();


    /* =====================================================
       BACKGROUND HILLS
    ====================================================== */

    drawHills(
        width,
        height
    );


    /* =====================================================
       GROUND
    ====================================================== */

    const groundY =
        height -
        GROUND_HEIGHT;


    ctx.fillStyle =
        "#1e293b";


    ctx.fillRect(
        0,
        groundY,
        width,
        GROUND_HEIGHT
    );


    ctx.fillStyle =
        "#334155";


    ctx.fillRect(
        0,
        groundY,
        width,
        10
    );


    /*
       Little ground markings.
    */

    for (
        let x = 0;
        x < width;
        x += 80
    ) {

        ctx.fillStyle =
            "rgba(255,255,255,.035)";


        ctx.fillRect(
            x,
            groundY + 30,
            40,
            5
        );

    }


    /* =====================================================
       CAMERA
    ====================================================== */

    let cameraX =
        0;


    if (
        localPlayer
    ) {

        cameraX =
            localPlayer.x -
            width / 2 +
            PLAYER_WIDTH / 2;

    }


    cameraX =
        Math.max(
            0,
            Math.min(
                WORLD_WIDTH -
                width,
                cameraX
            )
        );


    /* =====================================================
       PLAYERS
    ====================================================== */

    Object.entries(
        players
    ).forEach(
        function([
            id,
            player
        ]) {

            drawPlayer(
                id,
                player,
                cameraX,
                groundY
            );

        }
    );

}


/* =========================================================
   DRAW HILLS
========================================================= */

function drawHills(
    width,
    height
) {

    const groundY =
        height -
        GROUND_HEIGHT;


    ctx.fillStyle =
        "rgba(30,41,59,.25)";


    ctx.beginPath();

    ctx.moveTo(
        0,
        groundY
    );


    for (
        let x = 0;
        x <= width;
        x += 180
    ) {

        ctx.quadraticCurveTo(
            x + 90,
            groundY - 130,
            x + 180,
            groundY
        );

    }


    ctx.lineTo(
        width,
        groundY
    );

    ctx.lineTo(
        0,
        groundY
    );

    ctx.fill();

}


/* =========================================================
   DRAW PLAYER
========================================================= */

function drawPlayer(
    id,
    player,
    cameraX,
    groundY
) {

    if (
        !player
    ) {

        return;

    }


    const x =
        (player.x || 0) -
        cameraX;


    const y =
        groundY -
        PLAYER_HEIGHT -
        (player.y || 0);


    /*
       Don't render players outside screen.
    */

    if (
        x < -100 ||
        x > canvas.clientWidth + 100
    ) {

        return;

    }


    const character =
        player.character ||
        "leafy";


    /* =====================================================
       SHADOW
    ====================================================== */

    ctx.beginPath();

    ctx.ellipse(
        x + PLAYER_WIDTH / 2,
        groundY - 4,
        25,
        7,
        0,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "rgba(0,0,0,.3)";

    ctx.fill();


    /* =====================================================
       CHARACTER BODY
    ====================================================== */

    let bodyColor =
        "#84cc16";


    /*
       Basic colours for the current
       StudySprint characters.

       We can connect the actual Goober
       renderer later.
    */

    const characterColors = {

        leafy:
            "#84cc16",

        blue:
            "#38bdf8",

        purple:
            "#a78bfa",

        pink:
            "#f472b6",

        red:
            "#f87171",

        orange:
            "#fb923c",

        yellow:
            "#facc15"

    };


    bodyColor =
        characterColors[
            character
        ] ||
        bodyColor;


    /*
       Body
    */

    roundRect(
        ctx,
        x,
        y + 15,
        PLAYER_WIDTH,
        49,
        13
    );


    ctx.fillStyle =
        bodyColor;

    ctx.fill();


    /*
       Little outline.
    */

    ctx.strokeStyle =
        "rgba(15,23,42,.5)";

    ctx.lineWidth =
        3;

    ctx.stroke();


    /* =====================================================
       EYES
    ====================================================== */

    ctx.fillStyle =
        "white";


    ctx.beginPath();

    ctx.arc(
        x + 13,
        y + 31,
        7,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + 29,
        y + 31,
        7,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle =
        "#111827";


    ctx.beginPath();

    ctx.arc(
        x + 14,
        y + 32,
        3,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + 30,
        y + 32,
        3,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* =====================================================
       NAME
    ====================================================== */

    ctx.font =
        "900 13px Arial";


    ctx.textAlign =
        "center";


    const name =
        player.name ||
        "Player";


    const nameWidth =
        ctx.measureText(
            name
        ).width;


    ctx.fillStyle =
        "rgba(15,23,42,.8)";


    roundRect(
        ctx,
        x +
            PLAYER_WIDTH / 2 -
            nameWidth / 2 -
            8,
        y - 27,
        nameWidth + 16,
        21,
        8
    );


    ctx.fill();


    ctx.fillStyle =
        "white";


    ctx.fillText(
        name,
        x +
            PLAYER_WIDTH / 2,
        y - 12
    );


    /*
       Host indicator.
    */

    if (
        id === getHostId()
    ) {

        ctx.font =
            "12px Arial";


        ctx.fillText(
            "👑",
            x +
                PLAYER_WIDTH / 2,
            y - 35
        );

    }

}


/* =========================================================
   HOST ID
========================================================= */

let cachedHostId = null;


function getHostId() {

    if (
        cachedHostId
    ) {

        return cachedHostId;

    }


    /*
       The current lobby structure uses hostId.
    */

    return null;

}


/* =========================================================
   ROUND RECTANGLE
========================================================= */

function roundRect(
    context,
    x,
    y,
    width,
    height,
    radius
) {

    context.beginPath();

    context.roundRect(
        x,
        y,
        width,
        height,
        radius
    );

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function setConnectionStatus(
    status
) {

    connectionStatus.textContent =
        status;


    connectionStatus.classList.remove(
        "connected",
        "error"
    );


    if (
        status === "CONNECTED"
    ) {

        connectionStatus.classList.add(
            "connected"
        );

    }


    if (
        status === "ERROR"
    ) {

        connectionStatus.classList.add(
            "error"
        );

    }

}


/* =========================================================
   ERROR
========================================================= */

function showError(
    message
) {

    loading.style.display =
        "none";


    errorBox.style.display =
        "block";


    errorBox.textContent =
        message;


    setConnectionStatus(
        "ERROR"
    );

}
