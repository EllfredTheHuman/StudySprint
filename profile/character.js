/* =========================================================
   STUDYSPRINT CHARACTER SYSTEM
========================================================= */


/* =========================================================
   CHARACTER CATEGORIES
========================================================= */

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


/* =========================================================
   COSMETIC NAMES
========================================================= */

var COSMETIC_NAMES = {

    "sprint-blue":
        "Sprint Shirt",

    "sprint-cap":
        "Sprint Cap",

    "star-cap":
        "Star Cap",

    "visor":
        "Sprint Visor",

    "split":
        "Split Pants",

    "sprint-grid":
        "Sprint Grid",

    "purple-grid":
        "Purple Grid",

    "neon-blue":
        "Neon Blue",

    "sprint-champion":
        "Sprint Champion",

    "first-sprinter":
        "The First Sprinter",

    "sparkle":
        "Sparkle Effect",

    "speed-trail":
        "Speed Trail",

    "lightning":
        "Lightning Effect",

    "rainbow":
        "Rainbow Aura",

    "fire":
        "Fire Aura",

    "glitch":
        "Glitch Effect",

    "shadow":
        "Shadow Aura",

    "crystal":
        "Crystal Glow",

    "cosmic":
        "Cosmic Aura",

    "crown":
        "Crown + Glow"

};


/* =========================================================
   DEFAULT CHARACTER
========================================================= */

var CHARACTER_DEFAULTS = {

    skin: "light",

    hair: "brown",

    shirt: "blue",

    pants: "blue",

    hat: "none",

    banner: "purple",

    tag: "none",

    effect: "none"

};


/* =========================================================
   GET UNLOCKED ITEMS
========================================================= */

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

    } catch (error) {

        console.error(
            "Could not read " + key,
            error
        );

    }

    return [];

}


/* =========================================================
   GET COSMETIC NAME
========================================================= */

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


/* =========================================================
   GET CURRENT CHARACTER VALUE
========================================================= */

function getCharacterValue(key) {

    return (
        localStorage.getItem(key) ||
        CHARACTER_DEFAULTS[
            key.replace(
                "character_",
                ""
            )
        ] ||
        ""
    );

}


/* =========================================================
   RENDER CATEGORY
========================================================= */

function renderCategory(categoryName) {

    var data =
        CHARACTER_CATEGORIES[
            categoryName
        ];

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


    /*
       Add default / unequip button.
    */

    if (
        categoryName !== "titles" &&
        categoryName !== "effects"
    ) {

        var defaultButton =
            document.createElement(
                "button"
            );

        defaultButton.type =
            "button";

        defaultButton.className =
            "character-option";

        defaultButton.textContent =
            "Default";


        if (
            !equipped ||
            equipped === "none"
        ) {

            defaultButton.classList.add(
                "selected"
            );

        }


        defaultButton.onclick =
            function() {

                localStorage.setItem(
                    data.selectedKey,
                    "none"
                );

                renderEditor();

            };


        container.appendChild(
            defaultButton
        );

    }


    if (
        categoryName === "effects"
    ) {

        var noEffectButton =
            document.createElement(
                "button"
            );

        noEffectButton.type =
            "button";

        noEffectButton.className =
            "character-option";

        noEffectButton.textContent =
            "None";


        if (
            !equipped ||
            equipped === "none"
        ) {

            noEffectButton.classList.add(
                "selected"
            );

        }


        noEffectButton.onclick =
            function() {

                localStorage.setItem(
                    data.selectedKey,
                    "none"
                );

                renderEditor();

            };


        container.appendChild(
            noEffectButton
        );

    }


    if (
        categoryName === "titles"
    ) {

        var noTitleButton =
            document.createElement(
                "button"
            );

        noTitleButton.type =
            "button";

        noTitleButton.className =
            "character-option";

        noTitleButton.textContent =
            "None";


        if (
            !equipped ||
            equipped === "none"
        ) {

            noTitleButton.classList.add(
                "selected"
            );

        }


        noTitleButton.onclick =
            function() {

                localStorage.setItem(
                    data.selectedKey,
                    "none"
                );

                renderEditor();

            };


        container.appendChild(
            noTitleButton
        );

    }


    /*
       Render unlocked cosmetics.
    */

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


/* =========================================================
   EQUIP COSMETIC
========================================================= */

function equipCosmetic(
    categoryName,
    id
) {

    var data =
        CHARACTER_CATEGORIES[
            categoryName
        ];

    if (!data) {
        return;
    }


    var unlocked =
        getUnlockedItems(
            data.unlockKey
        );


    if (
        unlocked.indexOf(id) === -1
    ) {

        console.warn(
            "Item is not unlocked:",
            id
        );

        return;
    }


    localStorage.setItem(
        data.selectedKey,
        id
    );


    renderEditor();

}


/* =========================================================
   UNEQUIP COSMETIC
========================================================= */

function unequipCosmetic(
    categoryName
) {

    var data =
        CHARACTER_CATEGORIES[
            categoryName
        ];

    if (!data) {
        return;
    }


    localStorage.setItem(
        data.selectedKey,
        "none"
    );


    renderEditor();

}


/* =========================================================
   REMOVE COSMETIC CLASSES
========================================================= */

function clearCosmeticClasses(
    element
) {

    if (!element) {
        return;
    }


    var classes =
        Array.from(
            element.classList
        );


    classes.forEach(
        function(className) {

            if (
                className.indexOf(
                    "cosmetic-"
                ) === 0
            ) {

                element.classList.remove(
                    className
                );

            }

        }
    );

}


/* =========================================================
   RENDER CROWN
========================================================= */

function renderCrown(effect) {

    var crown =
        document.getElementById(
            "character-crown"
        );

    if (!crown) {
        return;
    }


    crown.style.display =
        "none";


    if (
        effect !== "crown"
    ) {

        return;

    }


    crown.style.display =
        "block";

}


/* =========================================================
   RENDER HAT
========================================================= */

function renderHat(hat) {

    var element =
        document.getElementById(
            "character-hat"
        );

    if (!element) {
        return;
    }


    element.className =
        "hat";


    element.style.display =
        "none";


    if (
        hat === "sprint-cap"
    ) {

        element.classList.add(
            "cap"
        );

        element.style.display =
            "block";

        element.style.background =
            "#312e81";

    }


    else if (
        hat === "star-cap"
    ) {

        element.classList.add(
            "cap"
        );

        element.style.display =
            "block";

        element.style.background =
            "#111827";


        element.innerHTML =
            "★";

        element.style.color =
            "#fde68a";

        element.style.textAlign =
            "center";

        element.style.lineHeight =
            "35px";

    }


    else if (
        hat === "visor"
    ) {

        element.classList.add(
            "cap"
        );

        element.style.display =
            "block";

        element.style.width =
            "125px";

        element.style.height =
            "22px";

        element.style.left =
            "23px";

        element.style.top =
            "12px";

        element.style.background =
            "#06b6d4";

    }

}


/* =========================================================
   RENDER EFFECT
========================================================= */

function renderEffect(effect) {

    var preview =
        document.getElementById(
            "banner-preview"
        );

    var character =
        document.querySelector(
            ".character"
        );

    var effectLayer =
        document.getElementById(
            "character-effect"
        );


    if (!preview) {
        return;
    }


    clearCosmeticClasses(
        preview
    );

    clearCosmeticClasses(
        character
    );

    clearCosmeticClasses(
        effectLayer
    );


    if (
        !effect ||
        effect === "none"
    ) {

        return;

    }


    var className =
        "cosmetic-effect-" +
        effect;


    if (character) {

        character.classList.add(
            className
        );

    }


    if (effectLayer) {

        effectLayer.classList.add(
            className
        );

    }

}


/* =========================================================
   RENDER BANNER
========================================================= */

function renderBanner(banner) {

    var preview =
        document.getElementById(
            "banner-preview"
        );

    if (!preview) {
        return;
    }


    preview.classList.remove(
        "blue",
        "green"
    );


    preview.style.background =
        "";


    if (
        banner === "blue"
    ) {

        preview.classList.add(
            "blue"
        );

    }


    else if (
        banner === "green"
    ) {

        preview.classList.add(
            "green"
        );

    }


    else if (
        banner === "sprint-grid"
    ) {

        preview.style.background =
            "linear-gradient(135deg,#312e81,#6366f1)";

        preview.style.backgroundImage =
            "linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)," +
            "linear-gradient(135deg,#312e81,#6366f1)";

        preview.style.backgroundSize =
            "25px 25px,25px 25px,auto";

    }


    else if (
        banner === "purple-grid"
    ) {

        preview.style.background =
            "linear-gradient(135deg,#7c3aed,#a78bfa)";

        preview.style.backgroundImage =
            "linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)," +
            "linear-gradient(135deg,#7c3aed,#a78bfa)";

        preview.style.backgroundSize =
            "25px 25px,25px 25px,auto";

    }


    else if (
        banner === "neon-blue"
    ) {

        preview.style.background =
            "linear-gradient(135deg,#06b6d4,#2563eb)";

    }


    else {

        preview.style.background =
            "linear-gradient(135deg,#6366f1,#818cf8)";

    }

}


/* =========================================================
   RENDER CHARACTER
========================================================= */

function renderCharacter() {

    var character =
        document.querySelector(
            ".character"
        );

    if (!character) {
        return;
    }


    var shirt =
        localStorage.getItem(
            "character_shirt"
        ) || "blue";


    var pants =
        localStorage.getItem(
            "character_pants"
        ) || "blue";


    var hat =
        localStorage.getItem(
            "character_hat"
        ) || "none";


    var banner =
        localStorage.getItem(
            "character_banner"
        ) || "purple";


    var effect =
        localStorage.getItem(
            "character_effect"
        ) || "none";


    var title =
        localStorage.getItem(
            "character_tag"
        ) || "none";


    var body =
        document.getElementById(
            "character-body"
        );


    var pantsElement =
        document.getElementById(
            "character-pants"
        );


    if (body) {

        body.classList.remove(
            "cosmetic-shirt-sprint-blue"
        );


        if (
            shirt === "sprint-blue"
        ) {

            body.classList.add(
                "cosmetic-shirt-sprint-blue"
            );

            body.style.background =
                "#2563eb";

        }

    }


    if (pantsElement) {

        pantsElement.classList.remove(
            "cosmetic-pants-split"
        );


        if (
            pants === "split"
        ) {

            pantsElement.classList.add(
                "cosmetic-pants-split"
            );

            pantsElement.style.background =
                "linear-gradient(90deg,#2563eb 50%,#ef4444 50%)";

        }

    }


    renderHat(
        hat
    );


    renderBanner(
        banner
    );


    renderEffect(
        effect
    );


    renderCrown(
        effect
    );


    var titleElement =
        document.getElementById(
            "character-title"
        );


    if (titleElement) {

        titleElement.textContent =
            title !== "none"
                ? getCosmeticName(title)
                : "";

    }


    /*
       Save useful data attributes.
    */

    character.dataset.shirt =
        shirt;

    character.dataset.pants =
        pants;

    character.dataset.hat =
        hat;

    character.dataset.banner =
        banner;

    character.dataset.effect =
        effect;

    character.dataset.title =
        title;

}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

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


/* =========================================================
   INITIALISE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderEditor();

    }
);


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.renderCharacter =
    renderCharacter;

window.renderEditor =
    renderEditor;

window.equipCosmetic =
    equipCosmetic;

window.unequipCosmetic =
    unequipCosmetic;
