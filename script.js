fetch('sportsEntertainment.json')
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
    
    document.getElementById('end-of-game').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'flex'; // Make the quiz container visible

    if (shuffledQuestions.length > 0) {
        displayNextQuestion();
        if(!isNewGame) document.getElementById('submit-button').style.display = 'block';
    } else {
        displayEndOfGame 
    }
}
// Load the next question audio
const nextQuestionAudio = document.getElementById('nextQuestionAudio');

// Function to play the next question audio
function playNextQuestionAudio() {
    nextQuestionAudio.currentTime = 0; // Reset audio to the beginning
    nextQuestionAudio.play(); // Play the audio
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
            // Call a function to handle option selection
            selectOption(button, option, currentQuestion.answer);
        };
        optionsContainer.appendChild(button);
    });

    // Create a submit button
    const submitButton = document.getElementById('submit-button');
    submitButton.onclick = function() {
        submitAnswer(currentQuestion.answer);
    };

    // Play the next question audio
    playNextQuestionAudio();
}

// Function to handle option selection
function selectOption(optionButton, selectedOption, correctAnswer) {
    // Reset background color of all options
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(option => {
        option.style.background = '';
    });

    // Highlight the selected option in yellow
    optionButton.style.background = 'goldenrod';
}

// Function to submit the answer
function submitAnswer(correctAnswer) {
    const selectedOption = document.querySelector('.option[style="background: goldenrod;"]');
    if (!selectedOption) {
        // No option selected, do nothing
        return;
    }

    totalAttemptedQuestionsCount++;
    questionsInCurrentSetCount++;

    const options = document.querySelectorAll('.option');

    if (selectedOption.textContent.includes(correctAnswer)) {
        // Correct answer
        selectedOption.style.backgroundColor = 'green';
        correctAnswersCount++;
    } else {
        // Incorrect answer
        selectedOption.style.backgroundColor = 'red';
        // Highlight correct answer in green
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            if (option.textContent.includes(correctAnswer)) {
                option.style.background = 'green';
            }
        });
    }

    // After 2 seconds, fade out the current question container
    setTimeout(function() {
        const quizContainer = document.getElementById('quiz-container');
        const submitContainer = document.getElementById('submit-button');
        quizContainer.style.opacity = '0';
        submitContainer.style.opacity = '0'

        // After another 2 seconds, fade in the next question container and display the next question
        setTimeout(function() {
            quizContainer.style.opacity = '1';
            submitContainer.style.opacity = '1';
            displayNextQuestion();
        }, 3000);
    }, 3000);
}

function checkAnswer(selectedOption, correctAnswer) {
    totalAttemptedQuestionsCount++;
    questionsInCurrentSetCount++;
    if (selectedOption === correctAnswer) {
        correctAnswersCount++;
    }

    const attemptedQuestionsCount = document.getElementById('attempted-questions-count');
    //attemptedQuestionsCount.textContent = `Attempted Questions: ${questionsInCurrentSetCount}`;

    displayNextQuestion();
}

function displayEndOfGame(final) {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('submit-button').style.display = 'none';
    const endOfGameElement = document.getElementById('end-of-game');
    endOfGameElement.style.display = 'block';
    endOfGameElement.innerHTML = '';

    /*
    // Display the score from the previous set
    const scoreDisplay = document.createElement('p');
    scoreDisplay.textContent = `Score: ${correctAnswersCount} out of ${questionsInCurrentSetCount}`;
    scoreDisplay.style.fontSize = '1.5em';
    scoreDisplay.style.color = '#fff';
    scoreDisplay.style.backgroundColor = 'rgba(0, 0, 69, 0.8)';
    scoreDisplay.style.padding = '10px';
    scoreDisplay.style.borderRadius = '5px';
    scoreDisplay.style.margin = '20px 0';
    endOfGameElement.appendChild(scoreDisplay);
    */

    /*
    // Display the total questions attempted
    const totalQuestionsAttemptedDisplay = document.createElement('p');
    totalQuestionsAttemptedDisplay.textContent = `Total Questions Attempted: ${totalAttemptedQuestionsCount}`;
    totalQuestionsAttemptedDisplay.style.fontSize = '1.2em';
    totalQuestionsAttemptedDisplay.style.color = '#fff';
    endOfGameElement.appendChild(totalQuestionsAttemptedDisplay);
    */

    // Create the "Start Next Set" button
    const gameButton = document.createElement('button');
    gameButton.textContent = final ? 'Restart Game' : 'Start Next Set';
    gameButton.id = 'new-game-button';
    gameButton.classList.add('new-game-button');
    gameButton.onclick = function() {
        startNewGame(final); // Pass true to restart the game, false to proceed to next set
    };
    endOfGameElement.appendChild(gameButton);
}
