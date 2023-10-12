let signup_sms = document.querySelector('#signup_sms')
if (signup_sms) {
    listenCaptcha(signup_sms)
    listenIdd_code(signup_sms)
    listenSendBtn(signup_sms)
    listenerPasswordInputType(signup_sms)

    signup_sms.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(signup_sms)
        let formData = getFormData(signup_sms)

        let fetchData = {
            type: formData['type'],
            account: formData['account'],
            idd_code: formData['idd_code'],
            password: formData['password'],
            captcha: formData['captcha'],
            account_captcha: formData['account_captcha'],
            agreement: formData['agreement'] === 'on',
            token: getToken(),
        }
        let fetchOptions = getFetchOptions(fetchData)

        fetch(accountApiUrl + '/signup.php', fetchOptions)
            .then(response => response.json())
            .then(response => {
                if (response['code']) {
                    responseCode(response, signup_sms)
                } else {
                    let x = bModal('', createSmallCenterText(response['msg'], 'success'), '', 'sm', true)
                    document.querySelector('#' + x).addEventListener('hidden.bs.modal', () => {
                        // location.replace('/account/login.php')
                    })
                }
            })
            .catch(error => console.error('signup_error:', error))
    })
}
