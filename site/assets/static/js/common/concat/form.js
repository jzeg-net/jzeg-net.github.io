// 计时器ID
let submitTimerIntervalID

// 设置计时器开启
const submitTimerInterval = formEL => {
  let submit_timer = document.querySelector('#submit_timer')
  submit_timer.textContent = '0'

  submitTimerIntervalID = setInterval(() => {
    submit_timer.textContent++
  }, 1000)
}

// 重置计时器归零，并且清除计时器
const clearSubmitTimerInterval = (intervalID) => {
  let submit_timer = document.querySelector('#submit_timer')
  submit_timer.textContent = '0'

  clearInterval(intervalID)
}

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

// 在指定元素的指定位置，插入指定的新元素
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

const clearSubmitStatus = formEl => {
  let submit = formEl.querySelector('[type=submit]')

  btnDisabledStatus(submit)
  clearSpinner(submit)
}

const submitStatus = formEl => {
  let submit = formEl.querySelector('[type=submit]')

  insertNewElement(submit, newSpinner())
  btnDisabledStatus(submit)
}

// 创建 option 元素
const createOption = data => {
  let opt = document.createElement('option')
  opt.value = data.value
  opt.textContent = data.text

  return opt
}

// 链接添加查询参数
const addQueryParams = (url, params) => {
  const queryString = new URLSearchParams(params)

  return `${url}?${queryString.toString()}`
}

// 将秒数转换为 HH:MM:SS 格式的字符串
const formatSecondsToHMS = seconds => {
  // 计算小时数
  const hours = Math.floor(seconds / 3600)
  // 计算分钟数
  const minutes = Math.floor((seconds % 3600) / 60)
  // 计算秒数
  const remainingSeconds = seconds % 60

  // 返回格式化的字符串
  return `${hours} 小时 ${minutes} 分 ${remainingSeconds} 秒`
}
