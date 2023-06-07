let tableOfContentsPin = document.querySelector('#tableOfContents-pin')
if (tableOfContentsPin) {
    tableOfContentsPin.addEventListener('click', () => {
        if (tableOfContentsPin.classList.contains('active')) {
            tableOfContentsPin.firstElementChild.classList.toggle('d-none')
            tableOfContentsPin.lastElementChild.classList.toggle('d-none')
        } else {
            tableOfContentsPin.firstElementChild.classList.toggle('d-none')
            tableOfContentsPin.lastElementChild.classList.toggle('d-none')
        }
    })
}

let sidebarIndent = document.querySelector('#sidebar-indent')
if (sidebarIndent) {
    sidebarIndent.addEventListener('click', () => {
        if (sidebarIndent.classList.contains('active')) {
            sidebarIndent.firstElementChild.classList.toggle('d-none')
            sidebarIndent.lastElementChild.classList.toggle('d-none')
        } else {
            sidebarIndent.firstElementChild.classList.toggle('d-none')
            sidebarIndent.lastElementChild.classList.toggle('d-none')
        }
    })
}

lazyLoad('.lazyImg')

let postContentMore = document.querySelector('#post-content-more')
postContentMore.addEventListener('click', () => {
    let postContent = document.querySelector('#post-content')
    postContent.classList.toggle('article_shrink')

    postContentMore.classList.toggle('shrink-post-content')
    postContentMore.classList.toggle('sticky-bottom')

    postContentMore.childNodes.forEach(currentChildEl => {
        if ('BUTTON' === currentChildEl.tagName) {
            currentChildEl.classList.toggle('d-none')

            if (!currentChildEl.classList.contains('d-none')) {
                currentChildEl.focus({ preventScroll: false })
                currentChildEl.scrollIntoView(true)
            }

        }
    })
})
