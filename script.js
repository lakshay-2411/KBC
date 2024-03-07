const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Rome", "Berlin"],
        answer: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Jupiter", "Saturn", "Earth", "Mars"],
        answer: "Jupiter"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        answer: "H2O"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the tallest mammal?",
        options: ["Giraffe", "Elephant", "Hippopotamus", "Kangaroo"],
        answer: "Giraffe"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        answer: "Tokyo"
    },
    {
        question: "Which gas do plants use for photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Carbon Dioxide"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Au", "GoLd", "Ag"],
        answer: "Au"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the boiling point of water in Celsius?",
        options: ["100°C", "0°C", "50°C", "-100°C"],
        answer: "100°C"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "India", "Japan", "South Korea"],
        answer: "Japan"
    },
    {
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Albert Einstein"],
        answer: "Alexander Graham Bell"
    },
    {
        question: "What is the chemical formula for table salt?",
        options: ["H2SO4", "NaCl", "CH4", "CaCO3"],
        answer: "NaCl"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: "2"
    },
    {
        question: "What is the square root of 81?",
        options: ["7", "9", "8", "6"],
        answer: "9"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Stephen King"],
        answer: "Harper Lee"
    },
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        answer: "Delhi"
    },
    {
        question: "What is the largest ocean in the world?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "What is the chemical symbol for the element oxygen?",
        options: ["O", "O2", "O3", "O4"],
        answer: "O"
    },
    {
        question: "Who wrote 'The Great Gatsby'?",
        options: ["F. Scott Fitzgerald", "Ernest Hemingway", "William Faulkner", "John Steinbeck"],
        answer: "F. Scott Fitzgerald"
    },
    {
        question: "What is the largest animal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "African Lion"],
        answer: "Blue Whale"
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra"
    },
    {
        question: "What is the chemical symbol for the element silver?",
        options: ["Si", "Ag", "S", "Sl"],
        answer: "Ag"
    },
    {
        question: "Who painted the 'The Starry Night'?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Edvard Munch"],
        answer: "Vincent van Gogh"
    },
    {
        question: "What is the boiling point of water in Fahrenheit?",
        options: ["212°F", "100°F", "50°F", "0°F"],
        answer: "212°F"
    },
    {
        question: "Which country is known as the Land of the Midnight Sun?",
        options: ["Norway", "Sweden", "Finland", "Iceland"],
        answer: "Norway"
    },
    {
        question: "which is the largest country in the world?",
        options: ["Canada", "China", "Russia", "USA"],
        answer: "Russia"
    },
    {
        question: "Which has the largest population in the world?",
        options: ["China", "India", "USA", "Russia"],
        answer: "China"
    },
    {
        question: "Which is the largest desert in the world?",
        options: ["Sahara", "Arabian", "Gobi", "Kalahari"],
        answer: "Sahara"
    }
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

window.onload = function() {
    startNewGame(true);
};

let shuffledQuestions = [];
const maxQuestionsPerSet = 10;
let correctAnswersCount = 0;
let totalAttemptedQuestionsCount = 0;
let questionsInCurrentSetCount = 0; // Track the number of questions attempted in the current set

function startNewGame(isNewGame) {
    if (isNewGame) {
        // If it's a completely new game, shuffle and reset everything.
        shuffledQuestions = [...questions];
        shuffleArray(shuffledQuestions);
        correctAnswersCount = 0;
        totalAttemptedQuestionsCount = 0;
        questionsInCurrentSetCount = 0;
    } else {
        // If it's just a new set in the same game, only reset the set-specific counters.
        correctAnswersCount = 0; // Reset score for the new set.
        questionsInCurrentSetCount = 0;
    }
    
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('end-of-game').style.display = 'none';
    document.getElementById('attempted-questions-count').textContent = `Attempted Questions: ${questionsInCurrentSetCount}`;
    displayNextQuestion();
}

function displayNextQuestion() {
    if (questionsInCurrentSetCount >= maxQuestionsPerSet) {
        displayEndOfGame(false);
        return;
    } else if (shuffledQuestions.length === 0 || totalAttemptedQuestionsCount === questions.length) {
        displayEndOfGame(true);
        return;
    }

    const currentQuestion = shuffledQuestions.shift();
    const questionElement = document.querySelector('.question h3');
    const optionsContainer = document.querySelector('.options');

    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(function(option, index) {
        const button = document.createElement('button');
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        button.classList.add('option');
        button.onclick = function() {
            checkAnswer(option, currentQuestion.answer);
        };
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    totalAttemptedQuestionsCount++;
    questionsInCurrentSetCount++;
    if (selectedOption === correctAnswer) {
        correctAnswersCount++;
    }
    document.getElementById('attempted-questions-count').textContent = `Attempted Questions: ${questionsInCurrentSetCount}`;
    displayNextQuestion();
}

function displayEndOfGame(final) {
    document.getElementById('quiz-container').style.display = 'none';
    const endOfGameElement = document.getElementById('end-of-game');
    endOfGameElement.style.display = 'block';
    endOfGameElement.innerHTML = '';

    const scoreDisplay = document.createElement('p');
    scoreDisplay.textContent = `Score: ${correctAnswersCount} out of ${questionsInCurrentSetCount}`;
    endOfGameElement.appendChild(scoreDisplay);

    const gameButton = document.createElement('button');
    gameButton.textContent = final ? 'Restart Game' : 'Start Next Set';
    gameButton.id = 'new-game-button';
    gameButton.classList.add('new-game-button');
    gameButton.onclick = function() {
        startNewGame(final); // Pass true to restart the game, false to proceed to next set
    };
    endOfGameElement.appendChild(gameButton);
}
