$(function() {
$(".sliderRange").slider({
        range: true,
        min: 1,
        max: 3000,
        values: [1, 2000],
        slide: function (event, ui) {
            $("#amountMin").val(ui.values[0]);
            $("#amountMax").val(ui.values[1]);
        }
    });
    $("#amountMin").val($(".sliderRange").slider("values", 0));
    $("#amountMax").val($(".sliderRange").slider("values", 1));

$(".datepicker").datepicker({ minDate: 0 });

var extendedSearch = $(".extended-search");
var extendedSearchButton = $(".extended-search-btn");
extendedSearchButton.on("click",function(){
    console.log("dfvf");
    extendedSearch.toggleClass("hidden");
    $(this).toggleClass("reversed-background");
});
});