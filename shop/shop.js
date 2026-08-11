const SHOP_REFRESH = 14 * 24 * 60 * 60 * 1000;


/* ================================
   FORTNIGHTLY SHOP ITEMS
================================ */

const SHOP_ITEMS = [
    {
        name: "Purple Grid",
        rarity: "Common",
        type: "Banner",
        value: "purple-grid",
        price: 100
    },
    {
        name: "Neon Blue",
        rarity: "Common",
        type: "Banner",
        value: "neon-blue",
        price: 125
    },
    {
        name: "Space",
        rarity: "Common",
        type: "Banner",
        value: "space",
        price: 150
    },
    {
        name: "Lightning Shirt",
        rarity: "Rare",
        type: "Shirt",
        value: "lightning",
        price: 250
    },
    {
        name: "Sprint Shirt",
        rarity: "Rare",
        type: "Shirt",
        value: "sprint",
        price: 300
    },
    {
        name: "Sprint Visor",
        rarity: "Ultra Rare",
        type: "Hat",
        value: "visor",
        price: 450
    },
    {
        name: "Star Cap",
        rarity: "Ultra Rare",
        type: "Hat",
        value: "star-cap",
        price: 500
    },
    {
        name: "Split Pants",
        rarity: "Mythic",
        type: "Pants",
        value: "split",
        price: 600
    },
    {
        name: "The First Sprinter",
        rarity: "Legendary",
        type: "Player Title",
        value: "first-sprinter",
        price: 750
    }
];


/* ================================
   TICKET SHOP
================================ */

const TICKET_ITEMS = [
    {
        name: "Sparkle Effect",
        description: "Tiny sparkles follow your character.",
        price: 10,
        value: "sparkle"
    },
    {
        name: "Speed Trail",
        description: "Leaves a trail while moving.",
        price: 20,
        value: "speed-trail"
    },
    {
        name: "Lightning Effect",
        description: "Electric sparks surround your character.",
        price: 35,
        value: "lightning"
    },
    {
        name: "Rainbow Aura",
        description: "A colourful aura surrounds your character.",
        price: 50,
        value: "rainbow"
    },
    {
        name: "Fire Aura",
        description: "A fiery glow surrounds your character.",
        price: 75,
        value: "fire"
    },
    {
        name: "Glitch Effect",
        description: "A strange digital effect surrounds you.",
        price: 100,
        value: "glitch"
    },
    {
        name: "Shadow Aura",
        description: "A dark shadow surrounds you.",
        price: 150,
        value: "shadow"
    },
    {
        name: "Crystal Glow",
        description: "A bright crystalline glow surrounds you.",
        price: 250,
        value: "crystal"
    },
    {
        name: "Cosmic Aura",
        description: "Stars and cosmic particles surround you.",
        price: 500,
        value: "cosmic"
    },
    {
        name: "Crown + Glow",
        description: "An extremely rare glowing crown.",
        price: 1000,
        value: "crown"
    }
];


/* ================================
   CURRENCY
================================ */

function getCoins() {
    return Number(localStorage.getItem("coins")) || 0;
}


function getTickets() {
    return Number(localStorage.getItem("shopTickets")) || 0;
}


function setCoins(amount) {
    localStorage.setItem("coins", amount);
}


function setTickets(amount) {
    localStorage.setItem("shopTickets", amount);
}


/* ================================
   OWNED ITEMS
================================ */

function getOwnedItems() {

    try {
        return JSON.parse(
            localStorage.getItem("shopOwnedItems")
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


/* ================================
   UNLOCK COSMETIC
================================ */

function unlockCosmetic(item) {

    let storageKey = "unlocked_effects";


    if (item.type === "Banner") {
        storageKey = "unlocked_banners";
    }

    else if (item.type === "Shirt") {
        storageKey = "unlocked_shirts";
    }

    else if (item.type === "Hat") {
        storageKey = "unlocked_hats";
    }

    else if (item.type === "Pants") {
        storageKey = "unlocked_pants";
    }

    else if (item.type === "Player Title") {
        storageKey = "unlockedTitles";
    }


    let unlocked = [];


    try {
        unlocked =
            JSON.parse(
                localStorage.getItem(storageKey)
            ) || [];
    }

    catch {
        unlocked = [];
    }


    if (!unlocked.includes(item.value)) {
        unlocked.push(item.value);
    }


    localStorage.setItem(
        storageKey,
        JSON.stringify(unlocked)
    );

}


/* ================================
   FORTNIGHTLY SHOP GENERATION
================================ */

function generateShop() {

    const selected = [];


    /*
       Always give the shop 8 items.
    */

    for (let i = 0; i < 8; i++) {

        const item =
            SHOP_ITEMS[
                Math.floor(
                    Math.random() *
                    SHOP_ITEMS.length
                )
            ];

        selected.push(item.value);

    }


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


/* ================================
   GET CURRENT SHOP
================================ */

function getCurrentShop() {

    let selected = null;


    try {

        selected =
            JSON.parse(
                localStorage.getItem(
                    "fortnightlyShopItems"
                )
            );

    }

    catch {
        selected = null;
    }


    const start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || 0;


    if (
        !Array.isArray(selected) ||
        selected.length !== 8 ||
        !start
    ) {

        return generateShop();

    }


    if (
        Date.now() - start >=
        SHOP_REFRESH
    ) {

        return generateShop();

    }


    return selected;

}


/* ================================
   DISPLAY MAIN SHOP
================================ */

function displayMainShop() {

    const container =
        document.getElementById(
            "fortnightly-items"
        );


    if (!container) {
        return;
    }


    const selected =
        getCurrentShop();


    container.innerHTML = "";


    selected.forEach(
        function(value) {

            const item =
                SHOP_ITEMS.find(
                    x => x.value === value
                );


            if (!item) {
                return;
            }


            const card =
                document.createElement("div");


            card.className =
                "shop-card";


            const owned =
                ownsItem(item.value);


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

                button.disabled = true;

            }

            else {

                button.addEventListener(
                    "click",
                    function() {

                        buyMainItem(
                            item,
                            button
                        );

                    }
                );

            }


            container.appendChild(card);

        }
    );


    updateCurrency();

}


/* ================================
   BUY MAIN SHOP ITEM
================================ */

function buyMainItem(
    item,
    button
) {

    if (ownsItem(item.value)) {
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
        coins - item.price
    );


    unlockCosmetic(item);


    const owned =
        getOwnedItems();


    owned.push(item.value);


    saveOwnedItems(owned);


    button.disabled = true;

    button.textContent = "OWNED";


    updateCurrency();

}


/* ================================
   DISPLAY TICKET SHOP
================================ */

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
        function(item) {

            const owned =
                ownsItem(item.value);


            const card =
                document.createElement("div");


            card.className =
                "ticket-card";


            if (
                item.value === "crown"
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

                button.disabled = true;

            }

            else {

                button.addEventListener(
                    "click",
                    function() {

                        buyTicketItem(
                            item,
                            button
                        );

                    }
                );

            }


            container.appendChild(card);

        }
    );


    updateCurrency();

}


/* ================================
   BUY TICKET ITEM
================================ */

function buyTicketItem(
    item,
    button
) {

    if (ownsItem(item.value)) {
        return;
    }


    const tickets =
        getTickets();


    if (tickets < item.price) {

        alert(
            "You don't have enough Shop Tickets!"
        );

        return;
    }


    setTickets(
        tickets - item.price
    );


    unlockCosmetic({
        type: "effect",
        value: item.value
    });


    const owned =
        getOwnedItems();


    owned.push(item.value);


    saveOwnedItems(owned);


    button.disabled = true;

    button.textContent = "OWNED";


    updateCurrency();

}


/* ================================
   CURRENCY DISPLAY
================================ */

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


/* ================================
   COUNTDOWN
================================ */

function updateCountdown() {

    const element =
        document.getElementById(
            "countdown"
        );


    if (!element) {
        return;
    }


    const start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || 0;


    if (!start) {

        getCurrentShop();

    }


    const currentStart =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        );


    let remaining =
        (
            currentStart +
            SHOP_REFRESH
        ) -
        Date.now();


    if (remaining <= 0) {

        generateShop();

        displayMainShop();


        const newStart =
            Number(
                localStorage.getItem(
                    "fortnightlyShopStart"
                )
            );


        remaining =
            (
                newStart +
                SHOP_REFRESH
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


/* ================================
   SHOP NAVIGATION
================================ */

function openTicketShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );


    const ticket =
        document.getElementById(
            "ticket-shop"
        );


    if (!main || !ticket) {

        console.error(
            "Ticket Shop sections could not be found."
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


    if (!main || !ticket) {

        console.error(
            "Shop sections could not be found."
        );

        return;
    }


    ticket.style.display =
        "none";


    main.style.display =
        "block";


    displayMainShop();

}


/* ================================
   MAKE FUNCTIONS AVAILABLE
================================ */

window.openTicketShop =
    openTicketShop;

window.openMainShop =
    openMainShop;

window.buyMainItem =
    buyMainItem;

window.buyTicketItem =
    buyTicketItem;


/* ================================
   START SHOP
================================ */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        getCurrentShop();

        displayMainShop();

        displayTicketShop();

        updateCountdown();


        setInterval(
            updateCountdown,
            1000
        );

    }
);
