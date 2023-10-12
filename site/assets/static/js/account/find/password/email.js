let find_password_email = document.querySelector('#find_password_email')
if (find_password_email) {
    listenCaptcha(find_password_email)
    listenSendBtn(find_password_email)
    listenerPasswordInputType(find_password_email)

    find_password_email.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(find_password_email)
        let formData = getFormData(find_password_email)

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
                    responseCode(response, find_password_email)
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
