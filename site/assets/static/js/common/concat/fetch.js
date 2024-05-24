function getFormData (formEl) {
  let form = new FormData(formEl)
  let formData = {}
  form.append('userAgent', navigator.userAgent)

  form.forEach(($value, $key) => {
    formData[$key] = $value
  })

  return formData
}

function fetchPostOptions (fetchData) {
  return {
    method: 'POST',
    body: JSON.stringify(fetchData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }
}

function fetchGetOptions (fetchData) {
  return {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(fetchData),
  }
}

function submitStatus (formEl) {
  let submit = formEl.querySelector('[type=submit]')

  insertNewElement(submit, newSpinner())
  btnDisabledStatus(submit)
}

function insertNewElement (calledElement, newElement, where = 'afterbegin') {
  calledElement.insertAdjacentElement(where, newElement)
}

function newSpinner () {
  let spinner = document.createElement('span')
  let spinnerVisuallyHidden = document.createElement('span')

  spinner.className = 'me-2 spinner-border spinner-border-sm'
  spinner.setAttribute('role', 'status')

  spinnerVisuallyHidden.className = 'visually-hidden'
  spinnerVisuallyHidden.innerText = '加载中'

  spinner.appendChild(spinnerVisuallyHidden)

  return spinner
}

function btnDisabledStatus (btnElement) {
  btnElement.classList.toggle('disabled')
  btnElement.toggleAttribute('disabled')
}

function clearFormSpinner (formEl) {
  let submit = formEl.querySelector('[type=submit]')

  btnDisabledStatus(submit)
  clearSpinner(submit)
}

function clearSpinner (submit) {
  submit.querySelector('.spinner-border').remove()
}
