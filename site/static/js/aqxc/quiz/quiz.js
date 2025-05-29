let quiz_form = document.querySelector('#quiz_form')

// 循环次数
let loopCount = document.querySelector('#loopCount')

let interval = document.querySelector('#interval')
let random = document.querySelector('#random')

// 结果表格
let datatables
const datatablesAddRow = data => {
  const { right_count, tester_score, tester_time } = data

  if (!datatables) {
    datatables = new simpleDatatables.DataTable('#simpleDatatables', {
      columns: [{}],
      classes: simpleDatatables_classes_bootstrap,
      labels: simpleDatatables_labels_zh_CN,
      fixedHeight: true,
      searchable: false,
      perPageSelect: [5, 10, 15, 20, 25, ['全部', 0]],
      data: {
        'headings': ['正确', '得分', '用时']
      }
    })
  }
  datatables.rows.add([
    right_count,
    tester_score,
    tester_time,
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
    .then(r => {
      if (!r.ok) {
        r.json().then(data => {
          bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
        })
        return Promise.reject(new Error(data.message))
      }
      return r.json()
    })
    .then(res => {
      datatablesAddRow(res)

      if (res['tester_score'] === 0) {
        let message = '你太棒了，今天的积分全都让你拿走了。'
        bModal('', createSmallCenterText(message, 'success'), '', 'sm', true)

        return
      }
      if (res['power'] < 2) {
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
      if (res['power'] >= 2) {
        console.log(interval.value)
        let randomTimeOut = (Math.random() + interval.value) * 1000

        if (random.checked) {
          // 随机延时（2秒 - 10秒）
          randomTimeOut = Math.floor(Math.random() * 9000) + 2000
        }
        console.log(randomTimeOut)
        // 递归调用
        setTimeout(() => handleFormSubmit(event), randomTimeOut)
        // 减少循环次数
        loopCount.value--

        return
      }

      let message = '咦~~，怎么回事？好奇怪啊，现在遇到了一个未知的问题，先停一停吧。'
      bModal('', createSmallCenterText(message, 'warning'), '', 'sm', true)
    })
    .finally(() => {
      clearSubmitStatus(quiz_form)
      clearSubmitTimerInterval(submitTimerIntervalID)
    })
}

if (quiz_form) quiz_form.addEventListener('submit', handleFormSubmit)
