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
        messages: {
            email: {
                email: "The email should be in the format: email@domain.com"
            },
        },
    });
});
// validation button
const form = document.getElementById('form');
form.addEventListener("change", () => {
    document.getElementById('submitBtn').disabled = !form.checkValidity()
});

// modal email
const btn = document.getElementById('btn_expert');
btn.addEventListener('click', () => {
    Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                {
                    icon: 'success',
                    title: 'Your email has been sent',
                    showConfirmButton: false,
                    timer: 2000,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
        }
    })
});

// modal registration
$(".sign_up").on('click', function (){
    Swal.fire({
        title: 'Registration',
        html:
            `<input type="text" id="login" class="swal2-input" placeholder="Username">              
            <input type="email" id="email" class="swal2-input" placeholder="Enter email address">
            <input type="text" id="phone" class="swal2-input" placeholder="Enter phone number">
            <input type="number" id="birthday" class="swal2-input" placeholder="Enter date of birth">   
            <select id="country" class="swal2-select"">
            <option value="" disabled="">Select a country</option> 
            <option value="bananas">Ukraine</option>    
            <input class="swal2-input flatpickr-input" id="expiry-date" type="text" readonly="readonly">
            `,
        confirmButtonText: 'Sign in',
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login').value
            const email = Swal.getPopup().querySelector('#email').value
            const phone = Swal.getPopup().querySelector('#phone').value
            const birthday = Swal.getPopup().querySelector('#birthday').value
            const country = Swal.getPopup().querySelector('#country').value
            if (!login || !email || !phone || !birthday || !country) {
                Swal.showValidationMessage(`Please fill in all fields`)
            }
            return { login: login, email: email, phone: phone, birthday: birthday}
        },
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                {
                    icon: 'success',
                    title: 'Thank you for registering',
                    showConfirmButton: false,
                    timer: 2000,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
        }
    })
});
