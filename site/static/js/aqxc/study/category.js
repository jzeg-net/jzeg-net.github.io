const getStudyCategory = () => {
  let url = aqxcApiUrl + '/video/category'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      token: getStorageAqxcToken(),
      account: getStorageAqxcAccount(),
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
}
