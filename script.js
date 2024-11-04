// Quotes Array
const quotes = [
    "It does not do to dwell on dreams and forget to live.",
    "Happiness can be found even in the darkest of times if one only remembers to turn on the light.",
    "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
    "Of course it is happening inside your head, Harry, but why on earth should that mean that it is not real?",
    "Words are, in my not-so-humble opinion, our most inexhaustible source of magic."
];

// Generate Random Quote
function generateQuote() {
    const quoteElement = document.getElementById('quote');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

// Generate initial quote when page loads
window.onload = generateQuote;

// Quiz functionality
const quizQuestions = [
    {
        question: "What is Harry Potter's Patronus?",
        options: ["Stag", "Doe", "Wolf", "Phoenix"],
        correct: 0
    },
    {
        question: "What house is Harry Potter sorted into?",
        options: ["Slytherin", "Hufflepuff", "Gryffindor", "Ravenclaw"],
        correct: 2
    },
    {
        question: "What is the core of Harry's wand?",
        options: ["Dragon Heartstring", "Phoenix Feather", "Unicorn Hair", "Basilisk Fang"],
        correct: 1
    },
    {
        question: "Who killed Dumbledore?",
        options: ["Voldemort", "Bellatrix Lestrange", "Draco Malfoy", "Severus Snape"],
        correct: 3
    },
    {
        question: "What is the name of Harry's owl?",
        options: ["Hedwig", "Errol", "Fawkes", "Pigwidgeon"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Initialize Quiz
function initQuiz() {
    showQuestion();
    document.getElementById('score').textContent = score;
}

// Display Question
function showQuestion() {
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const currentQ = quizQuestions[currentQuestion];

    questionContainer.textContent = currentQ.question;
    optionsContainer.innerHTML = '';

    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });

    document.getElementById('submit-btn').style.display = 'block';
    document.getElementById('next-btn').style.display = 'none';
}

// Handle Answer Selection
function selectAnswer(index) {
    selectedAnswer = index;
    const buttons = document.querySelectorAll('#options-container button');
    buttons.forEach((button, i) => {
        button.style.backgroundColor = i === index ? '#ffd700' : 'white';
    });
}

// Check Answer
function checkAnswer() {
    if (selectedAnswer === null) {
        alert('Please select an answer!');
        return;
    }

    const correct = quizQuestions[currentQuestion].correct;
    const buttons = document.querySelectorAll('#options-container button');

    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === correct) {
            button.style.backgroundColor = '#90EE90'; // Light green
        } else if (index === selectedAnswer && selectedAnswer !== correct) {
            button.style.backgroundColor = '#FFB6C1'; // Light red
        }
    });

    if (selectedAnswer === correct) {
        score++;
        document.getElementById('score').textContent = score;
    }

    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'block';
}

// Next Question
function nextQuestion() {
    selectedAnswer = null;
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = `
            <h2>Quiz Complete!</h2>
            <p>Your final score: ${score} out of ${quizQuestions.length}</p>
            <button onclick="resetQuiz()">Try Again</button>
        `;
    }
}

// Reset Quiz
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    initQuiz();
}

// Initialize quiz when page loads
initQuiz();