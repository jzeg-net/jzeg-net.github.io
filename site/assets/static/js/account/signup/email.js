let signup_email = document.querySelector('#signup_email')
if (signup_email) {
    listenCaptcha(signup_email)
    listenSendBtn(signup_email)
    listenerPasswordInputType(signup_email)

    signup_email.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(signup_email)
        let formData = getFormData(signup_email)

        let fetchData = {
            type: formData['type'],
            account: formData['account'],
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
                    responseCode(response, signup_email)
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
