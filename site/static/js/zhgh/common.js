// 页面工具
let zhghApiUrl = 'https://api.zhgh.jzeg.net'
// 页面工具
let newTabPage = document.querySelector('#newTabPage')
let refreshPage = document.querySelector('#refreshPage')
if (newTabPage) {
  newTabPage.href = location.origin + location.pathname
}
if (refreshPage) {
  refreshPage.addEventListener('click', (event) => {
    event.preventDefault()
    location.reload()
  })
}

// 选择工种
let throughSelect = document.querySelector('#throughSelect')
if (throughSelect) {
  throughSelect.addEventListener('click', () => {
    let fetchOptions = fetchPostOptions([])

    fetch(`${zhghApiUrl}/type_of_work/index.php`, fetchOptions)
      .then(response => response.json())
      .then(response => {
        Object.keys(response).forEach(xx => {
          let data = {
            value: xx,
            text: response[xx]
          }
          throughSelect.append(createOption(data))
        })
      })
      .catch(error => console.error('type_of_work_error', error))
  }, { once: true })
}

function createOption (data) {
  let opt = document.createElement('option')
  opt.value = data.value
  opt.innerText = data.text

  return opt
}

// 提交按钮计时
let submitTimerIntervalID

function submitTimerInterval (formEL) {
  let submit_timer = formEL.querySelector('#submit_timer')
  submit_timer.textContent = '0'

  submitTimerIntervalID = setInterval(() => {
    submit_timer.textContent++
  }, 1000)
}

function listenerPasswordInputTye (formEl) {
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
