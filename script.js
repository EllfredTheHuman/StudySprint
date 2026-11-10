
/* ==========================
   STUDYSPRINT — JAVASCRIPT
========================== */

// PAGE NAVIGATION

const navButtons = document.querySelectorAll(".nav-button");
const pages = document.querySelectorAll(".page");

function showPage(pageName) {
  const targetPage = document.getElementById(pageName);

  if (!targetPage) return;

  // Hide all pages
  pages.forEach(page => {
    page.classList.remove("active");
  });

  // Show selected page
  targetPage.classList.add("active");

  // Update navigation
  navButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.view === pageName
    );
  });

  // Clear old notification
  hideNotice();

  // Start at the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// Navigation buttons

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.view);
  });
});


// Buttons that navigate to another section

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.go);
  });
});


// NOTIFICATIONS

const notice = document.getElementById("notice");

function showNotice(message) {
  notice.textContent = message;
  notice.classList.add("visible");
}

function hideNotice() {
  notice.textContent = "";
  notice.classList.remove("visible");
}


// PROFILE BUTTON

document
  .getElementById("profile-button")
  .addEventListener("click", () => {
    showNotice("Your account settings will be available here.");
  });


// PLAY — JOIN GAME

document
  .getElementById("join-game-form")
  .addEventListener("submit", event => {
    event.preventDefault();

    const code = document
      .getElementById("game-code")
      .value
      .trim();

    if (!code) return;

    showNotice(
      `Game code "${code}" entered. Game joining will be added later.`
    );
  });


// PLAY — HOST GAME

document
  .getElementById("host-game-button")
  .addEventListener("click", () => {
    showNotice("The game hosting setup will be built here.");
  });


// LEARN — STUDY

document
  .getElementById("study-button")
  .addEventListener("click", () => {
    showNotice("The subject and topic selection screen will be built here.");
  });


// LEARN — DAILY CHALLENGE

document
  .getElementById("daily-button")
  .addEventListener("click", () => {
    showNotice("The Daily Challenge setup will be built here.");
  });


// ROOMS — JOIN ROOM

document
  .getElementById("join-room-form")
  .addEventListener("submit", event => {
    event.preventDefault();

    const code = document
      .getElementById("room-code")
      .value
      .trim();

    if (!code) return;

    showNotice(
      `Room code "${code}" entered. Room joining will be added later.`
    );
  });


// ROOMS — CREATE ROOM

document
  .getElementById("create-room-button")
  .addEventListener("click", () => {
    showNotice("The room creation screen will be built here.");
  });
