// =========================================================
// STUDYSPRINT FIREBASE
// =========================================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBi3Ge5_pDiEV-scRC-kptDJoHnHmbdw6s",
    authDomain: "studysprint-67f63.firebaseapp.com",
    projectId: "studysprint-67f63",
    storageBucket: "studysprint-67f63.firebasestorage.app",
    messagingSenderId: "1076120438088",
    appId: "1:1076120438088:web:c3afbd7ff39ebeaeac1f7d"
};

const app = initializeApp(firebaseConfig);

export { app };
