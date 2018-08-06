$(".sliderRange").slider({
        range: true,
        min: 200,
        max: 3000,
        values: [100, 600],
        slide: function (event, ui) {
            $("#amountMin").val(ui.values[0]);
            $("#amountMax").val(ui.values[1]);
        }
    });
    $("#amountMin").val($(".sliderRange").slider("values", 0));
    $("#amountMax").val($(".sliderRange").slider("values", 1));