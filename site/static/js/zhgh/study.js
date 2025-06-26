// 表单
const study_form = document.querySelector('#study_form')

const autoSubmit = document.querySelector('#autoSubmit')
const autoSubmitTotalTimes = document.querySelector('#autoSubmitTotalTimes')

// 结果表格
let datatables

const datatablesAddRow = response => {
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
        'headings': ['类别', '获得', '用时', '时间']
      }
    })
  }

  datatables.rows.add([
    response['name'],
    response['total'],
    response['executionTime'],
    response['currentDateTime']['time'],
  ])
}

const submitForm = event => {
  event.preventDefault()
  requestWakelock().then((result) => { screenStatus.checked = result })
  document.addEventListener('visibilitychange', handleVisibilityChangeWakelock)
  submitStatus(study_form)
  submitTimerInterval(study_form)

  const formData = new FormData(study_form)
  const fetchData = Object.fromEntries(formData.entries())
  fetchData.account = getStorageZhghAccount()
  fetchData.password = getStorageZhghPassword()
  fetchData.userAgent = navigator.userAgent

  fetch(`${zhghApiUrl}/study/index`, fetchPostOptions(fetchData))
    .then(response => response.json())
    .then(response => {
      releaseWakelock().then((result) => { screenStatus.checked = !result })
      document.removeEventListener('visibilitychange', handleVisibilityChangeWakelock)

      response = JSON.parse(JSON.stringify(response))

      if (response['errorMsg']) {
        bModal('', createSmallCenterText(response['errorMsg'], 'danger'), '', 'sm', true)
      } else if (response['msg']) {
        bModal('', createSmallCenterText(response['msg'], 'danger'), '', 'sm', true)
      } else if (response['message']) {
        bModal('', createSmallCenterText(response['message'], 'danger'), '', 'sm', true)
      } else {
        datatablesAddRow(response)
      }

      if (response['errorMsg'] === '登录失败') return

      if (autoSubmitTotalTimes.value > 1) {
        --autoSubmitTotalTimes.value
        submitForm(event)
      }
    })
    .finally(() => {
      clearSubmitStatus(study_form)
      clearInterval(submitTimerIntervalID)
    })
    .catch(error => {
      console.error('passwork_error:', error)
      // alert('遇到错误，请尝试手动重试一次，如果依旧报本条错误，务必停止操作，并且反馈。')
      // autoSubmitTotalTimes.value = 1
      if (autoSubmitTotalTimes.value > 1) {
        --autoSubmitTotalTimes.value
        submitForm(event)
      }
    })
}

study_form?.addEventListener('submit', submitForm)
