/* =========================================================
   STUDYSPRINT CHARACTER SYSTEM
   MATCHES THE PROFILE CHARACTER
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

    var value = localStorage.getItem(key);

    if (!value) {
        return [];
    }

    try {

        var parsed = JSON.parse(value);

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
   RENDER CATEGORY
========================================================= */

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
        ) || "none";

    container.innerHTML = "";


    /* =====================================================
       DEFAULT BUTTON
    ===================================================== */

    if (
        categoryName !== "titles" &&
        categoryName !== "effects"
    ) {

        var defaultButton =
            document.createElement("button");

        defaultButton.type = "button";

        defaultButton.className =
            "character-option";

        defaultButton.textContent =
            "Default";

        if (
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


    /* =====================================================
       NONE BUTTON
    ===================================================== */

    if (
        categoryName === "effects" ||
        categoryName === "titles"
    ) {

        var noneButton =
            document.createElement("button");

        noneButton.type = "button";

        noneButton.className =
            "character-option";

        noneButton.textContent =
            "None";

        if (
            equipped === "none"
        ) {

            noneButton.classList.add(
                "selected"
            );

        }

        noneButton.onclick =
            function() {

                localStorage.setItem(
                    data.selectedKey,
                    "none"
                );

                renderEditor();

            };

        container.appendChild(
            noneButton
        );

    }


    /* =====================================================
       UNLOCKED COSMETICS
    ===================================================== */

    unlocked.forEach(
        function(id) {

            var button =
                document.createElement("button");

            button.type = "button";

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
        CHARACTER_CATEGORIES[categoryName];

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
        CHARACTER_CATEGORIES[categoryName];

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
   CHARACTER COLOURS
   SAME AS PROFILE
========================================================= */

var CHARACTER_SKIN_COLOURS = {

    light: "#f6c7a8",
    medium: "#c98b68",
    dark: "#70452f"

};

var CHARACTER_HAIR_COLOURS = {

    brown: "#78350f",
    black: "#111827",
    blonde: "#facc15"

};

var CHARACTER_SHIRT_COLOURS = {

    blue: "#3b82f6",
    red: "#ef4444",
    green: "#22c55e",
    "sprint-blue": "#2563eb"

};

var CHARACTER_PANTS_COLOURS = {

    blue: "#2563eb",
    black: "#111827",
    brown: "#78350f"

};


/* =========================================================
   RENDER SKIN
========================================================= */

function renderSkin(skin) {

    var head =
        document.getElementById(
            "character-head"
        );

    if (!head) {
        return;
    }

    head.style.background =
        CHARACTER_SKIN_COLOURS[skin]
        || CHARACTER_SKIN_COLOURS.light;

}


/* =========================================================
   RENDER HAIR
========================================================= */

function renderHair(hair) {

    var element =
        document.getElementById(
            "character-hair"
        );

    if (!element) {
        return;
    }

    element.style.background =
        CHARACTER_HAIR_COLOURS[hair]
        || CHARACTER_HAIR_COLOURS.brown;

}


/* =========================================================
   RENDER SHIRT
========================================================= */

function renderShirt(shirt) {

    var body =
        document.getElementById(
            "character-body"
        );

    if (!body) {
        return;
    }

    body.style.background =
        CHARACTER_SHIRT_COLOURS[shirt]
        || CHARACTER_SHIRT_COLOURS.blue;

}


/* =========================================================
   RENDER PANTS
========================================================= */

function renderPants(pants) {

    var pantsElement =
        document.getElementById(
            "character-pants"
        );

    var leftLeg =
        document.querySelector(
            ".character-leg.left"
        );

    var rightLeg =
        document.querySelector(
            ".character-leg.right"
        );


    if (!pantsElement) {
        return;
    }


    /* Reset */

    pantsElement.style.background =
        CHARACTER_PANTS_COLOURS[
            pants
        ]
        || CHARACTER_PANTS_COLOURS.blue;

    pantsElement.style.backgroundImage =
        "none";

    if (leftLeg) {

        leftLeg.style.background =
            CHARACTER_PANTS_COLOURS[
                pants
            ]
            || CHARACTER_PANTS_COLOURS.blue;

    }

    if (rightLeg) {

        rightLeg.style.background =
            CHARACTER_PANTS_COLOURS[
                pants
            ]
            || CHARACTER_PANTS_COLOURS.blue;

    }


    /* Split Pants */

    if (
        pants === "split"
    ) {

        pantsElement.style.background =
            "linear-gradient(90deg,#2563eb 50%,#ef4444 50%)";

        if (leftLeg) {

            leftLeg.style.background =
                "#2563eb";

        }

        if (rightLeg) {

            rightLeg.style.background =
                "#ef4444";

        }

    }

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


    /*
       IMPORTANT:
       Keep character-hat class.
       The previous version removed it,
       which broke the CSS.
    */

    element.className =
        "character-hat";

    element.innerHTML = "";

    element.style.display =
        "none";

    element.style.background =
        "";

    element.style.color =
        "";

    element.style.width =
        "";

    element.style.height =
        "";

    element.style.left =
        "";

    element.style.top =
        "";

    element.style.lineHeight =
        "";

    element.style.textAlign =
        "";


    /* =====================================================
       SPRINT CAP
    ===================================================== */

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


    /* =====================================================
       STAR CAP
    ===================================================== */

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


    /* =====================================================
       VISOR
    ===================================================== */

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

    crown.classList.remove(
        "active"
    );

    crown.style.display =
        "none";


    if (
        effect === "crown"
    ) {

        crown.classList.add(
            "active"
        );

        crown.style.display =
            "block";

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
        "green",
        "sprint-grid",
        "purple-grid",
        "neon-blue"
    );


    preview.style.background =
        "";


    preview.style.backgroundImage =
        "";


    preview.style.backgroundSize =
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

        preview.classList.add(
            "sprint-grid"
        );

    }

    else if (
        banner === "purple-grid"
    ) {

        preview.classList.add(
            "purple-grid"
        );

    }

    else if (
        banner === "neon-blue"
    ) {

        preview.classList.add(
            "neon-blue"
        );

    }

    else {

        preview.style.background =
            "linear-gradient(135deg,#6366f1,#818cf8)";

    }

}


/* =========================================================
   RENDER EFFECT
========================================================= */

function renderEffect(effect) {

    var character =
        document.querySelector(
            ".character"
        );

    var effectLayer =
        document.getElementById(
            "character-effect"
        );


    if (!character) {
        return;
    }


    var effectClasses = [

        "effect-sparkle",
        "effect-speed-trail",
        "effect-lightning",
        "effect-rainbow",
        "effect-fire",
        "effect-glitch",
        "effect-shadow",
        "effect-crystal",
        "effect-cosmic",
        "effect-crown"

    ];


    effectClasses.forEach(
        function(className) {

            character.classList.remove(
                className
            );

            if (effectLayer) {

                effectLayer.classList.remove(
                    className
                );

            }

        }
    );


    if (
        !effect ||
        effect === "none"
    ) {

        return;

    }


    var className =
        "effect-" +
        effect;


    character.classList.add(
        className
    );


    if (effectLayer) {

        effectLayer.classList.add(
            className
        );

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


    var skin =
        localStorage.getItem(
            "character_skin"
        ) || "light";

    var hair =
        localStorage.getItem(
            "character_hair"
        ) || "brown";

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


    /* =====================================================
       APPLY CHARACTER
    ===================================================== */

    renderSkin(skin);

    renderHair(hair);

    renderShirt(shirt);

    renderPants(pants);

    renderHat(hat);

    renderBanner(banner);

    renderEffect(effect);

    renderCrown(effect);


    /* =====================================================
       TITLE
    ===================================================== */

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


    /* =====================================================
       DATA
    ===================================================== */

    character.dataset.skin =
        skin;

    character.dataset.hair =
        hair;

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

    renderCategory("shirts");

    renderCategory("hats");

    renderCategory("pants");

    renderCategory("banners");

    renderCategory("titles");

    renderCategory("effects");

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
