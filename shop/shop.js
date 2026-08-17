/* =========================================================
   STUDYSPRINT GLOBAL FORTNIGHTLY SHOP
   Refreshes every second Sunday at 12:00 AM AEST
========================================================= */

const SHOP_TIMEZONE = "Australia/Brisbane";

/*
    IMPORTANT:

    The shop is NOT stored in localStorage.

    Everyone calculates the same fortnight number,
    meaning everyone sees the same 6 items.
*/


/* =========================================================
   GOOBER CHARACTERS
========================================================= */

const GOOBER_CHARACTERS = [

    {
        id: "goober-blue",
        name: "Blue Goober",
        rarity: "Common",
        type: "Character",
        colour: "#60a5fa",
        eyes: "normal",
        accessory: "none"
    },

    {
        id: "goober-pink",
        name: "Pink Goober",
        rarity: "Common",
        type: "Character",
        colour: "#f472b6",
        eyes: "normal",
        accessory: "none"
    },

    {
        id: "goober-green",
        name: "Green Goober",
        rarity: "Common",
        type: "Character",
        colour: "#4ade80",
        eyes: "normal",
        accessory: "none"
    },

    {
        id: "goober-purple",
        name: "Purple Goober",
        rarity: "Common",
        type: "Character",
        colour: "#a78bfa",
        eyes: "normal",
        accessory: "none"
    },

    {
        id: "goober-orange",
        name: "Orange Goober",
        rarity: "Common",
        type: "Character",
        colour: "#fb923c",
        eyes: "normal",
        accessory: "none"
    },

    {
        id: "goober-yellow",
        name: "Yellow Goober",
        rarity: "Common",
        type: "Character",
        colour: "#facc15",
        eyes: "normal",
        accessory: "none"
    },

    {
        id: "goober-red",
        name: "Red Goober",
        rarity: "Rare",
        type: "Character",
        colour: "#f87171",
        eyes: "angry",
        accessory: "none"
    },

    {
        id: "goober-cyan",
        name: "Cyan Goober",
        rarity: "Rare",
        type: "Character",
        colour: "#22d3ee",
        eyes: "normal",
        accessory: "none"
    },

    {
        id: "goober-sleepy",
        name: "Sleepy Goober",
        rarity: "Rare",
        type: "Character",
        colour: "#818cf8",
        eyes: "sleepy",
        accessory: "none"
    },

    {
        id: "goober-happy",
        name: "Happy Goober",
        rarity: "Rare",
        type: "Character",
        colour: "#fbbf24",
        eyes: "happy",
        accessory: "none"
    },

    {
        id: "goober-rock",
        name: "Rock Goober",
        rarity: "Rare",
        type: "Character",
        colour: "#78716c",
        eyes: "normal",
        accessory: "rock"
    },

    {
        id: "goober-cowboy",
        name: "Cowboy Goober",
        rarity: "Ultra Rare",
        type: "Character",
        colour: "#d97706",
        eyes: "normal",
        accessory: "cowboy"
    },

    {
        id: "goober-wizard",
        name: "Wizard Goober",
        rarity: "Ultra Rare",
        type: "Character",
        colour: "#7c3aed",
        eyes: "normal",
        accessory: "wizard"
    },

    {
        id: "goober-chef",
        name: "Chef Goober",
        rarity: "Ultra Rare",
        type: "Character",
        colour: "#f8fafc",
        eyes: "normal",
        accessory: "chef"
    },

    {
        id: "goober-robot",
        name: "Robot Goober",
        rarity: "Ultra Rare",
        type: "Character",
        colour: "#94a3b8",
        eyes: "robot",
        accessory: "antenna"
    },

    {
        id: "goober-alien",
        name: "Alien Goober",
        rarity: "Mythic",
        type: "Character",
        colour: "#84cc16",
        eyes: "alien",
        accessory: "antenna"
    },

    {
        id: "goober-ghost",
        name: "Ghost Goober",
        rarity: "Mythic",
        type: "Character",
        colour: "#e2e8f0",
        eyes: "spooky",
        accessory: "ghost"
    },

    {
        id: "goober-fire",
        name: "Fire Goober",
        rarity: "Mythic",
        type: "Character",
        colour: "#f97316",
        eyes: "angry",
        accessory: "flame"
    },

    {
        id: "goober-cosmic",
        name: "Cosmic Goober",
        rarity: "Legendary",
        type: "Character",
        colour: "#6366f1",
        eyes: "star",
        accessory: "cosmic"
    },

    {
        id: "goober-crown",
        name: "Royal Goober",
        rarity: "Legendary",
        type: "Character",
        colour: "#facc15",
        eyes: "happy",
        accessory: "crown"
    }

];


/* =========================================================
   STUDYPASS GOOBERS
========================================================= */

const STUDYPASS_CHARACTERS = [

    {
        id: "goober-study",
        name: "Study Goober",
        rarity: "StudyPass",
        type: "Character",
        colour: "#3b82f6",
        eyes: "happy",
        accessory: "book"
    },

    {
        id: "goober-sprint",
        name: "Sprint Goober",
        rarity: "StudyPass",
        type: "Character",
        colour: "#ef4444",
        eyes: "happy",
        accessory: "headband"
    }

];


/* =========================================================
   OTHER FORTNIGHTLY ITEMS
========================================================= */

const BANNERS = [

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
    }

];


const COMMON_EFFECTS = [

    {
        id: "sparkle",
        name: "Sparkle Effect",
        rarity: "Common",
        type: "Effect",
        price: 100
    },

    {
        id: "speed-trail",
        name: "Speed Trail",
        rarity: "Common",
        type: "Effect",
        price: 125
    },

    {
        id: "lightning",
        name: "Lightning Effect",
        rarity: "Rare",
        type: "Effect",
        price: 175
    }

];


/* =========================================================
   BUILD GLOBAL ITEM POOL
========================================================= */

const FORTNIGHTLY_ITEMS = [

    ...GOOBER_CHARACTERS,

    ...BANNERS,

    ...COMMON_EFFECTS

];


/* =========================================================
   GLOBAL FORTNIGHT NUMBER
========================================================= */

/*
    Fixed reference point.

    This Sunday is the beginning of a shop period.

    Every 14 days after this = new shop.
*/

const SHOP_EPOCH =
    Date.UTC(
        2026,
        0,
        4,
        14,
        0,
        0
    );


const SHOP_PERIOD =
    14 * 24 * 60 * 60 * 1000;


/* =========================================================
   GET CURRENT GLOBAL SHOP PERIOD
========================================================= */

function getShopPeriod() {

    const now =
        Date.now();

    return Math.floor(
        (now - SHOP_EPOCH) /
        SHOP_PERIOD
    );

}


/* =========================================================
   DETERMINISTIC SHUFFLE
========================================================= */

function seededRandom(seed) {

    let x =
        Math.sin(seed) *
        10000;

    return x -
        Math.floor(x);

}


function getGlobalShopItems() {

    const period =
        getShopPeriod();


    const pool =
        [...FORTNIGHTLY_ITEMS];


    /*
        Fisher-Yates style deterministic shuffle.

        Because the seed is the same for everyone,
        everyone gets the same result.
    */

    for (
        let i = pool.length - 1;
        i > 0;
        i--
    ) {

        const random =
            seededRandom(
                period * 997 +
                i * 31
            );

        const j =
            Math.floor(
                random * (i + 1)
            );


        [
            pool[i],
            pool[j]
        ] =
        [
            pool[j],
            pool[i]
        ];

    }


    return pool.slice(
        0,
        6
    );

}


/* =========================================================
   NEXT GLOBAL RESET
========================================================= */

function getNextShopReset() {

    const period =
        getShopPeriod();


    return new Date(
        SHOP_EPOCH +
        (period + 1) *
        SHOP_PERIOD
    );

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


    const remaining =
        getNextShopReset().getTime() -
        Date.now();


    if (remaining <= 0) {

        displayMainShop();

        return;

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
   GOOBER PREVIEW
========================================================= */

function createGoober(item) {

    const goober =
        document.createElement(
            "div"
        );


    goober.className =
        "goober";


    goober.style.setProperty(
        "--goober-colour",
        item.colour
    );


    /*
        BODY
    */

    const body =
        document.createElement(
            "div"
        );

    body.className =
        "goober-body";


    /*
        EYES
    */

    const eyes =
        document.createElement(
            "div"
        );

    eyes.className =
        `goober-eyes ${item.eyes}`;

    eyes.innerHTML = `
        <span></span>
        <span></span>
    `;


    /*
        ACCESSORY
    */

    const accessory =
        document.createElement(
            "div"
        );

    accessory.className =
        `goober-accessory ${item.accessory}`;


    goober.appendChild(
        body
    );

    goober.appendChild(
        eyes
    );

    goober.appendChild(
        accessory
    );


    return goober;

}


/* =========================================================
   MAIN SHOP DISPLAY
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


    const items =
        getGlobalShopItems();


    items.forEach(
        item => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "shop-card";


            const rarity =
                document.createElement(
                    "div"
                );


            rarity.className =
                "rarity";


            rarity.textContent =
                item.rarity;


            const preview =
                document.createElement(
                    "div"
                );


            preview.className =
                "item-preview";


            if (
                item.type ===
                "Character"
            ) {

                preview.appendChild(
                    createGoober(
                        item
                    )
                );

            }


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


            type.textContent =
                item.type;


            const price =
                document.createElement(
                    "div"
                );


            price.className =
                "shop-price";


            price.textContent =
                `${item.price || 0} Coins`;


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "buy-button";


            button.textContent =
                ownsItem(
                    item.id
                )
                    ? "OWNED"
                    : "BUY";


            if (
                ownsItem(
                    item.id
                )
            ) {

                button.disabled =
                    true;

            }

            else {

                button.onclick =
                    () =>
                        buyMainItem(
                            item,
                            button
                        );

            }


            card.appendChild(
                rarity
            );

            card.appendChild(
                preview
            );

            card.appendChild(
                name
            );

            card.appendChild(
                type
            );

            card.appendChild(
                price
            );

            card.appendChild(
                button
            );


            container.appendChild(
                card
            );

        }
    );


    updateCurrency();

}
