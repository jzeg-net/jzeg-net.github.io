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

  const path = 'study/index'
  const formData = new FormData(study_form)
  const data = Object.fromEntries(formData.entries())
  data.userAgent = navigator.userAgent

  zhghAxios.post(path, data)
    .then(res => {
      releaseWakelock().then((result) => { screenStatus.checked = !result })
      document.removeEventListener('visibilitychange', handleVisibilityChangeWakelock)

      datatablesAddRow(res)

      if (autoSubmitTotalTimes.value > 1) {
        --autoSubmitTotalTimes.value
        submitForm(event)
      }
    })
    .finally(() => {
      clearSubmitStatus(study_form)
      clearInterval(submitTimerIntervalID)
    })
    .catch(err => {
      bModal('', createSmallCenterText(err.message, 'danger'), '', 'sm', true)

      // autoSubmitTotalTimes.value = 1
      if (autoSubmitTotalTimes.value > 1) {
        --autoSubmitTotalTimes.value
        submitForm(event)
      }
    })
}

study_form?.addEventListener('submit', submitForm)
