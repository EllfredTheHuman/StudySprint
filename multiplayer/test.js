import { db } from "../firebase.js";

import {
    ref,
    set,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


// =========================================================
// ELEMENTS
// =========================================================

const createButton =
    document.getElementById("create-lobby");

const joinButton =
    document.getElementById("join-lobby");

const codeInput =
    document.getElementById("lobby-code");

const status =
    document.getElementById("status");

const playersList =
    document.getElementById("players");


// =========================================================
// PLAYER
// =========================================================

const playerId =
    crypto.randomUUID();

const playerName =
    localStorage.getItem("username") ||
    "Player";


// =========================================================
// CURRENT LOBBY
// =========================================================

let currentLobby = null;


// =========================================================
// CREATE LOBBY
// =========================================================

createButton.addEventListener(
    "click",
    async function() {

        const code =
            Math.random()
                .toString(36)
                .substring(2, 8)
                .toUpperCase();

        currentLobby = code;

        const lobbyRef =
            ref(
                db,
                `lobbies/${code}`
            );

        await set(
            lobbyRef,
            {
                game: "test",
                started: false,
                players: {}
            }
        );

        await joinLobby(code);

        status.textContent =
            `Lobby created: ${code}`;

        codeInput.value = code;

    }
);


// =========================================================
// JOIN LOBBY
// =========================================================

joinButton.addEventListener(
    "click",
    async function() {

        const code =
            codeInput.value
                .trim()
                .toUpperCase();

        if (!code) {

            status.textContent =
                "Enter a lobby code.";

            return;

        }

        await joinLobby(code);

    }
);


// =========================================================
// JOIN FUNCTION
// =========================================================

async function joinLobby(code) {

    currentLobby = code;

    const playerRef =
        ref(
            db,
            `lobbies/${code}/players/${playerId}`
        );

    await set(
        playerRef,
        {
            name: playerName,
            joinedAt: Date.now()
        }
    );

    status.textContent =
        `Connected to lobby: ${code}`;

    listenForPlayers(code);

}


// =========================================================
// LISTEN FOR PLAYERS
// =========================================================

function listenForPlayers(code) {

    const playersRef =
        ref(
            db,
            `lobbies/${code}/players`
        );

    onValue(
        playersRef,
        function(snapshot) {

            playersList.innerHTML = "";

            const players =
                snapshot.val() || {};

            Object.values(players)
                .forEach(
                    function(player) {

                        const li =
                            document.createElement("li");

                        li.textContent =
                            player.name;

                        playersList.appendChild(li);

                    }
                );

        }
    );

}
