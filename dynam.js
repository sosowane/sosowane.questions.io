window.onload = function () {
    // Get all modals
    const modals = document.querySelectorAll('.modal');

    // Main Menu Modal
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        showModal(modal);
    }

    span.onclick = function () {
        hideModal(modal);
    }

    // Suggestion Modal
    const suggestionModal = document.getElementById("suggestionModal");
    const suggestionBtn = document.getElementById("suggestBtn");
    const closesuggestion = document.getElementsByClassName("close-suggestion")[0];

    suggestionBtn.onclick = function (e) {
        e.preventDefault();
        hideModal(modal); // Hide main modal first
        showModal(suggestionModal);
        // Focus on the suggestion textarea
        setTimeout(() => {
            document.querySelector('.suggestion-textarea').focus();
        }, 100);
    }

    closesuggestion.onclick = function () {
        hideModal(suggestionModal);
    }

    // Search Modal
    const searchModal = document.getElementById("searchModal");
    const searchBtn = document.getElementById("searchBtn");
    const closeSearch = document.getElementsByClassName("close-search")[0];
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    // Add click handler for outside clicks on all modals
    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            // If the click is on the modal background (not the content)
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });

    searchBtn.onclick = function (e) {
        e.preventDefault();
        hideModal(modal); // Hide main modal first
        showModal(searchModal);
        setTimeout(() => {
            searchInput.focus();
            searchInput.value = '';
            searchResults.innerHTML = '';
        }, 100);
    }

    // Function to search questions
    function searchQuestions(query) {
        if (!query.trim()) {
            searchResults.innerHTML = '';
            return;
        }

        query = query.toLowerCase();
        let results = [];

        // Search in all question arrays
        const categories = {
            'Family': family,
            'This or That': thisorthat,
            'Hypothetical': hypo,
            'Show Me': show,
            'Personal': personal,
            'Religion': religion,
            'Politics': politics,
            'Relationships': relation
        };

        for (let category in categories) {
            if (categories[category]) {  // Check if array exists
                categories[category].forEach(question => {
                    if (question.toLowerCase().includes(query)) {
                        results.push({ category, question });
                    }
                });
            }
        }

        displayResults(results);
    }

    // Function to display search results
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p style="padding: 10px; color: #64a1da;">No questions found matching your search.</p>';
            return;
        }

        let currentCategory = '';
        let html = '<div class="search-results-container">';

        results.forEach(({ category, question }) => {
            if (category !== currentCategory) {
                if (currentCategory !== '') {
                    html += '</div>';
                }
                html += `
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: #64a1da; margin-bottom: 10px;">${category}</h4>
                `;
                currentCategory = category;
            }
            html += `<p style="padding: 5px 0;">${question}</p>`;
        });

        html += '</div>';
        searchResults.innerHTML = html;
    }

    searchBtn.onclick = function (e) {
        e.preventDefault();
        showModal(searchModal);
        searchInput.focus();
    }

    closeSearch.onclick = function () {
        hideModal(searchModal);
    }

    // Add search input handler
    let searchTimeout;
    searchInput.addEventListener('input', function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const results = searchQuestions(this.value);
            displayResults(results);
        }, 300); // Debounce search for better performance
    });

    // Handle clicks on modal backgrounds
    document.addEventListener('mousedown', handleModalClick);
    document.addEventListener('touchstart', handleModalClick);

    function handleModalClick(event) {
        const clickedModal = event.target.closest('.modal');
        // If we clicked inside a modal but not on the modal content
        if (clickedModal && !event.target.closest('.modal-content')) {
            hideModal(clickedModal);
            event.preventDefault(); // Prevent any default behavior
            event.stopPropagation(); // Stop event from bubbling
        }
    }
};