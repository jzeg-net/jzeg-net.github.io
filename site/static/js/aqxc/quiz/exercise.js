let quiz_form = document.querySelector('#quiz_form')
let url = aqxcApiUrl + 'quiz/exercise'

// 循环次数
let loopCount = document.querySelector('#loopCount')

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

// 显示结果
const displayQuizResults = data => {
  const { power, tester_score: score, tester_time: time, right_count: right, wrong_count: wrong } = data
  const messages = [
    `得分：${score}`,
    `安全B：${power}`,
    `用时：${time}`,
    `正确：${right}`,
    `错误：${wrong}`
  ].join('<br>')

  bModal('', createSmallCenterText(messages, 'success'), '', 'sm', true)
}

// 处理表单提交
const handleFormSubmit = event => {
  event.preventDefault()
  setSubmitStatus(quiz_form)
  setSubmitTimerInterval()
  let formData = new FormData(quiz_form)
  let data = Object.fromEntries(formData.entries())
  data.token = getStorageAqxcToken()
  data.account = getStorageAqxcAccount()

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      // 如果同时存在消息和错误信息，则显示模态框并返回
      if (res.hasOwnProperty('message') && (res.hasOwnProperty('code') || res.hasOwnProperty('errors'))) {
        bModal('', createSmallCenterText(res.message, 'danger'), '', 'sm', true)
        return
      }

      displayQuizResults(res.data)
      clearSubmitStatus(quiz_form)
      clearSubmitTimerInterval(submitTimerIntervalID)

      // 检查 power 值和 loopCount 的值来决定是否再次提交
      if (res.data.power >= 2 && loopCount.value > 1) {
        // 递归调用
        handleFormSubmit(event)
        // 减少循环次数
        loopCount.value--
      }
    })
    .catch(() => {
      clearSubmitStatus(quiz_form)
      clearSubmitTimerInterval(submitTimerIntervalID)
    })
    .finally(() => {
    })
}

if (quiz_form) quiz_form.addEventListener('submit', handleFormSubmit)
