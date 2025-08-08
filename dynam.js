window.onload = function(){ 
    // Main Menu Modal
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    // Suggestion Modal
    var suggestionModal = document.getElementById("suggestionModal");
    var suggestionBtn = document.getElementById("suggestBtn");
    var closesuggestion = document.getElementsByClassName("close-suggestion")[0];

    suggestionBtn.onclick = function(e) {
        e.preventDefault();
        suggestionModal.style.display = "block";
    }

    closesuggestion.onclick = function() {
        suggestionModal.style.display = "none";
    }

    // Search Modal
    var searchModal = document.getElementById("searchModal");
    var searchBtn = document.getElementById("searchBtn");
    var closeSearch = document.getElementsByClassName("close-search")[0];
    var searchInput = document.getElementById("searchInput");
    var searchResults = document.getElementById("searchResults");

    // Function to search questions
    function searchQuestions(query) {
        query = query.toLowerCase();
        let results = [];
        
        // Search in all question arrays
        const categories = {
            'Family Questions': family,
            'This or That': thisorthat,
            'Hypothetical Questions': hypo,
            'Show Me Questions': show,
            'Personal Questions': personal
        };

        for (let category in categories) {
            categories[category].forEach(question => {
                if (question.toLowerCase().includes(query)) {
                    results.push({ category, question });
                }
            });
        }

        return results;
    }

    // Function to display search results
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p style="padding: 10px;">No questions found matching your search.</p>';
            return;
        }

        let currentCategory = '';
        let html = '';

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

    searchBtn.onclick = function(e) {
        e.preventDefault();
        searchModal.style.display = "block";
        searchInput.focus();
    }

    closeSearch.onclick = function() {
        searchModal.style.display = "none";
    }

    // Add search input handler
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const results = searchQuestions(this.value);
            displayResults(results);
        }, 300); // Debounce search for better performance
    });

    // Close modals when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == suggestionModal) {
            suggestionModal.style.display = "none";
        }
        if (event.target == searchModal) {
            searchModal.style.display = "none";
        }
    }
};