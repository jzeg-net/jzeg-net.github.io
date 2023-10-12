let login_email = document.querySelector('#login_email')
if (login_email) {
    listenCaptcha(login_email)
    listenSendBtn(login_email)

    login_email.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(login_email)
        let formData = getFormData(login_email)

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

        fetch(accountApiUrl + '/login.php', fetchOptions)
            .then(response => response.json())
            .then(response => {
                if (response['code']) {
                    responseCode(response, login_email)
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
