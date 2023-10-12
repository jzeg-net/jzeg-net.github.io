let change_profile = document.querySelector('#change_profile')
if (change_profile) {
    change_profile.addEventListener('submit', event => {
        event.preventDefault()
        submitBtnStatus(change_profile)
        let formData = getFormData(change_profile)

        let fetchData = {
            type: formData['type'],
            locale: formData['locale'],
            gender: formData['gender'],
            alipay: formData['alipay'],
            weixin: formData['weixin'],
            qq: formData['qq'],
            address: formData['address'],
            token: getToken(),
        }
        let fetchOptions = getFetchOptions(fetchData)

        fetch(accountApiUrl + '/change.php', fetchOptions)
            .then(response => response.json())
            .then(response => {
                if (response['code']) {
                    responseCode(response, change_profile)
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
