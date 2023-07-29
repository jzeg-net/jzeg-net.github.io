// 表单
let passwork_login = document.querySelector('#passwork_login')
if (passwork_login) {
  listenerPasswordInputTye(passwork_login)
  passwork_login.addEventListener('submit', (event) => {
    event.preventDefault()
    submitForm()
    requestWakelock().then((result) => { screenStatus.checked = result })
  })
}
let autoSubmit = document.querySelector('#autoSubmit')
let autoSubmitTotalTimes = document.querySelector('#autoSubmitTotalTimes')
let automaticNextLevel = document.querySelector('#automaticNextLevel')

function submitForm () {
  submitStatus(passwork_login)
  submitTimerInterval(passwork_login)

  let formData = getFormData(passwork_login)
  let fetchData = {
    account: formData['account'],
    password: formData['password'],
    throughNum: formData['throughNum'],
    level: formData['level'],
    userAgent: navigator.userAgent,
    captcha: formData['captcha'],
  }
  let fetchOptions = getFetchOptions(fetchData)

  fetch(`${zhghApiUrl}/passwork/index.php`, fetchOptions)
    .then(response => response.json())
    .then(response => {
      releaseWakelock().then((result) => { screenStatus.checked = !result })
      console.log(response)
      response = JSON.parse(JSON.stringify(response))
      if (response['errorMsg']) {
        bModal('', response['errorMsg'], '', 'sm', true)
      } else {
        resultTable.rows.add([
          response['name'],
          response['level'],
          response['right'],
          response['wrong'],
          response['time'],
          response['score']
        ])
      }
      clearFormSpinner(passwork_login)
      clearInterval(submitTimerIntervalID)
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
let simpleDatatables_classes_bootstrap = {
  active: 'active',
  disabled: 'disabled',
  selector: 'form-select',
  paginationList: 'pagination',
  paginationListItem: 'page-item',
  paginationListItemLink: 'page-link'
}
let simpleDatatables_labels_zh_CN = {
  placeholder: '搜索...',
  searchTitle: '表内搜索',
  perPage: '每页条目数',
  noRows: '没有找到条目',
  info: '显示 {start} 到 {end}（共 {rows} 条）',
  noResults: '没有结果与您的搜索查询匹配',
}
let resultTableOptions = {}
let resultTable = new simpleDatatables.DataTable('#resultTable', {
  columns: [
    {}
  ],
  classes: simpleDatatables_classes_bootstrap,
  labels: simpleDatatables_labels_zh_CN,
  fixedHeight: true,
  searchable: false,
  data: {
    'headings': ['分类', '关卡', '正确', '错误', '用时', '得分']
  }
})

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
