/* =========================================================
   STUDYSPRINT SHOP
   Characters + Banners + Effects
========================================================= */


/* =========================================================
   SHOP SETTINGS
========================================================= */

const SHOP_REFRESH_TIME =
    14 * 24 * 60 * 60 * 1000;


/* =========================================================
   FORTNIGHTLY SHOP ITEMS
========================================================= */

const SHOP_ITEMS = [

    /* =========================================
       CHARACTER 1
    ========================================== */

    {
        id: "lightning",
        name: "Lightning",
        rarity: "Common",
        type: "Character",
        theme: "lightning",
        price: 150
    },

    {
        id: "sprout",
        name: "Sprout",
        rarity: "Common",
        type: "Character",
        theme: "sprout",
        price: 150
    },

    {
        id: "ice",
        name: "Ice",
        rarity: "Common",
        type: "Character",
        theme: "ice",
        price: 175
    },

    {
        id: "flame",
        name: "Flame",
        rarity: "Rare",
        type: "Character",
        theme: "flame",
        price: 200
    },

    {
        id: "berry",
        name: "Berry",
        rarity: "Common",
        type: "Character",
        theme: "berry",
        price: 150
    },

    {
        id: "lemon",
        name: "Lemon",
        rarity: "Common",
        type: "Character",
        theme: "lemon",
        price: 150
    },

    {
        id: "cloud",
        name: "Cloud",
        rarity: "Common",
        type: "Character",
        theme: "cloud",
        price: 175
    },

    {
        id: "moon",
        name: "Moon",
        rarity: "Rare",
        type: "Character",
        theme: "moon",
        price: 225
    },

    {
        id: "sun",
        name: "Sun",
        rarity: "Rare",
        type: "Character",
        theme: "sun",
        price: 225
    },

    {
        id: "mushroom",
        name: "Mushroom",
        rarity: "Rare",
        type: "Character",
        theme: "mushroom",
        price: 250
    },

    {
        id: "frog",
        name: "Frog",
        rarity: "Rare",
        type: "Character",
        theme: "frog",
        price: 250
    },

    {
        id: "bee",
        name: "Bee",
        rarity: "Rare",
        type: "Character",
        theme: "bee",
        price: 250
    },

    {
        id: "fish",
        name: "Fish",
        rarity: "Rare",
        type: "Character",
        theme: "fish",
        price: 275
    },

    {
        id: "butterfly",
        name: "Butterfly",
        rarity: "Ultra Rare",
        type: "Character",
        theme: "butterfly",
        price: 325
    },

    {
        id: "dino",
        name: "Dino",
        rarity: "Ultra Rare",
        type: "Character",
        theme: "dino",
        price: 350
    },

    {
        id: "robot",
        name: "Robot",
        rarity: "Ultra Rare",
        type: "Character",
        theme: "robot",
        price: 375
    },

    {
        id: "ghost",
        name: "Ghost",
        rarity: "Ultra Rare",
        type: "Character",
        theme: "ghost",
        price: 400
    },

    {
        id: "lab",
        name: "Lab",
        rarity: "Ultra Rare",
        type: "Character",
        theme: "lab",
        price: 400
    },

    {
        id: "artist",
        name: "Artist",
        rarity: "Mythic",
        type: "Character",
        theme: "artist",
        price: 500
    },

    {
        id: "rocket",
        name: "Rocket",
        rarity: "Mythic",
        type: "Character",
        theme: "rocket",
        price: 550
    },


    /* =========================================
       BANNERS
    ========================================== */

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
        rarity: "Common",
        type: "Banner",
        price: 150
    },


    /* =========================================
       COMMON COIN EFFECTS
    ========================================== */

    {
        id: "sparkle",
        name: "Sparkle Effect",
        rarity: "Common",
        type: "Effect",
        theme: "sparkle",
        price: 200
    },

    {
        id: "speed-trail",
        name: "Speed Trail",
        rarity: "Common",
        type: "Effect",
        theme: "speed-trail",
        price: 250
    },

    {
        id: "rainbow",
        name: "Rainbow Aura",
        rarity: "Rare",
        type: "Effect",
        theme: "rainbow",
        price: 350
    }

];


/* =========================================================
   STUDYPASS CHARACTERS
========================================================= */

const STUDYPASS_CHARACTERS = [

    {
        id: "galaxy",
        name: "Galaxy",
        rarity: "Legendary",
        type: "Character",
        theme: "galaxy"
    },

    {
        id: "champion",
        name: "Champion",
        rarity: "Legendary",
        type: "Character",
        theme: "champion"
    }

];


/* =========================================================
   TICKET SHOP
========================================================= */

const TICKET_ITEMS = [

    {
        id: "lightning-ticket",
        name: "Lightning Effect",
        description:
            "Electric sparks surround your character.",
        type: "Effect",
        effectId: "lightning",
        price: 35
    },

    {
        id: "fire",
        name: "Fire Aura",
        description:
            "A fiery glow surrounds your character.",
        type: "Effect",
        effectId: "fire",
        price: 75
    },

    {
        id: "glitch",
        name: "Glitch Effect",
        description:
            "A strange digital effect surrounds your character.",
        type: "Effect",
        effectId: "glitch",
        price: 100
    },

    {
        id: "shadow",
        name: "Shadow Aura",
        description:
            "A dark shadow surrounds your character.",
        type: "Effect",
        effectId: "shadow",
        price: 150
    },

    {
        id: "crystal",
        name: "Crystal Glow",
        description:
            "A bright crystalline glow surrounds your character.",
        type: "Effect",
        effectId: "crystal",
        price: 250
    },

    {
        id: "cosmic",
        name: "Cosmic Aura",
        description:
            "Stars and cosmic particles surround your character.",
        type: "Effect",
        effectId: "cosmic",
        price: 500
    },

    {
        id: "crown",
        name: "Crown + Glow",
        description:
            "The extremely rare glowing crown.",
        type: "Effect",
        effectId: "crown",
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


function getTickets() {

    return Number(
        localStorage.getItem("shopTickets")
    ) || 0;

}


function setCoins(amount) {

    localStorage.setItem(
        "coins",
        amount
    );

}


function setTickets(amount) {

    localStorage.setItem(
        "shopTickets",
        amount
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

    return getOwnedItems()
        .includes(id);

}


/* =========================================================
   UNLOCK ITEM
========================================================= */

function unlockItem(
    id,
    type
) {

    let storageKey = null;


    if (
        type === "Character"
    ) {

        storageKey =
            "unlocked_characters";

    }

    else if (
        type === "Banner"
    ) {

        storageKey =
            "unlocked_banners";

    }

    else if (
        type === "Effect"
    ) {

        storageKey =
            "unlocked_effects";

    }


    if (!storageKey) {

        console.error(
            "Unknown item type:",
            type,
            id
        );

        return;

    }


    let unlocked = [];


    try {

        unlocked =
            JSON.parse(
                localStorage.getItem(
                    storageKey
                )
            ) || [];

    }

    catch {

        unlocked = [];

    }


    if (
        !unlocked.includes(id)
    ) {

        unlocked.push(id);

    }


    localStorage.setItem(
        storageKey,
        JSON.stringify(unlocked)
    );

}


/* =========================================================
   SAVE OWNED ITEM
========================================================= */

function savePurchase(
    itemId,
    type
) {

    unlockItem(
        itemId,
        type
    );


    const owned =
        getOwnedItems();


    if (
        !owned.includes(itemId)
    ) {

        owned.push(itemId);

    }


    saveOwnedItems(
        owned
    );

}


/* =========================================================
   CHARACTER PREVIEW
========================================================= */

function createCharacterPreview(
    theme
) {

    const character =
        document.createElement(
            "div"
        );

    character.className =
        "shop-character";


    character.classList.add(
        "character-" + theme
    );


    const body =
        document.createElement(
            "div"
        );

    body.className =
        "shop-character-body";


    const face =
        document.createElement(
            "div"
        );

    face.className =
        "shop-character-face";


    character.appendChild(
        body
    );

    character.appendChild(
        face
    );


    return character;

}


/* =========================================================
   BANNER PREVIEW
========================================================= */

function createBannerPreview(
    id
) {

    const banner =
        document.createElement(
            "div"
        );

    banner.className =
        "shop-banner-preview";


    banner.classList.add(
        "banner-" + id
    );


    return banner;

}


/* =========================================================
   EFFECT PREVIEW
========================================================= */

function createEffectPreview(
    theme
) {

    const preview =
        document.createElement(
            "div"
        );

    preview.className =
        "shop-effect-preview";


    preview.classList.add(
        "effect-" + theme
    );


    return preview;

}


/* =========================================================
   ITEM PREVIEW
========================================================= */

function createItemPreview(
    item
) {

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "item-preview";


    if (
        item.type === "Character"
    ) {

        wrapper.appendChild(
            createCharacterPreview(
                item.theme
            )
        );

    }

    else if (
        item.type === "Banner"
    ) {

        wrapper.appendChild(
            createBannerPreview(
                item.id
            )
        );

    }

    else if (
        item.type === "Effect"
    ) {

        wrapper.appendChild(
            createEffectPreview(
                item.theme
            )
        );

    }


    return wrapper;

}


/* =========================================================
   GENERATE FORTNIGHTLY SHOP
========================================================= */

function generateShop() {

    const shuffled =
        [...SHOP_ITEMS]
            .sort(
                () =>
                    Math.random() - 0.5
            );


    const selected =
        shuffled
            .slice(0, 8)
            .map(
                item =>
                    item.id
            );


    localStorage.setItem(
        "fortnightlyShopItems",
        JSON.stringify(selected)
    );


    localStorage.setItem(
        "fortnightlyShopStart",
        Date.now()
    );


    return selected;

}


/* =========================================================
   CURRENT SHOP
========================================================= */

function getCurrentShop() {

    let items = null;


    try {

        items =
            JSON.parse(
                localStorage.getItem(
                    "fortnightlyShopItems"
                )
            );

    }

    catch {

        items = null;

    }


    const start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || 0;


    if (
        !Array.isArray(items) ||
        items.length !== 8 ||
        !start
    ) {

        return generateShop();

    }


    if (
        Date.now() - start >=
        SHOP_REFRESH_TIME
    ) {

        return generateShop();

    }


    return items;

}


/* =========================================================
   DISPLAY MAIN SHOP
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


    const currentShop =
        getCurrentShop();


    currentShop.forEach(
        id => {

            const item =
                SHOP_ITEMS.find(
                    x =>
                        x.id === id
                );


            if (!item)
                return;


            createShopCard(
                item,
                container
            );

        }
    );


    updateCurrency();

}


/* =========================================================
   CREATE SHOP CARD
========================================================= */

function createShopCard(
    item,
    container
) {

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "shop-card";


    const rarity =
        document.createElement(
            "div"
        );

    rarity.className =
        "rarity";


    rarity.textContent =
        item.rarity;


    const preview =
        createItemPreview(
            item
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
        ownsItem(
            item.id
        )
    ) {

        button.textContent =
            "OWNED";

        button.disabled =
            true;

    }

    else {

        button.textContent =
            "BUY";


        button.addEventListener(
            "click",
            () => {

                buyMainItem(
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


    container.appendChild(
        card
    );

}


/* =========================================================
   BUY MAIN ITEM
========================================================= */

function buyMainItem(
    item,
    button
) {

    if (
        ownsItem(
            item.id
        )
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


    savePurchase(
        item.id,
        item.type
    );


    button.disabled =
        true;


    button.textContent =
        "OWNED";


    updateCurrency();


    console.log(
        "Purchased:",
        item.name
    );

}


/* =========================================================
   DISPLAY TICKET SHOP
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


            if (
                item.id === "crown"
            ) {

                card.classList.add(
                    "crown-card"
                );

            }


            const preview =
                document.createElement(
                    "div"
                );


            preview.className =
                "ticket-item-preview";


            preview.appendChild(
                createEffectPreview(
                    item.effectId
                )
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
                item.price +
                " Shop Tickets";


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "buy-button";


            if (
                ownsItem(
                    item.id
                )
            ) {

                button.textContent =
                    "OWNED";

                button.disabled =
                    true;

            }

            else {

                button.textContent =
                    "BUY";


                button.addEventListener(
                    "click",
                    () => {

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

function buyTicketItem(
    item,
    button
) {

    if (
        ownsItem(
            item.id
        )
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


    savePurchase(
        item.id,
        item.type
    );


    button.disabled =
        true;


    button.textContent =
        "OWNED";


    updateCurrency();

}


/* =========================================================
   STUDYPASS CHARACTERS
========================================================= */

function getStudyPassCharacters() {

    return STUDYPASS_CHARACTERS;

}


/* =========================================================
   CURRENCY UI
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

    const element =
        document.getElementById(
            "countdown"
        );


    if (!element)
        return;


    let start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || 0;


    if (!start) {

        getCurrentShop();


        start =
            Number(
                localStorage.getItem(
                    "fortnightlyShopStart"
                )
            );

    }


    let remaining =
        start +
        SHOP_REFRESH_TIME -
        Date.now();


    if (
        remaining <= 0
    ) {

        generateShop();

        displayMainShop();


        start =
            Number(
                localStorage.getItem(
                    "fortnightlyShopStart"
                )
            );


        remaining =
            start +
            SHOP_REFRESH_TIME -
            Date.now();

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


    const ticket =
        document.getElementById(
            "ticket-shop"
        );


    main.style.display =
        "none";


    ticket.style.display =
        "block";


    document
        .getElementById(
            "main-shop-button"
        )
        .classList.remove(
            "active"
        );


    document
        .getElementById(
            "ticket-shop-button"
        )
        .classList.add(
            "active"
        );


    displayTicketShop();

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


    ticket.style.display =
        "none";


    main.style.display =
        "block";


    document
        .getElementById(
            "ticket-shop-button"
        )
        .classList.remove(
            "active"
        );


    document
        .getElementById(
            "main-shop-button"
        )
        .classList.add(
            "active"
        );


    displayMainShop();

}


/* =========================================================
   DEBUG SYSTEM
========================================================= */

function openDebug() {

    const overlay =
        document.getElementById(
            "debug-overlay"
        );


    overlay.classList.add(
        "visible"
    );


    updateDebugInput();

}


function closeDebug() {

    document
        .getElementById(
            "debug-overlay"
        )
        .classList.remove(
            "visible"
        );

}


function updateDebugInput() {

    const type =
        document.getElementById(
            "debug-type"
        );


    const value =
        document.getElementById(
            "debug-value"
        );


    if (
        type.value === "reset"
    ) {

        value.style.display =
            "none";

    }

    else {

        value.style.display =
            "block";

    }

}


/* =========================================================
   DEBUG APPLY
========================================================= */

function applyDebug() {

    const type =
        document.getElementById(
            "debug-type"
        ).value;


    const value =
        document.getElementById(
            "debug-value"
        );


    /* =====================================
       RESET
    ====================================== */

    if (
        type === "reset"
    ) {

        const confirmed =
            confirm(
                "⚠️ Reset your entire StudySprint account?\n\n" +
                "This removes saved XP, coins, tickets, " +
                "streak, stats, achievements and other " +
                "local account data."
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
        !Number.isFinite(amount)
    ) {

        alert(
            "Enter a valid number."
        );

        return;

    }


    if (
        type === "xp"
    ) {

        localStorage.setItem(
            "xp",
            amount
        );

    }


    else if (
        type === "coins"
    ) {

        localStorage.setItem(
            "coins",
            amount
        );

    }


    else if (
        type === "tickets"
    ) {

        localStorage.setItem(
            "shopTickets",
            amount
        );

    }


    else if (
        type === "streak"
    ) {

        localStorage.setItem(
            "streak",
            amount
        );

    }


    alert(
        `✅ ${type} set to ${amount}!`
    );


    closeDebug();


    location.reload();

}


/* =========================================================
   BUTTON EVENTS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .getElementById(
                "main-shop-button"
            )
            .addEventListener(
                "click",
                openMainShop
            );


        document
            .getElementById(
                "ticket-shop-button"
            )
            .addEventListener(
                "click",
                openTicketShop
            );


        document
            .getElementById(
                "debug-open"
            )
            .addEventListener(
                "click",
                openDebug
            );


        document
            .getElementById(
                "debug-close"
            )
            .addEventListener(
                "click",
                closeDebug
            );


        document
            .getElementById(
                "debug-apply"
            )
            .addEventListener(
                "click",
                applyDebug
            );


        document
            .getElementById(
                "debug-type"
            )
            .addEventListener(
                "change",
                updateDebugInput
            );


        document
            .getElementById(
                "debug-overlay"
            )
            .addEventListener(
                "click",
                event => {

                    if (
                        event.target.id ===
                        "debug-overlay"
                    ) {

                        closeDebug();

                    }

                }
            );


        getCurrentShop();

        displayMainShop();

        displayTicketShop();

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

window.openTicketShop =
    openTicketShop;

window.openMainShop =
    openMainShop;

window.getCoins =
    getCoins;

window.getTickets =
    getTickets;

window.getOwnedItems =
    getOwnedItems;

window.ownsItem =
    ownsItem;

window.getStudyPassCharacters =
    getStudyPassCharacters;
