const SHOP_REFRESH_TIME =
    14 * 24 * 60 * 60 * 1000;


/* =========================================
   FORTNIGHTLY SHOP
========================================= */

const SHOP_ITEMS = [

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

    {
        id: "sprint-blue",
        name: "Sprint Shirt",
        rarity: "Rare",
        type: "Shirt",
        price: 300
    },

    {
        id: "visor",
        name: "Sprint Visor",
        rarity: "Ultra Rare",
        type: "Hat",
        price: 450
    },

    {
        id: "star-cap",
        name: "Star Cap",
        rarity: "Ultra Rare",
        type: "Hat",
        price: 500
    },

    {
        id: "split",
        name: "Split Pants",
        rarity: "Mythic",
        type: "Pants",
        price: 600
    },

    {
        id: "first-sprinter",
        name: "The First Sprinter",
        rarity: "Legendary",
        type: "Player Title",
        price: 750
    }

];


/* =========================================
   TICKET SHOP
========================================= */

const TICKET_ITEMS = [

    {
        id: "sparkle",
        name: "Sparkle Effect",
        description:
            "Tiny sparkles follow your character.",
        type: "Effect",
        price: 10
    },

    {
        id: "speed-trail",
        name: "Speed Trail",
        description:
            "Leaves a trail behind your character.",
        type: "Effect",
        price: 20
    },

    {
        id: "lightning",
        name: "Lightning Effect",
        description:
            "Electric sparks surround your character.",
        type: "Effect",
        price: 35
    },

    {
        id: "rainbow",
        name: "Rainbow Aura",
        description:
            "A colourful aura surrounds your character.",
        type: "Effect",
        price: 50
    },

    {
        id: "fire",
        name: "Fire Aura",
        description:
            "A fiery glow surrounds your character.",
        type: "Effect",
        price: 75
    },

    {
        id: "glitch",
        name: "Glitch Effect",
        description:
            "A strange digital effect surrounds your character.",
        type: "Effect",
        price: 100
    },

    {
        id: "shadow",
        name: "Shadow Aura",
        description:
            "A dark shadow surrounds your character.",
        type: "Effect",
        price: 150
    },

    {
        id: "crystal",
        name: "Crystal Glow",
        description:
            "A bright crystalline glow surrounds your character.",
        type: "Effect",
        price: 250
    },

    {
        id: "cosmic",
        name: "Cosmic Aura",
        description:
            "Stars and cosmic particles surround your character.",
        type: "Effect",
        price: 500
    },

    {
        id: "crown",
        name: "Crown + Glow",
        description:
            "The extremely rare glowing crown.",
        type: "Hat",
        price: 1000
    }

];


/* =========================================
   CURRENCY
========================================= */

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


/* =========================================
   OWNED ITEMS
========================================= */

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


/* =========================================
   UNLOCK ITEM
========================================= */

function unlockItem(
    id,
    type
) {

    let storageKey = null;


    if (type === "Banner") {

        storageKey =
            "unlocked_banners";

    }

    else if (type === "Shirt") {

        storageKey =
            "unlocked_shirts";

    }

    else if (type === "Hat") {

        storageKey =
            "unlocked_hats";

    }

    else if (type === "Pants") {

        storageKey =
            "unlocked_pants";

    }

    else if (type === "Player Title") {

        storageKey =
            "unlockedTitles";

    }

    else if (type === "Effect") {

        storageKey =
            "unlocked_effects";

    }


    if (!storageKey) {

        console.error(
            "Unknown cosmetic type:",
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


    if (!unlocked.includes(id)) {

        unlocked.push(id);

    }


    localStorage.setItem(
        storageKey,
        JSON.stringify(unlocked)
    );


    console.log(
        "StudySprint unlocked:",
        id,
        "→",
        storageKey
    );

}


/* =========================================
   FORTNIGHTLY SHOP GENERATION
========================================= */

function generateShop() {

    const shuffled =
        [...SHOP_ITEMS].sort(
            () => Math.random() - 0.5
        );


    const selected = [];


    for (
        let i = 0;
        i < 8 && i < shuffled.length;
        i++
    ) {

        selected.push(
            shuffled[i].id
        );

    }


    localStorage.setItem(
        "fortnightlyShopItems",
        JSON.stringify(selected)
    );


    localStorage.setItem(
        "fortnightlyShopStart",
        Date.now()
    );


    console.log(
        "New fortnightly shop generated:",
        selected
    );


    return selected;

}


/* =========================================
   GET CURRENT SHOP
========================================= */

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


/* =========================================
   DISPLAY MAIN SHOP
========================================= */

function displayMainShop() {

    const container =
        document.getElementById(
            "fortnightly-items"
        );


    if (!container) {

        return;

    }


    const items =
        getCurrentShop();


    container.innerHTML = "";


    items.forEach(
        id => {

            const item =
                SHOP_ITEMS.find(
                    x =>
                        x.id === id
                );


            if (!item) {

                return;

            }


            const owned =
                ownsItem(
                    item.id
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "shop-card";


            card.innerHTML = `

                <div class="rarity">
                    ${item.rarity}
                </div>

                <div class="item-preview">
                    ${item.name}
                </div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.type}
                </p>

                <div class="shop-price">
                    ${item.price} Coins
                </div>

                <button
                    type="button"
                    class="buy-button"
                >
                    ${owned ? "OWNED" : "BUY"}
                </button>

            `;


            const button =
                card.querySelector(
                    ".buy-button"
                );


            if (owned) {

                button.disabled =
                    true;

            }

            else {

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


            container.appendChild(
                card
            );

        }
    );


    updateCurrency();

}


/* =========================================
   BUY MAIN ITEM
========================================= */

function buyMainItem(
    item,
    button
) {

    if (
        ownsItem(
            item.id
        )
    ) {

        return;

    }


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


    /* IMPORTANT:
       Unlock using the item's
       actual cosmetic type.
    */

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


/* =========================================
   DISPLAY TICKET SHOP
========================================= */

function displayTicketShop() {

    const container =
        document.getElementById(
            "ticket-items"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    TICKET_ITEMS.forEach(
        item => {

            const owned =
                ownsItem(
                    item.id
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "ticket-card";


            if (
                item.id ===
                "crown"
            ) {

                card.classList.add(
                    "crown-card"
                );

            }


            card.innerHTML = `

                <div class="ticket-item-preview">
                    ${item.name}
                </div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.description}
                </p>

                <div class="ticket-price">
                    ${item.price} Shop Tickets
                </div>

                <button
                    type="button"
                    class="buy-button"
                >
                    ${owned ? "OWNED" : "BUY"}
                </button>

            `;


            const button =
                card.querySelector(
                    ".buy-button"
                );


            if (owned) {

                button.disabled =
                    true;

            }

            else {

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


            container.appendChild(
                card
            );

        }
    );


    updateCurrency();

}


/* =========================================
   BUY TICKET ITEM
========================================= */

function buyTicketItem(
    item,
    button
) {

    if (
        ownsItem(
            item.id
        )
    ) {

        return;

    }


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


    /*
        IMPORTANT FIX:

        Crown = Hat

        Everything else in the
        ticket shop = Effect
    */

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


    console.log(
        "Ticket shop purchase:",
        item.name,
        "Type:",
        item.type
    );

}


/* =========================================
   CURRENCY DISPLAY
========================================= */

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


/* =========================================
   COUNTDOWN
========================================= */

function updateCountdown() {

    const element =
        document.getElementById(
            "countdown"
        );


    if (!element) {

        return;

    }


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
        (
            start +
            SHOP_REFRESH_TIME
        ) -
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
            (
                start +
                SHOP_REFRESH_TIME
            ) -
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


/* =========================================
   SHOP NAVIGATION
========================================= */

function openTicketShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );


    const ticket =
        document.getElementById(
            "ticket-shop"
        );


    if (
        !main ||
        !ticket
    ) {

        console.error(
            "Ticket Shop section missing."
        );

        return;

    }


    main.style.display =
        "none";


    ticket.style.display =
        "block";


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


    if (
        !main ||
        !ticket
    ) {

        return;

    }


    ticket.style.display =
        "none";


    main.style.display =
        "block";


    displayMainShop();

}


/* =========================================
   GLOBAL FUNCTIONS
========================================= */

window.openTicketShop =
    openTicketShop;

window.openMainShop =
    openMainShop;


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

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
