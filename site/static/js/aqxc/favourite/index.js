const favourite_form = document.querySelector('#favourite_form')

favourite_form?.addEventListener('submit', (e) => {
  e.preventDefault()
  submitStatus(favourite_form)


  const formData = new FormData(favourite_form)
  const data = Object.fromEntries(formData.entries())
  data.account = getStorageAqxcAccount()
  data.token = getStorageAqxcToken()

  const url = aqxcApiExtendUrl + 'favourite/favourite'

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
      console.log(res)
    })
    .finally(() => {
      clearSubmitStatus(favourite_form)
    })
    .catch(error => console.error('favourite_error:', error))
})
