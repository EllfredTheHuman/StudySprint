/* =========================================================
   STUDYSPRINT SHOP
   Full shop system
   ========================================================= */

"use strict";


/* =========================================================
   SHOP SETTINGS
   ========================================================= */

const SHOP_ITEM_COUNT = 6;
const SHOP_LENGTH = 14 * 24 * 60 * 60 * 1000;

/*
   Shop refresh:
   Every second Sunday at 12:00 AM AEST.

   AEST is UTC+10.

   Anchor:
   Sunday 10 August 2025, 12:00 AM AEST
   = Saturday 9 August 2025, 2:00 PM UTC.
*/

const SHOP_ANCHOR = Date.UTC(
    2025,
    7,
    9,
    14,
    0,
    0
);


/* =========================================================
   SHOP CHARACTERS
   ========================================================= */

const SHOP_CHARACTERS = [

    {
        id: "leafy",
        name: "Leafy",
        rarity: "Common",
        price: 250,
        type: "Character",
        design: "leafy",
        colour: "#65a30d"
    },

    {
        id: "squish",
        name: "Squish",
        rarity: "Common",
        price: 275,
        type: "Character",
        design: "squish",
        colour: "#60a5fa"
    },

    {
        id: "pebble",
        name: "Pebble",
        rarity: "Common",
        price: 300,
        type: "Character",
        design: "pebble",
        colour: "#78716c"
    },

    {
        id: "button",
        name: "Button",
        rarity: "Common",
        price: 325,
        type: "Character",
        design: "button",
        colour: "#f472b6"
    },

    {
        id: "horns",
        name: "Horns",
        rarity: "Rare",
        price: 400,
        type: "Character",
        design: "horns",
        colour: "#a78bfa"
    },

    {
        id: "shellby",
        name: "Shellby",
        rarity: "Rare",
        price: 425,
        type: "Character",
        design: "shellby",
        colour: "#34d399"
    },

    {
        id: "tallboi",
        name: "Tallboi",
        rarity: "Rare",
        price: 450,
        type: "Character",
        design: "tallboi",
        colour: "#fbbf24"
    },

    {
        id: "four-eyes",
        name: "Four Eyes",
        rarity: "Rare",
        price: 475,
        type: "Character",
        design: "four-eyes",
        colour: "#fb7185"
    },

    {
        id: "mushroom",
        name: "Mushroom",
        rarity: "Epic",
        price: 550,
        type: "Character",
        design: "mushroom",
        colour: "#ef4444"
    },

    {
        id: "spike",
        name: "Spike",
        rarity: "Epic",
        price: 575,
        type: "Character",
        design: "spike",
        colour: "#f43f5e"
    },

    {
        id: "orbit",
        name: "Orbit",
        rarity: "Epic",
        price: 600,
        type: "Character",
        design: "orbit",
        colour: "#38bdf8"
    },

    {
        id: "bubble",
        name: "Bubble",
        rarity: "Epic",
        price: 625,
        type: "Character",
        design: "bubble",
        colour: "#22d3ee"
    },

    {
        id: "captain-goob",
        name: "Captain Goob",
        rarity: "Mythic",
        price: 700,
        type: "Character",
        design: "captain-goob",
        colour: "#8b5cf6"
    },

    {
        id: "tailspin",
        name: "Tailspin",
        rarity: "Mythic",
        price: 725,
        type: "Character",
        design: "tailspin",
        colour: "#ec4899"
    },

    {
        id: "holy-moly",
        name: "Holy Moly",
        rarity: "Mythic",
        price: 750,
        type: "Character",
        design: "holy-moly",
        colour: "#fde68a"
    },

    {
        id: "wingnut",
        name: "Wingnut",
        rarity: "Mythic",
        price: 775,
        type: "Character",
        design: "wingnut",
        colour: "#f0abfc"
    },

    {
        id: "cosmo",
        name: "Cosmo",
        rarity: "Legendary",
        price: 900,
        type: "Character",
        design: "cosmo",
        colour: "#312e81"
    },

    {
        id: "the-goober",
        name: "The Goober",
        rarity: "Legendary",
        price: 1000,
        type: "Character",
        design: "the-goober",
        colour: "#f97316"
    },

    {
        id: "golden",
        name: "Golden Goober",
        rarity: "Legendary",
        price: 1100,
        type: "Character",
        design: "golden",
        colour: "#fbbf24"
    },

    {
        id: "clockwork",
        name: "Clockwork",
        rarity: "Legendary",
        price: 1200,
        type: "Character",
        design: "clockwork",
        colour: "#94a3b8"
    }

];


/* =========================================================
   STUDYPASS
   ========================================================= */

const STUDYPASS_CHARACTERS = [

    {
        id: "study-sprout",
        name: "Study Sprout",
        rarity: "Epic",
        type: "Character",
        design: "study-sprout",
        colour: "#22c55e"
    },

    {
        id: "study-orbit",
        name: "Study Orbit",
        rarity: "Legendary",
        type: "Character",
        design: "study-orbit",
        colour: "#8b5cf6"
    }

];


/* =========================================================
   BANNERS
   ========================================================= */

const SHOP_BANNERS = [

    {
        id: "sprint-grid",
        name: "Sprint Grid",
        rarity: "Common",
        type: "Banner",
        price: 100
    },

    {
        id: "purple-grid",
        name: "Purple Grid",
        rarity: "Common",
        type: "Banner",
        price: 125
    },

    {
        id: "neon-blue",
        name: "Neon Blue",
        rarity: "Rare",
        type: "Banner",
        price: 150
    },

    {
        id: "sunset",
        name: "Sunset Sprint",
        rarity: "Rare",
        type: "Banner",
        price: 175
    },

    {
        id: "cosmic-banner",
        name: "Cosmic Desk",
        rarity: "Epic",
        type: "Banner",
        price: 250
    },

    {
        id: "golden-grid",
        name: "Golden Grid",
        rarity: "Legendary",
        type: "Banner",
        price: 500
    }

];


/* =========================================================
   TITLES
   ========================================================= */

const SHOP_TITLES = [

    {
        id: "speedrunner",
        name: "Speedrunner",
        rarity: "Common",
        type: "Player Title",
        price: 150
    },

    {
        id: "bookworm",
        name: "Bookworm",
        rarity: "Common",
        type: "Player Title",
        price: 175
    },

    {
        id: "brainiac",
        name: "Brainiac",
        rarity: "Rare",
        type: "Player Title",
        price: 250
    },

    {
        id: "grinder",
        name: "The Grinder",
        rarity: "Rare",
        type: "Player Title",
        price: 300
    },

    {
        id: "overachiever",
        name: "Overachiever",
        rarity: "Epic",
        type: "Player Title",
        price: 450
    },

    {
        id: "unstoppable",
        name: "Unstoppable",
        rarity: "Mythic",
        type: "Player Title",
        price: 650
    },

    {
        id: "legend",
        name: "Legend",
        rarity: "Legendary",
        type: "Player Title",
        price: 900
    }

];


/* =========================================================
   TICKET SHOP
   ========================================================= */

const TICKET_ITEMS = [

    {
        id: "sparkle",
        name: "Sparkle Effect",
        description: "Tiny sparkles follow your character.",
        type: "Effect",
        price: 10
    },

    {
        id: "speed-trail",
        name: "Speed Trail",
        description: "Leaves a trail behind your character.",
        type: "Effect",
        price: 20
    },

    {
        id: "lightning",
        name: "Lightning Effect",
        description: "Electric sparks surround your character.",
        type: "Effect",
        price: 35
    },

    {
        id: "rainbow",
        name: "Rainbow Aura",
        description: "A colourful aura surrounds your character.",
        type: "Effect",
        price: 50
    },

    {
        id: "fire",
        name: "Fire Aura",
        description: "A fiery glow surrounds your character.",
        type: "Effect",
        price: 75
    },

    {
        id: "glitch",
        name: "Glitch Effect",
        description: "A strange digital effect surrounds your character.",
        type: "Effect",
        price: 100
    },

    {
        id: "shadow",
        name: "Shadow Aura",
        description: "A dark shadow surrounds your character.",
        type: "Effect",
        price: 150
    },

    {
        id: "crystal",
        name: "Crystal Glow",
        description: "A bright crystalline glow surrounds your character.",
        type: "Effect",
        price: 250
    },

    {
        id: "cosmic-aura",
        name: "Cosmic Aura",
        description: "Stars and cosmic particles surround your character.",
        type: "Effect",
        price: 500
    },

    {
        id: "crown",
        name: "Crown + Glow",
        description: "The extremely rare glowing crown.",
        type: "Hat",
        price: 1000
    }

];


/* =========================================================
   CURRENCY
   ========================================================= */

function getCoins() {
    return Number(localStorage.getItem("coins")) || 0;
}


function getTickets() {
    return Number(localStorage.getItem("shopTickets")) || 0;
}


function setCoins(amount) {
    localStorage.setItem("coins", String(amount));
}


function setTickets(amount) {
    localStorage.setItem("shopTickets", String(amount));
}


/* =========================================================
   OWNED ITEMS
   ========================================================= */

function getOwnedItems() {

    try {
        const data = JSON.parse(
            localStorage.getItem("shopOwnedItems")
        );

        return Array.isArray(data) ? data : [];
    }

    catch (error) {
        return [];
    }
}


function saveOwnedItems(items) {

    localStorage.setItem(
        "shopOwnedItems",
        JSON.stringify(items)
    );
}


function ownsItem(id) {
    return getOwnedItems().indexOf(id) !== -1;
}


/* =========================================================
   UNLOCK ITEM
   ========================================================= */

function unlockItem(id, type) {

    let key = "";

    if (type === "Character") {
        key = "unlocked_characters";
    }

    else if (type === "Banner") {
        key = "unlocked_banners";
    }

    else if (type === "Effect") {
        key = "unlocked_effects";
    }

    else if (type === "Player Title") {
        key = "unlockedTitles";
    }

    else if (type === "Hat") {
        key = "unlocked_hats";
    }

    if (!key) {
        return;
    }

    let unlocked = [];

    try {
        const data = JSON.parse(
            localStorage.getItem(key)
        );

        if (Array.isArray(data)) {
            unlocked = data;
        }
    }

    catch (error) {
        unlocked = [];
    }

    if (unlocked.indexOf(id) === -1) {
        unlocked.push(id);
    }

    localStorage.setItem(
        key,
        JSON.stringify(unlocked)
    );
}


/* =========================================================
   GOOBER CREATION
   ========================================================= */

function createGoober(data) {

    const goober = document.createElement("div");

    goober.className =
        "goober goober-" +
        data.design;


    const shadow = document.createElement("div");
    shadow.className = "goober-shadow";

    goober.appendChild(shadow);


    const body = document.createElement("div");

    body.className = "goober-body";

    body.style.background =
        data.colour || "#6366f1";

    goober.appendChild(body);


    /* -----------------------------------------------------
       BASIC FACE
       ----------------------------------------------------- */

    const face = document.createElement("div");

    face.className = "goober-face";

    goober.appendChild(face);


    const leftEye = document.createElement("span");

    leftEye.className =
        "goober-eye goober-eye-left";

    face.appendChild(leftEye);


    const rightEye = document.createElement("span");

    rightEye.className =
        "goober-eye goober-eye-right";

    face.appendChild(rightEye);


    const mouth = document.createElement("span");

    mouth.className = "goober-mouth";

    face.appendChild(mouth);


    /* -----------------------------------------------------
       DESIGN-SPECIFIC PARTS
       ----------------------------------------------------- */

    if (data.design === "leafy") {

        addPart(goober, "leafy-leaf");

        addPart(goober, "leafy-stem");
    }


    if (data.design === "squish") {

        addPart(goober, "squish-highlight");

        addPart(goober, "squish-bottom");
    }


    if (data.design === "pebble") {

        addPart(goober, "pebble-crack");

        addPart(goober, "pebble-speck");
    }


    if (data.design === "button") {

        addPart(goober, "button-seam");

        addPart(goober, "button-thread");
    }


    if (data.design === "horns") {

        addPart(goober, "horn-left");
        addPart(goober, "horn-right");

        addPart(goober, "horn-glow");
    }


    if (data.design === "shellby") {

        addPart(goober, "shell");

        addPart(goober, "shell-line");

        addPart(goober, "shell-dot");
    }


    if (data.design === "tallboi") {

        addPart(goober, "tall-hat");

        addPart(goober, "tall-band");

        addPart(goober, "tall-button");
    }


    if (data.design === "four-eyes") {

        /*
           Not simply two extra eyes.

           Four Eyes gets four small eyes in a
           diamond arrangement plus little eyebrows.
        */

        face.classList.add("four-eye-face");

        leftEye.classList.add("hidden-face-eye");
        rightEye.classList.add("hidden-face-eye");

        addPart(goober, "four-eye-one");
        addPart(goober, "four-eye-two");
        addPart(goober, "four-eye-three");
        addPart(goober, "four-eye-four");

        addPart(goober, "four-brow-left");
        addPart(goober, "four-brow-right");
    }


    if (data.design === "mushroom") {

        /*
           Mushroom cap is behind the face.
           Eyes stay inside the face layer.
        */

        addPart(goober, "mushroom-cap");

        addPart(goober, "mushroom-spots");

        addPart(goober, "mushroom-stem");

        face.classList.add("mushroom-face");
    }


    if (data.design === "spike") {

        addPart(goober, "spike-top");

        addPart(goober, "spike-left");

        addPart(goober, "spike-right");

        addPart(goober, "spike-lower");
    }


    if (data.design === "orbit") {

        addPart(goober, "orbit-ring");

        addPart(goober, "orbit-dot");
    }


    if (data.design === "bubble") {

        addPart(goober, "bubble-highlight");

        addPart(goober, "bubble-small");
    }


    if (data.design === "captain-goob") {

        /*
           Cape is deliberately BEHIND the body.

           No oval on the head.
        */

        goober.classList.add("captain-goob");

        addPart(goober, "captain-cape");

        addPart(goober, "captain-cape-clasp");

        addPart(goober, "captain-stripe");
    }


    if (data.design === "tailspin") {

        addPart(goober, "tailspin-tail");

        addPart(goober, "tailspin-tip");

        addPart(goober, "tailspin-motion");
    }


    if (data.design === "holy-moly") {

        addPart(goober, "holy-halo");

        addPart(goober, "holy-rays");

        addPart(goober, "holy-star");
    }


    if (data.design === "wingnut") {

        addPart(goober, "wing-left");

        addPart(goober, "wing-right");

        addPart(goober, "wing-pattern");
    }


    if (data.design === "cosmo") {

        addPart(goober, "cosmo-stars");

        addPart(goober, "cosmo-ring");

        addPart(goober, "cosmo-moon");

        addPart(goober, "cosmo-spark");
    }


    if (data.design === "the-goober") {

        addPart(goober, "goober-antenna");

        addPart(goober, "goober-tie");

        addPart(goober, "goober-badge");

        addPart(goober, "goober-shine");
    }


    if (data.design === "golden") {

        addPart(goober, "golden-crown");

        addPart(goober, "golden-jewel");

        addPart(goober, "golden-shine");

        addPart(goober, "golden-stars");
    }


    if (data.design === "clockwork") {

        addPart(goober, "clock-ring");

        addPart(goober, "clock-hand-one");

        addPart(goober, "clock-hand-two");

        addPart(goober, "clock-bolt-left");

        addPart(goober, "clock-bolt-right");
    }


    /* -----------------------------------------------------
       STUDYPASS DESIGNS
       ----------------------------------------------------- */

    if (data.design === "study-sprout") {

        addPart(goober, "study-sprout-leaf");

        addPart(goober, "study-sprout-pencil");

        addPart(goober, "study-sprout-mark");
    }


    if (data.design === "study-orbit") {

        addPart(goober, "study-orbit-ring");

        addPart(goober, "study-orbit-star");

        addPart(goober, "study-orbit-book");
    }


    return goober;
}


/* =========================================================
   ADD PART HELPER
   ========================================================= */

function addPart(parent, className) {

    const part =
        document.createElement("span");

    part.className =
        "goober-part " +
        className;

    parent.appendChild(part);

    return part;
}


/* =========================================================
   PREVIEW
   ========================================================= */

function createPreview(item) {

    const preview =
        document.createElement("div");

    preview.className =
        "item-preview";


    if (item.type === "Character") {

        preview.appendChild(
            createGoober(item)
        );

        return preview;
    }


    if (item.type === "Banner") {

        const banner =
            document.createElement("div");

        banner.className =
            "banner-preview banner-" +
            item.id;

        preview.appendChild(banner);

        return preview;
    }


    if (item.type === "Player Title") {

        const title =
            document.createElement("div");

        title.className =
            "title-preview";

        title.textContent =
            item.name;

        preview.appendChild(title);

        return preview;
    }


    return preview;
}


/* =========================================================
   RARITY CLASS
   ========================================================= */

function rarityClass(rarity) {

    return (
        "rarity-" +
        String(rarity)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
    );
}


/* =========================================================
   SEEDED RANDOM
   ========================================================= */

function seededShuffle(array, seed) {

    const result = array.slice();

    let value =
        Math.abs(
            Math.floor(seed)
        ) + 1;


    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        value =
            (
                value * 9301 +
                49297
            ) %
            233280;


        const j =
            Math.floor(
                (
                    value /
                    233280
                ) *
                (i + 1)
            );


        const temporary =
            result[i];

        result[i] =
            result[j];

        result[j] =
            temporary;
    }


    return result;
}


/* =========================================================
   SHOP START
   ========================================================= */

function getShopStart() {

    const now =
        Date.now();


    const cycles =
        Math.floor(
            (
                now -
                SHOP_ANCHOR
            ) /
            SHOP_LENGTH
        );


    return (
        SHOP_ANCHOR +
        cycles *
        SHOP_LENGTH
    );
}


/* =========================================================
   SHOP ROTATION
   ========================================================= */

function getCurrentShop() {

    const start =
        getShopStart();


    const seed =
        Math.floor(
            start / 1000
        );


    /*
       Characters + banners + titles are all
       part of the same rotation pool.
    */

    const pool =
        SHOP_CHARACTERS
            .concat(SHOP_BANNERS)
            .concat(SHOP_TITLES);


    const shuffled =
        seededShuffle(
            pool,
            seed
        );


    return shuffled.slice(
        0,
        SHOP_ITEM_COUNT
    );
}


/* =========================================================
   SHOP CARD
   ========================================================= */

function createShopCard(item) {

    const card =
        document.createElement("article");

    card.className =
        "shop-card " +
        rarityClass(item.rarity);


    const rarity =
        document.createElement("div");

    rarity.className =
        "rarity " +
        rarityClass(item.rarity);

    rarity.textContent =
        item.rarity;


    const preview =
        createPreview(item);


    const name =
        document.createElement("h3");

    name.textContent =
        item.name;


    const type =
        document.createElement("p");

    type.className =
        "item-type";

    type.textContent =
        item.type;


    const price =
        document.createElement("div");

    price.className =
        "shop-price";

    price.textContent =
        String(item.price) +
        " Coins";


    const button =
        document.createElement("button");

    button.className =
        "buy-button";

    button.type =
        "button";


    if (ownsItem(item.id)) {

        button.textContent =
            "OWNED";

        button.disabled =
            true;

        button.classList.add(
            "owned"
        );
    }

    else {

        button.textContent =
            "BUY";

        button.addEventListener(
            "click",
            function () {

                buyMainItem(
                    item,
                    button
                );

            }
        );
    }


    card.appendChild(rarity);

    card.appendChild(preview);

    card.appendChild(name);

    card.appendChild(type);

    card.appendChild(price);

    card.appendChild(button);


    return card;
}


/* =========================================================
   MAIN SHOP
   ========================================================= */

function displayMainShop() {

    const container =
        document.getElementById(
            "fortnightly-items"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    const items =
        getCurrentShop();


    items.forEach(
        function (item) {

            container.appendChild(
                createShopCard(item)
            );

        }
    );


    updateCurrency();
}


/* =========================================================
   BUY MAIN ITEM
   ========================================================= */

function buyMainItem(item, button) {

    if (ownsItem(item.id)) {
        return;
    }


    const coins =
        getCoins();


    if (coins < item.price) {

        alert(
            "You don't have enough coins!"
        );

        return;
    }


    setCoins(
        coins - item.price
    );


    unlockItem(
        item.id,
        item.type
    );


    const owned =
        getOwnedItems();


    if (
        owned.indexOf(
            item.id
        ) === -1
    ) {

        owned.push(
            item.id
        );
    }


    saveOwnedItems(
        owned
    );


    button.disabled =
        true;

    button.textContent =
        "OWNED";

    button.classList.add(
        "owned"
    );


    updateCurrency();
}


/* =========================================================
   TICKET SHOP
   ========================================================= */

function displayTicketShop() {

    const container =
        document.getElementById(
            "ticket-items"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    TICKET_ITEMS.forEach(
        function (item) {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "ticket-card";


            const preview =
                document.createElement(
                    "div"
                );

            preview.className =
                "ticket-item-preview";


            const effect =
                document.createElement(
                    "div"
                );

            effect.className =
                "preview-effect " +
                item.id;


            preview.appendChild(
                effect
            );


            const goober =
                createGoober({

                    design: "squish",

                    colour: "#6366f1"

                });


            preview.appendChild(
                goober
            );


            const name =
                document.createElement(
                    "h3"
                );

            name.textContent =
                item.name;


            const description =
                document.createElement(
                    "p"
                );

            description.textContent =
                item.description;


            const price =
                document.createElement(
                    "div"
                );

            price.className =
                "ticket-price";

            price.textContent =
                String(item.price) +
                " Shop Tickets";


            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "buy-button";

            button.type =
                "button";


            if (ownsItem(item.id)) {

                button.textContent =
                    "OWNED";

                button.disabled =
                    true;

                button.classList.add(
                    "owned"
                );

            }

            else {

                button.textContent =
                    "BUY";

                button.addEventListener(
                    "click",
                    function () {

                        buyTicketItem(
                            item,
                            button
                        );

                    }
                );

            }


            card.appendChild(
                preview
            );

            card.appendChild(
                name
            );

            card.appendChild(
                description
            );

            card.appendChild(
                price
            );

            card.appendChild(
                button
            );


            container.appendChild(
                card
            );

        }
    );


    updateCurrency();
}


/* =========================================================
   BUY TICKET ITEM
   ========================================================= */

function buyTicketItem(item, button) {

    if (ownsItem(item.id)) {
        return;
    }


    const tickets =
        getTickets();


    if (tickets < item.price) {

        alert(
            "You don't have enough Shop Tickets!"
        );

        return;
    }


    setTickets(
        tickets - item.price
    );


    unlockItem(
        item.id,
        item.type
    );


    const owned =
        getOwnedItems();


    if (
        owned.indexOf(
            item.id
        ) === -1
    ) {

        owned.push(
            item.id
        );
    }


    saveOwnedItems(
        owned
    );


    button.disabled =
        true;

    button.textContent =
        "OWNED";

    button.classList.add(
        "owned"
    );


    updateCurrency();
}


/* =========================================================
   STUDYPASS
   ========================================================= */

function displayStudyPass() {

    const container =
        document.getElementById(
            "studypass-items"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    STUDYPASS_CHARACTERS.forEach(
        function (item) {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "studypass-card";


            const badge =
                document.createElement(
                    "div"
                );

            badge.className =
                "pass-badge";

            badge.textContent =
                "STUDYPASS";


            const rarity =
                document.createElement(
                    "div"
                );

            rarity.className =
                "rarity " +
                rarityClass(
                    item.rarity
                );

            rarity.textContent =
                item.rarity;


            const preview =
                document.createElement(
                    "div"
                );

            preview.className =
                "studypass-preview";


            preview.appendChild(
                createGoober(item)
            );


            const name =
                document.createElement(
                    "h3"
                );

            name.textContent =
                item.name;


            const description =
                document.createElement(
                    "p"
                );

            description.textContent =
                "Exclusive StudyPass character";


            card.appendChild(
                badge
            );

            card.appendChild(
                rarity
            );

            card.appendChild(
                preview
            );

            card.appendChild(
                name
            );

            card.appendChild(
                description
            );


            container.appendChild(
                card
            );

        }
    );
}


/* =========================================================
   CURRENCY DISPLAY
   ========================================================= */

function updateCurrency() {

    const coins =
        document.getElementById(
            "coin-count"
        );


    const tickets =
        document.getElementById(
            "ticket-count"
        );


    if (coins) {

        coins.textContent =
            String(getCoins());

    }


    if (tickets) {

        tickets.textContent =
            String(getTickets());

    }
}


/* =========================================================
   COUNTDOWN
   ========================================================= */

function updateCountdown() {

    const element =
        document.getElementById(
            "countdown"
        );


    if (!element) {
        return;
    }


    const next =
        getShopStart() +
        SHOP_LENGTH;


    let remaining =
        next -
        Date.now();


    if (remaining < 0) {
        remaining = 0;
    }


    const days =
        Math.floor(
            remaining /
            86400000
        );


    const hours =
        Math.floor(
            (
                remaining %
                86400000
            ) /
            3600000
        );


    const minutes =
        Math.floor(
            (
                remaining %
                3600000
            ) /
            60000
        );


    const seconds =
        Math.floor(
            (
                remaining %
                60000
            ) /
            1000
        );


    element.textContent =
        String(days) +
        "d " +
        String(hours) +
        "h " +
        String(minutes) +
        "m " +
        String(seconds) +
        "s";
}


/* =========================================================
   SHOP NAVIGATION
   ========================================================= */

function openTicketShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );


    const ticket =
        document.getElementById(
            "ticket-shop"
        );


    const mainButton =
        document.getElementById(
            "main-shop-button"
        );


    const ticketButton =
        document.getElementById(
            "ticket-shop-button"
        );


    if (main) {
        main.style.display =
            "none";
    }


    if (ticket) {
        ticket.style.display =
            "block";
    }


    if (mainButton) {
        mainButton.classList.remove(
            "active"
        );
    }


    if (ticketButton) {
        ticketButton.classList.add(
            "active"
        );
    }
}


function openMainShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );


    const ticket =
        document.getElementById(
            "ticket-shop"
        );


    const mainButton =
        document.getElementById(
            "main-shop-button"
        );


    const ticketButton =
        document.getElementById(
            "ticket-shop-button"
        );


    if (ticket) {
        ticket.style.display =
            "none";
    }


    if (main) {
        main.style.display =
            "block";
    }


    if (ticketButton) {
        ticketButton.classList.remove(
            "active"
        );
    }


    if (mainButton) {
        mainButton.classList.add(
            "active"
        );
    }
}


/* =========================================================
   DEBUG MENU
   ========================================================= */

function openDebugMenu() {

    const existing =
        document.querySelector(
            ".debug-overlay"
        );


    if (existing) {
        return;
    }


    const overlay =
        document.createElement(
            "div"
        );

    overlay.className =
        "debug-overlay";


    const box =
        document.createElement(
            "div"
        );

    box.className =
        "debug-box";


    box.innerHTML =

        "<h2>🛠️ StudySprint Debug</h2>" +

        "<p>What do you want to change?</p>" +

        "<select id='debug-type'>" +

        "<option value='xp'>⭐ XP</option>" +

        "<option value='coins'>🪙 Coins</option>" +

        "<option value='tickets'>🎟️ Tickets</option>" +

        "<option value='streak'>🔥 Streak</option>" +

        "<option value='reset'>🗑️ Reset Account</option>" +

        "</select>" +

        "<input id='debug-value' type='number' placeholder='Amount'>" +

        "<button class='debug-apply' id='debug-apply'>" +
        "Apply" +
        "</button>" +

        "<button class='debug-close' id='debug-close'>" +
        "Cancel" +
        "</button>";


    overlay.appendChild(box);

    document.body.appendChild(overlay);


    const type =
        box.querySelector(
            "#debug-type"
        );


    const value =
        box.querySelector(
            "#debug-value"
        );


    function updateDebugInput() {

        if (type.value === "reset") {

            value.style.display =
                "none";

        }

        else {

            value.style.display =
                "block";

        }
    }


    type.addEventListener(
        "change",
        updateDebugInput
    );


    updateDebugInput();


    box.querySelector(
        "#debug-close"
    ).addEventListener(
        "click",
        function () {

            overlay.remove();

        }
    );


    box.querySelector(
        "#debug-apply"
    ).addEventListener(
        "click",
        function () {

            const selected =
                type.value;


            if (
                selected ===
                "reset"
            ) {

                const confirmed =
                    confirm(
                        "Reset your entire StudySprint account?"
                    );


                if (!confirmed) {
                    return;
                }


                localStorage.clear();

                alert(
                    "Account reset. Reloading..."
                );

                location.reload();

                return;
            }


            const amount =
                Number(
                    value.value
                );


            if (
                !Number.isFinite(
                    amount
                )
            ) {

                alert(
                    "Enter a valid number."
                );

                return;
            }


            const keys = {

                xp: "xp",

                coins: "coins",

                tickets: "shopTickets",

                streak: "streak"

            };


            localStorage.setItem(
                keys[selected],
                String(amount)
            );


            alert(
                String(selected) +
                " set to " +
                String(amount) +
                "!"
            );


            overlay.remove();

            location.reload();

        }
    );
}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const mainButton =
            document.getElementById(
                "main-shop-button"
            );


        const ticketButton =
            document.getElementById(
                "ticket-shop-button"
            );


        const debugButton =
            document.getElementById(
                "debug-open"
            );


        if (mainButton) {

            mainButton.addEventListener(
                "click",
                openMainShop
            );

        }


        if (ticketButton) {

            ticketButton.addEventListener(
                "click",
                openTicketShop
            );

        }


        if (debugButton) {

            debugButton.addEventListener(
                "click",
                openDebugMenu
            );

        }


        displayMainShop();

        displayTicketShop();

        displayStudyPass();

        updateCurrency();

        updateCountdown();


        setInterval(
            updateCountdown,
            1000
        );

    }
);


/* =========================================================
   PUBLIC FUNCTIONS
   ========================================================= */

window.openMainShop =
    openMainShop;

window.openTicketShop =
    openTicketShop;

window.getCoins =
    getCoins;

window.getTickets =
    getTickets;

window.getOwnedItems =
    getOwnedItems;

window.ownsItem =
    ownsItem;

window.getCurrentShop =
    getCurrentShop;
