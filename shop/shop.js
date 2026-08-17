/* =========================================================
   STUDYSPRINT SHOP
   CLEAN SHOP SYSTEM
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

var SHOP_ITEM_COUNT = 6;
var SHOP_LENGTH_MS = 14 * 24 * 60 * 60 * 1000;

/*
   Sunday 10 August 2025
   12:00 AM AEST
   = Saturday 9 August 2025
   2:00 PM UTC
*/

var SHOP_ANCHOR = Date.UTC(
    2025,
    7,
    9,
    14,
    0,
    0
);


/* =========================================================
   NORMAL SHOP CHARACTERS
========================================================= */

var SHOP_CHARACTERS = [

    {
        id: "leafy",
        name: "Leafy",
        rarity: "Common",
        price: 250,
        design: "leafy"
    },

    {
        id: "squish",
        name: "Squish",
        rarity: "Common",
        price: 275,
        design: "squish"
    },

    {
        id: "pebble",
        name: "Pebble",
        rarity: "Common",
        price: 300,
        design: "pebble"
    },

    {
        id: "button",
        name: "Button",
        rarity: "Common",
        price: 325,
        design: "button"
    },

    {
        id: "horns",
        name: "Horns",
        rarity: "Rare",
        price: 400,
        design: "horns"
    },

    {
        id: "shellby",
        name: "Shellby",
        rarity: "Rare",
        price: 425,
        design: "shellby"
    },

    {
        id: "tallboi",
        name: "Tallboi",
        rarity: "Rare",
        price: 450,
        design: "tallboi"
    },

    {
        id: "four-eyes",
        name: "Four Eyes",
        rarity: "Rare",
        price: 475,
        design: "four-eyes"
    },

    {
        id: "mothball",
        name: "Mothball",
        rarity: "Epic",
        price: 550,
        design: "mothball"
    },

    {
        id: "spike",
        name: "Spike",
        rarity: "Epic",
        price: 575,
        design: "spike"
    },

    {
        id: "orbit",
        name: "Orbit",
        rarity: "Epic",
        price: 600,
        design: "orbit"
    },

    {
        id: "bubble",
        name: "Bubble",
        rarity: "Epic",
        price: 625,
        design: "bubble"
    },

    {
        id: "captain-goob",
        name: "Captain Goob",
        rarity: "Mythic",
        price: 700,
        design: "captain"
    },

    {
        id: "tailspin",
        name: "Tailspin",
        rarity: "Mythic",
        price: 725,
        design: "tailspin"
    },

    {
        id: "holy-moly",
        name: "Holy Moly",
        rarity: "Mythic",
        price: 750,
        design: "holy"
    },

    {
        id: "wingnut",
        name: "Wingnut",
        rarity: "Mythic",
        price: 775,
        design: "wingnut"
    },

    {
        id: "cosmo",
        name: "Cosmo",
        rarity: "Legendary",
        price: 950,
        design: "cosmo"
    },

    {
        id: "the-goober",
        name: "The Goober",
        rarity: "Legendary",
        price: 1000,
        design: "the-goober"
    },

    {
        id: "golden",
        name: "Golden Goober",
        rarity: "Legendary",
        price: 1100,
        design: "golden"
    },

    {
        id: "mushroom",
        name: "Mushroom",
        rarity: "Legendary",
        price: 1150,
        design: "mushroom"
    }

];


/* =========================================================
   BANNERS
========================================================= */

var SHOP_BANNERS = [

    {
        id: "sprint-grid",
        name: "Sprint Grid",
        rarity: "Common",
        type: "Banner",
        price: 100,
        design: "sprint-grid"
    },

    {
        id: "purple-grid",
        name: "Purple Grid",
        rarity: "Common",
        type: "Banner",
        price: 125,
        design: "purple-grid"
    },

    {
        id: "neon-blue",
        name: "Neon Blue",
        rarity: "Rare",
        type: "Banner",
        price: 150,
        design: "neon-blue"
    },

    {
        id: "sunset",
        name: "Sunset",
        rarity: "Rare",
        type: "Banner",
        price: 175,
        design: "sunset"
    },

    {
        id: "cosmic-banner",
        name: "Cosmic",
        rarity: "Epic",
        type: "Banner",
        price: 300,
        design: "cosmic-banner"
    },

    {
        id: "glitch-banner",
        name: "Glitch",
        rarity: "Epic",
        type: "Banner",
        price: 325,
        design: "glitch-banner"
    }

];


/* =========================================================
   TITLES
========================================================= */

var SHOP_TITLES = [

    {
        id: "speedster",
        name: "Speedster",
        rarity: "Common",
        type: "Player Title",
        price: 150
    },

    {
        id: "brainiac",
        name: "Brainiac",
        rarity: "Rare",
        type: "Player Title",
        price: 225
    },

    {
        id: "overachiever",
        name: "Overachiever",
        rarity: "Epic",
        type: "Player Title",
        price: 350
    },

    {
        id: "study-machine",
        name: "Study Machine",
        rarity: "Epic",
        type: "Player Title",
        price: 400
    },

    {
        id: "sprint-legend",
        name: "Sprint Legend",
        rarity: "Legendary",
        type: "Player Title",
        price: 750
    }

];


/* =========================================================
   STUDYPASS CHARACTERS
========================================================= */

var STUDYPASS_CHARACTERS = [

    {
        id: "study-sprout",
        name: "Study Sprout",
        rarity: "Epic",
        design: "study-sprout"
    },

    {
        id: "study-orbit",
        name: "Study Orbit",
        rarity: "Legendary",
        design: "study-orbit"
    }

];


/* =========================================================
   TICKET SHOP
========================================================= */

var TICKET_ITEMS = [

    {
        id: "sparkle",
        name: "Sparkle Effect",
        description: "Tiny sparkles follow your character.",
        type: "Effect",
        price: 10,
        design: "sparkle"
    },

    {
        id: "speed-trail",
        name: "Speed Trail",
        description: "Leaves a trail behind your character.",
        type: "Effect",
        price: 20,
        design: "speed"
    },

    {
        id: "lightning",
        name: "Lightning Effect",
        description: "Electric sparks surround your character.",
        type: "Effect",
        price: 35,
        design: "lightning"
    },

    {
        id: "rainbow",
        name: "Rainbow Aura",
        description: "A colourful aura surrounds your character.",
        type: "Effect",
        price: 50,
        design: "rainbow"
    },

    {
        id: "fire",
        name: "Fire Aura",
        description: "A fiery glow surrounds your character.",
        type: "Effect",
        price: 75,
        design: "fire"
    },

    {
        id: "glitch",
        name: "Glitch Effect",
        description: "A strange digital effect surrounds your character.",
        type: "Effect",
        price: 100,
        design: "glitch"
    },

    {
        id: "shadow",
        name: "Shadow Aura",
        description: "A dark shadow surrounds your character.",
        type: "Effect",
        price: 150,
        design: "shadow"
    },

    {
        id: "crystal",
        name: "Crystal Glow",
        description: "A bright crystalline glow surrounds your character.",
        type: "Effect",
        price: 250,
        design: "crystal"
    },

    {
        id: "cosmic-aura",
        name: "Cosmic Aura",
        description: "Stars and cosmic particles surround your character.",
        type: "Effect",
        price: 500,
        design: "cosmic"
    },

    {
        id: "crown",
        name: "Crown + Glow",
        description: "The extremely rare glowing crown.",
        type: "Hat",
        price: 1000,
        design: "crown"
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
        String(amount)
    );

}


function setTickets(amount) {

    localStorage.setItem(
        "shopTickets",
        String(amount)
    );

}


/* =========================================================
   OWNED ITEMS
========================================================= */

function getOwnedItems() {

    try {

        var items =
            JSON.parse(
                localStorage.getItem("shopOwnedItems")
            );

        if (Array.isArray(items)) {
            return items;
        }

    } catch (error) {

    }

    return [];

}


function saveOwnedItems(items) {

    localStorage.setItem(
        "shopOwnedItems",
        JSON.stringify(items)
    );

}


function ownsItem(id) {

    return getOwnedItems().indexOf(id) !== -1;

}


/* =========================================================
   UNLOCK ITEM
========================================================= */

function unlockItem(id, type) {

    var key = "";

    if (type === "Character") {
        key = "unlocked_characters";
    }

    if (type === "Banner") {
        key = "unlocked_banners";
    }

    if (type === "Player Title") {
        key = "unlockedTitles";
    }

    if (type === "Effect") {
        key = "unlocked_effects";
    }

    if (type === "Hat") {
        key = "unlocked_hats";
    }

    if (!key) {
        return;
    }

    var unlocked = [];

    try {

        var saved =
            JSON.parse(
                localStorage.getItem(key)
            );

        if (Array.isArray(saved)) {
            unlocked = saved;
        }

    } catch (error) {

    }

    if (unlocked.indexOf(id) === -1) {
        unlocked.push(id);
    }

    localStorage.setItem(
        key,
        JSON.stringify(unlocked)
    );

}


/* =========================================================
   RARITY CLASS
========================================================= */

function rarityClass(rarity) {

    return "rarity-" +
        String(rarity)
            .toLowerCase()
            .replace(/\s+/g, "-");

}


/* =========================================================
   SIMPLE ELEMENT HELPER
========================================================= */

function makeElement(className) {

    var element =
        document.createElement("div");

    element.className =
        className;

    return element;

}


/* =========================================================
   GOOBER CREATOR
========================================================= */

function createGoober(data) {

    var wrapper =
        makeElement(
            "goober goober-" +
            data.design
        );


    var body =
        makeElement(
            "goober-body"
        );


    var eyeLeft =
        makeElement(
            "goober-eye eye-left"
        );


    var eyeRight =
        makeElement(
            "goober-eye eye-right"
        );


    var mouth =
        makeElement(
            "goober-mouth"
        );


    wrapper.appendChild(body);
    wrapper.appendChild(eyeLeft);
    wrapper.appendChild(eyeRight);
    wrapper.appendChild(mouth);


    /*
       Design-specific parts.
    */

    if (
        data.design === "leafy" ||
        data.design === "study-sprout"
    ) {

        wrapper.appendChild(
            makeElement("goober-leaf")
        );

        wrapper.appendChild(
            makeElement("goober-leaf-two")
        );

    }


    if (data.design === "squish") {

        wrapper.appendChild(
            makeElement("squish-crease")
        );

        wrapper.appendChild(
            makeElement("squish-crease-two")
        );

    }


    if (data.design === "pebble") {

        wrapper.appendChild(
            makeElement("pebble-crack")
        );

        wrapper.appendChild(
            makeElement("pebble-crack-two")
        );

    }


    if (data.design === "button") {

        wrapper.appendChild(
            makeElement("button-ring")
        );

        wrapper.appendChild(
            makeElement("button-dot-left")
        );

        wrapper.appendChild(
            makeElement("button-dot-right")
        );

    }


    if (data.design === "horns") {

        wrapper.appendChild(
            makeElement("horn horn-left")
        );

        wrapper.appendChild(
            makeElement("horn horn-right")
        );

    }


    if (data.design === "shellby") {

        wrapper.appendChild(
            makeElement("shell")
        );

        wrapper.appendChild(
            makeElement("shell-line")
        );

    }


    if (data.design === "tallboi") {

        wrapper.appendChild(
            makeElement("tall-hat")
        );

        wrapper.appendChild(
            makeElement("tall-stripe")
        );

    }


    if (data.design === "four-eyes") {

        wrapper.appendChild(
            makeElement("extra-eye extra-eye-left")
        );

        wrapper.appendChild(
            makeElement("extra-eye extra-eye-right")
        );

    }


    if (data.design === "mothball") {

        wrapper.appendChild(
            makeElement("moth-wing moth-wing-left")
        );

        wrapper.appendChild(
            makeElement("moth-wing moth-wing-right")
        );

        wrapper.appendChild(
            makeElement("moth-antenna")
        );

    }


    if (data.design === "spike") {

        wrapper.appendChild(
            makeElement("spike-one")
        );

        wrapper.appendChild(
            makeElement("spike-two")
        );

        wrapper.appendChild(
            makeElement("spike-three")
        );

        wrapper.appendChild(
            makeElement("spike-four")
        );

    }


    if (data.design === "orbit") {

        wrapper.appendChild(
            makeElement("orbit-ring")
        );

        wrapper.appendChild(
            makeElement("orbit-dot")
        );

    }


    if (data.design === "bubble") {

        wrapper.appendChild(
            makeElement("bubble-highlight")
        );

        wrapper.appendChild(
            makeElement("bubble-small")
        );

    }


    if (data.design === "captain") {

        wrapper.appendChild(
            makeElement("captain-cape")
        );

        wrapper.appendChild(
            makeElement("captain-badge")
        );

    }


    if (data.design === "tailspin") {

        wrapper.appendChild(
            makeElement("tail")
        );

        wrapper.appendChild(
            makeElement("tail-tip")
        );

    }


    if (data.design === "holy") {

        wrapper.appendChild(
            makeElement("holy-halo")
        );

        wrapper.appendChild(
            makeElement("holy-rays")
        );

    }


    if (
        data.design === "wingnut" ||
        data.design === "study-orbit"
    ) {

        wrapper.appendChild(
            makeElement("wing wing-left")
        );

        wrapper.appendChild(
            makeElement("wing wing-right")
        );

    }


    if (
        data.design === "cosmo" ||
        data.design === "study-orbit"
    ) {

        wrapper.appendChild(
            makeElement("cosmo-ring")
        );

        wrapper.appendChild(
            makeElement("cosmo-star")
        );

    }


    if (data.design === "the-goober") {

        wrapper.appendChild(
            makeElement("goober-mask")
        );

        wrapper.appendChild(
            makeElement("goober-mark")
        );

    }


    if (data.design === "golden") {

        wrapper.appendChild(
            makeElement("golden-collar")
        );

        wrapper.appendChild(
            makeElement("golden-spark-one")
        );

        wrapper.appendChild(
            makeElement("golden-spark-two")
        );

    }


    if (data.design === "mushroom") {

        wrapper.appendChild(
            makeElement("mushroom-cap")
        );

        wrapper.appendChild(
            makeElement("mushroom-spot-one")
        );

        wrapper.appendChild(
            makeElement("mushroom-spot-two")
        );

        wrapper.appendChild(
            makeElement("mushroom-stem")
        );

    }


    return wrapper;

}


/* =========================================================
   BANNER PREVIEW
========================================================= */

function createBanner(data) {

    var banner =
        makeElement(
            "banner-preview banner-" +
            data.design
        );

    return banner;

}


/* =========================================================
   TITLE PREVIEW
========================================================= */

function createTitlePreview(data) {

    var title =
        makeElement(
            "title-preview " +
            rarityClass(data.rarity)
        );

    title.textContent =
        data.name;

    return title;

}


/* =========================================================
   ITEM PREVIEW
========================================================= */

function createPreview(item) {

    if (item.type === "Character") {

        return createGoober(item);

    }

    if (item.type === "Banner") {

        return createBanner(item);

    }

    if (item.type === "Player Title") {

        return createTitlePreview(item);

    }

    return createGoober({
        design: "squish"
    });

}


/* =========================================================
   CURRENT SHOP PERIOD
========================================================= */

function getShopStart() {

    var now =
        Date.now();

    var elapsed =
        now -
        SHOP_ANCHOR;

    var cycles =
        Math.floor(
            elapsed /
            SHOP_LENGTH_MS
        );

    return (
        SHOP_ANCHOR +
        cycles *
        SHOP_LENGTH_MS
    );

}


/* =========================================================
   SEEDED RANDOM
========================================================= */

function seededRandom(seed) {

    var value =
        Math.sin(seed) *
        10000;

    return value -
        Math.floor(value);

}


/* =========================================================
   SHUFFLE
========================================================= */

function seededShuffle(array, seed) {

    var result =
        array.slice();

    var currentSeed =
        seed;

    var i;
    var j;
    var temporary;

    for (
        i = result.length - 1;
        i > 0;
        i--
    ) {

        currentSeed += 1;

        j =
            Math.floor(
                seededRandom(currentSeed) *
                (i + 1)
            );

        temporary =
            result[i];

        result[i] =
            result[j];

        result[j] =
            temporary;

    }

    return result;

}


/* =========================================================
   BUILD SHOP POOL
========================================================= */

function getShopPool() {

    var characters =
        SHOP_CHARACTERS.map(
            function(character) {

                return {
                    id: character.id,
                    name: character.name,
                    rarity: character.rarity,
                    price: character.price,
                    type: "Character",
                    design: character.design
                };

            }
        );


    var pool =
        characters.concat(
            SHOP_BANNERS
        );


    pool =
        pool.concat(
            SHOP_TITLES
        );


    return pool;

}


/* =========================================================
   CURRENT SHOP
========================================================= */

function getCurrentShop() {

    var start =
        getShopStart();

    var seed =
        Math.floor(
            start /
            1000
        );


    var pool =
        getShopPool();


    var shuffled =
        seededShuffle(
            pool,
            seed
        );


    return shuffled.slice(
        0,
        SHOP_ITEM_COUNT
    );

}


/* =========================================================
   SHOP CARD
========================================================= */

function createShopCard(item) {

    var card =
        document.createElement(
            "article"
        );

    card.className =
        "shop-card " +
        rarityClass(item.rarity);


    var rarity =
        document.createElement(
            "div"
        );

    rarity.className =
        "rarity-badge";

    rarity.textContent =
        item.rarity;


    var preview =
        document.createElement(
            "div"
        );

    preview.className =
        "item-preview";

    preview.appendChild(
        createPreview(item)
    );


    var name =
        document.createElement(
            "h3"
        );

    name.textContent =
        item.name;


    var type =
        document.createElement(
            "p"
        );

    type.className =
        "item-type";

    type.textContent =
        item.type;


    var price =
        document.createElement(
            "div"
        );

    price.className =
        "item-price";

    price.textContent =
        String(item.price) +
        " Coins";


    var button =
        document.createElement(
            "button"
        );

    button.className =
        "buy-button";


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
            function() {

                buyMainItem(
                    item,
                    button
                );

            };

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

    var container =
        document.getElementById(
            "fortnightly-items"
        );

    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    var items =
        getCurrentShop();


    items.forEach(
        function(item) {

            container.appendChild(
                createShopCard(item)
            );

        }
    );


    updateCurrency();

}


/* =========================================================
   BUY MAIN ITEM
========================================================= */

function buyMainItem(item, button) {

    if (ownsItem(item.id)) {
        return;
    }


    var coins =
        getCoins();


    if (coins < item.price) {

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


    var owned =
        getOwnedItems();


    if (
        owned.indexOf(item.id) === -1
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
   TICKET SHOP CARD
========================================================= */

function createTicketCard(item) {

    var card =
        document.createElement(
            "article"
        );

    card.className =
        "ticket-card";


    var preview =
        document.createElement(
            "div"
        );

    preview.className =
        "ticket-item-preview";


    var effect =
        document.createElement(
            "div"
        );

    effect.className =
        "ticket-effect ticket-" +
        item.design;


    var goober =
        createGoober({
            design: "squish"
        });


    preview.appendChild(effect);
    preview.appendChild(goober);


    var name =
        document.createElement(
            "h3"
        );

    name.textContent =
        item.name;


    var description =
        document.createElement(
            "p"
        );

    description.textContent =
        item.description;


    var price =
        document.createElement(
            "div"
        );

    price.className =
        "ticket-price";

    price.textContent =
        String(item.price) +
        " Shop Tickets";


    var button =
        document.createElement(
            "button"
        );

    button.className =
        "buy-button";


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
            function() {

                buyTicketItem(
                    item,
                    button
                );

            };

    }


    card.appendChild(preview);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);


    return card;

}


/* =========================================================
   DISPLAY TICKET SHOP
========================================================= */

function displayTicketShop() {

    var container =
        document.getElementById(
            "ticket-items"
        );

    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    TICKET_ITEMS.forEach(
        function(item) {

            container.appendChild(
                createTicketCard(item)
            );

        }
    );


    updateCurrency();

}


/* =========================================================
   BUY TICKET ITEM
========================================================= */

function buyTicketItem(item, button) {

    if (ownsItem(item.id)) {
        return;
    }


    var tickets =
        getTickets();


    if (tickets < item.price) {

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


    var owned =
        getOwnedItems();


    if (
        owned.indexOf(item.id) === -1
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

    var container =
        document.getElementById(
            "studypass-items"
        );

    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    STUDYPASS_CHARACTERS.forEach(
        function(item) {

            var card =
                document.createElement(
                    "article"
                );

            card.className =
                "studypass-card";


            var badge =
                document.createElement(
                    "div"
                );

            badge.className =
                "pass-badge";

            badge.textContent =
                "STUDYPASS";


            var rarity =
                document.createElement(
                    "div"
                );

            rarity.className =
                "rarity-badge " +
                rarityClass(item.rarity);

            rarity.textContent =
                item.rarity;


            var preview =
                document.createElement(
                    "div"
                );

            preview.className =
                "studypass-preview";


            preview.appendChild(
                createGoober(item)
            );


            var name =
                document.createElement(
                    "h3"
                );

            name.textContent =
                item.name;


            var description =
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

    var coinElement =
        document.getElementById(
            "coin-count"
        );


    var ticketElement =
        document.getElementById(
            "ticket-count"
        );


    if (coinElement) {

        coinElement.textContent =
            String(getCoins());

    }


    if (ticketElement) {

        ticketElement.textContent =
            String(getTickets());

    }

}


/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdown() {

    var element =
        document.getElementById(
            "countdown"
        );

    if (!element) {
        return;
    }


    var next =
        getShopStart() +
        SHOP_LENGTH_MS;


    var remaining =
        next -
        Date.now();


    if (remaining < 0) {
        remaining = 0;
    }


    var days =
        Math.floor(
            remaining /
            86400000
        );


    var hours =
        Math.floor(
            (
                remaining %
                86400000
            ) /
            3600000
        );


    var minutes =
        Math.floor(
            (
                remaining %
                3600000
            ) /
            60000
        );


    var seconds =
        Math.floor(
            (
                remaining %
                60000
            ) /
            1000
        );


    /*
       Deliberately NOT using ${...}.
    */

    element.textContent =
        String(days) +
        "d " +
        String(hours) +
        "h " +
        String(minutes) +
        "m " +
        String(seconds) +
        "s";

}


/* =========================================================
   SHOP NAVIGATION
========================================================= */

function openMainShop() {

    var main =
        document.getElementById(
            "fortnightly-shop"
        );

    var tickets =
        document.getElementById(
            "ticket-shop"
        );

    var mainButton =
        document.getElementById(
            "main-shop-button"
        );

    var ticketButton =
        document.getElementById(
            "ticket-shop-button"
        );


    if (main) {
        main.style.display =
            "block";
    }

    if (tickets) {
        tickets.style.display =
            "none";
    }

    if (mainButton) {
        mainButton.classList.add(
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

    var main =
        document.getElementById(
            "fortnightly-shop"
        );

    var tickets =
        document.getElementById(
            "ticket-shop"
        );

    var mainButton =
        document.getElementById(
            "main-shop-button"
        );

    var ticketButton =
        document.getElementById(
            "ticket-shop-button"
        );


    if (main) {
        main.style.display =
            "none";
    }

    if (tickets) {
        tickets.style.display =
            "block";
    }

    if (mainButton) {
        mainButton.classList.remove(
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

    var overlay =
        document.createElement(
            "div"
        );

    overlay.className =
        "debug-overlay";


    var box =
        document.createElement(
            "div"
        );

    box.className =
        "debug-box";


    box.innerHTML = [
        "<h2>🛠️ StudySprint Debug</h2>",
        "<p>Developer tools</p>",
        "<hr>",
        "<select id='debug-type'>",
        "<option value='xp'>⭐ XP</option>",
        "<option value='coins'>🪙 Coins</option>",
        "<option value='tickets'>🎟️ Tickets</option>",
        "<option value='streak'>🔥 Streak</option>",
        "<option value='reset'>🗑️ Reset Account</option>",
        "</select>",
        "<input id='debug-value' type='number' placeholder='Amount'>",
        "<button id='debug-apply'>Apply</button>",
        "<button id='debug-close'>Cancel</button>"
    ].join("");


    overlay.appendChild(box);
    document.body.appendChild(overlay);


    var type =
        box.querySelector(
            "#debug-type"
        );


    var value =
        box.querySelector(
            "#debug-value"
        );


    function updateInput() {

        if (type.value === "reset") {

            value.style.display =
                "none";

        } else {

            value.style.display =
                "block";

        }

    }


    type.addEventListener(
        "change",
        updateInput
    );


    updateInput();


    box.querySelector(
        "#debug-close"
    ).onclick =
        function() {

            overlay.remove();

        };


    box.querySelector(
        "#debug-apply"
    ).onclick =
        function() {

            var selected =
                type.value;


            if (selected === "reset") {

                var confirmed =
                    confirm(
                        "⚠️ Reset your entire StudySprint account?\n\n" +
                        "This removes saved XP, coins, tickets, streak, " +
                        "stats, achievements and shop ownership."
                    );


                if (!confirmed) {
                    return;
                }


                localStorage.clear();


                alert(
                    "✅ Account reset!\n\nReloading StudySprint..."
                );


                location.reload();

                return;

            }


            var amount =
                Number(
                    value.value
                );


            if (!Number.isFinite(amount)) {

                alert(
                    "Enter a valid number."
                );

                return;

            }


            var keys = {

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
                "✅ " +
                selected +
                " set to " +
                String(amount) +
                "!"
            );


            overlay.remove();

            location.reload();

        };

}


/* =========================================================
   START SHOP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        var mainButton =
            document.getElementById(
                "main-shop-button"
            );


        var ticketButton =
            document.getElementById(
                "ticket-shop-button"
            );


        var debugButton =
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


        openMainShop();

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
