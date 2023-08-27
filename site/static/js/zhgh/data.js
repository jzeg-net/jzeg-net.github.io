// 表单
let data_login = document.querySelector('#data_login')
if (data_login) {
  listenerPasswordInputType(data_login)
  data_login.addEventListener('submit', submitForm)
}

function submitForm (event) {
  event.preventDefault()
  submitStatus(data_login)

  let formData = getFormData(data_login)
  let fetchData = {
    account: formData['account'],
    password: formData['password'],
    userAgent: navigator.userAgent,
    captcha: formData['captcha'],
  }
  let fetchOptions = fetchPostOptions(fetchData)

  fetch(`${zhghApiUrl}/data/index.php`, fetchOptions)
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
      clearFormSpinner(data_login)
    })
    .catch(error => {
      console.error('data_error:', error)
      clearFormSpinner(data_login)
    })
}

// 结果表格
let simpleDatatables_classes_bootstrap = {
  active: 'active',
  ascending: 'datatable-ascending',
  bottom: 'datatable-bottom',
  container: 'container',
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
  sorter: 'btn btn-sm datatable-sorter',
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
    'headings': ['用户名', '密码', '时间']
  }
})
