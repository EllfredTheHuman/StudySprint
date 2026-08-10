let characterData = JSON.parse(
localStorage.getItem("characterData")
) || {

```
skin: "light",
hair: "brown",
shirt: "blue",
pants: "black",
hat: "none",
backpack: "none",
banner: "purple",
username: "Player",
tag: "New Squeezer"
```

};

function setOption(type, value) {

```
characterData[type] = value;

updateCharacter();
```

}

function setBanner(value) {

```
characterData.banner = value;

updateCharacter();
```

}

function updateUsername() {

```
characterData.username =
    document.getElementById("username").value
    || "Player";

document.getElementById(
    "preview-username"
).textContent =
    characterData.username;
```

}

function updateTag() {

```
characterData.tag =
    document.getElementById("player-tag").value
    || "New Squeezer";

document.getElementById(
    "preview-tag"
).textContent =
    characterData.tag;
```

}

function updateCharacter() {

```
const character =
    document.getElementById("character");


const head =
    document.querySelector(
        ".character-head"
    );


const hair =
    document.getElementById(
        "character-hair"
    );


const body =
    document.querySelector(
        ".character-body"
    );


const pants =
    document.querySelector(
        ".character-pants"
    );


const hat =
    document.querySelector(
        ".hat"
    );


const backpack =
    document.querySelector(
        ".backpack"
    );


if(characterData.skin === "light") {

    head.style.background = "#ffd1a4";

}

else if(characterData.skin === "medium") {

    head.style.background = "#c68642";

}

else {

    head.style.background = "#6b4423";

}


hair.className =
    "character-hair " +
    characterData.hair;


if(characterData.shirt === "blue") {

    body.style.background = "#6366f1";

}

else if(characterData.shirt === "red") {

    body.style.background = "#ef4444";

}

else {

    body.style.background = "#22c55e";

}


if(characterData.pants === "blue") {

    pants.style.background = "#2563eb";

}

else if(characterData.pants === "brown") {

    pants.style.background = "#92400e";

}

else {

    pants.style.background = "#374151";

}


hat.className =
    "hat " +
    characterData.hat;


backpack.className =
    "backpack " +
    characterData.backpack;


document.getElementById(
    "preview-username"
).textContent =
    characterData.username;


document.getElementById(
    "preview-tag"
).textContent =
    characterData.tag;


const banner =
    document.getElementById(
        "banner"
    );

banner.className =
    "banner-preview " +
    characterData.banner;
```

}

function saveCharacter() {

```
localStorage.setItem(
    "characterData",
    JSON.stringify(characterData)
);


window.location.href =
    "index.html";
```

}

document.getElementById(
"username"
).value =
characterData.username;

document.getElementById(
"player-tag"
).value =
characterData.tag;

updateCharacter();

