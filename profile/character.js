/* =========================================================
   STUDYSPRINT CHARACTER SYSTEM
   Shared character cosmetic renderer
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
   GET LOCAL STORAGE VALUE
========================================================= */

function characterValue(key, fallback) {

    const value =
        localStorage.getItem(key);

    return value || fallback;

}


/* =========================================================
   GET COSMETIC NAME
========================================================= */

function getCosmeticName(id) {

    const names = {

        "sprint-grid": "Sprint Grid",
        "purple-grid": "Purple Grid",
        "neon-blue": "Neon Blue",

        "sprint-blue": "Sprint Shirt",

        "sprint-cap": "Sprint Cap",
        "star-cap": "Star Cap",
        "visor": "Sprint Visor",

        "blue": "Blue Pants",
        "black": "Black Pants",
        "brown": "Brown Pants",
        "split": "Split Pants",

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

    return names[id] || id;

}


/* =========================================================
   HAT RENDERER
========================================================= */

function renderCharacterHat(element, hat) {

    if (!element)
        return;


    element.innerHTML = "";

    element.className =
        "character-hat";

    element.style.cssText = "";


    /* NONE */

    if (!hat || hat === "none")
        return;


    /* =====================================================
       SPRINT CAP
    ===================================================== */

    if (hat === "sprint-cap") {

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

    if (hat === "star-cap") {

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

    if (hat === "visor") {

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


    /* =====================================================
       UNKNOWN HAT
    ===================================================== */

    element.style.display =
        "none";

}


/* =========================================================
   PANTS RENDERER
========================================================= */

function renderCharacterPants(
    leftLeg,
    rightLeg,
    pants
) {

    if (!leftLeg || !rightLeg)
        return;


    /* RESET */

    leftLeg.style.background = "";
    rightLeg.style.background = "";


    /* =====================================================
       BLUE
    ===================================================== */

    if (pants === "blue") {

        leftLeg.style.background =
            "#2563eb";

        rightLeg.style.background =
            "#2563eb";

    }


    /* =====================================================
       BLACK
    ===================================================== */

    else if (pants === "black") {

        leftLeg.style.background =
            "#111827";

        rightLeg.style.background =
            "#111827";

    }


    /* =====================================================
       BROWN
    ===================================================== */

    else if (pants === "brown") {

        leftLeg.style.background =
            "#78350f";

        rightLeg.style.background =
            "#78350f";

    }


    /* =====================================================
       SPLIT PANTS
       EXACT SHOP DESIGN
    ===================================================== */

    else if (pants === "split") {

        leftLeg.style.background =
            "#2563eb";

        rightLeg.style.background =
            "#ef4444";

    }


    /* =====================================================
       FALLBACK
    ===================================================== */

    else {

        leftLeg.style.background =
            "#2563eb";

        rightLeg.style.background =
            "#2563eb";

    }

}


/* =========================================================
   SHIRT RENDERER
========================================================= */

function renderCharacterShirt(
    body,
    shirt
) {

    if (!body)
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

    if (!head)
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

    if (!hairElement)
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

    if (!character)
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
        function(effectName) {

            character.classList.remove(
                "effect-" + effectName
            );

        }
    );


    if (
        effect &&
        effect !== "none" &&
        effects.includes(effect)
    ) {

        character.classList.add(
            "effect-" + effect
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

    if (!crown)
        return;


    if (effect === "crown") {

        crown.style.display =
            "block";

    }

    else {

        crown.style.display =
            "none";

    }

}


/* =========================================================
   COMPLETE CHARACTER RENDER
========================================================= */

function renderCharacter(
    character
) {

    if (!character)
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


    /* VALUES */

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


    /* RENDER */

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

}


/* =========================================================
   AUTO RENDER
========================================================= */

function initialiseCharacter() {

    const character =
        document.getElementById(
            "character"
        );


    if (!character)
        return;


    renderCharacter(
        character
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


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initialiseCharacter();

    }
);
