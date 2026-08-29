```javascript
/* =========================================================
   STUDYSPRINT PROFILE CUSTOMISATION
   Banners + Titles + Profile Frames

   NO CHARACTERS
   NO GOOBERS
   NO EFFECTS
========================================================= */


/* =========================================================
   BANNERS
========================================================= */

const PROFILE_BANNERS = [

    {
        id: "blue",
        name: "Blue",
        free: true
    },

    {
        id: "green",
        name: "Green",
        free: true
    },

    {
        id: "sprint-grid",
        name: "Sprint Grid"
    },

    {
        id: "purple-grid",
        name: "Purple Grid"
    },

    {
        id: "neon-blue",
        name: "Neon Blue"
    },

    {
        id: "galaxy-banner",
        name: "Galaxy"
    },

    {
        id: "gold-banner",
        name: "Golden"
    }

];


/* =========================================================
   TITLES
========================================================= */

const PROFILE_TITLES = [

    {
        id: "none",
        name: "No Title",
        free: true
    },

    {
        id: "study-sprinter",
        name: "Study Sprinter"
    },

    {
        id: "brainiac",
        name: "Brainiac"
    },

    {
        id: "speed-learner",
        name: "Speed Learner"
    },

    {
        id: "knowledge-seeker",
        name: "Knowledge Seeker"
    },

    {
        id: "study-legend",
        name: "Study Legend"
    }

];


/* =========================================================
   PROFILE FRAMES
========================================================= */

const PROFILE_FRAMES = [

    {
        id: "simple-frame",
        name: "Simple",
        free: true
    },

    {
        id: "blue-frame",
        name: "Blue"
    },

    {
        id: "purple-frame",
        name: "Purple"
    },

    {
        id: "cyan-frame",
        name: "Cyan"
    },

    {
        id: "pink-frame",
        name: "Pink"
    },

    {
        id: "fire-frame",
        name: "Fire"
    },

    {
        id: "cosmic-frame",
        name: "Cosmic"
    },

    {
        id: "gold-frame",
        name: "Golden"
    }

];


/* =========================================================
   STORAGE
========================================================= */

function getCharacterValue(key, fallback) {

    const value =
        localStorage.getItem(key);

    return value || fallback;

}


function setCharacterValue(key, value) {

    localStorage.setItem(
        key,
        value
    );

}


/* =========================================================
   OWNED ITEMS
========================================================= */

function getOwnedItems() {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(
                    "shopOwnedItems"
                )
            );

        return Array.isArray(data)
            ? data
            : [];

    }

    catch {

        return [];

    }

}


/* =========================================================
   OWNERSHIP
========================================================= */

function ownsProfileItem(id, category) {

    /*
       Free items
    */

    if (
        category === "banner" &&
        (
            id === "blue" ||
            id === "green"
        )
    ) {

        return true;

    }


    if (
        category === "title" &&
        id === "none"
    ) {

        return true;

    }


    if (
        category === "frame" &&
        id === "simple-frame"
    ) {

        return true;

    }


    /*
       Purchased items
    */

    return getOwnedItems().includes(id);

}


/* =========================================================
   SANITISE SAVED CUSTOMISATION
========================================================= */

function validateProfileCustomisation() {

    const savedBanner =
        getCharacterValue(
            "character_banner",
            "blue"
        );


    const savedTitle =
        getCharacterValue(
            "character_title",
            "none"
        );


    const savedFrame =
        getCharacterValue(
            "character_frame",
            "simple-frame"
        );


    const banner =
        PROFILE_BANNERS.find(
            item =>
                item.id === savedBanner
        );


    const title =
        PROFILE_TITLES.find(
            item =>
                item.id === savedTitle
        );


    const frame =
        PROFILE_FRAMES.find(
            item =>
                item.id === savedFrame
        );


    if (
        !banner ||
        !ownsProfileItem(
            savedBanner,
            "banner"
        )
    ) {

        setCharacterValue(
            "character_banner",
            "blue"
        );

    }


    if (
        !title ||
        !ownsProfileItem(
            savedTitle,
            "title"
        )
    ) {

        setCharacterValue(
            "character_title",
            "none"
        );

    }


    if (
        !frame ||
        !ownsProfileItem(
            savedFrame,
            "frame"
        )
    ) {

        setCharacterValue(
            "character_frame",
            "simple-frame"
        );

    }

}


/* =========================================================
   CUSTOM DROPDOWN
========================================================= */

function createProfileDropdown(
    container,
    items,
    category,
    fallback
) {

    if (!container)
        return;


    container.innerHTML = "";


    const storageKey =
        "character_" +
        category;


    const saved =
        getCharacterValue(
            storageKey,
            fallback
        );


    const current =
        items.find(
            item =>
                item.id === saved
        ) ||
        items.find(
            item =>
                item.id === fallback
        ) ||
        items[0];


    const wrapper =
        document.createElement("div");

    wrapper.className =
        "custom-dropdown-wrapper";


    const selected =
        document.createElement("button");

    selected.type =
        "button";

    selected.className =
        "custom-dropdown-selected";


    selected.innerHTML = `
        <span class="custom-dropdown-text">
            ${current.name}
        </span>

        <span class="custom-dropdown-arrow">
            ▼
        </span>
    `;


    const menu =
        document.createElement("div");

    menu.className =
        "custom-dropdown-menu";


    items.forEach(
        function(item) {

            const option =
                document.createElement("button");

            option.type =
                "button";

            option.className =
                "custom-dropdown-option";


            const owned =
                ownsProfileItem(
                    item.id,
                    category
                );


            if (
                item.id === current.id
            ) {

                option.classList.add(
                    "selected"
                );

            }


            option.innerHTML = `
                <span>
                    ${
                        owned
                            ? ""
                            : "🔒 "
                    }

                    ${item.name}
                </span>

                <span class="dropdown-check">
                    ${
                        item.id === current.id
                            ? "✓"
                            : ""
                    }
                </span>
            `;


            if (!owned) {

                option.disabled = true;

                option.title =
                    "Buy this item in the Shop.";

            }

            else {

                option.addEventListener(
                    "click",
                    function(event) {

                        event.stopPropagation();


                        setCharacterValue(
                            storageKey,
                            item.id
                        );


                        renderEditor();

                    }
                );

            }


            menu.appendChild(
                option
            );

        }
    );


    wrapper.appendChild(
        selected
    );

    wrapper.appendChild(
        menu
    );


    selected.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();


            document
                .querySelectorAll(
                    ".custom-dropdown-wrapper.open"
                )
                .forEach(
                    other => {

                        if (
                            other !== wrapper
                        ) {

                            other.classList.remove(
                                "open"
                            );

                        }

                    }
                );


            wrapper.classList.toggle(
                "open"
            );

        }
    );


    container.appendChild(
        wrapper
    );

}


/* =========================================================
   BANNER PREVIEW
========================================================= */

function renderBannerPreview() {

    const preview =
        document.getElementById(
            "banner-preview"
        );


    if (!preview)
        return;


    const banner =
        getCharacterValue(
            "character_banner",
            "blue"
        );


    preview.className =
        "banner-preview";


    preview.classList.add(
        banner
    );

}


/* =========================================================
   FRAME PREVIEW
========================================================= */

function renderFramePreview() {

    const frame =
        document.getElementById(
            "frame-preview"
        );


    if (!frame)
        return;


    const savedFrame =
        getCharacterValue(
            "character_frame",
            "simple-frame"
        );


    frame.className =
        "profile-frame-preview";


    frame.classList.add(
        savedFrame
    );


    frame.innerHTML = `
        <div class="profile-frame-preview-inner">
            SS
        </div>
    `;

}


/* =========================================================
   TITLE PREVIEW
========================================================= */

function renderTitlePreview() {

    const element =
        document.getElementById(
            "player-tag"
        );


    if (!element)
        return;


    const titleId =
        getCharacterValue(
            "character_title",
            "none"
        );


    if (
        titleId === "none"
    ) {

        element.textContent = "";

        element.style.display =
            "none";

        return;

    }


    const title =
        PROFILE_TITLES.find(
            item =>
                item.id === titleId
        );


    element.textContent =
        title
            ? title.name
            : "";


    element.style.display =
        "inline-block";

}


/* =========================================================
   PLAYER NAME
========================================================= */

function renderPlayerName() {

    const element =
        document.getElementById(
            "player-username"
        );


    if (!element)
        return;


    element.textContent =
        localStorage.getItem(
            "username"
        ) ||
        "Player";

}


/* =========================================================
   DROPDOWNS
========================================================= */

function renderBannerOptions() {

    createProfileDropdown(
        document.getElementById(
            "banners-options"
        ),
        PROFILE_BANNERS,
        "banner",
        "blue"
    );

}


function renderTitleOptions() {

    createProfileDropdown(
        document.getElementById(
            "titles-options"
        ),
        PROFILE_TITLES,
        "title",
        "none"
    );

}


function renderFrameOptions() {

    createProfileDropdown(
        document.getElementById(
            "frames-options"
        ),
        PROFILE_FRAMES,
        "frame",
        "simple-frame"
    );

}


/* =========================================================
   MAIN RENDER
========================================================= */

function renderEditor() {

    validateProfileCustomisation();

    renderPlayerName();

    renderBannerPreview();

    renderFramePreview();

    renderTitlePreview();

    renderBannerOptions();

    renderTitleOptions();

    renderFrameOptions();

}


/* =========================================================
   CLOSE DROPDOWNS
========================================================= */

document.addEventListener(
    "click",
    function() {

        document
            .querySelectorAll(
                ".custom-dropdown-wrapper.open"
            )
            .forEach(
                dropdown => {

                    dropdown.classList.remove(
                        "open"
                    );

                }
            );

    }
);


/* =========================================================
   PUBLIC API
========================================================= */

window.renderEditor =
    renderEditor;

window.ownsProfileItem =
    ownsProfileItem;


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderEditor();

    }
);
```
