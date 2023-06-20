let headerNotice = document.querySelector('#headerNotice')

if (headerNotice) {
  headerNotice.addEventListener('closed.bs.alert', (event) => {
    let close = {
      'close': Date.now().toString()
    }
    localStorage.setItem('headerNotice', encodeURI(JSON.stringify(close)))
  })
}
