// Global variable for animating the search bar
var page_side = $(window).scrollLeft();
window.onload = function() {
//Animate search bar to the top of the page
        $('.search-wrapper').animate({
            right: page_side + 150,
        }, 1000);
}

$(document).ready(function () {
    //function to submit search with enter key
    $('#userInput').keydown(function (enter) {
        if (enter.which == 13) {
            $('#search').click();
        }
    });

    //click function to submit search
    $('#search').click(function () {

        $('.backgroundimage').css("overflow", "scroll");

        // Variables
        var userInput = $('#userInput').val(); //user input variable
        var urlAPI = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + userInput +
            "&format=json&callback=?" // API variable

        // AJAX call to wikipedia API
        $.ajax({
            url: urlAPI,
            async: false,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                $('#articles').html(''); //clear content before new search
                for (var i = 0; i < data[1].length; i++) {
                    $('#articles').prepend("<a target='_blank' href= " + data[3][i] + "><li><font color='#F3E08A'>" +
                        data[1][i] + "</font><p>" + data[2][i] + "</p></li></a>");
                }
                $('#userInput').val(''); //clear search bar content after searching
            },
            error: function (error) {
                console.log(error);
            }
        })
    });
    $('.search-icon').on('click', function (event) {
        $('#articles').addClass('animated slideInUp');
        $('#articles').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('#articles').removeClass('animated slideInUp');
        });
    });
});
//function for opening and closing search bar
function searchAnimation(obj, evt) {
    var container = $(obj).closest('.search-wrapper');
    if (!container.hasClass('active')) {
        container.addClass('active');
        var randomText = document.getElementById('random');
        randomText.innerHTML += "random";
        evt.preventDefault();
    } else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
        container.removeClass('active');
        container.find('.search-input').val('');
        var randomText = document.getElementById('random');
        randomText.innerHTML = "";
        $('#articles').html(''); // clear page after clicking close
        $('.backgroundimage').css("overflow", "hidden");
    }
}