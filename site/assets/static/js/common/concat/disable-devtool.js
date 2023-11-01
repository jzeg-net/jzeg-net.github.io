if (typeof DisableDevtool !== 'undefined') {
  let md5 = DisableDevtool.md5('xxx')

  DisableDevtool({
    disableMenu: false,
    clearLog: false,
    md5: md5,
    tkName: 'false',
  })
}
