$(function () {
    var options = {
        types: ['(cities)']
       
    };

    var input = document.getElementById('cityname');
    var autocomplete = new google.maps.places.Autocomplete(input, options);
});