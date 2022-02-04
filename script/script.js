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

$(document).ready(function () {
    $('[href^="#"]').on('click', function (event) {
        if ($(this).attr('hash') !== "") {
            event.preventDefault();
            let hash = $(this).prop('hash');
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 3000, function () {
            });
        }
    });
});

// Ефект нахилу картки
VanillaTilt.init(document.querySelectorAll(".card_price"), {
    max: 25,
    speed: 400,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    perspective: 500,
    transition: true
});

// validation
$(document).ready(function () {
    $("#form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
        },
        messages : {
            email: {
                email: "The email should be in the format: email@domain.com"
            },
        },
    });
});