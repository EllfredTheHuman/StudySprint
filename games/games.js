/* =========================================================
   STUDYSPRINT GAMES
   Lobby creation + joining
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getDatabase,
    ref,
    get,
    set
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyBiGe5_pDiEV-scRC-kptDJoHnHmbdw6s",
    authDomain: "studysprint-67f63.firebaseapp.com",
    projectId: "studysprint-67f63",
    storageBucket: "studysprint-67f63.firebasestorage.app",
    messagingSenderId: "1076120438088",
    appId: "1:1076120438088:web:c3afbd7ff39ebeaeac1f7d"
};

const app = initializeApp(firebaseConfig);

const database =
    getDatabase(
        app,
        "https://studysprint-67f63-default-rtdb.asia-southeast1.firebasedatabase.app"
    );


/* =========================================================
   PLAYER
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


function getPlayerName() {

    return (
        localStorage.getItem("username") ||
        "Player"
    );

}


/* =========================================================
   ELEMENTS
========================================================= */

const gamesPage =
    document.querySelector(
        ".games-page"
    );

const createButton =
    document.getElementById(
        "create-lobby-button"
    );

const joinForm =
    document.getElementById(
        "join-lobby-form"
    );

const codeInput =
    document.getElementById(
        "lobby-code"
    );

const joinError =
    document.getElementById(
        "join-error"
    );


/* =========================================================
   CREATE LOBBY BUTTON
========================================================= */

createButton.addEventListener(
    "click",
    showGameSelection
);


/* =========================================================
   GAME SELECTION
========================================================= */

function showGameSelection() {

    gamesPage.innerHTML = `

        <section class="games-hero">

            <h1>
                🎮 Choose a Game
            </h1>

            <p>
                Choose the game you want to play.
            </p>

        </section>


        <section class="game-selection">

            <button
                class="game-selection-card"
                id="bossy-card"
                type="button"
            >

                <div class="game-selection-icon">
                    👹
                </div>

                <h2>
                    Bossy
                </h2>

                <p>
                    TEST
                </p>

                <span class="game-test-label">
                    TEST GAME
                </span>

            </button>

        </section>


        <button
            id="back-to-games"
            class="secondary-game-button"
            type="button"
        >
            ← Back
        </button>

    `;


    document
        .getElementById("bossy-card")
        .addEventListener(
            "click",
            function () {

                createLobby(
                    "bossy"
                );

            }
        );


    document
        .getElementById("back-to-games")
        .addEventListener(
            "click",
            function () {

                window.location.reload();

            }
        );

}


/* =========================================================
   GENERATE CODE
========================================================= */

function generateLobbyCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (
        let i = 0;
        i < 6;
        i++
    ) {

        code +=
            characters[
                Math.floor(
                    Math.random() *
                    characters.length
                )
            ];

    }

    return code;
}


/* =========================================================
   FIND AVAILABLE CODE
========================================================= */

async function generateUniqueCode() {

    let code;

    do {

        code =
            generateLobbyCode();

        const snapshot =
            await get(
                ref(
                    database,
                    "lobbies/" + code
                )
            );

        if (!snapshot.exists()) {

            return code;

        }

    } while (true);

}


/* =========================================================
   CREATE LOBBY
========================================================= */

async function createLobby(
    game
) {

    const card =
        document.getElementById(
            "bossy-card"
        );

    card.disabled = true;

    card.innerHTML = `

        <div class="game-selection-icon">
            ⏳
        </div>

        <h2>
            Creating Lobby...
        </h2>

        <p>
            Connecting to StudySprint...
        </p>

    `;


    try {

        const code =
            await generateUniqueCode();

        const playerId =
            getPlayerId();

        const playerName =
            getPlayerName();


        /* =============================================
           CREATE FIREBASE LOBBY
        ============================================= */

        await set(
            ref(
                database,
                "lobbies/" + code
            ),
            {

                code: code,

                game: game,

                status: "waiting",

                hostId: playerId,

                createdAt:
                    Date.now(),

                players: {

                    [playerId]: {

                        id: playerId,

                        name: playerName,

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
                            ) || "none",

                        isHost: true

                    }

                }

            }
        );


        /* =============================================
           SAVE LOBBY INFORMATION
        ============================================= */

        sessionStorage.setItem(
            "studySprintLobbyCode",
            code
        );

        sessionStorage.setItem(
            "studySprintLobbyGame",
            game
        );

        sessionStorage.setItem(
            "studySprintLobbyHost",
            "true"
        );


        /* =============================================
           GO TO LOBBY
        ============================================= */

        window.location.href =
            "../lobby/lobby.html?code=" +
            code;

    }

    catch (error) {

        console.error(
            "Lobby creation failed:",
            error
        );

        alert(
            "Couldn't create the lobby. Check your Firebase connection."
        );

        card.disabled = false;

        showGameSelection();

    }

}


/* =========================================================
   JOIN LOBBY
========================================================= */

joinForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        joinError.textContent = "";


        const code =
            codeInput.value
                .trim()
                .toUpperCase();


        if (code.length !== 6) {

            joinError.textContent =
                "Enter a 6-character code.";

            return;

        }


        const button =
            document.getElementById(
                "join-lobby-button"
            );

        button.disabled = true;

        button.textContent =
            "CHECKING...";


        try {

            const snapshot =
                await get(
                    ref(
                        database,
                        "lobbies/" + code
                    )
                );


            if (!snapshot.exists()) {

                joinError.textContent =
                    "That lobby doesn't exist.";

                button.disabled = false;

                button.textContent =
                    "JOIN LOBBY";

                return;

            }


            const lobby =
                snapshot.val();


            if (
                lobby.status !==
                "waiting"
            ) {

                joinError.textContent =
                    "That game has already started.";

                button.disabled = false;

                button.textContent =
                    "JOIN LOBBY";

                return;

            }


            /* =========================================
               SAVE JOIN INFORMATION
            ========================================= */

            sessionStorage.setItem(
                "studySprintLobbyCode",
                code
            );

            sessionStorage.setItem(
                "studySprintLobbyGame",
                lobby.game
            );

            sessionStorage.setItem(
                "studySprintLobbyHost",
                "false"
            );


            /* =========================================
               GO TO LOBBY
            ========================================= */

            window.location.href =
                "../lobby/lobby.html?code=" +
                code;

        }

        catch (error) {

            console.error(
                "Join failed:",
                error
            );

            joinError.textContent =
                "Couldn't connect to Firebase.";

        }


        button.disabled = false;

        button.textContent =
            "JOIN LOBBY";

    }
);


/* =========================================================
   CODE INPUT
========================================================= */

codeInput.addEventListener(
    "input",
    function () {

        codeInput.value =
            codeInput.value
                .replace(
                    /[^a-zA-Z0-9]/g,
                    ""
                )
                .toUpperCase()
                .slice(
                    0,
                    6
                );

        joinError.textContent = "";

    }
);


/* =========================================================
   STARTUP
========================================================= */

console.log(
    "StudySprint Games loaded."
);

console.log(
    "Player ID:",
    getPlayerId()
);
