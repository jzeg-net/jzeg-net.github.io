let accountList = document.querySelector('#accountList')
if (accountList) {
  let hot = new Handsontable(accountList, {
    ...handsontable_settings,
    width: 'auto',
    height: 'auto',
    autoWrapRow: true,
    autoWrapCol: true,
    readonly: true,
    rowHeaders: true,
    colHeaders: ['A', 'B', 'C', 'D'],
    data: [
      ['A1', 'B1', 'C1', 'D1'],
      ['A2', 'B2', 'C2', 'D2'],
      ['A3', 'B3', 'C3', 'D3'],
    ],
  })
}
