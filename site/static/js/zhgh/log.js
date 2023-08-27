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
