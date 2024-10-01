let start = document.querySelector('#start')
let end = document.querySelector('#end')
let getList = document.querySelector('#getList')
let category_id = 3

start.addEventListener('click', () => {
  let url = aqxcApiUrl + 'quiz/single'

  let data = {
    token: aqxcToken,
    account: aqxcAccount,
    category_id: category_id,
    type: 'single',
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
    .then(data => {
      console.log(data)
      bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
    })
    .catch(err => {
      console.log(err)
    })
})
