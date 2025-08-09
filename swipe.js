// Track the current category and question history
let currentCategory = [];
let questionHistory = [];
let currentHistoryIndex = -1;

// Update the current category when any question is displayed
function updateCurrentCategory(question) {
    if (family.includes(question)) currentCategory = family;
    else if (thisorthat.includes(question)) currentCategory = thisorthat;
    else if (hypo.includes(question)) currentCategory = hypo;
    else if (show.includes(question)) currentCategory = show;
    else if (personal.includes(question)) currentCategory = personal;
    else if (religion.includes(question)) currentCategory = religion;
    else if (politics.includes(question)) currentCategory = politics;
    else if (relation.includes(question)) currentCategory = relation;
    else currentCategory = qs; // Default to all questions
}

// Add a question to history
function addToHistory(question) {
    // Remove any forward history if we're not at the end
    if (currentHistoryIndex < questionHistory.length - 1) {
        questionHistory = questionHistory.slice(0, currentHistoryIndex + 1);
    }

    // Add the new question to history
    questionHistory.push(question);
    currentHistoryIndex = questionHistory.length - 1;
}

// Handle swipe functionality
document.addEventListener('DOMContentLoaded', function () {
    const section = document.querySelector('section');
    let touchStartX = 0;
    let touchEndX = 0;

    // Get current displayed question
    function getCurrentQuestion() {
        return document.getElementById('qDisplay').textContent;
    }

    // Get new question from same category
    function getNewQuestionFromCategory() {
        // Update the current category based on the current question
        updateCurrentCategory(getCurrentQuestion());

        // Get a new random question from the same category
        let currentQuestion = getCurrentQuestion();
        let newQuestion;

        // Keep getting a new question until we get one that's different
        do {
            const randomIndex = Math.floor(Math.random() * currentCategory.length);
            newQuestion = currentCategory[randomIndex];
        } while (newQuestion === currentQuestion && currentCategory.length > 1);

        return newQuestion;
    }

    // Handle touch start
    section.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
    });

    // Handle touch move
    section.addEventListener('touchmove', function (e) {
        e.preventDefault(); // Prevent scrolling
    });

    // Handle touch end
    section.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        const swipeDistance = touchEndX - touchStartX;
        const qDisplay = document.getElementById('qDisplay');

        // If the swipe distance is greater than the threshold
        if (Math.abs(swipeDistance) > swipeThreshold) {
            let newQuestion;

            if (swipeDistance > 0) {
                // Swipe right - go back in history
                if (currentHistoryIndex > 0) {
                    currentHistoryIndex--;
                    newQuestion = questionHistory[currentHistoryIndex];
                    qDisplay.classList.add('slide-right-exit');
                } else {
                    return; // No more history to go back to
                }
            } else {
                // Swipe left - new question
                newQuestion = getNewQuestionFromCategory();
                addToHistory(newQuestion);
                qDisplay.classList.add('slide-left-exit');
            }

            // Create container if it doesn't exist
            let container = qDisplay.parentElement;
            if (!container.classList.contains('question-container')) {
                container = document.createElement('div');
                container.className = 'question-container';
                qDisplay.parentElement.insertBefore(container, qDisplay);
                container.appendChild(qDisplay);
            }

            // Create new question element with transform offset
            const newQuestionEl = document.createElement('div');
            newQuestionEl.className = 'new-question';
            newQuestionEl.textContent = newQuestion;

            // Set initial position and opacity
            newQuestionEl.style.transform = `translate3d(${swipeDistance > 0 ? '-' : ''}100%, 0, 0)`;
            newQuestionEl.style.opacity = '0';
            container.appendChild(newQuestionEl);

            // Force browser reflow
            void newQuestionEl.offsetWidth;

            // Animate both elements
            requestAnimationFrame(() => {
                // Slide and fade out current question
                qDisplay.style.transform = `translate3d(${swipeDistance > 0 ? '100%' : '-100%'}, 0, 0)`;
                qDisplay.style.opacity = '0';

                // Slide and fade in new question
                newQuestionEl.style.transform = 'translate3d(0, 0, 0)';
                newQuestionEl.style.opacity = '1';

                // After animation completes
                setTimeout(() => {
                    // Remove old question and promote new question to current
                    qDisplay.remove();
                    newQuestionEl.id = 'qDisplay';
                    newQuestionEl.className = '';
                }, 400);
            });
        }
    }
});

// Override the existing question functions to update currentCategory
// Function to update question with proper history tracking
function updateQuestionWithHistory() {
    const currentQuestion = document.getElementById('qDisplay').textContent;
    addToHistory(currentQuestion);
}

const originalNewFamily = window.newFamily;
window.newFamily = function () {
    originalNewFamily();
    currentCategory = family;
    updateQuestionWithHistory();
}

const originalNewThisOrThat = window.newThisOrThat;
window.newThisOrThat = function () {
    originalNewThisOrThat();
    currentCategory = thisorthat;
    updateQuestionWithHistory();
}

const originalNewHypo = window.newHypo;
window.newHypo = function () {
    originalNewHypo();
    currentCategory = hypo;
    updateQuestionWithHistory();
}

const originalNewShow = window.newShow;
window.newShow = function () {
    originalNewShow();
    currentCategory = show;
    updateQuestionWithHistory();
}

const originalNewPersonal = window.newPersonal;
window.newPersonal = function () {
    originalNewPersonal();
    currentCategory = personal;
    updateQuestionWithHistory();
}

const originalNewReligion = window.newReligion;
window.newReligion = function () {
    originalNewReligion();
    currentCategory = religion;
    updateQuestionWithHistory();
}

const originalNewPolitics = window.newPolitics;
window.newPolitics = function () {
    originalNewPolitics();
    currentCategory = politics;
    updateQuestionWithHistory();
}

const originalNewRelation = window.newRelation;
window.newRelation = function () {
    originalNewRelation();
    currentCategory = relation;
    updateQuestionWithHistory();
}

const originalNewRandom = window.newRandom;
window.newRandom = function () {
    originalNewRandom();
    updateCurrentCategory(document.getElementById('qDisplay').textContent);
    updateQuestionWithHistory();
}
