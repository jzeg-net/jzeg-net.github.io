let count = document.querySelector('#data_count')
if (count) {
  listenerPasswordInputType(count)
  count.addEventListener('submit', submitForm)
}

function submitForm (event) {
  event.preventDefault()
  submitStatus(count)

  let formData = getFormData(count)
  let fetchData = {
    managementCode: formData['managementCode'],
    userAgent: navigator.userAgent,
  }

  axios.post(`${zhghApiUrl}/count/`, fetchData, { timeout: 4500 })
    .then(response => datatablesAddRow(response.data))
    .finally(() => clearSubmitStatus(count))
    .catch(error => {
      if (error.code === 'ECONNABORTED') {
        let msg = '请求超时, 请检查网络后重试。'
        bModal('', createSmallCenterText(msg, 'danger'), '', 'sm', true)
        return
      }
      if (error.message.includes('canceled') || error.message.includes('aborted')) {
        let msg = '请求被取消'
        bModal('', createSmallCenterText(msg, 'danger'), '', 'sm', true)
        return
      }
      console.error('count_error:', error)
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
        'headings': ['种类', '数量']
      }
    })
  }
  datatables.insert({ data: response })
}
