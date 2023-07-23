let userInfo = document.querySelector('#userInfo')
let resultTable = document.querySelector('#resultTable')
if (userInfo) {
  listenerPasswordInputTye(userInfo)
  userInfo.addEventListener('submit', submitForm)
}

function submitForm (event) {
  event.preventDefault()
  submitStatus(userInfo)

  let formData = getFormData(userInfo)
  let fetchData = {
    account: formData['account'],
    password: formData['password'],
    userAgent: navigator.userAgent,
    captcha: formData['captcha'],
  }
  let fetchOptions = getFetchOptions(fetchData)

  fetch('https://api.zhgh.jzeg.net/member/index.php', fetchOptions)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      if (response['errorMsg']) {
        bModal('', response['errorMsg'], '', 'sm', true)
      } else {
        // console.log(response)
        resultTable.textContent = JSON.stringify(response)
      }
      clearFormSpinner(userInfo)
    })
    .catch(error => {
      console.error('userInfo_error:', error)
      clearFormSpinner(userInfo)
    })
}
