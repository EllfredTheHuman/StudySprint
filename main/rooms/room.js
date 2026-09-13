import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyBi3Ge5_pDiEV-scRC-kptDJoHnHmbdw6s",
    authDomain: "studysprint-67f63.firebaseapp.com",
    databaseURL: "https://studysprint-67f63-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "studysprint-67f63",
    storageBucket: "studysprint-67f63.firebasestorage.app",
    messagingSenderId: "1076120438088",
    appId: "1:1076120438088:web:284c4856998fb607ac1f7d"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const params =
    new URLSearchParams(window.location.search);

const roomCode =
    params.get("code");


const roomTypeElement =
    document.getElementById("room-type");

const roomNameElement =
    document.getElementById("room-name");

const memberCountElement =
    document.getElementById("member-count");

const roomCodeElement =
    document.getElementById("room-code");

const copyCodeButton =
    document.getElementById("copy-code");

const copyMessage =
    document.getElementById("copy-message");

const membersList =
    document.getElementById("members-list");

const roomError =
    document.getElementById("room-error");

const welcomeText =
    document.getElementById("welcome-text");


if (!roomCode) {

    showError("No room code was provided.");

} else {

    loadRoom();

}


/* ERROR */

function showError(message) {

    roomError.textContent = message;

    roomError.classList.add("visible");

    roomNameElement.textContent = "Room unavailable";

    memberCountElement.textContent = "";

}


/* ESCAPE HTML */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value == null ? "" : String(value);

    return div.innerHTML;

}


/* LOAD ROOM */

function loadRoom() {

    const roomRef =
        ref(database, "rooms/" + roomCode);


    onValue(
        roomRef,
        snapshot => {

            if (!snapshot.exists()) {

                showError(
                    "This room does not exist or has been deleted."
                );

                return;

            }


            const room =
                snapshot.val();


            renderRoom(room);

        },

        error => {

            console.error(error);

            showError(
                "Couldn't load this room. Check your Firebase connection and database rules."
            );

        }
    );

}


/* RENDER ROOM */

function renderRoom(room) {

    const type =
        room.type === "class"
            ? "CLASS"
            : "FRIENDS";


    roomTypeElement.textContent =
        type;


    roomNameElement.textContent =
        room.name || "Untitled Room";


    roomCodeElement.textContent =
        roomCode;


    const members =
        room.members || {};


    const memberArray =
        Object.entries(members)
            .map(([id, member]) => ({
                id,
                ...member
            }));


    memberCountElement.textContent =
        memberArray.length +
        (memberArray.length === 1 ? " member" : " members");


    welcomeText.textContent =
        type === "CLASS"
            ? "Welcome to " + (room.name || "your class") + "."
            : "Welcome to " + (room.name || "your friend group") + ".";


    renderMembers(memberArray);

    renderLeaderboard(memberArray);

    renderAssignments(room.assignments || {});

    renderChallenges(room.challenges || {});

    renderActivity(room);

}


/* MEMBERS */

function renderMembers(members) {

    if (!members.length) {

        membersList.innerHTML = `
            <div class="empty-small">
                No members yet.
            </div>
        `;

        return;
    }


    members.sort((a, b) => {

        if (a.role === "owner") return -1;

        if (b.role === "owner") return 1;

        return (a.name || "").localeCompare(
            b.name || ""
        );

    });


    membersList.innerHTML = "";


    members.forEach(member => {

        const row =
            document.createElement("div");

        row.className =
            "member-row";


        const initials =
            getInitials(member.name || "Student");


        row.innerHTML = `

            <div class="member-avatar">
                ${escapeHTML(initials)}
            </div>

            <div class="member-info">

                <strong>
                    ${escapeHTML(member.name || "Student")}
                </strong>

                <span>
                    ${member.role === "owner"
                        ? "Owner"
                        : "Member"}
                </span>

            </div>

            <div class="member-score">
                ${Number(member.score) || 0}
                pts
            </div>

        `;


        membersList.appendChild(row);

    });

}


/* LEADERBOARD */

function renderLeaderboard(members) {

    const section =
        document.getElementById("section-leaderboard");


    if (!section) return;


    const sorted =
        [...members].sort(
            (a, b) =>
                (Number(b.score) || 0) -
                (Number(a.score) || 0)
        );


    let leaderboardHTML = `

        <div class="section-card leaderboard-card">

            <div class="section-card-heading">

                <div>
                    <span class="section-mini-label">
                        ROOM RANKINGS
                    </span>

                    <h2>🏆 Leaderboard</h2>
                </div>

                <span class="live-pill">
                    LIVE
                </span>

            </div>

            <div class="leaderboard-list">

    `;


    if (!sorted.length) {

        leaderboardHTML += `

            <div class="empty-small">
                No members yet.
            </div>

        `;

    } else {

        sorted.forEach((member, index) => {

            const score =
                Number(member.score) || 0;


            const position =
                index + 1;


            let medal = "";

            if (position === 1) medal = "🥇";
            if (position === 2) medal = "🥈";
            if (position === 3) medal = "🥉";


            leaderboardHTML += `

                <div class="leaderboard-row">

                    <div class="leaderboard-position">
                        ${medal || position}
                    </div>

                    <div class="leaderboard-avatar">
                        ${escapeHTML(
                            getInitials(
                                member.name || "Student"
                            )
                        )}
                    </div>

                    <div class="leaderboard-name">

                        <strong>
                            ${escapeHTML(
                                member.name || "Student"
                            )}
                        </strong>

                        ${
                            member.role === "owner"
                                ? `<span>OWNER</span>`
                                : ""
                        }

                    </div>

                    <div class="leaderboard-score">
                        ${score}
                        <small>pts</small>
                    </div>

                </div>

            `;

        });

    }


    leaderboardHTML += `

            </div>

            <div class="leaderboard-note">
                Scores will update as members complete StudySprint activities.
            </div>

        </div>

    `;


    section.innerHTML =
        leaderboardHTML;

}


/* ASSIGNMENTS */

function renderAssignments(assignments) {

    const section =
        document.getElementById("section-assignments");


    if (!section) return;


    const items =
        Object.entries(assignments);


    let html = `

        <div class="section-card">

            <div class="section-card-heading">

                <div>
                    <span class="section-mini-label">
                        ROOM WORK
                    </span>

                    <h2>📋 Assignments</h2>
                </div>

            </div>

    `;


    if (!items.length) {

        html += `

            <div class="dashboard-empty">

                <div class="dashboard-empty-icon">
                    📋
                </div>

                <h3>No assignments yet</h3>

                <p>
                    Assignments created for this room will appear here.
                </p>

            </div>

        `;

    } else {

        html += `<div class="dashboard-list">`;


        items.forEach(([id, assignment]) => {

            html += `

                <div class="dashboard-item">

                    <div class="dashboard-item-icon">
                        📚
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(
                                assignment.title || "Assignment"
                            )}
                        </strong>

                        <span>
                            ${
                                escapeHTML(
                                    assignment.description ||
                                    "StudySprint assignment"
                                )
                            }
                        </span>

                    </div>

                </div>

            `;

        });


        html += `</div>`;

    }


    html += `</div>`;


    section.innerHTML =
        html;

}


/* CHALLENGES */

function renderChallenges(challenges) {

    const section =
        document.getElementById("section-challenges");


    if (!section) return;


    const items =
        Object.entries(challenges);


    let html = `

        <div class="section-card">

            <div class="section-card-heading">

                <div>
                    <span class="section-mini-label">
                        ROOM EVENTS
                    </span>

                    <h2>🎯 Challenges</h2>
                </div>

            </div>

    `;


    if (!items.length) {

        html += `

            <div class="dashboard-empty">

                <div class="dashboard-empty-icon">
                    🎯
                </div>

                <h3>No challenges yet</h3>

                <p>
                    Room challenges will appear here.
                </p>

            </div>

        `;

    } else {

        html += `<div class="dashboard-list">`;


        items.forEach(([id, challenge]) => {

            html += `

                <div class="dashboard-item challenge-item">

                    <div class="dashboard-item-icon">
                        🎯
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(
                                challenge.title || "Challenge"
                            )}
                        </strong>

                        <span>
                            ${
                                escapeHTML(
                                    challenge.description ||
                                    "Room challenge"
                                )
                            }
                        </span>

                    </div>

                </div>

            `;

        });


        html += `</div>`;

    }


    html += `</div>`;


    section.innerHTML =
        html;

}


/* ACTIVITY */

function renderActivity(room) {

    const section =
        document.getElementById("section-home");


    if (!section) return;


    const announcements =
        Object.entries(
            room.announcements || {}
        );


    let activityHTML = `

        <div class="section-card">

            <div class="section-card-heading">

                <div>
                    <span class="section-mini-label">
                        ROOM FEED
                    </span>

                    <h2>Activity</h2>
                </div>

                <span class="live-pill">
                    LIVE
                </span>

            </div>

    `;


    if (!announcements.length) {

        activityHTML += `

            <div class="dashboard-empty activity-empty">

                <div class="dashboard-empty-icon">
                    ✨
                </div>

                <h3>Your room is ready</h3>

                <p>
                    Announcements and activity will appear here.
                </p>

            </div>

        `;

    } else {

        activityHTML += `<div class="dashboard-list">`;


        announcements
            .sort(
                (a, b) =>
                    (Number(b[1].createdAt) || 0) -
                    (Number(a[1].createdAt) || 0)
            )
            .forEach(([id, announcement]) => {

                activityHTML += `

                    <div class="activity-item">

                        <div class="activity-icon">
                            📢
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(
                                    announcement.title ||
                                    "Announcement"
                                )}
                            </strong>

                            <p>
                                ${escapeHTML(
                                    announcement.text ||
                                    ""
                                )}
                            </p>

                        </div>

                    </div>

                `;

            });


        activityHTML += `</div>`;

    }


    activityHTML += `</div>`;


    const cards =
        section.querySelectorAll(".section-card");


    if (cards.length > 1) {

        cards[cards.length - 1].outerHTML =
            activityHTML;

    } else {

        section.insertAdjacentHTML(
            "beforeend",
            activityHTML
        );

    }

}


/* INITIALS */

function getInitials(name) {

    const parts =
        String(name)
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (!parts.length) return "?";


    if (parts.length === 1) {

        return parts[0]
            .slice(0, 2)
            .toUpperCase();

    }


    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();

}


/* COPY CODE */

copyCodeButton.addEventListener(
    "click",
    async () => {

        if (!roomCode) return;


        try {

            await navigator.clipboard.writeText(
                roomCode
            );

            copyMessage.textContent =
                "Copied!";

            copyMessage.classList.add("show");


            setTimeout(() => {

                copyMessage.classList.remove("show");

            }, 1800);


        } catch {

            copyMessage.textContent =
                "Copy failed";

            copyMessage.classList.add("show");

        }

    }
);


/* NAVIGATION */

document.querySelectorAll(
    ".room-nav-button"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const target =
                button.dataset.section;


            document.querySelectorAll(
                ".room-nav-button"
            ).forEach(item => {

                item.classList.remove("active");

            });


            document.querySelectorAll(
                ".room-section"
            ).forEach(section => {

                section.classList.remove("active");

            });


            button.classList.add("active");


            const section =
                document.getElementById(
                    "section-" + target
                );


            if (section) {

                section.classList.add("active");

            }

        }
    );

});
