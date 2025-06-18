const changePasswordInputType = PasswordInput => {
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

const listenerPasswordInputType = formEl => {
  let allPasswordInput = formEl.querySelectorAll('.toggleDisplay')

  allPasswordInput.forEach(function (currentPasswordInput) {
    currentPasswordInput.addEventListener('click', () => {
      changePasswordInputType(currentPasswordInput)
    })
  })
}

const getFormData = formEl => {
  const form = new FormData(formEl)
  const formData = {}

  form.forEach(($value, $key) => {
    formData[$key] = $value
  })

  return formData
}

const newSpinner = () => {
  let spinner = document.createElement('span')
  let spinnerVisuallyHidden = document.createElement('span')

  spinner.className = 'me-2 spinner-border spinner-border-sm'
  spinner.setAttribute('role', 'status')

  spinnerVisuallyHidden.className = 'visually-hidden'
  spinnerVisuallyHidden.innerText = '加载中'

  spinner.appendChild(spinnerVisuallyHidden)

  return spinner
}

const insertNewElement = (calledElement, newElement, where = 'afterbegin') => {
  calledElement.insertAdjacentElement(where, newElement)
}

const btnDisabledStatus = btnElement => {
  btnElement.classList.toggle('disabled')
  btnElement.toggleAttribute('disabled')
}

const clearSpinner = submit => {
  submit.querySelector('.spinner-border').remove()
}

const clearFormSpinner = formEl => {
  let submit = formEl.querySelector('[type=submit]')

  btnDisabledStatus(submit)
  clearSpinner(submit)
}

const submitStatus = formEl => {
  let submit = formEl.querySelector('[type=submit]')

  insertNewElement(submit, newSpinner())
  btnDisabledStatus(submit)
}
