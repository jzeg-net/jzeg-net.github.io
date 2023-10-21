let getData = document.querySelector('#getData')
if (getData) {
  getData.addEventListener('click', getAll_rankingData)
}

function getAll_rankingData() {
  let tableData = new simpleDatatables.DataTable('#table', {
    classes: simpleDatatables_classes_bootstrap,
    labels: simpleDatatables_labels_zh_CN,
    fixedHeight: true,
    perPage: 0,
    perPageSelect: [10, 20, 30, 40, 50, ['全部', 0]],
    data: {
      'headings': ['编号', '参赛者姓名', '票数'],
    }
  })

  wretch()
    .get(`${xxxApiURL}/tp/rrwtp/ranking_list.php`)
    .json(response => response["playerData"])
    .then(playerData => {
      playerData.forEach((player) => {
        tableData.refresh()
        tableData.rows.add([
          player['rond'],
          player['playername'],
          player['votenum'],
        ])
      })
    })
}
