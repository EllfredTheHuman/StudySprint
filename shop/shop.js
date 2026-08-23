/* =========================================================
   STUDYSPRINT SHOP
   GOOBER SHOP SYSTEM
========================================================= */

const SHOP_SLOTS = 6;

const SHOP_INTERVAL = 14 * 24 * 60 * 60 * 1000;

const SHOP_ANCHOR = Date.UTC(2025, 7, 9, 14, 0, 0);


/* =========================================================
   RARITY
========================================================= */

const RARITY_CHANCES = [
    { name: "Common", weight: 40 },
    { name: "Rare", weight: 30 },
    { name: "Epic", weight: 18 },
    { name: "Mythic", weight: 9 },
    { name: "Legendary", weight: 3 }
];


/* =========================================================
   SHOP ITEMS
========================================================= */

const SHOP_ITEMS = [

    /* COMMON */

    {
        id: "squish",
        name: "Squish",
        type: "Character",
        rarity: "Common",
        price: 275,
        design: "squish"
    },

    {
        id: "pebble",
        name: "Pebble",
        type: "Character",
        rarity: "Common",
        price: 300,
        design: "pebble"
    },

    {
        id: "button",
        name: "Button",
        type: "Character",
        rarity: "Common",
        price: 325,
        design: "button"
    },


    /* RARE */

    {
        id: "horns",
        name: "Horns",
        type: "Character",
        rarity: "Rare",
        price: 400,
        design: "horns"
    },

    {
        id: "shelby",
        name: "Shelby",
        type: "Character",
        rarity: "Rare",
        price: 425,
        design: "shelby"
    },

    {
        id: "tallboi",
        name: "Tallboi",
        type: "Character",
        rarity: "Rare",
        price: 450,
        design: "tallboi"
    },

    {
        id: "four-eyes",
        name: "Four Eyes",
        type: "Character",
        rarity: "Rare",
        price: 475,
        design: "fourEyes"
    },


    /* EPIC */

    {
        id: "mothball",
        name: "Mothball",
        type: "Character",
        rarity: "Epic",
        price: 550,
        design: "mothball"
    },

    {
        id: "spike",
        name: "Spike",
        type: "Character",
        rarity: "Epic",
        price: 575,
        design: "spike"
    },

    {
        id: "orbit",
        name: "Orbit",
        type: "Character",
        rarity: "Epic",
        price: 600,
        design: "orbit"
    },

    {
        id: "bubble",
        name: "Bubble",
        type: "Character",
        rarity: "Epic",
        price: 625,
        design: "bubble"
    },


    /* MYTHIC */

    {
        id: "captain-goob",
        name: "Captain Goob",
        type: "Character",
        rarity: "Mythic",
        price: 700,
        design: "captainGoob"
    },

    {
        id: "tailspin",
        name: "Tailspin",
        type: "Character",
        rarity: "Mythic",
        price: 725,
        design: "tailspin"
    },

    {
        id: "holy-moly",
        name: "Holy Moly",
        type: "Character",
        rarity: "Mythic",
        price: 750,
        design: "holyMoly"
    },

    {
        id: "wingnut",
        name: "Wingnut",
        type: "Character",
        rarity: "Mythic",
        price: 775,
        design: "wingnut"
    },


    /* LEGENDARY */

    {
        id: "cosmo",
        name: "Cosmo",
        type: "Character",
        rarity: "Legendary",
        price: 950,
        design: "cosmo"
    },

    {
        id: "the-goober",
        name: "The Goober",
        type: "Character",
        rarity: "Legendary",
        price: 1000,
        design: "theGoober"
    },

    {
        id: "golden-goober",
        name: "Golden Goober",
        type: "Character",
        rarity: "Legendary",
        price: 1100,
        design: "golden"
    },

    {
        id: "galaxy-goober",
        name: "Galaxy Goober",
        type: "Character",
        rarity: "Legendary",
        price: 1200,
        design: "galaxy"
    },


    /* BANNERS */

    {
        id: "sprint-grid",
        name: "Sprint Grid",
        type: "Banner",
        rarity: "Common",
        price: 100,
        design: "sprintGrid"
    },

    {
        id: "purple-grid",
        name: "Purple Grid",
        type: "Banner",
        rarity: "Common",
        price: 125,
        design: "purpleGrid"
    },

    {
        id: "neon-blue",
        name: "Neon Blue",
        type: "Banner",
        rarity: "Rare",
        price: 175,
        design: "neonBlue"
    },

    {
        id: "galaxy-banner",
        name: "Galaxy",
        type: "Banner",
        rarity: "Epic",
        price: 300,
        design: "galaxy"
    },

    {
        id: "gold-banner",
        name: "Golden",
        type: "Banner",
        rarity: "Legendary",
        price: 600,
        design: "gold"
    },


    /* TITLES */

    {
        id: "study-sprinter",
        name: "Study Sprinter",
        type: "Player Title",
        rarity: "Common",
        price: 150
    },

    {
        id: "brainiac",
        name: "Brainiac",
        type: "Player Title",
        rarity: "Rare",
        price: 300
    },

    {
        id: "speed-learner",
        name: "Speed Learner",
        type: "Player Title",
        rarity: "Epic",
        price: 450
    },

    {
        id: "knowledge-seeker",
        name: "Knowledge Seeker",
        type: "Player Title",
        rarity: "Mythic",
        price: 650
    },

    {
        id: "study-legend",
        name: "Study Legend",
        type: "Player Title",
        rarity: "Legendary",
        price: 1000
    }

];


/* =========================================================
   CURRENCY
========================================================= */

function getCoins() {
    return Number(localStorage.getItem("coins")) || 0;
}

function setCoins(value) {
    localStorage.setItem("coins", String(value));
}

function getTickets() {
    return Number(localStorage.getItem("shopTickets")) || 0;
}

function setTickets(value) {
    localStorage.setItem("shopTickets", String(value));
}


/* =========================================================
   OWNED ITEMS
========================================================= */

function getOwnedItems() {

    try {
        const saved = JSON.parse(
            localStorage.getItem("shopOwnedItems")
        );

        return Array.isArray(saved) ? saved : [];

    } catch (error) {
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
   UNLOCK ITEMS
========================================================= */

function unlockItem(id, type) {

    let key = null;

    if (type === "Character") {
        key = "unlocked_characters";
    }

    if (type === "Banner") {
        key = "unlocked_banners";
    }

    if (type === "Player Title") {
        key = "unlockedTitles";
    }

    if (!key) {
        return;
    }

    let unlocked = [];

    try {

        const saved = JSON.parse(
            localStorage.getItem(key)
        );

        if (Array.isArray(saved)) {
            unlocked = saved;
        }

    } catch (error) {
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
   SEEDED RANDOM
========================================================= */

function seededRandom(seed) {

    let value = seed % 2147483647;

    if (value <= 0) {
        value += 2147483646;
    }

    value =
        value * 16807 %
        2147483647;

    return (
        value - 1
    ) / 2147483646;
}


/* =========================================================
   SHOP ROTATION
========================================================= */

function getShopStart() {

    const debugReset =
        localStorage.getItem("shopDebugReset");

    if (debugReset) {
        return Number(debugReset);
    }

    const now = Date.now();

    const cycles = Math.floor(
        (now - SHOP_ANCHOR) /
        SHOP_INTERVAL
    );

    return (
        SHOP_ANCHOR +
        cycles * SHOP_INTERVAL
    );
}


/* =========================================================
   RARITY ROLL
========================================================= */

function rollRarity(random) {

    let total = 0;

    for (const rarity of RARITY_CHANCES) {

        total += rarity.weight;

        if (random * 100 < total) {
            return rarity.name;
        }
    }

    return "Common";
}


/* =========================================================
   CURRENT SHOP
========================================================= */

function getCurrentShop() {

    const start = getShopStart();

    const rerollSeed =
        Number(
            localStorage.getItem(
                "shopRerollSeed"
            )
        ) || 0;

    const baseSeed =
        Math.floor(start / 1000) +
        rerollSeed;

    const result = [];

    const used = new Set();

    for (
        let slot = 0;
        slot < SHOP_SLOTS;
        slot++
    ) {

        let random = seededRandom(
            baseSeed +
            slot * 7919
        );

        const rarity = rollRarity(random);

        let candidates =
            SHOP_ITEMS.filter(function(item) {

                return (
                    item.rarity === rarity &&
                    !used.has(item.id)
                );

            });

        if (candidates.length === 0) {

            candidates =
                SHOP_ITEMS.filter(function(item) {

                    return !used.has(item.id);

                });

        }

        if (candidates.length === 0) {
            break;
        }

        random = seededRandom(
            baseSeed +
            slot * 15485863
        );

        const index = Math.floor(
            random * candidates.length
        );

        const item = candidates[index];

        used.add(item.id);

        result.push(item);
    }

    return result;
}


/* =========================================================
   GOOBER PREVIEW
========================================================= */

function createGooberPreview(item) {

    const goober =
        document.createElement("div");

    goober.className =
        "shop-goober";


    const body =
        document.createElement("div");

    body.className =
        "goober-body";


    const face =
        document.createElement("div");

    face.className =
        "goober-face";


    const eyes =
        document.createElement("div");

    eyes.className =
        "goober-eyes";


    const eyeLeft =
        document.createElement("span");

    eyeLeft.className =
        "goober-eye";


    const eyeRight =
        document.createElement("span");

    eyeRight.className =
        "goober-eye";


    eyes.appendChild(eyeLeft);
    eyes.appendChild(eyeRight);


    const mouth =
        document.createElement("div");

    mouth.className =
        "goober-mouth";


    face.appendChild(eyes);
    face.appendChild(mouth);

    body.appendChild(face);

    goober.appendChild(body);


    switch (item.design) {

        case "squish":
            body.classList.add(
                "goober-squish"
            );
            break;

        case "pebble":
            body.classList.add(
                "goober-pebble"
            );
            break;

        case "button":
            body.classList.add(
                "goober-button"
            );
            break;

        case "horns":

            body.classList.add(
                "goober-horns"
            );

            addHorns(body);

            break;

        case "shelby":
            body.classList.add(
                "goober-shelby"
            );
            break;

        case "tallboi":
            body.classList.add(
                "goober-tallboi"
            );
            break;

        case "fourEyes":

            body.classList.add(
                "goober-four-eyes"
            );

            addExtraEyes(body);

            break;

        case "mothball":

            body.classList.add(
                "goober-mothball"
            );

            addAntenna(body);

            break;

        case "spike":

            body.classList.add(
                "goober-spike"
            );

            addSpikes(body);

            break;

        case "orbit":

            body.classList.add(
                "goober-orbit"
            );

            addOrbit(body);

            break;

        case "bubble":

            body.classList.add(
                "goober-bubble"
            );

            break;

        case "captainGoob":

            body.classList.add(
                "goober-captain"
            );

            addCaptainHat(body);

            break;

        case "tailspin":

            body.classList.add(
                "goober-tailspin"
            );

            addTail(body);

            break;

        case "holyMoly":

            body.classList.add(
                "goober-holy"
            );

            break;

        case "wingnut":

            body.classList.add(
                "goober-wingnut"
            );

            addWings(body);

            break;

        case "cosmo":

            body.classList.add(
                "goober-cosmo"
            );

            break;

        case "theGoober":

            body.classList.add(
                "goober-the-goober"
            );

            break;

        case "golden":

            body.classList.add(
                "goober-golden"
            );

            break;

        case "galaxy":

            body.classList.add(
                "goober-galaxy"
            );

            break;
    }


    return goober;
}


/* =========================================================
   GOOBER EXTRAS
========================================================= */

function addHorns(body) {

    const horns =
        document.createElement("div");

    horns.className =
        "goober-horn-container";

    const left =
        document.createElement("span");

    left.className =
        "goober-horn left";

    const right =
        document.createElement("span");

    right.className =
        "goober-horn right";

    horns.appendChild(left);
    horns.appendChild(right);

    body.appendChild(horns);
}


function addExtraEyes(body) {

    const extra =
        document.createElement("div");

    extra.className =
        "goober-extra-eyes";

    const left =
        document.createElement("span");

    const right =
        document.createElement("span");

    extra.appendChild(left);
    extra.appendChild(right);

    body.appendChild(extra);
}


function addAntenna(body) {

    const antenna =
        document.createElement("div");

    antenna.className =
        "goober-antenna";

    const left =
        document.createElement("span");

    left.className = "left";

    const right =
        document.createElement("span");

    right.className = "right";

    antenna.appendChild(left);
    antenna.appendChild(right);

    body.appendChild(antenna);
}


function addSpikes(body) {

    const spikes =
        document.createElement("div");

    spikes.className =
        "goober-spikes";

    for (let i = 0; i < 6; i++) {

        const spike =
            document.createElement("span");

        spikes.appendChild(spike);
    }

    body.appendChild(spikes);
}


function addOrbit(body) {

    const orbit =
        document.createElement("div");

    orbit.className =
        "goober-orbit-ring";

    body.appendChild(orbit);
}


function addCaptainHat(body) {

    const hat =
        document.createElement("div");

    hat.className =
        "goober-captain-hat";

    hat.textContent = "★";

    body.appendChild(hat);
}


function addTail(body) {

    const tail =
        document.createElement("div");

    tail.className =
        "goober-tail";

    body.appendChild(tail);
}


function addWings(body) {

    const wings =
        document.createElement("div");

    wings.className =
        "goober-wings";

    const left =
        document.createElement("span");

    left.className = "left";

    const right =
        document.createElement("span");

    right.className = "right";

    wings.appendChild(left);
    wings.appendChild(right);

    body.appendChild(wings);
}


/* =========================================================
   BANNER PREVIEW
========================================================= */

function createBanner(item) {

    const banner =
        document.createElement("div");

    banner.className =
        "banner-preview";

    banner.classList.add(
        "banner-" + item.design
    );

    return banner;
}


/* =========================================================
   TITLE PREVIEW
========================================================= */

function createTitlePreview(item) {

    const title =
        document.createElement("div");

    title.className =
        "title-preview";

    title.textContent =
        item.name;

    return title;
}


/* =========================================================
   PREVIEW
========================================================= */

function createPreview(item) {

    if (item.type === "Character") {
        return createGooberPreview(item);
    }

    if (item.type === "Banner") {
        return createBanner(item);
    }

    if (item.type === "Player Title") {
        return createTitlePreview(item);
    }

    return document.createElement("div");
}


/* =========================================================
   RARITY CLASS
========================================================= */

function getRarityClass(rarity) {

    return (
        "rarity-" +
        rarity.toLowerCase()
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
        getRarityClass(item.rarity);


    const rarity =
        document.createElement("div");

    rarity.className =
        "rarity";

    rarity.textContent =
        item.rarity;


    const preview =
        document.createElement("div");

    preview.className =
        "item-preview";

    preview.appendChild(
        createPreview(item)
    );


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
        item.price + " Coins";


    const button =
        document.createElement("button");

    button.className =
        "buy-button";


    if (ownsItem(item.id)) {

        button.textContent =
            "OWNED";

        button.disabled = true;

        button.classList.add(
            "owned"
        );

    } else {

        button.textContent =
            "BUY";

        button.addEventListener(
            "click",
            function() {

                buyCoinItem(
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
   DISPLAY SHOP
========================================================= */

function displayMainShop() {

    const container =
        document.getElementById(
            "shop-items"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const items =
        getCurrentShop();

    for (const item of items) {

        container.appendChild(
            createShopCard(item)
        );
    }
}


/* =========================================================
   BUY
========================================================= */

function buyCoinItem(item, button) {

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

    if (!owned.includes(item.id)) {

        owned.push(item.id);

    }

    saveOwnedItems(owned);


    button.textContent =
        "OWNED";

    button.disabled = true;

    button.classList.add(
        "owned"
    );

    updateCurrency();
}


/* =========================================================
   CURRENCY
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
            getCoins();
    }

    if (tickets) {
        tickets.textContent =
            getTickets();
    }
}


/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdown() {

    const countdown =
        document.getElementById(
            "shop-countdown"
        );

    if (!countdown) {
        return;
    }

    const next =
        getShopStart() +
        SHOP_INTERVAL;

    let remaining =
        Math.max(
            0,
            next - Date.now()
        );


    const days =
        Math.floor(
            remaining / 86400000
        );

    remaining %= 86400000;


    const hours =
        Math.floor(
            remaining / 3600000
        );

    remaining %= 3600000;


    const minutes =
        Math.floor(
            remaining / 60000
        );

    remaining %= 60000;


    const seconds =
        Math.floor(
            remaining / 1000
        );


    countdown.textContent =
        days +
        "d " +
        hours +
        "h " +
        minutes +
        "m " +
        seconds +
        "s";
}


/* =========================================================
   DEBUG
========================================================= */

function rerollShop() {

    localStorage.setItem(
        "shopRerollSeed",
        String(Date.now())
    );

    location.reload();
}


function resetShopReroll() {

    localStorage.removeItem(
        "shopRerollSeed"
    );

    location.reload();
}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayMainShop();

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

window.getCoins =
    getCoins;

window.setCoins =
    setCoins;

window.getTickets =
    getTickets;

window.setTickets =
    setTickets;

window.getOwnedItems =
    getOwnedItems;

window.saveOwnedItems =
    saveOwnedItems;

window.ownsItem =
    ownsItem;

window.getCurrentShop =
    getCurrentShop;

window.rerollShop =
    rerollShop;

window.resetShopReroll =
    resetShopReroll;

window.displayMainShop =
    displayMainShop;

window.SHOP_ITEMS =
    SHOP_ITEMS;
