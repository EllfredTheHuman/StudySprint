/* =========================================================
   STUDYSPRINT CHARACTER EDITOR
   Shared cosmetic equipment system
   ========================================================= */


/* =========================================================
   BASIC CHARACTER OPTIONS
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
    ]

};


/* =========================================================
   SHOP CHARACTERS
   IMPORTANT:
   These IDs match shop.js exactly.
   ========================================================= */

const SHOP_CHARACTERS = [

    {
        id: "leafy",
        name: "Leafy",
        rarity: "Common",
        design: "leafy"
    },

    {
        id: "squish",
        name: "Squish",
        rarity: "Common",
        design: "squish"
    },

    {
        id: "pebble",
        name: "Pebble",
        rarity: "Common",
        design: "pebble"
    },

    {
        id: "button",
        name: "Button",
        rarity: "Common",
        design: "button"
    },

    {
        id: "horns",
        name: "Horns",
        rarity: "Rare",
        design: "horns"
    },

    {
        id: "shelby",
        name: "Shelby",
        rarity: "Rare",
        design: "shelby"
    },

    {
        id: "tallboi",
        name: "Tallboi",
        rarity: "Rare",
        design: "tallboi"
    },

    {
        id: "four-eyes",
        name: "Four Eyes",
        rarity: "Rare",
        design: "fourEyes"
    },

    {
        id: "mothball",
        name: "Mothball",
        rarity: "Epic",
        design: "mothball"
    },

    {
        id: "spike",
        name: "Spike",
        rarity: "Epic",
        design: "spike"
    },

    {
        id: "orbit",
        name: "Orbit",
        rarity: "Epic",
        design: "orbit"
    },

    {
        id: "bubble",
        name: "Bubble",
        rarity: "Epic",
        design: "bubble"
    },

    {
        id: "captain-goob",
        name: "Captain Goob",
        rarity: "Mythic",
        design: "captainGoob"
    },

    {
        id: "tailspin",
        name: "Tailspin",
        rarity: "Mythic",
        design: "tailspin"
    },

    {
        id: "holy-moly",
        name: "Holy Moly",
        rarity: "Mythic",
        design: "holyMoly"
    },

    {
        id: "wingnut",
        name: "Wingnut",
        rarity: "Mythic",
        design: "wingnut"
    },

    {
        id: "cosmo",
        name: "Cosmo",
        rarity: "Legendary",
        design: "cosmo"
    },

    {
        id: "the-goober",
        name: "The Goober",
        rarity: "Legendary",
        design: "theGoober"
    },

    {
        id: "golden-goober",
        name: "Golden Goober",
        rarity: "Legendary",
        design: "golden"
    },

    {
        id: "galaxy-goober",
        name: "Galaxy Goober",
        rarity: "Legendary",
        design: "galaxy"
    },

    {
        id: "study-sprout",
        name: "Study Sprout",
        rarity: "Epic",
        design: "studySprout"
    },

    {
        id: "study-orbit",
        name: "Study Orbit",
        rarity: "Legendary",
        design: "studyOrbit"
    }

];


/* =========================================================
   BANNERS
   ========================================================= */

const CHARACTER_BANNERS = [

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

const CHARACTER_TITLES = [

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
   EFFECTS
   ========================================================= */

const CHARACTER_EFFECTS = [

    {
        id: "none",
        name: "No Effect",
        free: true
    },

    {
        id: "sparkle",
        name: "Sparkle Effect"
    },

    {
        id: "speed-trail",
        name: "Speed Trail"
    },

    {
        id: "lightning",
        name: "Lightning Effect"
    },

    {
        id: "rainbow",
        name: "Rainbow Aura"
    },

    {
        id: "fire",
        name: "Fire Aura"
    },

    {
        id: "glitch",
        name: "Glitch Effect"
    },

    {
        id: "shadow",
        name: "Shadow Aura"
    },

    {
        id: "crystal",
        name: "Crystal Glow"
    },

    {
        id: "cosmic-aura",
        name: "Cosmic Aura"
    },

    {
        id: "crown",
        name: "Crown + Glow"
    }

];


/* =========================================================
   STORAGE
   ========================================================= */

function characterValue(key, fallback) {

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
   OWNED SHOP ITEMS
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

function ownsCharacterItem(id, category) {

    /*
       Free classic cosmetics.
    */

    if (
        category === "skin" &&
        id === "light"
    ) {
        return true;
    }

    if (
        category === "hair" &&
        id === "brown"
    ) {
        return true;
    }

    if (
        category === "shirt" &&
        id === "blue"
    ) {
        return true;
    }

    if (
        category === "hat" &&
        id === "none"
    ) {
        return true;
    }

    if (
        category === "pants" &&
        id === "blue"
    ) {
        return true;
    }


    /*
       Free banner defaults.
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


    /*
       Free title/effect.
    */

    if (
        category === "title" &&
        id === "none"
    ) {
        return true;
    }

    if (
        category === "effect" &&
        id === "none"
    ) {
        return true;
    }


    return getOwnedItems().includes(id);

}


/* =========================================================
   EQUIPPED CHARACTER
   ========================================================= */

function getEquippedCharacter() {

    const id =
        characterValue(
            "character_character",
            "leafy"
        );

    return (
        SHOP_CHARACTERS.find(
            item => item.id === id
        ) ||
        SHOP_CHARACTERS[0]
    );

}


/* =========================================================
   GOOBER PREVIEW
   ========================================================= */

function createGooberPreview(data) {

    const goober =
        document.createElement("div");

    goober.className =
        "goober design-" +
        data.design;

    const body =
        document.createElement("div");

    body.className =
        "goober-body";

    const face =
        document.createElement("div");

    face.className =
        "goober-face";

    const leftEye =
        document.createElement("div");

    leftEye.className =
        "goober-eye eye-left";

    const rightEye =
        document.createElement("div");

    rightEye.className =
        "goober-eye eye-right";

    const mouth =
        document.createElement("div");

    mouth.className =
        "goober-mouth";

    const feet =
        document.createElement("div");

    feet.className =
        "goober-feet";

    const leftFoot =
        document.createElement("div");

    leftFoot.className =
        "goober-foot foot-left";

    const rightFoot =
        document.createElement("div");

    rightFoot.className =
        "goober-foot foot-right";

    face.appendChild(leftEye);
    face.appendChild(rightEye);
    face.appendChild(mouth);

    feet.appendChild(leftFoot);
    feet.appendChild(rightFoot);

    goober.appendChild(feet);
    goober.appendChild(body);
    goober.appendChild(face);


    function addPart(className) {

        const part =
            document.createElement("div");

        part.className =
            "goober-part " +
            className;

        goober.appendChild(part);

        return part;

    }


    /*
       Keep the exact design classes used by shop.js.
    */

    const designs = {

        leafy: [
            "green",
            "leafy-leaf",
            "leafy-stem"
        ],

        squish: [
            "blue",
            "squishy",
            "squish-cheek-left",
            "squish-cheek-right"
        ],

        pebble: [
            "stone",
            "pebble-mark-one",
            "pebble-mark-two",
            "pebble-mark-three"
        ],

        button: [
            "pink",
            "button-top",
            "button-dot-left",
            "button-dot-right"
        ],

        horns: [
            "purple",
            "horn-left",
            "horn-right"
        ],

        tallboi: [
            "yellow",
            "tall",
            "tallboi-hat"
        ],

        fourEyes: [
            "coral",
            "four-eyes-brow"
        ],

        mothball: [
            "lavender",
            "moth-wing-left",
            "moth-wing-right",
            "moth-antenna-left",
            "moth-antenna-right"
        ],

        spike: [
            "red",
            "spike-one",
            "spike-two",
            "spike-three",
            "spike-four"
        ],

        orbit: [
            "cyan",
            "orbit-ring",
            "orbit-dot"
        ],

        bubble: [
            "aqua",
            "bubble-small-one",
            "bubble-small-two",
            "bubble-shine"
        ],

        captainGoob: [
            "violet",
            "captain-badge",
            "captain-hat"
        ],

        tailspin: [
            "hotpink",
            "tailspin-tail",
            "tailspin-tip"
        ],

        holyMoly: [
            "gold",
            "holy-halo",
            "holy-rays"
        ],

        wingnut: [
            "peach",
            "wingnut-left",
            "wingnut-right",
            "wingnut-nut"
        ],

        cosmo: [
            "deep-purple",
            "cosmo-stars",
            "cosmo-moon"
        ],

        theGoober: [
            "orange",
            "goober-big-smile",
            "goober-tuft",
            "goober-star"
        ],

        golden: [
            "golden",
            "golden-shine",
            "golden-crown"
        ],

        galaxy: [
            "galaxy-body",
            "galaxy-stars",
            "galaxy-ring",
            "galaxy-glow"
        ],

        studySprout: [
            "study-green",
            "study-book",
            "study-leaf-left",
            "study-leaf-right"
        ],

        studyOrbit: [
            "study-purple",
            "study-orbit-ring",
            "study-star"
        ]

    };


    const parts =
        designs[data.design] || [];


    parts.forEach(
        function(part) {

            if (
                part === "green" ||
                part === "blue" ||
                part === "squishy" ||
                part === "stone" ||
                part === "pink" ||
                part === "purple" ||
                part === "yellow" ||
                part === "tall" ||
                part === "coral" ||
                part === "lavender" ||
                part === "red" ||
                part === "cyan" ||
                part === "aqua" ||
                part === "violet" ||
                part === "hotpink" ||
                part === "gold" ||
                part === "peach" ||
                part === "deep-purple" ||
                part === "orange" ||
                part === "golden" ||
                part === "galaxy-body" ||
                part === "study-green" ||
                part === "study-purple"
            ) {

                body.classList.add(part);

            }

            else {

                addPart(part);

            }

        }
    );


    /*
       Four Eyes needs its additional eyes.
    */

    if (
        data.design === "fourEyes"
    ) {

        const extraOne =
            document.createElement("div");

        extraOne.className =
            "goober-eye extra-eye extra-one";

        const extraTwo =
            document.createElement("div");

        extraTwo.className =
            "goober-eye extra-eye extra-two";

        face.appendChild(extraOne);
        face.appendChild(extraTwo);

    }


    /*
       Shelby's shell needs to sit behind the face.
    */

    if (
        data.design === "shelby"
    ) {

        body.classList.add("mint");

        const shell =
            document.createElement("div");

        shell.className =
            "shelby-shell";

        goober.insertBefore(
            shell,
            face
        );

        addPart("shell-highlight");

    }


    /*
       Captain Goob cape belongs behind the body.
       No oval head piece.
    */

    if (
        data.design === "captainGoob"
    ) {

        const cape =
            document.createElement("div");

        cape.className =
            "captain-cape";

        goober.insertBefore(
            cape,
            body
        );

    }


    return goober;

}


/* =========================================================
   RENDER EQUIPPED CHARACTER
   ========================================================= */

function renderEquippedCharacter() {

    const container =
        document.getElementById(
            "equipped-goober"
        );

    const classic =
        document.getElementById(
            "classic-character"
        );

    if (!container)
        return;


    container.innerHTML =
        "";


    const equipped =
        getEquippedCharacter();


    container.appendChild(
        createGooberPreview(
            equipped
        )
    );


    /*
       The shop character replaces
       the old classic character.
    */

    if (classic) {

        classic.style.display =
            "none";

    }

}


/* =========================================================
   BANNER
   ========================================================= */

function renderCharacterBanner() {

    const preview =
        document.getElementById(
            "banner-preview"
        );

    if (!preview)
        return;


    const banner =
        characterValue(
            "character_banner",
            "purple-grid"
        );


    preview.className =
        "banner-preview";


    if (banner) {

        preview.classList.add(
            banner
        );

    }

}


/* =========================================================
   TITLE
   ========================================================= */

function renderCharacterTitle() {

    const element =
        document.getElementById(
            "player-tag"
        );

    if (!element)
        return;


    const title =
        characterValue(
            "character_title",
            "none"
        );


    if (
        title === "none"
    ) {

        element.textContent =
            "";

        element.style.display =
            "none";

        return;

    }


    const item =
        CHARACTER_TITLES.find(
            titleItem =>
                titleItem.id === title
        );


    element.textContent =
        item
            ? item.name
            : title;

    element.style.display =
        "block";

}


/* =========================================================
   EFFECT
   ========================================================= */

function renderCharacterEffect() {

    const character =
        document.getElementById(
            "character"
        );

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
        "cosmic-aura",
        "crown"
    ];


    effects.forEach(
        effect => {

            character.classList.remove(
                "effect-" + effect
            );

        }
    );


    const equipped =
        characterValue(
            "character_effect",
            "none"
        );


    if (
        equipped !== "none" &&
        effects.includes(equipped)
    ) {

        character.classList.add(
            "effect-" + equipped
        );

    }

}


/* =========================================================
   CLASSIC CHARACTER RENDERERS
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


function renderClassicCharacter() {

    const head =
        document.getElementById(
            "character-head"
        );

    const hair =
        document.getElementById(
            "character-hair"
        );

    const body =
        document.getElementById(
            "character-body"
        );

    const leftLeg =
        document.getElementById(
            "character-leg-left"
        );

    const rightLeg =
        document.getElementById(
            "character-leg-right"
        );


    if (!head)
        return;


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


    head.style.background =
        CHARACTER_SKINS[skin] ||
        CHARACTER_SKINS.light;


    hair.style.background =
        CHARACTER_HAIR[hairType] ||
        CHARACTER_HAIR.brown;


    body.style.background =
        CHARACTER_SHIRTS[shirt] ||
        CHARACTER_SHIRTS.blue;


    const pantsColours = {

        blue: "#2563eb",
        black: "#111827",
        brown: "#78350f"

    };


    if (pants === "split") {

        leftLeg.style.background =
            "#2563eb";

        rightLeg.style.background =
            "#ef4444";

    }

    else {

        const colour =
            pantsColours[pants] ||
            pantsColours.blue;

        leftLeg.style.background =
            colour;

        rightLeg.style.background =
            colour;

    }

}


/* =========================================================
   CREATE OPTION
   ========================================================= */

function createOption(
    container,
    id,
    category,
    name,
    free
) {

    if (!container)
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
        name;


    const key =
        "character_" +
        category;


    const fallback =
        category === "banner"
            ? "purple-grid"
            : category === "title"
            ? "none"
            : category === "effect"
            ? "none"
            : category === "character"
            ? "leafy"
            : CHARACTER_OPTIONS[category][0];


    const equipped =
        characterValue(
            key,
            fallback
        );


    if (
        equipped === id
    ) {

        button.classList.add(
            "selected"
        );

    }


    const owned =
        free ||
        ownsCharacterItem(
            id,
            category
        );


    if (!owned) {

        button.textContent =
            "🔒 " +
            name;

        button.disabled =
            true;

        button.title =
            "Buy this item in the Shop.";

    }

    else {

        button.addEventListener(
            "click",
            function() {

                setCharacterValue(
                    key,
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
   CHARACTER OPTIONS
   ========================================================= */

function renderCharacterOptions() {

    const container =
        document.getElementById(
            "character-options"
        );

    if (!container)
        return;


    container.innerHTML =
        "";


    SHOP_CHARACTERS.forEach(
        function(item) {

            createOption(
                container,
                item.id,
                "character",
                item.name +
                " • " +
                item.rarity,
                false
            );

        }
    );

}


/* =========================================================
   SIMPLE OPTIONS
   ========================================================= */

function renderBasicOptions(
    category,
    elementId,
    names
) {

    const container =
        document.getElementById(
            elementId
        );

    if (!container)
        return;


    container.innerHTML =
        "";


    CHARACTER_OPTIONS[category]
        .forEach(
            function(id) {

                createOption(
                    container,
                    id,
                    category,
                    names[id] || id,
                    false
                );

            }
        );

}


/* =========================================================
   BANNERS
   ========================================================= */

function renderBannerOptions() {

    const container =
        document.getElementById(
            "banners-options"
        );

    if (!container)
        return;


    container.innerHTML =
        "";


    CHARACTER_BANNERS.forEach(
        item => {

            createOption(
                container,
                item.id,
                "banner",
                item.name,
                !!item.free
            );

        }
    );

}


/* =========================================================
   TITLES
   ========================================================= */

function renderTitleOptions() {

    const container =
        document.getElementById(
            "titles-options"
        );

    if (!container)
        return;


    container.innerHTML =
        "";


    CHARACTER_TITLES.forEach(
        item => {

            createOption(
                container,
                item.id,
                "title",
                item.name,
                !!item.free
            );

        }
    );

}


/* =========================================================
   EFFECTS
   ========================================================= */

function renderEffectOptions() {

    const container =
        document.getElementById(
            "effects-options"
        );

    if (!container)
        return;


    container.innerHTML =
        "";


    CHARACTER_EFFECTS.forEach(
        item => {

            createOption(
                container,
                item.id,
                "effect",
                item.name,
                !!item.free
            );

        }
    );

}


/* =========================================================
   RENDER EVERYTHING
   ========================================================= */

function renderEditor() {

    renderEquippedCharacter();

    renderClassicCharacter();

    renderCharacterBanner();

    renderCharacterTitle();

    renderCharacterEffect();


    renderCharacterOptions();


    renderBasicOptions(
        "skin",
        "skin-options",
        {
            light: "Light",
            medium: "Medium",
            dark: "Dark"
        }
    );


    renderBasicOptions(
        "hair",
        "hair-options",
        {
            brown: "Brown Hair",
            black: "Black Hair",
            blonde: "Blonde Hair"
        }
    );


    renderBasicOptions(
        "shirt",
        "shirts-options",
        {
            blue: "Blue Shirt",
            red: "Red Shirt",
            green: "Green Shirt",
            "sprint-blue": "Sprint Shirt"
        }
    );


    renderBasicOptions(
        "hat",
        "hats-options",
        {
            none: "None",
            "sprint-cap": "Sprint Cap",
            "star-cap": "Star Cap",
            visor: "Sprint Visor"
        }
    );


    renderBasicOptions(
        "pants",
        "pants-options",
        {
            blue: "Blue Pants",
            black: "Black Pants",
            brown: "Brown Pants",
            split: "Split Pants"
        }
    );


    renderBannerOptions();

    renderTitleOptions();

    renderEffectOptions();

}


/* =========================================================
   PUBLIC API
   ========================================================= */

window.renderEditor =
    renderEditor;

window.getEquippedCharacter =
    getEquippedCharacter;

window.ownsCharacterItem =
    ownsCharacterItem;


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderEditor();

    }
);
