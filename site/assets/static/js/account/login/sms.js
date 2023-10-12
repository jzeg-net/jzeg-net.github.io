let login_sms = document.querySelector('#login_sms')
if (login_sms) {
    listenCaptcha(login_sms)
    listenIdd_code(login_sms)
    listenSendBtn(login_sms)

    login_sms.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(login_sms)
        let formData = getFormData(login_sms)

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

        fetch(accountApiUrl + '/login.php', fetchOptions)
            .then(response => response.json())
            .then(response => {
                if (response['code']) {
                    responseCode(response, login_sms)
                } else {
                    let x = bModal('', createSmallCenterText(response['msg'], 'success'), '', 'sm', true)
                    document.querySelector('#' + x).addEventListener('hidden.bs.modal', () => {
                        // location.replace('/')
                    })
                }
            })
            .catch(error => console.error('login_error:', error))

    })
}
