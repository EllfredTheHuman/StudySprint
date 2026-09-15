var joinInput = document.getElementById("room-code-input");

if (joinInput) {

    joinInput.addEventListener("input", function () {

        var value = joinInput.value;

        value = value
            .replace(/[^a-zA-Z0-9]/g, "")
            .toUpperCase()
            .slice(0, 6);

        joinInput.value = value;
    });

    joinInput.addEventListener("keydown", function (event) {

        if (
            event.key === "Backspace" ||
            event.key === "Delete" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "Tab"
        ) {
            return;
        }

        if (event.key.length === 1) {
            if (!/[a-zA-Z0-9]/.test(event.key)) {
                event.preventDefault();
            }
        }
    });

}
