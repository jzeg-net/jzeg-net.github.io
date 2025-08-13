// 表单
const passwork_form = document.querySelector('#passwork_form')

const loop = document.querySelector('#loop')
const automaticNextLevel = document.querySelector('#automaticNextLevel')

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
        'headings': ['分类', '关卡', '正确 / 错误', '用时', '得分']
      }
    })
  }
  datatables.rows.add([
    response['name'],
    response['level'],
    response['right'] + ' / ' + response['wrong'],
    response['time'],
    response['score']
  ])
}

const submitForm = event => {
  event.preventDefault()
  requestWakelock().then((result) => { screenStatus.checked = result })
  document.addEventListener('visibilitychange', handleVisibilityChangeWakelock)
  submitStatus(passwork_form)
  submitTimerInterval(passwork_form)

  const path = 'passwork/index'
  const formData = new FormData(passwork_form)
  const data = Object.fromEntries(formData.entries())
  data.userAgent = navigator.userAgent

  zhghAxios.post(path, data)
    .then(res => {
      releaseWakelock().then((result) => { screenStatus.checked = !result })
      document.removeEventListener('visibilitychange', handleVisibilityChangeWakelock)

      res = JSON.parse(JSON.stringify(res))

      if (res['errorMsg']) {
        bModal('', createSmallCenterText(res['errorMsg'], 'danger'), '', 'sm', true)
        return
      } else if (res['msg']) {
        bModal('', createSmallCenterText(res['msg'], 'danger'), '', 'sm', true)
        return
      } else if (res['message']) {
        bModal('', createSmallCenterText(res['message'], 'danger'), '', 'sm', true)
        return
      }

      datatablesAddRow(res)

      if (automaticNextLevel.checked && level.value < 30) {
        level.value++
        levels_range.value = level.value
      }
      if (loop.value > 1) {
        --loop.value
        submitForm(event)
      }
    })
    .finally(() => {
      clearSubmitStatus(passwork_form)
      clearInterval(submitTimerIntervalID)
    })
    .catch(err => {
      console.error('passwork_error:', err)
      bModal('', createSmallCenterText(err.message, 'danger'), '', 'sm', true)
    })
}

passwork_form?.addEventListener('submit', submitForm)

// 关卡滑动条
const level = document.querySelector('#level')
const levels_range = document.querySelector('#levels_range')

level?.addEventListener('input', () => levels_range.value = level.value)
levels_range?.addEventListener('input', () => level.value = levels_range.value)
