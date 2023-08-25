let userLogin = document.querySelector('#userLogin')
if (userLogin) {
  listenerPasswordInputType(userLogin)
  userLogin.addEventListener('submit', submitForm)
}

function submitForm (event) {
  event.preventDefault()
  submitStatus(userLogin)

  let formData = getFormData(userLogin)
  let fetchData = {
    account: formData['account'],
    password: formData['password'],
    userAgent: navigator.userAgent,
    captcha: formData['captcha'],
  }
  let fetchOptions = fetchPostOptions(fetchData)

  fetch(`${zhghApiUrl}/login/index.php`, fetchOptions)
    .then(response => response.json())
    .then(response => {
      if (response['errorMsg']) {
        bModal('', createSmallCenterText(response['errorMsg'], 'danger'), '', 'sm', true)
      }

      bModal('', response['message'], '', 'sm', true)
      clearFormSpinner(userLogin)
    })
    .catch(error => {
      console.error('userLogin_error:', error)
      clearFormSpinner(userLogin)
    })
}
