$('.main-carousel').flickity({
    // options
    cellAlign: 'center',
    wrapAround: true,
    selectedAttraction: 0.01,
    friction: 0.15,
    resize: true,
    groupCells: 1
});

$('.navbar-toggler-icon').click(function () {
    $('.navbar-toggler-icon').toggleClass('open-menu');
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

// validation button
document.getElementById('email_sign').onkeyup = countChars;
function countChars() {
    const chars = document.getElementById('email_sign').value;
    document.getElementById('submitBtn').disabled = chars.length < 1;
}


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
    let flatpickrInstance
    Swal.fire({
        title: 'Registration',
        html:
            `<input type="text" id="login" class="swal2-input" placeholder="Username">              
            <input type="email" id="email" class="swal2-input" placeholder="Enter email address">            
            <input type="text" id="phone" class="swal2-input" placeholder="Enter phone number">            
            <input class="swal2-input flatpickr-input" id="expiry-date" placeholder="Enter date of birth" readonly="readonly">            
            <select id="country" class="swal2-select">
                <option value="" disabled="" selected>Select a country</option> 
            </select>
            `,
        confirmButtonText: 'Sign in',
        didRender(popup) {
            $.getJSON("https://trial.mobiscroll.com/content/countries.json", function (data) {
                data.forEach(({value, text}) => {
                    $(popup).find('select#country').append($(`<option value="${value}">${text}</option>`))
                })
            });
        },
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login').value
            const email = Swal.getPopup().querySelector('#email').value
            const phone = Swal.getPopup().querySelector('#phone').value
            const birthday = Swal.getPopup().querySelector('#expiry-date').value
            const country = Swal.getPopup().querySelector('#country').value
            const loginReg = /[^a-z\s]/;
            const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            const phoneReg = /^\d{10}$/;
            if (!login || !email || !phone || !country || !birthday) {
                Swal.showValidationMessage(`Please fill in all fields`)
            } else if (loginReg.test(login)) {
                Swal.showValidationMessage(`Username only letters of the Latin`)
            } else if (!emailReg.test(email)) {
                Swal.showValidationMessage(`The email should be in the format: email@domain.com`)
            } else if (!phoneReg.test(phone)) {
                Swal.showValidationMessage(`The phone should be in the format: 0xxxxxxxxx`)
            } else if (flatpickrInstance.selectedDates[0] > new Date()) {
                Swal.showValidationMessage(`Date of birth cannot be in the future`)
            }
            return {login: login, email: email, phone: phone, birthday: birthday, country:country}
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
