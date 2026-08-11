```javascript
/* =========================================
   STUDYSPRINT SHOP
   ========================================= */

const SHOP_VERSION = "test-month-1";

const ROTATION_LENGTH =
    14 * 24 * 60 * 60 * 1000;


/* =========================================
   FORTNIGHTLY SHOP ITEMS
   ========================================= */

const SHOP_ITEMS = {

    banner_purple_grid: {
        name: "Purple Grid",
        rarity: "Common",
        type: "banner",
        value: "purple-grid",
        price: 100
    },

    banner_neon_blue: {
        name: "Neon Blue",
        rarity: "Common",
        type: "banner",
        value: "neon-blue",
        price: 125
    },

    shirt_lightning: {
        name: "Lightning",
        rarity: "Rare",
        type: "shirt",
        value: "lightning",
        price: 250
    },

    shirt_sprint_red: {
        name: "Sprint Red",
        rarity: "Rare",
        type: "shirt",
        value: "sprint-red",
        price: 300
    },

    hat_visor: {
        name: "Sprint Visor",
        rarity: "Ultra Rare",
        type: "hat",
        value: "sprint-visor",
        price: 450
    },

    pants_split: {
        name: "Split",
        rarity: "Mythic",
        type: "pants",
        value: "split",
        price: 600
    },

    title_first_sprinter: {
        name: "The First Sprinter",
        rarity: "Legendary",
        type: "title",
        value: "first-sprinter",
        price: 750
    }

};


/* =========================================
   TICKET SHOP
========================================= */

const TICKET_ITEMS = {

    sparkle_effect: {
        name: "Sparkle Effect",
        description: "Tiny sparkles follow your character.",
        price: 10,
        type: "effect",
        value: "sparkle"
    },

    speed_trail: {
        name: "Speed Trail",
        description: "Leaves a small trail while moving.",
        price: 20,
        type: "effect",
        value: "speed-trail"
    },

    lightning_effect: {
        name: "Lightning Effect",
        description: "Electric sparks surround your character.",
        price: 35,
        type: "effect",
        value: "lightning"
    },

    rainbow_aura: {
        name: "Rainbow Aura",
        description: "A colourful aura surrounds your character.",
        price: 50,
        type: "effect",
        value: "rainbow"
    },

    fire_aura: {
        name: "Fire Aura",
        description: "A fiery glow surrounds your character.",
        price: 75,
        type: "effect",
        value: "fire"
    },

    glitch_effect: {
        name: "Glitch Effect",
        description: "Your character gets a strange digital effect.",
        price: 100,
        type: "effect",
        value: "glitch"
    },

    shadow_aura: {
        name: "Shadow Aura",
        description: "A dark shadow surrounds your character.",
        price: 150,
        type: "effect",
        value: "shadow"
    },

    crystal_glow: {
        name: "Crystal Glow",
        description: "A bright crystalline glow surrounds your character.",
        price: 250,
        type: "effect",
        value: "crystal"
    },

    cosmic_aura: {
        name: "Cosmic Aura",
        description: "Stars and cosmic particles surround your character.",
        price: 500,
        type: "effect",
        value: "cosmic"
    },

    crown: {
        name: "Crown + Glow",
        description: "An extremely rare crown with a powerful golden glow.",
        price: 1000,
        type: "effect",
        value: "crown",
        legendary: true
    }

};


/* =========================================
   STORAGE
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

    return JSON.parse(
        localStorage.getItem(
            "shopOwnedItems"
        )
    ) || [];

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


/* =========================================
   UNLOCK COSMETIC
========================================= */

function unlockCosmetic(item) {

    let storageKey;


    if (item.type === "banner") {

        storageKey =
            "unlocked_banners";

    }

    else if (item.type === "shirt") {

        storageKey =
            "unlocked_shirts";

    }

    else if (item.type === "hat") {

        storageKey =
            "unlocked_hats";

    }

    else if (item.type === "pants") {

        storageKey =
            "unlocked_pants";

    }

    else if (item.type === "title") {

        storageKey =
            "unlockedTitles";

    }

    else if (item.type === "effect") {

        storageKey =
            "unlocked_effects";

    }

    else {

        return;

    }


    let unlocked =
        JSON.parse(
            localStorage.getItem(
                storageKey
            )
        ) || [];


    if (!unlocked.includes(item.value)) {

        unlocked.push(item.value);

    }


    localStorage.setItem(
        storageKey,
        JSON.stringify(unlocked)
    );

}


/* =========================================
   RARITY ROLL
========================================= */

function rollRarity() {

    const roll =
        Math.random() * 100;


    if (roll < 50) {

        return "Very Common";

    }

    if (roll < 75) {

        return "Common";

    }

    if (roll < 85) {

        return "Rare";

    }

    if (roll < 90) {

        return "Ultra Rare";

    }

    if (roll < 92) {

        return "Mythic";

    }

    if (roll < 93) {

        return "Legendary";

    }

    return "Empty";

}


/* =========================================
   GET ITEMS FOR RARITY
========================================= */

function getItemsByRarity(rarity) {

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

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const rarity =
            rollRarity();


        if (
            rarity === "Empty"
        ) {

            generated.push(null);

            continue;

        }


        const possible =
            getItemsByRarity(
                rarity
            );


        if (
            possible.length === 0
        ) {

            generated.push(null);

            continue;

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
        String(Date.now())
    );


    localStorage.setItem(
        "fortnightlyShopVersion",
        SHOP_VERSION
    );


    return generated;

}


/* =========================================
   LOAD SHOP
========================================= */

function loadShop() {

    const savedStart =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || 0;


    const savedVersion =
        localStorage.getItem(
            "fortnightlyShopVersion"
        );


    const expired =
        Date.now() -
        savedStart >=
        ROTATION_LENGTH;


    if (
        !savedStart ||
        savedVersion !== SHOP_VERSION ||
        expired
    ) {

        return generateShop();

    }


    return JSON.parse(
        localStorage.getItem(
            "fortnightlyShopItems"
        )
    ) || generateShop();

}


/* =========================================
   FORTNIGHTLY SHOP DISPLAY
========================================= */

function displayFortnightlyShop() {

    const container =
        document.getElementById(
            "fortnightly-items"
        );


    if (!container) {

        return;

    }


    const items =
        loadShop();


    container.innerHTML = "";


    items.forEach(
        function(itemID, index) {

            if (!itemID) {

                const empty =
                    document.createElement(
                        "div"
                    );

                empty.className =
                    "shop-card empty-card";

                empty.innerHTML = `
                    <div class="empty-icon">
                        ?
                    </div>

                    <h3>Nothing New</h3>

                    <p>
                        This slot is empty.
                    </p>
                `;

                container.appendChild(
                    empty
                );

                return;

            }


            const item =
                SHOP_ITEMS[itemID];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "shop-card " +
                rarityClass(
                    item.rarity
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
                    onclick="buyShopItem('${itemID}')"
                >
                    ${ownsItem(itemID)
                        ? "OWNED"
                        : "BUY"}
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
   RARITY CSS CLASS
========================================= */

function rarityClass(rarity) {

    return rarity
        .toLowerCase()
        .replace(
            / /g,
            "-"
        );

}


/* =========================================
   BUY FORTNIGHTLY ITEM
========================================= */

function buyShopItem(itemID) {

    const item =
        SHOP_ITEMS[itemID];


    if (!item) {

        return;

    }


    if (
        ownsItem(itemID)
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


    displayFortnightlyShop();

}


/* =========================================
   BUY TICKET ITEM
========================================= */

function buyTicketItem(itemID) {

    const item =
        TICKET_ITEMS[itemID];


    if (!item) {

        return;

    }


    if (
        ownsItem(itemID)
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


    displayTicketShop();

}


/* =========================================
   TICKET SHOP DISPLAY
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


            if (item.legendary) {

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
                    onclick="buyTicketItem('${itemID}')"
                >
                    ${ownsItem(itemID)
                        ? "OWNED"
                        : "BUY"}
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

    const countdown =
        document.getElementById(
            "countdown"
        );


    if (!countdown) {

        return;

    }


    const start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || Date.now();


    const end =
        start +
        ROTATION_LENGTH;


    let remaining =
        end -
        Date.now();


    if (
        remaining <= 0
    ) {

        generateShop();

        displayFortnightlyShop();

        return;

    }


    const days =
        Math.floor(
            remaining /
            (1000 * 60 * 60 * 24)
        );


    remaining %=
        1000 * 60 * 60 * 24;


    const hours =
        Math.floor(
            remaining /
            (1000 * 60 * 60)
        );


    remaining %=
        1000 * 60 * 60;


    const minutes =
        Math.floor(
            remaining /
            (1000 * 60)
        );


    remaining %=
        1000 * 60;


    const seconds =
        Math.floor(
            remaining /
            1000
        );


    countdown.textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

}


/* =========================================
   SWITCH SHOPS
========================================= */

function showTicketShop() {

    const fortnightly =
        document.getElementById(
            "fortnightly-shop"
        );


    const ticket =
        document.getElementById(
            "ticket-shop"
        );


    if (fortnightly) {

        fortnightly.classList.add(
            "hidden"
        );

    }


    if (ticket) {

        ticket.classList.remove(
            "hidden"
        );

    }


    displayTicketShop();

}


function showFortnightlyShop() {

    const fortnightly =
        document.getElementById(
            "fortnightly-shop"
        );


    const ticket =
        document.getElementById(
            "ticket-shop"
        );


    if (ticket) {

        ticket.classList.add(
            "hidden"
        );

    }


    if (fortnightly) {

        fortnightly.classList.remove(
            "hidden"
        );

    }


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

        displayFortnightlyShop();

        displayTicketShop();

        updateCountdown();

        setInterval(
            updateCountdown,
            1000
        );

    }
);
```
