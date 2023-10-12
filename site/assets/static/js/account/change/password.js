let change_password = document.querySelector('#change_password')
if (change_password) {
    listenCaptcha(change_password)
    listenerPasswordInputType(change_password)

    change_password.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(change_password)
        let formData = getFormData(change_password)

        let fetchData = {
            type: formData['type'],
            account: formData['account'],
            password: formData['password'],
            account_captcha: formData['account_captcha'],
            captcha: formData['captcha'],
            token: getToken(),
        }
        let fetchOptions = getFetchOptions(fetchData)

        fetch(accountApiUrl + '/change.php', fetchOptions)
            .then(response => response.json())
            .then(response => {
                if (response['code']) {
                    responseCode(response, change_password)
                } else {
                    let x = bModal('', createSmallCenterText(response['msg'], 'success'), '', 'sm', true)
                    document.querySelector('#' + x).addEventListener('hidden.bs.modal', () => {
                        location.replace('/')
                    })
                }
            })
            .catch(error => console.error('change_error:', error))

    })
}
