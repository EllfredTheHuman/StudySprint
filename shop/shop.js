/* =========================================================
   STUDYSPRINT SHOP
   COMPLETE REBUILD

   System:
   - Base avatar
   - Hair
   - Eyes
   - Face
   - Outfit
   - Hat
   - Accessories
   - Banners
   - Titles
   - Coins
   - Ownership
   - Equipped cosmetics
   - Rotating featured shop
   - Debug tools

   No Goobers.
   No StudyPass.
   No Shop Tickets.
========================================================= */


/* =========================================================
   SHOP SETTINGS
========================================================= */

const SHOP_SLOTS = 6;

const SHOP_INTERVAL =
    7 * 24 * 60 * 60 * 1000;


/*
   Rotation anchor:
   Sunday 10 August 2025
   12:00 AM AEST
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


/* =========================================================
   RARITIES
========================================================= */

const RARITIES = {

    Common: {
        weight: 45
    },

    Rare: {
        weight: 30
    },

    Epic: {
        weight: 17
    },

    Mythic: {
        weight: 6
    },

    Legendary: {
        weight: 2
    }

};


/* =========================================================
   COSMETICS
========================================================= */

const COSMETICS = [

    /* =====================================================
       HAIR
    ===================================================== */

    {
        id: "messy-hair",
        name: "Messy Hair",
        category: "Hair",
        rarity: "Common",
        price: 150,
        design: "messy"
    },

    {
        id: "spiky-hair",
        name: "Spiky Hair",
        category: "Hair",
        rarity: "Rare",
        price: 300,
        design: "spiky"
    },

    {
        id: "fluffy-hair",
        name: "Fluffy Hair",
        category: "Hair",
        rarity: "Epic",
        price: 500,
        design: "fluffy"
    },

    {
        id: "galaxy-hair",
        name: "Galaxy Hair",
        category: "Hair",
        rarity: "Legendary",
        price: 1000,
        design: "galaxy"
    },


    /* =====================================================
       EYES
    ===================================================== */

    {
        id: "round-eyes",
        name: "Round Eyes",
        category: "Eyes",
        rarity: "Common",
        price: 100,
        design: "round"
    },

    {
        id: "sleepy-eyes",
        name: "Sleepy Eyes",
        category: "Eyes",
        rarity: "Rare",
        price: 250,
        design: "sleepy"
    },

    {
        id: "cool-eyes",
        name: "Cool Eyes",
        category: "Eyes",
        rarity: "Epic",
        price: 450,
        design: "cool"
    },


    /* =====================================================
       FACE
    ===================================================== */

    {
        id: "happy-face",
        name: "Happy",
        category: "Face",
        rarity: "Common",
        price: 100,
        design: "happy"
    },

    {
        id: "silly-face",
        name: "Silly",
        category: "Face",
        rarity: "Rare",
        price: 250,
        design: "silly"
    },

    {
        id: "deadpan-face",
        name: "Deadpan",
        category: "Face",
        rarity: "Epic",
        price: 450,
        design: "deadpan"
    },


    /* =====================================================
       OUTFITS
    ===================================================== */

    {
        id: "blue-shirt",
        name: "Blue Shirt",
        category: "Outfit",
        rarity: "Common",
        price: 200,
        design: "blue"
    },

    {
        id: "red-shirt",
        name: "Red Shirt",
        category: "Outfit",
        rarity: "Rare",
        price: 300,
        design: "red"
    },

    {
        id: "tech-jacket",
        name: "Tech Jacket",
        category: "Outfit",
        rarity: "Epic",
        price: 600,
        design: "tech"
    },

    {
        id: "space-suit",
        name: "Space Suit",
        category: "Outfit",
        rarity: "Legendary",
        price: 1000,
        design: "space"
    },


    /* =====================================================
       HATS
    ===================================================== */

    {
        id: "party-hat",
        name: "Party Hat",
        category: "Hat",
        rarity: "Rare",
        price: 350,
        design: "party"
    },

    {
        id: "wizard-hat",
        name: "Wizard Hat",
        category: "Hat",
        rarity: "Epic",
        price: 600,
        design: "wizard"
    },

    {
        id: "space-helmet",
        name: "Space Helmet",
        category: "Hat",
        rarity: "Mythic",
        price: 800,
        design: "space"
    },


    /* =====================================================
       ACCESSORIES
    ===================================================== */

    {
        id: "glasses",
        name: "Glasses",
        category: "Accessory",
        rarity: "Common",
        price: 175,
        design: "glasses"
    },

    {
        id: "cool-glasses",
        name: "Cool Glasses",
        category: "Accessory",
        rarity: "Rare",
        price: 300,
        design: "cool-glasses"
    },

    {
        id: "golden-crown",
        name: "Golden Crown",
        category: "Accessory",
        rarity: "Legendary",
        price: 1200,
        design: "crown"
    },


    /* =====================================================
       BANNERS
    ===================================================== */

    {
        id: "blue-grid",
        name: "Blue Grid",
        category: "Banner",
        rarity: "Common",
        price: 150,
        design: "blue-grid"
    },

    {
        id: "neon-grid",
        name: "Neon Grid",
        category: "Banner",
        rarity: "Rare",
        price: 300,
        design: "neon-grid"
    },

    {
        id: "galaxy-banner",
        name: "Galaxy",
        category: "Banner",
        rarity: "Epic",
        price: 500,
        design: "galaxy"
    },

    {
        id: "void-banner",
        name: "The Void",
        category: "Banner",
        rarity: "Legendary",
        price: 1000,
        design: "void"
    },


    /* =====================================================
       TITLES
    ===================================================== */

    {
        id: "study-sprinter",
        name: "Study Sprinter",
        category: "Title",
        rarity: "Common",
        price: 150
    },

    {
        id: "brainiac",
        name: "Brainiac",
        category: "Title",
        rarity: "Rare",
        price: 300
    },

    {
        id: "speed-learner",
        name: "Speed Learner",
        category: "Title",
        rarity: "Epic",
        price: 500
    },

    {
        id: "knowledge-seeker",
        name: "Knowledge Seeker",
        category: "Title",
        rarity: "Mythic",
        price: 700
    },

    {
        id: "study-legend",
        name: "Study Legend",
        category: "Title",
        rarity: "Legendary",
        price: 1000
    }

];


/* =========================================================
   DEFAULT AVATAR
========================================================= */

const DEFAULT_AVATAR = {

    hair: null,

    eyes: null,

    face: null,

    outfit: null,

    hat: null,

    accessory: null,

    banner: null,

    title: null

};


/* =========================================================
   STORAGE
========================================================= */

function getCoins() {

    return Number(
        localStorage.getItem("coins")
    ) || 0;

}


function setCoins(value) {

    localStorage.setItem(
        "coins",
        String(Math.max(0, value))
    );

}


function getOwnedCosmetics() {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(
                    "ownedCosmetics"
                )
            );

        if (Array.isArray(data)) {

            return data;

        }

    } catch {

        // Ignore broken data.

    }


    return [];

}


function saveOwnedCosmetics(items) {

    localStorage.setItem(
        "ownedCosmetics",
        JSON.stringify(items)
    );

}


function getAvatar() {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(
                    "avatar"
                )
            );

        return {
            ...DEFAULT_AVATAR,
            ...(data || {})
        };

    } catch {

        return {
            ...DEFAULT_AVATAR
        };

    }

}


function saveAvatar(avatar) {

    localStorage.setItem(
        "avatar",
        JSON.stringify(avatar)
    );

}


function ownsCosmetic(id) {

    return getOwnedCosmetics()
        .includes(id);

}


/* =========================================================
   SEEDED RANDOM
========================================================= */

function seededRandom(seed) {

    let value =
        Math.abs(seed) % 2147483647;


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
   SHOP ROTATION
========================================================= */

function getShopStart() {

    const debug =
        localStorage.getItem(
            "shopDebugReset"
        );


    if (debug) {

        return Number(debug);

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
        const rarity of Object.keys(RARITIES)
    ) {

        total +=
            RARITIES[rarity].weight;


        if (
            random * 100 <
            total
        ) {

            return rarity;

        }

    }


    return "Common";

}


/* =========================================================
   CURRENT SHOP
========================================================= */

function getCurrentShop() {

    const start =
        getShopStart();


    const reroll =
        Number(
            localStorage.getItem(
                "shopRerollSeed"
            )
        ) || 0;


    const seed =
        Math.floor(
            start / 1000
        ) +
        reroll;


    const selected = [];

    const used =
        new Set();


    for (
        let slot = 0;
        slot < SHOP_SLOTS;
        slot++
    ) {

        let random =
            seededRandom(
                seed +
                slot * 7919
            );


        const rarity =
            rollRarity(random);


        let candidates =
            COSMETICS.filter(
                item =>
                    item.rarity === rarity &&
                    !used.has(item.id)
            );


        if (
            candidates.length === 0
        ) {

            candidates =
                COSMETICS.filter(
                    item =>
                        !used.has(item.id)
                );

        }


        if (
            candidates.length === 0
        ) {

            break;

        }


        random =
            seededRandom(
                seed +
                slot * 15485863
            );


        const item =
            candidates[
                Math.floor(
                    random *
                    candidates.length
                )
            ];


        used.add(item.id);

        selected.push(item);

    }


    return selected;

}


/* =========================================================
   PREVIEW AVATAR
========================================================= */

function createAvatarElement(avatarData = getAvatar()) {

    const avatar =
        document.createElement("div");

    avatar.className =
        "avatar";


    /* BODY */

    const body =
        document.createElement("div");

    body.className =
        "avatar-body";


    /* HEAD */

    const head =
        document.createElement("div");

    head.className =
        "avatar-head";


    /* EYES */

    const leftEye =
        document.createElement("div");

    leftEye.className =
        "avatar-eye left";


    const rightEye =
        document.createElement("div");

    rightEye.className =
        "avatar-eye right";


    head.appendChild(leftEye);

    head.appendChild(rightEye);


    /* MOUTH */

    const mouth =
        document.createElement("div");

    mouth.className =
        "avatar-mouth";


    head.appendChild(mouth);


    avatar.appendChild(body);

    avatar.appendChild(head);

    avatar.appendChild(mouth);


    /* COSMETICS */

    const cosmeticIds = [

        avatarData.hair,

        avatarData.hat,

        avatarData.accessory

    ];


    cosmeticIds.forEach(
        id => {

            if (!id) {
                return;
            }


            const item =
                COSMETICS.find(
                    cosmetic =>
                        cosmetic.id === id
                );


            if (!item) {
                return;
            }


            applyCosmetic(
                avatar,
                item
            );

        }
    );


    /* OUTFIT */

    if (avatarData.outfit) {

        const outfit =
            COSMETICS.find(
                item =>
                    item.id === avatarData.outfit
            );


        if (outfit) {

            body.classList.add(
                "outfit-" +
                outfit.design
            );

        }

    }


    /* EYES */

    if (avatarData.eyes) {

        const eyes =
            COSMETICS.find(
                item =>
                    item.id === avatarData.eyes
            );


        if (eyes) {

            head.classList.add(
                "eyes-" +
                eyes.design
            );

        }

    }


    /* FACE */

    if (avatarData.face) {

        const face =
            COSMETICS.find(
                item =>
                    item.id === avatarData.face
            );


        if (face) {

            mouth.classList.add(
                "face-" +
                face.design
            );

        }

    }


    return avatar;

}


/* =========================================================
   APPLY COSMETIC
========================================================= */

function applyCosmetic(avatar, item) {

    const element =
        document.createElement("div");


    element.className =
        "avatar-cosmetic";


    if (
        item.category === "Hair"
    ) {

        element.classList.add(
            "avatar-hair",
            "hair-" +
            item.design
        );

    }


    if (
        item.category === "Hat"
    ) {

        element.classList.add(
            "avatar-hat",
            "hat-" +
            item.design
        );

    }


    if (
        item.category === "Accessory"
    ) {

        if (
            item.design === "crown"
        ) {

            element.classList.add(
                "avatar-crown"
            );

        } else {

            element.classList.add(
                "avatar-glasses",
                "glasses-" +
                item.design
            );

        }

    }


    avatar.appendChild(element);

}


/* =========================================================
   GENERIC ITEM PREVIEW
========================================================= */

function createItemPreview(item) {

    if (
        item.category === "Title"
    ) {

        const title =
            document.createElement("div");

        title.className =
            "title-preview";

        title.textContent =
            item.name;

        return title;

    }


    if (
        item.category === "Banner"
    ) {

        const banner =
            document.createElement("div");

        banner.className =
            "banner-preview banner-" +
            item.design;

        return banner;

    }


    const preview =
        createAvatarElement();


    const avatar =
        getAvatar();


    /*
       Put the selected cosmetic onto the
       preview without permanently equipping it.
    */

    if (
        item.category === "Hair"
    ) {

        applyCosmetic(
            preview,
            item
        );

    }


    if (
        item.category === "Hat"
    ) {

        applyCosmetic(
            preview,
            item
        );

    }


    if (
        item.category === "Accessory"
    ) {

        applyCosmetic(
            preview,
            item
        );

    }


    if (
        item.category === "Outfit"
    ) {

        const body =
            preview.querySelector(
                ".avatar-body"
            );


        body.classList.add(
            "outfit-" +
            item.design
        );

    }


    if (
        item.category === "Eyes"
    ) {

        const head =
            preview.querySelector(
                ".avatar-head"
            );


        head.classList.add(
            "eyes-" +
            item.design
        );

    }


    if (
        item.category === "Face"
    ) {

        const mouth =
            preview.querySelector(
                ".avatar-mouth"
            );


        mouth.classList.add(
            "face-" +
            item.design
        );

    }


    return preview;

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
   SHOP CARD
========================================================= */

function createShopCard(item) {

    const card =
        document.createElement("article");


    card.className =
        "shop-card " +
        getRarityClass(
            item.rarity
        );


    card.dataset.category =
        item.category;


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
        createItemPreview(item)
    );


    const info =
        document.createElement("div");

    info.className =
        "item-info";


    const name =
        document.createElement("h3");

    name.className =
        "item-name";

    name.textContent =
        item.name;


    const category =
        document.createElement("p");

    category.className =
        "item-category";

    category.textContent =
        item.category;


    const bottom =
        document.createElement("div");

    bottom.className =
        "item-bottom";


    const price =
        document.createElement("span");

    price.className =
        "item-price";

    price.textContent =
        item.price +
        " Coins";


    const button =
        document.createElement("button");

    button.className =
        "buy-button";


    if (
        ownsCosmetic(item.id)
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
            () => buyCosmetic(
                item,
                button
            );

    }


    bottom.appendChild(price);

    bottom.appendChild(button);


    info.appendChild(name);

    info.appendChild(category);

    info.appendChild(bottom);


    card.appendChild(rarity);

    card.appendChild(preview);

    card.appendChild(info);


    return card;

}


/* =========================================================
   DISPLAY FEATURED SHOP
========================================================= */

function displayFeaturedShop() {

    const grid =
        document.getElementById(
            "shop-grid"
        );


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    const items =
        getCurrentShop();


    items.forEach(
        item => {

            grid.appendChild(
                createShopCard(item)
            );

        }
    );

}


/* =========================================================
   DISPLAY COLLECTION
========================================================= */

function displayCollection(
    category = "All"
) {

    const grid =
        document.getElementById(
            "collection-grid"
        );


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    const items =
        category === "All"
            ? COSMETICS
            : COSMETICS.filter(
                item =>
                    item.category === category
            );


    items.forEach(
        item => {

            grid.appendChild(
                createShopCard(item)
            );

        }
    );

}


/* =========================================================
   BUY COSMETIC
========================================================= */

function buyCosmetic(
    item,
    button
) {

    if (
        ownsCosmetic(item.id)
    ) {

        return;

    }


    const coins =
        getCoins();


    if (
        coins < item.price
    ) {

        alert(
            "You don't have enough Coins!"
        );

        return;

    }


    setCoins(
        coins -
        item.price
    );


    const owned =
        getOwnedCosmetics();


    owned.push(
        item.id
    );


    saveOwnedCosmetics(
        owned
    );


    button.textContent =
        "OWNED";

    button.disabled =
        true;

    button.classList.add(
        "owned"
    );


    updateCurrency();

    displayOwned();

}


/* =========================================================
   EQUIP COSMETIC
========================================================= */

function equipCosmetic(item) {

    if (
        !ownsCosmetic(item.id)
    ) {

        return;

    }


    const avatar =
        getAvatar();


    const categoryMap = {

        Hair: "hair",

        Eyes: "eyes",

        Face: "face",

        Outfit: "outfit",

        Hat: "hat",

        Accessory: "accessory",

        Banner: "banner",

        Title: "title"

    };


    const key =
        categoryMap[
            item.category
        ];


    if (!key) {
        return;
    }


    avatar[key] =
        item.id;


    saveAvatar(
        avatar
    );


    displayAvatar();

    displayOwned();

}


/* =========================================================
   UNEQUIP
========================================================= */

function unequipCategory(
    category
) {

    const avatar =
        getAvatar();


    const categoryMap = {

        Hair: "hair",

        Eyes: "eyes",

        Face: "face",

        Outfit: "outfit",

        Hat: "hat",

        Accessory: "accessory",

        Banner: "banner",

        Title: "title"

    };


    const key =
        categoryMap[category];


    if (!key) {
        return;
    }


    avatar[key] =
        null;


    saveAvatar(
        avatar
    );


    displayAvatar();

    displayOwned();

}


/* =========================================================
   DISPLAY AVATAR
========================================================= */

function displayAvatar() {

    const preview =
        document.getElementById(
            "avatar-preview"
        );


    if (!preview) {
        return;
    }


    preview.innerHTML = "";


    preview.appendChild(
        createAvatarElement()
    );


    displayEquipped();

}


/* =========================================================
   DISPLAY EQUIPPED
========================================================= */

function displayEquipped() {

    const container =
        document.getElementById(
            "equipped-list"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const avatar =
        getAvatar();


    const slots = [

        ["Hair", avatar.hair],

        ["Eyes", avatar.eyes],

        ["Face", avatar.face],

        ["Outfit", avatar.outfit],

        ["Hat", avatar.hat],

        ["Accessory", avatar.accessory],

        ["Banner", avatar.banner],

        ["Title", avatar.title]

    ];


    slots.forEach(
        ([category, id]) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "equipped-item";


            const categoryElement =
                document.createElement(
                    "span"
                );


            categoryElement.textContent =
                category;


            const name =
                document.createElement(
                    "span"
                );


            const item =
                id
                    ? COSMETICS.find(
                        cosmetic =>
                            cosmetic.id === id
                    )
                    : null;


            name.textContent =
                item
                    ? item.name
                    : "None";


            row.appendChild(
                categoryElement
            );


            row.appendChild(
                name
            );


            if (item) {

                row.title =
                    "Click to unequip";


                row.style.cursor =
                    "pointer";


                row.onclick =
                    () =>
                        unequipCategory(
                            category
                        );

            }


            container.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   DISPLAY OWNED
========================================================= */

function displayOwned() {

    const grid =
        document.getElementById(
            "owned-grid"
        );


    const count =
        document.getElementById(
            "owned-count"
        );


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    const owned =
        getOwnedCosmetics();


    if (count) {

        count.textContent =
            owned.length +
            " ITEMS";

    }


    if (
        owned.length === 0
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "empty-message";


        empty.textContent =
            "You don't own any cosmetics yet. Visit the Shop to start your collection!";


        grid.appendChild(
            empty
        );


        return;

    }


    owned.forEach(
        id => {

            const item =
                COSMETICS.find(
                    cosmetic =>
                        cosmetic.id === id
                );


            if (!item) {
                return;
            }


            const card =
                createShopCard(item);


            const button =
                card.querySelector(
                    ".buy-button"
                );


            const avatar =
                getAvatar();


            const categoryMap = {

                Hair: "hair",

                Eyes: "eyes",

                Face: "face",

                Outfit: "outfit",

                Hat: "hat",

                Accessory: "accessory",

                Banner: "banner",

                Title: "title"

            };


            const key =
                categoryMap[
                    item.category
                ];


            if (
                key &&
                avatar[key] === item.id
            ) {

                button.textContent =
                    "EQUIPPED";

                button.classList.add(
                    "owned"
                );

                button.disabled =
                    true;

            } else {

                button.textContent =
                    "EQUIP";

                button.disabled =
                    false;

                button.classList.remove(
                    "owned"
                );


                button.onclick =
                    () =>
                        equipCosmetic(
                            item
                        );

            }


            grid.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   CURRENCY
========================================================= */

function updateCurrency() {

    const element =
        document.getElementById(
            "coin-count"
        );


    if (element) {

        element.textContent =
            getCoins();

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


    element.textContent =
        days + "d " +
        String(hours).padStart(2, "0") + "h " +
        String(minutes).padStart(2, "0") + "m " +
        String(seconds).padStart(2, "0") + "s";

}


/* =========================================================
   VIEW SWITCHING
========================================================= */

function openShop() {

    document
        .getElementById("shop-view")
        ?.classList.remove(
            "hidden"
        );


    document
        .getElementById("avatar-view")
        ?.classList.add(
            "hidden"
        );


    document
        .getElementById("shop-tab")
        ?.classList.add(
            "active"
        );


    document
        .getElementById("avatar-tab")
        ?.classList.remove(
            "active"
        );

}


function openAvatar() {

    document
        .getElementById("shop-view")
        ?.classList.add(
            "hidden"
        );


    document
        .getElementById("avatar-view")
        ?.classList.remove(
            "hidden"
        );


    document
        .getElementById("shop-tab")
        ?.classList.remove(
            "active"
        );


    document
        .getElementById("avatar-tab")
        ?.classList.add(
            "active"
        );


    displayAvatar();

    displayOwned();

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function setupCategoryFilters() {

    const buttons =
        document.querySelectorAll(
            ".category-button"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    buttons.forEach(
                        other =>
                            other.classList.remove(
                                "active"
                            )
                    );


                    button.classList.add(
                        "active"
                    );


                    displayCollection(
                        button.dataset.category
                    );

                }
            );

        }
    );

}


/* =========================================================
   DEBUG
========================================================= */

function rerollShop() {

    localStorage.setItem(
        "shopRerollSeed",
        String(
            Date.now()
        )
    );


    location.reload();

}


function resetShopReroll() {

    localStorage.removeItem(
        "shopRerollSeed"
    );


    location.reload();

}


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

        <h2>StudySprint Debug</h2>

        <select id="debug-action">

            <option value="coins">
                Set Coins
            </option>

            <option value="reroll">
                Reroll Shop
            </option>

            <option value="reset-reroll">
                Reset Shop Rotation
            </option>

            <option value="give-all">
                Give All Cosmetics
            </option>

            <option value="reset-avatar">
                Reset Avatar
            </option>

            <option value="reset-account">
                Reset Shop Data
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

    document.body.appendChild(
        overlay
    );


    const action =
        box.querySelector(
            "#debug-action"
        );


    const value =
        box.querySelector(
            "#debug-value"
        );


    function updateInput() {

        value.style.display =
            action.value === "coins"
                ? "block"
                : "none";

    }


    action.addEventListener(
        "change",
        updateInput
    );


    updateInput();


    box.querySelector(
        "#debug-close"
    ).onclick =
        () =>
            overlay.remove();


    box.querySelector(
        "#debug-apply"
    ).onclick =
        () => {

            const selected =
                action.value;


            if (
                selected === "coins"
            ) {

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


                setCoins(
                    amount
                );

                overlay.remove();

                updateCurrency();

                return;

            }


            if (
                selected === "reroll"
            ) {

                rerollShop();

                return;

            }


            if (
                selected === "reset-reroll"
            ) {

                resetShopReroll();

                return;

            }


            if (
                selected === "give-all"
            ) {

                saveOwnedCosmetics(
                    COSMETICS.map(
                        item =>
                            item.id
                    )
                );


                alert(
                    "All cosmetics unlocked!"
                );


                overlay.remove();

                displayOwned();

                return;

            }


            if (
                selected === "reset-avatar"
            ) {

                saveAvatar({
                    ...DEFAULT_AVATAR
                });


                alert(
                    "Avatar reset."
                );


                overlay.remove();

                displayAvatar();

                displayOwned();

                return;

            }


            if (
                selected === "reset-account"
            ) {

                const confirmed =
                    confirm(
                        "Reset all StudySprint Shop data?"
                    );


                if (!confirmed) {
                    return;
                }


                localStorage.removeItem(
                    "coins"
                );

                localStorage.removeItem(
                    "ownedCosmetics"
                );

                localStorage.removeItem(
                    "avatar"
                );

                localStorage.removeItem(
                    "shopRerollSeed"
                );

                location.reload();

            }

        };

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const shopTab =
            document.getElementById(
                "shop-tab"
            );


        const avatarTab =
            document.getElementById(
                "avatar-tab"
            );


        const debug =
            document.getElementById(
                "debug-open"
            );


        if (shopTab) {

            shopTab.onclick =
                openShop;

        }


        if (avatarTab) {

            avatarTab.onclick =
                openAvatar;

        }


        if (debug) {

            debug.onclick =
                openDebugMenu;

        }


        displayFeaturedShop();

        displayCollection();

        displayAvatar();

        displayOwned();

        updateCurrency();

        updateCountdown();


        setupCategoryFilters();


        setInterval(
            updateCountdown,
            1000
        );

    }
);


/* =========================================================
   PUBLIC API
========================================================= */

window.getCoins =
    getCoins;

window.setCoins =
    setCoins;

window.getOwnedCosmetics =
    getOwnedCosmetics;

window.getAvatar =
    getAvatar;

window.saveAvatar =
    saveAvatar;

window.getCurrentShop =
    getCurrentShop;

window.equipCosmetic =
    equipCosmetic;

window.unequipCategory =
    unequipCategory;

window.rerollShop =
    rerollShop;

window.resetShopReroll =
    resetShopReroll;

window.COSMETICS =
    COSMETICS;
