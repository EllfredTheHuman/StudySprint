/* =========================================
   STUDYSPRINT SHOP
========================================= */

const ROTATION_LENGTH = 14 * 24 * 60 * 60 * 1000;


/* =========================================
   SHOP ITEMS
========================================= */

const SHOP_ITEMS = {

    banner_purple: {
        name: "Purple Grid",
        rarity: "Common",
        type: "banner",
        value: "purple-grid",
        price: 100
    },

    banner_blue: {
        name: "Neon Blue",
        rarity: "Common",
        type: "banner",
        value: "neon-blue",
        price: 125
    },

    banner_space: {
        name: "Space",
        rarity: "Common",
        type: "banner",
        value: "space",
        price: 150
    },

    shirt_lightning: {
        name: "Lightning Shirt",
        rarity: "Rare",
        type: "shirt",
        value: "lightning",
        price: 250
    },

    shirt_sprint: {
        name: "Sprint Shirt",
        rarity: "Rare",
        type: "shirt",
        value: "sprint",
        price: 300
    },

    hat_visor: {
        name: "Sprint Visor",
        rarity: "Ultra Rare",
        type: "hat",
        value: "visor",
        price: 450
    },

    hat_star: {
        name: "Star Cap",
        rarity: "Ultra Rare",
        type: "hat",
        value: "star-cap",
        price: 500
    },

    pants_split: {
        name: "Split Pants",
        rarity: "Mythic",
        type: "pants",
        value: "split",
        price: 600
    },

    title_sprinter: {
        name: "The First Sprinter",
        rarity: "Legendary",
        type: "title",
        value: "first-sprinter",
        price: 750
    }

};


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

    return getOwnedItems()
        .includes(id);

}


/* =========================================
   RARITY
========================================= */

function rollRarity() {

    const roll =
        Math.random() * 100;


    if (roll < 50)
        return "Very Common";

    if (roll < 75)
        return "Common";

    if (roll < 85)
        return "Rare";

    if (roll < 90)
        return "Ultra Rare";

    if (roll < 92)
        return "Mythic";

    if (roll < 93)
        return "Legendary";

    return "Common";

}


/* =========================================
   ITEMS BY RARITY
========================================= */

function itemsByRarity(rarity) {

    return Object.keys(
        SHOP_ITEMS
    ).filter(
        id =>
            SHOP_ITEMS[id].rarity === rarity
    );

}


/* =========================================
   GENERATE SHOP
========================================= */

function generateShop() {

    const generated = [];


    for (let i = 0; i < 8; i++) {

        const rarity =
            rollRarity();


        let possible =
            itemsByRarity(rarity);


        /*
            If there aren't any items for the
            rolled rarity, fall back to Common.
        */

        if (possible.length === 0) {

            possible =
                itemsByRarity("Common");

        }


        const randomIndex =
            Math.floor(
                Math.random() *
                possible.length
            );


        generated.push(
            possible[randomIndex]
        );

    }


    localStorage.setItem(
        "fortnightlyShopItems",
        JSON.stringify(generated)
    );


    localStorage.setItem(
        "fortnightlyShopStart",
        Date.now()
    );


    return generated;

}


/* =========================================
   GET CURRENT SHOP
========================================= */

function getCurrentShop() {

    let items;


    try {

        items = JSON.parse(
            localStorage.getItem(
                "fortnightlyShopItems"
            )
        );

    } catch {

        items = null;

    }


    const start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        );


    /*
        New account
    */

    if (
        !Array.isArray(items) ||
        items.length !== 8 ||
        !start
    ) {

        return generateShop();

    }


    /*
        Shop expired
    */

    if (
        Date.now() - start >=
        ROTATION_LENGTH
    ) {

        return generateShop();

    }


    return items;

}


/* =========================================
   UNLOCK COSMETIC
========================================= */

function unlockCosmetic(item) {

    let key;


    if (item.type === "banner") {

        key = "unlocked_banners";

    }

    else if (item.type === "shirt") {

        key = "unlocked_shirts";

    }

    else if (item.type === "hat") {

        key = "unlocked_hats";

    }

    else if (item.type === "pants") {

        key = "unlocked_pants";

    }

    else if (item.type === "title") {

        key = "unlockedTitles";

    }


    if (!key)
        return;


    let unlocked = [];


    try {

        unlocked =
            JSON.parse(
                localStorage.getItem(key)
            ) || [];

    } catch {

        unlocked = [];

    }


    if (
        !unlocked.includes(
            item.value
        )
    ) {

        unlocked.push(
            item.value
        );

    }


    localStorage.setItem(
        key,
        JSON.stringify(unlocked)
    );

}


/* =========================================
   DISPLAY SHOP
========================================= */

function displayFortnightlyShop() {

    const container =
        document.getElementById(
            "fortnightly-items"
        );


    if (!container)
        return;


    const items =
        getCurrentShop();


    container.innerHTML = "";


    items.forEach(
        function(itemID) {

            const item =
                SHOP_ITEMS[itemID];


            if (!item)
                return;


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "shop-card " +
                item.rarity
                    .toLowerCase()
                    .replaceAll(
                        " ",
                        "-"
                    );


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
                    🪙 ${item.price}
                </div>

                <button
                    class="buy-button"
                    onclick="buyShopItem('${itemID}', this)"
                    ${ownsItem(itemID) ? "disabled" : ""}
                >
                    ${
                        ownsItem(itemID)
                            ? "OWNED"
                            : "BUY"
                    }
                </button>

            `;


            container.appendChild(
                card
            );

        }
    );


    updateCurrency();

}


/* =========================================
   BUY SHOP ITEM
========================================= */

function buyShopItem(
    itemID,
    button
) {

    const item =
        SHOP_ITEMS[itemID];


    if (!item)
        return;


    if (
        ownsItem(itemID)
    )
        return;


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


    unlockCosmetic(
        item
    );


    const owned =
        getOwnedItems();


    owned.push(
        itemID
    );


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
   TICKET SHOP
========================================= */

const TICKET_ITEMS = {

    sparkle: {
        name: "Sparkle Effect",
        description:
            "Tiny sparkles follow your character.",
        price: 10,
        type: "effect",
        value: "sparkle"
    },

    speed: {
        name: "Speed Trail",
        description:
            "Leaves a trail while moving.",
        price: 20,
        type: "effect",
        value: "speed-trail"
    },

    lightning: {
        name: "Lightning Effect",
        description:
            "Electric sparks surround your character.",
        price: 35,
        type: "effect",
        value: "lightning"
    },

    rainbow: {
        name: "Rainbow Aura",
        description:
            "A colourful aura surrounds you.",
        price: 50,
        type: "effect",
        value: "rainbow"
    },

    fire: {
        name: "Fire Aura",
        description:
            "A fiery glow surrounds you.",
        price: 75,
        type: "effect",
        value: "fire"
    },

    glitch: {
        name: "Glitch Effect",
        description:
            "A strange digital effect surrounds you.",
        price: 100,
        type: "effect",
        value: "glitch"
    },

    shadow: {
        name: "Shadow Aura",
        description:
            "A dark shadow surrounds you.",
        price: 150,
        type: "effect",
        value: "shadow"
    },

    crystal: {
        name: "Crystal Glow",
        description:
            "A bright crystalline glow.",
        price: 250,
        type: "effect",
        value: "crystal"
    },

    cosmic: {
        name: "Cosmic Aura",
        description:
            "Stars and cosmic particles surround you.",
        price: 500,
        type: "effect",
        value: "cosmic"
    },

    crown: {
        name: "Crown + Glow",
        description:
            "Extremely rare glowing crown.",
        price: 1000,
        type: "effect",
        value: "crown"
    }

};


/* =========================================
   DISPLAY TICKET SHOP
========================================= */

function displayTicketShop() {

    const container =
        document.getElementById(
            "ticket-items"
        );


    if (!container)
        return;


    container.innerHTML = "";


    Object.keys(
        TICKET_ITEMS
    ).forEach(
        function(id) {

            const item =
                TICKET_ITEMS[id];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "ticket-card";


            if (
                id === "crown"
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
                    🎟️ ${item.price}
                </div>

                <button
                    class="buy-button"
                    onclick="buyTicketItem('${id}', this)"
                    ${ownsItem(id) ? "disabled" : ""}
                >
                    ${
                        ownsItem(id)
                            ? "OWNED"
                            : "BUY"
                    }
                </button>

            `;


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
    itemID,
    button
) {

    const item =
        TICKET_ITEMS[itemID];


    if (!item)
        return;


    if (
        ownsItem(itemID)
    )
        return;


    const tickets =
        getTickets();


    if (
        tickets < item.price
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


    const owned =
        getOwnedItems();


    owned.push(itemID);


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
   CURRENCY
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


    if (!element)
        return;


    let start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        );


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
            ROTATION_LENGTH
        ) -
        Date.now();


    if (
        remaining <= 0
    ) {

        generateShop();

        displayFortnightlyShop();

        start =
            Number(
                localStorage.getItem(
                    "fortnightlyShopStart"
                )
            );

        remaining =
            (
                start +
                ROTATION_LENGTH
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
   SWITCH SHOPS
========================================= */

function showTicketShop() {

    document
        .getElementById(
            "fortnightly-shop"
        )
        ?.classList.add(
            "hidden"
        );


    document
        .getElementById(
            "ticket-shop"
        )
        ?.classList.remove(
            "hidden"
        );


    displayTicketShop();

}


function showFortnightlyShop() {

    document
        .getElementById(
            "ticket-shop"
        )
        ?.classList.add(
            "hidden"
        );


    document
        .getElementById(
            "fortnightly-shop"
        )
        ?.classList.remove(
            "hidden"
        );


    displayFortnightlyShop();

}


/* =========================================
   GLOBAL FUNCTIONS
========================================= */

window.buyShopItem =
    buyShopItem;

window.buyTicketItem =
    buyTicketItem;

window.showTicketShop =
    showTicketShop;

window.showFortnightlyShop =
    showFortnightlyShop;


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
            Generate the shop immediately.
        */

        getCurrentShop();


        /*
            Display everything.
        */

        displayFortnightlyShop();

        displayTicketShop();


        /*
            Start countdown immediately.
        */

        updateCountdown();


        /*
            Update every second.
        */

        setInterval(
            updateCountdown,
            1000
        );

    }
);
