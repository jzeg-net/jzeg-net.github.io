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
    .then(data => {
      console.log(data)
    })
})
