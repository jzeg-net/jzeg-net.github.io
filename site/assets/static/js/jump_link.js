(() => {
  'use strict'

  const storageKey = 'noJump'
  const getLocalStored = () => localStorage.getItem(storageKey)
  const setLocalStored = (value) => localStorage.setItem(storageKey, value)
  const removeLocalStored = () => localStorage.removeItem(storageKey)

  const getPreferredJump = () => getLocalStored() === 'true'

  let linkInput = document.querySelector('#link_input')
  let linkCopy = document.querySelector('#link_copy')
  let toBack = document.querySelector('#to_back')
  let toExternal = document.querySelector('#to_external')
  let dismissible = document.querySelector('#jump_link_dismissible')

  const toggleSVG = () => linkCopy.querySelectorAll('svg').forEach((svg) => svg.classList.toggle('d-none'))

  const setDismissible = () => dismissible.checked = getPreferredJump()

  const goBack = () => {
    open(document.referrer, '_parent') // history.go(-1)
  }

  dismissible.addEventListener('click', () => setLocalStored(!!dismissible.checked))

  linkCopy.addEventListener('click', () => {
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

  toBack.addEventListener('click', goBack)

  window.addEventListener('load', () => {
    let targetLink = new URLSearchParams(window.location.search).get('target')
    if (!targetLink) return

    setDismissible()
    let result = decodeURIComponent(targetLink)

    linkInput.value = result
    toExternal.href = result
  })
})()
