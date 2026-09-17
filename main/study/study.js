const studyBanks = {

    science: [
        {
            name: "Rocks and Minerals",
            path: "../../questions/rocks-and-minerals.js",
            global: "rocksAndMineralsQuestions"
        },
        {
            name: "Energy and Forces",
            path: "../../questions/energy-and-forces.js",
            global: "energyAndForcesQuestions"
        }
    ],

    maths: [
        {
            name: "Year 9 Algebra",
            path: "../../questions/year-9-algebra.js",
            global: "year9AlgebraQuestions"
        },
        {
            name: "BIDMAS",
            path: "../../questions/bidmas.js",
            global: "bidmasQuestions"
        },
        {
            name: "Area and Perimeter",
            path: "../../questions/area-and-perimeter.js",
            global: "areaAndPerimeterQuestions"
        }
    ],

    english: [
        {
            name: "Film Study",
            path: "../../questions/film-study.js",
            global: "filmStudyQuestions"
        },
        {
            name: "Grammar",
            path: "../../questions/grammar.js",
            global: "grammarQuestions"
        },
        {
            name: "English",
            path: "../../questions/english-generic.js",
            global: "englishGenericQuestions"
        }
    ],

    humanities: [
        {
            name: "Humanities",
            path: "../../questions/humanities-generic-1.js",
            global: "humanitiesGenericQuestions"
        },
        {
            name: "Geography",
            path: "../../questions/geography.js",
            global: "geographyQuestions"
        }
    ],

    japanese: [
        {
            name: "Characters",
            path: "../../questions/japanese-characters.js",
            global: "japaneseCharactersQuestions"
        },
        {
            name: "People, Places and Vehicles",
            path: "../../questions/japanese-people-places-vehicles.js",
            global: "japanesePeoplePlacesVehiclesQuestions"
        },
        {
            name: "Travel",
            path: "../../questions/japanese-travel.js",
            global: "japaneseTravelQuestions"
        }
    ],

    french: [
        {
            name: "Characters",
            path: "../../questions/french-characters.js",
            global: "frenchCharactersQuestions"
        },
        {
            name: "People, Places and Vehicles",
            path: "../../questions/french-people-places-vehicles.js",
            global: "frenchPeoplePlacesVehiclesQuestions"
        },
        {
            name: "Travel",
            path: "../../questions/french-travel.js",
            global: "frenchTravelQuestions"
        }
    ]

};


const gameNames = {

    fishing: "Fishing",
    racing: "Racing",
    restaurant: "Restaurant",
    mining: "Mining",
    story: "Story"

};


const studyState = {

    game: null,
    subject: null,
    topic: null,
    questions: [],
    currentQuestion: 0,
    correct: 0,
    answered: 0,
    sessionCoins: 0,
    totalCoins: Number(localStorage.getItem("studysprint_coins")) || 0,
    questionLocked: false,
    loadedScripts: {}

};


const screens = {

    game: document.getElementById("game-screen"),
    subject: document.getElementById("subject-screen"),
    topic: document.getElementById("topic-screen"),
    ready: document.getElementById("ready-screen"),
    quiz: document.getElementById("quiz-screen"),
    break: document.getElementById("break-screen"),
    shop: document.getElementById("shop-screen"),
    collection: document.getElementById("collection-screen")

};


function showScreen(screen) {

    Object.values(screens).forEach(function (item) {
        item.classList.add("hidden");
    });

    screen.classList.remove("hidden");

}


function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

        const randomIndex = Math.floor(Math.random() * (i + 1));

        const temporary = copy[i];

        copy[i] = copy[randomIndex];

        copy[randomIndex] = temporary;

    }

    return copy;

}


function normaliseBank(bank) {

    if (Array.isArray(bank)) {
        return bank.flat(Infinity).filter(function (item) {
            return item && typeof item === "object";
        });
    }

    if (bank && typeof bank === "object") {

        const arrays = Object.values(bank).filter(function (item) {
            return Array.isArray(item);
        });

        if (arrays.length) {
            return arrays.flat(Infinity).filter(function (item) {
                return item && typeof item === "object";
            });
        }

    }

    return [];

}


function loadScript(path) {

    if (studyState.loadedScripts[path]) {
        return Promise.resolve();
    }

    return new Promise(function (resolve, reject) {

        const existing = document.querySelector(
            'script[data-study-bank="' + path + '"]'
        );

        if (existing) {
            studyState.loadedScripts[path] = true;
            resolve();
            return;
        }

        const script = document.createElement("script");

        script.src = path;
        script.dataset.studyBank = path;

        script.onload = function () {
            studyState.loadedScripts[path] = true;
            resolve();
        };

        script.onerror = function () {
            reject(new Error("Could not load question bank."));
        };

        document.body.appendChild(script);

    });

}


async function loadTopicQuestions(topic) {

    await loadScript(topic.path);

    const bank = window[topic.global];

    const questions = normaliseBank(bank);

    if (!questions.length) {
        throw new Error("No questions were found.");
    }

    return shuffle(questions);

}


function updateCoinDisplays() {

    document.getElementById("study-coins").textContent =
        studyState.totalCoins;

    document.getElementById("shop-coins").textContent =
        studyState.totalCoins;

}


function addCoins(amount) {

    if (!Number.isFinite(amount) || amount <= 0) {
        return;
    }

    studyState.sessionCoins += amount;
    studyState.totalCoins += amount;

    localStorage.setItem(
        "studysprint_coins",
        String(studyState.totalCoins)
    );

    updateCoinDisplays();

}


function chooseGame(game) {

    studyState.game = game;

    document.querySelectorAll(".active-game").forEach(function (item) {
        item.classList.remove("selected");
    });

    const gameArea = document.getElementById(game + "-game");

    if (gameArea) {
        gameArea.classList.add("selected");
    }

    document.getElementById("ready-game").textContent =
        gameNames[game] || "Study";

    showScreen(screens.subject);

}


function chooseSubject(subject) {

    studyState.subject = subject;

    const topicList = document.getElementById("topic-list");

    topicList.innerHTML = "";

    const topics = studyBanks[subject] || [];

    topics.forEach(function (topic) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "topic-button";
        button.textContent = topic.name;

        button.addEventListener("click", async function () {

            studyState.topic = topic;

            button.disabled = true;

            try {

                studyState.questions =
                    await loadTopicQuestions(topic);

                document.getElementById("ready-topic").textContent =
                    topic.name;

                document.getElementById("ready-title").textContent =
                    gameNames[studyState.game] + " is ready";

                showScreen(screens.ready);

            } catch (error) {

                alert(
                    "This question bank could not be loaded."
                );

            } finally {

                button.disabled = false;

            }

        });

        topicList.appendChild(button);

    });

    showScreen(screens.topic);

}


function beginStudy() {

    studyState.currentQuestion = 0;
    studyState.correct = 0;
    studyState.answered = 0;
    studyState.sessionCoins = 0;
    studyState.questionLocked = false;

    updateCoinDisplays();
    setupGameState();

    showScreen(screens.quiz);

    showQuestion();

}


function setupGameState() {

    if (studyState.game === "fishing") {

        document.getElementById("fishing-message").textContent =
            "A fish is nearby. Answer correctly to catch it.";

    }

    if (studyState.game === "racing") {

        document.getElementById("race-progress").style.left =
            "12%";

        document.getElementById("racing-message").textContent =
            "Get the answer right to move forward.";

    }

    if (studyState.game === "restaurant") {

        document.getElementById("restaurant-order").textContent =
            getRandomOrder();

        document.getElementById("restaurant-message").textContent =
            "Answer correctly to complete the order.";

    }

    if (studyState.game === "mining") {

        document.getElementById("mine-ore").classList.add("hidden");

        document.getElementById("mining-message").textContent =
            "Answer correctly to break the rock.";

    }

    if (studyState.game === "story") {

        document.getElementById("story-message").textContent =
            "Answer correctly to take your turn.";

    }

}


function getRandomOrder() {

    const orders = [
        "Burger",
        "Soup",
        "Fish and chips",
        "Pasta",
        "Sandwich",
        "Pizza"
    ];

    return orders[
        Math.floor(Math.random() * orders.length)
    ];

}


function getQuestionType(question) {

    if (question.type === "written") {
        return "written";
    }

    return "multiple";

}


function showQuestion() {

    if (studyState.currentQuestion >= studyState.questions.length) {

        finishStudy();

        return;
    }

    const question =
        studyState.questions[studyState.currentQuestion];

    studyState.questionLocked = false;

    document.getElementById("feedback").textContent = "";

    document
        .getElementById("next-question")
        .classList.add("hidden");

    document
        .getElementById("written-area")
        .classList.add("hidden");

    const answerArea =
        document.getElementById("answer-area");

    answerArea.innerHTML = "";

    document.getElementById("question-text").textContent =
        question.question || "Question";

    const type = getQuestionType(question);

    document.getElementById("question-type").textContent =
        type === "written" ? "WRITE YOUR ANSWER" : "QUESTION";

    if (type === "written") {

        document
            .getElementById("written-area")
            .classList.remove("hidden");

        document.getElementById("written-answer").value = "";

        return;

    }

    const answers = Array.isArray(question.answers)
        ? shuffle(question.answers)
        : [];

    answers.forEach(function (answer) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", function () {

            answerMultipleChoice(
                answer,
                question,
                button
            );

        });

        answerArea.appendChild(button);

    });

}


function answerMultipleChoice(answer, question, button) {

    if (studyState.questionLocked) {
        return;
    }

    studyState.questionLocked = true;
    studyState.answered++;

    const correct =
        String(answer).trim().toLowerCase() ===
        String(question.correctAnswer).trim().toLowerCase();

    if (correct) {

        studyState.correct++;

        button.classList.add("correct");

        const reward = getGameReward();

        addCoins(reward);

        showCorrectGameResult(reward);

        document.getElementById("feedback").textContent =
            "Correct. You earned " + reward + " coins.";

    } else {

        button.classList.add("wrong");

        showWrongGameResult();

        document.getElementById("feedback").textContent =
            "Not quite. No coins this time.";

    }

    document.querySelectorAll(".answer-button").forEach(function (item) {
        item.disabled = true;
    });

    document
        .getElementById("next-question")
        .classList.remove("hidden");

}


function submitWritten() {

    if (studyState.questionLocked) {
        return;
    }

    const question =
        studyState.questions[studyState.currentQuestion];

    const input =
        document.getElementById("written-answer");

    const answer =
        input.value.trim().toLowerCase();

    if (!answer) {
        return;
    }

    studyState.questionLocked = true;
    studyState.answered++;

    const acceptedAnswers =
        Array.isArray(question.acceptedAnswers)
            ? question.acceptedAnswers
            : [];

    const correct =
        acceptedAnswers.some(function (item) {

            return String(item).trim().toLowerCase() === answer;

        });

    if (correct) {

        studyState.correct++;

        const reward = getGameReward() + 5;

        addCoins(reward);

        showCorrectGameResult(reward);

        document.getElementById("feedback").textContent =
            "Correct. You earned " + reward + " coins.";

    } else {

        showWrongGameResult();

        document.getElementById("feedback").textContent =
            "Not quite. No coins this time.";

    }

    document.getElementById("submit-written").disabled = true;

    document
        .getElementById("next-question")
        .classList.remove("hidden");

}


function getGameReward() {

    if (studyState.game === "fishing") {
        return 10;
    }

    if (studyState.game === "racing") {
        return 10;
    }

    if (studyState.game === "restaurant") {
        return 12;
    }

    if (studyState.game === "mining") {
        return 10;
    }

    if (studyState.game === "story") {
        return 12;
    }

    return 10;

}


function showCorrectGameResult(reward) {

    if (studyState.game === "fishing") {

        document.getElementById("fishing-message").textContent =
            "Catch! +" + reward + " coins.";

    }

    if (studyState.game === "racing") {

        const progress =
            document.getElementById("race-progress");

        const current =
            parseFloat(progress.style.left) || 12;

        progress.style.left =
            Math.min(current + 15, 78) + "%";

        document.getElementById("racing-message").textContent =
            "You moved forward. +" + reward + " coins.";

    }

    if (studyState.game === "restaurant") {

        document.getElementById("restaurant-message").textContent =
            "Order complete. +" + reward + " coins.";

    }

    if (studyState.game === "mining") {

        document.getElementById("mine-ore").classList.remove("hidden");

        document.getElementById("mining-message").textContent =
            "Rock broken. You found ore. +" + reward + " coins.";

    }

    if (studyState.game === "story") {

        document.getElementById("story-message").textContent =
            "Your turn succeeds. +" + reward + " coins.";

    }

}


function showWrongGameResult() {

    if (studyState.game === "fishing") {

        document.getElementById("fishing-message").textContent =
            "The fish escaped.";

    }

    if (studyState.game === "racing") {

        document.getElementById("racing-message").textContent =
            "You lost some ground.";

    }

    if (studyState.game === "restaurant") {

        document.getElementById("restaurant-message").textContent =
            "The order was not completed.";

    }

    if (studyState.game === "mining") {

        document.getElementById("mining-message").textContent =
            "The rock stayed intact.";

    }

    if (studyState.game === "story") {

        document.getElementById("story-message").textContent =
            "Your turn failed.";

    }

}


function nextQuestion() {

    studyState.currentQuestion++;

    document.getElementById("submit-written").disabled = false;

    showQuestion();

}


function finishStudy() {

    document.getElementById("break-game-title").textContent =
        gameNames[studyState.game] + " break";

    document.getElementById("break-result").textContent =
        studyState.correct +
        " correct answers out of " +
        studyState.answered +
        ".";

    document.getElementById("break-coins-earned").textContent =
        studyState.sessionCoins;

    showScreen(screens.break);

}


function continueStudying() {

    studyState.questions =
        shuffle(studyState.questions);

    studyState.currentQuestion = 0;
    studyState.correct = 0;
    studyState.answered = 0;
    studyState.sessionCoins = 0;

    setupGameState();

    showScreen(screens.quiz);

    showQuestion();

}


const shopItems = [

    {
        id: "fishing-rod-2",
        name: "Reinforced Rod",
        description: "A stronger rod for fishing.",
        cost: 75,
        game: "fishing"
    },

    {
        id: "fishing-rod-3",
        name: "Deepwater Rod",
        description: "Built for rarer fish.",
        cost: 180,
        game: "fishing"
    },

    {
        id: "race-engine-2",
        name: "Better Engine",
        description: "Push further during races.",
        cost: 90,
        game: "racing"
    },

    {
        id: "restaurant-upgrade-2",
        name: "Bigger Kitchen",
        description: "Handle more complicated orders.",
        cost: 120,
        game: "restaurant"
    },

    {
        id: "pickaxe-2",
        name: "Iron Pickaxe",
        description: "Break tougher rocks.",
        cost: 80,
        game: "mining"
    },

    {
        id: "pickaxe-3",
        name: "Diamond Pickaxe",
        description: "Reach the valuable stuff.",
        cost: 200,
        game: "mining"
    }

];


function getOwnedItems() {

    try {

        return JSON.parse(
            localStorage.getItem("studysprint_owned_items")
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveOwnedItems(items) {

    localStorage.setItem(
        "studysprint_owned_items",
        JSON.stringify(items)
    );

}


function renderShop() {

    const container =
        document.getElementById("shop-items");

    const owned =
        getOwnedItems();

    container.innerHTML = "";

    shopItems.forEach(function (item) {

        const card = document.createElement("div");

        card.className = "shop-item";

        const art = document.createElement("div");

        art.className = "shop-art";

        const details = document.createElement("div");

        const title = document.createElement("h2");

        title.textContent = item.name;

        const description = document.createElement("p");

        description.textContent =
            item.description +
            " Cost: " +
            item.cost +
            " coins.";

        details.appendChild(title);
        details.appendChild(description);

        const buy = document.createElement("button");

        buy.type = "button";
        buy.className = "buy-button";

        if (owned.includes(item.id)) {

            buy.textContent = "Owned";
            buy.classList.add("owned");
            buy.disabled = true;

        } else {

            buy.textContent = "Buy";

            buy.addEventListener("click", function () {
                buyShopItem(item);
            });

        }

        card.appendChild(art);
        card.appendChild(details);
        card.appendChild(buy);

        container.appendChild(card);

    });

}


function buyShopItem(item) {

    if (studyState.totalCoins < item.cost) {
        return;
    }

    const owned =
        getOwnedItems();

    if (owned.includes(item.id)) {
        return;
    }

    studyState.totalCoins -= item.cost;

    localStorage.setItem(
        "studysprint_coins",
        String(studyState.totalCoins)
    );

    owned.push(item.id);

    saveOwnedItems(owned);

    updateCoinDisplays();

    renderShop();

    renderCollection();

}


function renderCollection() {

    const container =
        document.getElementById("collection-items");

    const owned =
        getOwnedItems();

    container.innerHTML = "";

    if (!owned.length) {

        const empty = document.createElement("div");

        empty.className = "collection-item";

        empty.innerHTML =
            "<h2>Nothing yet</h2><p>Keep studying to earn coins and unlock things.</p>";

        container.appendChild(empty);

        return;

    }

    owned.forEach(function (id) {

        const item =
            shopItems.find(function (shopItem) {
                return shopItem.id === id;
            });

        if (!item) {
            return;
        }

        const card = document.createElement("div");

        card.className = "collection-item";

        const title = document.createElement("h2");

        title.textContent = item.name;

        const description = document.createElement("p");

        description.textContent =
            item.description;

        card.appendChild(title);
        card.appendChild(description);

        container.appendChild(card);

    });

}


function leaveStudy() {

    studyState.questionLocked = true;

    showScreen(screens.game);

}


document.querySelectorAll(".game-card").forEach(function (button) {

    button.addEventListener("click", function () {

        chooseGame(button.dataset.game);

    });

});


document.querySelectorAll(".subject-button").forEach(function (button) {

    button.addEventListener("click", function () {

        chooseSubject(button.dataset.subject);

    });

});


document
    .getElementById("back-to-games")
    .addEventListener("click", function () {

        showScreen(screens.game);

    });


document
    .getElementById("back-to-subjects")
    .addEventListener("click", function () {

        showScreen(screens.subject);

    });


document
    .getElementById("back-to-topics")
    .addEventListener("click", function () {

        showScreen(screens.topic);

    });


document
    .getElementById("start-study")
    .addEventListener("click", beginStudy);


document
    .getElementById("leave-study")
    .addEventListener("click", leaveStudy);


document
    .getElementById("next-question")
    .addEventListener("click", nextQuestion);


document
    .getElementById("submit-written")
    .addEventListener("click", submitWritten);


document
    .getElementById("written-answer")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            submitWritten();
        }

    });


document
    .getElementById("continue-studying")
    .addEventListener("click", continueStudying);


document
    .getElementById("open-shop")
    .addEventListener("click", function () {

        renderShop();
        showScreen(screens.shop);

    });


document
    .getElementById("open-garden")
    .addEventListener("click", function () {

        renderCollection();
        showScreen(screens.collection);

    });


document
    .getElementById("back-from-shop")
    .addEventListener("click", function () {

        showScreen(screens.break);

    });


document
    .getElementById("back-from-collection")
    .addEventListener("click", function () {

        showScreen(screens.break);

    });


updateCoinDisplays();
