/* =========================================
   STUDYSPRINT - STUDYPASS
========================================= */

const TOTAL_TIERS = 50;
const XP_PER_TIER = 100;


/* =========================================
   AUGUST 2026 REWARDS
========================================= */

const rewards = {

    5: {
        type: "coins",
        amount: 250,
        name: "250 Coins",
        icon: "coin"
    },

    10: {
        type: "ticket",
        amount: 1,
        name: "Shop Ticket",
        icon: "ticket"
    },

    15: {
        type: "coins",
        amount: 250,
        name: "250 Coins",
        icon: "coin"
    },

    20: {
        type: "streakFreeze",
        amount: 1,
        name: "Streak Freeze",
        icon: "freeze"
    },

    25: {
        type: "ticket",
        amount: 1,
        name: "Shop Ticket",
        icon: "ticket"
    },

    30: {
        type: "cosmetic",
        cosmeticType: "banner",
        cosmeticId: "sprint-grid",
        name: "Sprint Grid Banner",
        icon: "banner"
    },

    35: {
        type: "cosmetic",
        cosmeticType: "shirt",
        cosmeticId: "sprint-blue",
        name: "Sprint Blue Shirt",
        icon: "shirt"
    },

    40: {
        type: "cosmetic",
        cosmeticType: "hat",
        cosmeticId: "sprint-cap",
        name: "Sprint Cap",
        icon: "hat"
    },

    45: {
        type: "ticket",
        amount: 1,
        name: "Shop Ticket",
        icon: "ticket"
    },

    50: {
        type: "title",
        titleId: "sprint-champion",
        name: "Sprint Champion",
        icon: "title"
    }

};


/* =========================================
   MONTH
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


const currentMonth = getCurrentMonth();


/* =========================================
   LOAD PASS DATA
========================================= */

let savedMonth =
    localStorage.getItem(
        "studyPassMonth"
    );


let passXP =
    Number(
        localStorage.getItem(
            "studyPassXP"
        )
    ) || 0;


/* =========================================
   MONTHLY RESET
========================================= */

if (
    savedMonth !== currentMonth
) {

    passXP = 0;

    localStorage.setItem(
        "studyPassXP",
        "0"
    );

    localStorage.setItem(
        "studyPassMonth",
        currentMonth
    );

}


/* =========================================
   CLAIMED REWARDS
========================================= */

let claimedRewards =
    JSON.parse(
        localStorage.getItem(
            "studyPassClaimed"
        )
    ) || [];


/* =========================================
   SAVE CLAIMED REWARDS
========================================= */

function saveClaimedRewards() {

    localStorage.setItem(
        "studyPassClaimed",
        JSON.stringify(
            claimedRewards
        )
    );

}


/* =========================================
   INVENTORY HELPERS
========================================= */

function getNumber(key) {

    return Number(
        localStorage.getItem(key)
    ) || 0;

}


function setNumber(key, value) {

    localStorage.setItem(
        key,
        String(value)
    );

}


/* =========================================
   ADD COSMETIC TO INVENTORY
========================================= */

function addUnlockedCosmetic(
    cosmeticType,
    cosmeticId
) {

    const key =
        "unlocked_" +
        cosmeticType +
        "s";


    let unlocked =
        JSON.parse(
            localStorage.getItem(key)
        ) || [];


    if (
        !unlocked.includes(
            cosmeticId
        )
    ) {

        unlocked.push(
            cosmeticId
        );

    }


    localStorage.setItem(
        key,
        JSON.stringify(
            unlocked
        )
    );

}


/* =========================================
   ADD TITLE TO INVENTORY
========================================= */

function addUnlockedTitle(
    titleId
) {

    let titles =
        JSON.parse(
            localStorage.getItem(
                "unlockedTitles"
            )
        ) || [];


    if (
        !titles.includes(
            titleId
        )
    ) {

        titles.push(
            titleId
        );

    }


    localStorage.setItem(
        "unlockedTitles",
        JSON.stringify(
            titles
        )
    );

}


/* =========================================
   CLAIM REWARD
========================================= */

function claimReward(tier) {

    const reward =
        rewards[tier];


    if (!reward) {
        return;
    }


    /* =========================
       CHECK TIER
    ========================= */

    const currentTier =
        getCurrentTier();


    if (
        currentTier <
        tier
    ) {

        return;
    }


    /* =========================
       ALREADY CLAIMED
    ========================= */

    if (
        claimedRewards.includes(
            tier
        )
    ) {

        return;
    }


    /* =========================
       GIVE REWARD
    ========================= */

    if (
        reward.type ===
        "coins"
    ) {

        const coins =
            getNumber(
                "coins"
            );


        setNumber(
            "coins",
            coins +
            reward.amount
        );

    }


    else if (
        reward.type ===
        "ticket"
    ) {

        const tickets =
            getNumber(
                "shopTickets"
            );


        setNumber(
            "shopTickets",
            tickets +
            reward.amount
        );

    }


    else if (
        reward.type ===
        "streakFreeze"
    ) {

        const freezes =
            getNumber(
                "streakFreezes"
            );


        setNumber(
            "streakFreezes",
            freezes +
            reward.amount
        );

    }


    else if (
        reward.type ===
        "cosmetic"
    ) {

        addUnlockedCosmetic(
            reward.cosmeticType,
            reward.cosmeticId
        );

    }


    else if (
        reward.type ===
        "title"
    ) {

        addUnlockedTitle(
            reward.titleId
        );

    }


    /* =========================
       MARK CLAIMED
    ========================= */

    claimedRewards.push(
        tier
    );


    saveClaimedRewards();


    /* =========================
       REDRAW
    ========================= */

    createPass();

}


/* =========================================
   CURRENT TIER
========================================= */

function getCurrentTier() {

    let tier =
        Math.floor(
            passXP /
            XP_PER_TIER
        ) + 1;


    if (
        tier > TOTAL_TIERS
    ) {

        tier =
            TOTAL_TIERS;

    }


    return tier;

}


/* =========================================
   XP IN CURRENT TIER
========================================= */

function getTierXP() {

    const maximumXP =
        TOTAL_TIERS *
        XP_PER_TIER;


    if (
        passXP >=
        maximumXP
    ) {

        return XP_PER_TIER;

    }


    return (
        passXP %
        XP_PER_TIER
    );

}


/* =========================================
   REWARD ICON
========================================= */

function getRewardIcon(type) {

    if (
        type ===
        "coin"
    ) {

        return "🪙";

    }


    if (
        type ===
        "ticket"
    ) {

        return "🎟️";

    }


    if (
        type ===
        "freeze"
    ) {

        return "❄";

    }


    if (
        type ===
        "banner"
    ) {

        return "◆";

    }


    if (
        type ===
        "shirt"
    ) {

        return "■";

    }


    if (
        type ===
        "hat"
    ) {

        return "▲";

    }


    if (
        type ===
        "title"
    ) {

        return "★";

    }


    return "";

}


/* =========================================
   CREATE PASS
========================================= */

function createPass() {

    const track =
        document.getElementById(
            "pass-track"
        );


    if (!track) {
        return;
    }


    track.innerHTML = "";


    const currentTier =
        getCurrentTier();


    for (
        let tier = 1;
        tier <= TOTAL_TIERS;
        tier++
    ) {

        const tierCard =
            document.createElement(
                "div"
            );


        tierCard.className =
            "pass-tier";


        /* =========================
           TIER STATE
        ========================= */

        if (
            tier <
            currentTier
        ) {

            tierCard.classList.add(
                "completed"
            );

        }

        else if (
            tier ===
            currentTier
        ) {

            tierCard.classList.add(
                "current"
            );

        }

        else {

            tierCard.classList.add(
                "locked"
            );

        }


        /* =========================
           TIER NUMBER
        ========================= */

        const number =
            document.createElement(
                "div"
            );


        number.className =
            "tier-number";


        number.textContent =
            tier;


        tierCard.appendChild(
            number
        );


        /* =========================
           REWARD
        ========================= */

        if (
            rewards[tier]
        ) {

            const reward =
                rewards[tier];


            const rewardBox =
                document.createElement(
                    "div"
                );


            rewardBox.className =
                "tier-reward";


            rewardBox.innerHTML = `

                <div class="reward-icon">

                    ${getRewardIcon(
                        reward.icon
                    )}

                </div>

                <strong>

                    ${reward.name}

                </strong>

            `;


            /* =========================
               REWARD STATUS
            ========================= */

            const isUnlocked =
                currentTier >= tier;


            const isClaimed =
                claimedRewards.includes(
                    tier
                );


            if (
                isClaimed
            ) {

                rewardBox.classList.add(
                    "reward-unlocked"
                );


                const check =
                    document.createElement(
                        "div"
                    );


                check.className =
                    "reward-check";


                check.textContent =
                    "✓";


                rewardBox.appendChild(
                    check
                );

            }


            else if (
                isUnlocked
            ) {

                rewardBox.classList.add(
                    "reward-current"
                );


                const claimButton =
                    document.createElement(
                        "button"
                    );


                claimButton.className =
                    "claim-button";


                claimButton.textContent =
                    "CLAIM";


                claimButton.onclick =
                    function() {

                        claimReward(
                            tier
                        );

                    };


                rewardBox.appendChild(
                    claimButton
                );

            }


            else {

                rewardBox.classList.add(
                    "reward-locked"
                );

            }


            tierCard.appendChild(
                rewardBox
            );

        }

        else {

            const emptyReward =
                document.createElement(
                    "div"
                );


            emptyReward.className =
                "tier-empty";


            emptyReward.textContent =
                "Keep going!";


            tierCard.appendChild(
                emptyReward
            );

        }


        track.appendChild(
            tierCard
        );

    }

}


/* =========================================
   PASS SUMMARY
========================================= */

function updatePassSummary() {

    const currentTier =
        getCurrentTier();


    const tierXP =
        getTierXP();


    const tierElement =
        document.getElementById(
            "current-tier"
        );


    const xpText =
        document.getElementById(
            "pass-xp-text"
        );


    const progressBar =
        document.getElementById(
            "pass-progress-bar"
        );


    if (
        tierElement
    ) {

        tierElement.textContent =
            currentTier;

    }


    if (
        xpText
    ) {

        if (
            passXP >=
            TOTAL_TIERS *
            XP_PER_TIER
        ) {

            xpText.textContent =
                "MAXED";

        }

        else {

            xpText.textContent =
                tierXP +
                " / " +
                XP_PER_TIER +
                " XP";

        }

    }


    if (
        progressBar
    ) {

        const progress =
            (
                tierXP /
                XP_PER_TIER
            ) * 100;


        progressBar.style.width =
            progress + "%";

    }

}


/* =========================================
   ADD PASS XP
========================================= */

function addPassXP(amount) {

    amount =
        Number(amount);


    if (
        isNaN(amount) ||
        amount <= 0
    ) {

        return;
    }


    passXP += amount;


    const maximumXP =
        TOTAL_TIERS *
        XP_PER_TIER;


    if (
        passXP >
        maximumXP
    ) {

        passXP =
            maximumXP;

    }


    localStorage.setItem(
        "studyPassXP",
        passXP
    );


    localStorage.setItem(
        "studyPassMonth",
        currentMonth
    );


    updatePassSummary();

    createPass();

}


/* =========================================
   START
========================================= */

localStorage.setItem(
    "studyPassMonth",
    currentMonth
);


updatePassSummary();

createPass();
