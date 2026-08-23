/* =========================================================
   STUDYSPRINT SHOP
   GOOBER SHOP
   ========================================================= */


/* =========================================================
   SETTINGS
   ========================================================= */

const SHOP_SLOTS = 6;

const SHOP_INTERVAL =
    14 * 24 * 60 * 60 * 1000;

const SHOP_ANCHOR =
    Date.UTC(2025, 7, 9, 14, 0, 0);


/* =========================================================
   RARITIES
   ========================================================= */

const RARITY_CHANCES = [
    {
        name: "Common",
        weight: 40
    },

    {
        name: "Rare",
        weight: 30
    },

    {
        name: "Epic",
        weight: 18
    },

    {
        name: "Mythic",
        weight: 9
    },

    {
        name: "Legendary",
        weight: 3
    }
];


/* =========================================================
   SHOP ITEMS
   ========================================================= */

const SHOP_ITEMS = [

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

    return Number(
        localStorage.getItem("coins")
    ) || 0;

}


function setCoins(value) {

    localStorage.setItem(
        "coins",
        String(value)
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
   UNLOCK
   ========================================================= */

function unlockItem(item) {

    let key = "";

    if (item.type === "Character") {

        key = "unlocked_characters";

    }

    if (item.type === "Banner") {

        key = "unlocked_banners";

    }

    if (item.type === "Player Title") {

        key = "unlockedTitles";

    }

    if (!key) {

        return;

    }

    let unlocked = [];

    try {

        unlocked = JSON.parse(
            localStorage.getItem(key)
        ) || [];

    } catch (error) {

        unlocked = [];

    }

    if (!unlocked.includes(item.id)) {

        unlocked.push(item.id);

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

    let value =
        seed % 2147483647;

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
   SHOP START
   ========================================================= */

function getShopStart() {

    const debug =
        localStorage.getItem(
            "shopDebugReset"
        );

    if (debug) {

        return Number(debug);

    }

    const now = Date.now();

    const cycles =
        Math.floor(
            (
                now -
                SHOP_ANCHOR
            ) /
            SHOP_INTERVAL
        );

    return (
        SHOP_ANCHOR +
        cycles *
        SHOP_INTERVAL
    );

}


/* =========================================================
   RARITY
   ========================================================= */

function rollRarity(random) {

    let total = 0;

    for (
        const rarity of RARITY_CHANCES
    ) {

        total += rarity.weight;

        if (
            random * 100 <
            total
        ) {

            return rarity.name;

        }

    }

    return "Common";

}


/* =========================================================
   CURRENT SHOP
   ========================================================= */

function getCurrentShop() {

    const start =
        getShopStart();

    const reroll =
        Number(
            localStorage.getItem(
                "shopRerollSeed"
            )
        ) || 0;

    const seed =
        Math.floor(start / 1000) +
        reroll;

    const result = [];

    const used = new Set();

    for (
        let slot = 0;
        slot < SHOP_SLOTS;
        slot++
    ) {

        let random =
            seededRandom(
                seed +
                slot * 7919
            );

        const rarity =
            rollRarity(random);

        let candidates =
            SHOP_ITEMS.filter(
                function(item) {

                    return (
                        item.rarity === rarity &&
                        !used.has(item.id)
                    );

                }
            );

        if (!candidates.length) {

            candidates =
                SHOP_ITEMS.filter(
                    function(item) {

                        return !used.has(
                            item.id
                        );

                    }
                );

        }

        if (!candidates.length) {

            break;

        }

        random =
            seededRandom(
                seed +
                slot * 15485863
            );

        const index =
            Math.floor(
                random *
                candidates.length
            );

        const item =
            candidates[index];

        used.add(item.id);

        result.push(item);

    }

    return result;

}


/* =========================================================
   GOOBER CREATOR
   ========================================================= */

function createGoober(item) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "goober-preview goober-" +
        item.design;


    const body =
        document.createElement("div");

    body.className =
        "goober-body";


    const leftEye =
        document.createElement("div");

    leftEye.className =
        "goober-eye left";


    const rightEye =
        document.createElement("div");

    rightEye.className =
        "goober-eye right";


    const mouth =
        document.createElement("div");

    mouth.className =
        "goober-mouth";


    body.appendChild(leftEye);

    body.appendChild(rightEye);

    body.appendChild(mouth);

    wrapper.appendChild(body);


    return wrapper;

}


/* =========================================================
   BANNER CREATOR
   ========================================================= */

function createBanner(item) {

    const banner =
        document.createElement("div");

    banner.className =
        "banner-preview banner-" +
        item.design;

    return banner;

}


/* =========================================================
   TITLE CREATOR
   ========================================================= */

function createTitle(item) {

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

    if (
        item.type === "Character"
    ) {

        return createGoober(item);

    }

    if (
        item.type === "Banner"
    ) {

        return createBanner(item);

    }

    if (
        item.type === "Player Title"
    ) {

        return createTitle(item);

    }

    return document.createElement("div");

}


/* =========================================================
   SHOP CARD
   ========================================================= */

function createShopCard(item) {

    const card =
        document.createElement("article");

    card.className =
        "shop-card rarity-" +
        item.rarity.toLowerCase();


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
        item.price +
        " Coins";


    const button =
        document.createElement("button");

    button.className =
        "buy-button";


    if (
        ownsItem(item.id)
    ) {

        button.textContent =
            "OWNED";

        button.disabled =
            true;

        button.classList.add(
            "owned"
        );

    } else {

        button.textContent =
            "BUY";

        button.addEventListener(
            "click",
            function() {

                buyItem(
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
   DISPLAY
   ========================================================= */

function displayShop() {

    const container =
        document.getElementById(
            "shop-items"
        );

    if (!container) {

        console.error(
            "StudySprint Shop: #shop-items was not found."
        );

        return;

    }

    container.innerHTML = "";

    const items =
        getCurrentShop();

    if (!items.length) {

        container.innerHTML =
            "<p>Shop failed to generate items.</p>";

        return;

    }

    items.forEach(
        function(item) {

            container.appendChild(
                createShopCard(item)
            );

        }
    );

}


/* =========================================================
   BUY
   ========================================================= */

function buyItem(item, button) {

    if (
        ownsItem(item.id)
    ) {

        return;

    }

    const coins =
        getCoins();

    if (
        coins < item.price
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


    const owned =
        getOwnedItems();

    owned.push(item.id);

    saveOwnedItems(
        owned
    );


    unlockItem(item);


    button.textContent =
        "OWNED";

    button.disabled =
        true;

    button.classList.add(
        "owned"
    );


    updateCurrency();

}


/* =========================================================
   CURRENCY
   ========================================================= */

function updateCurrency() {

    const element =
        document.getElementById(
            "coin-count"
        );

    if (!element) {

        return;

    }

    element.textContent =
        getCoins();

}


/* =========================================================
   COUNTDOWN
   ========================================================= */

function updateCountdown() {

    const element =
        document.getElementById(
            "shop-countdown"
        );

    if (!element) {

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
            remaining /
            86400000
        );

    remaining %= 86400000;


    const hours =
        Math.floor(
            remaining /
            3600000
        );

    remaining %= 3600000;


    const minutes =
        Math.floor(
            remaining /
            60000
        );

    remaining %= 60000;


    const seconds =
        Math.floor(
            remaining /
            1000
        );


    element.textContent =
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

        displayShop();

        updateCurrency();

        updateCountdown();

        setInterval(
            updateCountdown,
            1000
        );

    }
);


/* =========================================================
   PUBLIC
   ========================================================= */

window.SHOP_ITEMS =
    SHOP_ITEMS;

window.getCoins =
    getCoins;

window.setCoins =
    setCoins;

window.getOwnedItems =
    getOwnedItems;

window.saveOwnedItems =
    saveOwnedItems;

window.ownsItem =
    ownsItem;

window.getCurrentShop =
    getCurrentShop;

window.displayShop =
    displayShop;

window.rerollShop =
    rerollShop;

window.resetShopReroll =
    resetShopReroll;

window.createGoober =
    createGoober;
