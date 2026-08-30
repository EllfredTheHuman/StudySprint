```javascript
const subjectData = {

    science: {
        name: "Science",
        description: "Explore how the world around us works.",
        topics: [
            {
                name: "The Heart",
                description: "Learn how the heart and circulatory system work.",
                icon: "♡"
            },
            {
                name: "Electricity",
                description: "Learn about circuits, current, voltage and more.",
                icon: "ϟ"
            }
        ]
    },

    maths: {
        name: "Maths",
        description: "Build your mathematical skills.",
        topics: [
            {
                name: "Algebra",
                description: "Expressions, equations and solving for unknowns.",
                icon: "x"
            },
            {
                name: "Geometry",
                description: "Shapes, angles, area and measurement.",
                icon: "△"
            },
            {
                name: "BIDMAS",
                description: "Learn the correct order of mathematical operations.",
                icon: "÷"
            }
        ]
    },

    english: {
        name: "English",
        description: "Develop your language and literary skills.",
        topics: [
            {
                name: "Grammar",
                description: "Understand how language is structured.",
                icon: "Aa"
            },
            {
                name: "Literature",
                description: "Explore texts, characters, themes and ideas.",
                icon: "▤"
            },
            {
                name: "Poetry",
                description: "Explore poetic techniques, structure and meaning.",
                icon: "✦"
            }
        ]
    },

    humanities: {
        name: "Humanities",
        description: "Explore people, places, societies and history.",
        topics: [
            {
                name: "Geography",
                description: "Explore places, environments and the world.",
                icon: "◎"
            },
            {
                name: "History",
                description: "Learn about events and societies from the past.",
                icon: "⌛"
            },
            {
                name: "Civics",
                description: "Learn how governments and societies work.",
                icon: "⚖"
            }
        ]
    },

    french: {
        name: "French",
        description: "Learn the French language.",
        topics: [
            {
                name: "Vocabulary",
                description: "Build your French vocabulary.",
                icon: "A"
            },
            {
                name: "Grammar",
                description: "Learn how French sentences are structured.",
                icon: "Aa"
            },
            {
                name: "Conversation",
                description: "Practise useful French conversations.",
                icon: "…"
            }
        ]
    },

    japanese: {
        name: "Japanese",
        description: "Learn Japanese language and writing.",
        topics: [
            {
                name: "Hiragana",
                description: "Learn the Japanese hiragana writing system.",
                icon: "あ"
            },
            {
                name: "Vocabulary",
                description: "Build your Japanese vocabulary.",
                icon: "語"
            },
            {
                name: "Grammar",
                description: "Learn how Japanese sentences are structured.",
                icon: "文"
            }
        ]
    }

};


const params = new URLSearchParams(window.location.search);
const subjectKey = params.get("subject");

const subject = subjectData[subjectKey];

const subjectTitle = document.getElementById("subjectTitle");
const subjectLabel = document.getElementById("subjectLabel");
const subjectDescription = document.getElementById("subjectDescription");
const topicsList = document.getElementById("topicsList");


if (!subject) {

    subjectTitle.textContent = "Subject not found";
    subjectLabel.textContent = "ERROR";
    subjectDescription.textContent = "We couldn't find that subject.";

} else {

    document.title = `${subject.name} — StudySprint`;

    subjectTitle.textContent = subject.name;
    subjectLabel.textContent = subject.name.toUpperCase();
    subjectDescription.textContent = subject.description;

    subject.topics.forEach(topic => {

        const card = document.createElement("button");

        card.className = "topic-card";

        card.innerHTML = `
            <div class="topic-icon">${topic.icon}</div>

            <div class="topic-info">
                <h3>${topic.name}</h3>
                <p>${topic.description}</p>
            </div>

            <span class="arrow">→</span>
        `;

        card.addEventListener("click", () => {

            const topicName = encodeURIComponent(topic.name);

            window.location.href =
                `topic.html?subject=${subjectKey}&topic=${topicName}`;

        });

        topicsList.appendChild(card);

    });

}
```
