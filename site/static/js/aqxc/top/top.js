let ranking = document.querySelector('#ranking')
let top_form = document.querySelector('#top_form')
if (top_form) {
  top_form.addEventListener('submit', (e) => {
    e.preventDefault()

    let formData = new FormData(top_form)
    let data = Object.fromEntries(formData.entries())
    data.month = data.month.replace(/-/g, '')
    data.account = getStorageAqxcAccount()
    data.token = getStorageAqxcToken()

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(r => {
      if (!r.ok) {
        r.json()
          .then(data => {
            return bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
          })
        return
      }

      return r.json()
    }).then(r => {
      console.log(r.data)
      datatablesAddRow(r.data)
    })
  })
}

// 结果表格
let datatables
const datatablesAddRow = data => {
  let { ranking, nickname, score, avatar } = data['member']
  avatar = `<img class="img-thumbnail" width="30" src="${avatar}" alt="头像">`

  if (!datatables) {
    datatables = new simpleDatatables.DataTable('#simpleDatatables', {
      columns: [{}],
      classes: simpleDatatables_classes_bootstrap,
      labels: simpleDatatables_labels_zh_CN,
      fixedHeight: true,
      searchable: false,
      perPageSelect: [5, 10, 15, 20, 25, ['全部', 0]],
      perPage: 0,
      data: {
        'headings': ['排名', '昵称', '得分', '头像']
      }
    })
  }
  datatables.rows.add([
    ranking,
    nickname,
    score,
    avatar,
  ])
}
