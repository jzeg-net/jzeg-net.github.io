let headerNotice = document.querySelector('#headerNotice')

if (headerNotice) {
  headerNotice.addEventListener('close.bs.alert', (event) => {
    let parent = event.target.parentNode
    setTimeout(() => {
      parent.parentNode.removeChild(parent)
    }, 300)

  })

  headerNotice.addEventListener('closed.bs.alert', (event) => {
    let close = {
      'close': Date.now().toString()
    }
    localStorage.setItem('headerNotice', encodeURI(JSON.stringify(close)))
  })
}
