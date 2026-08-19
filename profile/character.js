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


    const parts =
        designs[data.design] || [];


    parts.forEach(
        function(part) {

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


    container.innerHTML =
        "";


    const equipped =
        getEquippedCharacter();


    container.appendChild(
        createGooberPreview(
            equipped
        )
    );

}


/* =========================================================
   CUSTOM DROPDOWN
========================================================= */

function createCustomDropdown(
    container,
    items,
    category,
    currentValue,
    onSelect
) {

    if (!container)
        return;


    container.innerHTML =
        "";

    container.className =
        "custom-dropdown";


    const currentItem =
        items.find(
            item =>
                item.id === currentValue
        );


    const fallbackItem =
        items[0];


    const selectedItem =
        currentItem ||
        fallbackItem;


    /* =====================================================
       BUTTON
    ===================================================== */

    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";

    button.className =
        "custom-dropdown-button";


    const buttonText =
        document.createElement(
            "span"
        );


    buttonText.className =
        "custom-dropdown-text";


    buttonText.textContent =
        selectedItem
            ? selectedItem.name
            : "Choose...";


    const arrow =
        document.createElement(
            "span"
        );


    arrow.className =
        "custom-dropdown-arrow";

    arrow.textContent =
        "▼";


    button.appendChild(
        buttonText
    );

    button.appendChild(
        arrow
    );


    /* =====================================================
       MENU
    ===================================================== */

    const menu =
        document.createElement(
            "div"
        );


    menu.className =
        "custom-dropdown-menu";


    items.forEach(
        function(item) {

            const owned =
                !!item.free ||
                ownsCharacterItem(
                    item.id,
                    category
                );


            const option =
                document.createElement(
                    "button"
                );


            option.type =
                "button";


            option.className =
                "custom-dropdown-option";


            if (
                item.id === currentValue
            ) {

                option.classList.add(
                    "selected"
                );

            }


            if (!owned) {

                option.classList.add(
                    "locked"
                );

            }


            const optionText =
                document.createElement(
                    "span"
                );


            optionText.textContent =
                owned
                    ? item.name
                    : "🔒 " + item.name;


            option.appendChild(
                optionText
            );


            if (
                item.id === currentValue &&
                owned
            ) {

                const check =
                    document.createElement(
                        "span"
                    );

                check.className =
                    "dropdown-check";

                check.textContent =
                    "✓";

                option.appendChild(
                    check
                );

            }


            if (owned) {

                option.addEventListener(
                    "click",
                    function(event) {

                        event.stopPropagation();


                        onSelect(
                            item.id
                        );


                        closeAllDropdowns();

                    }
                );

            }


            menu.appendChild(
                option
            );

        }
    );


    container.appendChild(
        button
    );

    container.appendChild(
        menu
    );


    button.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            const wasOpen =
                container.classList.contains(
                    "open"
                );


            closeAllDropdowns();


            if (!wasOpen) {

                container.classList.add(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   CLOSE DROPDOWNS
========================================================= */

function closeAllDropdowns() {

    document
        .querySelectorAll(
            ".custom-dropdown.open"
        )
        .forEach(
            dropdown => {

                dropdown.classList.remove(
                    "open"
                );

            }
        );

}


document.addEventListener(
    "click",
    function() {

        closeAllDropdowns();

    }
);


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


    const equipped =
        getEquippedCharacter();


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
        equipped.id,
        function(selected) {

            if (
                !ownsCharacterItem(
                    selected,
                    "character"
                )
            ) {

                return;

            }


            setCharacterValue(
                "character_character",
                selected
            );


            renderEditor();

        }
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


    const equipped =
        characterValue(
            "character_banner",
            "purple-grid"
        );


    createCustomDropdown(
        container,
        CHARACTER_BANNERS,
        "banner",
        equipped,
        function(selected) {

            setCharacterValue(
                "character_banner",
                selected
            );


            renderEditor();

        }
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
   TITLE DROPDOWN
========================================================= */

function renderTitleOptions() {

    const container =
        document.getElementById(
            "titles-options"
        );


    if (!container)
        return;


    const equipped =
        characterValue(
            "character_title",
            "none"
        );


    createCustomDropdown(
        container,
        CHARACTER_TITLES,
        "title",
        equipped,
        function(selected) {

            setCharacterValue(
                "character_title",
                selected
            );


            renderEditor();

        }
    );

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
   EFFECT DROPDOWN
========================================================= */

function renderEffectOptions() {

    const container =
        document.getElementById(
            "effects-options"
        );


    if (!container)
        return;


    const equipped =
        characterValue(
            "character_effect",
            "none"
        );


    createCustomDropdown(
        container,
        CHARACTER_EFFECTS,
        "effect",
        equipped,
        function(selected) {

            setCharacterValue(
                "character_effect",
                selected
            );


            renderEditor();

        }
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
