/* =========================================
   STUDYSPRINT STUDYPASS
========================================= */

const PASS_XP_KEY = "studyPassXP";
const PASS_MONTH_KEY = "studyPassMonth";
const CLAIMED_KEY = "studyPassClaimed";


/* =========================================
   CURRENT MONTH
========================================= */

function getCurrentMonth() {

    const date = new Date();

    return (
        date.getFullYear() +
        "-" +
        String(
            date.getMonth() + 1
        ).padStart(2, "0")
    );

}


/* =========================================
   PASS DATA
========================================= */

const currentMonth =
    getCurrentMonth();

let savedMonth =
    localStorage.getItem(
        PASS_MONTH_KEY
    );


let passXP =
    Number(
        localStorage.getItem(
            PASS_XP_KEY
        )
    ) || 0;


let claimedRewards =
    JSON.parse(
        localStorage.getItem(
            CLAIMED_KEY
        )
    ) || [];


/* =========================================
   MONTHLY RESET
========================================= */

if (
    savedMonth !== currentMonth
) {

    passXP = 0;

    claimedRewards = [];

    localStorage.setItem(
        PASS_XP_KEY,
        "0"
    );

    localStorage.setItem(
        CLAIMED_KEY,
        JSON.stringify([])
    );

    localStorage.setItem(
        PASS_MONTH_KEY,
        currentMonth
    );

}


/* =========================================
   PASS SETTINGS
========================================= */

const MAX_TIER = 50;

const XP_PER_TIER = 100;

const MAX_XP =
    MAX_TIER *
    XP_PER_TIER;


/* =========================================
   REWARDS
========================================= */

const rewards = {

    5: {
        id:"coins-250-1",
        type:"coins",
        amount:250,
        name:"250 Coins"
    },

    10: {
        id:"streak-freeze",
        type:"streakFreeze",
        amount:1,
        name:"Streak Freeze"
    },

    15: {
        id:"shop-ticket-1",
        type:"shopTicket",
        amount:1,
        name:"Shop Ticket"
    },

    20: {
        id:"sprint-banner",
        type:"banner",
        value:"sprint-grid",
        name:"Sprint Grid Banner"
    },

    25: {
        id:"coins-250-2",
        type:"coins",
        amount:250,
        name:"250 Coins"
    },

    30: {
        id:"shop-ticket-2",
        type:"shopTicket",
        amount:1,
        name:"Shop Ticket"
    },

    35: {
        id:"sprint-cap",
        type:"hat",
        value:"sprint-cap",
        name:"Sprint Cap"
    },

    40: {
        id:"shop-ticket-3",
        type:"shopTicket",
        amount:1,
        name:"Shop Ticket"
    },

    45: {
        id:"sprint-shirt",
        type:"shirt",
        value:"sprint-blue",
        name:"Sprint Blue Shirt"
    },

    50: {
        id:"sprint-champion",
        type:"title",
        value:"sprint-champion",
        name:"Sprint Champion"
    }

};


/* =========================================
   GET TIER
========================================= */

function getCurrentTier() {

    return Math.min(
        MAX_TIER,
        Math.floor(
            passXP /
            XP_PER_TIER
        )
    );

}


/* =========================================
   ADD PASS XP
========================================= */

function addStudyPassXP(amount) {

    amount =
        Number(amount) || 0;

    passXP =
        Math.min(
            MAX_XP,
            passXP + amount
        );


    localStorage.setItem(
        PASS_XP_KEY,
        passXP.toString()
    );


    updatePass();

}


/* =========================================
   CLAIM REWARD
========================================= */

function claimReward(tier) {

    tier =
        Number(tier);


    const reward =
        rewards[tier];


    if (!reward) {
        return;
    }


    if (
        getCurrentTier() <
        tier
    ) {

        return;

    }


    if (
        claimedRewards.includes(
            reward.id
        )
    ) {

        return;

    }


    /* =====================================
       COINS
    ===================================== */

    if (
        reward.type ===
        "coins"
    ) {

        const coins =
            Number(
                localStorage.getItem(
                    "coins"
                )
            ) || 0;


        localStorage.setItem(
            "coins",
            (
                coins +
                reward.amount
            ).toString()
        );

    }


    /* =====================================
       STREAK FREEZE
    ===================================== */

    if (
        reward.type ===
        "streakFreeze"
    ) {

        const freezes =
            Number(
                localStorage.getItem(
                    "streakFreezes"
                )
            ) || 0;


        localStorage.setItem(
            "streakFreezes",
            (
                freezes +
                reward.amount
            ).toString()
        );

    }


    /* =====================================
       SHOP TICKET
    ===================================== */

    if (
        reward.type ===
        "shopTicket"
    ) {

        const tickets =
            Number(
                localStorage.getItem(
                    "shopTickets"
                )
            ) || 0;


        localStorage.setItem(
            "shopTickets",
            (
                tickets +
                reward.amount
            ).toString()
        );

    }


    /* =====================================
       COSMETICS
    ===================================== */

    if (
        reward.type ===
        "shirt"
    ) {

        unlockItem(
            "unlocked_shirts",
            reward.value
        );

    }


    if (
        reward.type ===
        "hat"
    ) {

        unlockItem(
            "unlocked_hats",
            reward.value
        );

    }


    if (
        reward.type ===
        "banner"
    ) {

        unlockItem(
            "unlocked_banners",
            reward.value
        );

    }


    if (
        reward.type ===
        "title"
    ) {

        unlockItem(
            "unlockedTitles",
            reward.value
        );

    }


    /* =====================================
       MARK CLAIMED
    ===================================== */

    claimedRewards.push(
        reward.id
    );


    localStorage.setItem(
        CLAIMED_KEY,
        JSON.stringify(
            claimedRewards
        )
    );


    updatePass();


    if (
        typeof window.showRewardClaimed ===
        "function"
    ) {

        window.showRewardClaimed(
            reward.name
        );

    }

}


/* =========================================
   UNLOCK ITEM
========================================= */

function unlockItem(
    storageKey,
    value
) {

    let items =
        JSON.parse(
            localStorage.getItem(
                storageKey
            )
        ) || [];


    if (
        !items.includes(
            value
        )
    ) {

        items.push(
            value
        );

    }


    localStorage.setItem(
        storageKey,
        JSON.stringify(
            items
        )
    );

}


/* =========================================
   CHECK CLAIMED
========================================= */

function isRewardClaimed(
    tier
) {

    const reward =
        rewards[tier];


    if (!reward) {
        return false;
    }


    return claimedRewards.includes(
        reward.id
    );

}


/* =========================================
   UPDATE PASS
========================================= */

function updatePass() {

    const tier =
        getCurrentTier();


    const progress =
        passXP %
        XP_PER_TIER;


    const progressPercent =
        Math.min(
            100,
            (
                progress /
                XP_PER_TIER
            ) * 100
        );


    const xpText =
        document.getElementById(
            "pass-xp"
        );


    const tierText =
        document.getElementById(
            "pass-tier"
        );


    const progressBar =
        document.getElementById(
            "pass-progress"
        );


    if (xpText) {

        xpText.textContent =
            passXP +
            " / " +
            MAX_XP +
            " XP";

    }


    if (tierText) {

        tierText.textContent =
            "Tier " +
            tier;

    }


    if (progressBar) {

        progressBar.style.width =
            progressPercent +
            "%";

    }


    Object.keys(
        rewards
    ).forEach(
        function(tierNumber) {

            const tierValue =
                Number(
                    tierNumber
                );


            const button =
                document.querySelector(
                    `[data-reward-tier="${tierValue}"]`
                );


            if (!button) {
                return;
            }


            if (
                isRewardClaimed(
                    tierValue
                )
            ) {

                button.disabled =
                    true;

                button.textContent =
                    "CLAIMED";

                button.classList.add(
                    "claimed"
                );

            }

            else if (
                tier >=
                tierValue
            ) {

                button.disabled =
                    false;

                button.textContent =
                    "CLAIM";

                button.classList.add(
                    "available"
                );

            }

            else {

                button.disabled =
                    true;

                button.textContent =
                    "LOCKED";

                button.classList.remove(
                    "available"
                );

            }

        }
    );

}


/* =========================================
   MAKE FUNCTIONS AVAILABLE
========================================= */

window.addStudyPassXP =
    addStudyPassXP;

window.claimReward =
    claimReward;

window.updatePass =
    updatePass;


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updatePass();

    }
);
