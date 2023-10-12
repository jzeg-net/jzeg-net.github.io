let login_normal = document.querySelector('#login_normal')
if (login_normal) {
    listenCaptcha(login_normal)
    listenerPasswordInputType(login_normal)

    login_normal.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(login_normal)
        let formData = getFormData(login_normal)

        let fetchData = {
            type: formData['type'],
            account: formData['account'],
            password: formData['password'],
            captcha: formData['captcha'],
            remember: formData['remember'] === 'on',
            token: getToken(),
        }
        let fetchOptions = getFetchOptions(fetchData)

        fetch(accountApiUrl + '/login.php', fetchOptions)
            .then(response => response.json())
            .then(response => {
                if (response['code']) {
                    responseCode(response, login_normal)
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
