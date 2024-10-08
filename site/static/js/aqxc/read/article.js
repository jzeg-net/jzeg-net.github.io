let readArticle = document.querySelector('#readArticle')
let url = aqxcApiUrl + 'read/article'

readArticle.addEventListener('click', () => {
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
    .then(res => res.json())
    .then(res => {
      // 如果同时存在消息和错误信息，则显示模态框并返回
      if (res.hasOwnProperty('message') && (res.hasOwnProperty('code') || res.hasOwnProperty('errors'))) {
        bModal('', createSmallCenterText(res.message, 'danger'), '', 'sm', true)
        return
      }

      let successfullyRead = res.data.successfullyRead
      let msg = '有效阅读了' + successfullyRead + '篇文章'
      bModal('', createSmallCenterText(msg, 'success'), '', 'sm', true)
    })
})
