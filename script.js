fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startNewGame(true);
    })
    .catch(error => console.error('Error fetching questions:', error));

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

window.onload = function() {
    startNewGame(true);
};

let shuffledQuestions = [];
const maxQuestionsPerSet = 10;
let correctAnswersCount = 0;
let totalAttemptedQuestionsCount = 0;
let questionsInCurrentSetCount = 0; // Track the number of questions attempted in the current set
let lifelineUsed = false; // Track whether lifeline has been used in the current set

function startNewGame(isNewGame) {
    if (isNewGame) {
        // If it's a completely new game, shuffle and reset everything.
        shuffledQuestions = [...questions];
        shuffleArray(shuffledQuestions);
        correctAnswersCount = 0;
        totalAttemptedQuestionsCount = 0;
        questionsInCurrentSetCount = 0;
        lifelineUsed = false; // Reset lifeline usage for the new set
    } else {
        // If it's just a new set in the same game, only reset the set-specific counters.
        correctAnswersCount = 0; // Reset score for the new set.
        questionsInCurrentSetCount = 0;
        lifelineUsed = false; // Reset lifeline usage for the new set
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

    // Create 50-50 lifeline button
    if (!lifelineUsed) {
        const lifelineButton = document.getElementById('lifeline-button');
        lifelineButton.disabled = false; // Enable the button
        lifelineButton.onclick = function() {
            useFiftyFiftyLifeline(currentQuestion.options, currentQuestion.answer);
            lifelineButton.disabled = true; // Disable the button after it's used
            lifelineUsed = true; // Set lifeline usage flag to true
        };
    }

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

function useFiftyFiftyLifeline(options, correctAnswer) {
    // Filter out the correct answer
    const incorrectOptions = options.filter(option => option !== correctAnswer);

    // Ensure that there are at least two incorrect options available
    if (incorrectOptions.length >= 2) {
        // Randomly select two incorrect options to hide
        const optionsToHide = shuffleArray(incorrectOptions).slice(0, 2);

        // Hide the buttons corresponding to the options to hide
        const optionButtons = document.querySelectorAll('.option');
        optionButtons.forEach(button => {
            const buttonText = button.textContent.substring(3);
            if (optionsToHide.includes(buttonText)) {
                button.textContent = `${String.fromCharCode(65 + options.indexOf(buttonText))}.`; // Clear text content
            }
        });
    }
    // If there are fewer than two incorrect options, don't do anything
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
