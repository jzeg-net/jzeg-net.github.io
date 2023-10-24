function listenerPasswordInputType (formEl) {
  let allPasswordInput = formEl.querySelectorAll('.toggleDisplay')

  allPasswordInput.forEach(function (currentPasswordInput) {
    currentPasswordInput.addEventListener('click', () => {
      changePasswordInputType(currentPasswordInput)
    })
  })
}

function changePasswordInputType (PasswordInput) {
  let svgUse = PasswordInput.querySelector('svg').querySelector('use')
  let input = PasswordInput.parentElement.querySelector('input')

  switch (input.type) {
    case 'text':
      input.type = 'password'
      svgUse.setAttribute('href', '#bi-eye-slash-fill')
      PasswordInput.title = '点击后显示密码'
      break
    case 'password':
      input.type = 'text'
      svgUse.setAttribute('href', '#bi-eye-fill')
      PasswordInput.title = '点击后隐藏密码'
      break
    default:
      break
  }
}
