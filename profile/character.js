/* =========================================================
   STUDYSPRINT CHARACTER EDITOR
   POLISHED COSMETIC SYSTEM
========================================================= */

var CHARACTER_CATEGORIES = {

    shirts: {
        unlockKey:"unlocked_shirts",
        selectedKey:"character_shirt",
        title:"Shirts"
    },

    hats: {
        unlockKey:"unlocked_hats",
        selectedKey:"character_hat",
        title:"Hats"
    },

    pants: {
        unlockKey:"unlocked_pants",
        selectedKey:"character_pants",
        title:"Pants"
    },

    banners: {
        unlockKey:"unlocked_banners",
        selectedKey:"character_banner",
        title:"Banners"
    },

    titles: {
        unlockKey:"unlockedTitles",
        selectedKey:"character_tag",
        title:"Player Titles"
    },

    effects: {
        unlockKey:"unlocked_effects",
        selectedKey:"character_effect",
        title:"Effects"
    }

};


/* =========================================================
   NAMES
========================================================= */

var COSMETIC_NAMES = {

    "sprint-blue":"Sprint Shirt",

    "sprint-cap":"Sprint Cap",
    "star-cap":"Star Cap",
    "visor":"Sprint Visor",

    "split":"Split Pants",

    "sprint-grid":"Sprint Grid",
    "purple-grid":"Purple Grid",
    "neon-blue":"Neon Blue",

    "sprint-champion":"Sprint Champion",
    "first-sprinter":"The First Sprinter",

    "sparkle":"Sparkle Effect",
    "speed-trail":"Speed Trail",
    "lightning":"Lightning Effect",
    "rainbow":"Rainbow Aura",
    "fire":"Fire Aura",
    "glitch":"Glitch Effect",
    "shadow":"Shadow Aura",
    "crystal":"Crystal Glow",
    "cosmic":"Cosmic Aura",
    "crown":"Crown + Glow"

};


/* =========================================================
   READ UNLOCKS
========================================================= */

function getUnlockedItems(key) {

    var raw =
        localStorage.getItem(key);

    if (!raw) {
        return [];
    }

    try {

        var data =
            JSON.parse(raw);

        return Array.isArray(data)
            ? data
            : [];

    }

    catch(error) {

        console.error(
            "Could not read",
            key,
            error
        );

        return [];

    }

}


/* =========================================================
   NAME
========================================================= */

function getCosmeticName(id) {

    if (COSMETIC_NAMES[id]) {
        return COSMETIC_NAMES[id];
    }

    return id
        .replace(/-/g," ")
        .replace(
            /\b\w/g,
            function(letter) {
                return letter.toUpperCase();
            }
        );

}


/* =========================================================
   COSMETIC PREVIEW HTML
========================================================= */

function getCosmeticPreview(
    category,
    id
) {

    if (category === "effects") {

        return `
            <div class="mini-preview mini-effect-${id}">
                <div class="mini-character">
                    <div class="mini-head"></div>
                    <div class="mini-body"></div>
                    <div class="mini-pants"></div>
                </div>
            </div>
        `;

    }


    if (category === "hats") {

        return `
            <div class="mini-preview">
                <div class="mini-character mini-hat-${id}">
                    <div class="mini-head"></div>
                    <div class="mini-hair"></div>
                    <div class="mini-hat"></div>
                    <div class="mini-body"></div>
                </div>
            </div>
        `;

    }


    if (category === "shirts") {

        return `
            <div class="mini-preview">
                <div class="mini-character">
                    <div class="mini-head"></div>
                    <div class="mini-body mini-shirt-${id}"></div>
                    <div class="mini-pants"></div>
                </div>
            </div>
        `;

    }


    if (category === "pants") {

        return `
            <div class="mini-preview">
                <div class="mini-character">
                    <div class="mini-head"></div>
                    <div class="mini-body"></div>
                    <div class="mini-pants mini-pants-${id}"></div>
                </div>
            </div>
        `;

    }


    if (category === "banners") {

        return `
            <div class="mini-preview mini-banner-${id}">
                <span>★</span>
            </div>
        `;

    }


    return `
        <div class="mini-preview mini-title">
            ★
        </div>
    `;

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
        );

    container.innerHTML = "";

    if (unlocked.length === 0) {

        var empty =
            document.createElement("p");

        empty.className =
            "no-options";

        empty.textContent =
            "No " +
            data.title.toLowerCase() +
            " unlocked yet.";

        container.appendChild(empty);

        return;
    }


    unlocked.forEach(
        function(id) {

            var button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "character-option";

            if (id === equipped) {

                button.classList.add(
                    "selected"
                );

            }


            button.innerHTML = `

                ${getCosmeticPreview(
                    categoryName,
                    id
                )}

                <span class="cosmetic-name">
                    ${getCosmeticName(id)}
                </span>

            `;


            button.onclick =
                function() {

                    equipCosmetic(
                        categoryName,
                        id
                    );

                };


            container.appendChild(button);

        }
    );

}


/* =========================================================
   EQUIP
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
   UNEQUIP
========================================================= */

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


/* =========================================================
   CLEAR COSMETIC CLASSES
========================================================= */

function clearCosmeticClasses(
    preview
) {

    var prefixes = [
        "cosmetic-"
    ];


    Array.from(
        preview.classList
    ).forEach(
        function(className) {

            prefixes.forEach(
                function(prefix) {

                    if (
                        className.indexOf(
                            prefix
                        ) === 0
                    ) {

                        preview.classList.remove(
                            className
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   RENDER CHARACTER
========================================================= */

function renderCharacter() {

    var preview =
        document.getElementById(
            "character-preview"
        );

    if (!preview) {
        return;
    }


    clearCosmeticClasses(
        preview
    );


    var shirt =
        localStorage.getItem(
            "character_shirt"
        ) || "blue";

    var hat =
        localStorage.getItem(
            "character_hat"
        ) || "none";

    var pants =
        localStorage.getItem(
            "character_pants"
        ) || "blue";

    var banner =
        localStorage.getItem(
            "character_banner"
        ) || "purple";

    var effect =
        localStorage.getItem(
            "character_effect"
        );

    var title =
        localStorage.getItem(
            "character_tag"
        );


    if (shirt !== "blue") {

        preview.classList.add(
            "cosmetic-shirt-" + shirt
        );

    }


    if (hat !== "none") {

        preview.classList.add(
            "cosmetic-hat-" + hat
        );

    }


    if (pants !== "blue") {

        preview.classList.add(
            "cosmetic-pants-" + pants
        );

    }


    if (banner) {

        preview.classList.add(
            "cosmetic-banner-" + banner
        );

    }


    if (effect) {

        preview.classList.add(
            "cosmetic-effect-" + effect
        );

    }


    preview.dataset.shirt = shirt;
    preview.dataset.hat = hat;
    preview.dataset.pants = pants;
    preview.dataset.banner = banner;
    preview.dataset.effect = effect || "";
    preview.dataset.title = title || "";


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
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderEditor();

    }
);


/* =========================================================
   GLOBALS
========================================================= */

window.renderCharacter =
    renderCharacter;

window.renderEditor =
    renderEditor;

window.equipCosmetic =
    equipCosmetic;

window.unequipCosmetic =
    unequipCosmetic;
