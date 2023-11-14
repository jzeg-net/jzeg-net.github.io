// 滚动监听
(() => {
  'use strict'

  let windowOuterHeight = window.outerHeight
  let new_scroll_position = 0
  let last_scroll_position
  let scroll_distance

  document.addEventListener('scroll', () => {
    last_scroll_position = scrollY
    scroll_distance = last_scroll_position - new_scroll_position

    scrollMainNavbar()
    scrollFloatTools()

    setTimeout(() => {
      new_scroll_position = last_scroll_position
    }, 350)
  })

  function scrollFloatTools () {
    let floatTools = document.querySelector('#float-tools')
    if (!floatTools) return
    let isFirstPage = last_scroll_position < windowOuterHeight

    if (new_scroll_position < last_scroll_position || isFirstPage) {
      floatTools.classList.add('hide')
      getToolsCollapse().classList.remove('show')
    } else if (new_scroll_position > last_scroll_position && !isFirstPage) {
      floatTools.classList.remove('hide')
    }
  }

  function scrollMainNavbar () {
    let navbar = document.querySelector('#mainNavbar')
    if (!navbar) return

    if (new_scroll_position < last_scroll_position && last_scroll_position > 50) {
      navbar.classList.add('tY-n150')
    } else if (new_scroll_position > last_scroll_position && Math.abs(scroll_distance) > 300) {
      navbar.classList.remove('tY-n150')
    } else if (last_scroll_position < windowOuterHeight) {
      navbar.classList.remove('tY-n150')
    }
  }
})()
