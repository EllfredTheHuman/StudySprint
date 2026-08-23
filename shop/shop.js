```javascript
/* =========================================================
   STUDYSPRINT SHOP
   Custom Avatar Cosmetic Shop
   ========================================================= */


/* =========================================================
   SHOP SETTINGS
   ========================================================= */

const SHOP_SLOTS = 6;

const SHOP_INTERVAL =
    14 * 24 * 60 * 60 * 1000;


/* Sunday 10 August 2025, 12:00 AM AEST */
const SHOP_ANCHOR =
    Date.UTC(2025, 7, 9, 14, 0, 0);


/* =========================================================
   RARITIES
   ========================================================= */

const RARITIES = [
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
   =========================================================
   
   IMPORTANT:
   Hair, eyes and mouths are NOT shop items.
   
   These are always available as avatar customisation.
   ========================================================= */

const SHOP_ITEMS = [

    /* -------------------------
       HATS
       ------------------------- */

    {
        id: "cap",
        name: "Tech Cap",
        type: "Hat",
        rarity: "Common",
        price: 150,
        icon: "🧢"
    },

    {
        id: "beanie",
        name: "Pixel Beanie",
        type: "Hat",
        rarity: "Common",
        price: 175,
        icon: "🧶"
    },

    {
        id: "visor",
        name: "Neon Visor",
        type: "Hat",
        rarity: "Rare",
        price: 300,
        icon: "▱"
    },

    {
        id: "wizard",
        name: "Study Wizard",
        type: "Hat",
        rarity: "Epic",
        price: 500,
        icon: "♢"
    },

    {
        id: "crown",
        name: "Champion Crown",
        type: "Hat",
        rarity: "Legendary",
        price: 900,
        icon: "♛"
    },


    /* -------------------------
       ACCESSORIES
       ------------------------- */

    {
        id: "headphones",
        name: "Headphones",
        type: "Accessory",
        rarity: "Common",
        price: 200,
        icon: "◉"
    },

    {
        id: "glasses",
        name: "Tech Glasses",
        type: "Accessory",
        rarity: "Rare",
        price: 275,
        icon: "▣"
    },

    {
        id: "backpack",
        name: "Study Backpack",
        type: "Accessory",
        rarity: "Rare",
        price: 350,
        icon: "▰"
    },

    {
        id: "floating-orb",
        name: "Floating Orb",
        type: "Accessory",
        rarity: "Epic",
        price: 550,
        icon: "◈"
    },


    /* -------------------------
       OUTFITS
       ------------------------- */

    {
        id: "hoodie",
        name: "Sprint Hoodie",
        type: "Outfit",
        rarity: "Common",
        price: 250,
        icon: "▱"
    },

    {
        id: "lab-coat",
        name: "Science Coat",
        type: "Outfit",
        rarity: "Rare",
        price: 375,
        icon: "✚"
    },

    {
        id: "tech-suit",
        name: "Tech Suit",
        type: "Outfit",
        rarity: "Epic",
        price: 600,
        icon: "◇"
    },

    {
        id: "legend-suit",
        name: "Legend Suit",
        type: "Outfit",
        rarity: "Legendary",
        price: 1000,
        icon: "★"
    },


    /* -------------------------
       BANNERS
       ------------------------- */

    {
        id: "grid",
        name: "Digital Grid",
        type: "Banner",
        rarity: "Common",
        price: 100,
        icon: "▦"
    },

    {
        id: "blueprint",
        name: "Blueprint",
        type: "Banner",
        rarity: "Rare",
        price: 225,
        icon: "⌗"
    },

    {
        id: "neon",
        name: "Neon Circuit",
        type: "Banner",
        rarity: "Epic",
        price: 400,
        icon: "⌁"
    },

    {
        id: "galaxy",
        name: "Deep Space",
        type: "Banner",
        rarity: "Legendary",
        price: 750,
        icon: "✦"
    },


    /* -------------------------
       TITLES
       ------------------------- */

    {
        id: "sprinter",
        name: "Study Sprinter",
        type: "Title",
        rarity: "Common",
        price: 150,
        icon: ">"
    },

    {
        id: "brainiac",
        name: "Brainiac",
        type: "Title",
        rarity: "Rare",
        price: 300,
        icon: "?"
    },

    {
        id: "knowledge-seeker",
        name: "Knowledge Seeker",
        type: "Title",
        rarity: "Epic",
        price: 500,
        icon: "+"
    },

    {
        id: "study-legend",
        name: "Study Legend",
        type: "Title",
        rarity: "Legendary",
        price: 900,
        icon: "★"
    }

];


/* =========================================================
   OWNERSHIP
   ========================================================= */

function getOwnedItems() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "shopOwnedItems"
            )
        ) || [];

    } catch {

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
   COINS
   ========================================================= */

function getCoins() {

    return Number(
        localStorage.getItem("coins")
    ) || 0;

}


function setCoins(amount) {

    localStorage.setItem(
        "coins",
        String(amount)
    );

}


/* =========================================================
   UNLOCK COSMETIC
   ========================================================= */

function unlockItem(item) {

    const owned =
        getOwnedItems();

    if (!owned.includes(item.id)) {

        owned.push(item.id);

    }

    saveOwnedItems(owned);


    /*
       Keep separate cosmetic collections so the
       avatar editor can use them later.
    */

    let key = null;


    if (item.type === "Hat") {

        key = "unlocked_hats";

    }

    if (item.type === "Accessory") {

        key = "unlocked_accessories";

    }

    if (item.type === "Outfit") {

        key = "unlocked_outfits";

    }

    if (item.type === "Banner") {

        key = "unlocked_banners";

    }

    if (item.type === "Title") {

        key = "unlockedTitles";

    }


    if (!key) {

        return;

    }


    let unlocked = [];

    try {

        unlocked =
            JSON.parse(
                localStorage.getItem(key)
            ) || [];

    } catch {

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
   SHOP ROTATION
   ========================================================= */

function getShopStart() {

    const debugReset =
        localStorage.getItem(
            "shopDebugReset"
        );


    if (debugReset) {

        return Number(
            debugReset
        );

    }


    const now =
        Date.now();


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
   RARITY ROLL
   ========================================================= */

function rollRarity(random) {

    let total = 0;


    for (const rarity of RARITIES) {

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
   GET CURRENT SHOP
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

    const used =
        new Set();


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
                item =>
                    item.rarity === rarity &&
                    !used.has(item.id)
            );


        if (!candidates.length) {

            candidates =
                SHOP_ITEMS.filter(
                    item =>
                        !used.has(item.id)
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


        const item =
            candidates[
                Math.floor(
                    random *
                    candidates.length
                )
            ];


        used.add(item.id);

        result.push(item);

    }


    return result;

}


/* =========================================================
   COSMETIC PREVIEW
   =========================================================
   
   IMPORTANT:
   Cosmetics are displayed by themselves.
   They are NOT placed on an avatar.
   ========================================================= */

function createCosmeticPreview(item) {

    const preview =
        document.createElement("div");

    preview.className =
        "cosmetic-preview " +
        "preview-" +
        item.type.toLowerCase();


    const icon =
        document.createElement("div");

    icon.className =
        "cosmetic-icon";


    icon.textContent =
        item.icon || "◆";


    const glow =
        document.createElement("div");

    glow.className =
        "cosmetic-glow";


    preview.appendChild(glow);
    preview.appendChild(icon);


    return preview;

}


/* =========================================================
   SHOP CARD
   ========================================================= */

function createShopCard(item) {

    const card =
        document.createElement("article");

    card.className =
        "shop-card " +
        "rarity-" +
        item.rarity.toLowerCase();


    const rarity =
        document.createElement("span");

    rarity.className =
        "shop-rarity";

    rarity.textContent =
        item.rarity;


    const preview =
        createCosmeticPreview(item);


    const name =
        document.createElement("h3");

    name.textContent =
        item.name;


    const type =
        document.createElement("p");

    type.className =
        "shop-type";

    type.textContent =
        item.type;


    const bottom =
        document.createElement("div");

    bottom.className =
        "shop-card-bottom";


    const price =
        document.createElement("span");

    price.className =
        "shop-price";

    price.textContent =
        item.price +
        " 🪙";


    const button =
        document.createElement("button");

    button.className =
        "shop-buy-button";


    if (ownsItem(item.id)) {

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

        button.onclick =
            function() {

                buyItem(
                    item,
                    button
                );

            };

    }


    bottom.appendChild(price);
    bottom.appendChild(button);


    card.appendChild(rarity);
    card.appendChild(preview);
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(bottom);


    return card;

}


/* =========================================================
   DISPLAY SHOP
   ========================================================= */

function displayShop() {

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


    items.forEach(
        item => {

            container.appendChild(
                createShopCard(item)
            );

        }
    );

}


/* =========================================================
   BUY ITEM
   ========================================================= */

function buyItem(item, button) {

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
        coins -
        item.price
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
   CURRENCY DISPLAY
   ========================================================= */

function updateCurrency() {

    const element =
        document.getElementById(
            "coin-count"
        );


    if (element) {

        element.textContent =
            getCoins();

    }

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
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

}


/* =========================================================
   DEBUG REROLL
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
   PUBLIC FUNCTIONS
   ========================================================= */

window.getCoins =
    getCoins;

window.setCoins =
    setCoins;

window.getOwnedItems =
    getOwnedItems;

window.ownsItem =
    ownsItem;

window.getCurrentShop =
    getCurrentShop;

window.rerollShop =
    rerollShop;

window.resetShopReroll =
    resetShopReroll;

window.SHOP_ITEMS =
    SHOP_ITEMS;
```
