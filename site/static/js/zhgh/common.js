// 页面工具
let zhghApiUrl = 'https://api.jzeg.net/api/zhgh/v1'
// 页面工具
let newTabPage = document.querySelector('#newTabPage')
let refreshPage = document.querySelector('#refreshPage')
if (newTabPage) {
  newTabPage.href = location.origin + location.pathname
}
if (refreshPage) {
  refreshPage.addEventListener('click', (event) => {
    event.preventDefault()
    location.reload()
  })
}

// 选择工种
let throughSelect = document.querySelector('#throughSelect')
if (throughSelect) {
  throughSelect.addEventListener('click', () => {
    let fetchOptions = fetchPostOptions([])

    fetch(`${zhghApiUrl}/jobs/`, fetchOptions)
      .then(response => response.json())
      .then(response => {
        Object.keys(response).forEach(xx => {
          let data = {
            value: xx,
            text: response[xx]
          }
          throughSelect.append(createOption(data))
        })
      })
      .catch(error => console.error('type_of_work_error', error))
  }, { once: true })
}
