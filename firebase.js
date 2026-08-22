/* =========================================================
   STUDYSPRINT FIREBASE
   Shared Firebase connection for StudySprint
========================================================= */


/* =========================================================
   FIREBASE APP
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";


/* =========================================================
   REALTIME DATABASE
========================================================= */

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyBiGe5_pDiEV-scRC-kptDJoHnHmbdw6s",

    authDomain:
        "studysprint-67f63.firebaseapp.com",

    projectId:
        "studysprint-67f63",

    storageBucket:
        "studysprint-67f63.firebasestorage.app",

    messagingSenderId:
        "1076120438088",

    appId:
        "1:1076120438088:web:c3afbd7ff39ebeaeac1f7d"

};


/* =========================================================
   INITIALISE FIREBASE
========================================================= */

const app =
    initializeApp(
        firebaseConfig
    );


/* =========================================================
   CONNECT TO THE CORRECT DATABASE REGION
========================================================= */

const db =
    getDatabase(
        app,
        "https://studysprint-67f63-default-rtdb.asia-southeast1.firebasedatabase.app"
    );


/* =========================================================
   EXPORT DATABASE
========================================================= */

export {
    db
};


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "StudySprint Firebase connected."
);

console.log(
    "Database region: Asia Southeast 1"
);
