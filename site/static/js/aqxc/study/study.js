let study_form = document.querySelector('#study_form')

const submitForm = (event) => {
  event.preventDefault()
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
    .then(res => {
      if (!res.ok) {
        let statusMsg = '网络错误，请稍后再试'
        if (res.status === 401) statusMsg = '登录已过期，请重新登录'
        if (res.status === 500) statusMsg = '服务器错误，请稍后再试'

        bModal('', createSmallCenterText(statusMsg, 'danger'), '', 'sm', true)

        return
      }

      return res.json()
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

      let result = res.data
      console.log(result)
      bModal('', createSmallCenterText(result, 'success'), '', 'sm', true)
    })

}

if (study_form) {
  study_form.addEventListener('submit', submitForm)
}
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
