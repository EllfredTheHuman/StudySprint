```javascript
const topics = {

    science: [
        {
            name: "The Heart",
            description: "The heart and circulatory system."
        },
        {
            name: "Electricity",
            description: "Circuits, current and voltage."
        }
    ],

    maths: [
        {
            name: "Algebra",
            description: "Variables, expressions and equations."
        },
        {
            name: "Geometry",
            description: "Shapes, angles and measurement."
        },
        {
            name: "BIDMAS",
            description: "The order of mathematical operations."
        }
    ],

    english: [
        {
            name: "Grammar",
            description: "Words, sentences and language."
        },
        {
            name: "Literature",
            description: "Texts, characters, themes and ideas."
        },
        {
            name: "Poetry",
            description: "Poetic techniques and structure."
        }
    ],

    humanities: [
        {
            name: "Geography",
            description: "Places, environments and people."
        },
        {
            name: "History",
            description: "Events and societies from the past."
        },
        {
            name: "Civics",
            description: "Government, citizenship and society."
        }
    ],

    french: [
        {
            name: "Vocabulary",
            description: "Build your French vocabulary."
        },
        {
            name: "Grammar",
            description: "French sentence structure."
        },
        {
            name: "Conversation",
            description: "Useful French conversations."
        }
    ],

    japanese: [
        {
            name: "Hiragana",
            description: "Learn the hiragana writing system."
        },
        {
            name: "Vocabulary",
            description: "Build your Japanese vocabulary."
        },
        {
            name: "Grammar",
            description: "Japanese sentence structure."
        }
    ]

};


const subjectButtons =
    document.querySelectorAll(".subject-button");

const topicList =
    document.getElementById("topicList");

const topicHint =
    document.getElementById("topicHint");

const startButton =
    document.getElementById("startButton");


let selectedSubject = null;
let selectedTopic = null;


// =========================
// SUBJECT SELECTION
// =========================

subjectButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedSubject =
            button.dataset.subject;

        selectedTopic = null;

        subjectButtons.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        displayTopics(selectedSubject);

        updateStartButton();

    });

});


// =========================
// DISPLAY TOPICS
// =========================

function displayTopics(subject) {

    topicList.innerHTML = "";

    topicHint.textContent =
        "Choose a topic.";


    topics[subject].forEach(topic => {

        const button =
            document.createElement("button");

        button.className =
            "topic-option";


        button.innerHTML = `
            <div>
                <div class="topic-name">
                    ${topic.name}
                </div>

                <div class="topic-description">
                    ${topic.description}
                </div>
            </div>

            <span class="topic-check">
                ✓
            </span>
        `;


        button.addEventListener("click", () => {

            document
                .querySelectorAll(".topic-option")
                .forEach(item => {
                    item.classList.remove("selected");
                });

            button.classList.add("selected");

            selectedTopic =
                topic.name;

            updateStartButton();

        });


        topicList.appendChild(button);

    });

}


// =========================
// START BUTTON
// =========================

function updateStartButton() {

    if (selectedSubject && selectedTopic) {

        startButton.disabled = false;

    } else {

        startButton.disabled = true;

    }

}


startButton.addEventListener("click", () => {

    if (!selectedSubject || !selectedTopic) {
        return;
    }

    const subject =
        encodeURIComponent(selectedSubject);

    const topic =
        encodeURIComponent(selectedTopic);


    window.location.href =
        `quiz.html?subject=${subject}&topic=${topic}`;

});
```
