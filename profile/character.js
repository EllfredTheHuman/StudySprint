/* =========================================================
   STUDYSPRINT CHARACTER EDITOR
========================================================= */


/* =========================================================
   PAGE LAYOUT
========================================================= */

.character-editor {
    width: 100%;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 40px;

    padding: 40px 20px 80px;
}


/* =========================================================
   CHARACTER PREVIEW
========================================================= */

.banner-preview {
    position: relative;

    width: 700px;
    max-width: 92%;
    min-height: 320px;

    box-sizing: border-box;

    padding: 35px;

    border-radius: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
    isolation: isolate;

    background:
        linear-gradient(
            135deg,
            #7c3aed,
            #6366f1
        );

    box-shadow:
        0 20px 50px
        rgba(0, 0, 0, .15);
}


/* =========================================================
   BANNERS
========================================================= */

.banner-preview.blue {
    background:
        linear-gradient(
            135deg,
            #2563eb,
            #38bdf8
        );
}

.banner-preview.green {
    background:
        linear-gradient(
            135deg,
            #16a34a,
            #4ade80
        );
}

.banner-preview.sprint-grid {
    background:
        linear-gradient(
            135deg,
            #312e81,
            #6366f1
        );
}

.banner-preview.purple-grid {
    background:
        linear-gradient(
            135deg,
            #7c3aed,
            #c084fc
        );
}

.banner-preview.neon-blue {
    background:
        linear-gradient(
            135deg,
            #0891b2,
            #22d3ee
        );
}

.banner-preview.galaxy-banner {
    background:
        linear-gradient(
            135deg,
            #111827,
            #4c1d95
        );
}

.banner-preview.gold-banner {
    background:
        linear-gradient(
            135deg,
            #92400e,
            #f59e0b
        );
}


/* =========================================================
   GRID EFFECTS
========================================================= */

.banner-preview.sprint-grid::before,
.banner-preview.purple-grid::before,
.banner-preview.neon-blue::before {
    content: "";

    position: absolute;
    inset: 0;

    background-image:
        linear-gradient(
            rgba(255, 255, 255, .12) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(255, 255, 255, .12) 1px,
            transparent 1px
        );

    background-size: 25px 25px;

    pointer-events: none;

    z-index: 0;
}


/* =========================================================
   PLAYER INFORMATION
========================================================= */

.player-info {
    position: absolute;

    left: 35px;
    top: 30px;

    width: calc(100% - 70px);
    max-width: calc(100% - 70px);

    box-sizing: border-box;

    color: white;

    z-index: 50;

    pointer-events: none;
}

.player-info h2 {
    margin: 0 0 6px;

    font-size: 34px;
    line-height: 1.1;

    font-weight: 900;

    overflow-wrap: anywhere;

    text-shadow:
        0 3px 8px
        rgba(0, 0, 0, .25);
}

.player-info p {
    margin: 0;

    font-size: 19px;
    line-height: 1.2;

    opacity: .9;
}


/* =========================================================
   CHARACTER POSITIONING BOX
========================================================= */

.character {
    position: relative;

    width: 180px;
    height: 235px;

    flex-shrink: 0;

    margin-top: 70px;

    z-index: 10;

    overflow: visible;
}


/* =========================================================
   GOOBER CONTAINER
   EXACT SAME 140×150 SYSTEM AS SHOP
========================================================= */

#equipped-goober {
    position: absolute !important;

    left: 50% !important;
    top: auto !important;
    right: auto !important;
    bottom: 0 !important;

    width: 140px !important;
    height: 150px !important;

    margin: 0 !important;
    padding: 0 !important;

    box-sizing: border-box !important;

    transform:
        translateX(-50%) !important;

    display: block !important;

    overflow: visible !important;

    z-index: 30 !important;

    pointer-events: none !important;
}


/* =========================================================
   ACTUAL GOOBER
========================================================= */

#equipped-goober > .goober {
    position: relative !important;

    left: auto !important;
    right: auto !important;
    top: auto !important;
    bottom: auto !important;

    width: 140px !important;
    height: 150px !important;

    margin: 0 !important;
    padding: 0 !important;

    box-sizing: border-box !important;

    transform: none !important;

    overflow: visible !important;

    flex-shrink: 0 !important;
}


/* =========================================================
   GOOBER PARTS
========================================================= */

#equipped-goober .goober-body {
    position: absolute;

    width: 108px;
    height: 105px;

    left: 16px;
    top: 27px;

    border-radius:
        45% 45% 42% 42%;

    z-index: 3;
}

#equipped-goober .goober-face {
    position: absolute;

    inset: 0;

    z-index: 8;

    pointer-events: none;
}

#equipped-goober .goober-feet {
    position: absolute;

    inset: 0;

    z-index: 2;

    pointer-events: none;
}


/* =========================================================
   CROWN
   SMALL ACCESSORY — DOES NOT AFFECT POSITION
========================================================= */

#equipped-goober .character-crown {
    position: absolute !important;

    width: 42px !important;
    height: 30px !important;

    /*
       The Goober is 140px wide.
       49px + 42px = 91px,
       leaving 49px on the other side.
       This keeps the crown visually centred.
    */

    left: 49px !important;
    top: -6px !important;

    right: auto !important;
    bottom: auto !important;

    margin: 0 !important;
    padding: 0 !important;

    box-sizing: border-box !important;

    transform: none !important;

    background:
        linear-gradient(
            135deg,
            #fde68a,
            #facc15 50%,
            #eab308
        ) !important;

    clip-path:
        polygon(
            0 100%,
            8% 20%,
            32% 58%,
            50% 0,
            68% 58%,
            92% 20%,
            100% 100%
        ) !important;

    filter:
        drop-shadow(
            0 2px 3px
            rgba(0, 0, 0, .25)
        );

    z-index: 100 !important;

    pointer-events: none !important;
}


/* =========================================================
   CROWN BAND
========================================================= */

#equipped-goober .character-crown::after {
    content: "";

    position: absolute;

    left: 4px;
    right: 4px;

    bottom: 0;

    height: 7px;

    background:
        linear-gradient(
            90deg,
            #f59e0b,
            #facc15,
            #f59e0b
        );

    border-radius:
        2px 2px 4px 4px;
}


/* =========================================================
   CROWN JEWELS
========================================================= */

#equipped-goober .character-crown::before {
    content: "";

    position: absolute;

    width: 5px;
    height: 5px;

    left: 18px;
    top: 15px;

    border-radius: 50%;

    background: #60a5fa;

    box-shadow:
        -10px 3px 0 #f472b6,
        10px 3px 0 #8b5cf6;
}


/* =========================================================
   OLD CROWN ELEMENTS
   Disabled so they cannot interfere
========================================================= */

#equipped-goober .character-crown .crown-point {
    display: none !important;
}


/* =========================================================
   CROWN EFFECT
========================================================= */

.character.effect-crown::before {
    content: "";

    position: absolute;

    left: 50%;
    top: 35px;

    width: 90px;
    height: 70px;

    transform:
        translateX(-50%);

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(250, 204, 21, .25),
            transparent 70%
        );

    filter:
        blur(10px);

    z-index: 1;

    pointer-events: none;

    animation:
        crownGlow 1.5s ease-in-out infinite alternate;
}


/* =========================================================
   OLD CHARACTER SYSTEM
========================================================= */

.classic-character {
    position: absolute;

    inset: 0;

    display: none;

    width: 100%;
    height: 100%;

    pointer-events: none;
}


/* =========================================================
   CLASSIC CHARACTER
========================================================= */

.character-head {
    position: absolute;

    width: 105px;
    height: 105px;

    left: 38px;
    top: 28px;

    background: #f6c7a8;

    border-radius: 50%;
}

.character-face {
    position: absolute;

    width: 7px;
    height: 7px;

    left: 56px;
    top: 73px;

    background: #1f2937;

    border-radius: 50%;

    box-shadow:
        27px 0 0
        #1f2937;
}

.character-hair {
    position: absolute;

    width: 98px;
    height: 43px;

    left: 41px;
    top: 25px;

    background: #78350f;

    border-radius:
        50px 50px 15px 15px;
}

.character-hair.black {
    background: #111827;
}

.character-hair.blonde {
    background: #facc15;
}

.character-body {
    position: absolute;

    width: 92px;
    height: 75px;

    left: 44px;
    top: 116px;

    background: #3b82f6;

    border-radius:
        30px 30px 15px 15px;
}

.character-leg {
    position: absolute;

    width: 30px;
    height: 55px;

    top: 177px;

    border-radius: 12px;

    background: #2563eb;
}

.character-leg-left {
    left: 53px;
}

.character-leg-right {
    left: 95px;
}


/* =========================================================
   CUSTOMIZATION PANELS
========================================================= */

.customization-section {
    width: 700px;
    max-width: 92%;

    box-sizing: border-box;

    background: white;

    padding: 30px;

    border-radius: 30px;

    box-shadow:
        0 12px 30px
        rgba(0, 0, 0, .08);
}

.customization-section h2 {
    margin-top: 0;
    margin-bottom: 18px;
}

.selector-description {
    margin-top: -8px;
    margin-bottom: 18px;

    color: #64748b;
}


/* =========================================================
   CUSTOM DROPDOWNS
========================================================= */

.options {
    width: 100%;
}

.custom-dropdown-wrapper {
    position: relative;

    width: 100%;
}

.custom-dropdown-selected {
    width: 100%;

    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 15px;

    padding: 14px 16px;

    border:
        2px solid
        #e0e7ff;

    border-radius: 14px;

    background: #f8faff;

    color: #312e81;

    font-size: 16px;

    font-weight: 800;

    cursor: pointer;

    text-align: left;

    outline: none;

    transition:
        background .15s ease,
        border-color .15s ease,
        box-shadow .15s ease;
}

.custom-dropdown-selected:hover {
    background: #eef2ff;

    border-color: #c7d2fe;
}

.custom-dropdown-wrapper.open
.custom-dropdown-selected {
    background: #eef2ff;

    border-color: #6366f1;

    box-shadow:
        0 0 0 4px
        rgba(99, 102, 241, .12);
}

.custom-dropdown-text {
    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;
}

.custom-dropdown-arrow {
    flex-shrink: 0;

    font-size: 12px;

    transition:
        transform .15s ease;
}

.custom-dropdown-wrapper.open
.custom-dropdown-arrow {
    transform:
        rotate(180deg);
}


/* =========================================================
   DROPDOWN MENU
========================================================= */

.custom-dropdown-menu {
    position: absolute;

    left: 0;
    right: 0;

    top:
        calc(100% + 8px);

    z-index: 500;

    box-sizing: border-box;

    display: flex;
    flex-direction: column;

    gap: 5px;

    max-height: 280px;

    overflow-y: auto;

    padding: 8px;

    background: white;

    border:
        2px solid
        #e0e7ff;

    border-radius: 16px;

    box-shadow:
        0 15px 35px
        rgba(0, 0, 0, .12);

    opacity: 0;

    visibility: hidden;

    pointer-events: none;

    transform:
        translateY(-6px);

    transition:
        opacity .15s ease,
        visibility .15s ease,
        transform .15s ease;
}

.custom-dropdown-wrapper.open
.custom-dropdown-menu {
    opacity: 1;

    visibility: visible;

    pointer-events: auto;

    transform:
        translateY(0);
}


/* =========================================================
   DROPDOWN OPTIONS
========================================================= */

.custom-dropdown-option {
    width: 100%;

    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px 14px;

    border: none;

    border-radius: 11px;

    background: transparent;

    color: #3730a3;

    font-size: 15px;

    font-weight: 800;

    cursor: pointer;

    text-align: left;
}

.custom-dropdown-option:hover {
    background: #eef2ff;
}

.custom-dropdown-option.selected {
    background: #4f46e5;

    color: white;
}

.custom-dropdown-option:disabled {
    cursor: not-allowed;

    opacity: .55;
}

.dropdown-check {
    font-size: 16px;

    flex-shrink: 0;
}


/* =========================================================
   CHARACTER EFFECT CONTAINER
========================================================= */

.character-effects {
    position: absolute;

    left: 50%;
    top: 50%;

    width: 180px;
    height: 190px;

    transform:
        translate(-50%, -50%);

    pointer-events: none;

    z-index: 20;
}


/* =========================================================
   EFFECT BASE
========================================================= */

.character.effect-rainbow::before,
.character.effect-fire::before,
.character.effect-shadow::before,
.character.effect-crystal::before,
.character.effect-cosmic-aura::before {
    content: "";

    position: absolute;

    left: 50%;
    top: 50%;

    transform:
        translate(-50%, -50%);

    pointer-events: none;
}


/* =========================================================
   RAINBOW
========================================================= */

.character.effect-rainbow::before {
    width: 145px;
    height: 145px;

    border-radius: 50%;

    background:
        conic-gradient(
            #ef4444,
            #f59e0b,
            #eab308,
            #22c55e,
            #06b6d4,
            #3b82f6,
            #8b5cf6,
            #ec4899,
            #ef4444
        );

    filter: blur(12px);

    opacity: .28;

    animation:
        characterRainbow 3s linear infinite;

    z-index: 0;
}


/* =========================================================
   FIRE
========================================================= */

.character.effect-fire::before {
    width: 135px;
    height: 145px;

    border-radius: 50%;

    background:
        radial-gradient(
            ellipse at 50% 70%,
            rgba(250, 204, 21, .7),
            rgba(249, 115, 22, .45) 38%,
            rgba(239, 68, 68, .2) 62%,
            transparent 75%
        );

    filter: blur(8px);

    animation:
        characterFire .7s ease-in-out infinite alternate;

    z-index: 0;
}


/* =========================================================
   SHADOW
========================================================= */

.character.effect-shadow::before {
    width: 115px;
    height: 28px;

    left: 50%;
    top: 78%;

    border-radius: 50%;

    background:
        rgba(15, 23, 42, .38);

    filter: blur(7px);

    box-shadow:
        0 5px 15px
        rgba(15, 23, 42, .35);

    z-index: 0;
}


/* =========================================================
   CRYSTAL
========================================================= */

.character.effect-crystal::before {
    width: 135px;
    height: 145px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(103, 232, 249, .15),
            transparent 68%
        );

    border:
        3px solid
        rgba(103, 232, 249, .5);

    box-shadow:
        0 0 18px
        rgba(103, 232, 249, .5);

    animation:
        characterCrystal 1.5s ease-in-out infinite alternate;

    z-index: 0;
}


/* =========================================================
   COSMIC AURA
========================================================= */

.character.effect-cosmic-aura::before {
    width: 150px;
    height: 150px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(168, 85, 247, .3),
            rgba(59, 130, 246, .12),
            transparent 70%
        );

    filter: blur(8px);

    animation:
        characterCosmic 2s ease-in-out infinite alternate;

    z-index: 0;
}


/* =========================================================
   SPARKLES
========================================================= */

.effect-sparkle-dot {
    position: absolute;

    width: 6px;
    height: 6px;

    background: white;

    border-radius: 50%;

    box-shadow:
        0 0 8px
        rgba(255, 255, 255, .95);

    animation:
        sparkleFloat 1.2s ease-in-out infinite alternate;

    z-index: 10;
}

.effect-sparkle-dot:nth-child(1) {
    left: 22px;
    top: 60px;
}

.effect-sparkle-dot:nth-child(2) {
    right: 20px;
    top: 70px;
}

.effect-sparkle-dot:nth-child(3) {
    left: 38px;
    top: 125px;
}

.effect-sparkle-dot:nth-child(4) {
    right: 35px;
    top: 135px;
}

.effect-sparkle-dot:nth-child(5) {
    left: 58px;
    top: 32px;
}

.effect-sparkle-dot:nth-child(6) {
    right: 55px;
    top: 42px;
}


/* =========================================================
   OLD BUTTON SUPPORT
========================================================= */

.character-option {
    width: 100%;

    box-sizing: border-box;

    border: none;

    padding: 12px 18px;

    border-radius: 14px;

    background: #eef2ff;

    color: #3730a3;

    font-weight: 800;

    cursor: pointer;
}

.character-option:hover {
    background: #e0e7ff;
}

.character-option.selected {
    background: #4f46e5;

    color: white;
}

.character-option:disabled {
    cursor: not-allowed;

    opacity: .55;
}


/* =========================================================
   HEADER
========================================================= */

body > header {
    position: relative;

    z-index: 1000;
}

body > header[style] {
    z-index: 1000;
}


/* =========================================================
   FOOTER
========================================================= */

footer {
    position: relative;

    z-index: 1000;
}


/* =========================================================
   ANIMATIONS
========================================================= */

@keyframes gooberCrownFloat {
    from {
        transform:
            translateY(1px)
            rotate(-2deg);
    }

    to {
        transform:
            translateY(-3px)
            rotate(2deg);
    }
}

@keyframes crownGlow {
    from {
        opacity: .45;

        transform:
            translateX(-50%)
            scale(.92);
    }

    to {
        opacity: .8;

        transform:
            translateX(-50%)
            scale(1.04);
    }
}

@keyframes characterRainbow {
    from {
        transform:
            translate(-50%, -50%)
            rotate(0deg);
    }

    to {
        transform:
            translate(-50%, -50%)
            rotate(360deg);
    }
}

@keyframes characterFire {
    from {
        transform:
            translate(-50%, -50%)
            scale(.94);
    }

    to {
        transform:
            translate(-50%, -50%)
            scale(1.06);
    }
}

@keyframes characterCrystal {
    from {
        opacity: .45;

        transform:
            translate(-50%, -50%)
            scale(.96);
    }

    to {
        opacity: .85;

        transform:
            translate(-50%, -50%)
            scale(1.03);
    }
}

@keyframes characterCosmic {
    from {
        opacity: .45;

        transform:
            translate(-50%, -50%)
            scale(.94);
    }

    to {
        opacity: .85;

        transform:
            translate(-50%, -50%)
            scale(1.04);
    }
}

@keyframes sparkleFloat {
    from {
        opacity: .35;

        transform:
            scale(.75);
    }

    to {
        opacity: 1;

        transform:
            scale(1.25);
    }
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 700px) {

    .character-editor {
        padding:
            25px 15px 60px;

        gap: 25px;
    }

    .banner-preview {
        width: 100%;
        max-width: 100%;

        min-height: 360px;

        padding: 25px;

        border-radius: 30px;
    }

    .player-info {
        left: 20px;
        top: 20px;

        width:
            calc(100% - 40px);

        max-width:
            calc(100% - 40px);

        text-align: center;
    }

    .player-info h2 {
        font-size: 28px;
    }

    .player-info p {
        font-size: 16px;
    }

    .character {
        margin-top: 80px;
    }

    .customization-section {
        width: 100%;
        max-width: 100%;

        padding: 22px;

        border-radius: 24px;
    }

    .custom-dropdown-menu {
        max-height: 240px;
    }
}


/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 400px) {

    .banner-preview {
        min-height: 340px;
    }

    .player-info h2 {
        font-size: 24px;
    }

    .player-info p {
        font-size: 14px;
    }
}
