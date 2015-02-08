$(function () {
    
    $("#srch").bind("click", function() {
        // pull in the new value
        var searchTerm = $("#searchtext").val();

        // remove/update any old highlighted terms
        $("#para").removeHighlight();

        // disable highlighting if empty
        if (searchTerm) {
            // highlight the new term
            $("#para").highlight(searchTerm);
        }
    });
});