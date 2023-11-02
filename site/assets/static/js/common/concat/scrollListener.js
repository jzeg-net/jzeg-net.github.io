// 滚动监听
(() => {
  'use strict'

  let new_scroll_position = 0
  let last_scroll_position

  document.addEventListener('scroll', () => {
    last_scroll_position = scrollY
    scrollMainNavbar()
    scrollFloatTools()
    new_scroll_position = last_scroll_position
  })

  function scrollFloatTools () {
    let floatTools = document.querySelector('#float-tools')
    if (!floatTools) return
    let windowOuterHeight = window.outerHeight

    if (new_scroll_position < last_scroll_position || last_scroll_position < windowOuterHeight) {
      floatTools.classList.add('hide')
      getToolsCollapse().classList.remove('show')
    } else if (new_scroll_position > last_scroll_position && last_scroll_position > windowOuterHeight) {
      floatTools.classList.remove('hide')
    }
  }

  function scrollMainNavbar () {
    let navbar = document.querySelector('#mainNavbar')
    if (!navbar) return

    if (new_scroll_position < last_scroll_position && last_scroll_position > 50) {
      navbar.classList.add('tY-n150')
    } else if (new_scroll_position > last_scroll_position) {
      navbar.classList.remove('tY-n150')
    }
  }
})()
