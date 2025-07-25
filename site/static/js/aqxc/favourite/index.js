const favourite_form = document.querySelector('#favourite_form')

const request = (data) => {
  const type = data.type
  const url = aqxcApiExtendUrl + 'favourite/favourite'
  const name = favourite_form.querySelector(`input[value="${type}"]`).nextElementSibling.textContent

  fetch(url, fetchPostOptions(data))
    .then(res => {
      if (!res.ok) {
        res.json().then(error => {
          bModal('', createSmallCenterText(error.message, 'danger'), '', 'sm', true)
        })
        return Promise.reject(new Error(res.statusText))
      }
      return res.json()
    })
    .then(res => {
      if (!res.count) {
        const msg = `${name} 没有收藏内容，无需取消`

        bModal('', createSmallCenterText(msg, 'danger'), '', 'sm', true)
        return
      }

      const msg = `成功取消 ${res.count} 个 ${name} 收藏的内容`
      bModal('', createSmallCenterText(msg, 'success'), '', 'sm', true)
    })
    .finally(() => {
      clearSubmitStatus(favourite_form)
    })
    .catch(error => console.error('favourite_error:', error))
}

favourite_form?.addEventListener('submit', (e) => {
  e.preventDefault()
  submitStatus(favourite_form)

  const formData = new FormData(favourite_form)
  const data = Object.fromEntries(formData.entries())
  data.account = getStorageAqxcAccount()
  data.token = getStorageAqxcToken()

  request(data)
})
