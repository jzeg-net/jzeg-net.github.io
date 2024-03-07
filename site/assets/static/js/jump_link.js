(() => {
  'use strict'

  let linkInput = document.querySelector('#link_input')
  let toBack = document.querySelector('#to_back')
  let toExternal = document.querySelector('#to_external')
  let dismissible = document.querySelector('#jump_link_dismissible')

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
