```javascript
/* =========================================
   STUDYSPRINT - STUDYPASS
========================================= */


/* =========================================
   SETTINGS
========================================= */

const TOTAL_TIERS = 50;

const XP_PER_TIER = 100;


/* =========================================
   REWARDS
========================================= */

const rewards = {

    5: {
        type: "coins",
        amount: 250,
        name: "250 Coins",
        icon: "🪙"
    },

    10: {
        type: "ticket",
        amount: 1,
        name: "Shop Ticket",
        icon: "🎟️"
    },

    15: {
        type: "coins",
        amount: 250,
        name: "250 Coins",
        icon: "🪙"
    },

    20: {
        type: "streakFreeze",
        amount: 1,
        name: "Streak Freeze",
        icon: "❄️"
    },

    25: {
        type: "ticket",
        amount: 1,
        name: "Shop Ticket",
        icon: "🎟️"
    },

    30: {
        type: "cosmetic",
        name: "Monthly Banner",
        icon: "🎨"
    },

    35: {
        type: "ticket",
        amount: 1,
        name: "Shop Ticket",
        icon: "🎟️"
    },

    40: {
        type: "cosmetic",
        name: "Monthly Hat / Jumper",
        icon: "👕"
    },

    45: {
        type: "ticket",
        amount: 1,
        name: "Shop Ticket",
        icon: "🎟️"
    },

    50: {
        type: "title",
        name: "Monthly Title",
        icon: "🏆"
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


/* =========================================
   LOAD PASS DATA
========================================= */

let currentMonth =
    getCurrentMonth();


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
    savedMonth !==
    currentMonth
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
   CALCULATE TIER
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
   GET XP WITHIN CURRENT TIER
========================================= */

function getTierXP() {

    if (
        passXP >=
        TOTAL_TIERS *
        XP_PER_TIER
    ) {

        return XP_PER_TIER;

    }


    return (
        passXP %
        XP_PER_TIER
    );

}


/* =========================================
   CREATE PASS
========================================= */

function createPass() {


    const track =
        document.getElementById(
            "pass-track"
        );


    if (!track) return;


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


            rewardBox.innerHTML =

                `<div class="reward-icon">
                    ${reward.icon}
                </div>

                <strong>
                    ${reward.name}
                </strong>`;


            tierCard.appendChild(
                rewardBox
            );


            /* =========================
               CLAIMED / UNLOCKED
            ========================= */


            if (
                tier <
                currentTier
            ) {

                rewardBox.classList.add(
                    "reward-unlocked"
                );

            }


            else if (
                tier ===
                currentTier
            ) {

                rewardBox.classList.add(
                    "reward-current"
                );

            }


            else {

                rewardBox.classList.add(
                    "reward-locked"
                );

            }

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


        /* =========================
           ADD CARD
        ========================= */


        track.appendChild(
            tierCard
        );

    }

}


/* =========================================
   UPDATE SUMMARY
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
   SAVE CURRENT MONTH
========================================= */

localStorage.setItem(
    "studyPassMonth",
    currentMonth
);


/* =========================================
   START
========================================= */

updatePassSummary();

createPass();
```
