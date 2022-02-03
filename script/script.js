$('.main-carousel').flickity({
    // options
    cellAlign: 'center',
    wrapAround: true,
    selectedAttraction: 0.01,
    friction: 0.15,
    resize: true,
    groupCells: 1
});

$(document).ready(function () {
    $('.navbar-toggler-icon').click(function () {
        $('.navbar-toggler-icon').toggleClass('open-menu');
    })
})

// прокрутка

$(document).ready(function(){
    $('[href^="#"]').on('click', function(event){
        if ($(this).attr('hash') !== "") {
            event.preventDefault();
            let hash = $(this).prop('hash');
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 3000, function(){
            });
        }
    });
});

