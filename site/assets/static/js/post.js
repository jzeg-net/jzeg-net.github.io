lazyLoad('.lazyImg')

// 顶部跟随切换
let tableOfContentsPin = document.querySelector('#tableOfContents-pin')
if (tableOfContentsPin) {
  let postNavbar = document.querySelector('#postNavbar')

  tableOfContentsPin.addEventListener('click', () => {
    tableOfContentsPin.childNodes.forEach(child => {
      if (child.nodeName !== 'svg') return
      child.classList.toggle('d-none')
    })
    postNavbar.classList.toggle('sticky-top')
  })
}

// 侧边栏切换
let sidebarCollapse = document.querySelector('#sidebar-collapse')
if (sidebarCollapse) {
  sidebarCollapse.addEventListener('click', () => {
    sidebarCollapse.childNodes.forEach(child => {
      if (child.nodeName !== 'svg') return
      child.classList.toggle('d-none')
    })
  })
}

// 长内容伸缩按钮
let postContentMore = document.querySelector('#post-content-more')
if (postContentMore) {
  postContentMore.addEventListener('click', (event) => {
    if ('DIV' === event.target.tagName) return

    let postContent = document.querySelector('#post-content')
    let contentExpand = document.querySelector('#content-expand')
    let contentCollapse = document.querySelector('#content-collapse')
    postContent.classList.toggle('article_shrink')

    postContentMore.classList.toggle('shrink-post-content')
    postContentMore.classList.toggle('sticky-bottom')

    postContentMore.firstElementChild.childNodes.forEach(child => {
      if (child.nodeName !== 'BUTTON') return
      child.classList.toggle('d-none')
    })

    if (contentCollapse.classList.contains('d-none')) {
      setTimeout(() => {
        // currentChildEl.focus({ preventScroll: false })
        contentExpand.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'center',
        })
      }, 400)
    }
  })
}
