lazyLoad('.lazyImg')

let tableOfContentsPin = document.querySelector('#tableOfContents-pin')
if (tableOfContentsPin) {
  let postNavbar = document.querySelector('#postNavbar')

  tableOfContentsPin.addEventListener('click', () => {
    tableOfContentsPin.childNodes.forEach(currentChild => {
      currentChild.classList.toggle('d-none')
    })
    postNavbar.classList.toggle('sticky-top')
  })
}

let sidebarCollapse = document.querySelector('#sidebar-collapse')
if (sidebarCollapse) {
  sidebarCollapse.addEventListener('click', () => {
    sidebarCollapse.childNodes.forEach(currentChild => {
      currentChild.classList.toggle('d-none')
    })
  })
}

// 长内容伸缩按钮
let postContentMore = document.querySelector('#post-content-more')
if (postContentMore) {
  postContentMore.addEventListener('click', (event) => {
    if ('DIV' === event.target.tagName) return

    let postContent = document.querySelector('#post-content')
    postContent.classList.toggle('article_shrink')

    postContentMore.classList.toggle('shrink-post-content')
    postContentMore.classList.toggle('sticky-bottom')

    postContentMore.firstElementChild.childNodes.forEach(currentChild => {
      if ('BUTTON' === currentChild.tagName) {
        currentChild.classList.toggle('d-none')

        if (!currentChild.classList.contains('d-none')) {
          setTimeout(function () {
            // currentChildEl.focus({ preventScroll: false })
            currentChild.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'center',
            })
          }, 400)
        }

      }
    })
  })
}
