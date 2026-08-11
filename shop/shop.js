```javascript
/* =========================================
   STUDYSPRINT SHOP
========================================= */


const ROTATION_LENGTH =
    14 * 24 * 60 * 60 * 1000;


const SHOP_VERSION =
    "test-month-1";


/* =========================================
   FORTNIGHTLY ITEMS
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
        description:
            "Tiny sparkles follow your character.",
        price: 10,
        type: "effect",
        value: "sparkle"
    },

    speed_trail: {
        name: "Speed Trail",
        description:
            "Leaves a small trail while moving.",
        price: 20,
        type: "effect",
        value: "speed-trail"
    },

    lightning_effect: {
        name: "Lightning Effect",
        description:
            "Electric sparks surround your character.",
        price: 35,
        type: "effect",
        value: "lightning"
    },

    rainbow_aura: {
        name: "Rainbow Aura",
        description:
            "A colourful aura surrounds your character.",
        price: 50,
        type: "effect",
        value: "rainbow"
    },

    fire_aura: {
        name: "Fire Aura",
        description:
            "A fiery glow surrounds your character.",
        price: 75,
        type: "effect",
        value: "fire"
    },

    glitch_effect: {
        name: "Glitch Effect",
        description:
            "A strange digital effect surrounds you.",
        price: 100,
        type: "effect",
        value: "glitch"
    },

    shadow_aura: {
        name: "Shadow Aura",
        description:
            "A dark shadow surrounds your character.",
        price: 150,
        type: "effect",
        value: "shadow"
    },

    crystal_glow: {
        name: "Crystal Glow",
        description:
            "A bright crystalline glow.",
        price: 250,
        type: "effect",
        value: "crystal"
    },

    cosmic_aura: {
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
            "An extremely rare crown with a powerful glow.",
        price: 1000,
        type: "effect",
        value: "crown",
        legendary: true
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

    return getOwnedItems()
        .includes(id);

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

    else if (item.type === "effect") {

        key = "unlocked_effects";

    }

    else {

        return;

    }


    let unlocked =
        JSON.parse(
            localStorage.getItem(key)
        ) || [];


    if (!unlocked.includes(item.value)) {

        unlocked.push(item.value);

    }


    localStorage.setItem(
        key,
        JSON.stringify(unlocked)
    );

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


    return "Empty";

}


/* =========================================
   FIND ITEMS
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

    const items = [];


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const rarity =
            rollRarity();


        if (
            rarity === "Very Common"
        ) {

            items.push({
                type: "ticket",
                id: "shop-ticket"
            });

            continue;

        }


        if (
            rarity === "Empty"
        ) {

            items.push(null);

            continue;

        }


        const possible =
            getItemsByRarity(
                rarity
            );


        if (
            possible.length === 0
        ) {

            items.push(null);

            continue;

        }


        const index =
            Math.floor(
                Math.random() *
                possible.length
            );


        items.push(
            possible[index]
        );

    }


    localStorage.setItem(
        "fortnightlyShopItems",
        JSON.stringify(items)
    );


    localStorage.setItem(
        "fortnightlyShopStart",
        String(Date.now())
    );


    localStorage.setItem(
        "fortnightlyShopVersion",
        SHOP_VERSION
    );


    return items;

}


/* =========================================
   LOAD SHOP
========================================= */

function loadShop() {

    const start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || 0;


    const version =
        localStorage.getItem(
            "fortnightlyShopVersion"
        );


    const expired =
        start > 0 &&
        Date.now() - start >=
        ROTATION_LENGTH;


    if (
        !start ||
        version !== SHOP_VERSION ||
        expired
    ) {

        return generateShop();

    }


    try {

        return JSON.parse(
            localStorage.getItem(
                "fortnightlyShopItems"
            )
        ) || generateShop();

    }

    catch {

        return generateShop();

    }

}


/* =========================================
   RARITY CLASS
========================================= */

function rarityClass(rarity) {

    return rarity
        .toLowerCase()
        .replaceAll(" ", "-");

}


/* =========================================
   DISPLAY FORTNIGHTLY SHOP
========================================= */

function displayFortnightlyShop() {

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
        function(item) {

            const card =
                document.createElement(
                    "div"
                );


            if (!item) {

                card.className =
                    "shop-card empty-card";

                card.innerHTML = `
                    <div class="empty-icon">
                        ?
                    </div>

                    <h3>
                        Nothing New
                    </h3>

                    <p>
                        This slot is empty.
                    </p>
                `;

                container.appendChild(card);

                return;

            }


            if (
                item.type === "ticket"
            ) {

                card.className =
                    "shop-card very-common";

                card.innerHTML = `
                    <div class="rarity">
                        Very Common
                    </div>

                    <div class="item-preview">
                        🎟️
                    </div>

                    <h3>
                        Shop Ticket
                    </h3>

                    <p>
                        Use this in the permanent Ticket Shop.
                    </p>

                    <div class="shop-price">
                        FREE
                    </div>

                    <button
                        class="buy-button"
                        onclick="claimShopTicket(this)"
                    >
                        CLAIM
                    </button>
                `;

                container.appendChild(card);

                return;

            }


            const itemData =
                SHOP_ITEMS[item];


            card.className =
                "shop-card " +
                rarityClass(
                    itemData.rarity
                );


            card.innerHTML = `
                <div class="rarity">
                    ${itemData.rarity}
                </div>

                <div class="item-preview">
                    ${itemData.name}
                </div>

                <h3>
                    ${itemData.name}
                </h3>

                <p>
                    ${itemData.type}
                </p>

                <div class="shop-price">
                    🪙 ${itemData.price}
                </div>

                <button
                    class="buy-button"
                    onclick="buyShopItem('${item}', this)"
                >
                    ${
                        ownsItem(item)
                        ? "OWNED"
                        : "BUY"
                    }
                </button>
            `;


            container.appendChild(card);

        }
    );


    updateCurrency();

}


/* =========================================
   CLAIM SHOP TICKET
========================================= */

function claimShopTicket(button) {

    if (
        button.disabled
    )
        return;


    const tickets =
        getTickets();


    setTickets(
        tickets + 1
    );


    button.disabled =
        true;


    button.textContent =
        "CLAIMED";


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
        coins - item.price
    );


    unlockCosmetic(item);


    const owned =
        getOwnedItems();


    owned.push(itemID);


    saveOwnedItems(owned);


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
                item.legendary
            ) {

                card.classList.add(
                    "crown-card"
                );

            }


            card.innerHTML = `
                <div class="ticket-item-preview">
                    ${
                        item.legendary
                        ? "CROWN"
                        : item.name
                    }
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
                    onclick="buyTicketItem('${itemID}', this)"
                >
                    ${
                        ownsItem(itemID)
                        ? "OWNED"
                        : "BUY"
                    }
                </button>
            `;


            container.appendChild(card);

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
        tickets - item.price
    );


    unlockCosmetic(item);


    const owned =
        getOwnedItems();


    owned.push(itemID);


    saveOwnedItems(owned);


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

        generateShop();

        start =
            Number(
                localStorage.getItem(
                    "fortnightlyShopStart"
                )
            );

    }


    let end =
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

        start =
            Number(
                localStorage.getItem(
                    "fortnightlyShopStart"
                )
            );

        end =
            start +
            ROTATION_LENGTH;

        remaining =
            end -
            Date.now();

    }


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


    countdown.textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

}


/* =========================================
   SWITCH SHOP
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
   GLOBAL
========================================= */

window.showTicketShop =
    showTicketShop;

window.showFortnightlyShop =
    showFortnightlyShop;

window.buyShopItem =
    buyShopItem;

window.buyTicketItem =
    buyTicketItem;

window.claimShopTicket =
    claimShopTicket;


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
