let url = aqxcApiUrl + 'tester/top'

// 结果表格
let datatables
const datatablesAddRow = data => {
  const { ranking, score, nickname, member_id } = data['member']
  const list = data.list.map(item => {
    const { ranking, score, nickname, member_id } = item

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
