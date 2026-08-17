/* =========================================================
   STUDYSPRINT SHOP
   Goober Character Edition
========================================================= */


/* =========================================================
   SHOP REFRESH
   Every second Sunday at 12:00 AM AEST
========================================================= */

const SHOP_REFRESH_TIME =
    14 * 24 * 60 * 60 * 1000;


/*
    Australia Eastern Standard Time = UTC+10.

    The shop uses a fixed two-week cycle based on
    Sunday 00:00 AEST.

    This means everyone gets the same shop rotation
    at the same time.
*/

function getShopCycleStart() {

    const now =
        new Date();

    const utc =
        now.getTime() +
        now.getTimezoneOffset() * 60000;

    const aest =
        new Date(
            utc + 10 * 60 * 60000
        );

    const day =
        aest.getDay();

    const daysSinceSunday =
        day;

    const sunday =
        new Date(aest);

    sunday.setDate(
        aest.getDate() -
        daysSinceSunday
    );

    sunday.setHours(
        0,
        0,
        0,
        0
    );

    /*
        Find the nearest valid fortnightly
        Sunday based on a fixed epoch.

        2026-01-04 was a Sunday.
    */

    const epoch =
        new Date(
            "2026-01-04T00:00:00"
        );

    const difference =
        sunday.getTime() -
        epoch.getTime();

    const cycle =
        Math.floor(
            difference /
            SHOP_REFRESH_TIME
        );

    return new Date(
        epoch.getTime() +
        cycle *
        SHOP_REFRESH_TIME
    );

}


/* =========================================================
   CHARACTERS
   20 rotate through the fortnightly shop.
========================================================= */

const CHARACTERS = [

    {
        id:"blue-goober",
        name:"Blue Goober",
        rarity:"Common",
        theme:"blue",
        price:150
    },

    {
        id:"green-goober",
        name:"Green Goober",
        rarity:"Common",
        theme:"green",
        price:150
    },

    {
        id:"purple-goober",
        name:"Purple Goober",
        rarity:"Common",
        theme:"purple",
        price:175
    },

    {
        id:"orange-goober",
        name:"Orange Goober",
        rarity:"Common",
        theme:"orange",
        price:175
    },

    {
        id:"pink-goober",
        name:"Pink Goober",
        rarity:"Rare",
        theme:"pink",
        price:200
    },

    {
        id:"cyan-goober",
        name:"Cyan Goober",
        rarity:"Rare",
        theme:"cyan",
        price:200
    },

    {
        id:"red-goober",
        name:"Red Goober",
        rarity:"Rare",
        theme:"red",
        price:225
    },

    {
        id:"yellow-goober",
        name:"Yellow Goober",
        rarity:"Rare",
        theme:"yellow",
        price:225
    },

    {
        id:"sleepy-goober",
        name:"Sleepy Goober",
        rarity:"Rare",
        theme:"purple",
        accessory:"sleepy",
        price:250
    },

    {
        id:"happy-goober",
        name:"Happy Goober",
        rarity:"Rare",
        theme:"orange",
        accessory:"happy",
        price:250
    },

    {
        id:"leafy-goober",
        name:"Leafy Goober",
        rarity:"Epic",
        theme:"green",
        accessory:"leaf",
        price:300
    },

    {
        id:"star-goober",
        name:"Star Goober",
        rarity:"Epic",
        theme:"blue",
        accessory:"star",
        price:325
    },

    {
        id:"bubble-goober",
        name:"Bubble Goober",
        rarity:"Epic",
        theme:"cyan",
        accessory:"bubble",
        price:350
    },

    {
        id:"ghost-goober",
        name:"Ghost Goober",
        rarity:"Epic",
        theme:"purple",
        accessory:"ghost",
        price:375
    },

    {
        id:"lava-goober",
        name:"Lava Goober",
        rarity:"Epic",
        theme:"red",
        accessory:"lava",
        price:400
    },

    {
        id:"space-goober",
        name:"Space Goober",
        rarity:"Legendary",
        theme:"purple",
        accessory:"space",
        price:450
    },

    {
        id:"golden-goober",
        name:"Golden Goober",
        rarity:"Legendary",
        theme:"yellow",
        accessory:"gold",
        price:500
    },

    {
        id:"crowned-goober",
        name:"Crowned Goober",
        rarity:"Legendary",
        theme:"blue",
        accessory:"crown",
        price:550
    },

    {
        id:"rainbow-goober",
        name:"Rainbow Goober",
        rarity:"Legendary",
        theme:"cyan",
        accessory:"rainbow",
        price:600
    },

    {
        id:"mega-goober",
        name:"Mega Goober",
        rarity:"Legendary",
        theme:"orange",
        accessory:"mega",
        price:750
    }

];


/* =========================================================
   STUDYPASS CHARACTERS
========================================================= */

const STUDYPASS_CHARACTERS = [

    {
        id:"study-goober",
        name:"Study Goober",
        rarity:"Epic",
        theme:"blue",
        accessory:"book"
    },

    {
        id:"sprint-goober",
        name:"Sprint Goober",
        rarity:"Legendary",
        theme:"red",
        accessory:"fire"
    }

];


/* =========================================================
   BANNERS
========================================================= */

const BANNERS = [

    {
        id:"sprint-grid",
        name:"Sprint Grid",
        rarity:"Common",
        price:100,
        style:"grid"
    },

    {
        id:"purple-grid",
        name:"Purple Grid",
        rarity:"Common",
        price:125,
        style:"purple"
    },

    {
        id:"neon-blue",
        name:"Neon Blue",
        rarity:"Common",
        price:150,
        style:"neon"
    },

    {
        id:"sunset",
        name:"Sunset",
        rarity:"Rare",
        price:200,
        style:"sunset"
    },

    {
        id:"cosmic-banner",
        name:"Cosmic",
        rarity:"Epic",
        price:300,
        style:"cosmic"
    },

    {
        id:"gold-grid",
        name:"Golden Grid",
        rarity:"Legendary",
        price:450,
        style:"gold"
    }

];


/* =========================================================
   COMMON EFFECTS
   Crown and all existing ticket effects stay
   exclusively in the Ticket Shop.
========================================================= */

const COMMON_EFFECTS = [

    {
        id:"bubble",
        name:"Bubble Effect",
        rarity:"Common",
        price:125,
        description:
            "Tiny bubbles float around your goober."
    },

    {
        id:"spark",
        name:"Spark Effect",
        rarity:"Common",
        price:150,
        description:
            "Small sparks pop around your goober."
    },

    {
        id:"confetti",
        name:"Confetti Effect",
        rarity:"Rare",
        price:225,
        description:
            "Little pieces of confetti fly around."
    },

    {
        id:"leaf",
        name:"Leaf Effect",
        rarity:"Rare",
        price:250,
        description:
            "Leaves gently float around your goober."
    },

    {
        id:"cloud",
        name:"Cloud Effect",
        rarity:"Epic",
        price:300,
        description:
            "Soft clouds drift around your goober."
    },

    {
        id:"stars",
        name:"Star Effect",
        rarity:"Epic",
        price:350,
        description:
            "Small stars orbit your goober."
    }

];


/* =========================================================
   TICKET SHOP
   These NEVER rotate.
========================================================= */

const TICKET_ITEMS = [

    {
        id:"sparkle",
        name:"Sparkle Effect",
        description:
            "Tiny sparkles follow your goober.",
        type:"Effect",
        price:10
    },

    {
        id:"speed-trail",
        name:"Speed Trail",
        description:
            "Leaves a trail behind your goober.",
        type:"Effect",
        price:20
    },

    {
        id:"lightning",
        name:"Lightning Effect",
        description:
            "Electric sparks surround your goober.",
        type:"Effect",
        price:35
    },

    {
        id:"rainbow",
        name:"Rainbow Aura",
        description:
            "A colourful aura surrounds your goober.",
        type:"Effect",
        price:50
    },

    {
        id:"fire",
        name:"Fire Aura",
        description:
            "A fiery glow surrounds your goober.",
        type:"Effect",
        price:75
    },

    {
        id:"glitch",
        name:"Glitch Effect",
        description:
            "A strange digital effect surrounds your goober.",
        type:"Effect",
        price:100
    },

    {
        id:"shadow",
        name:"Shadow Aura",
        description:
            "A dark shadow surrounds your goober.",
        type:"Effect",
        price:150
    },

    {
        id:"crystal",
        name:"Crystal Glow",
        description:
            "A bright crystalline glow surrounds your goober.",
        type:"Effect",
        price:250
    },

    {
        id:"cosmic",
        name:"Cosmic Aura",
        description:
            "Stars and cosmic particles surround your goober.",
        type:"Effect",
        price:500
    },

    {
        id:"crown",
        name:"Crown + Glow",
        description:
            "The extremely rare glowing crown.",
        type:"Hat",
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
        amount
    );

}


function setTickets(amount) {

    localStorage.setItem(
        "shopTickets",
        amount
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
   UNLOCK ITEMS
========================================================= */

function unlockItem(
    id,
    type
) {

    let key = null;


    if(type === "Character") {

        key =
            "unlocked_characters";

    }

    else if(type === "Banner") {

        key =
            "unlocked_banners";

    }

    else if(type === "Effect") {

        key =
            "unlocked_effects";

    }

    else if(type === "Player Title") {

        key =
            "unlockedTitles";

    }

    else {

        console.warn(
            "Unknown shop item type:",
            type
        );

        return;

    }


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
   CREATE GOOBER
========================================================= */

function createGoober(character) {

    const goober =
        document.createElement(
            "div"
        );

    goober.className =
        "goober goober-" +
        character.theme;


    /*
        Body
    */

    const body =
        document.createElement(
            "div"
        );

    body.className =
        "goober-body";


    /*
        Arms
    */

    const leftArm =
        document.createElement(
            "div"
        );

    leftArm.className =
        "goober-arm left";


    const rightArm =
        document.createElement(
            "div"
        );

    rightArm.className =
        "goober-arm right";


    /*
        Feet
    */

    const leftFoot =
        document.createElement(
            "div"
        );

    leftFoot.className =
        "goober-foot left";


    const rightFoot =
        document.createElement(
            "div"
        );

    rightFoot.className =
        "goober-foot right";


    /*
        Eyes
    */

    const leftEye =
        document.createElement(
            "div"
        );

    leftEye.className =
        "goober-eye left";


    const rightEye =
        document.createElement(
            "div"
        );

    rightEye.className =
        "goober-eye right";


    /*
        Mouth
    */

    const mouth =
        document.createElement(
            "div"
        );

    mouth.className =
        "goober-mouth";


    goober.appendChild(
        leftArm
    );

    goober.appendChild(
        rightArm
    );

    goober.appendChild(
        leftFoot
    );

    goober.appendChild(
        rightFoot
    );

    goober.appendChild(
        body
    );

    goober.appendChild(
        leftEye
    );

    goober.appendChild(
        rightEye
    );

    goober.appendChild(
        mouth
    );


    /*
        Accessories
    */

    addGooberAccessory(
        goober,
        character.accessory
    );


    return goober;

}


/* =========================================================
   GOOBER ACCESSORIES
========================================================= */

function addGooberAccessory(
    goober,
    accessory
) {

    if(!accessory)
        return;


    const element =
        document.createElement(
            "div"
        );


    element.className =
        "goober-accessory";


    if(accessory === "crown") {

        element.classList.add(
            "goober-crown"
        );

    }

    else if(accessory === "star") {

        element.classList.add(
            "goober-star"
        );

        element.textContent =
            "★";

    }

    else if(accessory === "leaf") {

        element.classList.add(
            "goober-leaf"
        );

    }

    else if(accessory === "sleepy") {

        element.textContent =
            "Z";

        element.style.cssText += `
            top:22px;
            right:18px;
            color:#6366f1;
            font-weight:900;
            font-size:24px;
        `;

    }

    else if(accessory === "happy") {

        element.textContent =
            "✦";

        element.style.cssText += `
            top:18px;
            left:48px;
            color:#fde68a;
            font-size:28px;
        `;

    }

    else if(accessory === "bubble") {

        element.textContent =
            "○ ○";

        element.style.cssText += `
            top:25px;
            left:25px;
            color:#67e8f9;
            font-size:20px;
        `;

    }

    else if(accessory === "ghost") {

        element.textContent =
            "✦";

        element.style.cssText += `
            top:20px;
            left:48px;
            color:white;
            text-shadow:0 0 10px #a78bfa;
            font-size:26px;
        `;

    }

    else if(accessory === "lava") {

        element.textContent =
            "🔥";

        element.style.cssText += `
            top:10px;
            left:43px;
            font-size:25px;
        `;

    }

    else if(accessory === "space") {

        element.textContent =
            "✦";

        element.style.cssText += `
            top:10px;
            left:45px;
            color:white;
            text-shadow:
                0 0 8px #60a5fa,
                0 0 15px #c084fc;
            font-size:30px;
        `;

    }

    else if(accessory === "gold") {

        element.textContent =
            "◆";

        element.style.cssText += `
            top:20px;
            left:47px;
            color:#fff7ae;
            text-shadow:0 0 10px #f59e0b;
            font-size:30px;
        `;

    }

    else if(accessory === "rainbow") {

        element.textContent =
            "🌈";

        element.style.cssText += `
            top:10px;
            left:37px;
            font-size:30px;
        `;

    }

    else if(accessory === "mega") {

        element.textContent =
            "★";

        element.style.cssText += `
            top:8px;
            left:43px;
            color:#fde68a;
            text-shadow:
                0 0 8px #f59e0b,
                0 0 15px #facc15;
            font-size:34px;
        `;

    }

    else if(accessory === "book") {

        element.textContent =
            "📖";

        element.style.cssText += `
            bottom:15px;
            left:43px;
            font-size:25px;
        `;

    }

    else if(accessory === "fire") {

        element.textContent =
            "🔥";

        element.style.cssText += `
            bottom:8px;
            left:43px;
            font-size:28px;
        `;

    }


    goober.appendChild(
        element
    );

}


/* =========================================================
   BANNER PREVIEW
========================================================= */

function createBannerPreview(
    banner
) {

    const preview =
        document.createElement(
            "div"
        );

    preview.style.width =
        "170px";

    preview.style.height =
        "110px";

    preview.style.borderRadius =
        "16px";

    preview.style.position =
        "relative";

    preview.style.overflow =
        "hidden";


    if(
        banner.style === "grid"
    ) {

        preview.style.background =
            "linear-gradient(135deg,#312e81,#6366f1)";

        preview.style.backgroundImage =
            `
            linear-gradient(
                rgba(255,255,255,.15) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                rgba(255,255,255,.15) 1px,
                transparent 1px
            )
            `;

        preview.style.backgroundSize =
            "15px 15px";

    }

    else if(
        banner.style === "purple"
    ) {

        preview.style.background =
            "linear-gradient(135deg,#6d28d9,#c084fc)";

    }

    else if(
        banner.style === "neon"
    ) {

        preview.style.background =
            "linear-gradient(135deg,#0891b2,#22d3ee)";

    }

    else if(
        banner.style === "sunset"
    ) {

        preview.style.background =
            "linear-gradient(135deg,#f97316,#ec4899)";

    }

    else if(
        banner.style === "cosmic"
    ) {

        preview.style.background =
            "radial-gradient(circle,#4c1d95,#111827)";

        preview.textContent =
            "✦ · ★ · ✧";

        preview.style.color =
            "white";

        preview.style.fontSize =
            "30px";

        preview.style.textAlign =
            "center";

        preview.style.lineHeight =
            "110px";

    }

    else if(
        banner.style === "gold"
    ) {

        preview.style.background =
            "linear-gradient(135deg,#facc15,#f59e0b)";

        preview.style.backgroundImage =
            `
            linear-gradient(
                rgba(255,255,255,.18) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                rgba(255,255,255,.18) 1px,
                transparent 1px
            )
            `;

        preview.style.backgroundSize =
            "15px 15px";

    }


    return preview;

}


/* =========================================================
   EFFECT PREVIEW
========================================================= */

function createEffectPreview(
    id
) {

    const preview =
        document.createElement(
            "div"
        );

    preview.className =
        "preview-effect " +
        id;


    return preview;

}


/* =========================================================
   CREATE ITEM PREVIEW
========================================================= */

function createPreview(
    item
) {

    const preview =
        document.createElement(
            "div"
        );

    preview.className =
        "item-preview";


    if(
        item.type === "Character"
    ) {

        preview.appendChild(
            createGoober(
                item
            )
        );

    }

    else if(
        item.type === "Banner"
    ) {

        preview.appendChild(
            createBannerPreview(
                item
            )
        );

    }

    else if(
        item.type === "Effect"
    ) {

        preview.appendChild(
            createEffectPreview(
                item.id
            )
        );

        preview.appendChild(
            createGoober({
                theme:"blue"
            })
        );

    }


    return preview;

}


/* =========================================================
   GET ALL ROTATING ITEMS
========================================================= */

function getAllRotatingItems() {

    return [

        ...CHARACTERS.map(
            character => ({
                ...character,
                type:"Character"
            })
        ),

        ...BANNERS.map(
            banner => ({
                ...banner,
                type:"Banner"
            })
        ),

        ...COMMON_EFFECTS.map(
            effect => ({
                ...effect,
                type:"Effect"
            })
        )

    ];

}


/* =========================================================
   DETERMINISTIC SHOP ROTATION
   Exactly 6 items per fortnight.
========================================================= */

function getCurrentShop() {

    const allItems =
        getAllRotatingItems();


    const cycleStart =
        getShopCycleStart();


    const cycleNumber =
        Math.floor(
            (
                cycleStart.getTime() -
                new Date(
                    "2026-01-04T00:00:00"
                ).getTime()
            ) /
            SHOP_REFRESH_TIME
        );


    /*
        Deterministic pseudo-random shuffle.

        Everyone gets exactly the same
        six items for this cycle.
    */

    const shuffled =
        [...allItems];


    let seed =
        cycleNumber * 9301 +
        49297;


    function random() {

        seed =
            (
                seed * 233280 +
                12345
            ) %
            2147483647;

        return (
            seed /
            2147483647
        );

    }


    for(
        let i =
            shuffled.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                random() *
                (i + 1)
            );


        [
            shuffled[i],
            shuffled[j]
        ] =
        [
            shuffled[j],
            shuffled[i]
        ];

    }


    return shuffled
        .slice(
            0,
            6
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


    const items =
        getCurrentShop();


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
                "rarity rarity-" +
                item.rarity
                    .toLowerCase()
                    .replace(
                        " ",
                        "-"
                    );

            rarity.textContent =
                item.rarity;


            const preview =
                createPreview(
                    item
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

            button.type =
                "button";

            button.className =
                "buy-button";


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


    if(
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
                    "div"
                );

            card.className =
                "ticket-card";


            if(
                item.id ===
                "crown"
            ) {

                card.classList.add(
                    "crown-card"
                );

            }


            const preview =
                document.createElement(
                    "div"
                );

            preview.className =
                "ticket-item-preview";


            preview.appendChild(
                createEffectPreview(
                    item.id
                )
            );


            preview.appendChild(
                createGoober({
                    theme:"blue"
                })
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

            button.type =
                "button";

            button.className =
                "buy-button";


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
                        buyTicketItem(
                            item,
                            button
                        );

            }


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


    updateCurrency();

}


/* =========================================================
   BUY TICKET ITEM
========================================================= */

function buyTicketItem(
    item,
    button
) {

    if(
        ownsItem(
            item.id
        )
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
        item.id,
        item.type
    );


    const owned =
        getOwnedItems();


    if(
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


    const now =
        Date.now();


    let next =
        getShopCycleStart()
            .getTime() +
        SHOP_REFRESH_TIME;


    /*
        If somehow the calculated cycle is
        already in the past, advance it.
    */

    while(
        next <= now
    ) {

        next +=
            SHOP_REFRESH_TIME;

    }


    const remaining =
        next -
        now;


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
   NAVIGATION
========================================================= */

function openTicketShop() {

    const main =
        document.getElementById(
            "fortnightly-shop"
        );

    const ticket =
        document.getElementById(
            "ticket-shop"
        );


    if(
        !main ||
        !ticket
    )
        return;


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


    if(
        !main ||
        !ticket
    )
        return;


    ticket.style.display =
        "none";

    main.style.display =
        "block";


    displayMainShop();

}


/* =========================================================
   PUBLIC FUNCTIONS
========================================================= */

window.openTicketShop =
    openTicketShop;

window.openMainShop =
    openMainShop;

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


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

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
