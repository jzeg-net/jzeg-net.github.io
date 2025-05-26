let study_form = document.querySelector('#study_form')

const submitForm = (event) => {
  event.preventDefault()
  setSubmitStatus(study_form)
  const url = aqxcApiUrl + 'study/study'

  const formData = new FormData(study_form)
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
    .finally(() => {
      clearSubmitStatus(study_form)
    })

}

if (study_form) {
  study_form.addEventListener('submit', submitForm)
}
