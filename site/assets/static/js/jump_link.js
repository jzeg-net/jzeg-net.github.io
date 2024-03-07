(() => {
  'use strict'

  let linkInput = document.querySelector('#link_input')
  let linkCopy = document.querySelector('#link_copy')
  let toBack = document.querySelector('#to_back')
  let toExternal = document.querySelector('#to_external')
  let dismissible = document.querySelector('#jump_link_dismissible')

  linkCopy.addEventListener('click', (event) => {
    let useHref = linkCopy.querySelector('use').href

    const toggleuseHref = () => {
      if (useHref.baseVal === '#bi-copy') {
        useHref.baseVal = '#bi-check-square'
      } else {
        useHref.baseVal = '#bi-copy'
      }
    }

    toggleuseHref()
    setTimeout(toggleuseHref, 2500)

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
