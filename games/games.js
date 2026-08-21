/* =========================================================
   STUDYSPRINT GAMES
   Create / Join Lobby
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getDatabase,
    ref,
    get
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

const database = getDatabase(app);


/* =========================================================
   GAME LIST
========================================================= */

const GAMES = [

    {
        id: "islands",
        name: "Islands",
        emoji: "🏝️",
        description:
            "Build your island, upgrade your factory and steal points from other teams."
    },

    {
        id: "modifiers",
        name: "Modifiers",
        emoji: "⚡",
        description:
            "Vote on modifiers for other teams and answer questions to make them stronger."
    },

    {
        id: "tower-defense",
        name: "Tower Defense",
        emoji: "🏰",
        description:
            "Defend your castle while sending enemies to attack your classmates."
    },

    {
        id: "protection",
        name: "Protection",
        emoji: "🛡️",
        description:
            "Build and protect your room while monsters try to break in."
    },

    {
        id: "bossy",
        name: "Bossy",
        emoji: "👹",
        description:
            "Work together to defeat a massive boss through multiple phases."
    },

    {
        id: "bot-builder",
        name: "Bot Builder",
        emoji: "🤖",
        description:
            "Build and improve your own bot to compete against other players."
    },

    {
        id: "influenced",
        name: "Influenced",
        emoji: "🧠",
        description:
            "A multiplayer battle where your decisions can influence the game."
    },

    {
        id: "platform-battles",
        name: "Platform Battles",
        emoji: "⚔️",
        description:
            "Battle other players in a fast-paced platform arena."
    },

    {
        id: "battle",
        name: "Battle",
        emoji: "💥",
        description:
            "A solo battle challenge you can play and practice at home."
    },

    {
        id: "gardeners",
        name: "Gardeners",
        emoji: "🌱",
        description:
            "Grow, upgrade and manage your own garden."
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

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
   PLAYER ID
========================================================= */

function getPlayerId() {

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

    return playerId;
}


/* =========================================================
   PLAYER NAME
========================================================= */

function getPlayerName() {

    return (
        localStorage.getItem(
            "username"
        ) ||
        "Player"
    );

}


/* =========================================================
   CREATE LOBBY
========================================================= */

createButton.addEventListener(
    "click",
    function () {

        showGameSelection();

    }
);


/* =========================================================
   GAME SELECTION
========================================================= */

function showGameSelection() {

    const gamesPage =
        document.querySelector(
            ".games-page"
        );

    if (!gamesPage)
        return;


    gamesPage.innerHTML = `

        <section class="games-hero">

            <h1>
                🎮 Choose a Game
            </h1>

            <p>
                Pick the game you want your class to play.
            </p>

        </section>


        <section class="game-selection">

            ${GAMES.map(
                game => `

                    <button
                        class="game-selection-card"
                        data-game="${game.id}"
                        type="button"
                    >

                        <span class="game-selection-icon">
                            ${game.emoji}
                        </span>

                        <span class="game-selection-name">
                            ${game.name}
                        </span>

                        <span class="game-selection-description">
                            ${game.description}
                        </span>

                    </button>

                `
            ).join("")}

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
        .querySelectorAll(
            ".game-selection-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    function () {

                        const gameId =
                            card.dataset.game;

                        createLobby(
                            gameId
                        );

                    }
                );

            }
        );


    document
        .getElementById(
            "back-to-games"
        )
        .addEventListener(
            "click",
            function () {

                window.location.reload();

            }
        );

}


/* =========================================================
   GENERATE LOBBY CODE
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
   CHECK IF CODE EXISTS
========================================================= */

async function lobbyCodeExists(code) {

    const lobbyRef =
        ref(
            database,
            "lobbies/" + code
        );

    const snapshot =
        await get(
            lobbyRef
        );

    return snapshot.exists();

}


/* =========================================================
   CREATE LOBBY
========================================================= */

async function createLobby(
    gameId
) {

    const game =
        GAMES.find(
            item =>
                item.id === gameId
        );

    if (!game)
        return;


    try {

        let code;

        do {

            code =
                generateLobbyCode();

        }
        while (
            await lobbyCodeExists(
                code
            )
        );


        /*
           For now we store the selected
           game in sessionStorage.

           The actual lobby will be created
           by lobby.js once we arrive there.
        */

        sessionStorage.setItem(
            "studySprintLobbyCode",
            code
        );

        sessionStorage.setItem(
            "studySprintLobbyGame",
            gameId
        );

        sessionStorage.setItem(
            "studySprintLobbyHost",
            "true"
        );


        window.location.href =
            "../lobby/lobby.html?code=" +
            code;


    }
    catch (error) {

        console.error(
            "Could not create lobby:",
            error
        );

        alert(
            "Something went wrong while creating the lobby."
        );

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
                "Please enter a 6-character game code.";

            return;

        }


        const joinButton =
            document.getElementById(
                "join-lobby-button"
            );


        joinButton.disabled = true;

        joinButton.textContent =
            "CHECKING...";


        try {

            const lobbyRef =
                ref(
                    database,
                    "lobbies/" + code
                );

            const snapshot =
                await get(
                    lobbyRef
                );


            if (!snapshot.exists()) {

                joinError.textContent =
                    "That lobby doesn't exist.";

                joinButton.disabled =
                    false;

                joinButton.textContent =
                    "JOIN LOBBY";

                return;

            }


            const lobby =
                snapshot.val();


            if (
                lobby.status &&
                lobby.status !== "waiting"
            ) {

                joinError.textContent =
                    "That game has already started.";

                joinButton.disabled =
                    false;

                joinButton.textContent =
                    "JOIN LOBBY";

                return;

            }


            /*
               Store information so lobby.js
               knows which lobby we're joining.
            */

            sessionStorage.setItem(
                "studySprintLobbyCode",
                code
            );

            sessionStorage.setItem(
                "studySprintLobbyGame",
                lobby.game || ""
            );

            sessionStorage.setItem(
                "studySprintLobbyHost",
                "false"
            );


            window.location.href =
                "../lobby/lobby.html?code=" +
                code;


        }
        catch (error) {

            console.error(
                "Could not join lobby:",
                error
            );

            joinError.textContent =
                "Couldn't connect to the lobby. Please try again.";

        }


        joinButton.disabled =
            false;

        joinButton.textContent =
            "JOIN LOBBY";

    }
);


/* =========================================================
   CLEAN JOIN CODE INPUT
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

        joinError.textContent =
            "";

    }
);


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "StudySprint Games loaded."
);

console.log(
    "Player ID:",
    getPlayerId()
);

console.log(
    "Player:",
    getPlayerName()
);
