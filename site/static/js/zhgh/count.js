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
    captcha: formData['captcha'],
  }
  let fetchOptions = fetchPostOptions(fetchData)

  fetch(`${zhghApiUrl}/count/`, fetchOptions)
    .then(response => response.json())
    .then(response => {
      datatablesAddRow(response)
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
