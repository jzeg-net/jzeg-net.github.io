(() => {
  window.loader = (xx) => {
    let container = document.createElement('div')
    let loader = document.createElement('div')
    let backdrop = document.createElement('div')

    container.className = 'loader-container'
    loader.className = 'loader'
    backdrop.className = 'loader-backdrop fade show'

    container.append(loader)
    document.body.append(container, backdrop)
  }
})()
