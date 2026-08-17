/* =========================================================
   STUDYSPRINT SHOP
   22 DISTINCT GOOBERS
========================================================= */


/* =========================================================
   SHOP SETTINGS
========================================================= */

const SHOP_ITEM_COUNT = 6;
const SHOP_REFRESH_DAYS = 14;


/* =========================================================
   20 FORTNIGHTLY SHOP GOOBERS
========================================================= */

const SHOP_CHARACTERS = [

    /* =========================
       COMMON
    ========================= */

    {
        id: "leafy",
        name: "Leafy",
        rarity: "Common",
        price: 250,
        design: "leafy"
    },

    {
        id: "squish",
        name: "Squish",
        rarity: "Common",
        price: 275,
        design: "squish"
    },

    {
        id: "pebble",
        name: "Pebble",
        rarity: "Common",
        price: 300,
        design: "pebble"
    },

    {
        id: "button",
        name: "Button",
        rarity: "Common",
        price: 325,
        design: "button"
    },


    /* =========================
       RARE
    ========================= */

    {
        id: "horns",
        name: "Horns",
        rarity: "Rare",
        price: 400,
        design: "horns"
    },

    {
        id: "shellby",
        name: "Shellby",
        rarity: "Rare",
        price: 425,
        design: "shellby"
    },

    {
        id: "tallboi",
        name: "Tallboi",
        rarity: "Rare",
        price: 450,
        design: "tallboi"
    },

    {
        id: "four-eyes",
        name: "Four Eyes",
        rarity: "Rare",
        price: 475,
        design: "four-eyes"
    },


    /* =========================
       EPIC
    ========================= */

    {
        id: "mothball",
        name: "Mothball",
        rarity: "Epic",
        price: 550,
        design: "mothball"
    },

    {
        id: "spike",
        name: "Spike",
        rarity: "Epic",
        price: 575,
        design: "spike"
    },

    {
        id: "orbit",
        name: "Orbit",
        rarity: "Epic",
        price: 600,
        design: "orbit"
    },

    {
        id: "bubble",
        name: "Bubble",
        rarity: "Epic",
        price: 625,
        design: "bubble"
    },


    /* =========================
       MYTHIC
    ========================= */

    {
        id: "captain-goob",
        name: "Captain Goob",
        rarity: "Mythic",
        price: 700,
        design: "captain"
    },

    {
        id: "tailspin",
        name: "Tailspin",
        rarity: "Mythic",
        price: 725,
        design: "tailspin"
    },

    {
        id: "holy-moly",
        name: "Holy Moly",
        rarity: "Mythic",
        price: 750,
        design: "holy"
    },

    {
        id: "wingnut",
        name: "Wingnut",
        rarity: "Mythic",
        price: 775,
        design: "wingnut"
    },


    /* =========================
       LEGENDARY
    ========================= */

    {
        id: "royal-goober",
        name: "Royal Goober",
        rarity: "Legendary",
        price: 900,
        design: "royal"
    },

    {
        id: "cosmo",
        name: "Cosmo",
        rarity: "Legendary",
        price: 950,
        design: "cosmo"
    },

    {
        id: "the-goober",
        name: "The Goober",
        rarity: "Legendary",
        price: 1000,
        design: "the-goober"
    },

    {
        id: "golden-goober",
        name: "Golden Goober",
        rarity: "Legendary",
        price: 1100,
        design: "golden"
    }

];


/* =========================================================
   2 STUDYPASS GOOBERS
========================================================= */

const STUDYPASS_CHARACTERS = [

    {
        id: "study-sprout",
        name: "Study Sprout",
        rarity: "Epic",
        design: "study-sprout"
    },

    {
        id: "study-orbit",
        name: "Study Orbit",
        rarity: "Legendary",
        design: "study-orbit"
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
    localStorage.setItem("coins", amount);
}

function setTickets(amount) {
    localStorage.setItem("shopTickets", amount);
}


/* =========================================================
   OWNED ITEMS
========================================================= */

function getOwnedItems() {

    try {
        return JSON.parse(
            localStorage.getItem("shopOwnedItems")
        ) || [];
    }

    catch {
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

    return getOwnedItems().includes(id);
}


/* =========================================================
   UNLOCK SYSTEM
========================================================= */

function unlockItem(id, type) {

    const keys = {

        Character: "unlocked_characters",
        Banner: "unlocked_banners",
        Effect: "unlocked_effects",
        Hat: "unlocked_hats",
        "Player Title": "unlockedTitles"

    };

    const key = keys[type];

    if (!key)
        return;

    let unlocked = [];

    try {

        unlocked =
            JSON.parse(
                localStorage.getItem(key)
            ) || [];

    }

    catch {
        unlocked = [];
    }

    if (!unlocked.includes(id)) {

        unlocked.push(id);

    }

    localStorage.setItem(
        key,
        JSON.stringify(unlocked)
    );
}


/* =========================================================
   HELPER
========================================================= */

function addPart(parent, className) {

    const part =
        document.createElement("div");

    part.className = className;

    parent.appendChild(part);

    return part;
}


/* =========================================================
   GOOBER CREATOR
========================================================= */

function createGoober(data) {

    const goober =
        document.createElement("div");

    goober.className =
        `goober design-${data.design}`;


    /* BODY */

    const body =
        addPart(
            goober,
            "goober-body"
        );


    /* EYES */

    const eyes =
        document.createElement("div");

    eyes.className =
        "goober-eyes";

    goober.appendChild(eyes);


    addPart(
        eyes,
        "goober-eye eye-left"
    );

    addPart(
        eyes,
        "goober-eye eye-right"
    );


    /* MOUTH */

    addPart(
        goober,
        "goober-mouth"
    );


    /* FEET */

    addPart(
        goober,
        "goober-foot foot-left"
    );

    addPart(
        goober,
        "goober-foot foot-right"
    );


    /* =====================================================
       COMMON DESIGNS
    ===================================================== */

    if (data.design === "leafy") {

        addPart(
            goober,
            "leafy-leaf"
        );

        body.classList.add(
            "body-green"
        );
    }


    if (data.design === "squish") {

        body.classList.add(
            "body-blue"
        );

        goober.classList.add(
            "squish-body"
        );
    }


    if (data.design === "pebble") {

        body.classList.add(
            "body-stone"
        );

        addPart(
            body,
            "pebble-mark"
        );

    }


    if (data.design === "button") {

        body.classList.add(
            "body-pink"
        );

        addPart(
            goober,
            "button-antenna"
        );

        addPart(
            goober,
            "button-ball"
        );

    }


    /* =====================================================
       RARE DESIGNS
    ===================================================== */

    if (data.design === "horns") {

        body.classList.add(
            "body-purple"
        );

        addPart(
            goober,
            "horn horn-left"
        );

        addPart(
            goober,
            "horn horn-right"
        );

        goober.classList.add(
            "horn-goober"
        );
    }


    if (data.design === "shellby") {

        body.classList.add(
            "body-mint"
        );

        addPart(
            goober,
            "shell"
        );

        addPart(
            goober,
            "shell-line shell-line-one"
        );

        addPart(
            goober,
            "shell-line shell-line-two"
        );

    }


    if (data.design === "tallboi") {

        body.classList.add(
            "body-yellow"
        );

        goober.classList.add(
            "tall-goober"
        );

        addPart(
            goober,
            "tall-hat"
        );

    }


    if (data.design === "four-eyes") {

        body.classList.add(
            "body-red"
        );

        addPart(
            eyes,
            "goober-eye eye-extra-left"
        );

        addPart(
            eyes,
            "goober-eye eye-extra-right"
        );

        goober.classList.add(
            "four-eye-goober"
        );

    }


    /* =====================================================
       EPIC
    ===================================================== */

    if (data.design === "mothball") {

        body.classList.add(
            "body-lilac"
        );

        addPart(
            goober,
            "moth-wing wing-left"
        );

        addPart(
            goober,
            "moth-wing wing-right"
        );

        addPart(
            goober,
            "moth-antenna"
        );

        goober.classList.add(
            "moth-goober"
        );

    }


    if (data.design === "spike") {

        body.classList.add(
            "body-crimson"
        );

        addPart(
            goober,
            "spike-row"
        );

        addPart(
            goober,
            "spike-tail"
        );

        goober.classList.add(
            "spiky-goober"
        );

    }


    if (data.design === "orbit") {

        body.classList.add(
            "body-cyan"
        );

        addPart(
            goober,
            "orbit-ring"
        );

        addPart(
            goober,
            "orbit-dot"
        );

        goober.classList.add(
            "floating-goober"
        );

    }


    if (data.design === "bubble") {

        body.classList.add(
            "body-aqua"
        );

        addPart(
            goober,
            "bubble-small"
        );

        addPart(
            goober,
            "bubble-big"
        );

        goober.classList.add(
            "bubble-goober"
        );

    }


    /* =====================================================
       MYTHIC
    ===================================================== */

    if (data.design === "captain") {

        body.classList.add(
            "body-violet"
        );

        addPart(
            goober,
            "captain-cape"
        );

        addPart(
            goober,
            "captain-badge"
        );

        addPart(
            goober,
            "captain-hat"
        );

        goober.classList.add(
            "captain-goober"
        );

    }


    if (data.design === "tailspin") {

        body.classList.add(
            "body-pink"
        );

        addPart(
            goober,
            "giant-tail"
        );

        addPart(
            goober,
            "tail-tip"
        );

        goober.classList.add(
            "tailspin-goober"
        );

    }


    if (data.design === "holy") {

        body.classList.add(
            "body-gold"
        );

        addPart(
            goober,
            "holy-halo"
        );

        addPart(
            goober,
            "holy-rays"
        );

        goober.classList.add(
            "holy-goober"
        );

    }


    if (data.design === "wingnut") {

        body.classList.add(
            "body-pastel"
        );

        addPart(
            goober,
            "giant-wing wing-left"
        );

        addPart(
            goober,
            "giant-wing wing-right"
        );

        addPart(
            goober,
            "wingnut-tail"
        );

        goober.classList.add(
            "wingnut-goober"
        );

    }


    /* =====================================================
       LEGENDARY
    ===================================================== */

    if (data.design === "royal") {

        body.classList.add(
            "body-orange"
        );

        addPart(
            goober,
            "royal-crown"
        );

        addPart(
            goober,
            "royal-cloak"
        );

        addPart(
            goober,
            "royal-jewel"
        );

        goober.classList.add(
            "royal-goober"
        );

    }


    if (data.design === "cosmo") {

        body.classList.add(
            "body-space"
        );

        addPart(
            goober,
            "cosmo-stars"
        );

        addPart(
            goober,
            "cosmo-ring"
        );

        addPart(
            goober,
            "cosmo-moon"
        );

        goober.classList.add(
            "cosmo-goober"
        );

    }


    if (data.design === "the-goober") {

        body.classList.add(
            "body-orange"
        );

        addPart(
            goober,
            "the-goober-small-body"
        );

        addPart(
            goober,
            "the-goober-eye"
        );

        addPart(
            goober,
            "the-goober-mouth"
        );

        addPart(
            goober,
            "the-goober-floating-hand"
        );

        goober.classList.add(
            "ultimate-goober"
        );

    }


    if (data.design === "golden") {

        body.classList.add(
            "body-gold-gradient"
        );

        addPart(
            goober,
            "golden-crown"
        );

        addPart(
            goober,
            "golden-sparkles"
        );

        addPart(
            goober,
            "golden-platform"
        );

        goober.classList.add(
            "golden-goober"
        );

    }


    /* =====================================================
       STUDYPASS
    ===================================================== */

    if (data.design === "study-sprout") {

        body.classList.add(
            "body-study-green"
        );

        addPart(
            goober,
            "study-book"
        );

        addPart(
            goober,
            "study-leaf"
        );

    }


    if (data.design === "study-orbit") {

        body.classList.add(
            "body-study-purple"
        );

        addPart(
            goober,
            "study-ring"
        );

        addPart(
            goober,
            "study-star"
        );

        addPart(
            goober,
            "study-book"
        );

    }


    return goober;
}


/* =========================================================
   RARITY
========================================================= */

function rarityClass(rarity) {

    return (
        "rarity-" +
        rarity
            .toLowerCase()
            .replace(/\s+/g, "-")
    );

}


/* =========================================================
   SHOP TIMING
========================================================= */

/*
   The rotation is based on one fixed UTC timestamp.

   12:00 AM AEST
   =
   2:00 PM UTC the previous day.

   Anchor:
   Sunday 10 August 2025
   12:00 AM AEST
*/

const SHOP_ANCHOR =
    Date.UTC(
        2025,
        7,
        9,
        14,
        0,
        0
    );


function getShopStart() {

    const interval =
        SHOP_REFRESH_DAYS *
        24 *
        60 *
        60 *
        1000;

    const cycles =
        Math.floor(
            (
                Date.now() -
                SHOP_ANCHOR
            ) /
            interval
        );

    return (
        SHOP_ANCHOR +
        cycles * interval
    );
}


/* =========================================================
   SEEDED SHUFFLE
========================================================= */

function seededShuffle(array, seed) {

    const result =
        [...array];

    let value =
        seed;

    for (
        let i =
            result.length - 1;
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
                value /
                233280 *
                (i + 1)
            );

        [
            result[i],
            result[j]
        ] =
        [
            result[j],
            result[i]
        ];
    }

    return result;
}


/* =========================================================
   CURRENT SHOP
========================================================= */

function getCurrentShop() {

    const start =
        getShopStart();

    const seed =
        Math.floor(
            start / 1000
        );

    const shuffled =
        seededShuffle(
            SHOP_CHARACTERS,
            seed
        );

    return shuffled
        .slice(
            0,
            SHOP_ITEM_COUNT
        )
        .map(
            character => ({
                ...character,
                type: "Character"
            })
        );
}


/* =========================================================
   BANNER
========================================================= */

function bannerPreview(id) {

    const preview =
        document.createElement(
            "div"
        );

    preview.className =
        "banner-preview";

    if (id === "sprint-grid") {

        preview.classList.add(
            "banner-sprint"
        );

    }

    else if (
        id === "purple-grid"
    ) {

        preview.classList.add(
            "banner-purple"
        );

    }

    else {

        preview.classList.add(
            "banner-blue"
        );

    }

    return preview;
}


/* =========================================================
   PREVIEW
========================================================= */

function createPreview(item) {

    if (
        item.type ===
        "Character"
    ) {

        return createGoober(
            item
        );

    }

    if (
        item.type ===
        "Banner"
    ) {

        return bannerPreview(
            item.id
        );

    }

    return createGoober({
        design: "button"
    });
}


/* =========================================================
   SHOP CARD
========================================================= */

function createShopCard(item) {

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "shop-card";

    card.classList.add(
        rarityClass(
            item.rarity
        )
    );


    const rarity =
        document.createElement(
            "div"
        );

    rarity.className =
        "rarity";

    rarity.textContent =
        item.rarity;


    const preview =
        document.createElement(
            "div"
        );

    preview.className =
        "item-preview";

    preview.appendChild(
        createPreview(item)
    );


    const name =
        document.createElement(
            "h3"
        );

    name.textContent =
        item.name;


    const type =
        document.createElement(
            "p"
        );

    type.textContent =
        item.type;


    const price =
        document.createElement(
            "div"
        );

    price.className =
        "shop-price";

    price.textContent =
        `${item.price} Coins`;


    const button =
        document.createElement(
            "button"
        );

    button.className =
        "buy-button";

    button.type =
        "button";


    if (
        ownsItem(item.id)
    ) {

        button.textContent =
            "OWNED";

        button.disabled =
            true;

    }

    else {

        button.textContent =
            "BUY";

        button.onclick =
            () =>
                buyMainItem(
                    item,
                    button
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

    if (!container)
        return;

    container.innerHTML =
        "";

    getCurrentShop()
        .forEach(item => {

            container.appendChild(
                createShopCard(item)
            );

        });

    updateCurrency();
}


/* =========================================================
   BUY MAIN ITEM
========================================================= */

function buyMainItem(item, button) {

    if (
        ownsItem(item.id)
    )
        return;

    const coins =
        getCoins();

    if (
        coins <
        item.price
    ) {

        alert(
            "You don't have enough coins!"
        );

        return;
    }

    setCoins(
        coins -
        item.price
    );

    unlockItem(
        item.id,
        item.type
    );

    const owned =
        getOwnedItems();

    if (
        !owned.includes(
            item.id
        )
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

    if (!container)
        return;

    container.innerHTML =
        "";

    TICKET_ITEMS.forEach(
        item => {

            const card =
                document.createElement(
                    "div"
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
                `preview-effect ${item.id}`;


            preview.appendChild(
                effect
            );


            preview.appendChild(
                createGoober({
                    design:
                        "button"
                })
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
                `${item.price} Shop Tickets`;


            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "buy-button";


            if (
                ownsItem(item.id)
            ) {

                button.textContent =
                    "OWNED";

                button.disabled =
                    true;

            }

            else {

                button.textContent =
                    "BUY";

                button.onclick =
                    () =>
                        buyTicketItem(
                            item,
                            button
                        );

            }


            card.appendChild(preview);
            card.appendChild(name);
            card.appendChild(description);
            card.appendChild(price);
            card.appendChild(button);

            container.appendChild(card);

        }
    );

    updateCurrency();
}


/* =========================================================
   BUY TICKET ITEM
========================================================= */

function buyTicketItem(item, button) {

    if (
        ownsItem(item.id)
    )
        return;

    const tickets =
        getTickets();

    if (
        tickets <
        item.price
    ) {

        alert(
            "You don't have enough Shop Tickets!"
        );

        return;
    }

    setTickets(
        tickets -
        item.price
    );

    unlockItem(
        item.id,
        item.type
    );

    const owned =
        getOwnedItems();

    if (
        !owned.includes(
            item.id
        )
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

    if (!container)
        return;

    container.innerHTML =
        "";

    STUDYPASS_CHARACTERS
        .forEach(item => {

            const card =
                document.createElement(
                    "div"
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
                `rarity ${rarityClass(item.rarity)}`;

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


            card.appendChild(badge);
            card.appendChild(rarity);
            card.appendChild(preview);
            card.appendChild(name);
            card.appendChild(description);

            container.appendChild(card);

        });
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

    if (coins)
        coins.textContent =
            getCoins();

    if (tickets)
        tickets.textContent =
            getTickets();
}


/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdown() {

    const element =
        document.getElementById(
            "countdown"
        );

    if (!element)
        return;

    const next =
        getShopStart() +
        SHOP_REFRESH_DAYS *
        86400000;

    let remaining =
        next -
        Date.now();

    if (remaining < 0)
        remaining = 0;

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
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}


/* =========================================================
   SHOP NAVIGATION
========================================================= */

function openTicketShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );

    const tickets =
        document.getElementById(
            "ticket-shop"
        );

    if (main)
        main.style.display =
            "none";

    if (tickets)
        tickets.style.display =
            "block";


    document
        .getElementById(
            "main-shop-button"
        )
        ?.classList
        .remove("active");


    document
        .getElementById(
            "ticket-shop-button"
        )
        ?.classList
        .add("active");
}


function openMainShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );

    const tickets =
        document.getElementById(
            "ticket-shop"
        );

    if (tickets)
        tickets.style.display =
            "none";

    if (main)
        main.style.display =
            "block";


    document
        .getElementById(
            "ticket-shop-button"
        )
        ?.classList
        .remove("active");


    document
        .getElementById(
            "main-shop-button"
        )
        ?.classList
        .add("active");
}


/* =========================================================
   DEBUG MENU
========================================================= */

function openDebugMenu() {

    if (
        document.querySelector(
            ".debug-overlay"
        )
    )
        return;


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


    box.innerHTML = `

        <h2>🛠️ StudySprint Debug</h2>

        <p>What do you want to change?</p>

        <select id="debug-type">

            <option value="xp">
                ⭐ XP
            </option>

            <option value="coins">
                🪙 Coins
            </option>

            <option value="tickets">
                🎟️ Tickets
            </option>

            <option value="streak">
                🔥 Streak
            </option>

            <option value="reset">
                🗑️ Reset Account
            </option>

        </select>

        <input
            id="debug-value"
            type="number"
            placeholder="Amount"
        >

        <button
            class="debug-apply"
            id="debug-apply"
        >
            Apply
        </button>

        <button
            class="debug-close"
            id="debug-close"
        >
            Cancel
        </button>

    `;


    overlay.appendChild(box);

    document.body.appendChild(
        overlay
    );


    const type =
        box.querySelector(
            "#debug-type"
        );

    const value =
        box.querySelector(
            "#debug-value"
        );


    function updateInput() {

        value.style.display =
            type.value === "reset"
                ? "none"
                : "block";
    }


    type.addEventListener(
        "change",
        updateInput
    );

    updateInput();


    box.querySelector(
        "#debug-close"
    ).onclick =
        () => overlay.remove();


    box.querySelector(
        "#debug-apply"
    ).onclick =
        () => {

            const selected =
                type.value;


            if (
                selected ===
                "reset"
            ) {

                const confirmed =
                    confirm(
                        "⚠️ Reset your entire StudySprint account?"
                    );

                if (!confirmed)
                    return;

                localStorage.clear();

                alert(
                    "✅ Account reset!\n\nReloading StudySprint..."
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
                amount
            );


            alert(
                `✅ ${selected} set to ${amount}!`
            );


            overlay.remove();

            location.reload();

        };
}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .getElementById(
                "main-shop-button"
            )
            ?.addEventListener(
                "click",
                openMainShop
            );


        document
            .getElementById(
                "ticket-shop-button"
            )
            ?.addEventListener(
                "click",
                openTicketShop
            );


        document
            .getElementById(
                "debug-open"
            )
            ?.addEventListener(
                "click",
                openDebugMenu
            );


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

window.openDebugMenu =
    openDebugMenu;

window.getCoins =
    getCoins;

window.getTickets =
    getTickets;

window.getOwnedItems =
    getOwnedItems;

window.ownsItem =
    ownsItem;
