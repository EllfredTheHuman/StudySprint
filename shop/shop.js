```javascript
/* =========================================================
   STUDYSPRINT SHOP
   ========================================================= */

/*
   COIN SHOP ROTATION
   ------------------
   4 characters
   1 banner
   1 title

   Refresh:
   Every second Sunday
   12:00 AM AEST (UTC+10)

   The rotation is deterministic, meaning everyone gets
   the exact same shop.
*/

const SHOP_REFRESH_DAYS = 14;
const CHARACTER_SLOTS = 4;


/* =========================================================
   CHARACTERS
   ========================================================= */

const SHOP_CHARACTERS = [

    {
        id: "leafy",
        name: "Leafy",
        rarity: "Common",
        price: 250,
        design: "leafy",
        colour: "#75b82b"
    },

    {
        id: "squish",
        name: "Squish",
        rarity: "Common",
        price: 275,
        design: "squish",
        colour: "#5ba9f7"
    },

    {
        id: "pebble",
        name: "Pebble",
        rarity: "Common",
        price: 300,
        design: "pebble",
        colour: "#817a73"
    },

    {
        id: "button",
        name: "Button",
        rarity: "Common",
        price: 325,
        design: "button",
        colour: "#f47ab4"
    },

    {
        id: "horns",
        name: "Horns",
        rarity: "Rare",
        price: 400,
        design: "horns",
        colour: "#9d83ed"
    },

    {
        id: "shellby",
        name: "Shellby",
        rarity: "Rare",
        price: 425,
        design: "shellby",
        colour: "#39c995"
    },

    {
        id: "tallboi",
        name: "Tallboi",
        rarity: "Rare",
        price: 450,
        design: "tallboi",
        colour: "#f2b93d"
    },

    {
        id: "four-eyes",
        name: "Four Eyes",
        rarity: "Rare",
        price: 475,
        design: "four-eyes",
        colour: "#ed657b"
    },

    {
        id: "mothball",
        name: "Mothball",
        rarity: "Epic",
        price: 550,
        design: "mothball",
        colour: "#ae7be2"
    },

    {
        id: "spike",
        name: "Spike",
        rarity: "Epic",
        price: 575,
        design: "spike",
        colour: "#ed405d"
    },

    {
        id: "orbit",
        name: "Orbit",
        rarity: "Epic",
        price: 600,
        design: "orbit",
        colour: "#32b9e8"
    },

    {
        id: "bubble",
        name: "Bubble",
        rarity: "Epic",
        price: 625,
        design: "bubble",
        colour: "#27c7d4"
    },

    {
        id: "captain",
        name: "Captain Goob",
        rarity: "Mythic",
        price: 700,
        design: "captain",
        colour: "#8056dc"
    },

    {
        id: "tailspin",
        name: "Tailspin",
        rarity: "Mythic",
        price: 725,
        design: "tailspin",
        colour: "#dc4792"
    },

    {
        id: "holymoly",
        name: "Holy Moly",
        rarity: "Mythic",
        price: 750,
        design: "holymoly",
        colour: "#f6dc6d"
    },

    {
        id: "wingnut",
        name: "Wingnut",
        rarity: "Mythic",
        price: 775,
        design: "wingnut",
        colour: "#dc8ce5"
    },

    {
        id: "jellybean",
        name: "Jellybean",
        rarity: "Legendary",
        price: 850,
        design: "jellybean",
        colour: "#f05d76"
    },

    {
        id: "cosmo",
        name: "Cosmo",
        rarity: "Legendary",
        price: 950,
        design: "cosmo",
        colour: "#373080"
    },

    {
        id: "the-goober",
        name: "The Goober",
        rarity: "Legendary",
        price: 1000,
        design: "the-goober",
        colour: "#ed722c"
    },

    {
        id: "golden",
        name: "Golden Goober",
        rarity: "Legendary",
        price: 1100,
        design: "golden",
        colour: "#f5bd32"
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
        design: "study-sprout",
        colour: "#28bd63"
    },

    {
        id: "study-orbit",
        name: "Study Orbit",
        rarity: "Legendary",
        design: "study-orbit",
        colour: "#8157e8"
    }

];


/* =========================================================
   BANNERS
   ========================================================= */

const SHOP_BANNERS = [

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
        rarity: "Rare",
        type: "Banner",
        price: 150
    },

    {
        id: "sunset",
        name: "Sunset Sprint",
        rarity: "Rare",
        type: "Banner",
        price: 175
    },

    {
        id: "cosmic-grid",
        name: "Cosmic Grid",
        rarity: "Epic",
        type: "Banner",
        price: 250
    },

    {
        id: "gold-grid",
        name: "Golden Grid",
        rarity: "Legendary",
        type: "Banner",
        price: 500
    }

];


/* =========================================================
   TITLES
   ========================================================= */

const SHOP_TITLES = [

    {
        id: "fresh-start",
        name: "Fresh Start",
        rarity: "Common",
        type: "Player Title",
        price: 75
    },

    {
        id: "speedy",
        name: "Speedy",
        rarity: "Common",
        type: "Player Title",
        price: 100
    },

    {
        id: "brainiac",
        name: "Brainiac",
        rarity: "Rare",
        type: "Player Title",
        price: 150
    },

    {
        id: "study-machine",
        name: "Study Machine",
        rarity: "Rare",
        type: "Player Title",
        price: 175
    },

    {
        id: "overachiever",
        name: "Overachiever",
        rarity: "Epic",
        type: "Player Title",
        price: 250
    },

    {
        id: "sprint-legend",
        name: "Sprint Legend",
        rarity: "Legendary",
        price: 500
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
   OWNERSHIP
   ========================================================= */

function getOwnedItems() {

    try {

        const items =
            JSON.parse(
                localStorage.getItem(
                    "shopOwnedItems"
                )
            );

        return Array.isArray(items)
            ? items
            : [];

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
   UNLOCK ITEM
   ========================================================= */

function unlockItem(id, type) {

    const storageKeys = {

        "Character":
            "unlocked_characters",

        "Banner":
            "unlocked_banners",

        "Effect":
            "unlocked_effects",

        "Player Title":
            "unlockedTitles",

        "Hat":
            "unlocked_hats"

    };

    const key =
        storageKeys[type];

    if (!key) return;

    let unlocked = [];

    try {

        unlocked =
            JSON.parse(
                localStorage.getItem(key)
            );

        if (!Array.isArray(unlocked)) {
            unlocked = [];
        }

    }

    catch {

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
   DETERMINISTIC RANDOM
   ========================================================= */

function seededShuffle(array, seed) {

    const result =
        [...array];

    let value =
        Math.abs(
            Math.floor(seed)
        ) || 1;

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
                (
                    value /
                    233280
                ) *
                (i + 1)
            );

        [
            result[i],
            result[j]
        ] =
        [
            result[j],
            result[i]
        ];

    }

    return result;

}


/* =========================================================
   SHOP DATE
   ========================================================= */

/*
   Anchor:
   Sunday 10 August 2025
   12:00 AM AEST

   AEST is UTC+10.
   Therefore:

   10 Aug 2025 00:00 AEST
   =
   9 Aug 2025 14:00 UTC
*/

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

    const period =
        SHOP_REFRESH_DAYS *
        24 *
        60 *
        60 *
        1000;

    const cycles =
        Math.floor(
            (
                now -
                SHOP_ANCHOR
            ) /
            period
        );

    return (
        SHOP_ANCHOR +
        cycles * period
    );

}


/* =========================================================
   CURRENT SHOP
   ========================================================= */

function getCurrentShop() {

    const shopStart =
        getShopStart();

    const seed =
        Math.floor(
            shopStart / 1000
        );


    const characters =
        seededShuffle(
            SHOP_CHARACTERS,
            seed + 101
        );


    const banners =
        seededShuffle(
            SHOP_BANNERS,
            seed + 202
        );


    const titles =
        seededShuffle(
            SHOP_TITLES,
            seed + 303
        );


    /*
       EXACTLY:

       4 characters
       1 banner
       1 title
    */

    const selectedCharacters =
        characters
            .slice(
                0,
                CHARACTER_SLOTS
            )
            .map(
                character => ({
                    ...character,
                    type: "Character"
                })
            );


    const banner = {

        ...banners[0]

    };


    const title = {

        ...titles[0]

    };


    return [

        ...selectedCharacters,

        banner,

        title

    ];

}


/* =========================================================
   GOOBER CREATION
   ========================================================= */

/*
   IMPORTANT:

   Every Goober has exactly ONE base body.

   CSS handles the entire design.

   We do NOT create dozens of randomly-positioned
   feature elements anymore.

   This keeps the designs stable.
*/

function createGoober(data) {

    const goober =
        document.createElement("div");

    goober.className =
        "goober goober-" +
        data.design;

    goober.style.setProperty(
        "--goober-colour",
        data.colour
    );

    /*
       Inner design layer.
       The CSS creates eyes, mouths, etc.
    */

    const body =
        document.createElement("div");

    body.className =
        "goober-body";

    goober.appendChild(body);

    return goober;

}


/* =========================================================
   BANNER PREVIEW
   ========================================================= */

function createBannerPreview(item) {

    const banner =
        document.createElement("div");

    banner.className =
        "banner-preview banner-" +
        item.id;

    return banner;

}


/* =========================================================
   TITLE PREVIEW
   ========================================================= */

function createTitlePreview(item) {

    const title =
        document.createElement("div");

    title.className =
        "title-preview";

    title.textContent =
        "Aa";

    title.dataset.rarity =
        item.rarity;

    return title;

}


/* =========================================================
   PREVIEW
   ========================================================= */

function createPreview(item) {

    if (
        item.type ===
        "Character"
    ) {

        return createGoober(item);

    }


    if (
        item.type ===
        "Banner"
    ) {

        return createBannerPreview(item);

    }


    if (
        item.type ===
        "Player Title"
    ) {

        return createTitlePreview(item);

    }


    return document.createElement(
        "div"
    );

}


/* =========================================================
   RARITY CLASS
   ========================================================= */

function rarityClass(rarity) {

    return (
        "rarity-" +
        rarity
            .toLowerCase()
            .replace(
                /\s+/g,
                "-"
            )
    );

}


/* =========================================================
   CREATE CARD
   ========================================================= */

function createShopCard(item) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "shop-card " +
        rarityClass(
            item.rarity
        );


    const rarity =
        document.createElement(
            "div"
        );

    rarity.className =
        "rarity-badge";

    rarity.textContent =
        item.rarity;


    const preview =
        document.createElement(
            "div"
        );

    preview.className =
        "item-preview";

    preview.appendChild(
        createPreview(item)
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

    type.className =
        "item-type";

    type.textContent =
        item.type;


    const price =
        document.createElement(
            "div"
        );

    price.className =
        "item-price";

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

        button.classList.add(
            "owned"
        );

    }

    else {

        button.textContent =
            "BUY";

        button.addEventListener(
            "click",
            () => buyMainItem(
                item,
                button
            )
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
   DISPLAY COIN SHOP
   ========================================================= */

function displayMainShop() {

    const container =
        document.getElementById(
            "fortnightly-items"
        );

    if (!container) return;

    container.innerHTML =
        "";

    const items =
        getCurrentShop();

    items.forEach(
        item => {

            container.appendChild(
                createShopCard(
                    item
                )
            );

        }
    );

    updateCurrency();

}


/* =========================================================
   BUY COIN ITEM
   ========================================================= */

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

    if (!container) return;

    container.innerHTML =
        "";


    TICKET_ITEMS.forEach(
        item => {

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
                "ticket-preview";

            const goober =
                createGoober({

                    design:
                        "squish",

                    colour:
                        "#6366f1"

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
                "item-price ticket-price";

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

                button.classList.add(
                    "owned"
                );

            }

            else {

                button.textContent =
                    "BUY";

                button.addEventListener(
                    "click",
                    () => buyTicketItem(
                        item,
                        button
                    )
                );

            }


            card.appendChild(preview);
            card.appendChild(name);
            card.appendChild(description);
            card.appendChild(price);
            card.appendChild(button);

            container.appendChild(card);

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

    if (!container) return;

    container.innerHTML =
        "";


    STUDYPASS_CHARACTERS.forEach(
        item => {

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
                "rarity-badge " +
                rarityClass(
                    item.rarity
                );

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

        }
    );

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

    if (!element) return;


    const period =
        SHOP_REFRESH_DAYS *
        24 *
        60 *
        60 *
        1000;


    const next =
        getShopStart() +
        period;


    const remaining =
        Math.max(
            0,
            next -
            Date.now()
        );


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
    days + "d " +
    hours + "h " +
    minutes + "m " +
    seconds + "s";

}


/* =========================================================
   SHOP BUTTONS
   ========================================================= */

function openMainShop() {

    const coinShop =
        document.getElementById(
            "fortnightly-shop"
        );

    const ticketShop =
        document.getElementById(
            "ticket-shop"
        );


    if (coinShop) {

        coinShop.style.display =
            "block";

    }


    if (ticketShop) {

        ticketShop.style.display =
            "none";

    }


    const coinButton =
        document.getElementById(
            "main-shop-button"
        );

    const ticketButton =
        document.getElementById(
            "ticket-shop-button"
        );


    if (coinButton) {

        coinButton.classList.add(
            "active"
        );

    }


    if (ticketButton) {

        ticketButton.classList.remove(
            "active"
        );

    }

}


function openTicketShop() {

    const coinShop =
        document.getElementById(
            "fortnightly-shop"
        );

    const ticketShop =
        document.getElementById(
            "ticket-shop"
        );


    if (coinShop) {

        coinShop.style.display =
            "none";

    }


    if (ticketShop) {

        ticketShop.style.display =
            "block";

    }


    const coinButton =
        document.getElementById(
            "main-shop-button"
        );

    const ticketButton =
        document.getElementById(
            "ticket-shop-button"
        );


    if (coinButton) {

        coinButton.classList.remove(
            "active"
        );

    }


    if (ticketButton) {

        ticketButton.classList.add(
            "active"
        );

    }

}


/* =========================================================
   DEBUG MENU
   ========================================================= */

function openDebugMenu() {

    if (
        document.querySelector(
            ".debug-overlay"
        )
    ) {

        return;

    }


    const overlay =
        document.createElement(
            "div"
        );

    overlay.className =
        "debug-overlay";


    const box =
        document.createElement(
            "div"
        );

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

    document.body.appendChild(
        overlay
    );


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
    ).onclick =
        () => {

            overlay.remove();

        };


    box.querySelector(
        "#debug-apply"
    ).onclick =
        () => {

            const selected =
                type.value;


            if (
                selected ===
                "reset"
            ) {

                const confirmed =
                    confirm(
                        "⚠️ Reset your entire StudySprint account?\n\n" +
                        "This removes saved XP, coins, tickets, streak, " +
                        "stats, achievements, shop ownership and other local data."
                    );


                if (!confirmed) return;


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
                !Number.isFinite(
                    amount
                )
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

        openMainShop();

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

window.getCurrentShop =
    getCurrentShop;
```
