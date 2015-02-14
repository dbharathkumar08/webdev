$(function () {

    $('input:text').focus(function () {
        $(this).val('');
    });

    $("#getValue").click(function () {
        var name = $("#bookname").val();
        $.ajax({
            url: "https://www.goodreads.com/search.xml?key=2vmAtTuaARiMpZLPpolFOA&q=" + name,
            success: function (books) {
                console.log(books);
            }
        });
    });
});
