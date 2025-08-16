const snapdomOpt = {}

const listenSnapDownload = () => {
  const snapdomDownloads = document.querySelectorAll('.snapdom_downloads')
  snapdomDownloads.forEach((dom) => {
    dom.addEventListener('click', snapdomDown)
  })
}

document.addEventListener('DOMContentLoaded', listenSnapDownload)
