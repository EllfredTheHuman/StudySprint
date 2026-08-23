/* =========================================================
   STUDYSPRINT SHOP
   Banners + Titles + Frames
   Coins only
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const SHOP_SLOTS = 6;

const SHOP_INTERVAL =
    14 * 24 * 60 * 60 * 1000;


/*
   Rotation anchor.
   The shop changes every 14 days.
*/

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

    /* =========================
       BANNERS
    ========================= */

    {
        id: "sprint-grid",
        name: "Sprint Grid",
        type: "Banner",
        rarity: "Common",
        price: 100,
        design: "grid"
    },

    {
        id: "blue-grid",
        name: "Blue Grid",
        type: "Banner",
        rarity: "Common",
        price: 125,
        design: "blue-grid"
    },

    {
        id: "purple-grid",
        name: "Purple Grid",
        type: "Banner",
        rarity: "Rare",
        price: 175,
        design: "purple-grid"
    },

    {
        id: "neon-blue",
        name: "Neon Blue",
        type: "Banner",
        rarity: "Rare",
        price: 225,
        design: "neon"
    },

    {
        id: "aurora",
        name: "Aurora",
        type: "Banner",
        rarity: "Epic",
        price: 325,
        design: "aurora"
    },

    {
        id: "galaxy-banner",
        name: "Galaxy",
        type: "Banner",
        rarity: "Epic",
        price: 400,
        design: "galaxy"
    },

    {
        id: "cyber-grid",
        name: "Cyber Grid",
        type: "Banner",
        rarity: "Mythic",
        price: 550,
        design: "cyber"
    },

    {
        id: "gold-banner",
        name: "Golden",
        type: "Banner",
        rarity: "Legendary",
        price: 700,
        design: "gold"
    },


    /* =========================
       TITLES
    ========================= */

    {
        id: "study-sprinter",
        name: "Study Sprinter",
        type: "Title",
        rarity: "Common",
        price: 150
    },

    {
        id: "brainiac",
        name: "Brainiac",
        type: "Title",
        rarity: "Rare",
        price: 275
    },

    {
        id: "speed-learner",
        name: "Speed Learner",
        type: "Title",
        rarity: "Epic",
        price: 425
    },

    {
        id: "knowledge-seeker",
        name: "Knowledge Seeker",
        type: "Title",
        rarity: "Mythic",
        price: 650
    },

    {
        id: "study-legend",
        name: "Study Legend",
        type: "Title",
        rarity: "Legendary",
        price: 1000
    },


    /* =========================
       FRAMES
    ========================= */

    {
        id: "simple-frame",
        name: "Simple",
        type: "Frame",
        rarity: "Common",
        price: 125,
        design: "simple"
    },

    {
        id: "blue-frame",
        name: "Blue",
        type: "Frame",
        rarity: "Common",
        price: 150,
        design: "blue"
    },

    {
        id: "purple-frame",
        name: "Purple",
        type: "Frame",
        rarity: "Rare",
        price: 225,
        design: "purple"
    },

    {
        id: "cyan-frame",
        name: "Cyan",
        type: "Frame",
        rarity: "Rare",
        price: 250,
        design: "cyan"
    },

    {
        id: "pink-frame",
        name: "Pink",
        type: "Frame",
        rarity: "Epic",
        price: 350,
        design: "pink"
    },

    {
        id: "fire-frame",
        name: "Fire",
        type: "Frame",
        rarity: "Epic",
        price: 450,
        design: "fire"
    },

    {
        id: "cosmic-frame",
        name: "Cosmic",
        type: "Frame",
        rarity: "Mythic",
        price: 650,
        design: "cosmic"
    },

    {
        id: "gold-frame",
        name: "Golden Frame",
        type: "Frame",
        rarity: "Legendary",
        price: 1000,
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
        String(Math.max(0, Number(value)))
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


/* =========================================================
   EQUIPPED PROFILE ITEMS
========================================================= */

function getEquippedItem(type) {

    if (type === "Banner") {

        return localStorage.getItem(
            "profileBanner"
        ) || "blue-grid";

    }

    if (type === "Title") {

        return localStorage.getItem(
            "profileTitle"
        ) || "";

    }

    if (type === "Frame") {

        return localStorage.getItem(
            "profileFrame"
        ) || "simple-frame";

    }

    return "";

}


function equipItem(item) {

    if (item.type === "Banner") {

        localStorage.setItem(
            "profileBanner",
            item.id
        );

    }

    else if (item.type === "Title") {

        localStorage.setItem(
            "profileTitle",
            item.id
        );

    }

    else if (item.type === "Frame") {

        localStorage.setItem(
            "profileFrame",
            item.id
        );

    }

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
   SHOP START
========================================================= */

function getShopStart() {

    const debugReset =
        localStorage.getItem(
            "shopDebugReset"
        );


    if (debugReset) {

        return Number(debugReset);

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
        const rarity of RARITY_CHANCES
    ) {

        total += rarity.weight;


        if (
            random * 100 < total
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
        Math.floor(start / 1000) +
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


        if (
            candidates.length === 0
        ) {

            candidates =
                SHOP_ITEMS.filter(
                    function(item) {

                        return !used.has(
                            item.id
                        );

                    }
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


        used.add(item.id);

        result.push(item);

    }


    return result;

}


/* =========================================================
   PREVIEWS
========================================================= */

function createBannerPreview(item) {

    const element =
        document.createElement("div");

    element.className =
        "shop-banner-preview shop-banner-" +
        item.design;

    return element;

}


function createTitlePreview(item) {

    const element =
        document.createElement("div");

    element.className =
        "shop-title-preview";


    if (
        item.rarity === "Epic"
    ) {

        element.classList.add(
            "shop-title-epic"
        );

    }

    if (
        item.rarity === "Mythic"
    ) {

        element.classList.add(
            "shop-title-mythic"
        );

    }

    if (
        item.rarity === "Legendary"
    ) {

        element.classList.add(
            "shop-title-legendary"
        );

    }


    element.textContent =
        item.name;


    return element;

}


function createFramePreview(item) {

    const frame =
        document.createElement("div");

    frame.className =
        "shop-frame-preview frame-" +
        item.design;


    const text =
        document.createElement("span");

    text.textContent =
        "PROFILE";


    frame.appendChild(
        text
    );


    return frame;

}


function createPreview(item) {

    if (
        item.type === "Banner"
    ) {

        return createBannerPreview(
            item
        );

    }


    if (
        item.type === "Title"
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
                    item,
                    button
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


    if (
        !owned.includes(item.id)
    ) {

        owned.push(
            item.id
        );

    }


    saveOwnedItems(
        owned
    );


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
   MOD: GIVE COINS
========================================================= */

function giveModCoins() {

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
        amount <= 0
    ) {

        modStatus(
            "Enter a valid coin amount."
        );

        return;

    }


    setCoins(
        getCoins() +
        Math.floor(amount)
    );


    updateCurrency();


    modStatus(
        "Added " +
        Math.floor(amount) +
        " coins."
    );

}


/* =========================================================
   MOD: GIVE ITEM
========================================================= */

function giveModItem() {

    const select =
        document.getElementById(
            "mod-item"
        );


    const quantityInput =
        document.getElementById(
            "mod-quantity"
        );


    const id =
        select.value;


    const quantity =
        Math.floor(
            Number(
                quantityInput.value
            )
        );


    if (
        !Number.isFinite(quantity) ||
        quantity <= 0
    ) {

        modStatus(
            "Enter a valid quantity."
        );

        return;

    }


    const owned =
        getOwnedItems();


    /*
       Cosmetic items only need to be owned
       once, so the quantity is treated as
       "give this many copies", with ownership
       recorded after the first copy.
    */

    if (
        !owned.includes(id)
    ) {

        owned.push(id);

    }


    saveOwnedItems(
        owned
    );


    const item =
        SHOP_ITEMS.find(
            function(shopItem) {

                return shopItem.id === id;

            }
        );


    modStatus(
        "Gave " +
        quantity +
        " × " +
        item.name +
        "."
    );


    displayShop();

}


/* =========================================================
   MOD: REROLL
========================================================= */

function rerollShop() {

    localStorage.setItem(
        "shopRerollSeed",
        String(Date.now())
    );


    displayShop();


    modStatus(
        "Shop rerolled."
    );

}


/* =========================================================
   MOD: RESET ROTATION
========================================================= */

function resetShopRotation() {

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


/* =========================================================
   MOD PANEL OPEN/CLOSE
========================================================= */

function openModPanel() {

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


function closeModPanel() {

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
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayShop();

        updateCurrency();

        updateCountdown();

        populateModItems();


        setInterval(
            updateCountdown,
            1000
        );


        const modButton =
            document.getElementById(
                "mod-button"
            );


        if (modButton) {

            modButton.addEventListener(
                "click",
                openModPanel
            );

        }


        const closeButton =
            document.getElementById(
                "close-mod"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeModPanel
            );

        }


        const overlay =
            document.getElementById(
                "mod-overlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target ===
                        overlay
                    ) {

                        closeModPanel();

                    }

                }
            );

        }


        const giveCoins =
            document.getElementById(
                "give-coins"
            );


        if (giveCoins) {

            giveCoins.addEventListener(
                "click",
                giveModCoins
            );

        }


        const giveItem =
            document.getElementById(
                "give-item"
            );


        if (giveItem) {

            giveItem.addEventListener(
                "click",
                giveModItem
            );

        }


        const reroll =
            document.getElementById(
                "mod-reroll"
            );


        if (reroll) {

            reroll.addEventListener(
                "click",
                rerollShop
            );

        }


        const reset =
            document.getElementById(
                "mod-reset"
            );


        if (reset) {

            reset.addEventListener(
                "click",
                resetShopRotation
            );

        }

    }
);


/* =========================================================
   PUBLIC API
========================================================= */

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

window.equipItem =
    equipItem;

window.SHOP_ITEMS =
    SHOP_ITEMS;
