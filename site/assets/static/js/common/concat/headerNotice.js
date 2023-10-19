let headerNotice = document.querySelector('#headerNotice')

if (headerNotice) {
  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
  }

  const getLocalStorage = (key) => {
    return localStorage.getItem(key) ? localStorage.getItem(key) : false
  }

  let storageKey = 'headerNotice'
  let storageValue = getLocalStorage(storageKey)

  if (storageValue) {
    let oneDay = 60 * 60 * 24 * 1e3
    let intervals = Date.now() - storageValue

    if (intervals <= oneDay) {
      bootstrap.Alert.getOrCreateInstance(headerNotice).close()
    }
  }

  headerNotice.addEventListener('close.bs.alert', (event) => {
    let parent = event.target.parentNode
    setTimeout(() => {
      parent.parentNode.removeChild(parent)
    }, 1e3)

    bModal('', createSmallCenterText('公告信息已经关闭，将会在24小时后重新显示', 'success'), '', 'sm', true)

    setLocalStorage(storageKey, Date.now())
  })
}
