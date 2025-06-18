let readArticle = document.querySelector('#readArticle')
let url = aqxcApiUrl + 'read/article'

const request = (event) => {
  const target = event.target
  insertNewElement(target, newSpinner())
  btnDisabledStatus(target)
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
      const { read, share } = res
      let msg = '有效阅读' + read + '篇，分享' + share + '篇文章'
      bModal('', createSmallCenterText(msg, 'success'), '', 'sm', true)
    })
    .finally(() => {
      clearSpinner(target)
      btnDisabledStatus(target)
    })
}

readArticle.addEventListener('click', request)
