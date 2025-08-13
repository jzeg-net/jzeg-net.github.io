let top_form = document.querySelector('#top_form')
if (top_form) {
  let top_month = document.querySelector('#top_month')
  // 将当前月份设置为默认值
  top_month.value = dayjs_year_month()

  top_form.addEventListener('submit', (e) => {
    e.preventDefault()

    let formData = new FormData(top_form)
    let data = Object.fromEntries(formData.entries())
    data.month = data.month.replace(/-/g, '')

    aqxcAxios.post(url, data)
      .then(r => datatablesAddRow(r))
      .catch(e => {
        bModal('', createSmallCenterText(e.message, 'danger'), '', 'sm', true)
      })
  })
}
