/* =========================================================
   STUDYSPRINT — BOSSY
   Multiplayer side-view prototype

   Features:
   - Loads players from Firebase lobby
   - Spawns every player
   - Real-time player positions
   - Left/right movement
   - Jumping
   - Gravity
   - Ground collision
   - Player names
   - Basic character rendering
========================================================= */

import { db } from "../../firebase.js";

import {
    ref,
    get,
    update,
    onValue,
    onDisconnect,
    onChildRemoved
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


/* =========================================================
   CONSTANTS
========================================================= */

const WORLD_WIDTH = 2400;

const GROUND_HEIGHT = 110;

const PLAYER_WIDTH = 54;
const PLAYER_HEIGHT = 72;

const MOVE_SPEED = 330;
const JUMP_FORCE = 720;

const GRAVITY = 1900;

const NETWORK_UPDATE_RATE = 50;


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

const playerCountElement =
    document.getElementById(
        "player-count"
    );

const localPlayerNameElement =
    document.getElementById(
        "local-player-name"
    );

const connectionStatus =
    document.getElementById(
        "connection-status"
    );


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

    showGameError(
        "No lobby code was provided."
    );

}


/* =========================================================
   PLAYER ID
========================================================= */

/*
   IMPORTANT:

   We use the same StudySprint player ID that
   the lobby uses.

   This means the game knows which Firebase
   player belongs to this browser.
*/

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

const localPlayerName =
    localStorage.getItem(
        "username"
    ) ||
    "Player";


localPlayerNameElement.textContent =
    localPlayerName;


/* =========================================================
   GAME STATE
========================================================= */

const players = {};


let lobbyData = null;

let localPlayer = null;

let lastTime = performance.now();

let lastNetworkUpdate = 0;

let cameraX = 0;

let gameStarted = false;


/* =========================================================
   INPUT
========================================================= */

const keys = {

    left: false,

    right: false,

    jump: false

};


window.addEventListener(
    "keydown",
    function(event) {

        if (
            event.code === "KeyA" ||
            event.code === "ArrowLeft"
        ) {

            keys.left = true;

            event.preventDefault();

        }


        if (
            event.code === "KeyD" ||
            event.code === "ArrowRight"
        ) {

            keys.right = true;

            event.preventDefault();

        }


        if (
            event.code === "Space" ||
            event.code === "KeyW" ||
            event.code === "ArrowUp"
        ) {

            if (!keys.jump) {

                keys.jump = true;

                tryJump();

            }

            event.preventDefault();

        }

    }
);


window.addEventListener(
    "keyup",
    function(event) {

        if (
            event.code === "KeyA" ||
            event.code === "ArrowLeft"
        ) {

            keys.left = false;

        }


        if (
            event.code === "KeyD" ||
            event.code === "ArrowRight"
        ) {

            keys.right = false;

        }


        if (
            event.code === "Space" ||
            event.code === "KeyW" ||
            event.code === "ArrowUp"
        ) {

            keys.jump = false;

        }

    }
);


/* =========================================================
   RESIZE
========================================================= */

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();


    const dpr =
        window.devicePixelRatio ||
        1;


    canvas.width =
        rect.width * dpr;


    canvas.height =
        rect.height * dpr;


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
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
   INITIALISE
========================================================= */

if (lobbyCode) {

    initialiseGame();

}


/* =========================================================
   INITIALISE GAME
========================================================= */

async function initialiseGame() {

    try {

        setConnectionStatus(
            "Connecting..."
        );


        const lobbyRef =
            ref(
                db,
                `lobbies/${lobbyCode}`
            );


        const snapshot =
            await get(lobbyRef);


        if (!snapshot.exists()) {

            showGameError(
                "This lobby no longer exists."
            );

            return;

        }


        lobbyData =
            snapshot.val();


        /*
           Make sure the game has actually started.
        */

        if (
            lobbyData.started !== true
        ) {

            showGameError(
                "This game hasn't started yet."
            );

            return;

        }


        /*
           Load all existing players.
        */

        loadPlayers(
            lobbyData.players || {}
        );


        /*
           Listen for new players / movement.
        */

        listenToPlayers(
            lobbyRef
        );


        /*
           Make sure our player exists.
        */

        if (
            !players[playerId]
        ) {

            showGameError(
                "Your player could not be found."
            );

            return;

        }


        localPlayer =
            players[playerId];


        /*
           Remove our game player automatically
           if the connection disappears.
        */

        const playerRef =
            ref(
                db,
                `lobbies/${lobbyCode}/players/${playerId}`
            );


        onDisconnect(
            playerRef
        ).remove();


        /*
           Game is ready.
        */

        gameStarted = true;

        loading.style.display =
            "none";


        setConnectionStatus(
            "Connected"
        );


        /*
           Start game loop.
        */

        requestAnimationFrame(
            gameLoop
        );

    }
    catch (error) {

        console.error(
            "Bossy initialisation error:",
            error
        );


        showGameError(
            "Could not connect to Bossy."
        );

    }

}


/* =========================================================
   LOAD PLAYERS
========================================================= */

function loadPlayers(
    playerData
) {

    const entries =
        Object.entries(
            playerData
        );


    playerCountElement.textContent =
        `${entries.length} ${
            entries.length === 1
                ? "Player"
                : "Players"
        }`;


    entries.forEach(
        function([
            id,
            data
        ], index) {

            createPlayer(
                id,
                data,
                index
            );

        }
    );

}


/* =========================================================
   CREATE PLAYER
========================================================= */

function createPlayer(
    id,
    data,
    index
) {

    if (
        players[id]
    ) {

        return;

    }


    /*
       Spread players apart when they spawn.
    */

    const spawnX =
        180 +
        (index * 130);


    players[id] = {

        id: id,

        name:
            data.name ||
            "Player",

        character:
            data.character ||
            "leafy",

        banner:
            data.banner ||
            "purple-grid",

        title:
            data.title ||
            "none",

        effect:
            data.effect ||
            "none",

        x:
            spawnX,

        y:
            0,

        vx:
            0,

        vy:
            0,

        width:
            PLAYER_WIDTH,

        height:
            PLAYER_HEIGHT,

        grounded:
            false,

        facing:
            1,

        color:
            getCharacterColor(
                data.character
            )

    };


    /*
       If this is us, keep a reference.
    */

    if (
        id === playerId
    ) {

        localPlayer =
            players[id];

    }

}


/* =========================================================
   LISTEN TO PLAYERS
========================================================= */

function listenToPlayers(
    lobbyRef
) {

    const playersRef =
        ref(
            db,
            `lobbies/${lobbyCode}/players`
        );


    onValue(
        playersRef,
        function(snapshot) {

            const data =
                snapshot.val() || {};


            const entries =
                Object.entries(
                    data
                );


            playerCountElement.textContent =
                `${entries.length} ${
                    entries.length === 1
                        ? "Player"
                        : "Players"
                }`;


            /*
               Add new players.
            */

            entries.forEach(
                function([
                    id,
                    player
                ], index) {

                    if (
                        !players[id]
                    ) {

                        createPlayer(
                            id,
                            player,
                            index
                        );

                    }


                    /*
                       Update cosmetic information
                       without overwriting local physics.
                    */

                    if (
                        players[id]
                    ) {

                        players[id].name =
                            player.name ||
                            "Player";

                        players[id].character =
                            player.character ||
                            "leafy";

                        players[id].banner =
                            player.banner ||
                            "purple-grid";

                        players[id].title =
                            player.title ||
                            "none";

                        players[id].effect =
                            player.effect ||
                            "none";

                        players[id].color =
                            getCharacterColor(
                                players[id].character
                            );

                    }

                }
            );

        }
    );


    /*
       Listen for players leaving.
    */

    onChildRemoved(
        playersRef,
        function(snapshot) {

            const id =
                snapshot.key;


            if (
                players[id]
            ) {

                delete players[id];

            }


            updatePlayerCount();

        }
    );

}


/* =========================================================
   PLAYER COUNT
========================================================= */

function updatePlayerCount() {

    const count =
        Object.keys(
            players
        ).length;


    playerCountElement.textContent =
        `${count} ${
            count === 1
                ? "Player"
                : "Players"
        }`;

}


/* =========================================================
   LOCAL MOVEMENT
========================================================= */

function updateLocalPlayer(
    delta
) {

    if (
        !localPlayer
    ) {

        return;

    }


    let direction = 0;


    if (
        keys.left
    ) {

        direction -= 1;

    }


    if (
        keys.right
    ) {

        direction += 1;

    }


    localPlayer.vx =
        direction *
        MOVE_SPEED;


    if (
        direction !== 0
    ) {

        localPlayer.facing =
            direction;

    }


    /*
       Gravity.
    */

    localPlayer.vy +=
        GRAVITY *
        delta;


    /*
       Horizontal movement.
    */

    localPlayer.x +=
        localPlayer.vx *
        delta;


    /*
       Vertical movement.
    */

    localPlayer.y +=
        localPlayer.vy *
        delta;


    /*
       Ground collision.

       y represents the player's feet.
    */

    const groundY =
        getGroundY();


    if (
        localPlayer.y >=
        groundY
    ) {

        localPlayer.y =
            groundY;

        localPlayer.vy =
            0;

        localPlayer.grounded =
            true;

    }
    else {

        localPlayer.grounded =
            false;

    }


    /*
       World boundaries.
    */

    const minX =
        40;


    const maxX =
        WORLD_WIDTH -
        localPlayer.width -
        40;


    localPlayer.x =
        Math.max(
            minX,
            Math.min(
                localPlayer.x,
                maxX
            )
        );

}


/* =========================================================
   JUMP
========================================================= */

function tryJump() {

    if (
        !localPlayer
    ) {

        return;

    }


    if (
        !localPlayer.grounded
    ) {

        return;

    }


    localPlayer.vy =
        -JUMP_FORCE;


    localPlayer.grounded =
        false;

}


/* =========================================================
   NETWORK SYNC
========================================================= */

async function syncLocalPlayer(
    now
) {

    if (
        !localPlayer
    ) {

        return;

    }


    if (
        now -
        lastNetworkUpdate <
        NETWORK_UPDATE_RATE
    ) {

        return;

    }


    lastNetworkUpdate =
        now;


    try {

        await update(
            ref(
                db,
                `lobbies/${lobbyCode}/players/${playerId}`
            ),
            {

                gameX:
                    localPlayer.x,

                gameY:
                    localPlayer.y,

                gameVx:
                    localPlayer.vx,

                gameVy:
                    localPlayer.vy,

                facing:
                    localPlayer.facing

            }
        );

    }
    catch (error) {

        console.error(
            "Position sync failed:",
            error
        );

    }

}


/* =========================================================
   CAMERA
========================================================= */

function updateCamera() {

    if (
        !localPlayer
    ) {

        return;

    }


    const width =
        canvas.clientWidth;


    /*
       Keep the local player roughly
       in the centre of the screen.
    */

    cameraX =
        localPlayer.x -
        width * .5;


    cameraX =
        Math.max(
            0,
            Math.min(
                cameraX,
                WORLD_WIDTH -
                width
            )
        );

}


/* =========================================================
   GAME LOOP
========================================================= */

function gameLoop(
    now
) {

    if (
        !gameStarted
    ) {

        return;

    }


    let delta =
        (now - lastTime) /
        1000;


    /*
       Prevent massive physics jumps
       if the browser tab freezes.
    */

    delta =
        Math.min(
            delta,
            .033
        );


    lastTime =
        now;


    updateLocalPlayer(
        delta
    );


    updateCamera();


    syncLocalPlayer(
        now
    );


    render();


    requestAnimationFrame(
        gameLoop
    );

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


    drawBackground(
        width,
        height
    );


    ctx.save();


    ctx.translate(
        -cameraX,
        0
    );


    drawWorld(
        width,
        height
    );


    Object.values(
        players
    ).forEach(
        function(player) {

            drawPlayer(
                player
            );

        }
    );


    ctx.restore();

}


/* =========================================================
   BACKGROUND
========================================================= */

function drawBackground(
    width,
    height
) {

    /*
       Sky.
    */

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );


    gradient.addColorStop(
        0,
        "#312e81"
    );


    gradient.addColorStop(
        .55,
        "#6366f1"
    );


    gradient.addColorStop(
        1,
        "#a5b4fc"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /*
       Simple background clouds.
    */

    drawCloud(
        180 - cameraX * .15,
        100,
        1
    );


    drawCloud(
        650 - cameraX * .15,
        150,
        .8
    );


    drawCloud(
        1100 - cameraX * .15,
        80,
        1.2
    );


    /*
       Distant hills.
    */

    ctx.fillStyle =
        "rgba(49,46,129,.45)";


    ctx.beginPath();

    ctx.moveTo(
        0,
        height - GROUND_HEIGHT - 80
    );


    for (
        let x = 0;
        x <= width + 100;
        x += 100
    ) {

        const worldX =
            x + cameraX * .25;


        const hill =
            Math.sin(
                worldX * .004
            ) * 50;


        ctx.lineTo(
            x,
            height -
            GROUND_HEIGHT -
            80 -
            hill
        );

    }


    ctx.lineTo(
        width,
        height
    );


    ctx.lineTo(
        0,
        height
    );


    ctx.closePath();

    ctx.fill();

}


/* =========================================================
   CLOUD
========================================================= */

function drawCloud(
    x,
    y,
    scale
) {

    ctx.save();

    ctx.translate(
        x,
        y
    );

    ctx.scale(
        scale,
        scale
    );


    ctx.fillStyle =
        "rgba(255,255,255,.18)";


    ctx.beginPath();

    ctx.arc(
        0,
        15,
        28,
        0,
        Math.PI * 2
    );


    ctx.arc(
        35,
        5,
        38,
        0,
        Math.PI * 2
    );


    ctx.arc(
        75,
        18,
        25,
        0,
        Math.PI * 2
    );


    ctx.fillRect(
        0,
        15,
        75,
        28
    );


    ctx.fill();

    ctx.restore();

}


/* =========================================================
   WORLD
========================================================= */

function drawWorld(
    width,
    height
) {

    const groundY =
        getGroundY();


    /*
       Ground.
    */

    ctx.fillStyle =
        "#334155";


    ctx.fillRect(
        0,
        groundY,
        WORLD_WIDTH,
        height -
        groundY +
        100
    );


    /*
       Ground top.
    */

    ctx.fillStyle =
        "#64748b";


    ctx.fillRect(
        0,
        groundY,
        WORLD_WIDTH,
        12
    );


    /*
       Simple floor markings.
    */

    ctx.fillStyle =
        "rgba(255,255,255,.06)";


    for (
        let x = 0;
        x < WORLD_WIDTH;
        x += 80
    ) {

        ctx.fillRect(
            x,
            groundY + 30,
            45,
            4
        );

    }


    /*
       Spawn line.
    */

    ctx.strokeStyle =
        "rgba(255,255,255,.15)";


    ctx.setLineDash([
        8,
        8
    ]);


    ctx.beginPath();

    ctx.moveTo(
        100,
        groundY
    );

    ctx.lineTo(
        100,
        groundY - 180
    );

    ctx.stroke();

    ctx.setLineDash([]);

}


/* =========================================================
   GROUND POSITION
========================================================= */

function getGroundY() {

    return (
        canvas.clientHeight -
        GROUND_HEIGHT -
        PLAYER_HEIGHT
    );

}


/* =========================================================
   PLAYER RENDERING
========================================================= */

function drawPlayer(
    player
) {

    const x =
        player.x;


    const y =
        player.y;


    /*
       Shadow.
    */

    ctx.fillStyle =
        "rgba(0,0,0,.22)";


    ctx.beginPath();

    ctx.ellipse(
        x +
        player.width / 2,
        getGroundY() +
        PLAYER_HEIGHT +
        4,
        27,
        7,
        0,
        0,
        Math.PI * 2
    );


    ctx.fill();


    /*
       Character body.
    */

    ctx.fillStyle =
        player.color;


    roundRect(
        ctx,
        x,
        y,
        player.width,
        player.height,
        18
    );


    ctx.fill();


    /*
       Eyes.
    */

    ctx.fillStyle =
        "#ffffff";


    ctx.beginPath();

    ctx.arc(
        x + 18,
        y + 25,
        8,
        0,
        Math.PI * 2
    );


    ctx.arc(
        x + 36,
        y + 25,
        8,
        0,
        Math.PI * 2
    );


    ctx.fill();


    /*
       Pupils.
    */

    ctx.fillStyle =
        "#111827";


    ctx.beginPath();

    ctx.arc(
        x + 19 +
        player.facing * 2,
        y + 26,
        3.5,
        0,
        Math.PI * 2
    );


    ctx.arc(
        x + 37 +
        player.facing * 2,
        y + 26,
        3.5,
        0,
        Math.PI * 2
    );


    ctx.fill();


    /*
       Local player outline.
    */

    if (
        player.id === playerId
    ) {

        ctx.strokeStyle =
            "#ffffff";

        ctx.lineWidth =
            3;

        ctx.stroke();

    }


    /*
       Name.
    */

    ctx.font =
        "900 13px Arial";


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        "white";


    ctx.shadowColor =
        "rgba(0,0,0,.5)";


    ctx.shadowBlur =
        5;


    ctx.fillText(
        player.name,
        x +
        player.width / 2,
        y - 12
    );


    ctx.shadowBlur =
        0;


    /*
       Host marker.

       This is intentionally simple for now.
    */

    if (
        lobbyData &&
        lobbyData.hostId ===
        player.id
    ) {

        ctx.font =
            "900 11px Arial";


        ctx.fillStyle =
            "#fbbf24";


        ctx.fillText(
            "★ HOST",
            x +
            player.width / 2,
            y - 27
        );

    }

}


/* =========================================================
   CHARACTER COLOURS
========================================================= */

function getCharacterColor(
    character
) {

    const colours = {

        leafy:
            "#4ade80",

        default:
            "#818cf8",

        blue:
            "#60a5fa",

        red:
            "#f87171",

        purple:
            "#a78bfa",

        yellow:
            "#facc15"

    };


    return (
        colours[character] ||
        colours.default
    );

}


/* =========================================================
   ROUNDED RECTANGLE
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

    context.moveTo(
        x + radius,
        y
    );

    context.lineTo(
        x + width - radius,
        y
    );

    context.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + radius
    );

    context.lineTo(
        x + width,
        y + height - radius
    );

    context.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
    );

    context.lineTo(
        x + radius,
        y + height
    );

    context.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - radius
    );

    context.lineTo(
        x,
        y + radius
    );

    context.quadraticCurveTo(
        x,
        y,
        x + radius,
        y
    );

    context.closePath();

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

function setConnectionStatus(
    status
) {

    connectionStatus.textContent =
        `● ${status}`;


    connectionStatus.classList.remove(
        "connected",
        "error"
    );


    if (
        status === "Connected"
    ) {

        connectionStatus.classList.add(
            "connected"
        );

    }


    if (
        status === "Error"
    ) {

        connectionStatus.classList.add(
            "error"
        );

    }

}


/* =========================================================
   GAME ERROR
========================================================= */

function showGameError(
    message
) {

    loading.innerHTML = `

        <div style="
            font-size:48px;
            margin-bottom:15px;
        ">
            ⚠️
        </div>

        <h2>
            ${message}
        </h2>

        <p>
            Return to the games page and try again.
        </p>

    `;


    setConnectionStatus(
        "Error"
    );

}
