/* =========================================
   STUDYSPRINT CHARACTER EDITOR
========================================= */


/* =========================================
   CATEGORY DATA
========================================= */

var CHARACTER_CATEGORIES = {

    shirts: {
        unlockKey: "unlocked_shirts",
        selectedKey: "character_shirt",
        title: "Shirts"
    },

    hats: {
        unlockKey: "unlocked_hats",
        selectedKey: "character_hat",
        title: "Hats"
    },

    pants: {
        unlockKey: "unlocked_pants",
        selectedKey: "character_pants",
        title: "Pants"
    },

    banners: {
        unlockKey: "unlocked_banners",
        selectedKey: "character_banner",
        title: "Banners"
    },

    titles: {
        unlockKey: "unlockedTitles",
        selectedKey: "character_tag",
        title: "Player Titles"
    },

    effects: {
        unlockKey: "unlocked_effects",
        selectedKey: "character_effect",
        title: "Effects"
    }

};


/* =========================================
   COSMETIC NAMES
========================================= */

var COSMETIC_NAMES = {

    "sprint-blue": "Sprint Shirt",

    "sprint-cap": "Sprint Cap",
    "star-cap": "Star Cap",
    "visor": "Sprint Visor",

    "split": "Split Pants",

    "sprint-grid": "Sprint Grid",
    "purple-grid": "Purple Grid",
    "neon-blue": "Neon Blue",

    "sprint-champion": "Sprint Champion",
    "first-sprinter": "The First Sprinter",

    "sparkle": "Sparkle Effect",
    "speed-trail": "Speed Trail",
    "lightning": "Lightning Effect",
    "rainbow": "Rainbow Aura",
    "fire": "Fire Aura",
    "glitch": "Glitch Effect",
    "shadow": "Shadow Aura",
    "crystal": "Crystal Glow",
    "cosmic": "Cosmic Aura",
    "crown": "Crown + Glow"

};


/* =========================================
   GET UNLOCKED ITEMS
========================================= */

function getUnlockedItems(key) {

    var value =
        localStorage.getItem(key);

    if (!value) {
        return [];
    }

    try {

        var parsed =
            JSON.parse(value);

        if (Array.isArray(parsed)) {
            return parsed;
        }

    }

    catch (error) {

        console.error(
            "Could not read " + key,
            error
        );

    }

    return [];

}


/* =========================================
   GET NAME
========================================= */

function getCosmeticName(id) {

    if (COSMETIC_NAMES[id]) {
        return COSMETIC_NAMES[id];
    }

    return id
        .replace(/-/g, " ")
        .replace(/\b\w/g, function(letter) {
            return letter.toUpperCase();
        });

}


/* =========================================
   RENDER CATEGORY
========================================= */

function renderCategory(categoryName) {

    var data =
        CHARACTER_CATEGORIES[categoryName];

    if (!data) {
        return;
    }


    var container =
        document.getElementById(
            categoryName + "-options"
        );

    if (!container) {
        return;
    }


    var unlocked =
        getUnlockedItems(
            data.unlockKey
        );


    var equipped =
        localStorage.getItem(
            data.selectedKey
        );


    container.innerHTML = "";


    /* -----------------------------------------
       NOTHING UNLOCKED
    ----------------------------------------- */

    if (unlocked.length === 0) {

        var empty =
            document.createElement("p");

        empty.className =
            "no-options";

        empty.textContent =
            "No " +
            data.title.toLowerCase() +
            " unlocked yet.";

        container.appendChild(
            empty
        );

        return;
    }


    /* -----------------------------------------
       CREATE OPTIONS
    ----------------------------------------- */

    unlocked.forEach(
        function(id) {

            var button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "character-option";


            button.textContent =
                getCosmeticName(id);


            if (
                id === equipped
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.onclick =
                function() {

                    equipCosmetic(
                        categoryName,
                        id
                    );

                };


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
    categoryName,
    id
) {

    var data =
        CHARACTER_CATEGORIES[categoryName];


    if (!data) {
        return;
    }


    var unlocked =
        getUnlockedItems(
            data.unlockKey
        );


    /*
       IMPORTANT:
       Crown is stored in unlocked_effects.
    */

    if (
        unlocked.indexOf(id) === -1
    ) {

        console.warn(
            "Item is not unlocked:",
            id
        );

        return;
    }


    /*
       Save equipped cosmetic.
    */

    localStorage.setItem(
        data.selectedKey,
        id
    );


    console.log(
        "Equipped:",
        categoryName,
        id
    );


    /*
       Refresh everything.
    */

    renderEditor();

}


/* =========================================
   UNEQUIP COSMETIC
========================================= */

function unequipCosmetic(
    categoryName
) {

    var data =
        CHARACTER_CATEGORIES[categoryName];


    if (!data) {
        return;
    }


    localStorage.removeItem(
        data.selectedKey
    );


    renderEditor();

}


/* =========================================
   RENDER CHARACTER
========================================= */

function renderCharacter() {

    var preview =
        document.getElementById(
            "character-preview"
        );


    if (!preview) {
        return;
    }


    /*
       Remove previous cosmetic classes.
    */

    var classesToRemove = [

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

    ];


    classesToRemove.forEach(
        function(className) {

            preview.classList.remove(
                className
            );

        }
    );


    /*
       Get equipped cosmetics.
    */

    var shirt =
        localStorage.getItem(
            "character_shirt"
        );


    var hat =
        localStorage.getItem(
            "character_hat"
        );


    var pants =
        localStorage.getItem(
            "character_pants"
        );


    var banner =
        localStorage.getItem(
            "character_banner"
        );


    var effect =
        localStorage.getItem(
            "character_effect"
        );


    var title =
        localStorage.getItem(
            "character_tag"
        );


    /* =========================================
       SHIRT
    ========================================= */

    if (
        shirt === "sprint-blue"
    ) {

        preview.classList.add(
            "cosmetic-shirt-sprint-blue"
        );

    }


    /* =========================================
       HATS
    ========================================= */

    if (
        hat === "sprint-cap"
    ) {

        preview.classList.add(
            "cosmetic-hat-sprint-cap"
        );

    }


    if (
        hat === "star-cap"
    ) {

        preview.classList.add(
            "cosmetic-hat-star-cap"
        );

    }


    if (
        hat === "visor"
    ) {

        preview.classList.add(
            "cosmetic-hat-visor"
        );

    }


    /* =========================================
       PANTS
    ========================================= */

    if (
        pants === "split"
    ) {

        preview.classList.add(
            "cosmetic-pants-split"
        );

    }


    /* =========================================
       BANNERS
    ========================================= */

    if (
        banner === "sprint-grid"
    ) {

        preview.classList.add(
            "cosmetic-banner-sprint-grid"
        );

    }


    if (
        banner === "purple-grid"
    ) {

        preview.classList.add(
            "cosmetic-banner-purple-grid"
        );

    }


    if (
        banner === "neon-blue"
    ) {

        preview.classList.add(
            "cosmetic-banner-neon-blue"
        );

    }


    /* =========================================
       EFFECTS
    ========================================= */

    if (
        effect === "sparkle"
    ) {

        preview.classList.add(
            "cosmetic-effect-sparkle"
        );

    }


    if (
        effect === "speed-trail"
    ) {

        preview.classList.add(
            "cosmetic-effect-speed-trail"
        );

    }


    if (
        effect === "lightning"
    ) {

        preview.classList.add(
            "cosmetic-effect-lightning"
        );

    }


    if (
        effect === "rainbow"
    ) {

        preview.classList.add(
            "cosmetic-effect-rainbow"
        );

    }


    if (
        effect === "fire"
    ) {

        preview.classList.add(
            "cosmetic-effect-fire"
        );

    }


    if (
        effect === "glitch"
    ) {

        preview.classList.add(
            "cosmetic-effect-glitch"
        );

    }


    if (
        effect === "shadow"
    ) {

        preview.classList.add(
            "cosmetic-effect-shadow"
        );

    }


    if (
        effect === "crystal"
    ) {

        preview.classList.add(
            "cosmetic-effect-crystal"
        );

    }


    if (
        effect === "cosmic"
    ) {

        preview.classList.add(
            "cosmetic-effect-cosmic"
        );

    }


    /*
       CROWN
    */

    if (
        effect === "crown"
    ) {

        preview.classList.add(
            "cosmetic-effect-crown"
        );

    }


    /* =========================================
       DATA ATTRIBUTES
    ========================================= */

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


    /* =========================================
       TITLE
    ========================================= */

    var titleElement =
        document.getElementById(
            "character-title"
        );


    if (titleElement) {

        titleElement.textContent =
            title
                ? getCosmeticName(title)
                : "";

    }

}


/* =========================================
   RENDER EVERYTHING
========================================= */

function renderEditor() {

    renderCategory(
        "shirts"
    );

    renderCategory(
        "hats"
    );

    renderCategory(
        "pants"
    );

    renderCategory(
        "banners"
    );

    renderCategory(
        "titles"
    );

    renderCategory(
        "effects"
    );

    renderCharacter();

}


/* =========================================
   INITIALISE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
           Make sure the effects category
           reads the exact storage key used
           by the shop.
        */

        var effects =
            getUnlockedItems(
                "unlocked_effects"
            );


        console.log(
            "Unlocked effects:",
            effects
        );


        /*
           If crown was purchased but somehow
           wasn't equipped yet, DO NOT auto-equip
           it. Just make it available.
        */

        renderEditor();

    }
);


/* =========================================
   GLOBAL FUNCTIONS
========================================= */

window.renderCharacter =
    renderCharacter;


window.renderEditor =
    renderEditor;


window.equipCosmetic =
    equipCosmetic;


window.unequipCosmetic =
    unequipCosmetic;
