```javascript
/* =========================================
   STUDYSPRINT CHARACTER EDITOR
   COSMETIC + RENDER SYSTEM
========================================= */


/* =========================================
   COSMETIC DEFINITIONS
========================================= */

const COSMETICS = {

    shirts: {

        "sprint-blue": {
            name: "Sprint Shirt",
            className: "cosmetic-shirt-sprint-blue"
        }

    },


    hats: {

        "sprint-cap": {
            name: "Sprint Cap",
            className: "cosmetic-hat-sprint-cap"
        },

        "star-cap": {
            name: "Star Cap",
            className: "cosmetic-hat-star-cap"
        },

        "visor": {
            name: "Sprint Visor",
            className: "cosmetic-hat-visor"
        }

    },


    pants: {

        "split": {
            name: "Split Pants",
            className: "cosmetic-pants-split"
        }

    },


    banners: {

        "sprint-grid": {
            name: "Sprint Grid",
            className: "cosmetic-banner-sprint-grid"
        },

        "purple-grid": {
            name: "Purple Grid",
            className: "cosmetic-banner-purple-grid"
        },

        "neon-blue": {
            name: "Neon Blue",
            className: "cosmetic-banner-neon-blue"
        }

    },


    titles: {

        "sprint-champion": {
            name: "Sprint Champion"
        },

        "first-sprinter": {
            name: "The First Sprinter"
        }

    },


    effects: {

        "sparkle": {
            name: "Sparkle Effect",
            className: "cosmetic-effect-sparkle"
        },

        "speed-trail": {
            name: "Speed Trail",
            className: "cosmetic-effect-speed-trail"
        },

        "lightning": {
            name: "Lightning Effect",
            className: "cosmetic-effect-lightning"
        },

        "rainbow": {
            name: "Rainbow Aura",
            className: "cosmetic-effect-rainbow"
        },

        "fire": {
            name: "Fire Aura",
            className: "cosmetic-effect-fire"
        },

        "glitch": {
            name: "Glitch Effect",
            className: "cosmetic-effect-glitch"
        },

        "shadow": {
            name: "Shadow Aura",
            className: "cosmetic-effect-shadow"
        },

        "crystal": {
            name: "Crystal Glow",
            className: "cosmetic-effect-crystal"
        },

        "cosmic": {
            name: "Cosmic Aura",
            className: "cosmetic-effect-cosmic"
        },

        "crown": {
            name: "Crown + Glow",
            className: "cosmetic-effect-crown"
        }

    }

};


/* =========================================
   STORAGE
========================================= */

const CATEGORY_DATA = {

    shirts: {
        unlockKey: "unlocked_shirts",
        selectedKey: "character_shirt"
    },

    hats: {
        unlockKey: "unlocked_hats",
        selectedKey: "character_hat"
    },

    pants: {
        unlockKey: "unlocked_pants",
        selectedKey: "character_pants"
    },

    banners: {
        unlockKey: "unlocked_banners",
        selectedKey: "character_banner"
    },

    titles: {
        unlockKey: "unlockedTitles",
        selectedKey: "character_tag"
    },

    effects: {
        unlockKey: "unlocked_effects",
        selectedKey: "character_effect"

    }

};


/* =========================================
   GET UNLOCKED ITEMS
========================================= */

function getUnlocked(key) {

    try {

        return JSON.parse(
            localStorage.getItem(key)
        ) || [];

    }

    catch {

        return [];

    }

}


/* =========================================
   FORMAT NAME
========================================= */

function getCosmeticName(
    category,
    id
) {

    if (
        COSMETICS[category] &&
        COSMETICS[category][id]
    ) {

        return COSMETICS[category][id].name;

    }


    return id
        .replaceAll("-", " ")
        .replace(
            /\b\w/g,
            letter =>
                letter.toUpperCase()
        );

}


/* =========================================
   RENDER OPTION BUTTONS
========================================= */

function renderCategory(
    category
) {

    const data =
        CATEGORY_DATA[category];


    if (!data) {
        return;
    }


    const container =
        document.getElementById(
            `${category}-options`
        );


    if (!container) {
        return;
    }


    const unlocked =
        getUnlocked(
            data.unlockKey
        );


    const equipped =
        localStorage.getItem(
            data.selectedKey
        );


    container.innerHTML = "";


    if (unlocked.length === 0) {

        const empty =
            document.createElement("p");


        empty.textContent =
            `No ${category} unlocked yet.`;


        empty.className =
            "no-options";


        container.appendChild(
            empty
        );


        return;

    }


    unlocked.forEach(
        id => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "character-option";


            button.dataset.cosmetic =
                id;


            if (
                id === equipped
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.textContent =
                getCosmeticName(
                    category,
                    id
                );


            button.addEventListener(
                "click",
                () => {

                    equipCosmetic(
                        category,
                        id
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================
   EQUIP COSMETIC
========================================= */

function equipCosmetic(
    category,
    id
) {

    const data =
        CATEGORY_DATA[category];


    if (!data) {
        return;
    }


    const unlocked =
        getUnlocked(
            data.unlockKey
        );


    if (
        !unlocked.includes(id)
    ) {

        console.warn(
            "Attempted to equip locked cosmetic:",
            id
        );

        return;

    }


    localStorage.setItem(
        data.selectedKey,
        id
    );


    renderCategory(
        category
    );


    renderCharacter();

}


/* =========================================
   UNEQUIP COSMETIC
========================================= */

function unequipCosmetic(
    category
) {

    const data =
        CATEGORY_DATA[category];


    if (!data) {
        return;
    }


    localStorage.removeItem(
        data.selectedKey
    );


    renderCategory(
        category
    );


    renderCharacter();

}


/* =========================================
   CHARACTER RENDERER
========================================= */

function renderCharacter() {

    const preview =
        document.getElementById(
            "character-preview"
        );


    if (!preview) {
        return;
    }


    /*
       Remove previous cosmetic classes.
    */

    preview.classList.remove(
        "cosmetic-shirt-sprint-blue",

        "cosmetic-hat-sprint-cap",
        "cosmetic-hat-star-cap",
        "cosmetic-hat-visor",

        "cosmetic-pants-split",

        "cosmetic-banner-sprint-grid",
        "cosmetic-banner-purple-grid",
        "cosmetic-banner-neon-blue",

        "cosmetic-effect-sparkle",
        "cosmetic-effect-speed-trail",
        "cosmetic-effect-lightning",
        "cosmetic-effect-rainbow",
        "cosmetic-effect-fire",
        "cosmetic-effect-glitch",
        "cosmetic-effect-shadow",
        "cosmetic-effect-crystal",
        "cosmetic-effect-cosmic",
        "cosmetic-effect-crown"
    );


    /*
       Apply equipped cosmetics.
    */

    const shirt =
        localStorage.getItem(
            "character_shirt"
        );


    const hat =
        localStorage.getItem(
            "character_hat"
        );


    const pants =
        localStorage.getItem(
            "character_pants"
        );


    const banner =
        localStorage.getItem(
            "character_banner"
        );


    const effect =
        localStorage.getItem(
            "character_effect"
        );


    /*
       Shirt
    */

    if (
        shirt &&
        COSMETICS.shirts[shirt]
    ) {

        preview.classList.add(
            COSMETICS
                .shirts[shirt]
                .className
        );

    }


    /*
       Hat
    */

    if (
        hat &&
        COSMETICS.hats[hat]
    ) {

        preview.classList.add(
            COSMETICS
                .hats[hat]
                .className
        );

    }


    /*
       Pants
    */

    if (
        pants &&
        COSMETICS.pants[pants]
    ) {

        preview.classList.add(
            COSMETICS
                .pants[pants]
                .className
        );

    }


    /*
       Banner
    */

    if (
        banner &&
        COSMETICS.banners[banner]
    ) {

        preview.classList.add(
            COSMETICS
                .banners[banner]
                .className
        );

    }


    /*
       Effect
    */

    if (
        effect &&
        COSMETICS.effects[effect]
    ) {

        preview.classList.add(
            COSMETICS
                .effects[effect]
                .className
        );

    }


    /*
       Player title
    */

    const title =
        localStorage.getItem(
            "character_tag"
        );


    const titleElement =
        document.getElementById(
            "character-title"
        );


    if (titleElement) {

        titleElement.textContent =
            title
                ? getCosmeticName(
                    "titles",
                    title
                )
                : "";

    }


    /*
       Data attributes are useful for CSS
       and future rendering.
    */

    preview.dataset.shirt =
        shirt || "";


    preview.dataset.hat =
        hat || "";


    preview.dataset.pants =
        pants || "";


    preview.dataset.banner =
        banner || "";


    preview.dataset.effect =
        effect || "";


    preview.dataset.title =
        title || "";

}


/* =========================================
   RENDER EVERYTHING
========================================= */

function renderEditor() {

    Object.keys(
        CATEGORY_DATA
    ).forEach(
        category => {

            renderCategory(
                category
            );

        }
    );


    renderCharacter();

}


/* =========================================
   AUTO-REFRESH
========================================= */

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key ===
            "unlocked_shirts" ||

            event.key ===
            "unlocked_hats" ||

            event.key ===
            "unlocked_pants" ||

            event.key ===
            "unlocked_banners" ||

            event.key ===
            "unlockedTitles" ||

            event.key ===
            "unlocked_effects"
        ) {

            renderEditor();

        }

    }
);


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderEditor();

    }
);


/* =========================================
   GLOBAL FUNCTIONS
========================================= */

window.renderEditor =
    renderEditor;

window.renderCharacter =
    renderCharacter;

window.equipCosmetic =
    equipCosmetic;

window.unequipCosmetic =
    unequipCosmetic;
```
