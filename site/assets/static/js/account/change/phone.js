let change_phone = document.querySelector('#change_phone')
if (change_phone) {
    listenCaptcha(change_phone)
    listenIdd_code(change_phone)
    listenSendBtn(change_phone)

    change_phone.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(change_phone)
        let formData = getFormData(change_phone)

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
                    responseCode(response, change_phone)
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
