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
  let oneDay = 60 * 60 * 24 * 1e3

  if (storageValue) {
    if (storageValue >= Date.now()) {
      bootstrap.Alert.getOrCreateInstance(headerNotice).close()
    }
  }

  headerNotice.addEventListener('close.bs.alert', (event) => {
    let parent = event.target.parentNode
    setTimeout(() => {
      parent.parentNode.removeChild(parent)
    }, 1e3)

    let displayTime = Date.now() + oneDay
    let date = timeago.format(displayTime, htmlLanguage_)
    let datetime = dayjs(displayTime).format('YYYY-MM-DD HH:mm:ss')

    let tooltip = `<a data-bs-toggle="tooltip" title="${datetime}">${date}</a>`



    let text = `信息栏将会在 ${tooltip} 恢复显示`
    let msg = createSmallCenterText(text, 'success')
    // new bootstrap.Tooltip(tooltip)

    bModal('', msg, '', '', true)

    setLocalStorage(storageKey, Date.now() + oneDay)
  })
}
