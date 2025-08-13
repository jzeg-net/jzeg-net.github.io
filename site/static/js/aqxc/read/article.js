const readArticle = document.querySelector('#readArticle')
const path = aqxcApiUrl + 'read/article'

const request = (event) => {
  const target = event.target
  insertNewElement(target, newSpinner())
  btnDisabledStatus(target)
  const data = {}

  aqxcAxios.post(path, data, {
    timeout: 1000 * 60 * 5
  })
    .then(res => {
      const { read, share } = res
      const msg = '有效阅读' + read + '篇，分享' + share + '篇文章'
      bModal('', createSmallCenterText(msg, 'success'), '', 'sm', true)
    })
    .finally(() => {
      clearSpinner(target)
      btnDisabledStatus(target)
    })
    .catch(err => {
      bModal('', createSmallCenterText(err.message, 'danger'), '', 'sm', true)
    })
}

readArticle.addEventListener('click', request)
