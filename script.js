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

window.onload = function() {

    // Shuffle the questions array
    shuffleArray(questions);

    // Initialize variables
    var currentQuestionIndex = 0;
    var answeredQuestions = [];
    var correctAnswersCount = 0;
    var questionsCount = 10; // Number of questions per player

    // Function to shuffle an array (Fisher-Yates shuffle algorithm)
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to display next question
    function displayNextQuestion() {
        if (answeredQuestions.length >= questionsCount) {
            alert("Congratulations! You've completed the quiz!");
            return;
        }

        if (currentQuestionIndex >= questions.length) {
            alert("There are not enough questions for the quiz!");
            return;
        }

        var currentQuestion = questions[currentQuestionIndex];
        var questionElement = document.querySelector('.question h3');
        var optionsContainer = document.querySelector('.options');

        questionElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach(function(option, index) {
            var button = document.createElement('button');
            button.textContent = String.fromCharCode(65 + index) + ". " + option;
            button.classList.add('option');
            button.addEventListener('click', function() {
                checkAnswer(option, currentQuestion.answer);
            });
            optionsContainer.appendChild(button);
        });

        currentQuestionIndex++;
    }

    // Function to check answer
    function checkAnswer(selectedOption, correctAnswer) {
        if (selectedOption === correctAnswer) {
            alert("Correct answer!");
            correctAnswersCount++;
        } else {
            alert("Thank you for playing!");
        }
        updateCorrectAnswersDisplay();
        displayNextQuestion();
    }

    // Display correct answers count
    var correctAnswersDisplay = document.createElement('div');
    correctAnswersDisplay.classList.add('correct-answers');
    document.body.appendChild(correctAnswersDisplay);

    // Update correct answers count display
    function updateCorrectAnswersDisplay() {
        correctAnswersDisplay.textContent = "Correct Answers: " + correctAnswersCount;
    }

    // Display the first question
    displayNextQuestion();
};
