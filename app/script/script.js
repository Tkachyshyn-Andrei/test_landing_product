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


// validation login form
$.validator.methods.login = function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9-_][a-zA-Z0-9-_]{1,20}$/.test(value);
}
$.validator.methods.email = function (value, element) {
    return this.optional(element) || /^([\w-.]+@([\w-]+\.)+[\w-]{1,4})?$/.test(value);
}

$.validator.methods.phone = function (value, element) {
    return this.optional(element) || /^\d{10}$/.test(value);
}

$("#login_form").validate({
    rules: {
        email: {
            required: true,
            email: true,
        },
        password: {
            required: true,
            minlength: 6,
        }
    },
    messages: {
        email: {
            email: "Your email must be in the format of name@domain.com"
        },
    },
    submitHandler: function () {
        history.go(-1);
        return false;
    }
});


// validation button "Sign up Now"
$("#form_sign_up_now").validate({
    rules: {
        email: {
            required: true,
            email: true,
        },
    },
    messages: {
        email: {
            email: "Your email must be in the format of name@domain.com"
        },
    },
});
$('#form_sign_up_now').bind('keyup blur', function () {
    if ($('#form_sign_up_now').validate().checkForm()) {
        $('#submitBtn').prop('disabled', false);
    } else {
        $('#submitBtn').prop('disabled', true);
    }
});


// modal email
$(".section_2_btn").on('click', function () {
    Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address',
        validationMessage: 'The email should be in the format: email@domain.com',
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

//modal registration
let flatpickrConfig
let flatpickrInstance
const swalConfig = {
    title: 'Registration',
    html:
        `<form id="register_form">
                <div class="col-md-12 mb-1">
                  <label">Username</label>
                  <input type="text" id="login" name="login" class="form-control" placeholder="Username">
                </div>
                <div class="col-md-12 mb-1">
                  <label>Email</label>
                  <input type="email" id="email" name="email" class="form-control" placeholder="Enter email address">
                </div>
                <div class="col-md-12 mb-1">
                  <label>Phone</label>
                  <input class="form-control" id="phone" name="phone" maxlength="10" placeholder="Enter phone number" >
                </div>
                <div class="col-md-12 mb-1">
                  <label>Date of birth</label>
                  <input id="expiry-date" name="date" class="form-control flatpickr-input"  data-max-date=today placeholder="Select date of birth">
                </div>
                <div class="col-md-12 mb-2">
                  <label>Country</label>
                  <select class="custom-select" id="country" name="country">
                  <option selected disabled value="">Select a country</option>
                  </select>
                </div>
                <button class="button sign_up_register">Sign in</button>
            </form>
            `,
    showConfirmButton: false,
    focusConfirm: false,
    didRender(popup) {
        $.getJSON("https://trial.mobiscroll.com/content/countries.json", function (data) {
            data.forEach(({value, text}) => {
                $(popup).find('select#country').append($(`<option value="${value}">${text}</option>`))
            })
        });
    },
    willOpen: () => {
        flatpickrConfig = {
            allowInput: true,
        };
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
};

$(".sign_up").on('click', function () {
    Swal.fire(swalConfig);
});
$('body').on('click', '.sign_up_register', function () {
    $("#register_form").validate({
        rules: {
            login: {
                required: true,
                login: true,
                minlength: 5,
                maxlength: 20
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                required: true,
                phone: true,
            },
            date: {
                required: true,
            },
            country: {
                required: true,
            },
        },
        messages: {
            login: {
                login: "Username only letters of the Latin"
            },
            email: {
                email: "Your email must be in the format of name@domain.com"
            },
            phone: {
                phone: "The phone should be in the format: 0xxxxxxxxx"
            },
        },
        submitHandler: function () {
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
    });
});