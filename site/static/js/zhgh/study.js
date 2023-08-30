// 表单
let study_login = document.querySelector('#study_login')
if (study_login) {
  listenerPasswordInputType(study_login)
  study_login.addEventListener('submit', submitForm)
}
let autoSubmit = document.querySelector('#autoSubmit')
let autoSubmitTotalTimes = document.querySelector('#autoSubmitTotalTimes')

function submitForm (event) {
  event.preventDefault()
  requestWakelock().then((result) => { screenStatus.checked = result })
  document.addEventListener('visibilitychange', handleVisibilityChangeWakelock)
  submitStatus(study_login)
  submitTimerInterval(study_login)

  let formData = getFormData(study_login)
  let fetchData = {
    account: formData['account'],
    password: formData['password'],
    throughNum: formData['throughNum'],
    userAgent: navigator.userAgent,
    captcha: formData['captcha'],
  }
  let fetchOptions = fetchPostOptions(fetchData)

  fetch(`${zhghApiUrl}/study/index.php`, fetchOptions)
    .then(response => response.json())
    .then(response => {
      releaseWakelock().then((result) => { screenStatus.checked = !result })
      document.removeEventListener('visibilitychange', handleVisibilityChangeWakelock)
      console.log(response)
      response = JSON.parse(JSON.stringify(response))
      if (response['errorMsg']) {
        if (response['errorMsg'] !== '空集合') {
          bModal('', createSmallCenterText(response['errorMsg'], 'danger'), '', 'sm', true)
        }
      } else {
        resultTable.rows.add([
          response['name'],
          response['total'],
          response['executionTime'],
          response['time'],
        ])
      }
      clearFormSpinner(study_login)
      clearInterval(submitTimerIntervalID)
      if (autoSubmit.checked && autoSubmitTotalTimes.value > 1) {
        --autoSubmitTotalTimes.value
        submitForm(event)
      }
    })
    .catch(error => {
      console.error('passwork_error:', error)
      // alert('遇到错误，请尝试手动重试一次，如果依旧报本条错误，务必停止操作，并且反馈。')
      clearFormSpinner(study_login)
      clearInterval(submitTimerIntervalID)
      // autoSubmitTotalTimes.value = 1
      if (autoSubmit.checked && autoSubmitTotalTimes.value > 1) {
        --autoSubmitTotalTimes.value
        submitForm(event)
      }
    })
}

// 结果表格
let resultTable = new simpleDatatables.DataTable('#resultTable', {
  columns: [
    {}
  ],
  classes: simpleDatatables_classes_bootstrap,
  labels: simpleDatatables_labels_zh_CN,
  fixedHeight: true,
  searchable: false,
  perPageSelect: [5, 10, 15, 20, 25, ['全部', 0]],
  data: {
    'headings': ['类别', '获得', '用时', '时间']
  }
})
