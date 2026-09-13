/* =========================================================
   STUDYSPRINT — ROOMS
   Firebase setup
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyBi3Ge5_pDiEV-scRC-kptDJoHnHmbdw6s",
    authDomain: "studysprint-67f63.firebaseapp.com",
    databaseURL: "https://studysprint-67f63-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "studysprint-67f63",
    storageBucket: "studysprint-67f63.firebasestorage.app",
    messagingSenderId: "1076120438088",
    appId: "1:1076120438088:web:284c4856998fb607ac1f7d"
};


/* =========================================================
   INITIALISE FIREBASE
========================================================= */

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


/* =========================================================
   TEST CONNECTION
========================================================= */

console.log("StudySprint Rooms Firebase connected.");
console.log("Realtime Database ready.");


/* =========================================================
   EXPORTS
========================================================= */

export {
    app,
    database
};
