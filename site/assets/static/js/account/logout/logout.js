let logout = document.querySelectorAll('.logout')
logout.forEach(function (triggerBtn) {
    triggerBtn.addEventListener('click', event => {
        event.preventDefault()
        btnStatus(triggerBtn)

        let fetchData = {
            t: String(Date.now()),
            key: '1666666666666',
        }
        let fetchOptions = getFetchOptions(fetchData)

        fetch(accountApiUrl + '/logout.php', fetchOptions)
            .then(response => response.json())
            .then(response => {
                bModal('', createSmallCenterText(response['msg'], 'success'), '', 'sm', true)
            })
            .catch(error => console.error('logout_error:', error))
    })
})
