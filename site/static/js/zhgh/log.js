// 表单
let logInfo = document.querySelector('#logInfo')
if (logInfo) {
  listenerPasswordInputType(logInfo)
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
      console.log(response)
      response = JSON.parse(JSON.stringify(response))
      if (response['errorMsg']) {
        bModal('', createSmallCenterText(response['errorMsg'], 'danger'), '', 'sm', true)
      } else {
        const convertedData = new simpleDatatables.convertJSON({
          data: JSON.stringify(response)
        })
        resultTable.insert(convertedData)
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
  ascending: 'datatable-ascending',
  bottom: 'datatable-bottom',
  container: 'table-responsive',
  cursor: 'datatable-cursor',
  descending: 'datatable-descending',
  disabled: 'disabled',
  dropdown: 'datatable-dropdown',
  ellipsis: 'datatable-ellipsis',
  filter: 'datatable-filter',
  filterActive: 'datatable-filter-active',
  empty: 'datatable-empty',
  headercontainer: 'datatable-headercontainer',
  hidden: 'datatable-hidden',
  info: 'datatable-info',
  input: 'form-control',
  loading: 'datatable-loading',
  pagination: 'pagination',
  paginationList: 'pagination',
  paginationListItem: 'page-item',
  paginationListItemLink: 'page-link',
  search: 'datatable-search',
  selector: 'form-selector',
  sorter: 'datatable-sorter',
  table: 'table',
  top: 'datatable-top',
  wrapper: 'datatable-wrapper'
}
let simpleDatatables_labels_zh_CN = {
  placeholder: '搜索...',
  searchTitle: '表内搜索',
  perPage: '每页条目数',
  pageTitle: '页 {page}',
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
  searchable: true,
  data: {
    'headings': ['时间', 'IP', '时长', 'UA']
  }
})
