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
        return Promise.reject(new Error(r.statusText))
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
      bModal('', createSmallCenterText(result, 'success'), '', 'sm', true)
    })
    .finally(() => {
      clearSubmitStatus(study_form)
    })

}

study_form?.addEventListener('submit', submitForm)

const viewMode = document.querySelector('#viewMode')
viewMode?.querySelectorAll('label').forEach(label => {
  const tabTrigger = new bootstrap.Tab(label)
  label.addEventListener('click', (event) => {
    event.preventDefault()
    tabTrigger.show()
  })
})
