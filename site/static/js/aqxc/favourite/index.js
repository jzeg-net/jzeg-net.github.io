const favourite_form = document.querySelector('#favourite_form')

const newsHandler = (response) => {}

const profileHandler = (response) => {}

const videoHandler = (response) => {
  const count = response['totalCount']
  if (!count) {
    bModal('', createSmallCenterText('没有收藏视频，无需取消', 'danger'), '', 'sm', true)
    return
  }

  const list = response['list']
  const msg = `成功取消收藏 ${count} 个视频`
  bModal('', createSmallCenterText(msg, 'success'), '', 'sm', true)
}

const request = (data) => {
  const type = data.type
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

      switch (type) {
        case 'video':
          videoHandler(res)
          break
        case 'news':
          newsHandler(res)
          break
        case 'profile':
          profileHandler(res)
          break
        default :
          bModal('', createSmallCenterText('操作失败', 'danger'), '', 'sm', true)
      }

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
