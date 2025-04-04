let study_form = document.querySelector('#study_form')

const submitForm = (event) => {
  event.preventDefault()
  setSubmitStatus(study_form)
  const url = aqxcApiUrl + 'study/study'

  const formData = new FormData(study_form)
  const data = Object.fromEntries(formData.entries())
  data.quick_view_mode = data.quick_view_mode === 'on'
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
      clearSubmitStatus(study_form)
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
      clearSubmitStatus(study_form)
    })

}

if (study_form) {
  study_form.addEventListener('submit', submitForm)
}
