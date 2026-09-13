import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue,
    push,
    set
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


const userId =
    localStorage.getItem("studysprint_user_id");

const username =
    localStorage.getItem("studysprint_username") || "Student";


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


let currentRoom = null;
let isOwner = false;


if (!roomCode) {

    showError("No room code was provided.");

} else {

    loadRoom();

}


/* LOAD */

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


            currentRoom =
                snapshot.val();


            const members =
                currentRoom.members || {};


            isOwner =
                currentRoom.owner === userId;


            renderRoom(currentRoom, members);

        },

        error => {

            console.error(error);

            showError(
                "Couldn't load this room. Check your Firebase database rules."
            );

        }
    );

}


/* RENDER */

function renderRoom(room, members) {

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


    const memberArray =
        Object.entries(members)
            .map(([id, member]) => ({
                id,
                ...member
            }));


    memberCountElement.textContent =
        memberArray.length +
        (
            memberArray.length === 1
                ? " member"
                : " members"
        );


    welcomeText.textContent =
        isOwner
            ? "You created this room. Let's get your group moving."
            : "Welcome to " +
              (room.name || "your room") +
              ".";


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

        return String(a.name || "")
            .localeCompare(
                String(b.name || "")
            );

    });


    membersList.innerHTML = "";


    members.forEach(member => {

        const row =
            document.createElement("div");


        row.className =
            "member-row";


        row.innerHTML = `

            <div class="member-avatar">
                ${escapeHTML(
                    getInitials(
                        member.name || "Student"
                    )
                )}
            </div>

            <div class="member-info">

                <strong>
                    ${escapeHTML(
                        member.name || "Student"
                    )}
                </strong>

                <span>
                    ${
                        member.role === "owner"
                            ? "Room owner"
                            : "Member"
                    }
                </span>

            </div>

            <div class="member-score">
                ${Number(member.score) || 0} pts
            </div>

        `;


        membersList.appendChild(row);

    });

}


/* LEADERBOARD */

function renderLeaderboard(members) {

    const section =
        document.getElementById(
            "section-leaderboard"
        );


    if (!section) return;


    const sorted =
        [...members].sort(
            (a, b) =>
                (Number(b.score) || 0) -
                (Number(a.score) || 0)
        );


    let html = `

        <div class="section-card">

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

        html += `
            <div class="empty-small">
                No members yet.
            </div>
        `;

    } else {

        sorted.forEach((member, index) => {

            const position =
                index + 1;


            let medal =
                String(position);


            if (position === 1) medal = "🥇";

            if (position === 2) medal = "🥈";

            if (position === 3) medal = "🥉";


            html += `

                <div class="leaderboard-row">

                    <div class="leaderboard-position">
                        ${medal}
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
                                ? "<span>OWNER</span>"
                                : ""
                        }

                    </div>

                    <div class="leaderboard-score">

                        ${Number(member.score) || 0}

                        <small>
                            pts
                        </small>

                    </div>

                </div>

            `;

        });

    }


    html += `

            </div>

            <div class="leaderboard-note">
                Scores will update as members complete StudySprint activities.
            </div>

        </div>

    `;


    section.innerHTML =
        html;

}


/* ASSIGNMENTS */

function renderAssignments(assignments) {

    const section =
        document.getElementById(
            "section-assignments"
        );


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


    if (isOwner) {

        html += `

            <button
                class="assignment-create-button"
                id="new-assignment-button"
                type="button"
            >
                + New Assignment
            </button>

        `;

    }


    if (!items.length) {

        html += `

            <div class="dashboard-empty">

                <div class="dashboard-empty-icon">
                    📋
                </div>

                <h3>No assignments yet</h3>

                <p>
                    ${
                        isOwner
                            ? "Create the first assignment for your room."
                            : "Assignments created by the room owner will appear here."
                    }
                </p>

            </div>

        `;

    } else {

        html += `
            <div class="dashboard-list">
        `;


        items
            .sort(
                (a, b) =>
                    (Number(b[1].createdAt) || 0) -
                    (Number(a[1].createdAt) || 0)
            )
            .forEach(([id, assignment]) => {

                html += `

                    <div class="dashboard-item">

                        <div class="dashboard-item-icon">
                            📚
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(
                                    assignment.title ||
                                    "Assignment"
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    assignment.description ||
                                    "StudySprint assignment"
                                )}
                            </span>

                        </div>

                    </div>

                `;

            });


        html += `
            </div>
        `;

    }


    html += `
        </div>
    `;


    section.innerHTML =
        html;


    const createButton =
        document.getElementById(
            "new-assignment-button"
        );


    if (createButton) {

        createButton.addEventListener(
            "click",
            openAssignmentModal
        );

    }

}


/* ASSIGNMENT MODAL */

function openAssignmentModal() {

    if (!isOwner) return;


    let modal =
        document.getElementById(
            "assignment-modal"
        );


    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "assignment-modal";

        modal.className =
            "assignment-modal";


        modal.innerHTML = `

            <div class="assignment-modal-card">

                <h2>
                    New Assignment
                </h2>

                <p>
                    Create an assignment for everyone in this room.
                </p>

                <input
                    id="assignment-title"
                    class="assignment-input"
                    type="text"
                    maxlength="80"
                    placeholder="Assignment title"
                >

                <textarea
                    id="assignment-description"
                    class="assignment-textarea"
                    maxlength="300"
                    placeholder="Description or instructions"
                ></textarea>

                <div class="assignment-modal-actions">

                    <button
                        class="cancel-assignment"
                        id="cancel-assignment"
                        type="button"
                    >
                        Cancel
                    </button>

                    <button
                        class="save-assignment"
                        id="save-assignment"
                        type="button"
                    >
                        Create
                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(modal);


        document
            .getElementById("cancel-assignment")
            .addEventListener(
                "click",
                closeAssignmentModal
            );


        document
            .getElementById("save-assignment")
            .addEventListener(
                "click",
                saveAssignment
            );


        modal.addEventListener(
            "click",
            event => {

                if (event.target === modal) {
                    closeAssignmentModal();
                }

            }
        );

    }


    modal.classList.add("open");


    document
        .getElementById("assignment-title")
        .focus();

}


function closeAssignmentModal() {

    const modal =
        document.getElementById(
            "assignment-modal"
        );


    if (modal) {

        modal.classList.remove("open");

    }

}


async function saveAssignment() {

    if (!isOwner) return;


    const titleInput =
        document.getElementById(
            "assignment-title"
        );

    const descriptionInput =
        document.getElementById(
            "assignment-description"
        );


    const title =
        titleInput.value.trim();

    const description =
        descriptionInput.value.trim();


    if (!title) {

        titleInput.focus();

        return;

    }


    const saveButton =
        document.getElementById(
            "save-assignment"
        );


    saveButton.disabled =
        true;

    saveButton.textContent =
        "Saving...";


    try {

        const assignmentsRef =
            ref(
                database,
                "rooms/" +
                roomCode +
                "/assignments"
            );


        const newAssignment =
            push(assignmentsRef);


        await set(
            newAssignment,
            {

                title: title,

                description: description,

                createdAt: Date.now(),

                createdBy: userId,

                createdByName: username

            }
        );


        titleInput.value =
            "";

        descriptionInput.value =
            "";


        closeAssignmentModal();


    } catch (error) {

        console.error(error);

        saveButton.disabled =
            false;

        saveButton.textContent =
            "Create";

        alert(
            "Couldn't create the assignment."
        );

    }

}


/* CHALLENGES */

function renderChallenges(challenges) {

    const section =
        document.getElementById(
            "section-challenges"
        );


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

        html += `
            <div class="dashboard-list">
        `;


        items.forEach(([id, challenge]) => {

            html += `

                <div class="dashboard-item">

                    <div class="dashboard-item-icon">
                        🎯
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(
                                challenge.title ||
                                "Challenge"
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                challenge.description ||
                                "Room challenge"
                            )}
                        </span>

                    </div>

                </div>

            `;

        });


        html += `
            </div>
        `;

    }


    html += `
        </div>
    `;


    section.innerHTML =
        html;

}


/* ACTIVITY */

function renderActivity(room) {

    const section =
        document.getElementById(
            "section-home"
        );


    if (!section) return;


    const announcements =
        Object.entries(
            room.announcements || {}
        );


    const oldActivity =
        section.querySelector(
            ".activity-card"
        );


    if (oldActivity) {
        oldActivity.remove();
    }


    const card =
        document.createElement("div");


    card.className =
        "section-card activity-card";


    let html = `

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

        html += `

            <div class="dashboard-empty">

                <div class="dashboard-empty-icon">
                    ✨
                </div>

                <h3>Room is ready</h3>

                <p>
                    Announcements and activity will appear here.
                </p>

            </div>

        `;

    } else {

        html += `
            <div class="dashboard-list">
        `;


        announcements
            .sort(
                (a, b) =>
                    (Number(b[1].createdAt) || 0) -
                    (Number(a[1].createdAt) || 0)
            )
            .forEach(([id, announcement]) => {

                html += `

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


        html += `
            </div>
        `;

    }


    card.innerHTML =
        html;


    section.appendChild(card);

}


/* COPY */

copyCodeButton.addEventListener(
    "click",
    async () => {

        try {

            await navigator.clipboard.writeText(
                roomCode
            );


            copyMessage.textContent =
                "Copied!";

            copyMessage.classList.add(
                "show"
            );


            setTimeout(
                () => {

                    copyMessage.classList.remove(
                        "show"
                    );

                },
                1600
            );


        } catch {

            copyMessage.textContent =
                "Copy failed";

            copyMessage.classList.add(
                "show"
            );

        }

    }
);


/* NAV */

document
    .querySelectorAll(".room-nav-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.dataset.section;


                document
                    .querySelectorAll(
                        ".room-nav-button"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                document
                    .querySelectorAll(
                        ".room-section"
                    )
                    .forEach(section => {

                        section.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                const section =
                    document.getElementById(
                        "section-" + target
                    );


                if (section) {

                    section.classList.add(
                        "active"
                    );

                }

            }
        );

    });


/* HELPERS */

function getInitials(name) {

    const parts =
        String(name)
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (!parts.length) {
        return "?";
    }


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


function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value == null
            ? ""
            : String(value);

    return div.innerHTML;

}


function showError(message) {

    roomError.textContent =
        message;

    roomError.classList.add(
        "visible"
    );

}
