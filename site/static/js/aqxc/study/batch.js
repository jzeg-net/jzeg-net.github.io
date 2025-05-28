let batch_form = document.querySelector('#batch_form')

// 结果表格
let datatables
const datatablesAddRow = data => {
  let insertData = data.map(item => {
    let { video_id, title, star, favourite } = item
    star = star === null ? '保持不变' : star === true ? '点赞' : '取消点赞'
    favourite = favourite === null ? '保持不变' : favourite === true ? '收藏' : '取消收藏'
    console.log(title + ' ' + star + ' ' + favourite)

    return [video_id, title, star, favourite]
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
        'headings': ['ID', '标题', '点赞', '收藏']
      }
    })
  }

  datatables.insert({ data: insertData })
}

const submitForm = (event) => {
  event.preventDefault()
  setSubmitStatus(batch_form)
  const url = aqxcApiUrl + 'study/batch'

  const formData = new FormData(batch_form)
  const data = Object.fromEntries(formData.entries())
  data.token = getStorageAqxcToken()
  data.account = getStorageAqxcAccount()

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(r => {
      if (!r.ok) {
        r.json().then(data => {
          bModal('', createSmallCenterText(data.message, 'danger'), '', 'sm', true)
        })
        return Promise.reject(new Error(data.message))
      }
      return r.json()
    })
    .then(res => {
      let result = res['result']
      let { star, favourite } = res['counts']
      console.log(result)
      let msg_star = `点赞状态改变了 ${star} 次`
      let msg_favourite = `收藏状态改变了 ${favourite} 次`
      let msg_count = msg_star + '<br>' + msg_favourite
      bModal('', createSmallCenterText(msg_count, 'success'), '', 'sm', true)

      datatablesAddRow(result)
    })
    .finally(() => {
      clearSubmitStatus(batch_form)
    })

}

if (batch_form) {
  batch_form.addEventListener('submit', submitForm)
}
