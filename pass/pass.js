/* =========================================
   STUDYPASS
========================================= */

const PASS_XP_KEY =
    "studyPassXP";

const PASS_MONTH_KEY =
    "studyPassMonth";

const CLAIMED_KEY =
    "studyPassClaimed";


const MAX_TIER = 50;

const XP_PER_TIER = 100;

const MAX_XP =
    MAX_TIER *
    XP_PER_TIER;


/* =========================================
   MONTH
========================================= */

function getCurrentMonth() {

    const date =
        new Date();

    return (
        date.getFullYear() +
        "-" +
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        )
    );

}


/* =========================================
   LOAD DATA
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
    savedMonth !==
    currentMonth
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
        id:"sprint-grid",
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
        id:"sprint-blue",
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
   CURRENT TIER
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
   ADD XP
========================================= */

function addStudyPassXP(
    amount
) {

    amount =
        Number(amount) || 0;


    passXP =
        Math.min(
            MAX_XP,
            passXP + amount
        );


    localStorage.setItem(
        PASS_XP_KEY,
        String(passXP)
    );


    updatePass();

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
   CLAIM
========================================= */

function claimReward(
    tier
) {

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


    /* COINS */

    if (
        reward.type ===
        "coins"
    ) {

        let coins =
            Number(
                localStorage.getItem(
                    "coins"
                )
            ) || 0;


        coins +=
            reward.amount;


        localStorage.setItem(
            "coins",
            String(coins)
        );

    }


    /* STREAK FREEZE */

    if (
        reward.type ===
        "streakFreeze"
    ) {

        let freezes =
            Number(
                localStorage.getItem(
                    "streakFreezes"
                )
            ) || 0;


        freezes +=
            reward.amount;


        localStorage.setItem(
            "streakFreezes",
            String(freezes)
        );

    }


    /* SHOP TICKET */

    if (
        reward.type ===
        "shopTicket"
    ) {

        let tickets =
            Number(
                localStorage.getItem(
                    "shopTickets"
                )
            ) || 0;


        tickets +=
            reward.amount;


        localStorage.setItem(
            "shopTickets",
            String(tickets)
        );

    }


    /* BANNER */

    if (
        reward.type ===
        "banner"
    ) {

        unlockItem(
            "unlocked_banners",
            reward.value
        );

    }


    /* HAT */

    if (
        reward.type ===
        "hat"
    ) {

        unlockItem(
            "unlocked_hats",
            reward.value
        );

    }


    /* SHIRT */

    if (
        reward.type ===
        "shirt"
    ) {

        unlockItem(
            "unlocked_shirts",
            reward.value
        );

    }


    /* TITLE */

    if (
        reward.type ===
        "title"
    ) {

        unlockItem(
            "unlockedTitles",
            reward.value
        );

    }


    /* MARK CLAIMED */

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

}


/* =========================================
   UPDATE
========================================= */

function updatePass() {

    const tier =
        getCurrentTier();


    const tierXP =
        passXP %
        XP_PER_TIER;


    const percent =
        (
            tierXP /
            XP_PER_TIER
        ) * 100;


    document.getElementById(
        "pass-tier"
    ).textContent =
        "Tier " +
        tier;


    document.getElementById(
        "pass-xp"
    ).textContent =
        passXP +
        " / " +
        MAX_XP +
        " XP";


    document.getElementById(
        "pass-progress"
    ).style.width =
        percent + "%";


    document
        .querySelectorAll(
            ".reward-card"
        )
        .forEach(
            function(card) {

                const rewardTier =
                    Number(
                        card.dataset
                            .rewardTier
                    );


                const reward =
                    rewards[
                        rewardTier
                    ];


                const button =
                    card.querySelector(
                        ".claim-button"
                    );


                if (
                    claimedRewards.includes(
                        reward.id
                    )
                ) {

                    card.classList.add(
                        "claimed"
                    );

                    button.disabled =
                        true;

                    button.textContent =
                        "CLAIMED";

                    return;

                }


                card.classList.remove(
                    "claimed"
                );


                if (
                    tier >=
                    rewardTier
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
   GLOBAL FUNCTIONS
========================================= */

window.addStudyPassXP =
    addStudyPassXP;

window.claimReward =
    claimReward;


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updatePass();

    }
);
