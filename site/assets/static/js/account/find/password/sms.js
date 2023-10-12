let find_password_sms = document.querySelector('#find_password_sms')
if (find_password_sms) {
    listenCaptcha(find_password_sms)
    listenIdd_code(find_password_sms)
    listenSendBtn(find_password_sms)
    listenerPasswordInputType(find_password_sms)

    find_password_sms.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(find_password_sms)
        let formData = getFormData(find_password_sms)

        let fetchData = {
            type: formData['type'],
            account: formData['account'],
            password: formData['password'],
            account_captcha: formData['account_captcha'],
            captcha: formData['captcha'],
            token: getToken(),
        }
        let fetchOptions = getFetchOptions(fetchData)

        fetch(accountApiUrl + '/find.php', fetchOptions)
            .then(response => response.json())
            .then(response => {
                if (response['code']) {
                    responseCode(response, find_password_sms)
                } else {
                    let x = bModal('', createSmallCenterText(response['msg'], 'success'), '', 'sm', true)
                    document.querySelector('#' + x).addEventListener('hidden.bs.modal', () => {
                        location.replace('/')
                    })
                }
            })
            .catch(error => console.error('find_password_error:', error))
    })
}
