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
    }
];

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

window.onload = function() {
    startNewGame();
};

function startNewGame() {
    shuffleArray(questions); // Shuffle the questions for the new game
    var currentQuestionIndex = 0;
    var correctAnswersCount = 0;
    var totalAttemptedQuestionsCount = 0; // Reset total attempted questions for the new game

    function displayNextQuestion() {
        if (totalAttemptedQuestionsCount >= 10) {
            displayEndOfGame();
            return;
        }

        var currentQuestion = questions[currentQuestionIndex % questions.length]; // Use modulo to cycle through questions if needed
        var questionElement = document.querySelector('.question h3');
        var optionsContainer = document.querySelector('.options');

        questionElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach(function(option, index) {
            var button = document.createElement('button');
            button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
            button.classList.add('option');
            button.onclick = function() {
                checkAnswer(option, currentQuestion.answer);
            };
            optionsContainer.appendChild(button);
        });

        currentQuestionIndex++;
    }

    function checkAnswer(selectedOption, correctAnswer) {
        totalAttemptedQuestionsCount++;
        if (selectedOption === correctAnswer) {
            correctAnswersCount++;
        }
        // Update the attempted questions count display
        document.getElementById('attempted-questions-count').textContent = `Attempted Questions: ${totalAttemptedQuestionsCount}`;
    
        displayNextQuestion();
    }
    

    function displayEndOfGame() {
        document.getElementById('quiz-container').style.display = 'none';
        const endOfGameElement = document.getElementById('end-of-game');
        endOfGameElement.style.display = 'block';
        endOfGameElement.innerHTML = ''; // Clear previous content
        const scoreDisplay = document.createElement('p');
        scoreDisplay.textContent = `Final Score: ${correctAnswersCount} out of ${totalAttemptedQuestionsCount}`;
        endOfGameElement.appendChild(scoreDisplay);
        const attemptedQuestionsDisplay = document.createElement('p');
        attemptedQuestionsDisplay.textContent = `You attempted ${totalAttemptedQuestionsCount} questions.`;
        endOfGameElement.appendChild(attemptedQuestionsDisplay);
        const newGameButton = document.createElement('button');
        newGameButton.textContent = 'Start New Game';
        newGameButton.id = 'new-game-button';
        newGameButton.classList.add('new-game-button'); // Ensure you have this class in your CSS for styling
        newGameButton.onclick = function() {
            document.getElementById('quiz-container').style.display = 'block';
            endOfGameElement.style.display = 'none';
            startNewGame(); // Restart the game setup
        };
        endOfGameElement.appendChild(newGameButton);
    }
    
    

    // Reset the quiz container and end-of-game message for the new game
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('end-of-game').style.display = 'none';

    // Display the first question for the new game
    displayNextQuestion();
}