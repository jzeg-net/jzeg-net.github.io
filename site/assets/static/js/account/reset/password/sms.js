let reset_password_sms = document.querySelector('#reset_password_sms')
if (reset_password_sms) {
    listenCaptcha(reset_password_sms)
    listenIdd_code(reset_password_sms)
    listenSendBtn(reset_password_sms)

    reset_password_sms.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(reset_password_sms)
    })
}
