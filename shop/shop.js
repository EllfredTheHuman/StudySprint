/* =========================================================
   STUDYSPRINT SHOP
========================================================= */

const SHOP_ITEM_COUNT = 6;
const SHOP_REFRESH_DAYS = 14;
const DAY_MS = 86400000;

/*
   AEST is UTC+10.

   This anchor is:
   Sunday 10 August 2025
   12:00 AM AEST

   Every 14 days after this is a shop reset.
   Because the calculation uses UTC timestamps, every
   player sees exactly the same rotation.
*/

const SHOP_ANCHOR = Date.UTC(
    2025,
    7,
    9,
    14,
    0,
    0
);


/* =========================================================
   SHOP CHARACTERS
========================================================= */

const SHOP_CHARACTERS = [

    {
        id: "leafy",
        name: "Leafy",
        rarity: "Common",
        price: 250,
        shape: "round",
        colour: "#65a30d",
        feature: "leaf"
    },

    {
        id: "squish",
        name: "Squish",
        rarity: "Common",
        price: 275,
        shape: "squish",
        colour: "#60a5fa",
        feature: "none"
    },

    {
        id: "pebble",
        name: "Pebble",
        rarity: "Common",
        price: 300,
        shape: "round",
        colour: "#78716c",
        feature: "none"
    },

    {
        id: "button",
        name: "Button",
        rarity: "Common",
        price: 325,
        shape: "round",
        colour: "#f472b6",
        feature: "antenna"
    },

    {
        id: "horns",
        name: "Horns",
        rarity: "Rare",
        price: 400,
        shape: "round",
        colour: "#a78bfa",
        feature: "horns"
    },

    {
        id: "shellby",
        name: "Shellby",
        rarity: "Rare",
        price: 425,
        shape: "round",
        colour: "#34d399",
        feature: "shell"
    },

    {
        id: "tallboi",
        name: "Tallboi",
        rarity: "Rare",
        price: 450,
        shape: "tall",
        colour: "#fbbf24",
        feature: "none"
    },

    {
        id: "four-eyes",
        name: "Four Eyes",
        rarity: "Rare",
        price: 475,
        shape: "four-eyes",
        colour: "#fb7185",
        feature: "glasses"
    },

    {
        id: "moth",
        name: "Mothball",
        rarity: "Epic",
        price: 550,
        shape: "round",
        colour: "#c084fc",
        feature: "wings"
    },

    {
        id: "spike",
        name: "Spike",
        rarity: "Epic",
        price: 575,
        shape: "spiky",
        colour: "#f43f5e",
        feature: "spikes"
    },

    {
        id: "orbit",
        name: "Orbit",
        rarity: "Epic",
        price: 600,
        shape: "floating",
        colour: "#38bdf8",
        feature: "ring"
    },

    {
        id: "bubble",
        name: "Bubble",
        rarity: "Epic",
        price: 625,
        shape: "round",
        colour: "#22d3ee",
        feature: "halo"
    },

    {
        id: "cape",
        name: "Captain Goob",
        rarity: "Mythic",
        price: 700,
        shape: "round",
        colour: "#8b5cf6",
        feature: "cape"
    },

    {
        id: "tail",
        name: "Tailspin",
        rarity: "Mythic",
        price: 725,
        shape: "round",
        colour: "#ec4899",
        feature: "tail"
    },

    {
        id: "halo",
        name: "Holy Moly",
        rarity: "Mythic",
        price: 750,
        shape: "round",
        colour: "#fef08a",
        feature: "halo"
    },

    {
        id: "winged",
        name: "Wingnut",
        rarity: "Mythic",
        price: 775,
        shape: "floating",
        colour: "#f0abfc",
        feature: "wings"
    },

    {
        id: "royal",
        name: "Royal Goober",
        rarity: "Legendary",
        price: 900,
        shape: "round",
        colour: "#f59e0b",
        feature: "crown"
    },

    {
        id: "cosmic",
        name: "Cosmo",
        rarity: "Legendary",
        price: 950,
        shape: "floating",
        colour: "#312e81",
        feature: "stars"
    },

    {
        id: "legend",
        name: "The Goober",
        rarity: "Legendary",
        price: 1000,
        shape: "round",
        colour: "#f97316",
        feature: "orbit"
    },

    {
        id: "golden",
        name: "Golden Goober",
        rarity: "Legendary",
        price: 1100,
        shape: "round",
        colour: "#fbbf24",
        feature: "legendary"
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
        colour: "#22c55e",
        shape: "round",
        feature: "leaf"
    },

    {
        id: "study-orbit",
        name: "Study Orbit",
        rarity: "Legendary",
        colour: "#8b5cf6",
        shape: "floating",
        feature: "orbit"
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
        id: "crystal",
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
    localStorage.setItem("coins", String(amount));
}

function setTickets(amount) {
    localStorage.setItem("shopTickets", String(amount));
}


/* =========================================================
   OWNED ITEMS
========================================================= */

function getOwnedItems() {

    try {

        const data = JSON.parse(
            localStorage.getItem("shopOwnedItems")
        );

        return Array.isArray(data) ? data : [];

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
   UNLOCK ITEM
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

        const stored =
            JSON.parse(
                localStorage.getItem(key)
            );

        unlocked =
            Array.isArray(stored)
                ? stored
                : [];

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
   GOOBER CREATION
========================================================= */

function createGoober(data) {

    const goober =
        document.createElement("div");

    goober.className =
        `goober goober-${data.shape || "round"}`;

    goober.dataset.rarity =
        data.rarity || "Common";


    const body =
        document.createElement("div");

    body.className =
        "goober-body";

    body.style.background =
        data.colour || "#6366f1";


    const leftEye =
        document.createElement("div");

    leftEye.className =
        "goober-eye left";


    const rightEye =
        document.createElement("div");

    rightEye.className =
        "goober-eye right";


    const mouth =
        document.createElement("div");

    mouth.className =
        "goober-mouth";


    const leftFoot =
        document.createElement("div");

    leftFoot.className =
        "goober-foot left";


    const rightFoot =
        document.createElement("div");

    rightFoot.className =
        "goober-foot right";


    goober.appendChild(leftFoot);
    goober.appendChild(rightFoot);
    goober.appendChild(body);
    goober.appendChild(leftEye);
    goober.appendChild(rightEye);
    goober.appendChild(mouth);


    /* =====================================================
       FEATURES
    ===================================================== */

    if (data.feature === "leaf") {

        const leaf =
            document.createElement("div");

        leaf.className =
            "goober-leaf";

        goober.appendChild(leaf);

    }


    if (data.feature === "antenna") {

        const antenna =
            document.createElement("div");

        antenna.className =
            "goober-antenna";

        goober.appendChild(antenna);

    }


    if (data.feature === "horns") {

        const leftHorn =
            document.createElement("div");

        leftHorn.className =
            "goober-horn left";

        const rightHorn =
            document.createElement("div");

        rightHorn.className =
            "goober-horn right";

        goober.appendChild(leftHorn);
        goober.appendChild(rightHorn);

    }


    if (data.feature === "shell") {

        const shell =
            document.createElement("div");

        shell.className =
            "goober-shell";

        goober.appendChild(shell);

    }


    if (data.feature === "wings") {

        const wings =
            document.createElement("div");

        wings.className =
            "goober-wings";

        goober.appendChild(wings);

    }


    if (data.feature === "ring") {

        const ring =
            document.createElement("div");

        ring.className =
            "goober-ring";

        goober.appendChild(ring);

    }


    if (data.feature === "halo") {

        const halo =
            document.createElement("div");

        halo.className =
            "goober-halo";

        goober.appendChild(halo);

    }


    if (data.feature === "spikes") {

        const spikes =
            document.createElement("div");

        spikes.className =
            "goober-spikes";

        goober.appendChild(spikes);

    }


    if (data.feature === "cape") {

        const cape =
            document.createElement("div");

        cape.className =
            "goober-cape";

        goober.appendChild(cape);

    }


    if (data.feature === "tail") {

        const tail =
            document.createElement("div");

        tail.className =
            "goober-tail";

        goober.appendChild(tail);

    }


    if (data.feature === "crown") {

        const crown =
            document.createElement("div");

        crown.className =
            "goober-crown";

        goober.appendChild(crown);

    }


    if (data.feature === "orbit") {

        const orbit =
            document.createElement("div");

        orbit.className =
            "goober-orbit";

        goober.appendChild(orbit);

    }


    if (data.feature === "stars") {

        const stars =
            document.createElement("div");

        stars.className =
            "goober-stars";

        stars.innerHTML =
            "✦ · ★ · ✧";

        goober.appendChild(stars);

    }


    if (data.feature === "legendary") {

        body.classList.add(
            "goober-legendary-body"
        );

        const crown =
            document.createElement("div");

        crown.className =
            "goober-crown";

        goober.appendChild(crown);

        const stars =
            document.createElement("div");

        stars.className =
            "goober-stars";

        stars.innerHTML =
            "✦ ★ ✦";

        goober.appendChild(stars);

    }


    if (data.feature === "glasses") {

        body.classList.add(
            "goober-glasses"
        );

    }


    if (data.shape === "four-eyes") {

        const extraLeft =
            document.createElement("div");

        extraLeft.className =
            "goober-eye extra-left";

        const extraRight =
            document.createElement("div");

        extraRight.className =
            "goober-eye extra-right";

        goober.appendChild(extraLeft);
        goober.appendChild(extraRight);

    }


    return goober;

}


/* =========================================================
   RARITY
========================================================= */

function rarityClass(rarity) {

    return "rarity-" +
        String(rarity)
            .toLowerCase()
            .replace(/\s+/g, "-");

}


/* =========================================================
   SHOP ROTATION
========================================================= */

function getShopStart() {

    const now = Date.now();

    const interval =
        SHOP_REFRESH_DAYS * DAY_MS;

    const cycles =
        Math.floor(
            (now - SHOP_ANCHOR) /
            interval
        );

    return SHOP_ANCHOR +
        cycles * interval;

}


/*
   Deterministic shuffle.

   Everyone receives the same result because the seed
   comes from the globally shared shop start time.
*/

function seededShuffle(array, seed) {

    const result = [...array];

    let value =
        Math.abs(
            Math.floor(seed)
        );

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
                (value / 233280) *
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


function getCurrentShop() {

    const start =
        getShopStart();

    const seed =
        Math.floor(start / 1000);

    const shuffled =
        seededShuffle(
            SHOP_CHARACTERS,
            seed
        );

    /*
       EXACTLY SIX characters.
    */

    return shuffled
        .slice(0, SHOP_ITEM_COUNT)
        .map(character => ({
            ...character,
            type: "Character"
        }));

}


/* =========================================================
   PREVIEWS
========================================================= */

function bannerPreview(id) {

    const preview =
        document.createElement("div");

    preview.className =
        "banner-preview";


    if (id === "sprint-grid") {

        preview.classList.add(
            "banner-sprint"
        );

    } else if (id === "purple-grid") {

        preview.classList.add(
            "banner-purple"
        );

    } else {

        preview.classList.add(
            "banner-blue"
        );

    }


    return preview;

}


function createPreview(item) {

    if (item.type === "Character") {

        return createGoober(item);

    }

    if (item.type === "Banner") {

        return bannerPreview(item.id);

    }

    return createGoober({
        shape: "round",
        colour: "#6366f1",
        feature: "none"
    });

}


/* =========================================================
   MAIN SHOP CARD
========================================================= */

function createShopCard(item) {

    const card =
        document.createElement("article");

    card.className =
        `shop-card ${rarityClass(item.rarity)}`;


    const rarity =
        document.createElement("div");

    rarity.className =
        `rarity ${rarityClass(item.rarity)}`;

    rarity.textContent =
        item.rarity;


    const preview =
        document.createElement("div");

    preview.className =
        "item-preview";

    preview.appendChild(
        createPreview(item)
    );


    const name =
        document.createElement("h3");

    name.textContent =
        item.name;


    const type =
        document.createElement("p");

    type.className =
        "item-type";

    type.textContent =
        item.type;


    const price =
        document.createElement("div");

    price.className =
        "shop-price";

    price.textContent =
        `${item.price} Coins`;


    const button =
        document.createElement("button");

    button.className =
        "buy-button";

    button.type =
        "button";


    if (ownsItem(item.id)) {

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
   DISPLAY MAIN SHOP
========================================================= */

function displayMainShop() {

    const container =
        document.getElementById(
            "fortnightly-items"
        );

    if (!container)
        return;

    container.innerHTML = "";

    const items =
        getCurrentShop();

    items.forEach(item => {

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

    if (ownsItem(item.id))
        return;

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

    unlockItem(
        item.id,
        item.type
    );

    const owned =
        getOwnedItems();

    if (!owned.includes(item.id)) {

        owned.push(item.id);

    }

    saveOwnedItems(owned);

    button.disabled = true;
    button.textContent = "OWNED";

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

    container.innerHTML = "";


    TICKET_ITEMS.forEach(item => {

        const card =
            document.createElement("article");

        card.className =
            "ticket-card";


        const preview =
            document.createElement("div");

        preview.className =
            "ticket-item-preview";


        const effect =
            document.createElement("div");

        effect.className =
            `preview-effect effect-${item.id}`;


        const goober =
            createGoober({
                shape: "round",
                colour: "#6366f1",
                feature: "none"
            });


        preview.appendChild(effect);
        preview.appendChild(goober);


        const name =
            document.createElement("h3");

        name.textContent =
            item.name;


        const description =
            document.createElement("p");

        description.textContent =
            item.description;


        const price =
            document.createElement("div");

        price.className =
            "ticket-price";

        price.textContent =
            `${item.price} Shop Tickets`;


        const button =
            document.createElement("button");

        button.className =
            "buy-button";

        button.type =
            "button";


        if (ownsItem(item.id)) {

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

    if (ownsItem(item.id))
        return;

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

    unlockItem(
        item.id,
        item.type
    );

    const owned =
        getOwnedItems();

    if (!owned.includes(item.id)) {

        owned.push(item.id);

    }

    saveOwnedItems(owned);

    button.disabled = true;
    button.textContent = "OWNED";

    button.classList.add(
        "owned"
    );

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

    container.innerHTML = "";


    STUDYPASS_CHARACTERS.forEach(item => {

        const card =
            document.createElement("article");

        card.className =
            "studypass-card";


        const badge =
            document.createElement("div");

        badge.className =
            "pass-badge";

        badge.textContent =
            "STUDYPASS";


        const rarity =
            document.createElement("div");

        rarity.className =
            `rarity ${rarityClass(item.rarity)}`;

        rarity.textContent =
            item.rarity;


        const preview =
            document.createElement("div");

        preview.className =
            "studypass-preview";

        preview.appendChild(
            createGoober(item)
        );


        const name =
            document.createElement("h3");

        name.textContent =
            item.name;


        const description =
            document.createElement("p");

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
   CURRENCY
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

    const next =
        getShopStart() +
        SHOP_REFRESH_DAYS * DAY_MS;

    const remaining =
        Math.max(
            0,
            next - Date.now()
        );


    const days =
        Math.floor(
            remaining / DAY_MS
        );

    const hours =
        Math.floor(
            (remaining % DAY_MS) /
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
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

}


/* =========================================================
   NAVIGATION
========================================================= */

function openMainShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );

    const tickets =
        document.getElementById(
            "ticket-shop"
        );

    const mainButton =
        document.getElementById(
            "main-shop-button"
        );

    const ticketButton =
        document.getElementById(
            "ticket-shop-button"
        );


    if (main)
        main.style.display = "block";

    if (tickets)
        tickets.style.display = "none";

    if (mainButton)
        mainButton.classList.add("active");

    if (ticketButton)
        ticketButton.classList.remove("active");

}


function openTicketShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );

    const tickets =
        document.getElementById(
            "ticket-shop"
        );

    const mainButton =
        document.getElementById(
            "main-shop-button"
        );

    const ticketButton =
        document.getElementById(
            "ticket-shop-button"
        );


    if (main)
        main.style.display = "none";

    if (tickets)
        tickets.style.display = "block";

    if (mainButton)
        mainButton.classList.remove("active");

    if (ticketButton)
        ticketButton.classList.add("active");

}


/* =========================================================
   DEBUG MENU
========================================================= */

function openDebugMenu() {

    if (
        document.querySelector(
            ".debug-overlay"
        )
    )
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

            <option value="xp">
                ⭐ XP
            </option>

            <option value="coins">
                🪙 Coins
            </option>

            <option value="tickets">
                🎟️ Tickets
            </option>

            <option value="streak">
                🔥 Streak
            </option>

            <option value="reset">
                🗑️ Reset Account
            </option>

        </select>

        <input
            id="debug-value"
            type="number"
            placeholder="Amount"
        >

        <button
            id="debug-apply"
            class="debug-apply"
        >
            Apply
        </button>

        <button
            id="debug-close"
            class="debug-close"
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


    function updateDebugInput() {

        value.style.display =
            type.value === "reset"
                ? "none"
                : "block";

    }


    type.addEventListener(
        "change",
        updateDebugInput
    );

    updateDebugInput();


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


        if (selected === "reset") {

            const confirmed =
                confirm(
                    "⚠️ Reset your entire StudySprint account?\n\n" +
                    "This removes XP, coins, tickets, streak, " +
                    "stats, achievements and shop data."
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
            Number(value.value);


        if (!Number.isFinite(amount)) {

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
            String(amount)
        );


        alert(
            `✅ ${selected} set to ${amount}!`
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
   PUBLIC FUNCTIONS
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
