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
