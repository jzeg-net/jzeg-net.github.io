let batch_form = document.querySelector('#batch_form')

// 结果表格
let datatables
const datatablesAddRow = data => {
  let insertData = data.map(item => {
    let { video_id, title, star, favourite } = item

    star = (() => {
      const { currentState, modified } = star
      if (modified === false) {
        if (currentState === 1) {
          return '保持点赞'
        } else if (currentState === 0) {
          return '保持未点赞'
        }
      }

      if (modified === true) {
        if (currentState === true) {
          return '完成点赞'
        } else if (currentState === false) {
          return '完成取消点赞'
        }
      }

      return '异常'
    })()

    favourite = (() => {
      const { currentState, modified } = favourite
      if (modified === false) {
        if (currentState === 1) {
          return '保持收藏'
        } else if (currentState === 0) {
          return '保持未收藏'
        }
      }
      if (modified === true) {
        if (currentState === true) {
          return '完成收藏'
        } else if (currentState === false) {
          return '完成取消收藏'
        }
      }

      return '异常'
    })()

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
  submitStatus(batch_form)
  const url = aqxcApiExtendUrl + 'study/batch'

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
        return Promise.reject(new Error(r.statusText))
      }
      return r.json()
    })
    .then(res => {
      datatablesAddRow(res)
    })
    .finally(() => {
      clearSubmitStatus(batch_form)
    })
}

if (batch_form) {
  batch_form.addEventListener('submit', submitForm)
}
