/* =========================================================
   STUDYSPRINT CHARACTER SYSTEM
   Shared character cosmetic renderer + EQUIP SYSTEM
========================================================= */


/* =========================================================
   COLOURS
========================================================= */

const CHARACTER_SKINS = {

    light: "#f6c7a8",
    medium: "#c98b68",
    dark: "#70452f"

};


const CHARACTER_HAIR = {

    brown: "#78350f",
    black: "#111827",
    blonde: "#facc15"

};


const CHARACTER_SHIRTS = {

    blue: "#3b82f6",
    red: "#ef4444",
    green: "#22c55e",
    "sprint-blue": "#2563eb"

};


/* =========================================================
   AVAILABLE COSMETICS
========================================================= */

const CHARACTER_OPTIONS = {

    skin: [
        "light",
        "medium",
        "dark"
    ],

    hair: [
        "brown",
        "black",
        "blonde"
    ],

    shirt: [
        "blue",
        "red",
        "green",
        "sprint-blue"
    ],

    hat: [
        "none",
        "sprint-cap",
        "star-cap",
        "visor"
    ],

    pants: [
        "blue",
        "black",
        "brown",
        "split"
    ],

    banner: [
        "blue",
        "green",
        "sprint-grid",
        "purple-grid",
        "neon-blue"
    ],

    title: [
        "first-sprinter"
    ],

    effect: [
        "none",
        "sparkle",
        "speed-trail",
        "lightning",
        "rainbow",
        "fire",
        "glitch",
        "shadow",
        "crystal",
        "cosmic",
        "crown"
    ]

};


/* =========================================================
   GET LOCAL STORAGE VALUE
========================================================= */

function characterValue(key, fallback) {

    const value =
        localStorage.getItem(key);

    return value || fallback;

}


/* =========================================================
   SET CHARACTER VALUE
========================================================= */

function setCharacterValue(
    key,
    value
) {

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

        return JSON.parse(
            localStorage.getItem(
                "shopOwnedItems"
            )
        ) || [];

    }

    catch {

        return [];

    }

}


/* =========================================================
   CHECK OWNERSHIP
========================================================= */

function ownsCharacterItem(id) {

    /* Free/default cosmetics */

    const freeItems = [

        "light",
        "brown",
        "blue",
        "none",
        "blue"

    ];

    if(
        freeItems.includes(id)
    ) {

        return true;

    }


    return getOwnedItems()
        .includes(id);

}


/* =========================================================
   GET COSMETIC NAME
========================================================= */

function getCosmeticName(id) {

    const names = {

        /* SKINS */

        light: "Light",
        medium: "Medium",
        dark: "Dark",


        /* HAIR */

        brown: "Brown Hair",
        black: "Black Hair",
        blonde: "Blonde Hair",


        /* SHIRTS */

        blue: "Blue Shirt",
        red: "Red Shirt",
        green: "Green Shirt",
        "sprint-blue": "Sprint Shirt",


        /* HATS */

        none: "None",
        "sprint-cap": "Sprint Cap",
        "star-cap": "Star Cap",
        visor: "Sprint Visor",


        /* PANTS */

        black: "Black Pants",
        brown: "Brown Pants",
        split: "Split Pants",


        /* BANNERS */

        "sprint-grid": "Sprint Grid",
        "purple-grid": "Purple Grid",
        "neon-blue": "Neon Blue",


        /* TITLES */

        "first-sprinter":
            "The First Sprinter",


        /* EFFECTS */

        sparkle: "Sparkle Effect",
        "speed-trail": "Speed Trail",
        lightning: "Lightning Effect",
        rainbow: "Rainbow Aura",
        fire: "Fire Aura",
        glitch: "Glitch Effect",
        shadow: "Shadow Aura",
        crystal: "Crystal Glow",
        cosmic: "Cosmic Aura",
        crown: "Crown + Glow"

    };


    return names[id] || id;

}


/* =========================================================
   HAT RENDERER
========================================================= */

function renderCharacterHat(
    element,
    hat
) {

    if(!element)
        return;


    element.innerHTML = "";

    element.className =
        "character-hat";

    element.style.cssText = "";


    if(
        !hat ||
        hat === "none"
    ) {

        return;

    }


    /* =====================================================
       SPRINT CAP
    ===================================================== */

    if(hat === "sprint-cap") {

        element.classList.add("cap");

        element.style.display =
            "block";

        element.style.width =
            "110px";

        element.style.height =
            "32px";

        element.style.left =
            "35px";

        element.style.top =
            "15px";

        element.style.background =
            "#312e81";

        element.style.borderRadius =
            "50px 50px 12px 12px";

        element.style.boxShadow =
            "inset 0 -6px 0 rgba(0,0,0,.15)";

        return;

    }


    /* =====================================================
       STAR CAP
    ===================================================== */

    if(hat === "star-cap") {

        element.classList.add("cap");

        element.style.display =
            "block";

        element.style.width =
            "110px";

        element.style.height =
            "32px";

        element.style.left =
            "35px";

        element.style.top =
            "15px";

        element.style.background =
            "#111827";

        element.style.borderRadius =
            "50px 50px 12px 12px";

        element.style.boxShadow =
            "inset 0 -6px 0 rgba(0,0,0,.15)";

        element.textContent =
            "★";

        element.style.color =
            "#fde68a";

        element.style.fontSize =
            "20px";

        element.style.lineHeight =
            "32px";

        element.style.textAlign =
            "center";

        return;

    }


    /* =====================================================
       VISOR
    ===================================================== */

    if(hat === "visor") {

        element.classList.add("visor");

        element.style.display =
            "block";

        element.style.width =
            "120px";

        element.style.height =
            "20px";

        element.style.left =
            "30px";

        element.style.top =
            "17px";

        element.style.background =
            "#06b6d4";

        element.style.borderRadius =
            "15px";

        element.style.boxShadow =
            "inset 0 -4px 0 rgba(0,0,0,.15)";

        return;

    }

}


/* =========================================================
   PANTS RENDERER
========================================================= */

function renderCharacterPants(
    leftLeg,
    rightLeg,
    pants
) {

    if(
        !leftLeg ||
        !rightLeg
    )
        return;


    leftLeg.style.background =
        "#2563eb";

    rightLeg.style.background =
        "#2563eb";


    if(pants === "black") {

        leftLeg.style.background =
            "#111827";

        rightLeg.style.background =
            "#111827";

    }


    else if(pants === "brown") {

        leftLeg.style.background =
            "#78350f";

        rightLeg.style.background =
            "#78350f";

    }


    else if(pants === "split") {

        leftLeg.style.background =
            "#2563eb";

        rightLeg.style.background =
            "#ef4444";

    }

}


/* =========================================================
   SHIRT RENDERER
========================================================= */

function renderCharacterShirt(
    body,
    shirt
) {

    if(!body)
        return;


    body.style.background =
        CHARACTER_SHIRTS[shirt] ||
        CHARACTER_SHIRTS.blue;

}


/* =========================================================
   SKIN RENDERER
========================================================= */

function renderCharacterSkin(
    head,
    skin
) {

    if(!head)
        return;


    head.style.background =
        CHARACTER_SKINS[skin] ||
        CHARACTER_SKINS.light;

}


/* =========================================================
   HAIR RENDERER
========================================================= */

function renderCharacterHair(
    hairElement,
    hair
) {

    if(!hairElement)
        return;


    hairElement.style.background =
        CHARACTER_HAIR[hair] ||
        CHARACTER_HAIR.brown;

}


/* =========================================================
   EFFECT RENDERER
========================================================= */

function renderCharacterEffect(
    character,
    effect
) {

    if(!character)
        return;


    const effects = [

        "sparkle",
        "speed-trail",
        "lightning",
        "rainbow",
        "fire",
        "glitch",
        "shadow",
        "crystal",
        "cosmic",
        "crown"

    ];


    effects.forEach(
        effectName => {

            character.classList.remove(
                "effect-" +
                effectName
            );

        }
    );


    if(
        effect &&
        effect !== "none" &&
        effects.includes(effect)
    ) {

        character.classList.add(
            "effect-" +
            effect
        );

    }

}


/* =========================================================
   CROWN
========================================================= */

function renderCharacterCrown(
    crown,
    effect
) {

    if(!crown)
        return;


    crown.style.display =
        effect === "crown"
            ? "block"
            : "none";

}


/* =========================================================
   BANNER
========================================================= */

function renderCharacterBanner(
    banner
) {

    const preview =
        document.getElementById(
            "banner-preview"
        );


    if(!preview)
        return;


    preview.className =
        "banner-preview";


    if(
        banner &&
        banner !== "none"
    ) {

        preview.classList.add(
            banner
        );

    }

}


/* =========================================================
   TITLE
========================================================= */

function renderCharacterTitle() {

    const titleElement =
        document.getElementById(
            "player-tag"
        );


    if(!titleElement)
        return;


    const title =
        characterValue(
            "character_title",
            "none"
        );


    if(
        title === "none"
    ) {

        titleElement.style.display =
            "none";

        titleElement.textContent =
            "";

        return;

    }


    titleElement.textContent =
        getCosmeticName(title);

    titleElement.style.display =
        "block";

}


/* =========================================================
   COMPLETE CHARACTER RENDER
========================================================= */

function renderCharacter(
    character
) {

    if(!character)
        return;


    const head =
        character.querySelector(
            ".character-head"
        );


    const hair =
        character.querySelector(
            ".character-hair"
        );


    const body =
        character.querySelector(
            ".character-body"
        );


    const leftLeg =
        character.querySelector(
            ".character-leg-left"
        );


    const rightLeg =
        character.querySelector(
            ".character-leg-right"
        );


    const hat =
        character.querySelector(
            ".character-hat"
        );


    const crown =
        character.querySelector(
            ".character-crown"
        );


    const skin =
        characterValue(
            "character_skin",
            "light"
        );


    const hairType =
        characterValue(
            "character_hair",
            "brown"
        );


    const shirt =
        characterValue(
            "character_shirt",
            "blue"
        );


    const pants =
        characterValue(
            "character_pants",
            "blue"
        );


    const hatType =
        characterValue(
            "character_hat",
            "none"
        );


    const effect =
        characterValue(
            "character_effect",
            "none"
        );


    const banner =
        characterValue(
            "character_banner",
            "purple-grid"
        );


    renderCharacterSkin(
        head,
        skin
    );


    renderCharacterHair(
        hair,
        hairType
    );


    renderCharacterShirt(
        body,
        shirt
    );


    renderCharacterPants(
        leftLeg,
        rightLeg,
        pants
    );


    renderCharacterHat(
        hat,
        hatType
    );


    renderCharacterEffect(
        character,
        effect
    );


    renderCharacterCrown(
        crown,
        effect
    );


    renderCharacterBanner(
        banner
    );


    renderCharacterTitle();

}


/* =========================================================
   CREATE OPTION BUTTON
========================================================= */

function createCharacterOption(
    container,
    id,
    category
) {

    if(!container)
        return;


    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";

    button.className =
        "character-option";


    button.textContent =
        getCosmeticName(id);


    const currentlyEquipped =
        characterValue(
            "character_" +
            category,
            category === "banner"
                ? "purple-grid"
                : category === "effect"
                ? "none"
                : CHARACTER_OPTIONS[category][0]
        );


    if(
        currentlyEquipped === id
    ) {

        button.classList.add(
            "selected"
        );

    }


    /* LOCKED */

    if(
        !ownsCharacterItem(id)
    ) {

        button.textContent =
            "🔒 " +
            getCosmeticName(id);

        button.disabled =
            true;

        button.title =
            "Buy this cosmetic in the Shop.";

    }


    /* EQUIP */

    else {

        button.addEventListener(
            "click",
            function() {

                setCharacterValue(
                    "character_" +
                    category,
                    id
                );


                renderEditor();


            }
        );

    }


    container.appendChild(
        button
    );

}


/* =========================================================
   RENDER OPTIONS
========================================================= */

function renderOptions(
    category,
    elementId
) {

    const container =
        document.getElementById(
            elementId
        );


    if(!container)
        return;


    container.innerHTML =
        "";


    const options =
        CHARACTER_OPTIONS[
            category
        ] || [];


    options.forEach(
        id => {

            createCharacterOption(
                container,
                id,
                category
            );

        }
    );

}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderEditor() {

    const character =
        document.getElementById(
            "character"
        );


    if(character) {

        renderCharacter(
            character
        );

    }


    renderOptions(
        "skin",
        "skin-options"
    );


    renderOptions(
        "hair",
        "hair-options"
    );


    renderOptions(
        "shirt",
        "shirts-options"
    );


    renderOptions(
        "hat",
        "hats-options"
    );


    renderOptions(
        "pants",
        "pants-options"
    );


    renderOptions(
        "banner",
        "banners-options"
    );


    renderOptions(
        "title",
        "titles-options"
    );


    renderOptions(
        "effect",
        "effects-options"
    );

}


/* =========================================================
   PUBLIC FUNCTIONS
========================================================= */

window.renderCharacter =
    renderCharacter;

window.renderCharacterHat =
    renderCharacterHat;

window.renderCharacterPants =
    renderCharacterPants;

window.getCosmeticName =
    getCosmeticName;

window.ownsCharacterItem =
    ownsCharacterItem;

window.renderEditor =
    renderEditor;


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderEditor();

    }
);
