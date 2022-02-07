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
$(".sign_up").on('click', function () {
    Swal.fire({
        title: 'Registration',
        html:
            `<input type="text" id="login" class="swal2-input" placeholder="Username">              
            <input type="email" id="email" class="swal2-input" placeholder="Enter email address">            
            <input type="text" id="phone" class="swal2-input" placeholder="Enter phone number">
            
            <input class="swal2-input flatpickr-input" id="expiry-date" placeholder="Enter date of birth" type="text" readonly="readonly">
            
            <select id="country" class="swal2-select"">
            <option value="" disabled="">Select a country</option> 
            <option value="bananas">Ukraine</option>   
            `,
        confirmButtonText: 'Sign in',
        focusConfirm: false,

        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login').value
            const email = Swal.getPopup().querySelector('#email').value
            const phone = Swal.getPopup().querySelector('#phone').value
            const country = Swal.getPopup().querySelector('#country').value
            const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (!emailReg.test( email ) ) {
                Swal.showValidationMessage(`The email should be in the format: email@domain.com`)
            } else
            if (flatpickrInstance.selectedDates[0] > new Date()) {
                Swal.showValidationMessage(`Please enter a valid date of birth`)
            }else
            if (!login || !email || !phone || !country) {
                Swal.showValidationMessage(`Please fill in all fields`)
            }
            return {login: login, email: email, phone: phone}
        },
        willOpen: () => {
            flatpickrInstance = flatpickr(
                Swal.getPopup().querySelector('#expiry-date')
            )
        },
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
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
