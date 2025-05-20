let top_form = document.querySelector('#top_form')
if (top_form) {
  let top_month = document.querySelector('#top_month')
  // 将当前月份设置为默认值
  top_month.value = new Date().toISOString().slice(0, 7)

  top_form.addEventListener('submit', (e) => {
    e.preventDefault()

    let formData = new FormData(top_form)
    let data = Object.fromEntries(formData.entries())
    data.month = data.month.replace(/-/g, '')
    data.account = getStorageAqxcAccount()
    data.token = getStorageAqxcToken()

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(r => {
      if (!r.ok) {
        r.json()
          .then(data => {
            return bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
          })
        return
      }

      return r.json()
    }).then(r => {
      datatablesAddRow(r.data)
    })
  })
}
