let voteParseForm = document.querySelector('#voteParseForm')
if (voteParseForm) {
  voteParseForm.addEventListener('submit', (event) => {
    event.preventDefault()
    dialog.showModal()
  })
}

dialog.addEventListener('close', () => {
  if (dialog.returnValue === 'cancel') {
    bModal('', createSmallCenterText('已经取消获取'), '', 'sm', true)
    return
  }

  let confirm = false

  if (dialog.returnValue === 'confirm') {
    if (verifyDialogPassword.value === 'JZEG-NET') confirm = true
    if (verifyDialogPassword.value === '') bModal('', createSmallCenterText('请输入密码'), '', 'sm', true)
    if (verifyDialogPassword.value && verifyDialogPassword.value !== 'JZEG-NET') bModal('', createSmallCenterText('密码错误，重新输入'), '', 'sm', true)
  }

  if (!confirm) {
    dialog.show()
    return
  }

  getAll_rankingData()
})

function getAll_rankingData () {
  let tableData = new simpleDatatables.DataTable('#table', {
    classes: simpleDatatables_classes_bootstrap,
    labels: simpleDatatables_labels_zh_CN,
    fixedHeight: true,
    perPage: 0,
    perPageSelect: [10, 20, 30, 40, 50, ['全部', 0]],
    data: {
      'headings': ['编号', '明星', '姓名', '票数'],
    }
  })

  wretch()
    .get(`${xxxApiURL}/tp/rrwtp/ranking_list.php`)
    .json(response => response['playerData'])
    .then(playerData => {
      playerData.forEach((player) => {
        player['playername'] = player['playername'].replace(/(“|”| )/g, '')
        player['xx'] = player['playername'].split('明星')
        player['type'] = player['xx'][0]
        player['name'] = player['xx'][1]
      })
      return playerData
    })
    .then(playerData => {
      playerData.forEach((player) => {
        tableData.rows.add([
          player['rond'],
          // player['playername'],
          player['type'],
          player['name'],
          player['votenum'],
        ])
      })
    })
}
