$(function() {
    var extendedSearch = $(".extended-search");
    var extendedSearchButton = $(".extended-search-btn");
    var submenu = $(".submenu");
    var directionsMenu = $("#directions");
    var showNavBtn = $(".show-main-nav");
    var mainNav = $(".main-nav");
    $(".sliderRange").slider({
        range: true,
        min: 1,
        max: 3000,
        values: [1, 2000],
        slide: function(event, ui) {
            $("#amountMin").val(ui.values[0]);
            $("#amountMax").val(ui.values[1]);
        }
    });
    $("#amountMin").val($(".sliderRange").slider("values", 0));
    $("#amountMax").val($(".sliderRange").slider("values", 1));

    $(".datepicker").datepicker({
        minDate: 0
    });
    extendedSearchButton.on("click", function() {
        extendedSearch.toggleClass("hidden");
        $(this).toggleClass("reversed-background");
    });

    directionsMenu.hover(function() {
        submenu.toggleClass("hidden");
    });
    showNavBtn.on("click", function() {
        mainNav.toggleClass("visiable");
    });
    $(function() {

        $('.params__tab-item').on('click', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest(".params").find('.params__tab-content').removeClass('visiable').eq($(this).index()).addClass('visiable');
        });
    });
});