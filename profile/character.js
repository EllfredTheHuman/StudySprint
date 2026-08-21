/* =========================================================
   STUDYSPRINT CHARACTER EDITOR
   Character selection + cosmetic equipment
========================================================= */


/* =========================================================
   SHOP CHARACTERS
========================================================= */

const SHOP_CHARACTERS = [

    {
        id: "leafy",
        name: "Leafy",
        rarity: "Common",
        design: "leafy",
        starter: true
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

    if (
        category === "character" &&
        id === "leafy"
    ) {

        return true;

    }


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

    const savedId =
        characterValue(
            "character_character",
            "leafy"
        );


    const character =
        SHOP_CHARACTERS.find(
            item =>
                item.id === savedId
        );


    if (!character) {

        setCharacterValue(
            "character_character",
            "leafy"
        );

        return SHOP_CHARACTERS[0];

    }


    if (
        !ownsCharacterItem(
            character.id,
            "character"
        )
    ) {

        setCharacterValue(
            "character_character",
            "leafy"
        );

        return SHOP_CHARACTERS[0];

    }


    return character;

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

        shelby: [
            "mint"
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


    const bodyColours = [

        "green",
        "blue",
        "squishy",
        "stone",
        "pink",
        "purple",
        "yellow",
        "tall",
        "coral",
        "lavender",
        "red",
        "cyan",
        "aqua",
        "violet",
        "hotpink",
        "gold",
        "peach",
        "deep-purple",
        "orange",
        "golden",
        "galaxy-body",
        "study-green",
        "study-purple",
        "mint"

    ];


    const parts =
        designs[data.design] || [];


    parts.forEach(
        function(part) {

            if (
                bodyColours.includes(part)
            ) {

                body.classList.add(part);

            }

            else {

                addPart(part);

            }

        }
    );


    /* =====================================================
       FOUR EYES
    ===================================================== */

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


    /* =====================================================
       SHELBY
    ===================================================== */

    if (
        data.design === "shelby"
    ) {

        const shell =
            document.createElement("div");

        shell.className =
            "shelby-shell";


        goober.insertBefore(
            shell,
            face
        );


        addPart(
            "shell-highlight"
        );

    }


    /* =====================================================
       CAPTAIN GOOB
    ===================================================== */

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
   RENDER CHARACTER
========================================================= */

function renderEquippedCharacter() {

    const container =
        document.getElementById(
            "equipped-goober"
        );


    if (!container)
        return;


    container.innerHTML = "";


    const equipped =
        getEquippedCharacter();


    const goober =
        createGooberPreview(
            equipped
        );


    container.appendChild(
        goober
    );

}


/* =========================================================
   CUSTOM DROPDOWN BUILDER
========================================================= */

function createCustomDropdown(
    container,
    items,
    category,
    fallback
) {

    if (!container)
        return;


    container.innerHTML = "";


    const key =
        "character_" +
        category;


    const equipped =
        characterValue(
            key,
            fallback
        );


    const current =
        items.find(
            item =>
                item.id === equipped
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


    wrapper.appendChild(
        selected
    );


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


            if (
                item.id === current.id
            ) {

                option.classList.add(
                    "selected"
                );

            }


            const owned =
                item.free ||
                ownsCharacterItem(
                    item.id,
                    category
                );


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
                            key,
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
   CHARACTER DROPDOWN
========================================================= */

function renderCharacterSelector() {

    const container =
        document.getElementById(
            "character-selector"
        );


    if (!container)
        return;


    const ownedCharacters =
        SHOP_CHARACTERS.filter(
            character =>
                ownsCharacterItem(
                    character.id,
                    "character"
                )
        );


    createCustomDropdown(
        container,
        ownedCharacters,
        "character",
        "leafy"
    );

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


    preview.classList.add(
        banner
    );

}


/* =========================================================
   BANNER DROPDOWN
========================================================= */

function renderBannerOptions() {

    const container =
        document.getElementById(
            "banners-options"
        );


    if (!container)
        return;


    createCustomDropdown(
        container,
        CHARACTER_BANNERS,
        "banner",
        "purple-grid"
    );

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

        element.textContent = "";

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
   TITLE DROPDOWN
========================================================= */

function renderTitleOptions() {

    const container =
        document.getElementById(
            "titles-options"
        );


    if (!container)
        return;


    createCustomDropdown(
        container,
        CHARACTER_TITLES,
        "title",
        "none"
    );

}


/* =========================================================
   EFFECT HELPERS
========================================================= */

function createEffectElement(
    character,
    className
) {

    const element =
        document.createElement("div");


    element.className =
        "character-effect-element " +
        className;


    character.appendChild(
        element
    );


    return element;

}


/* =========================================================
   CLEAR EFFECTS
========================================================= */

function clearCharacterEffects(character) {

    if (!character)
        return;


    const effectClasses = [

        "effect-sparkle",
        "effect-speed-trail",
        "effect-lightning",
        "effect-rainbow",
        "effect-fire",
        "effect-glitch",
        "effect-shadow",
        "effect-crystal",
        "effect-cosmic-aura",
        "effect-crown"

    ];


    effectClasses.forEach(
        className => {

            character.classList.remove(
                className
            );

        }
    );


    character
        .querySelectorAll(
            ".character-effect-element"
        )
        .forEach(
            element =>
                element.remove()
        );

}


/* =========================================================
   SPARKLE EFFECT
========================================================= */

function createSparkleEffect(character) {

    character.classList.add(
        "effect-sparkle"
    );


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const sparkle =
            createEffectElement(
                character,
                "effect-sparkle-dot"
            );


        sparkle.classList.add(
            "sparkle-" +
            (i + 1)
        );


        sparkle.style.setProperty(
            "--sparkle-index",
            i
        );

    }

}


/* =========================================================
   SPEED TRAIL
========================================================= */

function createSpeedTrailEffect(character) {

    character.classList.add(
        "effect-speed-trail"
    );


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const streak =
            createEffectElement(
                character,
                "effect-speed-streak"
            );


        streak.style.setProperty(
            "--trail-index",
            i
        );

    }

}


/* =========================================================
   LIGHTNING
========================================================= */

function createLightningEffect(character) {

    character.classList.add(
        "effect-lightning"
    );


    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const bolt =
            createEffectElement(
                character,
                "effect-lightning-bolt"
            );


        bolt.style.setProperty(
            "--lightning-index",
            i
        );

    }

}


/* =========================================================
   RAINBOW
========================================================= */

function createRainbowEffect(character) {

    character.classList.add(
        "effect-rainbow"
    );


    createEffectElement(
        character,
        "effect-rainbow-ring"
    );


    createEffectElement(
        character,
        "effect-rainbow-ring-inner"
    );

}


/* =========================================================
   FIRE
========================================================= */

function createFireEffect(character) {

    character.classList.add(
        "effect-fire"
    );


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const flame =
            createEffectElement(
                character,
                "effect-flame"
            );


        flame.style.setProperty(
            "--flame-index",
            i
        );

    }

}


/* =========================================================
   GLITCH
========================================================= */

function createGlitchEffect(character) {

    character.classList.add(
        "effect-glitch"
    );


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const glitch =
            createEffectElement(
                character,
                "effect-glitch-piece"
            );


        glitch.style.setProperty(
            "--glitch-index",
            i
        );

    }

}


/* =========================================================
   SHADOW
========================================================= */

function createShadowEffect(character) {

    character.classList.add(
        "effect-shadow"
    );


    createEffectElement(
        character,
        "effect-shadow-ground"
    );

}


/* =========================================================
   CRYSTAL
========================================================= */

function createCrystalEffect(character) {

    character.classList.add(
        "effect-crystal"
    );


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const crystal =
            createEffectElement(
                character,
                "effect-crystal-shard"
            );


        crystal.style.setProperty(
            "--crystal-index",
            i
        );

    }

}


/* =========================================================
   COSMIC
========================================================= */

function createCosmicEffect(character) {

    character.classList.add(
        "effect-cosmic-aura"
    );


    createEffectElement(
        character,
        "effect-cosmic-ring"
    );


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const star =
            createEffectElement(
                character,
                "effect-cosmic-star"
            );


        star.style.setProperty(
            "--star-index",
            i
        );

    }

}


/* =========================================================
   CROWN
========================================================= */

function createCrownEffect(character) {

    character.classList.add(
        "effect-crown"
    );


    const goober =
        character.querySelector(
            "#equipped-goober > .goober"
        );


    /*
       IMPORTANT:

       The crown is attached DIRECTLY to
       the Goober.

       It therefore cannot change the
       Goober's horizontal position.
    */

    if (!goober)
        return;


    const crown =
        document.createElement("div");


    crown.className =
        "character-effect-element " +
        "character-crown";


    crown.innerHTML = `
        <span class="crown-point"></span>
        <span class="crown-point"></span>
        <span class="crown-point"></span>
    `;


    goober.appendChild(
        crown
    );


    /*
       Separate glow so the crown itself
       stays sharp.
    */

    const glow =
        createEffectElement(
            character,
            "crown-glow"
        );


    glow.style.pointerEvents =
        "none";

}


/* =========================================================
   MAIN EFFECT RENDERER
========================================================= */

function renderCharacterEffect() {

    const character =
        document.getElementById(
            "character"
        );


    if (!character)
        return;


    clearCharacterEffects(
        character
    );


    const equipped =
        characterValue(
            "character_effect",
            "none"
        );


    if (
        equipped === "none"
    ) {

        return;

    }


    switch (equipped) {

        case "sparkle":

            createSparkleEffect(
                character
            );

            break;


        case "speed-trail":

            createSpeedTrailEffect(
                character
            );

            break;


        case "lightning":

            createLightningEffect(
                character
            );

            break;


        case "rainbow":

            createRainbowEffect(
                character
            );

            break;


        case "fire":

            createFireEffect(
                character
            );

            break;


        case "glitch":

            createGlitchEffect(
                character
            );

            break;


        case "shadow":

            createShadowEffect(
                character
            );

            break;


        case "crystal":

            createCrystalEffect(
                character
            );

            break;


        case "cosmic-aura":

            createCosmicEffect(
                character
            );

            break;


        case "crown":

            createCrownEffect(
                character
            );

            break;

    }

}


/* =========================================================
   EFFECT DROPDOWN
========================================================= */

function renderEffectOptions() {

    const container =
        document.getElementById(
            "effects-options"
        );


    if (!container)
        return;


    createCustomDropdown(
        container,
        CHARACTER_EFFECTS,
        "effect",
        "none"
    );

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
   RENDER EVERYTHING
========================================================= */

function renderEditor() {

    renderPlayerName();

    renderEquippedCharacter();

    renderCharacterSelector();

    renderCharacterBanner();

    renderCharacterTitle();

    renderCharacterEffect();

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
