/* =========================================================
   STUDYSPRINT SHOP
   Updated Shop System
   - Coin Shop
   - Hat Shop
   - StudyPass
   - Fortnightly rotation
   - Rarities
   - Ownership
   - Debug tools
   ========================================================= */


/* =========================================================
   SHOP SETTINGS
   ========================================================= */

const SHOP_SLOTS = 6;

const SHOP_INTERVAL =
    14 * 24 * 60 * 60 * 1000;


/*
   Shop rotation anchor.

   Sunday 10 August 2025
   12:00 AM AEST
   = Saturday 9 August 2025
   2:00 PM UTC
*/

const SHOP_ANCHOR =
    Date.UTC(2025, 7, 9, 14, 0, 0);


/* =========================================================
   RARITY CHANCES
   ========================================================= */

const RARITY_CHANCES = [

    {
        name: "Common",
        weight: 40
    },

    {
        name: "Rare",
        weight: 30
    },

    {
        name: "Epic",
        weight: 18
    },

    {
        name: "Mythic",
        weight: 9
    },

    {
        name: "Legendary",
        weight: 3
    }

];


/* =========================================================
   COIN SHOP ITEMS
   =========================================================
   
   Leafy is NOT included because Leafy is the starter
   character and must never appear in the shop.
   ========================================================= */

const SHOP_ITEMS = [

    /* =====================================================
       COMMON GOOBERS
       ===================================================== */

    {
        id: "squish",
        name: "Squish",
        type: "Character",
        rarity: "Common",
        price: 275,
        design: "squish"
    },

    {
        id: "pebble",
        name: "Pebble",
        type: "Character",
        rarity: "Common",
        price: 300,
        design: "pebble"
    },

    {
        id: "button",
        name: "Button",
        type: "Character",
        rarity: "Common",
        price: 325,
        design: "button"
    },


    /* =====================================================
       RARE GOOBERS
       ===================================================== */

    {
        id: "horns",
        name: "Horns",
        type: "Character",
        rarity: "Rare",
        price: 400,
        design: "horns"
    },

    {
        id: "shelby",
        name: "Shelby",
        type: "Character",
        rarity: "Rare",
        price: 425,
        design: "shelby"
    },

    {
        id: "tallboi",
        name: "Tallboi",
        type: "Character",
        rarity: "Rare",
        price: 450,
        design: "tallboi"
    },

    {
        id: "four-eyes",
        name: "Four Eyes",
        type: "Character",
        rarity: "Rare",
        price: 475,
        design: "fourEyes"
    },


    /* =====================================================
       EPIC GOOBERS
       ===================================================== */

    {
        id: "mothball",
        name: "Mothball",
        type: "Character",
        rarity: "Epic",
        price: 550,
        design: "mothball"
    },

    {
        id: "spike",
        name: "Spike",
        type: "Character",
        rarity: "Epic",
        price: 575,
        design: "spike"
    },

    {
        id: "orbit",
        name: "Orbit",
        type: "Character",
        rarity: "Epic",
        price: 600,
        design: "orbit"
    },

    {
        id: "bubble",
        name: "Bubble",
        type: "Character",
        rarity: "Epic",
        price: 625,
        design: "bubble"
    },


    /* =====================================================
       MYTHIC GOOBERS
       ===================================================== */

    {
        id: "captain-goob",
        name: "Captain Goob",
        type: "Character",
        rarity: "Mythic",
        price: 700,
        design: "captainGoob"
    },

    {
        id: "tailspin",
        name: "Tailspin",
        type: "Character",
        rarity: "Mythic",
        price: 725,
        design: "tailspin"
    },

    {
        id: "holy-moly",
        name: "Holy Moly",
        type: "Character",
        rarity: "Mythic",
        price: 750,
        design: "holyMoly"
    },

    {
        id: "wingnut",
        name: "Wingnut",
        type: "Character",
        rarity: "Mythic",
        price: 775,
        design: "wingnut"
    },


    /* =====================================================
       LEGENDARY GOOBERS
       ===================================================== */

    {
        id: "cosmo",
        name: "Cosmo",
        type: "Character",
        rarity: "Legendary",
        price: 950,
        design: "cosmo"
    },

    {
        id: "the-goober",
        name: "The Goober",
        type: "Character",
        rarity: "Legendary",
        price: 1000,
        design: "theGoober"
    },

    {
        id: "golden-goober",
        name: "Golden Goober",
        type: "Character",
        rarity: "Legendary",
        price: 1100,
        design: "golden"
    },

    {
        id: "galaxy-goober",
        name: "Galaxy Goober",
        type: "Character",
        rarity: "Legendary",
        price: 1200,
        design: "galaxy"
    },


    /* =====================================================
       BANNERS
       ===================================================== */

    {
        id: "sprint-grid",
        name: "Sprint Grid",
        type: "Banner",
        rarity: "Common",
        price: 100,
        design: "sprintGrid"
    },

    {
        id: "purple-grid",
        name: "Purple Grid",
        type: "Banner",
        rarity: "Common",
        price: 125,
        design: "purpleGrid"
    },

    {
        id: "neon-blue",
        name: "Neon Blue",
        type: "Banner",
        rarity: "Rare",
        price: 175,
        design: "neonBlue"
    },

    {
        id: "galaxy-banner",
        name: "Galaxy",
        type: "Banner",
        rarity: "Epic",
        price: 300,
        design: "galaxy"
    },

    {
        id: "gold-banner",
        name: "Golden",
        type: "Banner",
        rarity: "Legendary",
        price: 600,
        design: "gold"
    },


    /* =====================================================
       PLAYER TITLES
       ===================================================== */

    {
        id: "study-sprinter",
        name: "Study Sprinter",
        type: "Player Title",
        rarity: "Common",
        price: 150
    },

    {
        id: "brainiac",
        name: "Brainiac",
        type: "Player Title",
        rarity: "Rare",
        price: 300
    },

    {
        id: "speed-learner",
        name: "Speed Learner",
        type: "Player Title",
        rarity: "Epic",
        price: 450
    },

    {
        id: "knowledge-seeker",
        name: "Knowledge Seeker",
        type: "Player Title",
        rarity: "Mythic",
        price: 650
    },

    {
        id: "study-legend",
        name: "Study Legend",
        type: "Player Title",
        rarity: "Legendary",
        price: 1000
    }

];


/* =========================================================
   DEBUG DATA
   ========================================================= */

window.DEBUG_GOOBERS =
    SHOP_ITEMS.filter(function(item) {

        return item.type === "Character";

    });

window.DEBUG_SHOP_ITEMS =
    SHOP_ITEMS;


/* =========================================================
   STUDYPASS ITEMS
   ========================================================= */

const STUDYPASS_ITEMS = [

    {
        id: "study-sprout",
        name: "Study Sprout",
        type: "Character",
        rarity: "Epic",
        design: "studySprout"
    },

    {
        id: "study-orbit",
        name: "Study Orbit",
        type: "Character",
        rarity: "Legendary",
        design: "studyOrbit"
    }

];


/* =========================================================
   HAT SHOP
   =========================================================
   
   Effects have been completely removed.

   Hats use:
   unlocked_hats

   and are purchased using:
   Shop Tickets
   ========================================================= */

const HAT_ITEMS = [

    {
        id: "crown",
        name: "Crown",
        description:
            "A glowing crown fit for a StudySprint champion.",
        type: "Hat",
        rarity: "Legendary",
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


function setCoins(value) {

    localStorage.setItem(
        "coins",
        String(value)
    );

}


function setTickets(value) {

    localStorage.setItem(
        "shopTickets",
        String(value)
    );

}


/* =========================================================
   OWNED ITEMS
   ========================================================= */

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

    return (
        getOwnedItems().indexOf(id) !== -1
    );

}


/* =========================================================
   UNLOCK ITEM
   ========================================================= */

function unlockItem(id, type) {

    let key = "";


    if (type === "Character") {

        key = "unlocked_characters";

    }


    if (type === "Banner") {

        key = "unlocked_banners";

    }


    if (type === "Player Title") {

        key = "unlockedTitles";

    }


    if (type === "Hat") {

        key = "unlocked_hats";

    }


    if (!key) {

        return;

    }


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
        unlocked.indexOf(id) === -1
    ) {

        unlocked.push(id);

    }


    localStorage.setItem(
        key,
        JSON.stringify(unlocked)
    );

}


/* =========================================================
   SEEDED RANDOM
   ========================================================= */

function seededRandom(seed) {

    let value =
        seed % 2147483647;


    if (value <= 0) {

        value += 2147483646;

    }


    value =
        value * 16807 %
        2147483647;


    return (
        value - 1
    ) / 2147483646;

}


/* =========================================================
   SHOP START
   ========================================================= */

function getShopStart() {

    const debugReset =
        localStorage.getItem(
            "shopDebugReset"
        );


    if (debugReset) {

        return Number(debugReset);

    }


    const now =
        Date.now();


    const cycles =
        Math.floor(
            (
                now -
                SHOP_ANCHOR
            ) /
            SHOP_INTERVAL
        );


    return (
        SHOP_ANCHOR +
        cycles *
        SHOP_INTERVAL
    );

}


/* =========================================================
   RARITY ROLL
   ========================================================= */

function rollRarity(random) {

    let total = 0;


    for (
        let i = 0;
        i < RARITY_CHANCES.length;
        i++
    ) {

        total +=
            RARITY_CHANCES[i].weight;


        if (
            random * 100 <
            total
        ) {

            return RARITY_CHANCES[i].name;

        }

    }


    return "Common";

}


/* =========================================================
   SHOP GENERATION
   ========================================================= */

function getCurrentShop() {

    const start =
        getShopStart();


    const rerollSeed =
        Number(
            localStorage.getItem(
                "shopRerollSeed"
            )
        ) || 0;


    const baseSeed =
        Math.floor(
            start / 1000
        ) +
        rerollSeed;


    const result = [];

    const used =
        new Set();


    for (
        let slot = 0;
        slot < SHOP_SLOTS;
        slot++
    ) {

        let random =
            seededRandom(
                baseSeed +
                slot * 7919
            );


        const rarity =
            rollRarity(random);


        let candidates =
            SHOP_ITEMS.filter(
                function(item) {

                    return (
                        item.rarity === rarity &&
                        !used.has(item.id)
                    );

                }
            );


        if (
            candidates.length === 0
        ) {

            candidates =
                SHOP_ITEMS.filter(
                    function(item) {

                        return !used.has(
                            item.id
                        );

                    }
                );

        }


        if (
            candidates.length === 0
        ) {

            break;

        }


        random =
            seededRandom(
                baseSeed +
                slot * 15485863
            );


        const index =
            Math.floor(
                random *
                candidates.length
            );


        const item =
            candidates[index];


        used.add(item.id);

        result.push(item);

    }


    return result;

}


/* =========================================================
   DEBUG SHOP REROLL
   ========================================================= */

function rerollShop() {

    localStorage.setItem(
        "shopRerollSeed",
        String(Date.now())
    );

    location.reload();

}


/* =========================================================
   RESET SHOP REROLL
   ========================================================= */

function resetShopReroll() {

    localStorage.removeItem(
        "shopRerollSeed"
    );

    location.reload();

}


/* =========================================================
   GOOBER CREATION
   ========================================================= */

function createGoober(data) {

    const goober =
        document.createElement("div");

    goober.className =
        "goober design-" +
        data.design;


    const body =
        document.createElement("div");

    body.className =
        "goober-body";


    const face =
        document.createElement("div");

    face.className =
        "goober-face";


    const leftEye =
        document.createElement("div");

    leftEye.className =
        "goober-eye eye-left";


    const rightEye =
        document.createElement("div");

    rightEye.className =
        "goober-eye eye-right";


    const mouth =
        document.createElement("div");

    mouth.className =
        "goober-mouth";


    const feet =
        document.createElement("div");

    feet.className =
        "goober-feet";


    const leftFoot =
        document.createElement("div");

    leftFoot.className =
        "goober-foot foot-left";


    const rightFoot =
        document.createElement("div");

    rightFoot.className =
        "goober-foot foot-right";


    face.appendChild(leftEye);
    face.appendChild(rightEye);
    face.appendChild(mouth);


    feet.appendChild(leftFoot);
    feet.appendChild(rightFoot);


    goober.appendChild(feet);
    goober.appendChild(body);
    goober.appendChild(face);


    function addPart(className) {

        const part =
            document.createElement("div");

        part.className =
            "goober-part " +
            className;

        goober.appendChild(part);

        return part;

    }


    /* -----------------------------------------------------
       LEAFY
       ----------------------------------------------------- */

    if (data.design === "leafy") {

        body.classList.add("green");

        addPart("leafy-leaf");
        addPart("leafy-stem");

    }


    /* -----------------------------------------------------
       SQUISH
       ----------------------------------------------------- */

    if (data.design === "squish") {

        body.classList.add("blue");
        body.classList.add("squishy");

        addPart("squish-cheek-left");
        addPart("squish-cheek-right");

    }


    /* -----------------------------------------------------
       PEBBLE
       ----------------------------------------------------- */

    if (data.design === "pebble") {

        body.classList.add("stone");

        addPart("pebble-mark-one");
        addPart("pebble-mark-two");
        addPart("pebble-mark-three");

    }


    /* -----------------------------------------------------
       BUTTON
       ----------------------------------------------------- */

    if (data.design === "button") {

        body.classList.add("pink");

        addPart("button-top");
        addPart("button-dot-left");
        addPart("button-dot-right");

    }


    /* -----------------------------------------------------
       HORNS
       ----------------------------------------------------- */

    if (data.design === "horns") {

        body.classList.add("purple");

        addPart("horn-left");
        addPart("horn-right");

    }


    /* -----------------------------------------------------
       SHELBY
       ----------------------------------------------------- */

    if (data.design === "shelby") {

        body.classList.add("mint");

        const shell =
            document.createElement("div");

        shell.className =
            "shelby-shell";

        goober.insertBefore(
            shell,
            face
        );

        addPart("shell-highlight");

    }


    /* -----------------------------------------------------
       TALLBOI
       ----------------------------------------------------- */

    if (data.design === "tallboi") {

        body.classList.add("yellow");
        body.classList.add("tall");

        addPart("tallboi-hat");

    }


    /* -----------------------------------------------------
       FOUR EYES
       ----------------------------------------------------- */

    if (data.design === "fourEyes") {

        body.classList.add("coral");

        const third =
            document.createElement("div");

        third.className =
            "goober-eye extra-eye extra-one";


        const fourth =
            document.createElement("div");

        fourth.className =
            "goober-eye extra-eye extra-two";


        face.appendChild(third);
        face.appendChild(fourth);

        addPart("four-eyes-brow");

    }


    /* -----------------------------------------------------
       MOTHBALL
       ----------------------------------------------------- */

    if (data.design === "mothball") {

        body.classList.add("lavender");

        addPart("moth-wing-left");
        addPart("moth-wing-right");
        addPart("moth-antenna-left");
        addPart("moth-antenna-right");

    }


    /* -----------------------------------------------------
       SPIKE
       ----------------------------------------------------- */

    if (data.design === "spike") {

        body.classList.add("red");

        addPart("spike-one");
        addPart("spike-two");
        addPart("spike-three");
        addPart("spike-four");

    }


    /* -----------------------------------------------------
       ORBIT
       ----------------------------------------------------- */

    if (data.design === "orbit") {

        body.classList.add("cyan");

        addPart("orbit-ring");
        addPart("orbit-dot");

    }


    /* -----------------------------------------------------
       BUBBLE
       ----------------------------------------------------- */

    if (data.design === "bubble") {

        body.classList.add("aqua");

        addPart("bubble-small-one");
        addPart("bubble-small-two");
        addPart("bubble-shine");

    }


    /* -----------------------------------------------------
       CAPTAIN GOOB
       ----------------------------------------------------- */

    if (data.design === "captainGoob") {

        body.classList.add("violet");

        const cape =
            document.createElement("div");

        cape.className =
            "captain-cape";

        goober.insertBefore(
            cape,
            body
        );

        addPart("captain-badge");
        addPart("captain-hat");

    }


    /* -----------------------------------------------------
       TAILSPIN
       ----------------------------------------------------- */

    if (data.design === "tailspin") {

        body.classList.add("hotpink");

        addPart("tailspin-tail");
        addPart("tailspin-tip");

    }


    /* -----------------------------------------------------
       HOLY MOLY
       ----------------------------------------------------- */

    if (data.design === "holyMoly") {

        body.classList.add("gold");

        addPart("holy-halo");
        addPart("holy-rays");

    }


    /* -----------------------------------------------------
       WINGNUT
       ----------------------------------------------------- */

    if (data.design === "wingnut") {

        body.classList.add("peach");

        addPart("wingnut-left");
        addPart("wingnut-right");
        addPart("wingnut-nut");

    }


    /* -----------------------------------------------------
       COSMO
       ----------------------------------------------------- */

    if (data.design === "cosmo") {

        body.classList.add("deep-purple");

        addPart("cosmo-stars");
        addPart("cosmo-moon");

    }


    /* -----------------------------------------------------
       THE GOOBER
       ----------------------------------------------------- */

    if (data.design === "theGoober") {

        body.classList.add("orange");

        addPart("goober-big-smile");
        addPart("goober-tuft");
        addPart("goober-star");

    }


    /* -----------------------------------------------------
       GOLDEN GOOBER
       ----------------------------------------------------- */

    if (data.design === "golden") {

        body.classList.add("golden");

        addPart("golden-shine");
        addPart("golden-crown");

    }


    /* -----------------------------------------------------
       GALAXY GOOBER
       ----------------------------------------------------- */

    if (data.design === "galaxy") {

        body.classList.add("galaxy-body");

        addPart("galaxy-stars");
        addPart("galaxy-ring");
        addPart("galaxy-glow");

    }


    /* -----------------------------------------------------
       STUDY SPROUT
       ----------------------------------------------------- */

    if (data.design === "studySprout") {

        body.classList.add("study-green");

        addPart("study-book");
        addPart("study-leaf-left");
        addPart("study-leaf-right");

    }


    /* -----------------------------------------------------
       STUDY ORBIT
       ----------------------------------------------------- */

    if (data.design === "studyOrbit") {

        body.classList.add("study-purple");

        addPart("study-orbit-ring");
        addPart("study-star");

    }


    return goober;

}


/* =========================================================
   HAT PREVIEW
   ========================================================= */

function createHatPreview(item) {

    const preview =
        document.createElement("div");

    preview.className =
        "hat-preview hat-" +
        item.design;


    /*
       Create a Goober underneath the hat so hats
       are shown as actual cosmetics.
    */

    const goober =
        createGoober({
            design: "orbit"
        });


    preview.appendChild(
        goober
    );


    const hat =
        document.createElement("div");

    hat.className =
        "hat-item hat-" +
        item.design;


    preview.appendChild(
        hat
    );


    return preview;

}


/* =========================================================
   BANNER PREVIEW
   ========================================================= */

function createBanner(item) {

    const banner =
        document.createElement("div");

    banner.className =
        "banner-preview banner-" +
        item.design;

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
        item.name;

    return title;

}


/* =========================================================
   GENERIC PREVIEW
   ========================================================= */

function createPreview(item) {

    if (
        item.type === "Character"
    ) {

        return createGoober(item);

    }


    if (
        item.type === "Banner"
    ) {

        return createBanner(item);

    }


    if (
        item.type === "Player Title"
    ) {

        return createTitlePreview(item);

    }


    if (
        item.type === "Hat"
    ) {

        return createHatPreview(item);

    }


    return document.createElement("div");

}


/* =========================================================
   RARITY CLASS
   ========================================================= */

function getRarityClass(rarity) {

    return (
        "rarity-" +
        rarity.toLowerCase()
    );

}


/* =========================================================
   COIN SHOP CARD
   ========================================================= */

function createShopCard(item) {

    const card =
        document.createElement("article");

    card.className =
        "shop-card " +
        getRarityClass(item.rarity);


    const rarity =
        document.createElement("div");

    rarity.className =
        "rarity";

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
        item.price +
        " Coins";


    const button =
        document.createElement("button");

    button.className =
        "buy-button";


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

        button.addEventListener(
            "click",
            function() {

                buyCoinItem(
                    item,
                    button
                );

            }
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


    if (!container) {

        return;

    }


    container.innerHTML = "";


    const items =
        getCurrentShop();


    items.forEach(
        function(item) {

            container.appendChild(
                createShopCard(item)
            );

        }
    );

}


/* =========================================================
   BUY COIN ITEM
   ========================================================= */

function buyCoinItem(item, button) {

    if (
        ownsItem(item.id)
    ) {

        return;

    }


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


    unlockItem(
        item.id,
        item.type
    );


    const owned =
        getOwnedItems();


    if (
        owned.indexOf(item.id) === -1
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
   HAT SHOP
   ========================================================= */

function displayHatShop() {

    const container =
        document.getElementById(
            "hat-items"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    HAT_ITEMS.forEach(
        function(item) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "hat-card " +
                getRarityClass(
                    item.rarity
                );


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
                "hat-item-preview";


            preview.appendChild(
                createHatPreview(item)
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
                "hat-price";


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


                button.classList.add(
                    "owned"
                );

            } else {

                button.textContent =
                    "BUY";


                button.addEventListener(
                    "click",
                    function() {

                        buyHat(
                            item,
                            button
                        );

                    }
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
                description
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

}


/* =========================================================
   BUY HAT
   ========================================================= */

function buyHat(item, button) {

    if (
        ownsItem(item.id)
    ) {

        return;

    }


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


    unlockItem(
        item.id,
        "Hat"
    );


    const owned =
        getOwnedItems();


    if (
        owned.indexOf(item.id) === -1
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
   STUDYPASS
   ========================================================= */

function displayStudyPass() {

    const container =
        document.getElementById(
            "studypass-items"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    STUDYPASS_ITEMS.forEach(
        function(item) {

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
                "rarity";


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


            card.appendChild(
                badge
            );


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
                description
            );


            container.appendChild(
                card
            );

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


    if (!element) {

        return;

    }


    const next =
        getShopStart() +
        SHOP_INTERVAL;


    let remaining =
        next -
        Date.now();


    if (
        remaining < 0
    ) {

        remaining = 0;

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

function openMainShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );


    const hats =
        document.getElementById(
            "hat-shop"
        );


    const mainButton =
        document.getElementById(
            "main-shop-button"
        );


    const hatButton =
        document.getElementById(
            "hat-shop-button"
        );


    if (main) {

        main.style.display =
            "block";

    }


    if (hats) {

        hats.style.display =
            "none";

    }


    if (mainButton) {

        mainButton.classList.add(
            "active"
        );

    }


    if (hatButton) {

        hatButton.classList.remove(
            "active"
        );

    }

}


function openHatShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );


    const hats =
        document.getElementById(
            "hat-shop"
        );


    const mainButton =
        document.getElementById(
            "main-shop-button"
        );


    const hatButton =
        document.getElementById(
            "hat-shop-button"
        );


    if (main) {

        main.style.display =
            "none";

    }


    if (hats) {

        hats.style.display =
            "block";

    }


    if (mainButton) {

        mainButton.classList.remove(
            "active"
        );

    }


    if (hatButton) {

        hatButton.classList.add(
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


    box.innerHTML =
        "<h2>🛠️ StudySprint Debug</h2>" +

        "<p>What do you want to change?</p>" +

        "<select id='debug-type'>" +

        "<option value='xp'>⭐ XP</option>" +

        "<option value='coins'>🪙 Coins</option>" +

        "<option value='tickets'>🎟️ Tickets</option>" +

        "<option value='streak'>🔥 Streak</option>" +

        "<option value='reroll-shop'>🔄 Reroll Shop</option>" +

        "<option value='reset-reroll'>↩️ Return To Normal Shop</option>" +

        "<option value='show-goobers'>🟢 Show All Goobers</option>" +

        "<option value='show-items'>🛍️ Show All Shop Items</option>" +

        "<option value='show-hats'>🎩 Show All Hats</option>" +

        "<option value='reset'>🗑️ Reset Account</option>" +

        "</select>" +

        "<input id='debug-value' " +
        "type='number' " +
        "placeholder='Amount'>" +

        "<button id='debug-apply' " +
        "class='debug-apply'>" +
        "Apply" +
        "</button>" +

        "<button id='debug-close' " +
        "class='debug-close'>" +
        "Cancel" +
        "</button>";


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

        const hidden =
            type.value === "reset" ||
            type.value === "show-goobers" ||
            type.value === "show-items" ||
            type.value === "show-hats" ||
            type.value === "reroll-shop" ||
            type.value === "reset-reroll";


        value.style.display =
            hidden
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
    ).onclick =
        function() {

            overlay.remove();

        };


    box.querySelector(
        "#debug-apply"
    ).onclick =
        function() {

            const selected =
                type.value;


            /* ---------------------------------------------
               REROLL SHOP
               --------------------------------------------- */

            if (
                selected === "reroll-shop"
            ) {

                rerollShop();

                return;

            }


            /* ---------------------------------------------
               RETURN TO NORMAL SHOP
               --------------------------------------------- */

            if (
                selected === "reset-reroll"
            ) {

                resetShopReroll();

                return;

            }


            /* ---------------------------------------------
               SHOW ALL GOOBERS
               --------------------------------------------- */

            if (
                selected === "show-goobers"
            ) {

                showDebugItems(
                    DEBUG_GOOBERS,
                    "ALL GOOBERS"
                );

                return;

            }


            /* ---------------------------------------------
               SHOW ALL SHOP ITEMS
               --------------------------------------------- */

            if (
                selected === "show-items"
            ) {

                showDebugItems(
                    DEBUG_SHOP_ITEMS,
                    "ALL COIN SHOP ITEMS"
                );

                return;

            }


            /* ---------------------------------------------
               SHOW ALL HATS
               --------------------------------------------- */

            if (
                selected === "show-hats"
            ) {

                showDebugItems(
                    HAT_ITEMS,
                    "ALL HATS"
                );

                return;

            }


            /* ---------------------------------------------
               RESET
               --------------------------------------------- */

            if (
                selected === "reset"
            ) {

                const confirmed =
                    confirm(
                        "Reset your entire StudySprint account?"
                    );


                if (!confirmed) {

                    return;

                }


                localStorage.clear();


                alert(
                    "Account reset! Reloading StudySprint..."
                );


                location.reload();

                return;

            }


            /* ---------------------------------------------
               NORMAL VALUES
               --------------------------------------------- */

            const amount =
                Number(
                    value.value
                );


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
                String(amount)
            );


            alert(
                selected +
                " set to " +
                amount +
                "!"
            );


            overlay.remove();

            location.reload();

        };

}


/* =========================================================
   DEBUG ITEM VIEWER
   ========================================================= */

function showDebugItems(items, title) {

    const existing =
        document.querySelector(
            ".debug-item-overlay"
        );


    if (existing) {

        existing.remove();

    }


    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "debug-item-overlay";


    const box =
        document.createElement(
            "div"
        );


    box.className =
        "debug-item-box";


    const heading =
        document.createElement(
            "h2"
        );


    heading.textContent =
        title;


    const count =
        document.createElement(
            "p"
        );


    count.textContent =
        items.length +
        " items available";


    const grid =
        document.createElement(
            "div"
        );


    grid.className =
        "debug-item-grid";


    items.forEach(
        function(item) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "debug-item-card";


            const preview =
                document.createElement(
                    "div"
                );


            preview.className =
                "debug-item-preview";


            if (
                item.type === "Character"
            ) {

                preview.appendChild(
                    createGoober(item)
                );

            }


            else if (
                item.type === "Banner"
            ) {

                preview.appendChild(
                    createBanner(item)
                );

            }


            else if (
                item.type === "Player Title"
            ) {

                preview.appendChild(
                    createTitlePreview(item)
                );

            }


            else if (
                item.type === "Hat"
            ) {

                preview.appendChild(
                    createHatPreview(item)
                );

            }


            const name =
                document.createElement(
                    "strong"
                );


            name.textContent =
                item.name;


            const rarity =
                document.createElement(
                    "span"
                );


            rarity.textContent =
                item.rarity;


            card.appendChild(preview);
            card.appendChild(name);
            card.appendChild(rarity);


            grid.appendChild(card);

        }
    );


    const close =
        document.createElement(
            "button"
        );


    close.className =
        "debug-close";


    close.textContent =
        "Close";


    close.onclick =
        function() {

            overlay.remove();

        };


    box.appendChild(heading);
    box.appendChild(count);
    box.appendChild(grid);
    box.appendChild(close);


    overlay.appendChild(box);

    document.body.appendChild(overlay);

}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const mainButton =
            document.getElementById(
                "main-shop-button"
            );


        const hatButton =
            document.getElementById(
                "hat-shop-button"
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


        if (hatButton) {

            hatButton.addEventListener(
                "click",
                openHatShop
            );

        }


        if (debugButton) {

            debugButton.addEventListener(
                "click",
                openDebugMenu
            );

        }


        displayMainShop();

        displayHatShop();

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

window.openHatShop =
    openHatShop;

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

window.rerollShop =
    rerollShop;

window.resetShopReroll =
    resetShopReroll;

window.showDebugItems =
    showDebugItems;

window.HAT_ITEMS =
    HAT_ITEMS;
