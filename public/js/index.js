$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    var span = $(this).children('span');
    if(span.hasClass('glyphicon-chevron-left')){
        span.removeClass('glyphicon-chevron-left')
            .addClass('glyphicon-chevron-right');
    }else{
        span.removeClass('glyphicon-chevron-right')
            .addClass('glyphicon-chevron-left');
    }

    $('#options a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });
});