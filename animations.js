// Function to handle question transitions
function transitionToNewQuestion(newQuestionText) {
    const section = document.querySelector('section');
    section.classList.add('fade-out');

    setTimeout(() => {
        section.textContent = newQuestionText;
        section.classList.remove('fade-out');
        section.classList.add('fade-in');

        setTimeout(() => {
            section.classList.remove('fade-in');
        }, 300);
    }, 300);
}

// Function to show modal with animation
function showModal(modal) {
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Function to hide modal with animation
function hideModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300); // Match this with your CSS transition duration
}

// Counts for each category
const questionCounts = {
    'Family Questions': 0,
    'This or That': 0,
    'Hypothetical Questions': 0,
    'Show Me Questions': 0,
    'Personal Questions': 0
};
