/* =========================================================
   STUDYSPRINT SHOP
========================================================= */

const SHOP_REFRESH_DAYS = 14;
const SHOP_ITEM_COUNT = 6;


/* =========================================================
   SHOP CHARACTERS
========================================================= */

const SHOP_CHARACTERS = [

    {
        id: "leafy",
        name: "Leafy",
        rarity: "Common",
        price: 250,
        design: "leafy",
        colour: "#65a30d"
    },

    {
        id: "squish",
        name: "Squish",
        rarity: "Common",
        price: 275,
        design: "squish",
        colour: "#60a5fa"
    },

    {
        id: "pebble",
        name: "Pebble",
        rarity: "Common",
        price: 300,
        design: "pebble",
        colour: "#78716c"
    },

    {
        id: "button",
        name: "Button",
        rarity: "Common",
        price: 325,
        design: "button",
        colour: "#f472b6"
    },

    {
        id: "horns",
        name: "Horns",
        rarity: "Rare",
        price: 400,
        design: "horns",
        colour: "#a78bfa"
    },

    {
        id: "shellby",
        name: "Shellby",
        rarity: "Rare",
        price: 425,
        design: "shellby",
        colour: "#34d399"
    },

    {
        id: "tallboi",
        name: "Tallboi",
        rarity: "Rare",
        price: 450,
        design: "tallboi",
        colour: "#fbbf24"
    },

    {
        id: "goggle",
        name: "Goggle",
        rarity: "Rare",
        price: 475,
        design: "goggle",
        colour: "#fb7185"
    },

    {
        id: "moth",
        name: "Mothball",
        rarity: "Epic",
        price: 550,
        design: "moth",
        colour: "#c084fc"
    },

    {
        id: "spike",
        name: "Spike",
        rarity: "Epic",
        price: 575,
        design: "spike",
        colour: "#f43f5e"
    },

    {
        id: "orbit",
        name: "Orbit",
        rarity: "Epic",
        price: 600,
        design: "orbit",
        colour: "#38bdf8"
    },

    {
        id: "bubble",
        name: "Bubble",
        rarity: "Epic",
        price: 625,
        design: "bubble",
        colour: "#22d3ee"
    },

    {
        id: "cape",
        name: "Captain Goob",
        rarity: "Mythic",
        price: 700,
        design: "captain",
        colour: "#8b5cf6"
    },

    {
        id: "tail",
        name: "Tailspin",
        rarity: "Mythic",
        price: 725,
        design: "tailspin",
        colour: "#ec4899"
    },

    {
        id: "halo",
        name: "Holy Moly",
        rarity: "Mythic",
        price: 750,
        design: "holymoly",
        colour: "#fef08a"
    },

    {
        id: "winged",
        name: "Wingnut",
        rarity: "Mythic",
        price: 775,
        design: "wingnut",
        colour: "#f0abfc"
    },

    {
        id: "cosmic",
        name: "Cosmo",
        rarity: "Legendary",
        price: 950,
        design: "cosmo",
        colour: "#312e81"
    },

    {
        id: "legend",
        name: "The Goober",
        rarity: "Legendary",
        price: 1000,
        design: "thegoober",
        colour: "#f97316"
    },

    {
        id: "golden",
        name: "Golden Goober",
        rarity: "Legendary",
        price: 1100,
        design: "golden",
        colour: "#fbbf24"
    },

    {
        id: "crystal",
        name: "Crystal",
        rarity: "Legendary",
        price: 1200,
        design: "crystal",
        colour: "#67e8f9"
    }

];


/* =========================================================
   STUDYPASS CHARACTERS
========================================================= */

const STUDYPASS_CHARACTERS = [

    {
        id: "study-sprout",
        name: "Study Sprout",
        rarity: "Epic",
        design: "studysprout",
        colour: "#22c55e"
    },

    {
        id: "study-orbit",
        name: "Study Orbit",
        rarity: "Legendary",
        design: "studyorbit",
        colour: "#8b5cf6"
    }

];


/* =========================================================
   TICKET SHOP
========================================================= */

const TICKET_ITEMS = [

    {
        id: "sparkle",
        name: "Sparkle Effect",
        description: "Tiny sparkles follow your character.",
        type: "Effect",
        price: 10
    },

    {
        id: "speed-trail",
        name: "Speed Trail",
        description: "Leaves a trail behind your character.",
        type: "Effect",
        price: 20
    },

    {
        id: "lightning",
        name: "Lightning Effect",
        description: "Electric sparks surround your character.",
        type: "Effect",
        price: 35
    },

    {
        id: "rainbow",
        name: "Rainbow Aura",
        description: "A colourful aura surrounds your character.",
        type: "Effect",
        price: 50
    },

    {
        id: "fire",
        name: "Fire Aura",
        description: "A fiery glow surrounds your character.",
        type: "Effect",
        price: 75
    },

    {
        id: "glitch",
        name: "Glitch Effect",
        description: "A strange digital effect surrounds your character.",
        type: "Effect",
        price: 100
    },

    {
        id: "shadow",
        name: "Shadow Aura",
        description: "A dark shadow surrounds your character.",
        type: "Effect",
        price: 150
    },

    {
        id: "crystal-glow",
        name: "Crystal Glow",
        description: "A bright crystalline glow surrounds your character.",
        type: "Effect",
        price: 250
    },

    {
        id: "cosmic-aura",
        name: "Cosmic Aura",
        description: "Stars and cosmic particles surround your character.",
        type: "Effect",
        price: 500
    },

    {
        id: "crown",
        name: "Crown + Glow",
        description: "The extremely rare glowing crown.",
        type: "Hat",
        price: 1000
    }

];


/* =========================================================
   CURRENCY
========================================================= */

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


/* =========================================================
   OWNED ITEMS
========================================================= */

function getOwnedItems() {

    try {
        return JSON.parse(
            localStorage.getItem("shopOwnedItems")
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
    return getOwnedItems().includes(id);
}


/* =========================================================
   UNLOCK
========================================================= */

function unlockItem(id, type) {

    const keys = {
        Character: "unlocked_characters",
        Banner: "unlocked_banners",
        Effect: "unlocked_effects",
        "Player Title": "unlockedTitles",
        Hat: "unlocked_hats"
    };

    const key = keys[type];

    if (!key) return;

    let unlocked = [];

    try {
        unlocked =
            JSON.parse(
                localStorage.getItem(key)
            ) || [];
    } catch {
        unlocked = [];
    }

    if (!unlocked.includes(id)) {
        unlocked.push(id);
    }

    localStorage.setItem(
        key,
        JSON.stringify(unlocked)
    );
}


/* =========================================================
   GOOBER HELPERS
========================================================= */

function addPart(parent, className) {

    const part =
        document.createElement("div");

    part.className =
        className;

    parent.appendChild(part);

    return part;
}


/* =========================================================
   GOOBER CREATOR
========================================================= */

function createGoober(data) {

    const goober =
        document.createElement("div");

    goober.className =
        "goober goober-" +
        data.design;


    /*
       IMPORTANT LAYER ORDER

       Back accessories
       → feet
       → body
       → face
       → front accessories
    */


    /* -----------------------------------------------------
       BACK ACCESSORIES
    ----------------------------------------------------- */

    if (
        data.design === "captain"
    ) {

        addPart(
            goober,
            "goober-cape"
        );

    }


    if (
        data.design === "moth" ||
        data.design === "wingnut"
    ) {

        addPart(
            goober,
            "goober-wings"
        );

    }


    if (
        data.design === "shellby"
    ) {

        addPart(
            goober,
            "goober-shell"
        );

    }


    /* -----------------------------------------------------
       FEET
    ----------------------------------------------------- */

    addPart(
        goober,
        "goober-foot goober-foot-left"
    );

    addPart(
        goober,
        "goober-foot goober-foot-right"
    );


    /* -----------------------------------------------------
       BODY
    ----------------------------------------------------- */

    const body =
        addPart(
            goober,
            "goober-body"
        );

    body.style.background =
        data.colour;


    /* -----------------------------------------------------
       FACE
    ----------------------------------------------------- */

    /*
       Eyes are deliberately created AFTER the body.
       This fixes Mushroom/other characters having their
       eyes behind the body layer.
    */

    if (
        data.design === "goggle"
    ) {

        addPart(
            goober,
            "goggle-frame"
        );

        addPart(
            goober,
            "goggle-lens goggle-left"
        );

        addPart(
            goober,
            "goggle-lens goggle-right"
        );

        addPart(
            goober,
            "goggle-crack"
        );

        addPart(
            goober,
            "goggle-strap"
        );

    } else {

        addPart(
            goober,
            "goober-eye goober-eye-left"
        );

        addPart(
            goober,
            "goober-eye goober-eye-right"
        );

    }


    addPart(
        goober,
        "goober-mouth"
    );


    /* -----------------------------------------------------
       FRONT ACCESSORIES
    ----------------------------------------------------- */

    switch (data.design) {

        case "leafy":

            addPart(
                goober,
                "leafy-stem"
            );

            addPart(
                goober,
                "leafy-leaf"
            );

            break;


        case "studysprout":

            addPart(
                goober,
                "sprout-pot"
            );

            addPart(
                goober,
                "sprout-leaf sprout-leaf-one"
            );

            addPart(
                goober,
                "sprout-leaf sprout-leaf-two"
            );

            addPart(
                goober,
                "sprout-leaf sprout-leaf-three"
            );

            addPart(
                goober,
                "sprout-pencil"
            );

            break;


        case "button":

            addPart(
                goober,
                "button-antenna"
            );

            addPart(
                goober,
                "button-tip"
            );

            break;


        case "horns":

            addPart(
                goober,
                "horn horn-left"
            );

            addPart(
                goober,
                "horn horn-right"
            );

            break;


        case "tallboi":

            addPart(
                goober,
                "tallboi-top"
            );

            break;


        case "moth":

            addPart(
                goober,
                "moth-antennae"
            );

            addPart(
                goober,
                "moth-pattern"
            );

            break;


        case "spike":

            addPart(
                goober,
                "spike-crown"
            );

            addPart(
                goober,
                "spike-side-one"
            );

            addPart(
                goober,
                "spike-side-two"
            );

            break;


        case "orbit":

            addPart(
                goober,
                "goober-orbit"
            );

            addPart(
                goober,
                "orbit-dot"
            );

            break;


        case "bubble":

            addPart(
                goober,
                "bubble-highlight"
            );

            addPart(
                goober,
                "bubble-bubbles"
            );

            break;


        case "captain":

            addPart(
                goober,
                "captain-badge"
            );

            addPart(
                goober,
                "captain-mask"
            );

            break;


        case "tailspin":

            addPart(
                goober,
                "goober-tail"
            );

            addPart(
                goober,
                "tail-tip"
            );

            break;


        case "holymoly":

            addPart(
                goober,
                "goober-halo"
            );

            addPart(
                goober,
                "halo-sparkles"
            );

            break;


        case "wingnut":

            addPart(
                goober,
                "wingnut-headpiece"
            );

            break;


        case "cosmo":

            addPart(
                goober,
                "cosmo-stars"
            );

            addPart(
                goober,
                "cosmo-planet"
            );

            break;


        case "thegoober":

            addPart(
                goober,
                "thegoober-smile"
            );

            addPart(
                goober,
                "thegoober-mark"
            );

            break;


        case "golden":

            addPart(
                goober,
                "golden-shine"
            );

            addPart(
                goober,
                "golden-sparkles"
            );

            break;


        case "crystal":

            addPart(
                goober,
                "crystal-spikes"
            );

            addPart(
                goober,
                "crystal-core"
            );

            break;


        case "studyorbit":

            addPart(
                goober,
                "study-orbit-ring"
            );

            addPart(
                goober,
                "study-orbit-star"
            );

            addPart(
                goober,
                "study-orbit-book"
            );

            break;

    }


    return goober;
}


/* =========================================================
   RARITY
========================================================= */

function rarityClass(rarity) {

    return "rarity-" +
        rarity
            .toLowerCase()
            .replace(/\s+/g, "-");
}


/* =========================================================
   SHOP TIMING
========================================================= */

const SHOP_ANCHOR =
    Date.UTC(
        2025,
        7,
        9,
        14,
        0,
        0
    );


function getShopStart() {

    const now =
        Date.now();

    const interval =
        SHOP_REFRESH_DAYS *
        24 *
        60 *
        60 *
        1000;

    const cycles =
        Math.floor(
            (now - SHOP_ANCHOR) /
            interval
        );

    return (
        SHOP_ANCHOR +
        cycles * interval
    );
}


/* =========================================================
   SEEDED SHUFFLE
========================================================= */

function seededShuffle(array, seed) {

    const result =
        [...array];

    let value =
        seed;

    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        value =
            (
                value * 9301 +
                49297
            ) % 233280;

        const j =
            Math.floor(
                value /
                233280 *
                (i + 1)
            );

        [
            result[i],
            result[j]
        ] = [
            result[j],
            result[i]
        ];
    }

    return result;
}


/* =========================================================
   CURRENT SHOP
========================================================= */

function getCurrentShop() {

    const start =
        getShopStart();

    const seed =
        Math.floor(
            start / 1000
        );

    const characters =
        seededShuffle(
            SHOP_CHARACTERS,
            seed
        );

    return characters
        .slice(0, SHOP_ITEM_COUNT)
        .map(character => ({
            ...character,
            type: "Character"
        }));
}


/* =========================================================
   SHOP CARD
========================================================= */

function createShopCard(item) {

    const card =
        document.createElement("article");

    card.className =
        "shop-card";


    const rarity =
        document.createElement("div");

    rarity.className =
        "rarity " +
        rarityClass(item.rarity);

    rarity.textContent =
        item.rarity;


    const preview =
        document.createElement("div");

    preview.className =
        "item-preview";

    preview.appendChild(
        createGoober(item)
    );


    const name =
        document.createElement("h3");

    name.textContent =
        item.name;


    const type =
        document.createElement("p");

    type.textContent =
        item.type;


    const price =
        document.createElement("div");

    price.className =
        "shop-price";

    price.textContent =
        item.price +
        " Coins";


    const button =
        document.createElement("button");

    button.className =
        "buy-button";

    button.type =
        "button";


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

    } else {

        button.textContent =
            "BUY";

        button.onclick =
            () =>
                buyMainItem(
                    item,
                    button
                );

    }


    card.appendChild(rarity);
    card.appendChild(preview);
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}


/* =========================================================
   MAIN SHOP
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

    getCurrentShop()
        .forEach(item => {

            container.appendChild(
                createShopCard(item)
            );

        });

    updateCurrency();
}


/* =========================================================
   BUY MAIN ITEM
========================================================= */

function buyMainItem(item, button) {

    if (
        ownsItem(item.id)
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

    unlockItem(
        item.id,
        item.type
    );

    const owned =
        getOwnedItems();

    if (
        !owned.includes(item.id)
    ) {

        owned.push(item.id);

    }

    saveOwnedItems(
        owned
    );

    button.disabled =
        true;

    button.textContent =
        "OWNED";

    button.classList.add(
        "owned"
    );

    updateCurrency();
}


/* =========================================================
   TICKET SHOP
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

    TICKET_ITEMS.forEach(item => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "ticket-card";


        const preview =
            document.createElement(
                "div"
            );

        preview.className =
            "ticket-item-preview";


        const goober =
            createGoober({
                design: "squish",
                colour: "#6366f1"
            });


        preview.appendChild(
            goober
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

        button.className =
            "buy-button";


        if (
            ownsItem(item.id)
        ) {

            button.textContent =
                "OWNED";

            button.disabled =
                true;

        } else {

            button.textContent =
                "BUY";

            button.onclick =
                () =>
                    buyTicketItem(
                        item,
                        button
                    );

        }


        card.appendChild(preview);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(price);
        card.appendChild(button);

        container.appendChild(card);

    });

    updateCurrency();
}


/* =========================================================
   BUY TICKET ITEM
========================================================= */

function buyTicketItem(item, button) {

    if (
        ownsItem(item.id)
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

    unlockItem(
        item.id,
        item.type
    );

    const owned =
        getOwnedItems();

    if (
        !owned.includes(item.id)
    ) {

        owned.push(item.id);

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


/* =========================================================
   STUDYPASS
========================================================= */

function displayStudyPass() {

    const container =
        document.getElementById(
            "studypass-items"
        );

    if (!container)
        return;

    container.innerHTML =
        "";

    STUDYPASS_CHARACTERS.forEach(item => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "studypass-card";


        const badge =
            document.createElement(
                "div"
            );

        badge.className =
            "pass-badge";

        badge.textContent =
            "STUDYPASS";


        const rarity =
            document.createElement(
                "div"
            );

        rarity.className =
            "rarity " +
            rarityClass(item.rarity);

        rarity.textContent =
            item.rarity;


        const preview =
            document.createElement(
                "div"
            );

        preview.className =
            "studypass-preview";

        preview.appendChild(
            createGoober(item)
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
            "Exclusive StudyPass character";


        card.appendChild(badge);
        card.appendChild(rarity);
        card.appendChild(preview);
        card.appendChild(name);
        card.appendChild(description);

        container.appendChild(card);

    });
}


/* =========================================================
   CURRENCY DISPLAY
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

    if (coins)
        coins.textContent =
            getCoins();

    if (tickets)
        tickets.textContent =
            getTickets();
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

    const next =
        getShopStart() +
        SHOP_REFRESH_DAYS *
        24 *
        60 *
        60 *
        1000;

    let remaining =
        next - Date.now();

    if (remaining < 0)
        remaining = 0;

    const days =
        Math.floor(
            remaining / 86400000
        );

    const hours =
        Math.floor(
            (remaining % 86400000) /
            3600000
        );

    const minutes =
        Math.floor(
            (remaining % 3600000) /
            60000
        );

    const seconds =
        Math.floor(
            (remaining % 60000) /
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
   SHOP NAVIGATION
========================================================= */

function openTicketShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );

    const tickets =
        document.getElementById(
            "ticket-shop"
        );

    if (main)
        main.style.display =
            "none";

    if (tickets)
        tickets.style.display =
            "block";


    document
        .getElementById(
            "main-shop-button"
        )
        ?.classList.remove(
            "active"
        );

    document
        .getElementById(
            "ticket-shop-button"
        )
        ?.classList.add(
            "active"
        );
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

    if (tickets)
        tickets.style.display =
            "none";

    if (main)
        main.style.display =
            "block";


    document
        .getElementById(
            "ticket-shop-button"
        )
        ?.classList.remove(
            "active"
        );

    document
        .getElementById(
            "main-shop-button"
        )
        ?.classList.add(
            "active"
        );
}


/* =========================================================
   DEBUG MENU
========================================================= */

function openDebugMenu() {

    const existing =
        document.querySelector(
            ".debug-overlay"
        );

    if (existing)
        return;


    const overlay =
        document.createElement("div");

    overlay.className =
        "debug-overlay";


    const box =
        document.createElement("div");

    box.className =
        "debug-box";


    box.innerHTML = `
        <h2>🛠️ StudySprint Debug</h2>

        <p>What do you want to change?</p>

        <select id="debug-type">

            <option value="xp">⭐ XP</option>
            <option value="coins">🪙 Coins</option>
            <option value="tickets">🎟️ Tickets</option>
            <option value="streak">🔥 Streak</option>
            <option value="reset">🗑️ Reset Account</option>

        </select>

        <input
            id="debug-value"
            type="number"
            placeholder="Amount"
        >

        <button
            class="debug-apply"
            id="debug-apply"
        >
            Apply
        </button>

        <button
            class="debug-close"
            id="debug-close"
        >
            Cancel
        </button>
    `;


    overlay.appendChild(box);
    document.body.appendChild(overlay);


    const type =
        box.querySelector(
            "#debug-type"
        );

    const value =
        box.querySelector(
            "#debug-value"
        );


    function updateInput() {

        value.style.display =
            type.value === "reset"
                ? "none"
                : "block";
    }


    type.addEventListener(
        "change",
        updateInput
    );

    updateInput();


    box.querySelector(
        "#debug-close"
    ).onclick = () => {

        overlay.remove();

    };


    box.querySelector(
        "#debug-apply"
    ).onclick = () => {

        const selected =
            type.value;


        if (
            selected === "reset"
        ) {

            const confirmed =
                confirm(
                    "Reset your entire StudySprint account?"
                );

            if (!confirmed)
                return;

            localStorage.clear();

            location.reload();

            return;
        }


        const amount =
            Number(value.value);


        if (
            !Number.isFinite(amount)
        ) {

            alert(
                "Enter a valid number."
            );

            return;
        }


        const keys = {

            xp: "xp",
            coins: "coins",
            tickets: "shopTickets",
            streak: "streak"

        };


        localStorage.setItem(
            keys[selected],
            amount
        );


        overlay.remove();

        location.reload();

    };
}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const mainButton =
            document.getElementById(
                "main-shop-button"
            );

        const ticketButton =
            document.getElementById(
                "ticket-shop-button"
            );

        const debugButton =
            document.getElementById(
                "debug-open"
            );


        if (mainButton) {

            mainButton.addEventListener(
                "click",
                openMainShop
            );

        }


        if (ticketButton) {

            ticketButton.addEventListener(
                "click",
                openTicketShop
            );

        }


        if (debugButton) {

            debugButton.addEventListener(
                "click",
                openDebugMenu
            );

        }


        displayMainShop();
        displayTicketShop();
        displayStudyPass();

        updateCurrency();
        updateCountdown();


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

window.createGoober =
    createGoober;
