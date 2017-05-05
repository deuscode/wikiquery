$(document).ready(function () {

    $('#userInput').keydown(function (enter) {
        if (enter.which == 13) {
            $('#search').click();
        }
    });

    $('#search').click(function () {

        var userInput = $('#userInput').val();
        var urlAPI = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + userInput + "&format=json&callback=?"

        $.ajax({
            url: urlAPI,
            async: false,
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                console.log(data[1][0]);
                console.log(data[2][0]);
                console.log(data[3][0]);
            },
            error: function (error) {
                console.log(error);
            }
        })
    });

});

function searchAnimation(obj, evt) {
    var container = $(obj).closest('.search-wrapper');
    if (!container.hasClass('active')) {
        container.addClass('active');
        evt.preventDefault();
    } else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
        container.removeClass('active');
        container.find('.search-input').val('');
    }
}