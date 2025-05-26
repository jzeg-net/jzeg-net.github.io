let readArticle = document.querySelector('#readArticle')
let url = aqxcApiUrl + 'read/article'

const request = () => {
  let data = {
    token: getStorageAqxcToken(),
    account: getStorageAqxcAccount(),
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!r.ok) {
        r.json().then(data => {
          bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
        })
        return Promise.reject(new Error(data.message))
      }
      return r.json()
    })
    .then(res => {
      let successfullyRead = res.data['successfullyRead']
      let msg = '有效阅读' + successfullyRead + '篇文章'
      bModal('', createSmallCenterText(msg, 'success'), '', 'sm', true)
    })
}

readArticle.addEventListener('click', request)
