/* =========================================================
   STUDYSPRINT SHOP
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const SHOP_REFRESH_TIME =
    14 * 24 * 60 * 60 * 1000;

const SHOP_SIZE = 6;


/* =========================================================
   20 SHOP CHARACTERS
========================================================= */

const CHARACTERS = [

    {
        id:"ocean",
        name:"Ocean",
        rarity:"Common",
        theme:"Ocean",
        price:250,
        hair:"hair-short"
    },

    {
        id:"forest",
        name:"Forest",
        rarity:"Common",
        theme:"Forest",
        price:250,
        hair:"hair-curly"
    },

    {
        id:"fire",
        name:"Blaze",
        rarity:"Rare",
        theme:"Fire",
        price:350,
        hair:"hair-spiky"
    },

    {
        id:"space",
        name:"Cosmo",
        rarity:"Rare",
        theme:"Space",
        price:350,
        hair:"hair-spiky"
    },

    {
        id:"candy",
        name:"Candy",
        rarity:"Rare",
        theme:"Candy",
        price:350,
        hair:"hair-curly"
    },

    {
        id:"sun",
        name:"Sunny",
        rarity:"Common",
        theme:"Sun",
        price:250,
        hair:"hair-short"
    },

    {
        id:"scientist",
        name:"Scientist",
        rarity:"Epic",
        theme:"Science",
        price:450,
        hair:"hair-short",
        accessory:"glasses"
    },

    {
        id:"gamer",
        name:"Gamer",
        rarity:"Epic",
        theme:"Gamer",
        price:450,
        hair:"hair-spiky",
        accessory:"headphones"
    },

    {
        id:"runner",
        name:"Runner",
        rarity:"Rare",
        theme:"Runner",
        price:350,
        hair:"hair-short",
        accessory:"cap"
    },

    {
        id:"artist",
        name:"Artist",
        rarity:"Rare",
        theme:"Artist",
        price:350,
        hair:"hair-curly"
    },

    {
        id:"detective",
        name:"Detective",
        rarity:"Epic",
        theme:"Detective",
        price:450,
        hair:"hair-short"
    },

    {
        id:"robot",
        name:"Robo",
        rarity:"Epic",
        theme:"Robot",
        price:450,
        hair:"hair-spiky"
    },

    {
        id:"wizard",
        name:"Wizard",
        rarity:"Epic",
        theme:"Wizard",
        price:500,
        hair:"hair-curly"
    },

    {
        id:"pirate",
        name:"Pirate",
        rarity:"Rare",
        theme:"Pirate",
        price:400,
        hair:"hair-short"
    },

    {
        id:"chef",
        name:"Chef",
        rarity:"Common",
        theme:"Chef",
        price:275,
        hair:"hair-short"
    },

    {
        id:"athlete",
        name:"Athlete",
        rarity:"Rare",
        theme:"Athlete",
        price:375,
        hair:"hair-spiky"
    },

    {
        id:"musician",
        name:"Musician",
        rarity:"Rare",
        theme:"Music",
        price:375,
        hair:"hair-curly"
    },

    {
        id:"explorer",
        name:"Explorer",
        rarity:"Epic",
        theme:"Explorer",
        price:475,
        hair:"hair-short"
    },

    {
        id:"ninja",
        name:"Ninja",
        rarity:"Epic",
        theme:"Ninja",
        price:500,
        hair:"hair-spiky"
    },

    {
        id:"royal",
        name:"Royal",
        rarity:"Legendary",
        theme:"Royal",
        price:750,
        hair:"hair-short",
        accessory:"crown"
    }

];


/* =========================================================
   NORMAL SHOP ITEMS
========================================================= */

const BANNERS = [

    {
        id:"sprint-grid",
        name:"Sprint Grid",
        rarity:"Common",
        type:"Banner",
        price:100
    },

    {
        id:"purple-grid",
        name:"Purple Grid",
        rarity:"Common",
        type:"Banner",
        price:125
    },

    {
        id:"neon-blue",
        name:"Neon Blue",
        rarity:"Common",
        type:"Banner",
        price:150
    },

    {
        id:"sunset",
        name:"Sunset",
        rarity:"Rare",
        type:"Banner",
        price:200
    }

];


const COMMON_EFFECTS = [

    {
        id:"sparkle",
        name:"Sparkle",
        rarity:"Common",
        type:"Effect",
        price:150
    },

    {
        id:"speed-trail",
        name:"Speed Trail",
        rarity:"Common",
        type:"Effect",
        price:200
    },

    {
        id:"lightning",
        name:"Lightning",
        rarity:"Rare",
        type:"Effect",
        price:300
    },

    {
        id:"rainbow",
        name:"Rainbow Aura",
        rarity:"Rare",
        type:"Effect",
        price:350
    }

];


/* =========================================================
   TICKET SHOP
========================================================= */

const TICKET_ITEMS = [

    {
        id:"ticket-sparkle",
        name:"Sparkle Effect",
        description:
            "Tiny sparkles follow your character.",
        type:"Effect",
        unlockId:"sparkle",
        price:10
    },

    {
        id:"ticket-speed",
        name:"Speed Trail",
        description:
            "Leaves a trail behind your character.",
        type:"Effect",
        unlockId:"speed-trail",
        price:20
    },

    {
        id:"ticket-lightning",
        name:"Lightning Effect",
        description:
            "Electric sparks surround your character.",
        type:"Effect",
        unlockId:"lightning",
        price:35
    },

    {
        id:"ticket-rainbow",
        name:"Rainbow Aura",
        description:
            "A colourful aura surrounds your character.",
        type:"Effect",
        unlockId:"rainbow",
        price:50
    },

    {
        id:"fire",
        name:"Fire Aura",
        description:
            "A fiery glow surrounds your character.",
        type:"Effect",
        unlockId:"fire",
        price:75
    },

    {
        id:"glitch",
        name:"Glitch Effect",
        description:
            "A strange digital effect surrounds your character.",
        type:"Effect",
        unlockId:"glitch",
        price:100
    },

    {
        id:"shadow",
        name:"Shadow Aura",
        description:
            "A dark shadow surrounds your character.",
        type:"Effect",
        unlockId:"shadow",
        price:150
    },

    {
        id:"crystal",
        name:"Crystal Glow",
        description:
            "A bright crystalline glow surrounds your character.",
        type:"Effect",
        unlockId:"crystal",
        price:250
    },

    {
        id:"cosmic",
        name:"Cosmic Aura",
        description:
            "Stars and cosmic particles surround your character.",
        type:"Effect",
        unlockId:"cosmic",
        price:500
    },

    {
        id:"crown",
        name:"Crown + Glow",
        description:
            "The extremely rare glowing crown.",
        type:"Effect",
        unlockId:"crown",
        price:1000
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
        Math.max(0,amount)
    );

}


function setTickets(amount) {

    localStorage.setItem(
        "shopTickets",
        Math.max(0,amount)
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

    return getOwnedItems()
        .includes(id);

}


/* =========================================================
   UNLOCK
========================================================= */

function unlockItem(
    id,
    type
) {

    const keys = {

        Character:"unlocked_characters",

        Banner:"unlocked_banners",

        Effect:"unlocked_effects"

    };


    const key =
        keys[type];


    if(!key)
        return;


    let unlocked = [];


    try {

        unlocked =
            JSON.parse(
                localStorage.getItem(key)
            ) || [];

    }

    catch {

        unlocked = [];

    }


    if(
        !unlocked.includes(id)
    ) {

        unlocked.push(id);

    }


    localStorage.setItem(
        key,
        JSON.stringify(unlocked)
    );

}


/* =========================================================
   ALL NORMAL SHOP ITEMS
========================================================= */

function getShopPool() {

    return [

        ...CHARACTERS.map(
            character => ({

                ...character,

                type:"Character"

            })
        ),

        ...BANNERS,

        ...COMMON_EFFECTS

    ];

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    return [...array]
        .sort(
            () =>
                Math.random() - .5
        );

}


/* =========================================================
   GENERATE SHOP
========================================================= */

function generateShop() {

    const pool =
        getShopPool();


    const selected =
        shuffle(pool)
            .slice(
                0,
                SHOP_SIZE
            )
            .map(
                item => item.id
            );


    localStorage.setItem(
        "fortnightlyShopItems",
        JSON.stringify(selected)
    );


    localStorage.setItem(
        "fortnightlyShopStart",
        Date.now()
    );


    console.log(
        "New StudySprint shop:",
        selected
    );


    return selected;

}


/* =========================================================
   CURRENT SHOP
========================================================= */

function getCurrentShop() {

    let items = null;


    try {

        items =
            JSON.parse(
                localStorage.getItem(
                    "fortnightlyShopItems"
                )
            );

    }

    catch {

        items = null;

    }


    const start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || 0;


    if(
        !Array.isArray(items) ||
        items.length !== SHOP_SIZE ||
        !start
    ) {

        return generateShop();

    }


    if(
        Date.now() -
        start >=
        SHOP_REFRESH_TIME
    ) {

        return generateShop();

    }


    return items;

}


/* =========================================================
   FIND ITEM
========================================================= */

function findShopItem(id) {

    return getShopPool()
        .find(
            item =>
                item.id === id
        );

}


/* =========================================================
   CHARACTER PREVIEW
========================================================= */

function createCharacterPreview(
    character
) {

    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "shop-character";


    wrapper.classList.add(
        "character-" +
        character.id
    );


    /* shadow */

    const shadow =
        document.createElement(
            "div"
        );

    shadow.className =
        "character-shadow";


    /* ears */

    const earLeft =
        document.createElement(
            "div"
        );

    earLeft.className =
        "character-ear left";


    const earRight =
        document.createElement(
            "div"
        );

    earRight.className =
        "character-ear right";


    /* head */

    const head =
        document.createElement(
            "div"
        );

    head.className =
        "character-head";


    /* eyes */

    const eyeLeft =
        document.createElement(
            "div"
        );

    eyeLeft.className =
        "character-eye left";


    const eyeRight =
        document.createElement(
            "div"
        );

    eyeRight.className =
        "character-eye right";


    /* mouth */

    const mouth =
        document.createElement(
            "div"
        );

    mouth.className =
        "character-mouth";


    /* hair */

    const hair =
        document.createElement(
            "div"
        );

    hair.className =
        "character-hair";

    hair.classList.add(
        character.hair ||
        "hair-short"
    );


    /* body */

    const body =
        document.createElement(
            "div"
        );

    body.className =
        "character-body";


    /* arms */

    const armLeft =
        document.createElement(
            "div"
        );

    armLeft.className =
        "character-arm left";


    const armRight =
        document.createElement(
            "div"
        );

    armRight.className =
        "character-arm right";


    /* legs */

    const legLeft =
        document.createElement(
            "div"
        );

    legLeft.className =
        "character-leg left";


    const legRight =
        document.createElement(
            "div"
        );

    legRight.className =
        "character-leg right";


    /* shoes */

    const shoeLeft =
        document.createElement(
            "div"
        );

    shoeLeft.className =
        "character-shoe left";


    const shoeRight =
        document.createElement(
            "div"
        );

    shoeRight.className =
        "character-shoe right";


    wrapper.appendChild(
        shadow
    );

    wrapper.appendChild(
        earLeft
    );

    wrapper.appendChild(
        earRight
    );

    wrapper.appendChild(
        body
    );

    wrapper.appendChild(
        armLeft
    );

    wrapper.appendChild(
        armRight
    );

    wrapper.appendChild(
        legLeft
    );

    wrapper.appendChild(
        legRight
    );

    wrapper.appendChild(
        shoeLeft
    );

    wrapper.appendChild(
        shoeRight
    );

    wrapper.appendChild(
        head
    );

    wrapper.appendChild(
        hair
    );

    wrapper.appendChild(
        eyeLeft
    );

    wrapper.appendChild(
        eyeRight
    );

    wrapper.appendChild(
        mouth
    );


    /* accessory */

    if(character.accessory) {

        const accessory =
            document.createElement(
                "div"
            );

        accessory.className =
            "character-accessory";

        accessory.classList.add(
            "accessory-" +
            character.accessory
        );

        wrapper.appendChild(
            accessory
        );

    }


    return wrapper;

}


/* =========================================================
   BANNER PREVIEW
========================================================= */

function createBannerPreview(
    item
) {

    const banner =
        document.createElement(
            "div"
        );


    banner.className =
        "banner-preview";


    if(
        item.id ===
        "sprint-grid"
    ) {

        banner.style.background =
            "linear-gradient(135deg,#312e81,#6366f1)";

        banner.style.backgroundImage =
            `
            linear-gradient(
                rgba(255,255,255,.15)
                1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                rgba(255,255,255,.15)
                1px,
                transparent 1px
            )
            `;

        banner.style.backgroundSize =
            "20px 20px";

    }

    else if(
        item.id ===
        "purple-grid"
    ) {

        banner.style.background =
            "linear-gradient(135deg,#7c3aed,#c084fc)";

    }

    else if(
        item.id ===
        "neon-blue"
    ) {

        banner.style.background =
            "linear-gradient(135deg,#0891b2,#38bdf8)";

    }

    else {

        banner.style.background =
            "linear-gradient(135deg,#f97316,#ec4899)";

    }


    return banner;

}


/* =========================================================
   EFFECT PREVIEW
========================================================= */

function createEffectPreview(
    item
) {

    const effect =
        document.createElement(
            "div"
        );


    effect.className =
        "preview-effect";


    effect.classList.add(
        "effect-" +
        item.id
    );


    return effect;

}


/* =========================================================
   PREVIEW
========================================================= */

function createPreview(
    item
) {

    if(
        item.type ===
        "Character"
    ) {

        return createCharacterPreview(
            item
        );

    }


    if(
        item.type ===
        "Banner"
    ) {

        return createBannerPreview(
            item
        );

    }


    return createEffectPreview(
        item
    );

}


/* =========================================================
   RARITY CLASS
========================================================= */

function rarityClass(
    rarity
) {

    return rarity
        .toLowerCase()
        .replace(
            /\s+/g,
            "-"
        );

}


/* =========================================================
   DISPLAY MAIN SHOP
========================================================= */

function displayMainShop() {

    const container =
        document.getElementById(
            "fortnightly-items"
        );


    if(!container)
        return;


    container.innerHTML =
        "";


    const selected =
        getCurrentShop();


    selected.forEach(
        id => {

            const item =
                findShopItem(id);


            if(!item)
                return;


            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "shop-card";


            const rarity =
                document.createElement(
                    "div"
                );

            rarity.className =
                "rarity " +
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
                "item-preview";


            preview.appendChild(
                createPreview(
                    item
                )
            );


            const content =
                document.createElement(
                    "div"
                );

            content.className =
                "card-content";


            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
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
                item.price +
                " Coins";


            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "buy-button";

            button.type =
                "button";


            if(
                ownsItem(
                    item.id
                )
            ) {

                button.textContent =
                    "OWNED";

                button.disabled =
                    true;

            }

            else {

                button.textContent =
                    "BUY";

                button.onclick =
                    () =>
                        buyMainItem(
                            item,
                            button
                        );

            }


            content.appendChild(
                title
            );

            content.appendChild(
                type
            );

            content.appendChild(
                price
            );

            content.appendChild(
                button
            );


            card.appendChild(
                rarity
            );

            card.appendChild(
                preview
            );

            card.appendChild(
                content
            );


            container.appendChild(
                card
            );

        }
    );


    updateCurrency();

}


/* =========================================================
   BUY MAIN ITEM
========================================================= */

function buyMainItem(
    item,
    button
) {

    if(
        ownsItem(
            item.id
        )
    )
        return;


    const coins =
        getCoins();


    if(
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


    owned.push(
        item.id
    );


    saveOwnedItems(
        [...new Set(owned)]
    );


    button.disabled =
        true;

    button.textContent =
        "OWNED";


    updateCurrency();

}


/* =========================================================
   DISPLAY TICKET SHOP
========================================================= */

function displayTicketShop() {

    const container =
        document.getElementById(
            "ticket-items"
        );


    if(!container)
        return;


    container.innerHTML =
        "";


    TICKET_ITEMS.forEach(
        item => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "shop-card";


            const preview =
                document.createElement(
                    "div"
                );

            preview.className =
                "item-preview";


            const effect =
                createEffectPreview({

                    id:item.unlockId

                });


            preview.appendChild(
                effect
            );


            const content =
                document.createElement(
                    "div"
                );

            content.className =
                "card-content";


            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
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
                "shop-price";

            price.textContent =
                item.price +
                " Shop Tickets";


            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "buy-button";

            button.type =
                "button";


            if(
                ownsItem(
                    item.unlockId
                )
            ) {

                button.textContent =
                    "OWNED";

                button.disabled =
                    true;

            }

            else {

                button.textContent =
                    "BUY";

                button.onclick =
                    () =>
                        buyTicketItem(
                            item,
                            button
                        );

            }


            content.appendChild(
                title
            );

            content.appendChild(
                description
            );

            content.appendChild(
                price
            );

            content.appendChild(
                button
            );


            card.appendChild(
                preview
            );

            card.appendChild(
                content
            );


            container.appendChild(
                card
            );

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

    const id =
        item.unlockId;


    if(
        ownsItem(id)
    )
        return;


    const tickets =
        getTickets();


    if(
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
        id,
        item.type
    );


    const owned =
        getOwnedItems();


    owned.push(id);


    saveOwnedItems(
        [...new Set(owned)]
    );


    button.disabled =
        true;

    button.textContent =
        "OWNED";


    updateCurrency();

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


    if(coins) {

        coins.textContent =
            getCoins();

    }


    if(tickets) {

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


    if(!element)
        return;


    let start =
        Number(
            localStorage.getItem(
                "fortnightlyShopStart"
            )
        ) || 0;


    if(!start) {

        getCurrentShop();

        start =
            Number(
                localStorage.getItem(
                    "fortnightlyShopStart"
                )
            );

    }


    let remaining =
        start +
        SHOP_REFRESH_TIME -
        Date.now();


    if(
        remaining <= 0
    ) {

        generateShop();

        displayMainShop();


        start =
            Number(
                localStorage.getItem(
                    "fortnightlyShopStart"
                )
            );


        remaining =
            start +
            SHOP_REFRESH_TIME -
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


/* =========================================================
   SHOP NAVIGATION
========================================================= */

function openTicketShop() {

    document.getElementById(
        "fortnightly-shop"
    ).style.display =
        "none";


    document.getElementById(
        "ticket-shop"
    ).style.display =
        "block";


    document.getElementById(
        "main-shop-button"
    ).classList.remove(
        "active"
    );


    document.getElementById(
        "ticket-shop-button"
    ).classList.add(
        "active"
    );


    displayTicketShop();

}


function openMainShop() {

    document.getElementById(
        "ticket-shop"
    ).style.display =
        "none";


    document.getElementById(
        "fortnightly-shop"
    ).style.display =
        "block";


    document.getElementById(
        "ticket-shop-button"
    ).classList.remove(
        "active"
    );


    document.getElementById(
        "main-shop-button"
    ).classList.add(
        "active"
    );


    displayMainShop();

}


/* =========================================================
   DEBUG POPUP
========================================================= */

function openDebug() {

    if(
        document.querySelector(
            ".debug-overlay"
        )
    )
        return;


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

        <h2>
            🛠️ StudySprint Debug
        </h2>

        <p>
            What do you want to change?
        </p>

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

            <option value="refresh">
                🔄 New Shop
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
            class="buy-button"
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


    overlay.appendChild(
        box
    );

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


    function updateDebugInput() {

        value.style.display =
            type.value === "reset" ||
            type.value === "refresh"

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
        () => {

            overlay.remove();

        };


    box.querySelector(
        "#debug-apply"
    ).onclick =
        () => {

            const selected =
                type.value;


            if(
                selected ===
                "reset"
            ) {

                if(
                    !confirm(
                        "Reset your entire StudySprint account?"
                    )
                )
                    return;


                localStorage.clear();

                location.reload();

                return;

            }


            if(
                selected ===
                "refresh"
            ) {

                generateShop();

                overlay.remove();

                displayMainShop();

                alert(
                    "🔄 New 6-item shop generated!"
                );

                return;

            }


            const amount =
                Number(
                    value.value
                );


            if(
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

                xp:"xp",

                coins:"coins",

                tickets:"shopTickets",

                streak:"streak"

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

        document.getElementById(
            "main-shop-button"
        ).addEventListener(
            "click",
            openMainShop
        );


        document.getElementById(
            "ticket-shop-button"
        ).addEventListener(
            "click",
            openTicketShop
        );


        document.getElementById(
            "debug-button"
        ).addEventListener(
            "click",
            openDebug
        );


        getCurrentShop();

        displayMainShop();

        displayTicketShop();

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

window.generateShop =
    generateShop;
