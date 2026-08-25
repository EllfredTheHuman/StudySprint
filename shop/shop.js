```javascript
/* =========================================================
   STUDYSPRINT SHOP
   Banner + Title + Frame Shop
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const SHOP_SLOTS = 6;

const SHOP_INTERVAL =
    14 * 24 * 60 * 60 * 1000;


/*
   Shop rotation anchor.
*/

const SHOP_ANCHOR =
    Date.UTC(2025, 7, 9, 14, 0, 0);


/* =========================================================
   RARITY
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

    /* =========================
       BANNERS
    ========================= */

    {
        id: "sprint-grid",
        name: "Sprint Grid",
        type: "Banner",
        rarity: "Common",
        price: 100,
        design: "sprint-grid"
    },

    {
        id: "purple-grid",
        name: "Purple Grid",
        type: "Banner",
        rarity: "Common",
        price: 125,
        design: "purple-grid"
    },

    {
        id: "neon-blue",
        name: "Neon Blue",
        type: "Banner",
        rarity: "Rare",
        price: 175,
        design: "neon-blue"
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


    /* =========================
       TITLES
    ========================= */

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
    },


    /* =========================
       FRAMES
    ========================= */

    {
        id: "blue-frame",
        name: "Blue Frame",
        type: "Frame",
        rarity: "Common",
        price: 150,
        design: "blue"
    },

    {
        id: "purple-frame",
        name: "Purple Frame",
        type: "Frame",
        rarity: "Rare",
        price: 250,
        design: "purple"
    },

    {
        id: "pink-frame",
        name: "Pink Frame",
        type: "Frame",
        rarity: "Rare",
        price: 300,
        design: "pink"
    },

    {
        id: "cyan-frame",
        name: "Cyan Frame",
        type: "Frame",
        rarity: "Epic",
        price: 400,
        design: "cyan"
    },

    {
        id: "fire-frame",
        name: "Fire Frame",
        type: "Frame",
        rarity: "Mythic",
        price: 550,
        design: "fire"
    },

    {
        id: "gold-frame",
        name: "Golden Frame",
        type: "Frame",
        rarity: "Legendary",
        price: 750,
        design: "gold"
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
        String(Math.max(0, Number(value) || 0))
    );

}


/* =========================================================
   OWNED ITEMS
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


function saveOwnedItems(items) {

    localStorage.setItem(
        "shopOwnedItems",
        JSON.stringify(items)
    );

}


function ownsItem(id) {

    return getOwnedItems().includes(id);

}


function unlockItem(id) {

    const owned =
        getOwnedItems();


    if (
        !owned.includes(id)
    ) {

        owned.push(id);

    }


    saveOwnedItems(
        owned
    );

}


/* =========================================================
   SEEDED RANDOM
========================================================= */

function seededRandom(seed) {

    let value =
        Number(seed) % 2147483647;


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


    for (
        const rarity
        of RARITY_CHANCES
    ) {

        total +=
            rarity.weight;


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


    const rerollSeed =
        Number(
            localStorage.getItem(
                "shopRerollSeed"
            )
        ) || 0;


    const baseSeed =
        Math.floor(
            start / 1000
        ) +
        rerollSeed;


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
                baseSeed +
                slot * 7919
            );


        const rarity =
            rollRarity(
                random
            );


        let candidates =
            SHOP_ITEMS.filter(
                item =>
                    item.rarity === rarity &&
                    !used.has(item.id)
            );


        if (
            candidates.length === 0
        ) {

            candidates =
                SHOP_ITEMS.filter(
                    item =>
                        !used.has(item.id)
                );

        }


        if (
            candidates.length === 0
        ) {

            break;

        }


        random =
            seededRandom(
                baseSeed +
                slot * 15485863
            );


        const index =
            Math.floor(
                random *
                candidates.length
            );


        const item =
            candidates[index];


        used.add(
            item.id
        );


        result.push(
            item
        );

    }


    return result;

}


/* =========================================================
   BANNER PREVIEW
========================================================= */

function createBannerPreview(item) {

    const banner =
        document.createElement("div");


    banner.className =
        "shop-banner-preview";


    /*
       IMPORTANT:
       These class names exactly match shop.css.
    */

    const designClasses = {

        "sprint-grid":
            "shop-banner-grid",

        "purple-grid":
            "shop-banner-purple",

        "neon-blue":
            "shop-banner-neon",

        "galaxy":
            "shop-banner-galaxy",

        "gold":
            "shop-banner-gold"

    };


    const designClass =
        designClasses[
            item.design
        ];


    if (designClass) {

        banner.classList.add(
            designClass
        );

    }


    return banner;

}


/* =========================================================
   TITLE PREVIEW
========================================================= */

function createTitlePreview(item) {

    const title =
        document.createElement("div");


    title.className =
        "shop-title-preview";


    if (
        item.rarity === "Epic"
    ) {

        title.classList.add(
            "shop-title-epic"
        );

    }

    else if (
        item.rarity === "Mythic"
    ) {

        title.classList.add(
            "shop-title-mythic"
        );

    }

    else if (
        item.rarity === "Legendary"
    ) {

        title.classList.add(
            "shop-title-legendary"
        );

    }


    title.textContent =
        item.name;


    return title;

}


/* =========================================================
   FRAME PREVIEW
========================================================= */

function createFramePreview(item) {

    const frame =
        document.createElement("div");


    frame.className =
        "shop-frame-preview";


    const designClass =
        "frame-" +
        item.design;


    frame.classList.add(
        designClass
    );


    const text =
        document.createElement("span");


    text.textContent =
        "PROFILE";


    frame.appendChild(
        text
    );


    return frame;

}


/* =========================================================
   PREVIEW
========================================================= */

function createPreview(item) {

    if (
        item.type === "Banner"
    ) {

        return createBannerPreview(
            item
        );

    }


    if (
        item.type === "Player Title"
    ) {

        return createTitlePreview(
            item
        );

    }


    if (
        item.type === "Frame"
    ) {

        return createFramePreview(
            item
        );

    }


    return document.createElement(
        "div"
    );

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
        document.createElement(
            "article"
        );


    card.className =
        "shop-card " +
        getRarityClass(
            item.rarity
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


    type.className =
        "item-type";


    type.textContent =
        item.type;


    const price =
        document.createElement(
            "div"
        );


    price.className =
        "shop-price";


    price.textContent =
        item.price +
        " Coins";


    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


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

    }

    else {

        button.textContent =
            "BUY";


        button.addEventListener(
            "click",
            function() {

                buyItem(
                    item
                );

            }
        );

    }


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
        type
    );

    card.appendChild(
        price
    );

    card.appendChild(
        button
    );


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

function buyItem(item) {

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


    unlockItem(
        item.id
    );


    updateCurrency();

    displayShop();

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
   MOD PANEL
========================================================= */

function populateModItems() {

    const select =
        document.getElementById(
            "mod-item"
        );


    if (!select) {

        return;

    }


    select.innerHTML = "";


    SHOP_ITEMS.forEach(
        function(item) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                item.id;


            option.textContent =
                item.name +
                " — " +
                item.type +
                " — " +
                item.rarity;


            select.appendChild(
                option
            );

        }
    );

}


/* =========================================================
   MOD STATUS
========================================================= */

function modStatus(message) {

    const element =
        document.getElementById(
            "mod-status"
        );


    if (element) {

        element.textContent =
            message;

    }

}


/* =========================================================
   MOD OPEN/CLOSE
========================================================= */

function openMod() {

    const overlay =
        document.getElementById(
            "mod-overlay"
        );


    if (overlay) {

        overlay.classList.add(
            "open"
        );

    }

}


function closeMod() {

    const overlay =
        document.getElementById(
            "mod-overlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   MOD ACTIONS
========================================================= */

function giveCoins() {

    const input =
        document.getElementById(
            "mod-coins"
        );


    const amount =
        Number(
            input.value
        );


    if (
        !Number.isFinite(amount) ||
        amount < 0
    ) {

        modStatus(
            "Enter a valid amount."
        );

        return;

    }


    setCoins(
        getCoins() +
        amount
    );


    updateCurrency();


    input.value =
        "";


    modStatus(
        "Added " +
        amount +
        " coins."
    );

}


function modUnlockItem() {

    const select =
        document.getElementById(
            "mod-item"
        );


    if (!select) {

        return;

    }


    const id =
        select.value;


    const item =
        SHOP_ITEMS.find(
            shopItem =>
                shopItem.id === id
        );


    if (!item) {

        return;

    }


    unlockItem(
        item.id
    );


    displayShop();


    modStatus(
        "Unlocked " +
        item.name +
        "."
    );

}


function rerollShop() {

    localStorage.setItem(
        "shopRerollSeed",
        String(
            Date.now()
        )
    );


    displayShop();


    modStatus(
        "Shop rerolled."
    );

}


function resetShop() {

    localStorage.removeItem(
        "shopRerollSeed"
    );

    localStorage.removeItem(
        "shopDebugReset"
    );


    displayShop();


    modStatus(
        "Shop rotation reset."
    );

}


function clearOwnedItems() {

    const confirmed =
        confirm(
            "Clear all shop items from your account?"
        );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(
        "shopOwnedItems"
    );


    displayShop();


    modStatus(
        "Shop ownership cleared."
    );

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupModPanel() {

    const modButton =
        document.getElementById(
            "mod-button"
        );


    const closeButton =
        document.getElementById(
            "close-mod"
        );


    const overlay =
        document.getElementById(
            "mod-overlay"
        );


    const giveCoinsButton =
        document.getElementById(
            "give-coins"
        );


    const unlockButton =
        document.getElementById(
            "unlock-item"
        );


    const rerollButton =
        document.getElementById(
            "reroll-shop"
        );


    const resetButton =
        document.getElementById(
            "reset-shop"
        );


    const clearButton =
        document.getElementById(
            "clear-owned"
        );


    if (modButton) {

        modButton.addEventListener(
            "click",
            openMod
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeMod
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === overlay
                ) {

                    closeMod();

                }

            }
        );

    }


    if (giveCoinsButton) {

        giveCoinsButton.addEventListener(
            "click",
            giveCoins
        );

    }


    if (unlockButton) {

        unlockButton.addEventListener(
            "click",
            modUnlockItem
        );

    }


    if (rerollButton) {

        rerollButton.addEventListener(
            "click",
            rerollShop
        );

    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetShop
        );

    }


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            clearOwnedItems
        );

    }

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

        populateModItems();

        setupModPanel();


        setInterval(
            updateCountdown,
            1000
        );

    }
);


/* =========================================================
   PUBLIC API
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

window.unlockItem =
    unlockItem;

window.getCurrentShop =
    getCurrentShop;

window.displayShop =
    displayShop;

window.rerollShop =
    rerollShop;
```
