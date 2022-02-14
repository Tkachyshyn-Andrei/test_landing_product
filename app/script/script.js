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
$.validator.methods.email = function (value, element) {
    return this.optional(element) || /[a-z]+@[a-z]+\.[a-z]+/.test(value);
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
let flatpickrInstance
const swalConfig = {
    title: 'Registration',
    html:
        `<form id="register_form">
                <div class="col-md-12 mb-3">
                  <label">Username</label>
                  <input type="text" id="login" class="form-control" placeholder="Username">
                </div>
                <div class="col-md-12 mb-3">
                  <label>Email</label>
                  <input type="email" id="email" name="email" class="form-control" placeholder="Enter email address">
                </div>
                <div class="col-md-12 mb-3">
                  <label>Phone</label>
                  <input class="form-control" id="phone" maxlength="10" placeholder="Enter phone number" >
                </div>
                <div class="col-md-12 mb-3">
                  <label>Date of birth</label>
                  <input id="expiry-date" class="form-control flatpickr-input" data-max-date=today placeholder="Enter date of birth">
                </div>
                <div class="col-md-12 mb-3">
                  <label>Country</label>
                  <select class="custom-select" id="country">
                  <option selected disabled value="">Select a country</option>
                  </select>
                </div>
                <button class="button sign_up_register">Sign in</button>
            </form>
            `,
    showConfirmButton: false,
    didRender(popup) {
        $.getJSON("https://trial.mobiscroll.com/content/countries.json", function (data) {
            data.forEach(({value, text}) => {
                $(popup).find('select#country').append($(`<option value="${value}">${text}</option>`))
            })
        });
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
};

$(".sign_up").on('click', function () {
    Swal.fire(swalConfig);
});

$('.sign_up_register').on('click', function() {
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
});

// $('.swal2-confirm').on('click', function () {
//     simulateAjaxRequest();
// });

// function simulateAjaxRequest() {
//     $("#register_form").validate({
//         rules: {
//             email: {
//                 required: true,
//                 email: true,
//             },
//         },
//         messages: {
//             email: {
//                 email: "Your email must be in the format of name@domain.com"
//             },
//         },
//     });
// }

// $(".sign_up").on('click', function () {
//     let flatpickrInstance
//     Swal.fire({
//         title: 'Registration',
//         html:
//             `<form id="register_form">
//                 <div class="col-md-12 mb-3">
//                   <label">Username</label>
//                   <input type="text" id="login" class="form-control" placeholder="Username">
//                 </div>
//                 <div class="col-md-12 mb-3">
//                   <label>Email</label>
//                   <input type="email" id="email" class="form-control" placeholder="Enter email address">
//                 </div>
//                 <div class="col-md-12 mb-3">
//                   <label>Phone</label>
//                   <input class="form-control" id="phone" maxlength="10" placeholder="Enter phone number" >
//                 </div>
//                 <div class="col-md-12 mb-3">
//                   <label>Date of birth</label>
//                   <input id="expiry-date" class="form-control flatpickr-input" data-max-date=today placeholder="Enter date of birth">
//                 </div>
//                 <div class="col-md-12 mb-3">
//                   <label>Country</label>
//                   <select class="custom-select" id="country">
//                   <option selected disabled value="">Select a country</option>
//                   </select>
//                 </div>
//             </form>
//             `,
//         confirmButtonText: 'Sign in',
//         confirmButtonClass: 'button',
//         buttonsStyling: false,
//         focusConfirm: false,
//         didRender(popup) {
//             $.getJSON("https://trial.mobiscroll.com/content/countries.json", function (data) {
//                 data.forEach(({value, text}) => {
//                     $(popup).find('select#country').append($(`<option value="${value}">${text}</option>`))
//                 })
//             });
//         },
//         preConfirm: () => {
//             // const login = Swal.getPopup().querySelector('#login').value
//             // const email = Swal.getPopup().querySelector('#email').value
//             // const phone = Swal.getPopup().querySelector('#phone').value
//             // const birthday = Swal.getPopup().querySelector('#expiry-date').value
//             // const country = Swal.getPopup().querySelector('#country').value
//             // // const loginReg = /[^a-zA-Z\s]/;
//             // // const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//             // // const phoneReg = /^\d{10}$/;
//             // if (!login || !email || !phone || !country || !birthday) {
//             //     Swal.showValidationMessage(`Please fill in all fields`)
//             // }
//             // // else if (loginReg.test(login)) {
//             // //     Swal.showValidationMessage(`Username only letters of the Latin`)
//             // // } else if (!emailReg.test(email)) {
//             // //     Swal.showValidationMessage(`The email should be in the format: email@domain.com`)
//             // // } else if (!phoneReg.test(phone)) {
//             // //     Swal.showValidationMessage(`The phone should be in the format: 0xxxxxxxxx`)
//             // // } else if (flatpickrInstance.selectedDates[0] > new Date()) {
//             // //     Swal.showValidationMessage(`Date of birth cannot be in the future`)
//             // // }
//             // return {login: login, email: email, phone: phone, birthday: birthday, country: country}
//         },
//         willOpen: () => {
//             flatpickrInstance = flatpickr(
//                 Swal.getPopup().querySelector('#expiry-date')
//             )
//         },
//         showClass: {
//             popup: 'animate__animated animate__fadeInDown'
//         },
//         hideClass: {
//             popup: 'animate__animated animate__fadeOutUp'
//         },
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire(
//                 {
//                     icon: 'success',
//                     title: 'Thank you for registering',
//                     showConfirmButton: false,
//                     timer: 2000,
//                     showClass: {
//                         popup: 'animate__animated animate__fadeInDown'
//                     },
//                     hideClass: {
//                         popup: 'animate__animated animate__fadeOutUp'
//                     }
//                 })
//         }
//     })
// });

