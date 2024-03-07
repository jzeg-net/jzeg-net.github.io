(() => {
  'use strict'

  let linkInput = document.querySelector('#link_input')
  let linkCopy = document.querySelector('#link_copy')
  let toBack = document.querySelector('#to_back')
  let toExternal = document.querySelector('#to_external')
  let dismissible = document.querySelector('#jump_link_dismissible')

  const toggleSVG = () => linkCopy.querySelectorAll('svg').forEach((svg) => svg.classList.toggle('d-none'))

  linkCopy.addEventListener('click', (event) => {
    let clipboard = ClipboardJS.copy(linkInput.value)
    let failed = linkCopy.dataset.copyFailed
    let successfully = linkCopy.dataset.copiedSuccessfully
    if (clipboard) {
      bModal('', createSmallCenterText(successfully, 'success'), '', 'sm', true)
    } else {
      bModal('', createSmallCenterText(failed), '', 'sm', true)
    }

    toggleSVG()
    setTimeout(toggleSVG, 2500)
  })

  toBack.addEventListener('click', () => {
    open(document.referrer, '_parent') // history.go(-1)
  })

  dismissible.addEventListener('click', () => localStorage.setItem('jump', !dismissible.checked))

  window.addEventListener('load', () => {
    let targetLink = new URLSearchParams(window.location.search).get('target')
    if (!targetLink) return
    let result = decodeURIComponent(targetLink)

    linkInput.value = result
    toExternal.href = result
  })
})()
