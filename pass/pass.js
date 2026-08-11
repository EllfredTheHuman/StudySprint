const PASS_XP_KEY = "studyPassXP";
const PASS_MONTH_KEY = "studyPassMonth";
const CLAIMED_KEY = "studyPassClaimed";

const MAX_TIER = 50;
const XP_PER_TIER = 100;
const MAX_XP = 5000;


/* =========================================
   MONTH
========================================= */

function getCurrentMonth() {

    const date = new Date();

    return (
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0")
    );

}


/* =========================================
   LOAD
========================================= */

const currentMonth = getCurrentMonth();

let savedMonth =
    localStorage.getItem(PASS_MONTH_KEY);

let passXP =
    Number(
        localStorage.getItem(PASS_XP_KEY)
    ) || 0;

let claimedRewards =
    JSON.parse(
        localStorage.getItem(CLAIMED_KEY)
    ) || [];


/* =========================================
   MONTH RESET
========================================= */

if (savedMonth !== currentMonth) {

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
        id: "coins-250-1",
        type: "coins",
        amount: 250
    },

    10: {
        id: "streak-freeze",
        type: "streakFreeze",
        amount: 1
    },

    15: {
        id: "shop-ticket-1",
        type: "shopTicket",
        amount: 1
    },

    20: {
        id: "sprint-grid",
        type: "banner",
        value: "sprint-grid"
    },

    25: {
        id: "coins-250-2",
        type: "coins",
        amount: 250
    },

    30: {
        id: "shop-ticket-2",
        type: "shopTicket",
        amount: 1
    },

    35: {
        id: "sprint-cap",
        type: "hat",
        value: "sprint-cap"
    },

    40: {
        id: "shop-ticket-3",
        type: "shopTicket",
        amount: 1
    },

    45: {
        id: "sprint-blue",
        type: "shirt",
        value: "sprint-blue"
    },

    50: {
        id: "sprint-champion",
        type: "title",
        value: "sprint-champion"
    }

};


/* =========================================
   CURRENT TIER
========================================= */

function getCurrentTier() {

    return Math.min(
        MAX_TIER,
        Math.floor(
            passXP / XP_PER_TIER
        )
    );

}


/* =========================================
   UNLOCK COSMETIC
========================================= */

function unlockItem(
    storageKey,
    value
) {

    let unlocked =
        JSON.parse(
            localStorage.getItem(
                storageKey
            )
        ) || [];


    if (!unlocked.includes(value)) {

        unlocked.push(value);

    }


    localStorage.setItem(
        storageKey,
        JSON.stringify(unlocked)
    );

}


/* =========================================
   CLAIM REWARD
========================================= */

function claimReward(tier) {

    const rewardTier =
        Number(tier);

    const reward =
        rewards[rewardTier];


    if (!reward) {

        console.error(
            "StudyPass reward not found:",
            rewardTier
        );

        return;

    }


    if (
        getCurrentTier() <
        rewardTier
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
        reward.type === "coins"
    ) {

        const coins =
            Number(
                localStorage.getItem(
                    "coins"
                )
            ) || 0;


        localStorage.setItem(
            "coins",
            String(
                coins +
                reward.amount
            )
        );

    }


    /* STREAK FREEZE */

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
            String(
                freezes + 1
            )
        );

    }


    /* SHOP TICKET */

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
            String(
                tickets + 1
            )
        );

    }


    /* BANNER */

    if (
        reward.type === "banner"
    ) {

        unlockItem(
            "unlocked_banners",
            reward.value
        );

    }


    /* HAT */

    if (
        reward.type === "hat"
    ) {

        unlockItem(
            "unlocked_hats",
            reward.value
        );

    }


    /* SHIRT */

    if (
        reward.type === "shirt"
    ) {

        unlockItem(
            "unlocked_shirts",
            reward.value
        );

    }


    /* TITLE */

    if (
        reward.type === "title"
    ) {

        unlockItem(
            "unlockedTitles",
            reward.value
        );

    }


    /* SAVE CLAIM */

    claimedRewards.push(
        reward.id
    );


    localStorage.setItem(
        CLAIMED_KEY,
        JSON.stringify(
            claimedRewards
        )
    );


    /* UPDATE CARD IMMEDIATELY */

    const card =
        document.querySelector(
            `.reward-card[data-reward-tier="${rewardTier}"]`
        );


    if (card) {

        const button =
            card.querySelector(
                ".claim-button"
            );


        card.classList.add(
            "claimed"
        );


        if (button) {

            button.disabled =
                true;

            button.textContent =
                "CLAIMED";

            button.classList.remove(
                "available"
            );

        }


        card.classList.remove(
            "claim-animation"
        );


        void card.offsetWidth;


        card.classList.add(
            "claim-animation"
        );

    }

}


/* =========================================
   UPDATE PASS
========================================= */

function updatePass() {

    const tier =
        getCurrentTier();


    const tierXP =
        passXP %
        XP_PER_TIER;


    const percentage =
        (
            tierXP /
            XP_PER_TIER
        ) * 100;


    const tierElement =
        document.getElementById(
            "pass-tier"
        );


    const xpElement =
        document.getElementById(
            "pass-xp"
        );


    const progressElement =
        document.getElementById(
            "pass-progress"
        );


    if (tierElement) {

        tierElement.textContent =
            "Tier " + tier;

    }


    if (xpElement) {

        xpElement.textContent =
            passXP +
            " / " +
            MAX_XP +
            " XP";

    }


    if (progressElement) {

        progressElement.style.width =
            percentage + "%";

    }


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
                    !reward ||
                    !button
                ) {

                    return;

                }


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

                    button.classList.remove(
                        "available"
                    );

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
   ADD XP
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
        String(passXP)
    );


    updatePass();

}


/* =========================================
   BUTTON LISTENERS
========================================= */

function connectClaimButtons() {

    document
        .querySelectorAll(
            ".claim-button"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        event.stopPropagation();

                        const tier =
                            Number(
                                button
                                    .closest(
                                        ".reward-card"
                                    )
                                    .dataset
                                    .rewardTier
                            );


                        claimReward(tier);

                    }
                );

            }
        );

}


/* =========================================
   GLOBAL
========================================= */

window.claimReward =
    claimReward;

window.addStudyPassXP =
    addStudyPassXP;


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        connectClaimButtons();

        updatePass();

    }
);
