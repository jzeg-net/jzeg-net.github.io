let reset_password_email = document.querySelector('#reset_password_email')
if (reset_password_email) {
    listenCaptcha(reset_password_email)
    listenSendBtn(reset_password_email)

    reset_password_email.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(reset_password_email)
    })
}
