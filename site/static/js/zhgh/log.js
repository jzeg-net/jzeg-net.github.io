let logInfo = document.querySelector('#logInfo')
let result = document.querySelector('#result')
if (logInfo) {
  listenerPasswordInputTye(logInfo)
  logInfo.addEventListener('submit', submitForm)
}

function submitForm (event) {
  event.preventDefault()
  submitStatus(logInfo)

  let formData = getFormData(logInfo)
  let fetchData = {
    account: formData['account'],
    password: formData['password'],
    userAgent: navigator.userAgent,
    captcha: formData['captcha'],
  }
  let fetchOptions = fetchPostOptions(fetchData)

  fetch(`${zhghApiUrl}/log/index.php`, fetchOptions)
    .then(response => response.json())
    .then(response => {
      if (response['errorMsg']) {
        bModal('', createSmallCenterText(response['errorMsg'], 'danger'), '', 'sm', true)
      } else {
        resultTable.rows.add([
          response['@timestamp'],
        ])
      }
      clearFormSpinner(logInfo)
    })
    .catch(error => {
      console.error('logInfo_error:', error)
      clearFormSpinner(logInfo)
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
    'headings': ['@timestamp', '关卡', '正确', '错误', '用时', '得分']
  }
})
