wretch()
  .catcher(404, () => {
    modalFailMsg('服务器404错误')
  })
  .catcher(502, () => {
    modalFailMsg('服务器502错误')
  })
  .catcherFallback((error) => {
    console.log(error)
    modalFailMsg('服务器未知错误')
  })
  .get(`${xxxApiURL}/shop/index.php`)
  .timeout((error) => modalFailMsg('超时 ' + error))
  .json((response) => {
    response['list'].forEach((currentData) => {
      let openingHours = JSON.parse(currentData['opening_hours'])
      currentData['opening_hours'] = `营业时间：${openingHours.open} 停止售卖：${openingHours.closed}`

      let species = JSON.parse(currentData['species'])
      currentData['species'] = `${species.join()}`

      let area = currentData['area']
      currentData['area'] = areaJson[area]
    })
    const convertedData = new simpleDatatables.convertJSON({
      data: JSON.stringify(response['list'])
    })
    resultTable.insert(convertedData)
  })
  .catch((error) => {
    console.log('shop_list_error', error)
  })

// 结果表格
let resultTable = new simpleDatatables.DataTable('#table', {
  columns: [
    {}
  ],
  classes: simpleDatatables_classes_bootstrap,
  labels: simpleDatatables_labels_zh_CN,
  fixedHeight: true,
  searchable: false,
  perPageSelect: [5, 10, 15, 20, 25, ['全部', 0]],
  data: {
    'headings': ['区域', '名称', '俗称', '种类', 'type', '地址', '电话', '营业时间', '简介', '照片', '有效期']
  }
})

let areaJson = {
  'dongPang': '东庞',
  'xingMei': '邢煤',
  'geQuan': '葛泉',
  'xianDeWang': '显德旺',
  'zhangCun': '章村',
}
