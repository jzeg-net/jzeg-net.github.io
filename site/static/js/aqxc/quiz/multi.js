let multi_form = document.querySelector('#multi_form')
let url = aqxcApiUrl + 'quiz/multi'

let loopCount = document.querySelector('#loopCount')

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
  submitStatus(multi_form)
  let formData = new FormData(multi_form)
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
      // 如果有 code 和 message，则显示错误信息，并且后面不再执行后续代码
      if (res.hasOwnProperty('code') && res.hasOwnProperty('message')) {
        bModal('', createSmallCenterText(res.message, 'danger'), '', 'sm', true)
        return
      }

      displayQuizResults(res.data)

      // 检查 power 值和 loopCount 的值来决定是否再次提交
      if (res.data.power >= 16 && loopCount.value > 1) {
        // 递归调用
        handleFormSubmit(event)
        // 减少循环次数
        loopCount.value--
      }
    })
    .finally(() => {
      clearFormSpinner(multi_form)
    })
}

if (multi_form) multi_form.addEventListener('submit', handleFormSubmit)
