let start = document.querySelector('#start')
let end = document.querySelector('#end')
let getList = document.querySelector('#getList')
let token = localStorage.getItem('token')
let accounts = localStorage.getItem('account')
let videoID = 530

getList.addEventListener('click', () => {
})

start.addEventListener('click', () => {
  let url = aqxcApiUrl + 'video/start'
  let data = {
    token: token,
    account: accounts,
    id: videoID,
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
      let record = data.data.record
      console.log(record)
      localStorage.setItem('videoRecord', record)
    })
    .catch(err => {
      console.log(err)
    })

})
end.addEventListener('click', () => {
  let url = aqxcApiUrl + 'video/end'
  let videoRecord = localStorage.getItem('videoRecord')
  let data = {
    token: token,
    account: accounts,
    id: videoID,
    record: videoRecord,
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
      let message = data['message']
      let add_time = data['data']['add_time']
      let msg = message ?? add_time
      bModal('', createSmallCenterText(msg), '', 'sm', true)
    })
    .catch(err => {
      console.log(err)
    })
})
