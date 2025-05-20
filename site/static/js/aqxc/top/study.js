let url = aqxcApiUrl + 'video/top'

// 结果表格
let datatables
const datatablesAddRow = data => {
  let { ranking, time, nickname, member_id } = data['member']
  time = formatSecondsToHMS(time)
  const list = data.list.map(item => {
    let { ranking, time, nickname, member_id } = item
    time = formatSecondsToHMS(time)

    return [ranking, time, nickname, member_id]
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
        'headings': ['排名', '时长', '昵称', 'ID']
      }
    })
  }

  datatables.rows.add([ranking, time, nickname, member_id])
  datatables.insert({ data: list })
}
