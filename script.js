
// =====================================
// SMART MATHS LEARNING AI
// Main JavaScript File
// =====================================

// HTML Elements
const $ = (id) => document.getElementById(id);

// Application Settings
let language = "hi";
let soundOn = true;

// Student Progress
let score = 0;
let stars = 0;
let answered = 0;

// Practice Settings
let currentMode = "add";
let questionNumber = 1;
let correctAnswer = 0;
let currentQuestion = "";
let questionChecked = false;

// =====================================
// LANGUAGE TRANSLATIONS
// =====================================

const translations = {

    hi: {
        welcomeTag: "खेलो और गणित सीखो!",
        heroTitle: 'गणित अब होगा <span>मज़ेदार!</span> 🎉',
        heroText: "पहाड़े सीखें, सवाल हल करें और हर दिन बनें Maths Champion!",
        start: "चलो शुरू करें",

        score: "कुल अंक",
        stars: "सितारे",
        answered: "हल किए सवाल",

        chooseTag: "अपना पाठ चुनें",
        chooseTitle: "आज क्या सीखेंगे?",

        tables: "पहाड़े",
        tablesDesc: "1 से 30 तक",

        add: "जोड़",
        addDesc: "संख्याएँ जोड़ें",

        sub: "घटाना",
        subDesc: "अंतर निकालें",

        mul: "गुणा",
        mulDesc: "गुणा करना सीखें",

        div: "भाग",
        divDesc: "बराबर बाँटना सीखें",

        quiz: "Maths Quiz",
        quizDesc: "अपना ज्ञान परखें",

        back: "वापस",
        activity: "आपका अभ्यास",

        tipTitle: "आज की सीख",
        tipText: "रोज़ थोड़ा अभ्यास करने से गणित आसान हो जाता है।",

        tableHeading: "पहाड़े सीखें",
        selectTable: "पहाड़ा चुनें",

        check: "जवाब जाँचें",
        listen: "सवाल सुनें",
        next: "अगला सवाल",

        question: "सवाल",
        right: "शाबाश! बिल्कुल सही! 🎉",
        wrong: "कोई बात नहीं! फिर कोशिश करें।",

        placeholder: "जवाब लिखें",
        correct: "सही जवाब है",

        quizTitle: "Maths Quiz"
    },

    en: {
        welcomeTag: "PLAY & LEARN MATHS!",
        heroTitle: 'Maths is <span>Super Fun!</span> 🎉',
        heroText: "Learn tables, solve questions and become a Maths Champion every day!",
        start: "Let's Start",

        score: "Total points",
        stars: "Stars",
        answered: "Questions solved",

        chooseTag: "CHOOSE A LESSON",
        chooseTitle: "What shall we learn today?",

        tables: "Tables",
        tablesDesc: "From 1 to 30",

        add: "Addition",
        addDesc: "Add numbers",

        sub: "Subtraction",
        subDesc: "Find the difference",

        mul: "Multiplication",
        mulDesc: "Learn to multiply",

        div: "Division",
        divDesc: "Learn to share equally",

        quiz: "Maths Quiz",
        quizDesc: "Test your knowledge",

        back: "Back",
        activity: "YOUR PRACTICE",

        tipTitle: "Learning tip",
        tipText: "A little practice every day makes maths easier.",

        tableHeading: "Learn Tables",
        selectTable: "Choose a table",

        check: "Check Answer",
        listen: "Listen to question",
        next: "Next Question",

        question: "Question",
        right: "Amazing! That is correct! 🎉",
        wrong: "That's okay! Try again.",

        placeholder: "Type answer",
        correct: "Correct answer is",

        quizTitle: "Maths Quiz"
    }

};


// Translation Function
function t(key) {
    return translations[language][key] || key;
}


// =====================================
// CHANGE WEBSITE LANGUAGE
// =====================================

function applyLanguage() {

    const map = {

        welcomeTag: "welcomeTag",
        heroText: "heroText",

        scoreLabel: "score",
        starsLabel: "stars",
        answeredLabel: "answered",

        chooseTag: "chooseTag",
        chooseTitle: "chooseTitle",

        tablesTitle: "tables",
        tablesDesc: "tablesDesc",

        addTitle: "add",
        addDesc: "addDesc",

        subTitle: "sub",
        subDesc: "subDesc",

        mulTitle: "mul",
        mulDesc: "mulDesc",

        divTitle: "div",
        divDesc: "divDesc",

        quizTitle: "quiz",
        quizDesc: "quizDesc",

        backText: "back",
        activityTag: "activity",

        tipTitle: "tipTitle",
        tipText: "tipText"

    };

    Object.entries(map).forEach(([id, key]) => {

        if ($(id)) {
            $(id).textContent = t(key);
        }

    });

    $("heroTitle").innerHTML = t("heroTitle");

    $("startBtn").innerHTML =
        t("start") + " <span>→</span>";

}


// =====================================
// AI TEACHER VOICE
// =====================================

function speak(text) {

    if (!soundOn) return;

    if (!("speechSynthesis" in window)) {

        showToast("आपका Browser Voice Support नहीं करता");

        return;
    }

    speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance(text);

    voice.lang = language === "hi"
        ? "hi-IN"
        : "en-US";

    voice.rate = 0.88;
    voice.pitch = 1.08;
    voice.volume = 1;

    speechSynthesis.speak(voice);

}


// =====================================
// UPDATE STUDENT SCORE
// =====================================

function updateStats() {

    $("score").textContent = score;

    $("stars").textContent = stars;

    $("answered").textContent = answered;

}


// =====================================
// SHOW MESSAGE
// =====================================

function showToast(message) {

    const toast = $("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);

}


// =====================================
// RANDOM NUMBER GENERATOR
// =====================================

function rand(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


// =====================================
// OPEN LEARNING MODE
// =====================================

function openMode(mode) {

    currentMode = mode;

    $("workspace").classList.remove("hidden");

    $("workspace").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    if (mode === "tables") {

        renderTables();

    } else {

        questionNumber = 1;

        renderPractice();

        newQuestion();

    }

}


// =====================================
// TABLES FROM 1 TO 30
// =====================================

function renderTables() {

    $("activityContent").innerHTML = `

        <h2 class="activity-title">
            ${t("tableHeading")}
        </h2>

        <div class="table-controls">

            <label for="tableNumber">
                ${t("selectTable")}:
            </label>

            <select id="tableNumber">

                ${Array.from(
                    { length: 30 },
                    (_, i) => `
                        <option value="${i + 1}">
                            ${i + 1}
                        </option>
                    `
                ).join("")}

            </select>

            <button class="voice-btn" id="speakTable">
                🔊 ${t("listen")}
            </button>

        </div>

        <div class="table-output" id="tableOutput"></div>

    `;

    const select = $("tableNumber");

    function drawTable() {

        const number = Number(select.value);

        $("tableOutput").innerHTML =
            Array.from({ length: 10 }, (_, i) => `

                <div class="table-line">

                    ${number} × ${i + 1}
                    = ${number * (i + 1)}

                </div>

            `).join("");

    }

    select.addEventListener("change", drawTable);

    $("speakTable").addEventListener("click", () => {

        const number = Number(select.value);

        const tableVoice = Array.from(
            { length: 10 },
            (_, i) =>
                `${number} गुणा ${i + 1} बराबर ${number * (i + 1)}`
        ).join(". ");

        speak(tableVoice);

    });

    drawTable();

}


// =====================================
// PRACTICE QUESTION SCREEN
// =====================================

function renderPractice() {

    $("activityContent").innerHTML = `

        <div class="practice-box">

            <div class="question-count" id="questionCount">
                ${t("question")} ${questionNumber}
            </div>

            <div class="question" id="questionText">
            </div>

            <div class="answer-row">

                <input
                    id="answerInput"
                    type="number"
                    inputmode="numeric"
                    placeholder="${t("placeholder")}"
                >

                <button class="check-btn" id="checkAnswer">
                    ${t("check")}
                </button>

            </div>

            <button class="voice-btn" id="speakQuestion">
                🔊 ${t("listen")}
            </button>

            <p class="feedback" id="feedback"></p>

            <button class="next-btn" id="nextQuestion">
                ${t("next")} →
            </button>

        </div>

    `;

    $("checkAnswer").addEventListener(
        "click",
        checkAnswer
    );

    $("answerInput").addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {
                checkAnswer();
            }

        }
    );

    $("speakQuestion").addEventListener(
        "click",
        () => speak(currentQuestion)
    );

    $("nextQuestion").addEventListener(
        "click",
        nextQuestion
    );

}


// =====================================
// GENERATE MATH QUESTIONS
// =====================================

function newQuestion() {

    let a, b, op;

    if (currentMode === "add") {

        a = rand(1, 50);
        b = rand(1, 50);

        op = "+";

        correctAnswer = a + b;

    }

    else if (currentMode === "subtract") {

        a = rand(10, 60);
        b = rand(1, a);

        op = "−";

        correctAnswer = a - b;

    }

    else if (currentMode === "multiply") {

        a = rand(1, 12);
        b = rand(1, 12);

        op = "×";

        correctAnswer = a * b;

    }

    else if (currentMode === "divide") {

        b = rand(1, 10);

        correctAnswer = rand(1, 10);

        a = b * correctAnswer;

        op = "÷";

    }

    else if (currentMode === "quiz") {

        const modes = [
            "add",
            "subtract",
            "multiply",
            "divide"
        ];

        currentMode = modes[rand(0, 3)];

        newQuestion();

        currentMode = "quiz";

        return;

    }

    currentQuestion = `${a} ${op} ${b} = ?`;

    $("questionCount").textContent =
        `${t("question")} ${questionNumber}`;

    $("questionText").textContent =
        currentQuestion;

    $("answerInput").value = "";

    $("answerInput").disabled = false;

    $("checkAnswer").disabled = false;

    $("checkAnswer").style.opacity = "1";

    $("feedback").textContent = "";

    $("feedback").className = "feedback";

    questionChecked = false;

    $("nextQuestion").textContent =
        t("next") + " →";

}


// =====================================
// CHECK STUDENT ANSWER
// =====================================

function checkAnswer() {

    if (questionChecked) return;

    const input = $("answerInput");

    if (input.value.trim() === "") {

        input.focus();

        return;
    }

    const value = Number(input.value);

    const feedback = $("feedback");

    answered++;

    questionChecked = true;

    if (value === correctAnswer) {

        score += 10;

        stars++;

        feedback.textContent = t("right");

        feedback.className = "feedback good";

        speak(t("right"));

    }

    else {

        feedback.textContent =
            `${t("wrong")} ${t("correct")}: ${correctAnswer}`;

        feedback.className = "feedback bad";

        speak(
            `${t("wrong")} ${t("correct")} ${correctAnswer}`
        );

    }

    updateStats();

    input.disabled = true;

    $("checkAnswer").disabled = true;

    $("checkAnswer").style.opacity = "0.5";

}


// =====================================
// NEXT QUESTION
// =====================================

function nextQuestion() {

    questionNumber++;

    newQuestion();

}


// =====================================
// LANGUAGE SELECTOR
// =====================================

$("language").addEventListener("change", (event) => {

    language = event.target.value;

    applyLanguage();

    if (!$("workspace").classList.contains("hidden")) {

        openMode(currentMode);

    }

});


// =====================================
// SOUND ON / OFF
// =====================================

$("soundToggle").addEventListener("click", () => {

    soundOn = !soundOn;

    $("soundToggle").textContent =
        soundOn ? "🔊" : "🔇";

    if (!soundOn && "speechSynthesis" in window) {

        speechSynthesis.cancel();

    }

    showToast(
        soundOn
            ? "आवाज़ चालू है"
            : "आवाज़ बंद है"
    );

});


// =====================================
// LESSON CARD EVENTS
// =====================================

document.querySelectorAll(".lesson-card").forEach(button => {

    button.addEventListener("click", () => {

        openMode(button.dataset.mode);

    });

});


// =====================================
// START BUTTON
// =====================================

$("startBtn").addEventListener("click", () => {

    $("learning").scrollIntoView({
        behavior: "smooth"
    });

});


// =====================================
// BACK BUTTON
// =====================================

$("backBtn").addEventListener("click", () => {

    $("workspace").classList.add("hidden");

    $("learning").scrollIntoView({
        behavior: "smooth"
    });

});


// =====================================
// LEARNING TIP VOICE
// =====================================

$("tipSpeak").addEventListener("click", () => {

    speak(translations[language].tipText);

});


// =====================================
// CURRENT YEAR
// =====================================

$("year").textContent = new Date().getFullYear();


// =====================================
// INITIALIZE APPLICATION
// =====================================

applyLanguage();

updateStats();

console.log(
    "Smart Maths Learning AI Started Successfully!"
);
