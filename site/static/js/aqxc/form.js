// 计时器ID
let submitTimerIntervalID

// 设置计时器开启
const setSubmitTimerInterval = () => {
  let submit_timer = document.querySelector('#submit_timer')
  submit_timer.textContent = '0'

  submitTimerIntervalID = setInterval(() => {
    submit_timer.textContent++
  }, 1000)
}

// 重置计时器ID，并且清除计时器
const clearSubmitTimerInterval = (intervalID) => {
  let submit_timer = document.querySelector('#submit_timer')
  submit_timer.textContent = '0'

  clearInterval(intervalID)
}

// 提交按钮的状态效果
const createNewSpinner = () => {
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
const setInsertNewElement = (calledElement, newElement, where = 'afterbegin') => {
  calledElement.insertAdjacentElement(where, newElement)
}

// 设置按钮的禁用状态
const setBtnDisabledStatus = btnElement => {
  btnElement.classList.toggle('disabled')
  btnElement.toggleAttribute('disabled')
}

// 设置提交按钮的状态效果
const setSubmitStatus = formEl => {
  let submit = formEl.querySelector('[type=submit]')

  setInsertNewElement(submit, createNewSpinner())
  setBtnDisabledStatus(submit)
}

// 清除提交按钮中的加载图标
const clearSubmitSpinner = submit => {
  submit.querySelector('.spinner-border').remove()
}

// 清除提交按钮的状态效果
const clearSubmitStatus = formEl => {
  let submit = formEl.querySelector('[type=submit]')

  setBtnDisabledStatus(submit)
  clearSubmitSpinner(submit)
}

// 链接添加查询参数
const addQueryParams = (url, params) => {
  const queryString = new URLSearchParams(params)

  return `${url}?${queryString.toString()}`
}

// 将秒数转换为 HH:MM:SS 格式的字符串
function formatSecondsToHMS (seconds) {
  // 计算小时数
  const hours = Math.floor(seconds / 3600)
  // 计算分钟数
  const minutes = Math.floor((seconds % 3600) / 60)
  // 计算秒数
  const remainingSeconds = seconds % 60

  // 返回格式化的字符串
  return `${hours} 小时 ${minutes} 分 ${remainingSeconds} 秒`
}
