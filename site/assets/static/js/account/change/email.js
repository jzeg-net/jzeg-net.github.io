const change_email = document.querySelector('#change_email')
if (change_email) {
  listenCaptcha(change_email)
  listenSendBtn(change_email)

  change_email.addEventListener('submit', event => {
    event.preventDefault()
    submitBtnStatus(change_email)
    const formData = getFormData(change_email)

    const fetchData = {
      type: formData['type'],
      account: formData['account'],
      password: formData['password'],
      account_captcha: formData['account_captcha'],
      captcha: formData['captcha'],
      token: getToken(),
    }
    const fetchOptions = getFetchOptions(fetchData)

    fetch(accountApiUrl + '/change.php', fetchOptions)
      .then(response => response.json())
      .then(response => {
        if (response['code']) {
          responseCode(response, change_email)
        } else {
          const x = bModal('', createSmallCenterText(response['msg'], 'success'), '', 'sm', true)
          document.querySelector('#' + x).addEventListener('hidden.bs.modal', () => {
            location.replace('/')
          })
        }
      })
      .catch(error => console.error('change_error:', error))
  })
}
