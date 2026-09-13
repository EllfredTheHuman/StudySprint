/* =========================================================
   STUDYSPRINT — ROOM CODE GENERATOR
========================================================= */

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";


const CODE_LENGTH = 6;

const CODE_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


function generateRoomCode() {

    let code = "";

    for (let i = 0; i < CODE_LENGTH; i++) {

        const index = Math.floor(
            Math.random() * CODE_CHARACTERS.length
        );

        code += CODE_CHARACTERS[index];

    }

    return code;

}


async function findAvailableRoomCode(database) {

    let attempts = 0;

    while (attempts < 20) {

        const code = generateRoomCode();

        const roomRef = ref(
            database,
            "rooms/" + code
        );

        const snapshot = await get(roomRef);

        if (!snapshot.exists()) {
            return code;
        }

        attempts++;

    }

    throw new Error(
        "Could not create a unique room code."
    );

}


export {
    generateRoomCode,
    findAvailableRoomCode
};
