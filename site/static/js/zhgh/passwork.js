// 表单
let passwork_login = document.querySelector('#passwork_login')
if (passwork_login) {
  listenerPasswordInputType(passwork_login)
  passwork_login.addEventListener('submit', submitForm)
}
let autoSubmit = document.querySelector('#autoSubmit')
let autoSubmitTotalTimes = document.querySelector('#autoSubmitTotalTimes')
let automaticNextLevel = document.querySelector('#automaticNextLevel')

function submitForm (event) {
  event.preventDefault()
  requestWakelock().then((result) => { screenStatus.checked = result })
  document.addEventListener('visibilitychange', handleVisibilityChangeWakelock)
  submitStatus(passwork_login)
  submitTimerInterval(passwork_login)

  let formData = getFormData(passwork_login)
  let fetchData = {
    account: formData['account'],
    password: formData['password'],
    jobName: formData['jobName'],
    level: formData['level'],
    speed: formData['speed'],
    userAgent: navigator.userAgent,
    captcha: formData['captcha'],
  }
  let fetchOptions = fetchPostOptions(fetchData)

  fetch(`${zhghApiUrl}/passwork/`, fetchOptions)
    .then(response => response.json())
    .then(response => {
      releaseWakelock().then((result) => { screenStatus.checked = !result })
      document.removeEventListener('visibilitychange', handleVisibilityChangeWakelock)
      console.log(response)
      response = JSON.parse(JSON.stringify(response))
      if (response['errorMsg']) {
        bModal('', createSmallCenterText(response['errorMsg'], 'danger'), '', 'sm', true)
      } else {
        datatablesAddRow(response)
      }
      clearFormSpinner(passwork_login)
      clearInterval(submitTimerIntervalID)

      if (response['errorMsg'] === '登录失败') return
      if (response['errorMsg'] === '每日学习限时1小时，请明天再来，谢谢') return

      if (automaticNextLevel.checked && level.value < 30) {
        level.value++
        levels_range.value = level.value
      }
      if (autoSubmit.checked && autoSubmitTotalTimes.value > 1) {
        --autoSubmitTotalTimes.value
        submitForm(event)
      }
    })
    .catch(error => {
      console.error('passwork_error:', error)
      clearFormSpinner(passwork_login)
      clearInterval(submitTimerIntervalID)
      if (autoSubmit.checked && autoSubmitTotalTimes.value > 1) {
        --autoSubmitTotalTimes.value
        submitForm(event)
      }
    })
}

// 结果表格
let datatables

function datatablesAddRow (response) {
  if (!datatables) {
    datatables = new simpleDatatables.DataTable('#resultTable', {
      columns: [
        {}
      ],
      classes: simpleDatatables_classes_bootstrap,
      labels: simpleDatatables_labels_zh_CN,
      fixedHeight: true,
      searchable: false,
      perPageSelect: [5, 10, 15, 20, 25, ['全部', 0]],
      data: {
        'headings': ['分类', '关卡', '正确', '错误', '用时', '得分']
      }
    })
  }
  datatables.rows.add([
    response['name'],
    response['level'],
    response['right'],
    response['wrong'],
    response['time'],
    response['score']
  ])
}

// 关卡滑动条
let level = document.querySelector('#level')
let levels_range = document.querySelector('#levels_range')
if (level && levels_range) {
  level.addEventListener('input', () => {
    levels_range.value = level.value
  })
  levels_range.addEventListener('input', () => {
    level.value = levels_range.value
  })
}
