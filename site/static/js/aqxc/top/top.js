let top_form = document.querySelector('#top_form')
if (top_form) {
  let top_month = document.querySelector('#top_month')
  // 将当前月份设置为默认值
  top_month.value = new Date().toISOString().slice(0, 7)

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
      datatablesAddRow(r.data)
    })
  })
}

// 结果表格
let datatables
const datatablesAddRow = data => {
  const { ranking, score, nickname, member_id } = data['member']
  const list = data.list.map(item => {
    const { ranking, nickname, score, member_id } = item

    return [ranking, score, nickname, member_id]
  })

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
        'headings': ['排名', '得分', '昵称', 'ID']
      }
    })
  }

  datatables.rows.add([ranking, score, nickname, member_id])
  datatables.insert({ data: list })
}
