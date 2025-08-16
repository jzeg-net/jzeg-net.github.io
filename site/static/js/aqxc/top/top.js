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

const snapdomDown = async (event) => {
  const datasetFilename = event.currentTarget.dataset['snapdomFilename']
  const prefix = current_title + '_'
  const filename = datasetFilename || prompt('请输入要保存的文件名') || prefix + dayjs_datetime() || 'snapdom'

  const snapshot = document.querySelector('.snapshot')
  const result = await snapdom(snapshot)
  await result.download({ format: 'png', filename: filename })
}
