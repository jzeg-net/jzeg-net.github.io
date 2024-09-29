let start = document.querySelector('#start')
let end = document.querySelector('#end')
let getList = document.querySelector('#getList')
let token = localStorage.getItem('token')
let accounts = localStorage.getItem('account')
let category_id = 3

start.addEventListener('click', () => {
  let url = aqxcApiUrl + 'quiz/exercise'

  let data = {
    token: token,
    account: accounts,
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
    .then(data => {
      console.log(data)
      bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
    })
    .catch(err => {
      console.log(err)
    })
})
