let batch_form = document.querySelector('#batch_form')

const submitForm = (event) => {
  event.preventDefault()
  setSubmitStatus(batch_form)
  const url = aqxcApiUrl + 'study/batch'

  const formData = new FormData(batch_form)
  const data = Object.fromEntries(formData.entries())
  data.token = getStorageAqxcToken()
  data.account = getStorageAqxcAccount()

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(r => {
      if (!r.ok) {
        r.json().then(data => {
          bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
        })
        return Promise.reject(new Error(data.message))
      }
      return r.json()
    })
    .then(res => {
      let result = res.data['result']
      let { star, favourite } = res.data['counts']
      console.log(star)
      console.log(favourite)
      console.log(result)
      let msg_star = `点赞状态改变了 ${star} 次`
      let msg_favourite = `收藏状态改变了 ${favourite} 次`
      let msg_count = msg_star + '<br>' + msg_favourite
      bModal('', createSmallCenterText(msg_count, 'success'), '', 'sm', true)
    })
    .finally(() => {
      clearSubmitStatus(batch_form)
    })

}

if (batch_form) {
  batch_form.addEventListener('submit', submitForm)
}
