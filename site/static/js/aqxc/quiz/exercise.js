let start = document.querySelector('#start')
let end = document.querySelector('#end')
let getList = document.querySelector('#getList')
let category_id = 3

start.addEventListener('click', () => {
  let url = aqxcApiUrl + 'quiz/exercise'

  let data = {
    token: getStorageAqxcToken(),
    account: getStorageAqxcAccount(),
    category_id: category_id,
    type: 'exercise',
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
    .then(result => {
      console.log(result)
      // 如果包含code字段和message字段，则说明请求失败，弹出错误信息，否则弹出正确信息
      if (result.hasOwnProperty('code')
        && result.hasOwnProperty('message')
      ) {
        bModal('', createSmallCenterText(result.message, 'danger'), '', 'sm', true)
        return
      }
      bModal('', createSmallCenterText('得分：' + result['data']['tester_score'], 'success'), '', 'sm', true)
    })
    .catch(err => {
      console.log(err)
    })
})
