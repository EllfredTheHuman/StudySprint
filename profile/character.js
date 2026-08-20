/* =====================================================
   CROWN
===================================================== */

if (
    equipped === "crown"
) {

    const crown =
        document.createElement("div");

    crown.className =
        "character-effect-element " +
        "character-crown";


    crown.innerHTML =
        `
        <span class="crown-point"></span>
        <span class="crown-point"></span>
        <span class="crown-point"></span>
        `;


    const goober =
        document.querySelector(
            "#equipped-goober > .goober"
        );


    if (goober) {

        goober.appendChild(
            crown
        );

    }

}
