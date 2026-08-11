```javascript
/* =========================================
   STUDYSPRINT SHOP
========================================= */

const ROTATION_LENGTH =
    14 * 24 * 60 * 60 * 1000;


/* =========================================
   FORTNIGHTLY SHOP ITEMS
========================================= */

const SHOP_ITEMS = {

    banner_purple: {
        name: "Purple Grid",
        rarity: "Common",
        type: "Banner",
        value: "purple-grid",
        price: 100
    },

    banner_blue: {
        name: "Neon Blue",
        rarity: "Common",
        type: "Banner",
        value: "neon-blue",
        price: 125
    },

    banner_space: {
        name: "Space",
        rarity: "Common",
        type: "Banner",
        value: "space",
        price: 150
    },

    shirt_lightning: {
        name: "Lightning Shirt",
        rarity: "Rare",
        type: "Shirt",
        value: "lightning",
        price: 250
    },

    shirt_sprint: {
        name: "Sprint Shirt",
        rarity: "Rare",
        type: "Shirt",
        value: "sprint",
        price: 300
    },

    hat_visor: {
        name: "Sprint Visor",
        rarity: "Ultra Rare",
        type: "Hat",
        value: "visor",
        price: 450
    },

    hat_star: {
        name: "Star Cap",
        rarity: "Ultra Rare",
        type: "Hat",
        value: "star-cap",
        price: 500
    },

    pants_split: {
        name: "Split Pants",
        rarity: "Mythic",
        type: "Pants",
        value: "split",
        price: 600
    },

    title_sprinter: {
        name: "The First Sprinter",
        rarity: "Legendary",
        type: "Player Title",
        value: "first-sprinter",
        price: 750
    }

};


/* =========================================
   TICKET SHOP ITEMS
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
            "A colourful aura surrounds your character.",
        price: 50,
        type: "effect",
        value: "rainbow"
    },

    fire: {
        name: "Fire Aura",
        description:
            "A fiery glow surrounds your character.",
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
            "A bright crystalline glow surrounds you.",
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
            "An extremely rare glowing crown.",
        price: 1000,
        type: "effect",
        value: "crown"
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
        String(amount)
    );

}


function setTickets(amount) {

    localStorage.setItem(
        "shopTickets",
        String(amount)
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
   UNLOCK COSMETIC
========================================= */

function unlockCosmetic(item) {

    let key = null;


    if (item.type === "Banner") {

        key = "unlocked_banners";

    }

    else if (item.type === "Shirt") {

        key = "unlocked_shirts";

    }

    else if (item.type === "Hat") {

        key = "unlocked_hats";

    }

    else if (item.type === "Pants") {

        key = "unlocked_pants";

    }

    else if (item.type === "Player Title") {

        key = "unlockedTitles";

    }

    else if (item.type === "effect") {

        key = "unlocked_effects";

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
   RARITY ROLL
========================================= */

function rollRarity() {

    const roll =
        Math.random() * 100;


    if (roll < 50)
        return "Common";


    if (roll < 75)
        return "Common";


    if (roll < 85)
        return "Rare";


    if (roll < 90)
        return "Ultra Rare";


    if (roll < 92)
        return "Mythic";


    return "Legendary";

}


/* =========================================
   GET ITEMS BY RARITY
========================================= */

function getItemsByRarity(rarity) {

    return Object.keys(
        SHOP_ITEMS
    ).filter(
        id =>
            SHOP_ITEMS[id].rarity ===
            rarity
    );

}


/* =========================================
   GENERATE SHOP
========================================= */

function generateShop() {

    const generated = [];


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const rarity =
            rollRarity();


        let possible =
            getItemsByRarity(
                rarity
            );


        if (
            possible.length === 0
        ) {

            possible =
                getItemsByRarity(
                    "Common"
                );

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
        JSON.stringify(
            generated
        )
    );


    localStorage.setItem(
        "fortnightlyShopStart",
        String(
            Date.now()
        )
    );


    return generated;

}


/* =========================================
   LOAD SHOP
========================================= */

function loadShop() {

    let items = null;


    try {

        items =
            JSON.parse(
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
        ROTATION_LENGTH
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


    if (!container)
        return;


    const items =
        loadShop();


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


            const owned =
                ownsItem(
                    itemID
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
                    type="button"
                    class="buy-button"
                    ${
                        owned
                            ? "disabled"
                            : ""
                    }
                    data-item="${itemID}"
                >
                    ${
                        owned
                            ? "OWNED"
                            : "BUY"
                    }
                </button>

            `;


            const button =
                card.querySelector(
                    ".buy-button"
                );


            if (!owned) {

                button.addEventListener(
                    "click",
                    function() {

                        buyShopItem(
                            itemID,
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
   BUY MAIN SHOP ITEM
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
        function(itemID) {

            const item =
                TICKET_ITEMS[itemID];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "ticket-card";


            if (
                itemID === "crown"
            ) {

                card.classList.add(
                    "crown-card"
                );

            }


            const owned =
                ownsItem(
                    itemID
                );


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
                    type="button"
                    class="buy-button"
                    ${
                        owned
                            ? "disabled"
                            : ""
                    }
                >
                    ${
                        owned
                            ? "OWNED"
                            : "BUY"
                    }
                </button>

            `;


            const button =
                card.querySelector(
                    ".buy-button"
                );


            if (!owned) {

                button.addEventListener(
                    "click",
                    function() {

                        buyTicketItem(
                            itemID,
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

    const countdown =
        document.getElementById(
            "countdown"
        );


    if (!countdown)
        return;


    let start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || 0;


    if (!start) {

        loadShop();

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


    countdown.textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

}


/* =========================================
   SHOP SWITCHING
========================================= */

function openTicketShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );


    const tickets =
        document.getElementById(
            "ticket-shop"
        );


    if (!main || !tickets) {

        console.error(
            "StudySprint: Ticket Shop sections missing."
        );

        return;

    }


    main.style.display =
        "none";


    tickets.style.display =
        "block";


    displayTicketShop();

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


    if (!main || !tickets) {

        console.error(
            "StudySprint: Shop sections missing."
        );

        return;

    }


    tickets.style.display =
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
    function() {

        loadShop();

        displayMainShop();

        displayTicketShop();

        updateCountdown();


        setInterval(
            updateCountdown,
            1000
        );

    }
);
```
