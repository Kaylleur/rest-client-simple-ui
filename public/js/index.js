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

//toastr config
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}