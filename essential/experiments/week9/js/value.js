$("#rateit5").bind("click", function () {
    alert("clicked");
    $('#value5').text('You\'ve rated it: ' + value);
});
$("#rateit5").bind('reset', function () {
    $('#value5').text('Rating reset');
});