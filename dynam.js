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

    // Close modals when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == suggestionModal) {
            suggestionModal.style.display = "none";
        }
    }
};