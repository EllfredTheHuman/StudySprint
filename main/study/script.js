```javascript
const topicData = {

    // =========================
    // SCIENCE
    // =========================

    "The Heart": {
        subject: "Science",
        description: "Learn how the heart pumps blood around the body.",

        sections: [
            {
                title: "What is the heart?",
                text: "The heart is a muscular organ that pumps blood around your body. Blood carries oxygen and nutrients to cells and removes waste products."
            },
            {
                title: "The four chambers",
                list: [
                    "Right atrium — receives blood from the body.",
                    "Right ventricle — pumps blood to the lungs.",
                    "Left atrium — receives oxygen-rich blood from the lungs.",
                    "Left ventricle — pumps blood around the body."
                ]
            }
        ]
    },


    "Electricity": {
        subject: "Science",
        description: "Learn about electrical circuits, current and voltage.",

        sections: [
            {
                title: "What is electricity?",
                text: "Electricity involves the movement of electric charge. In a circuit, electrical energy can be transferred to devices such as lights, motors and speakers."
            },
            {
                title: "Circuits",
                text: "A circuit needs a complete path for electric current to flow. Common circuit components include cells, switches, wires and globes."
            }
        ]
    },


    // =========================
    // MATHS
    // =========================

    "Algebra": {
        subject: "Maths",
        description: "Learn how to work with variables, expressions and equations.",

        sections: [
            {
                title: "What is a variable?",
                text: "A variable is a letter or symbol that represents an unknown value. For example, in 3x + 2, x is the variable."
            },
            {
                title: "Solving equations",
                text: "To solve an equation, work out the value of the unknown variable while keeping both sides of the equation equal."
            }
        ]
    },


    "Geometry": {
        subject: "Maths",
        description: "Learn about shapes, angles, measurements and geometry.",

        sections: [
            {
                title: "Angles",
                list: [
                    "Acute angles are less than 90°.",
                    "Right angles are exactly 90°.",
                    "Obtuse angles are greater than 90° but less than 180°.",
                    "Straight angles are exactly 180°."
                ]
            },
            {
                title: "Shapes",
                text: "Geometry involves studying the properties, measurements and relationships of shapes and objects."
            }
        ]
    },


    "BIDMAS": {
        subject: "Maths",
        description: "Learn the order used to solve mathematical expressions.",

        sections: [
            {
                title: "The order of operations",
                text: "BIDMAS tells you which operations should be performed first when solving an expression."
            },
            {
                title: "BIDMAS",
                list: [
                    "Brackets",
                    "Indices",
                    "Division",
                    "Multiplication",
                    "Addition",
                    "Subtraction"
                ]
            }
        ]
    },


    // =========================
    // ENGLISH
    // =========================

    "Grammar": {
        subject: "English",
        description: "Learn how words and sentences are structured.",

        sections: [
            {
                title: "What is grammar?",
                text: "Grammar is the set of rules that determines how words are combined to create meaningful sentences."
            }
        ]
    },


    "Literature": {
        subject: "English",
        description: "Explore characters, themes, settings and ideas in literature.",

        sections: [
            {
                title: "Reading literature",
                text: "When studying literature, look at characters, themes, setting, language choices and the ideas the author is communicating."
            }
        ]
    },


    "Poetry": {
        subject: "English",
        description: "Explore poetic techniques, structure and meaning.",

        sections: [
            {
                title: "Poetic techniques",
                list: [
                    "Simile",
                    "Metaphor",
                    "Personification",
                    "Alliteration",
                    "Rhyme",
                    "Repetition"
                ]
            }
        ]
    },


    // =========================
    // HUMANITIES
    // =========================

    "Geography": {
        subject: "Humanities",
        description: "Explore places, environments and how people interact with them.",

        sections: [
            {
                title: "What is geography?",
                text: "Geography is the study of places, environments, people and the relationships between them."
            }
        ]
    },


    "History": {
        subject: "Humanities",
        description: "Explore events, people and societies from the past.",

        sections: [
            {
                title: "Studying history",
                text: "History uses evidence from the past to understand events, people, societies and how the world has changed over time."
            }
        ]
    },


    "Civics": {
        subject: "Humanities",
        description: "Learn how governments, communities and societies work.",

        sections: [
            {
                title: "What is civics?",
                text: "Civics is the study of citizenship, government and how people participate in their communities and societies."
            }
        ]
    },


    // =========================
    // FRENCH
    // =========================

    "Vocabulary": {
        subject: "French",
        description: "Build your French vocabulary.",

        sections: [
            {
                title: "Building vocabulary",
                text: "Learning vocabulary involves understanding what words mean, how they are pronounced and how they are used in sentences."
            }
        ]
    },


    "Conversation": {
        subject: "French",
        description: "Practise useful French conversations.",

        sections: [
            {
                title: "Useful phrases",
                list: [
                    "Bonjour — Hello",
                    "Comment ça va ? — How are you?",
                    "Merci — Thank you",
                    "Au revoir — Goodbye"
                ]
            }
        ]
    },


    // =========================
    // JAPANESE
    // =========================

    "Hiragana": {
        subject: "Japanese",
        description: "Learn the Japanese hiragana writing system.",

        sections: [
            {
                title: "What is hiragana?",
                text: "Hiragana is one of the Japanese writing systems. It is commonly used for grammatical endings, particles and words that do not use kanji."
            }
        ]
    },


    "Vocabulary": {
        subject: "Japanese",
        description: "Build your Japanese vocabulary.",

        sections: [
            {
                title: "Building vocabulary",
                text: "Learning Japanese vocabulary involves understanding words, pronunciation and how they are used in context."
            }
        ]
    },


    "Grammar": {
        subject: "Japanese",
        description: "Learn how Japanese sentences are structured.",

        sections: [
            {
                title: "Japanese sentence structure",
                text: "Japanese commonly uses a subject-object-verb structure. Particles help show the role that words play in a sentence."
            }
        ]
    }

};


// =========================
// GET TOPIC
// =========================

const params = new URLSearchParams(window.location.search);

const subjectKey = params.get("subject");
const topicName = params.get("topic");

const decodedTopic = topicName
    ? decodeURIComponent(topicName)
    : null;

const topic = topicData[decodedTopic];


// =========================
// ELEMENTS
// =========================

const topicTitle = document.getElementById("topicTitle");
const subjectLabel = document.getElementById("subjectLabel");
const topicSubject = document.getElementById("topicSubject");
const topicDescription = document.getElementById("topicDescription");
const learningContent = document.getElementById("learningContent");
const practiceButton = document.getElementById("practiceButton");


// =========================
// DISPLAY TOPIC
// =========================

if (!topic) {

    subjectLabel.textContent = "ERROR";
    topicTitle.textContent = "Topic not found";
    topicSubject.textContent = "";
    topicDescription.textContent =
        "We couldn't find the topic you were looking for.";

    practiceButton.style.display = "none";

} else {

    document.title = `${decodedTopic} — StudySprint`;

    subjectLabel.textContent = topic.subject.toUpperCase();

    topicTitle.textContent = decodedTopic;

    topicSubject.textContent = topic.subject;

    topicDescription.textContent = topic.description;


    // =========================
    // LEARNING CONTENT
    // =========================

    topic.sections.forEach(section => {

        const card = document.createElement("article");

        card.className = "learning-card";


        const title = document.createElement("h3");

        title.textContent = section.title;

        card.appendChild(title);


        if (section.text) {

            const paragraph = document.createElement("p");

            paragraph.textContent = section.text;

            card.appendChild(paragraph);

        }


        if (section.list) {

            const list = document.createElement("ul");

            section.list.forEach(item => {

                const listItem = document.createElement("li");

                listItem.textContent = item;

                list.appendChild(listItem);

            });

            card.appendChild(list);

        }


        learningContent.appendChild(card);

    });


    // =========================
    // START SPRINT
    // =========================

    practiceButton.addEventListener("click", () => {

        window.location.href =
            `../sprint/index.html?subject=${encodeURIComponent(subjectKey)}&topic=${encodeURIComponent(decodedTopic)}`;

    });

}
```
