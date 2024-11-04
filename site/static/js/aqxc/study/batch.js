let batch_form = document.querySelector('#batch_form')

const submitForm = (event) => {
  event.preventDefault()
  setSubmitStatus(batch_form)
  const url = aqxcApiUrl + 'study/batch'

  const formData = new FormData(batch_form)
  const data = Object.fromEntries(formData.entries())
  data.star = data.star === 'on'
  data.favourite = data.favourite === 'on'
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
    .then(res => res.json())
    .then(res => {
      clearSubmitStatus(batch_form)
      if (res.hasOwnProperty('message') && (res.hasOwnProperty('code') || res.hasOwnProperty('errors'))) {
        bModal('', createSmallCenterText(res.message, 'danger'), '', 'sm', true)

        return
      }
      if (!res.hasOwnProperty('data')) {
        bModal('', createSmallCenterText('没有从服务器获取到数据', 'danger'), '', 'sm', true)

        return
      }

      let result = res.data['result']
      console.log(result)
      bModal('', createSmallCenterText(result, 'success'), '', 'sm', true)
    })
    .catch(() => {
      clearSubmitStatus(batch_form)
    })

}

if (batch_form) {
  batch_form.addEventListener('submit', submitForm)
}
