const snapdomOpt = {}

document.addEventListener('DOMContentLoaded', () => {
  const snapdomDownloads = document.querySelectorAll('.snapdom_downloads')
  snapdomDownloads.forEach((dom) => {
    dom.addEventListener('click', snapdomDown)
  })
})
