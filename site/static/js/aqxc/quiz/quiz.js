let quiz_form = document.querySelector('#quiz_form')

// 循环次数
let loopCount = document.querySelector('#loopCount')

// 结果表格
let datatables
const datatablesAddRow = data => {
  const { tester_score: score, tester_time: time, right_count: right, wrong_count: wrong } = data

  if (!datatables) {
    datatables = new simpleDatatables.DataTable('#simpleDatatables', {
      columns: [
        {}
      ],
      classes: simpleDatatables_classes_bootstrap,
      labels: simpleDatatables_labels_zh_CN,
      fixedHeight: true,
      searchable: false,
      perPageSelect: [5, 10, 15, 20, 25, ['全部', 0]],
      data: {
        'headings': ['正确', '错误', '得分', '用时']
      }
    })
  }
  datatables.rows.add([
    right,
    wrong,
    score,
    time,
  ])
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
      clearSubmitStatus(quiz_form)
      clearSubmitTimerInterval(submitTimerIntervalID)

      // 如果同时存在消息和错误信息，则显示模态框并返回
      if (res.hasOwnProperty('message') && (res.hasOwnProperty('code') || res.hasOwnProperty('errors'))) {
        bModal('', createSmallCenterText(res.message, 'danger'), '', 'sm', true)

        return
      }

      datatablesAddRow(res.data)

      if (res.data['tester_score'] === 0) {
        let message = '你太棒了，今天的积分全都让你拿走了。'
        bModal('', createSmallCenterText(message, 'success'), '', 'sm', true)

        return
      }
      if (res.data['power'] < 2) {
        let message = '你的安全B不足，答题需要消耗安全B。'
        bModal('', createSmallCenterText(message, 'success'), '', 'sm', true)

        return
      }
      if (loopCount.value <= 1) {
        let message = '你真是太顺利了，循环次数都已经用完了。'
        bModal('', createSmallCenterText(message, 'success'), '', 'sm', true)

        return
      }

      // 检查 power 值来决定是否重复提交
      if (res.data['power'] >= 2) {
        // 随机延时（1秒 - 2.5秒）
        let randomTimeOut = Math.floor(Math.random() * 1500) + 1000
        // 递归调用
        setTimeout(() => handleFormSubmit(event), randomTimeOut)
        // 减少循环次数
        loopCount.value--

        return
      }

      let message = '咦~~，怎么回事？好奇怪啊，现在遇到了一个未知的问题，先停一停吧。'
      bModal('', createSmallCenterText(message, 'warning'), '', 'sm', true)
    })
    .catch(() => {
      clearSubmitStatus(quiz_form)
      clearSubmitTimerInterval(submitTimerIntervalID)
    })
    .finally(() => {
    })
}

if (quiz_form) quiz_form.addEventListener('submit', handleFormSubmit)
