```javascript
/* =========================================
   STUDYSPRINT CHARACTER EDITOR
========================================= */


/* =========================================
   STORAGE HELPERS
========================================= */

function getUnlocked(key) {

    try {

        return JSON.parse(
            localStorage.getItem(key)
        ) || [];

    } catch {

        return [];

    }

}


function saveCharacterPart(
    key,
    value
) {

    localStorage.setItem(
        key,
        value
    );

}


/* =========================================
   CHARACTER OPTIONS
========================================= */

const CHARACTER_CATEGORIES = {

    shirts: {
        unlockKey: "unlocked_shirts",
        selectedKey: "character_shirt",
        title: "Shirts"
    },

    hats: {
        unlockKey: "unlocked_hats",
        selectedKey: "character_hat",
        title: "Hats"
    },

    pants: {
        unlockKey: "unlocked_pants",
        selectedKey: "character_pants",
        title: "Pants"
    },

    banners: {
        unlockKey: "unlocked_banners",
        selectedKey: "character_banner",
        title: "Banners"
    },

    titles: {
        unlockKey: "unlockedTitles",
        selectedKey: "character_tag",
        title: "Player Titles"
    },

    effects: {
        unlockKey: "unlocked_effects",
        selectedKey: "character_effect",
        title: "Effects"
    }

};


/* =========================================
   DISPLAY CATEGORY
========================================= */

function displayCategory(
    categoryName
) {

    const category =
        CHARACTER_CATEGORIES[
            categoryName
        ];


    if (!category) {
        return;
    }


    const container =
        document.getElementById(
            `${categoryName}-options`
        );


    if (!container) {
        return;
    }


    const unlocked =
        getUnlocked(
            category.unlockKey
        );


    const selected =
        localStorage.getItem(
            category.selectedKey
        );


    container.innerHTML = "";


    if (unlocked.length === 0) {

        const empty =
            document.createElement(
                "p"
            );


        empty.className =
            "no-options";


        empty.textContent =
            `No ${category.title.toLowerCase()} unlocked yet.`;


        container.appendChild(
            empty
        );


        return;

    }


    unlocked.forEach(
        function(item) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "character-option";


            button.dataset.value =
                item;


            button.textContent =
                formatCosmeticName(
                    item
                );


            if (
                item === selected
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                function() {

                    selectCosmetic(
                        categoryName,
                        item
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================
   FORMAT NAMES
========================================= */

function formatCosmeticName(
    value
) {

    const specialNames = {

        "sprint-blue":
            "Sprint Shirt",

        "sprint-cap":
            "Sprint Cap",

        "star-cap":
            "Star Cap",

        "visor":
            "Sprint Visor",

        "sprint-grid":
            "Sprint Grid",

        "purple-grid":
            "Purple Grid",

        "neon-blue":
            "Neon Blue",

        "sprint-champion":
            "Sprint Champion",

        "first-sprinter":
            "The First Sprinter",

        "sparkle":
            "Sparkle Effect",

        "speed-trail":
            "Speed Trail",

        "lightning":
            "Lightning Effect",

        "rainbow":
            "Rainbow Aura",

        "fire":
            "Fire Aura",

        "glitch":
            "Glitch Effect",

        "shadow":
            "Shadow Aura",

        "crystal":
            "Crystal Glow",

        "cosmic":
            "Cosmic Aura",

        "crown":
            "Crown + Glow"

    };


    if (
        specialNames[value]
    ) {

        return specialNames[value];

    }


    return value
        .replaceAll(
            "-",
            " "
        )
        .replace(
            /\b\w/g,
            letter =>
                letter.toUpperCase()
        );

}


/* =========================================
   SELECT COSMETIC
========================================= */

function selectCosmetic(
    categoryName,
    value
) {

    const category =
        CHARACTER_CATEGORIES[
            categoryName
        ];


    if (!category) {
        return;
    }


    saveCharacterPart(
        category.selectedKey,
        value
    );


    displayCategory(
        categoryName
    );


    updateCharacterPreview();


    console.log(
        `StudySprint: ${category.title} selected:`,
        value
    );

}


/* =========================================
   LOAD CHARACTER
========================================= */

function loadCharacter() {

    Object.keys(
        CHARACTER_CATEGORIES
    ).forEach(
        category => {

            displayCategory(
                category
            );

        }
    );


    updateCharacterPreview();

}


/* =========================================
   CHARACTER PREVIEW
========================================= */

function updateCharacterPreview() {

    const character =
        document.getElementById(
            "character-preview"
        );


    if (!character) {
        return;
    }


    const shirt =
        localStorage.getItem(
            "character_shirt"
        );


    const hat =
        localStorage.getItem(
            "character_hat"
        );


    const pants =
        localStorage.getItem(
            "character_pants"
        );


    const banner =
        localStorage.getItem(
            "character_banner"
        );


    const effect =
        localStorage.getItem(
            "character_effect"
        );


    character.dataset.shirt =
        shirt || "";


    character.dataset.hat =
        hat || "";


    character.dataset.pants =
        pants || "";


    character.dataset.banner =
        banner || "";


    character.dataset.effect =
        effect || "";


    /*
       These classes let your CSS/character
       preview detect the selected cosmetics.
    */

    character.classList.remove(
        "shirt-equipped",
        "hat-equipped",
        "pants-equipped",
        "banner-equipped",
        "effect-equipped"
    );


    if (shirt) {

        character.classList.add(
            "shirt-equipped"
        );

    }


    if (hat) {

        character.classList.add(
            "hat-equipped"
        );

    }


    if (pants) {

        character.classList.add(
            "pants-equipped"
        );

    }


    if (banner) {

        character.classList.add(
            "banner-equipped"
        );

    }


    if (effect) {

        character.classList.add(
            "effect-equipped"
        );

    }

}


/* =========================================
   CLEAR EQUIPPED ITEM
========================================= */

function clearCosmetic(
    categoryName
) {

    const category =
        CHARACTER_CATEGORIES[
            categoryName
        ];


    if (!category) {
        return;
    }


    localStorage.removeItem(
        category.selectedKey
    );


    displayCategory(
        categoryName
    );


    updateCharacterPreview();

}


/* =========================================
   INITIALISE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadCharacter();

    }
);


/* =========================================
   GLOBAL FUNCTIONS
========================================= */

window.loadCharacter =
    loadCharacter;

window.selectCosmetic =
    selectCosmetic;

window.clearCosmetic =
    clearCosmetic;

window.updateCharacterPreview =
    updateCharacterPreview;
```

And your character editor HTML needs these option containers somewhere in the page:

```html
<section class="character-category">

    <h2>Shirts</h2>

    <div id="shirts-options"
         class="character-options">
    </div>

</section>


<section class="character-category">

    <h2>Hats</h2>

    <div id="hats-options"
         class="character-options">
    </div>

</section>


<section class="character-category">

    <h2>Pants</h2>

    <div id="pants-options"
         class="character-options">
    </div>

</section>


<section class="character-category">

    <h2>Banners</h2>

    <div id="banners-options"
         class="character-options">
    </div>

</section>


<section class="character-category">

    <h2>Player Titles</h2>

    <div id="titles-options"
         class="character-options">
    </div>

</section>


<section class="character-category">

    <h2>Effects</h2>

    <div id="effects-options"
         class="character-options">
    </div>

</section>
```

**Important:** this fixes the *unlock/options system*. Your actual character preview still needs to know how to visually render each shirt/hat/effect. The big improvement here is that **anything purchased from the shop will appear in the corresponding editor category because both systems now use the same unlock arrays.**
