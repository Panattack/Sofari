window.addEventListener('load', function () {

    let form = document.getElementById('sign_up')

    /* Age validation; The website is intended for users aged 13 and above */
    let enteredBday = form.birthday

    enteredBday.addEventListener('change', function () {
        const enteredBdayDate = new Date(enteredBday.value)
        const currentDate = new Date()

        if (currentDate.getFullYear() - enteredBdayDate.getFullYear() < 13) {
            enteredBday.setCustomValidity('Caution! Our platform is intended for individuals aged 13 and above (Children\'s Online Privacy Protection Act (COPPA))')
        } else {
            enteredBday.setCustomValidity('')
        }
    })

    /* Password matching; Passwords should be identical */
    let password = form.password
    let confirmPassword = form.confirm_password

    confirmPassword.addEventListener('change', function () {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Passwords don\'t match')
        } else {
            confirmPassword.setCustomValidity('')
        }
    })


    /* At least one contact option selected */
    let submitBtn = form.querySelector('button[type="submit"]') /* This is checked on submit */

    submitBtn.addEventListener('click', function () {

        let uncheckedCheckboxes = form.querySelectorAll('input[name="contact_option"]:not(:checked)')
        let checkboxes = form.querySelectorAll('input[name="contact_option"]')

        if (uncheckedCheckboxes.length === checkboxes.length) {
            uncheckedCheckboxes[0].setCustomValidity('You should select at least 1 option')
        } else {
            checkboxes[0].setCustomValidity('')
        }
    })

})