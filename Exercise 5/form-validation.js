window.addEventListener('load', function () {
    let form = document.getElementById('sign_up')
    let enteredBday = form.birthday

    enteredBday.onchange = function () {
        const enteredBdayDate = new Date(enteredBday.value)
        const currentDate = new Date()

        if (currentDate.getFullYear() - enteredBdayDate.getFullYear() < 13) {
            enteredBday.setCustomValidity('Caution! Our platform is intended for individuals aged 13 and above (Children\'s Online Privacy Protection Act (COPPA))')
        } else {
            enteredBday.setCustomValidity('')
        }
    }

    let password = form.password
    let confirmPassword = form.confirm_password


    let submitBtn = form.querySelector('button[type="submit"]')

    submitBtn.addEventListener('click', function () {
        // if (password.value === null){
        //     confirmPassword.setCustomValidity('You should type in your password first and then confirm it')
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Passwords don\'t match')
        } else {
            confirmPassword.setCustomValidity('')
        }

        let uncheckedCheckboxes = form.querySelectorAll('input[name="contact_option"]:not(:checked)')
        let checkboxes = form.querySelectorAll('input[name="contact_option"]')
        
        if (uncheckedCheckboxes.length === checkboxes.length) {
            uncheckedCheckboxes[0].setCustomValidity('You should select at least 1 option')
        } else {
            checkboxes[0].setCustomValidity('')
        }
    })

})
