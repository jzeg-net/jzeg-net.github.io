let study_form = document.querySelector('#study_form')

const submitForm = (event) => {
  event.preventDefault()
  submitStatus(study_form)
  const url = aqxcApiExtendUrl + 'study/study'

  const formData = new FormData(study_form)
  const data = Object.fromEntries(formData.entries())
  data.token = getStorageAqxcToken()
  data.account = getStorageAqxcAccount()
  data.all = data.all === 'on'

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
      const { count, totalTime } = res
      let msg = `播放次数 ${count}，积累时长 ${totalTime}`
      bModal('', createSmallCenterText(msg, 'success'), '', 'sm', true)
    })
    .finally(() => {
      clearSubmitStatus(study_form)
    })

}

study_form?.addEventListener('submit', submitForm)

const viewMode = document.querySelector('#viewMode')
viewMode?.querySelectorAll('label').forEach(itemTab => {
  const tabTrigger = new bootstrap.Tab(itemTab)
  itemTab.addEventListener('click', (event) => {
    // event.preventDefault()
    tabTrigger.show()
  })
})
