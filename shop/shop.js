/* =========================================================
   STUDYSPRINT SHOP
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const SHOP_REFRESH_TIME =
    14 * 24 * 60 * 60 * 1000;


/* =========================================================
   PREMADE CHARACTERS
========================================================= */

/*
    Replace these IDs/names with your ACTUAL
    premade character IDs.

    These are what the shop will unlock.
*/

const CHARACTERS = [

    {
        id: "character-1",
        name: "Character 1",
        rarity: "Common"
    },

    {
        id: "character-2",
        name: "Character 2",
        rarity: "Common"
    },

    {
        id: "character-3",
        name: "Character 3",
        rarity: "Rare"
    },

    {
        id: "character-4",
        name: "Character 4",
        rarity: "Rare"
    },

    {
        id: "character-5",
        name: "Character 5",
        rarity: "Ultra Rare"
    },

    {
        id: "character-6",
        name: "Character 6",
        rarity: "Ultra Rare"
    }

];


/* =========================================================
   BANNERS
========================================================= */

const BANNERS = [

    {
        id: "sprint-grid",
        name: "Sprint Grid",
        rarity: "Common",
        price: 100
    },

    {
        id: "purple-grid",
        name: "Purple Grid",
        rarity: "Common",
        price: 125
    },

    {
        id: "neon-blue",
        name: "Neon Blue",
        rarity: "Common",
        price: 150
    },

    {
        id: "sunset",
        name: "Sunset",
        rarity: "Rare",
        price: 200
    }

];


/* =========================================================
   COMMON EFFECTS
========================================================= */

const COMMON_EFFECTS = [

    {
        id: "sparkle",
        name: "Sparkle Effect",
        rarity: "Common",
        price: 100,
        description:
            "Tiny sparkles follow your character."
    },

    {
        id: "speed-trail",
        name: "Speed Trail",
        rarity: "Common",
        price: 150,
        description:
            "Leaves a trail behind your character."
    },

    {
        id: "lightning",
        name: "Lightning Effect",
        rarity: "Rare",
        price: 250,
        description:
            "Electric sparks surround your character."
    }

];


/* =========================================================
   TICKET SHOP
========================================================= */

const TICKET_ITEMS = [

    {
        id: "rainbow",
        name: "Rainbow Aura",
        description:
            "A colourful aura surrounds your character.",
        price: 50,
        type: "Effect"
    },

    {
        id: "fire",
        name: "Fire Aura",
        description:
            "A fiery glow surrounds your character.",
        price: 75,
        type: "Effect"
    },

    {
        id: "glitch",
        name: "Glitch Effect",
        description:
            "A strange digital effect surrounds your character.",
        price: 100,
        type: "Effect"
    },

    {
        id: "shadow",
        name: "Shadow Aura",
        description:
            "A dark shadow surrounds your character.",
        price: 150,
        type: "Effect"
    },

    {
        id: "crystal",
        name: "Crystal Glow",
        description:
            "A bright crystalline glow surrounds your character.",
        price: 250,
        type: "Effect"
    },

    {
        id: "cosmic",
        name: "Cosmic Aura",
        description:
            "Stars and cosmic particles surround your character.",
        price: 500,
        type: "Effect"
    },

    {
        id: "crown",
        name: "Crown + Glow",
        description:
            "The extremely rare glowing crown.",
        price: 1000,
        type: "Effect"
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
        Math.max(0, amount)
    );

}


function setTickets(amount) {

    localStorage.setItem(
        "shopTickets",
        Math.max(0, amount)
    );

}


/* =========================================================
   OWNED SHOP ITEMS
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

    return getOwnedItems().includes(id);

}


/* =========================================================
   UNLOCK
========================================================= */

function unlockItem(
    id,
    type
) {

    let key = null;


    if(type === "Character") {

        key = "unlocked_characters";

    }

    else if(type === "Banner") {

        key = "unlocked_banners";

    }

    else if(type === "Effect") {

        key = "unlocked_effects";

    }


    if(!key) {

        console.error(
            "Unknown shop item type:",
            type
        );

        return;

    }


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


    if(!unlocked.includes(id)) {

        unlocked.push(id);

    }


    localStorage.setItem(
        key,
        JSON.stringify(unlocked)
    );

}


/* =========================================================
   BUY ITEM
========================================================= */

function purchaseItem(
    item,
    type,
    currency,
    button
) {

    if(ownsItem(item.id)) {

        return;

    }


    let balance;


    if(currency === "coins") {

        balance = getCoins();

    }

    else {

        balance = getTickets();

    }


    if(balance < item.price) {

        alert(
            currency === "coins"
                ? "You don't have enough coins!"
                : "You don't have enough Shop Tickets!"
        );

        return;

    }


    /* REMOVE CURRENCY */

    if(currency === "coins") {

        setCoins(
            balance - item.price
        );

    }

    else {

        setTickets(
            balance - item.price
        );

    }


    /* UNLOCK */

    unlockItem(
        item.id,
        type
    );


    /* OWNED */

    const owned =
        getOwnedItems();


    if(!owned.includes(item.id)) {

        owned.push(item.id);

    }


    saveOwnedItems(
        owned
    );


    /* BUTTON */

    if(button) {

        button.disabled =
            true;

        button.textContent =
            "OWNED";

    }


    updateCurrency();

}


/* =========================================================
   FORTNIGHTLY ITEM POOL
========================================================= */

function getShopPool() {

    return [

        ...CHARACTERS.map(
            character => ({

                id: character.id,
                name: character.name,
                rarity: character.rarity,
                type: "Character",
                price:
                    character.rarity === "Common"
                        ? 250
                        : character.rarity === "Rare"
                        ? 400
                        : character.rarity === "Ultra Rare"
                        ? 600
                        : 750

            })
        ),

        ...BANNERS.map(
            banner => ({

                ...banner,
                type: "Banner"

            })
        ),

        ...COMMON_EFFECTS.map(
            effect => ({

                ...effect,
                type: "Effect"

            })
        )

    ];

}


/* =========================================================
   GENERATE SHOP
========================================================= */

function generateShop() {

    const pool =
        getShopPool();


    const shuffled =
        [...pool].sort(
            () =>
                Math.random() - 0.5
        );


    /*
        Try to guarantee variety.

        4 characters
        2 banners
        2 effects
    */

    const characters =
        shuffled
            .filter(
                item =>
                    item.type === "Character"
            )
            .slice(0, 4);


    const banners =
        shuffled
            .filter(
                item =>
                    item.type === "Banner"
            )
            .slice(0, 2);


    const effects =
        shuffled
            .filter(
                item =>
                    item.type === "Effect"
            )
            .slice(0, 2);


    let selected = [

        ...characters,
        ...banners,
        ...effects

    ];


    /*
        If there aren't enough items,
        fill the remaining slots randomly.
    */

    if(selected.length < 8) {

        const remaining =
            shuffled.filter(
                item =>
                    !selected.some(
                        selectedItem =>
                            selectedItem.id === item.id
                    )
            );


        selected.push(
            ...remaining.slice(
                0,
                8 - selected.length
            )
        );

    }


    selected =
        selected.slice(0, 8);


    localStorage.setItem(
        "fortnightlyShopItems",
        JSON.stringify(
            selected.map(
                item =>
                    item.id
            )
        )
    );


    localStorage.setItem(
        "fortnightlyShopStart",
        Date.now()
    );


    return selected.map(
        item =>
            item.id
    );

}


/* =========================================================
   CURRENT SHOP
========================================================= */

function getCurrentShop() {

    let ids = null;


    try {

        ids =
            JSON.parse(
                localStorage.getItem(
                    "fortnightlyShopItems"
                )
            );

    }

    catch {

        ids = null;

    }


    const start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || 0;


    if(
        !Array.isArray(ids) ||
        !start
    ) {

        return generateShop();

    }


    if(
        Date.now() - start >=
        SHOP_REFRESH_TIME
    ) {

        return generateShop();

    }


    return ids;

}


/* =========================================================
   FIND ITEM
========================================================= */

function findShopItem(id) {

    return getShopPool().find(
        item =>
            item.id === id
    );

}


/* =========================================================
   CHARACTER PREVIEW
========================================================= */

function characterPreview(item) {

    const preview =
        document.createElement(
            "div"
        );


    preview.className =
        "character-preview";


    const body =
        document.createElement(
            "div"
        );

    body.className =
        "preview-body";


    const head =
        document.createElement(
            "div"
        );

    head.className =
        "preview-head";


    const face =
        document.createElement(
            "div"
        );

    face.className =
        "preview-face";


    const legs =
        document.createElement(
            "div"
        );

    legs.className =
        "preview-legs";


    preview.appendChild(
        legs
    );

    preview.appendChild(
        body
    );

    preview.appendChild(
        head
    );

    preview.appendChild(
        face
    );


    /*
        The character ID gets placed
        on the preview so CSS can style
        individual premade characters.
    */

    preview.classList.add(
        "character-" +
        item.id
    );


    return preview;

}


/* =========================================================
   BANNER PREVIEW
========================================================= */

function bannerPreview(item) {

    const preview =
        document.createElement(
            "div"
        );


    preview.className =
        "banner-preview";


    preview.classList.add(
        "banner-" +
        item.id
    );


    const title =
        document.createElement(
            "span"
        );


    title.textContent =
        item.name;


    preview.appendChild(
        title
    );


    return preview;

}


/* =========================================================
   EFFECT PREVIEW
========================================================= */

function effectPreview(item) {

    const preview =
        document.createElement(
            "div"
        );


    preview.className =
        "effect-preview";


    preview.classList.add(
        "effect-" +
        item.id
    );


    return preview;

}


/* =========================================================
   CREATE PREVIEW
========================================================= */

function createPreview(item) {

    if(item.type === "Character") {

        return characterPreview(
            item
        );

    }


    if(item.type === "Banner") {

        return bannerPreview(
            item
        );

    }


    return effectPreview(
        item
    );

}


/* =========================================================
   CREATE CARD
========================================================= */

function createCard(
    item,
    currency
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "shop-card";


    if(item.rarity) {

        const rarity =
            document.createElement(
                "div"
            );


        rarity.className =
            "rarity";


        rarity.textContent =
            item.rarity;


        card.appendChild(
            rarity
        );

    }


    const preview =
        document.createElement(
            "div"
        );


    preview.className =
        "item-preview";


    preview.appendChild(
        createPreview(item)
    );


    card.appendChild(
        preview
    );


    const name =
        document.createElement(
            "h3"
        );


    name.textContent =
        item.name;


    card.appendChild(
        name
    );


    const type =
        document.createElement(
            "p"
        );


    type.textContent =
        item.type;


    card.appendChild(
        type
    );


    if(item.description) {

        const description =
            document.createElement(
                "p"
            );


        description.className =
            "item-description";


        description.textContent =
            item.description;


        card.appendChild(
            description
        );

    }


    const price =
        document.createElement(
            "div"
        );


    price.className =
        "shop-price";


    price.textContent =
        item.price +
        (
            currency === "coins"
                ? " Coins"
                : " Shop Tickets"
        );


    card.appendChild(
        price
    );


    const button =
        document.createElement(
            "button"
        );


    button.className =
        "buy-button";


    button.type =
        "button";


    if(ownsItem(item.id)) {

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

                purchaseItem(
                    item,
                    item.type,
                    currency,
                    button
                );

            }
        );

    }


    card.appendChild(
        button
    );


    return card;

}


/* =========================================================
   DISPLAY FORTNIGHTLY SHOP
========================================================= */

function displayMainShop() {

    const container =
        document.getElementById(
            "fortnightly-items"
        );


    if(!container) {

        return;

    }


    container.innerHTML =
        "";


    const ids =
        getCurrentShop();


    ids.forEach(
        id => {

            const item =
                findShopItem(id);


            if(!item) {

                return;

            }


            container.appendChild(
                createCard(
                    item,
                    "coins"
                )
            );

        }
    );


    updateCurrency();

}


/* =========================================================
   DISPLAY TICKET SHOP
========================================================= */

function displayTicketShop() {

    const container =
        document.getElementById(
            "ticket-items"
        );


    if(!container) {

        return;

    }


    container.innerHTML =
        "";


    TICKET_ITEMS.forEach(
        item => {

            container.appendChild(
                createCard(
                    item,
                    "tickets"
                )
            );

        }
    );


    updateCurrency();

}


/* =========================================================
   CURRENCY UI
========================================================= */

function updateCurrency() {

    const coinCount =
        document.getElementById(
            "coin-count"
        );


    const ticketCount =
        document.getElementById(
            "ticket-count"
        );


    if(coinCount) {

        coinCount.textContent =
            getCoins();

    }


    if(ticketCount) {

        ticketCount.textContent =
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


    if(!element) {

        return;

    }


    let start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || 0;


    if(!start) {

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


    if(remaining <= 0) {

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
   NAVIGATION
========================================================= */

function openTicketShop() {

    document.getElementById(
        "fortnightly-shop"
    ).style.display =
        "none";


    document.getElementById(
        "ticket-shop"
    ).style.display =
        "block";


    document.getElementById(
        "main-shop-button"
    ).classList.remove(
        "active"
    );


    document.getElementById(
        "ticket-shop-button"
    ).classList.add(
        "active"
    );

}


function openMainShop() {

    document.getElementById(
        "ticket-shop"
    ).style.display =
        "none";


    document.getElementById(
        "fortnightly-shop"
    ).style.display =
        "block";


    document.getElementById(
        "ticket-shop-button"
    ).classList.remove(
        "active"
    );


    document.getElementById(
        "main-shop-button"
    ).classList.add(
        "active"
    );

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        getCurrentShop();

        displayMainShop();

        displayTicketShop();

        updateCurrency();

        updateCountdown();


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


        setInterval(
            updateCountdown,
            1000
        );

    }
);


/* =========================================================
   PUBLIC
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

window.generateShop =
    generateShop;
